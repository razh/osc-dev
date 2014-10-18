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

    // Tab (no variables).
    if ( data.length === 1 ) {
      var match = /\/([^\/]+)/.exec( data[0] );
      if ( match ) {
        console.log({
          type: 'tab',
          tab: match[1]
        });
      }
    } else {
      // Control.
      route( data[0] );
    }
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

  var parsers = types.map(function( type ) {
    var regexString = '\\/' +
      /* Tab name. */
      // Non-captured tab name group.
      '(?:' +
          // Name (any non-slash character).
          '([^\\/]+)' +
          // Non-captured trailing slash.
          '(?:\\/)' +
      // Tab names are optional.
      ')?' +

      /* Control name (with type). */
      type + '([^\\/]*)?' +

      /* Optional coordinates for multi-controls. */
      '(?:\\/' +
        '(.+)' +
      ')?';

    var regex = new RegExp( regexString );
    console.log( regex );

    function parse( string ) {
      var path = regex.exec( string );
      if ( path ) {
        return {
          type: type,
          tab: path[1],
          name: path[2],
          coordinates: path[3] ? path[3].split( '/' ) : path[3]
        };
      }
    }

    return {
      regex: regex,
      parse: parse
    };
  });

  /**
   * The standard control name format consists of the tab, control, and
   * coordinates specifiers for multi-controls.
   *
   * Example:
   *
   *   /2/multitoggle1/2/1
   *
   * Note that the tab is optional. Controls can be global.
   */

  function route( string ) {
    var match;
    for ( var i = 0, il = parsers.length; i < il; i++ ) {
      match = parsers[i].parse( string );
      if ( match ) {
        console.log( match );
        break;
      }
    }
  }

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
