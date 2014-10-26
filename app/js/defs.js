'use strict';

// Boolean.
function Push( name, value ) {
  this.name = name || '';
  this.value = value || false;
}

Push.type = 'push';

function Toggle( name, value ) {
  this.name = name || '';
  this.value = value || false;
}

Toggle.type = 'toggle';

// Numeric.
function Fader( name, value ) {
  this.name = name || '';
  this.value = value || 0;
}

Fader.type = 'fader';

function Rotary( name, value ) {
  this.name = name || '';
  this.value = value || 0;
}

Rotary.type = 'rotary';

// Encoder.
function Encoder( name ) {
  this.name = name || '';
}

Encoder.type = 'encoder';

// Coordinates.
function XY( name, x, y ) {
  this.name = name || '';
  this.x = x || 0;
  this.y = y || 0;
}

XY.type = 'xy';

// Multi-controls.
function MultiToggle( name, values ) {
  this.name = name || '';
  this.values = values || [];
}

MultiToggle.type = 'multitoggle';

function MultiXY( name, values ) {
  this.name = name || '';
  this.values = values || [];
}

MultiXY.type = 'multixy';

function MultiPush( name, values ) {
  this.name = name || '';
  this.values = values || [];
}

MultiPush.type = 'multipush';

function MultiFader( name, values ) {
  this.name = name || '';
  this.values = values || [];
}

MultiFader.type = 'multifader';

// Tab.
function Tab( name ) {
  this.name = name || '';
  this.controls = [];
}

Tab.type = 'tab';
