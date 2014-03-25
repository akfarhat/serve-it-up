#!/usr/bin/env python

# source: http://georgik.sinusgear.com/2011/01/07/how-to-dump-post-request-with-python/

import SimpleHTTPServer
import SocketServer
import logging
import cgi

PORT = 8000

class ServerHandler(SimpleHTTPServer.SimpleHTTPRequestHandler):

    def do_GET(self):
        SimpleHTTPServer.SimpleHTTPRequestHandler.do_GET(self)

    def do_POST(self):
		content_len = int(self.headers.getheader('content-length'))
		print self.rfile.read(content_len);self.send_response(200)

		self.send_header("Content-type", "text/plain")
		self.end_headers()
		self.wfile.write("Done!n")
		return

    def log_message(self, format, *args):
        return

Handler = ServerHandler

httpd = SocketServer.TCPServer(("", PORT), Handler)

print "serving at port", PORT
httpd.serve_forever()