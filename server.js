'use strict'; // jshint node: true, browser: false, esnext: true
var proxy   = require('http-proxy').createProxyServer({});
var express = require('express');
var app     = express();

// Configure options

app.use(require('morgan')('dev'));

// Configure routes

app.use('/printsmart/app', express.static(__dirname + '/app'));
app.all('/api/*',          function(req, res) { proxy.web(req, res, { target: 'https://api.cbd.int:443', secure: false } ); } );
app.get('/printsmart*',    function(req, res) { res.sendFile(__dirname + '/app/template.html', {maxAge:300000}); });
app.all('/*',              function(req, res) { res.status(404).send(); });

// LOG PROXY ERROR & RETURN http:500

proxy.on('error', function (e) {
    console.error('proxy error:', e);
});

// START HTTP SERVER

app.listen(process.env.PORT || 2000, '0.0.0.0', function () {
	console.log('Server listening on %j', this.address());
});

process.on('SIGTERM', ()=>process.exit());
