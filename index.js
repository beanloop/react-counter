var React = require('react');
var raf = require('raf');
var ease = require('ease-component');


var createClass = require('create-react-class');
var Counter = createClass({
  getInitialState: function() {
    return {
      value: this.props.begin,
      time: this.props.time,
      begin: this.props.begin,
      end: this.props.end,
      easing: this.props.easing,
      start:  Date.now(),
      stop: false,
      mounted: false
    };
  },

  componentDidMount: function() {
    this.mounted = true;
    raf(this.animate);
  },

  componentWillUnmount: function() {
    this.mounted = false;
  },

  animate: function() {
    if (this.state.stop) return;

    raf(this.animate);
    this.draw();
  },

  componentWillReceiveProps: function(nextProps) {
    this.setState({
      time: nextProps.time,
      begin: nextProps.begin,
      end: nextProps.end,
      easing: nextProps.easing,
      start: Date.now(),
      stop: false
    }, function() {
      raf(this.animate);
      this.draw();
    });
  },

  draw: function() {
    if (!this.mounted) return;

    var time = this.state.time;
    var begin = this.state.begin;
    var end = this.state.end;
    var easing = this.state.easing;

    easing = easing && easing in ease ? easing : 'outCube';

    var now = Date.now();
    if (now - this.state.start >= time) {
      this.setState({
        stop: true
      });
    }

    var percentage = (now - this.state.start) / time;
    percentage = percentage > 1 ? 1 : percentage;
    var easeVal = ease[easing](percentage);
    var val = begin + (end - begin) * easeVal;

    this.setState({
      value: val
    });
  },

  render: function() {
    var value = this.props.formatFunc ? this.props.formatFunc(this.state.value) : Math.round(this.state.value);
    return React.createElement(
      'span',
      { className: 'counter' },
      value
    );
  }
});

module.exports.Counter = Counter;
