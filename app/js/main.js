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
    console.log( event );
  });

}) ();
