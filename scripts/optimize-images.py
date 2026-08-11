#!/usr/bin/env python3
"""public/img, public/images 의 PNG를 WebP로 변환하고 참조 경로를 갱신합니다.

사용법:  python3 optimize-images.py        (저장소 루트에서 실행)
필요:    pip install pillow
"""
import glob
import os
import re
import urllib.parse

from PIL import Image

MAX_WIDTH = 1200
QUALITY = 80
Image.MAX_IMAGE_PIXELS = None


def convert() -> None:
    before = after = 0
    count = 0
    for path in sorted(glob.glob('public/**/*.png', recursive=True)):
        out = os.path.splitext(path)[0] + '.webp'
        with Image.open(path) as im:
            im = im.convert('RGB')
            w, h = im.size
            if w > MAX_WIDTH:
                im = im.resize((MAX_WIDTH, round(h * MAX_WIDTH / w)), Image.LANCZOS)
            im.save(out, 'WEBP', quality=QUALITY, method=6)
        before += os.path.getsize(path)
        after += os.path.getsize(out)
        count += 1
    print(f'{count}장 변환: {before / 1024 / 1024:.1f}MB -> {after / 1024 / 1024:.1f}MB')


def rewrite_posts() -> None:
    pat = re.compile(r'src="(?:\.\./\.\./|/)img/([^"]+)"')

    def repl(m: 're.Match[str]') -> str:
        name = urllib.parse.unquote(m.group(1))
        name = os.path.splitext(name)[0] + '.webp'
        return 'src="/img/' + urllib.parse.quote(name) + '"'

    changed = 0
    for f in glob.glob('public/posts/*.html'):
        s = open(f, encoding='utf-8').read()
        new = pat.sub(repl, s)
        if new != s:
            open(f, 'w', encoding='utf-8').write(new)
            changed += 1
    print(f'포스트 {changed}개 경로 갱신')


if __name__ == '__main__':
    convert()
    rewrite_posts()
    print('원본 PNG 삭제:  find public -name "*.png" -delete')
