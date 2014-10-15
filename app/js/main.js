(function() {
  'use strict';

  var params = window.location.search.substring(1)
    .split( '&' )
    .reduce(function( object, param ) {
      var pair = param.split( '=' ).map( decodeURIComponent );
      object[ pair[0] ] = pair[1];
      return object;
    }, {} );

  var port = params.port || 8080;

  var host = window.location.hostname;
  var socket = new WebSocket( 'ws://' + host + ':' + port );

  socket.addEventListener( 'message', function( event ) {
    var data = JSON.parse( event.data );
    console.log( data );
  });

  var types = [
    'push',
    'toggle',
    'xy',
    'fader',
    'rotary',
    'encoder',
    'multitoggle',
    'multixy',
    'multipush',
    'multifader'
  ];


  // Boolean.
  function Push( value ) { this.value = value || false; }
  function Toggle( value ) { this.value = value || false; }

  // Numeric.
  function Fader( value ) { this.value = value || 0; }
  function Rotary( value ) { this.value = value || 0; }

  // Coordinates.
  function XY( x, y ) {
    this.x = x || 0;
    this.y = y || 0;
  }

  // Collections.
  function MultiToggle( values ) { this.values = values || []; }
  function MultiXY( values ) { this.values = values || []; }
  function MultiPush( values ) { this.values = values || []; }

}) ();
