#!/usr/bin/env python

# source: http://georgik.sinusgear.com/2011/01/07/how-to-dump-post-request-with-python/

import SimpleHTTPServer
import SocketServer
import sys

PORT = 8000

class ServerHandler(SimpleHTTPServer.SimpleHTTPRequestHandler):

    def __init__(self, request, client_address, server):
		self.saveFile = open(sys.argv[1] + '.txt','a')
		SimpleHTTPServer.SimpleHTTPRequestHandler.__init__(self, request,client_address, server)
	
    def do_GET(self):
        SimpleHTTPServer.SimpleHTTPRequestHandler.do_GET(self)

    def do_POST(self):
		content_len = int(self.headers.getheader('content-length'))
		message = self.rfile.read(content_len)
		self.saveFile.write(message + '\n')
		print message
		try:
			self.send_response(200)
			self.send_header("Content-type", "text/plain")
			self.end_headers()
		except:
			pass
		return

    def log_message(self, format, *args):
        return
			
	
Handler = ServerHandler

httpd = SocketServer.TCPServer(("", PORT), Handler)

print "serving at port", PORT
httpd.serve_forever()