'use strict';

var osc = require( 'node-osc' );

var CLIENT = process.env.CLIENT || '127.0.0.1';
var IN = process.env.IN || 3334;
var OUT = process.env.OUT || 3333;

var client = new osc.Client( CLIENT, IN );
var server = new osc.Server( OUT, '0.0.0.0' );

server.on( 'message', function( msg ) {
  console.log( msg );
});
