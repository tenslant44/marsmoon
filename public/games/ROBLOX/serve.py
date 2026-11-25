#!/usr/bin/env python3
"""Serves this folder on http://127.0.0.1:8000 (or the port you pass). The page cannot run from
file:// because browsers will not fetch the WebAssembly module or content files that way."""
import http.server
import os
import socketserver
import sys


class Handler(http.server.SimpleHTTPRequestHandler):
    extensions_map = {
        **http.server.SimpleHTTPRequestHandler.extensions_map,
        ".wasm": "application/wasm",
        ".js": "text/javascript; charset=utf-8",
        ".html": "text/html; charset=utf-8",
    }


class Server(socketserver.TCPServer):
    allow_reuse_address = True


if __name__ == "__main__":
    port = int(sys.argv[1]) if len(sys.argv) > 1 else 8000
    os.chdir(os.path.dirname(os.path.abspath(__file__)))
    with Server(("127.0.0.1", port), Handler) as httpd:
        print("OpenRBX player: http://127.0.0.1:%d/  (Ctrl+C to stop)" % port)
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            pass
