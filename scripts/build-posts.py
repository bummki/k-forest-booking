#!/usr/bin/env python3
"""휴양림 목록(forest_data.js)에 대해 포스팅 HTML을 생성합니다.

기본 동작은 '포스팅이 없는 휴양림만' 만드는 것입니다.
    python3 scripts/build-posts.py            # 누락분만 생성
    python3 scripts/build-posts.py --all      # 전체 재생성 (템플릿 변경 시)

생성 후 posts.ts 와 public/sitemap.xml 을 함께 갱신합니다.
저장소 루트에서 실행하세요.
"""
import argparse
import datetime
import glob
import os
import re
import sys
import unicodedata
import urllib.parse

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from build_posts_lib import (SITE, build, build_context, images, load_css,  # noqa: E402
                             load_forests, load_posts, norm)


def next_index(existing_files):
    nums = [int(m.group(1)) for f in existing_files
            if (m := re.match(r'(\d+)_', os.path.basename(f)))]
    return max(nums) + 1 if nums else 1


def write_posts_ts(pairs, path='posts.ts'):
    pairs = sorted(pairs, key=lambda x: x[0])
    lines = ['﻿export type Post = { title: string; href: string };', '',
             'export const POSTS: Post[] = []']
    lines[-1] = 'export const POSTS: Post[] = ['
    lines += [f'  {{ title: "{a}", href: "{b}" }},' for a, b in pairs]
    lines += ['];', '']
    open(path, 'w', encoding='utf-8', newline='').write('\n'.join(lines))


def write_sitemap(path='public/sitemap.xml'):
    today = datetime.date.today().isoformat()
    urls = [(SITE + '/', '1.0', 'weekly'), (SITE + '/ranking.html', '0.8', 'monthly')]
    urls += [(SITE + '/posts/' + urllib.parse.quote(os.path.basename(f)), '0.7', 'monthly')
             for f in sorted(glob.glob('public/posts/*.html'))]
    urls += [(SITE + '/privacy.html', '0.3', 'yearly')]
    out = ['<?xml version="1.0" encoding="UTF-8"?>',
           '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">']
    for loc, pri, freq in urls:
        out.append(f'  <url>\n    <loc>{loc}</loc>\n    <lastmod>{today}</lastmod>\n'
                   f'    <changefreq>{freq}</changefreq>\n    <priority>{pri}</priority>\n  </url>')
    out.append('</urlset>')
    open(path, 'w', encoding='utf-8').write('\n'.join(out) + '\n')
    return len(urls)


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('--all', action='store_true', help='기존 포스팅도 전부 다시 생성')
    args = ap.parse_args()

    forests = load_forests()
    existing = load_posts()
    css, imgs = load_css(), images()

    # 이름 기준 정렬 순서를 인덱스로 써서, 재실행해도 결과가 같도록 한다.
    order = {norm(f['name']): i for i, f in enumerate(sorted(forests, key=lambda f: f['name']))}
    by_name = {norm(t): h for t, h in existing}
    ctx = build_context(forests, by_name)
    files = glob.glob('public/posts/*.html')
    counter = next_index(files)

    pairs, made, skipped = [], 0, 0
    for f in forests:
        key = norm(f['name'])
        href = by_name.get(key)
        if href and not args.all:
            pairs.append((f['name'], href))
            skipped += 1
            continue
        if href:
            fname = unicodedata.normalize('NFC', os.path.basename(href))
        else:
            fname = f"{counter:03d}_{f['name'].replace('/', '_')}.html"
            counter += 1
        open('public/posts/' + fname, 'w', encoding='utf-8').write(
            build(f, order[key], fname, css, imgs, ctx))
        pairs.append((f['name'], '/posts/' + fname))
        made += 1

    write_posts_ts(pairs)
    n_urls = write_sitemap()
    print(f'생성 {made}편 · 유지 {skipped}편 · posts.ts {len(pairs)}항목 · sitemap {n_urls} URL')


if __name__ == '__main__':
    main()
