export default {
  set( array, indices, value ) {
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
  }
};
