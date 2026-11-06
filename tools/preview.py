import http.server
from pathlib import Path
class Preview(http.server.SimpleHTTPRequestHandler):
    def __init__(self,*args,**kwargs):super().__init__(*args,directory=str(Path(__file__).resolve().parents[1]),**kwargs)
    def translate_path(self,path):
        prefix='/dinesh-kumar-profile'
        if path.startswith(prefix+'/'):path=path[len(prefix):]
        return super().translate_path(path)
http.server.ThreadingHTTPServer(('127.0.0.1',8001),Preview).serve_forever()
