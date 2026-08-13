"""포스팅 HTML 생성 공통 모듈. build-posts.py 에서 사용합니다."""
import glob
import html
import math
import os
import re
import urllib.parse

SITE = 'https://forest.onnuriinfo.com'

H1_TEMPLATES = [
    '{n} 이용 안내 — 위치·시설·예약 방법',
    '{n} 기본 정보와 예약 절차 정리',
    '{n}, 어디에 있고 무엇이 있나',
    '{n} 방문 전 확인할 것들',
    '{n} 시설 규모와 이용 조건 정리',
    '{n} 위치·연락처·예약 방법 한눈에',
]

ADS = ('<div class="adsense-container">\n'
       '  <ins class="adsbygoogle" style="display:block" data-ad-client="ca-pub-2695727848475573" '
       'data-ad-slot="7932374339" data-ad-format="auto" data-full-width-responsive="true"></ins>\n'
       '  <script>(adsbygoogle = window.adsbygoogle || []).push({});</script>\n'
       '</div>')


def norm(value):
    value = re.sub(r'\([^)]*\)', '', value or '')
    return re.sub(r'[\s·\-–—]', '', value).strip()


def esc(value):
    return html.escape(str(value or ''), quote=True)


def load_forests(path='forest_data.js'):
    src = open(path, encoding='utf-8').read()
    out = []
    for m in re.finditer(r'\{[^{}]*"name"\s*:\s*"([^"]*)"[^{}]*\}', src, re.S):
        blk = m.group(0)
        rec = {}
        for k, v in re.findall(r'"([a-zA-Z]+)"\s*:\s*"([^"]*)"', blk):
            rec[k] = v
        out.append(rec)
    return out


def load_posts(path='posts.ts'):
    src = open(path, encoding='utf-8-sig').read()
    return re.findall(r'title: "([^"]+)", href: "([^"]+)"', src)


def load_css(sample_dir='public/posts'):
    for f in sorted(glob.glob(os.path.join(sample_dir, '*.html'))):
        m = re.search(r'<style>(.*?)</style>', open(f, encoding='utf-8').read(), re.S)
        if m:
            return m.group(1)
    raise SystemExit('기존 포스팅에서 스타일을 찾지 못했습니다.')


def images(path='public/img'):
    return sorted(os.path.basename(p) for p in glob.glob(os.path.join(path, '*.webp')))


def haversine(a, b):
    """두 좌표 사이 거리(km)"""
    lat1, lon1, lat2, lon2 = map(math.radians, [a[0], a[1], b[0], b[1]])
    h = (math.sin((lat2 - lat1) / 2) ** 2
         + math.cos(lat1) * math.cos(lat2) * math.sin((lon2 - lon1) / 2) ** 2)
    return 2 * 6371 * math.asin(math.sqrt(h))


def coords_of(rec):
    try:
        lat, lng = float(rec.get('lat') or 0), float(rec.get('lng') or 0)
    except ValueError:
        return None
    return (lat, lng) if lat and lng else None


def build_context(forests, post_href_by_name):
    """포스팅마다 달라지는 정보(순위·인근 휴양림·지역 통계)를 미리 계산한다."""
    ranked = sorted((f for f in forests if (f.get('interest') or '').isdigit()),
                    key=lambda f: -int(f['interest']))
    rank = {norm(f['name']): (i + 1, int(f['interest'])) for i, f in enumerate(ranked)}

    sido_count = {}
    for f in forests:
        key = f.get('sido') or (f.get('address') or '').split(' ')[0]
        if key:
            sido_count[key] = sido_count.get(key, 0) + 1

    located = [(f, coords_of(f)) for f in forests]
    located = [(f, c) for f, c in located if c]

    nearby = {}
    for f, c in located:
        others = sorted(
            ((haversine(c, c2), f2) for f2, c2 in located if f2['name'] != f['name']),
            key=lambda x: x[0]
        )[:3]
        nearby[norm(f['name'])] = [
            (round(d, 1), f2['name'], post_href_by_name.get(norm(f2['name'])))
            for d, f2 in others
        ]

    return {'rank': rank, 'rank_total': len(ranked),
            'sido_count': sido_count, 'nearby': nearby}


def where_of(rec):
    sido = rec.get('sido') or (rec.get('address') or '').split(' ')[0]
    parts = (rec.get('address') or '').split()
    gun = parts[1] if len(parts) > 1 else ''
    return f'{sido} {gun}'.strip() or '전국'


def img_tag(name, alt, first=False):
    load = 'fetchpriority="high" decoding="async"' if first else 'loading="lazy" decoding="async"'
    src = '/img/' + urllib.parse.quote(name)
    return (f'<div class="post-image">\n  <img src="{src}" alt="{esc(alt)}" width="1184" height="864" {load} '
            f'style="width:100%; max-width:800px; height:auto; border-radius:8px; display:block; margin:0 auto;">\n</div>')


