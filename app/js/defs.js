import _ from './utils';

class Control {
  constructor( name = '', value = 0 ) {
    this.name = name;
    this.value = value;
  }

  set( value ) {
    this.value = value;
    return this;
  }
}

class MultiControl {
  constructor( name = '', values = [] ) {
    this.name = name;
    this.values = values;
  }

  set( indices, value ) {
    _.set( this.values, indices, value );
    return this;
  }
}

// Boolean.
export class Push extends Control {}
Push.type = 'push';

export class Toggle extends Control {}
Toggle.type = 'toggle';

// Numeric.
export class Fader extends Control {}
Fader.type = 'fader';

export class Rotary extends Control {}
Rotary.type = 'rotary';

// Encoder.
export class Encoder {
  constructor( name = '' ) {
    this.name = name;
  }

  set( value ) {
    console.log( value );
    return this;
  }
}

Encoder.type = 'encoder';

// Coordinates.
export class XY {
  constructor( name = '', x = 0, y = 0 ) {
    this.name = name;
    this.x = x;
    this.y = y;
  }

  set( x, y ) {
    this.x = x;
    this.y = y;
    return this;
  }
}

XY.type = 'xy';


// Multi-controls.
export class MultiToggle extends MultiControl {}
MultiToggle.type = 'multitoggle';

export class MultiXY extends MultiControl {}
MultiXY.type = 'multixy';

export class MultiPush extends MultiControl {}
MultiPush.type = 'multipush';

export class MultiFader extends MultiControl {}
MultiFader.type = 'multifader';

// Tab.
export class Tab {
  constructor( name = '', controls = [] ) {
    this.name = name;
    this.controls = controls;
  }
}

Tab.type = 'tab';
