#!/usr/bin/env python3
"""forest_data.js의 관심등록 인원으로 public/ranking.html 을 생성합니다.

사용법: python3 scripts/build-ranking.py   (저장소 루트에서 실행)
"""
import html
import json
import os
import re
import unicodedata
import urllib.parse

SITE = 'https://forest.onnuriinfo.com'
SOURCE_LABEL = '산림청 국립자연휴양림관리소 「관심휴양림정보」 (2023-04-27 기준)'
TOP_N = 20


def load_forests(path='forest_data.js'):
    src = open(path, encoding='utf-8').read()
    out = []
    for m in re.finditer(r'\{[^{}]*"name"\s*:\s*"([^"]*)"[^{}]*\}', src, re.S):
        blk = m.group(0)
        g = lambda k: (re.search(r'"%s"\s*:\s*"([^"]*)"' % k, blk) or [None, ''])[1]
        out.append({'name': m.group(1), 'address': g('address'), 'phone': g('phone'),
                    'url': g('url'), 'interest': g('interest'), 'kind': g('kind'),
                    'sido': g('sido'), 'fee': g('fee'), 'stay': g('stay')})
    return out


def load_posts(path='posts.ts'):
    src = open(path, encoding='utf-8-sig').read()
    norm = lambda v: re.sub(r'[\s·\-–—]', '', re.sub(r'\([^)]*\)', '', v or '')).strip()
    return {norm(t): h for t, h in re.findall(r'title: "([^"]+)", href: "([^"]+)"', src)}


