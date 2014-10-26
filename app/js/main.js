/* global Push,
Toggle,
XY,
Fader,
Rotary,
Encoder,
MultiToggle,
MultiXY,
MultiPush,
MultiFader,
Tab
 */
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
    route( data );
  });

  var constructors = [
    Push,
    Toggle,
    XY,
    Fader,
    Rotary,
    Encoder,
    MultiToggle,
    MultiXY,
    MultiPush,
    MultiFader
  ];

  var parsers = constructors.map(function( constructor ) {
    var name = constructor.type;

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
      name + '([^\\/]*)?' +

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
          type: name,
          constructor: constructor,
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

  // Global tabs and controls.
  var state = {
    tabs: [],
    controls: []
  };

  function findBy( array, callback ) {
    var element;
    for ( var i = 0, il = array.length; i < il; i++ ) {
      element = array[i];
      if ( callback( element, i, array ) ) {
        return element;
      }
    }
  }

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

  function route( data ) {
    var match;
    var name;

    // Tab (no variables).
    var tab;
    if ( data.length === 1 ) {
      match = /\/([^\/]+)/.exec( data[0] );
      if ( match ) {
        name = match[1];

        tab = findBy( state.tabs, function( element ) {
          return element.name === name;
        });

        if ( !tab ) {
          tab = new Tab( name );
          state.tabs.push( tab );
        }

        console.log( tab );
      }

      return;
    }

    // Control.
    var string = data[0];
    for ( var i = 0, il = parsers.length; i < il; i++ ) {
      match = parsers[i].parse( string );
      if ( match ) {
        break;
      }
    }

    console.log( match );
    if ( !match ) {
      return;
    }

    // Find controls array.
    var controls;
    if ( match.tab ) {
      tab = findBy( state.tabs, function( element ) {
        return element.name === match.tab;
      });

      if ( !tab ) {
        tab = new Tab( match.tab );
        state.tabs.push( tab );
      }

      controls = tab.controls;
    } else {
      // Global controls.
      controls = state.controls;
    }

    var control = findBy( controls, function( control ) {
      return control.name === match.name;
    });

    if ( !control ) {
      control = new match.constructor( match.name );
      controls.push( control );
    }

    console.log( control );
  }

}) ();