def row(label, value):
    return (f'<div class="info-card"><div class="info-main"><span class="info-label">{esc(label)}</span>'
            f'<span class="info-value">{value}</span></div></div>')


def build(rec, idx, fname, css, imgs_all, ctx=None):
    ctx = ctx or {'rank': {}, 'rank_total': 0, 'sido_count': {}, 'nearby': {}}
    name = rec['name']
    kind = rec.get('kind') or ''
    where = where_of(rec)
    canon = f'{SITE}/posts/{urllib.parse.quote(fname)}'
    imgs = [imgs_all[(idx * 3 + k) % len(imgs_all)] for k in range(3)]
    h1 = H1_TEMPLATES[idx % len(H1_TEMPLATES)].format(n=name)
    desc = f'{name} 주소와 연락처, 시설 규모, 숲나들e 예약 방법을 정리했습니다. 위치 {where}.'

    rows = []
    if rec.get('address'):
        rows.append(row('소재지', esc(rec['address'])))
    if rec.get('phone'):
        rows.append(row('전화', esc(rec['phone'])))
    if kind:
        rows.append(row('휴양림 구분', esc(kind)))
    if rec.get('institution'):
        rows.append(row('관리기관', esc(rec['institution'])))
    cap = ''
    if rec.get('capacity'):
        try:
            cap = f"{int(rec['capacity']):,}"
            rows.append(row('수용인원', cap + '명'))
        except (TypeError, ValueError):
            cap = ''
    if rec.get('fee'):
        rows.append(row('입장료', esc(rec['fee'])))
    if rec.get('stay'):
        rows.append(row('숙박', '가능' if rec['stay'] == 'Y' else '불가'))
    if rec.get('closed'):
        rows.append(row('휴무일', esc(rec['closed'])))
    if rec.get('area'):
        try:
            ha = int(rec['area']) / 10000
            rows.append(row('면적', f'{ha:,.0f}ha (약 {int(rec["area"]):,}㎡)'))
        except (TypeError, ValueError):
            pass
    if rec.get('url'):
        rows.append(row('홈페이지',
                        f'<a href="{esc(rec["url"])}" target="_blank" rel="noopener noreferrer">공식 페이지 열기</a>'))

    body = []
    if rec.get('facility'):
        body.append(f'<p>등록된 주요 시설은 {esc(rec["facility"])}입니다.</p>')
    if cap:
        body.append(f'<p>동시 수용 인원은 {cap}명 규모로 등록되어 있습니다.</p>')
    if rec.get('fee'):
        body.append(f'<p>입장료는 {esc(rec["fee"])}로 안내되어 있으며, 주차료와 시설 이용료는 별도인 경우가 있습니다.</p>')
    if rec.get('stay') == 'Y':
        body.append('<p>숙박 시설을 운영하므로 사전 예약이 필요합니다.</p>')
    elif rec.get('stay') == 'N':
        body.append('<p>숙박 시설 없이 당일 이용 위주로 운영됩니다.</p>')
    if not body:
        body.append('<p>세부 시설 정보는 아래 공식 페이지에서 확인할 수 있습니다.</p>')

    # --- 이 휴양림에만 해당하는 정보 ---
    key = norm(name)
    rank_html = ''
    rank_info = ctx['rank'].get(key)
    if rank_info:
        pos, cnt = rank_info
        rank_html = (
            '<h2>얼마나 찾는 곳인가</h2>\n'
            f'<p>숲나들e 이용자가 «관심 휴양림»으로 등록한 인원이 <b>{cnt:,}명</b>으로, '
            f'집계 대상 국립휴양림 {ctx["rank_total"]}곳 가운데 <b>{pos}위</b>입니다.</p>\n'
            '<p>방문객 수가 아니라 관심을 등록해 둔 사람의 수이므로, 예약 경쟁이 어느 정도일지 가늠하는 참고치로 보면 됩니다. '
            '(산림청 2023년 4월 자료) '
            '<a href="/ranking.html">전체 순위 보기</a></p>'
        )

    facility_html = ''
    if rec.get('facility'):
        parts = [x.strip() for x in re.split(r'[+·,]', rec['facility']) if x.strip()]
        if len(parts) > 1:
            facility_html = ('<ul>\n' + '\n'.join(f'  <li>{esc(x)}</li>' for x in parts) + '\n</ul>')

    near_html = ''
    near = ctx['nearby'].get(key) or []
    if near:
        items = []
        for dist, other, href in near:
            label = esc(other) + ' <span style="color:#6b7280">약 ' + str(dist) + 'km</span>'
            if href:
                label = '<a href="' + urllib.parse.quote(href) + '">' + label + '</a>'
            items.append('  <li>' + label + '</li>')
        near_html = ('<h2>가까운 다른 휴양림</h2>\n'
                     f'<p>{esc(name)}에서 직선거리로 가장 가까운 곳들입니다. 예약이 어려울 때 대안으로 살펴보세요.</p>\n'
                     '<ul>\n' + '\n'.join(items) + '\n</ul>')

    sido = rec.get('sido') or where.split(' ')[0]
    region_html = ''
    if ctx['sido_count'].get(sido, 0) > 1:
        region_html = (f'<p>{esc(sido)}에는 이곳을 포함해 '
                       f'{ctx["sido_count"][sido]}곳의 휴양림이 등록되어 있습니다. '
                       '<a href="/">지역별 목록에서 비교해 보기</a></p>')

    tags = ' '.join(f'#{t}' for t in ['자연휴양림', name.replace(' ', ''),
                                      (rec.get('sido') or '').replace(' ', ''),
                                      kind.replace(' ', ''), '숲나들e', '숲속휴식'] if t)
    nl = '\n'
    return f'''<!DOCTYPE html>
<html lang="ko">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>{esc(name)} 예약 정보와 이용 가이드 | 숲으로</title>
<meta name="description" content="{esc(desc)}">
<link rel="canonical" href="{canon}">
<meta property="og:type" content="article">
<meta property="og:site_name" content="숲으로">
<meta property="og:title" content="{esc(h1)}">
<meta property="og:description" content="{esc(desc)}">
<meta property="og:image" content="{SITE}/img/{urllib.parse.quote(imgs[0])}">
<meta property="og:url" content="{canon}">
<meta name="twitter:card" content="summary_large_image">
<style>{css}</style>
</head>
<body>

<div class="back-nav-wrap">
  <a class="back-nav" href="/">← 메인으로 돌아가기</a>
</div>

<div class="post-header">
  <span class="category">[{esc(where)}{(' · ' + esc(kind)) if kind else ''}]</span>
  <h1>{esc(h1)}</h1>
</div>

<div class="intro">
  <p>{esc(where)}에 있는 <b>{esc(name)}</b>의 공개 정보를 정리했습니다.</p>
  <p>아래 내용은 공공데이터포털 전국휴양림표준데이터를 기준으로 하며, 실제 운영 사항은 방문 전 공식 페이지에서 다시 확인하시기 바랍니다.</p>
</div>

{img_tag(imgs[0], f'{name} 숲 전경', first=True)}

<h2>기본 정보</h2>
<div class="info-panel">
{nl.join(rows)}
</div>

{img_tag(imgs[1], f'{name} 산책로')}

{ADS}

<h2>시설과 이용 조건</h2>
{nl.join(body)}
{facility_html}
<p>시설 구성과 요금은 개보수·계절에 따라 달라질 수 있으므로, 예약 전 공식 페이지의 최신 안내를 확인하는 것이 좋습니다.</p>

{rank_html}

{img_tag(imgs[2], f'{name} 주변 숲길')}

<h2>예약 방법</h2>
<p>전국 자연휴양림은 산림청 통합 예약 시스템 <a href="https://www.foresttrip.go.kr" target="_blank" rel="noopener noreferrer">숲나들e</a>에서 예약합니다. 국립휴양림 기준 일정은 다음과 같습니다.</p>
<div class="info-panel">
{row('추첨 신청', '매월 4일~9일 09:00~18:00 (금·토·공휴일 전날 입실분)')}
{row('추첨 발표', '매월 10일 16:00')}
{row('잔여분 선착순', '매월 15일 09:00')}
{row('평일 선착순', '매주 수요일 09:00, 6주 뒤 월요일까지')}
{row('통합고객센터', '1588-3250')}
</div>
<p>공립·사립 휴양림은 운영기관이 별도 일정을 두는 경우가 있으므로 해당 휴양림 페이지를 확인해야 합니다.</p>

{near_html}

<h2>방문 전 확인할 점</h2>
<ul>
  <li>입실·퇴실 시각은 휴양림마다 다릅니다.</li>
  <li>휴무일에는 숙박 시설 운영이 제한될 수 있습니다.</li>
  <li>성수기와 주말은 추첨제로 운영되는 곳이 많습니다.</li>
  <li>취사 가능 여부와 반입 금지 물품은 휴양림별 규정을 따릅니다.</li>
</ul>

<div class="conclusion">
  <p><b>{esc(name)}</b>은 {esc(where)}에 위치한 {esc(kind) if kind else '자연휴양림'}입니다.</p>
  {region_html}
  <p>예약과 결제는 모두 숲나들e 공식 시스템에서 이루어집니다.</p>
</div>

<div style="margin-top: 30px; padding: 20px; background-color: #e8f5e9; border-radius: 5px; border-left: 4px solid #2d7d3d;">
  <p style="margin: 0; color: #333;"><b>🌲 전국 자연휴양림 정보</b></p>
  <p style="margin: 10px 0 0 0; color: #666; font-size: 14px;">지역·테마별 휴양림 검색은 <a href="/" style="color: #2d7d3d; font-weight: bold;">메인 페이지</a>에서 이용할 수 있습니다.</p>
</div>

<div class="hashtags">
  <p>{esc(tags)}</p>
</div>

</body>
</html>
'''
