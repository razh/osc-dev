import React from 'react/addons';

export var XYView = React.createClass({
  getDefaultProps() {
    return {
      control: {}
    };
  },

  propTypes: {
    control: React.PropTypes.object
  },

  render() {
    return (
      <div className='control xy'>
        <div className='control-name'>{this.props.control.name}</div>
        <div className='control-value'>{this.props.control.x}</div>
        <div className='control-value'>{this.props.control.y}</div>
      </div>
    );
  }
});

export var ControlView = React.createClass({
  getDefaultProps() {
    return {
      control: {}
    };
  },

  propTypes: {
    control: React.PropTypes.object
  },

  render() {
    return (
      <div className='control'>
        <div className='control-name'>{this.props.control.name}</div>
        <div className='control-value'>{this.props.control.value}</div>
      </div>
    );
  }
});

export var MultiControlView = React.createClass({
  getDefaultProps() {
    return {
      control: {}
    };
  },

  propTypes: {
    control: React.PropTypes.object
  },

  render() {
    function renderValue( value, i ) {
      return Array.isArray( value ) ?
        <div className='control-values' key={i}>{value.map( renderValue )}</div> :
        <div className='control-value' key={i}>{value}</div>;
    }

    return (
      <div className='control multi-control'>
        <div className='control-name'>{this.props.control.name}</div>
        {renderValue( this.props.control.values, 0 )}
      </div>
    );
  }
});

export var TabView = React.createClass({
  getDefaultProps() {
    return {
      tab: {}
    };
  },

  propTypes: {
    tab: React.PropTypes.object
  },

  render() {
    return (
      <div className='tab'>
        <div className='tab-name'>{this.props.tab.name}</div>
        <div className='tab-controls'>
          {this.props.tab.controls.map(( control, i ) => {
            if ( control.constructor.type === 'xy' ) {
              return <XYView key={i} control={control}/>;
            } else if ( control.hasOwnProperty( 'value' ) ) {
              return <ControlView key={i} control={control}/>;
            } else if ( control.hasOwnProperty( 'values' ) ) {
              return <MultiControlView key={i} control={control}/>;
            }

            return <div key={i}>{control}</div>;
          })}
        </div>
      </div>
    );
  }
});

export var TabsView = React.createClass({
  getDefaultProps() {
    return {
      tabs: []
    };
  },

  propTypes: {
    tabs: React.PropTypes.array
  },

  render() {
    return (
      <div className='tabs'>
        {this.props.tabs.map(( tab, i ) => {
          return <TabView key={i} tab={tab}/>;
        })}
      </div>
    );
  }
});

export var StateView = React.createClass({
  getDefaultProps() {
    return {
      controls: [],
      tabs: []
    };
  },

  propTypes: {
    controls: React.PropTypes.array,
    tabs: React.PropTypes.array
  },

  render() {
    return (
      <div className='state'>
        <TabView tab={{
          name: '0',
          controls: this.props.controls
        }}/>
        <TabsView tabs={this.props.tabs}/>
      </div>
    );
  }
});

export function render( state ) {
  React.render( <StateView {...state}/>, document.body );
}
