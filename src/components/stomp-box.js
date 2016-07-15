var React = require('react');
var Knob = require('./knob');

module.exports = React.createClass({
  getInitialState: function() {
    return { active: true };
  },
  htmlClass: function() {
    return this.props.effect.name.replace(/\W+/, '-').toLowerCase()
  },
  toggleSwitch: function() {
    this.setState({ active: !this.state.active }, function() {
      this.props.effect.toggleSwitch(this.state.active)
    }.bind(this));
  },
  render: function() {
    var effect = this.props.effect,
        knobs = this.props.effect.knobs.map(function(knob) {
          return <Knob knob={ knob } key={ knob.label } initialValue={ 5 } />;
        }),
        activeClass = this.state.active ? "on" : "off";

    return (
      <div className={ ["stomp-box", activeClass, this.htmlClass()].join(" ") }>
        <div className="knobs">
          <div className="stomp-led"></div>
          { knobs }
        </div>
        <div className="stomp-switch" onClick={ this.toggleSwitch }>
          { effect.name }
          <small>{ effect.type }</small>
        </div>
      </div>
    );
  }
});