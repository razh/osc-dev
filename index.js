'use strict';

var midi = require( 'midi' );

var input = new midi.input();
var output = new midi.output();

var rtpmidi = require( 'rtpmidi' );

var session = rtpmidi.manager.createSession({
  localName: 'sessions',
  bonjourName: 'Node RTPMidi',
  port: 5008
});

input.openVirtualPort( 'midi-input' );
output.openVirtualPort( 'midi-output' );

session.on( 'message', function( deltaTime, message ) {
  var commands = [].slice.call( message, 0 );
  console.log( commands );
  output.sendMessage( commands );
});

input.on( 'message', function( deltaTime, message ) {
  session.sendMessage( deltaTime, message );
});

