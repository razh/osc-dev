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

_.set = function( array, indices, value ) {
  if ( !Array.isArray( array ) &&
       !Array.isArray( indices ) &&
       !indices.length ) {
    return;
  }

  var index;
  for ( var i = 0, il = indices.length; i < il; i++ ) {
    index = indices[i];

    // Set if last index.
    if ( i === il - 1 ) {
      array[ index ] = value;
      return value;
    }

    if ( array[ index ] === undefined ) {
      array[ index ] = [];
    }

    array = array[ index ];
  }
};
