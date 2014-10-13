'use strict';

var osc = require( 'node-osc' );
var WebSocketServer = require( 'ws' ).Server;

var CLIENT = process.env.CLIENT || '127.0.0.1';
var IN = process.env.IN || 3334;
var OUT = process.env.OUT || 3333;

// Web socket port.
var PORT = process.env.PORT || 8080;

var client = new osc.Client( CLIENT, IN );
var server = new osc.Server( OUT, '0.0.0.0' );

var wss = new WebSocketServer({ port: PORT });

var send = function() {};

server.on( 'message', function( msg ) {
  send( msg );
});

wss.on( 'connection', function( socket ) {
  send = function( msg ) {
    socket.send( JSON.stringify( msg ) );
  };
});
