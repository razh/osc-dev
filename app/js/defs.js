/*global _*/
'use strict';

function setter( value ) {
  /*jshint validthis:true*/
  this.value = value;
  return this;
}

function setterMultiple( indices, value ) {
  /*jshint validthis:true*/
  _.set( this.values, indices, value );
  return this;
}

// Boolean.
function Push( name, value ) {
  this.name = name || '';
  this.value = value || false;
}

Push.type = 'push';

Push.prototype.set = setter;

function Toggle( name, value ) {
  this.name = name || '';
  this.value = value || false;
}

Toggle.type = 'toggle';

Toggle.prototype.set = setter;

// Numeric.
function Fader( name, value ) {
  this.name = name || '';
  this.value = value || 0;
}

Fader.type = 'fader';

Fader.prototype.set = setter;

function Rotary( name, value ) {
  this.name = name || '';
  this.value = value || 0;
}

Rotary.type = 'rotary';

Rotary.prototype.set = setter;

// Encoder.
function Encoder( name ) {
  this.name = name || '';
}

Encoder.type = 'encoder';

Encoder.prototype.set = function( value ) {
  console.log( value );
  return this;
};


// Coordinates.
function XY( name, x, y ) {
  this.name = name || '';
  this.x = x || 0;
  this.y = y || 0;
}

XY.type = 'xy';

XY.prototype.set = function( x, y ) {
  this.x = x;
  this.y = y;
  return this;
};


// Multi-controls.
function MultiToggle( name, values ) {
  this.name = name || '';
  this.values = values || [];
}

MultiToggle.type = 'multitoggle';

MultiToggle.prototype.set = setterMultiple;


function MultiXY( name, values ) {
  this.name = name || '';
  this.values = values || [];
}

MultiXY.type = 'multixy';

MultiXY.prototype.set = setterMultiple;


function MultiPush( name, values ) {
  this.name = name || '';
  this.values = values || [];
}

MultiPush.type = 'multipush';

MultiPush.prototype.set = setterMultiple;


function MultiFader( name, values ) {
  this.name = name || '';
  this.values = values || [];
}

MultiFader.type = 'multifader';

MultiFader.prototype.set = setterMultiple;


// Tab.
function Tab( name ) {
  this.name = name || '';
  this.controls = [];
}

Tab.type = 'tab';
