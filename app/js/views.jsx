import React from 'react/addons';

export var ControlView = React.createClass({
  getDefaultProps() {
    return {
      control: {}
    };
  },

  render() {
    return (
      <div>
        <div>{this.props.control.name}</div>
        <div>{this.props.control.value}</div>
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

  render() {
    function renderValue( value ) {
      return Array.isArray( value ) ?
        <div>{value.map( renderValue )}</div> :
        <div>{value}</div>;
    }

    return (
      <div>
        <div>{this.props.control.name}</div>
        {renderValue(this.props.control.values)}
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

  render() {
    return (
      <div>
        <div>{this.props.tab.name}</div>
        {this.props.tab.controls.map( control => {
          if ( control.hasOwnProperty( 'value' ) ) {
            return <ControlView control={control}/>;
          } else if ( control.hasOwnProperty( 'values' ) ) {
            return <MultiControlView control={control}/>;
          }

          return <div>{control}</div>;
        })}
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

  render() {
    return (
      <div>
        {this.props.tabs.map( tab => {
          return <TabView tab={tab}/>;
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

  render() {
    return (
      <div>
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