def main():
    forests = [f for f in load_forests() if f['interest']]
    forests.sort(key=lambda f: -int(f['interest']))
    posts = load_posts()
    norm = lambda v: re.sub(r'[\s·\-–—]', '', re.sub(r'\([^)]*\)', '', v or '')).strip()
    top = forests[:TOP_N]
    total = sum(int(f['interest']) for f in forests)

    rows, items = [], []
    for i, f in enumerate(top, 1):
        e = lambda v: html.escape(str(v or ''), quote=True)
        href = posts.get(norm(f['name']))
        name_cell = (f'<a href="{urllib.parse.quote(href)}">{e(f["name"])}</a>'
                     if href else e(f['name']))
        share = int(f['interest']) / total * 100
        rows.append(
            f'<tr>\n'
            f'  <td class="rank">{i}</td>\n'
            f'  <td class="nm">{name_cell}<span class="loc">{e(f["address"][:28])}</span></td>\n'
            f'  <td class="num">{int(f["interest"]):,}</td>\n'
            f'  <td class="bar"><span style="width:{share / (int(top[0]["interest"]) / total * 100) * 100:.1f}%"></span></td>\n'
            f'</tr>'
        )
        items.append({
            '@type': 'ListItem', 'position': i, 'name': f['name'],
            'url': SITE + urllib.parse.quote(href) if href else SITE + '/'
        })

    ld = json.dumps({'@context': 'https://schema.org', '@type': 'ItemList',
                     'name': f'관심등록 인원 기준 국립자연휴양림 인기 순위 TOP {TOP_N}',
                     'itemListOrder': 'https://schema.org/ItemListOrderDescending',
                     'numberOfItems': len(items), 'itemListElement': items},
                    ensure_ascii=False, indent=1)

    desc = (f'산림청 관심휴양림 등록 인원을 기준으로 정리한 국립자연휴양림 인기 순위 TOP {TOP_N}입니다. '
            f'1위 {top[0]["name"]}({int(top[0]["interest"]):,}명).')

    doc = f'''<!DOCTYPE html>
<html lang="ko">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>국립자연휴양림 인기 순위 TOP {TOP_N} | 숲나들e 안내</title>
  <meta name="description" content="{html.escape(desc, quote=True)}">
  <link rel="canonical" href="{SITE}/ranking.html">
  <meta property="og:type" content="article">
  <meta property="og:site_name" content="숲나들e 자연휴양림 안내">
  <meta property="og:title" content="국립자연휴양림 인기 순위 TOP {TOP_N}">
  <meta property="og:description" content="{html.escape(desc, quote=True)}">
  <meta property="og:url" content="{SITE}/ranking.html">
  <meta property="og:image" content="{SITE}/images/forest-01.webp">
  <meta name="twitter:card" content="summary_large_image">
  <link rel="icon" href="/favicon.svg" type="image/svg+xml">
  <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2695727848475573"
    crossorigin="anonymous"></script>
  <script type="application/ld+json">
{ld}
  </script>
  <style>
    * {{ box-sizing: border-box; }}
    body {{
      font-family: 'Noto Sans KR', -apple-system, BlinkMacSystemFont, 'Malgun Gothic', sans-serif;
      line-height: 1.75; color: #1f2937; max-width: 900px; margin: 0 auto;
      padding: 20px 20px 80px; background: linear-gradient(180deg, #f4f7fb 0%, #eef4f1 100%);
    }}
    .back-nav {{
      display: inline-flex; align-items: center; gap: 8px; padding: 10px 16px;
      border-radius: 999px; background: #fff; border: 1px solid #d7e8db; color: #1f6b2b;
      font-weight: 700; font-size: 14px; text-decoration: none; margin-bottom: 20px;
      box-shadow: 0 4px 14px rgba(20, 60, 28, .08);
    }}
    .card {{
      background: #fff; border: 1px solid #e5ecf3; border-radius: 16px;
      padding: 32px 28px; box-shadow: 0 8px 28px rgba(20, 60, 28, .06);
    }}
    h1 {{ font-size: 28px; line-height: 1.35; margin: 0 0 8px; }}
    .sub {{ color: #4b5563; font-size: 14px; margin: 0 0 24px; }}
    .notice {{
      background: #edf8ee; border-left: 5px solid #2d7d3d; border-radius: 10px;
      padding: 16px 18px; margin: 20px 0; font-size: 14px; color: #303b33;
    }}
    .notice p {{ margin: 0 0 6px; }}
    .notice p:last-child {{ margin: 0; }}
    table {{ width: 100%; border-collapse: collapse; margin-top: 20px; }}
    th, td {{ border-bottom: 1px solid #e5ecf3; padding: 12px 8px; text-align: left; }}
    th {{ font-size: 13px; color: #4b5563; font-weight: 700; }}
    .rank {{ width: 44px; font-weight: 800; color: #2d7d3d; text-align: center; }}
    .nm {{ font-weight: 700; }}
    .nm a {{ color: #1f6b2b; text-decoration: none; }}
    .nm a:hover {{ text-decoration: underline; }}
    .loc {{ display: block; font-weight: 400; font-size: 12px; color: #6b7280; margin-top: 2px; }}
    .num {{ width: 90px; text-align: right; font-variant-numeric: tabular-nums; font-weight: 700; }}
    .bar {{ width: 30%; }}
    .bar span {{ display: block; height: 8px; border-radius: 999px; background: #2d7d3d; opacity: .75; }}
    footer {{ margin-top: 32px; padding-top: 18px; border-top: 1px solid #dde5f2; font-size: 13px; color: #4b5563; }}
    @media (max-width: 600px) {{
      body {{ padding: 16px 14px 60px; }}
      .card {{ padding: 22px 16px; }}
      h1 {{ font-size: 22px; }}
      .bar {{ display: none; }}
    }}
  </style>
</head>

<body>
  <a class="back-nav" href="/">← 메인으로 돌아가기</a>

  <div class="card">
    <h1>국립자연휴양림 인기 순위 TOP {TOP_N}</h1>
    <p class="sub">관심휴양림으로 등록한 이용자 수 기준</p>

    <div class="notice">
      <p><b>이 순위는 무엇인가요?</b></p>
      <p>숲나들e 이용자가 «관심 휴양림»으로 등록한 인원 수입니다. 방문객 수나 예약 건수가 아니라,
        <b>얼마나 많은 사람이 눈여겨보고 있는지</b>를 보여주는 지표입니다.</p>
      <p>출처: {SOURCE_LABEL} · 국립휴양림 {len(forests)}곳만 집계되며 공립·사립은 포함되지 않습니다.</p>
    </div>

    <table>
      <thead>
        <tr><th class="rank">순위</th><th>휴양림</th><th class="num">관심등록</th><th class="bar"></th></tr>
      </thead>
      <tbody>
{chr(10).join(rows)}
      </tbody>
    </table>

    <div class="notice" style="background:#f4f7fb;border-left-color:#94a3b8">
      <p>집계 대상 {len(forests)}곳의 관심등록 인원 합계는 {total:,}명입니다.
        상위권에 수도권 접근성이 좋은 휴양림이 몰려 있는 경향이 보입니다.</p>
      <p>자료 기준일이 2023년 4월이므로 현재 인기와는 차이가 있을 수 있습니다.</p>
    </div>

    <footer>
      <p>예약은 <a href="https://www.foresttrip.go.kr" target="_blank" rel="noopener noreferrer">숲나들e 공식 홈페이지</a>에서 진행됩니다.
        지역·테마별 전체 목록은 <a href="/">메인 페이지</a>에서 확인할 수 있습니다.</p>
    </footer>
  </div>
</body>

</html>
'''
    os.makedirs('public', exist_ok=True)
    open('public/ranking.html', 'w', encoding='utf-8').write(doc)
    print(f'public/ranking.html 생성 — 집계 {len(forests)}곳, 1위 {top[0]["name"]}')


if __name__ == '__main__':
    main()
