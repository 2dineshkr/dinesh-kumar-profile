from pathlib import Path
from html.parser import HTMLParser
from urllib.parse import urlsplit, unquote
import subprocess, hashlib, json
root=Path(__file__).resolve().parents[1]
class Page(HTMLParser):
    def __init__(self):super().__init__();self.refs=[];self.ids=set();self.meta=set()
    def handle_starttag(self,tag,attrs):
        a=dict(attrs)
        if 'id' in a:self.ids.add(a['id'])
        for attr in ['href','src']:
            if attr in a:self.refs.append(a[attr])
        if tag=='meta':self.meta.add(a.get('name') or a.get('property'))
pages={}
for p in root.rglob('*.html'):
    if '.local-qa' in p.parts:continue
    parser=Page();parser.feed(p.read_text(encoding='utf-8'));pages[p.resolve()]=parser
errors=[]
for p,page in pages.items():
    for ref in page.refs:
        url=urlsplit(ref)
        if url.scheme or url.netloc:continue
        if url.path.startswith('/'):
            errors.append(f'Root-relative URL: {p.relative_to(root)} {ref}');continue
        target=(p.parent/unquote(url.path)).resolve() if url.path else p
        if target.is_dir():target=target/'index.html'
        if not target.exists():errors.append(f'Missing target: {p.relative_to(root)} {ref}')
        elif url.fragment and target in pages and url.fragment not in pages[target].ids:errors.append(f'Missing fragment: {p.relative_to(root)} {ref}')
original=subprocess.check_output(['git','show','HEAD:assets/images/dinesh-kumar.jpg'],cwd=root)
portrait=(root/'assets/images/dinesh-kumar.jpg').read_bytes()
result={'html_pages':len(pages),'link_errors':errors,'portrait_unchanged':hashlib.sha256(original).hexdigest()==hashlib.sha256(portrait).hexdigest(),'homepage_metadata':sorted(x for x in pages[root/'index.html'].meta if x)}
(root/'review/static-checks.json').write_text(json.dumps(result,indent=2))
print(json.dumps(result,indent=2));raise SystemExit(bool(errors) or original!=portrait)
