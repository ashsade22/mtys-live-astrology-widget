"""Bundle the owned modules for offline controlled review; no deployment or dependency install."""
from pathlib import Path
import re
ROOT=Path(__file__).resolve().parents[2]
modules={};parts=[]
def bundle(path):
 path=path.resolve()
 if path in modules:return modules[path]
 name='M'+str(len(modules));modules[path]=name
 source=path.read_text()
 def imp(m):
  dependency=bundle(path.parent/m.group(2))
  return 'const {'+m.group(1)+'}='+dependency+';'
 source=re.sub(r"import\s*\{([^}]+)\}\s*from\s*['\"]([^'\"]+)['\"];",imp,source)
 exports=re.findall(r'export\s+(?:const|function)\s+(\w+)',source)
 for group in re.findall(r'export\s*\{([^}]+)\};',source):exports.extend(x.strip() for x in group.split(','))
 source=re.sub(r'export\s*\{[^}]+\};','',source)
 source=re.sub(r'export\s+(?=const|function)','',source)
 parts.append('const '+name+'=(()=>{\n'+source+'\nreturn {'+','.join(dict.fromkeys(exports))+'};})();')
 return name
bundle(ROOT/'pilot/discovery/entry.mjs')
script='\n'.join(parts)
html=(ROOT/'pilot/discovery/preview.html').read_text()
html=re.sub(r'<script type="module" src="./entry.mjs".*?</script>',lambda m:'<script>'+script.replace('</script','<\\/script')+'</script>',html,flags=re.S)
assert 'src="./entry.mjs"' not in html and len(html)>50000, 'Bundle entry substitution failed'
review='''<aside style="padding:16px;font:16px Arial;color:#0b2534;background:#efe1dc"><strong>Controlled component review</strong><p>These controls change the component width, not the browser viewport or Wix shell.</p><label>Component width <select id="review-width"><option>760</option><option>430</option><option>390</option><option>375</option><option>320</option></select></label></aside>'''
html=html.replace('<main data-pilot-root>','<div class="viewport" style="width:760px;max-width:100%;margin:auto;container-type:inline-size"><main data-pilot-root>').replace('</main>','</main></div>').replace('<header ',review+'<header ')
html=html.replace('</body>','<script>document.getElementById("review-width").addEventListener("change",e=>{document.querySelector(".viewport").style.width=e.target.value+"px";});</script></body>')
(ROOT/'pilot/discovery/review.html').write_text(html)
Path('/workspace/scratch/MTYS-Controlled-Discovery-Prototype.html').write_text(html)
print('Built offline review:',len(html.encode()),'bytes; no network request or publication performed')
