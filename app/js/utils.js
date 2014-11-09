/*exported _*/
'use strict';

var _ = {};

_.find = function( array, callback ) {
  var element;
  for ( var i = 0, il = array.length; i < il; i++ ) {
    element = array[i];
    if ( callback( element, i, array ) ) {
      return element;
    }
  }
};
