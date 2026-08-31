import re, glob, collections
files = glob.glob('content/posts/*.mdx')
def keyfor(fname):
    base = fname.replace('\\', '/').split('/')[-1].replace('.mdx', '')
    base = re.sub(r'-(2025|2026)$', '', base)
    parts = base.split('-')
    return parts[0]
groups = collections.defaultdict(list)
for f in files:
    groups[keyfor(f)].append(f.replace('\\', '/').split('/')[-1])
multi = {k: v for k, v in groups.items() if len(v) >= 4}
for k in sorted(multi, key=lambda k: -len(multi[k])):
    print(k, len(multi[k]), multi[k])
