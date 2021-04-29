import React, { Component } from "react";

class Timer extends Component {
  constructor() {
    super();
    this.timer = React.createRef();
    this.state = {
      time: 0,
      color: "#" + Math.floor(Math.random() * 16777215).toString(16)
    };
  }

  //Your code here

  componentDidMount() {
    this.interval = setInterval(
      this.clockTick,
      this.props.updateInterval * 1000
    );
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  //this changes the color of the timer text every time it updates (increases)
  //however, until we make a shouldComponentUpdate method, the color will ALSO
  //update every time the parent (App) updates, aka every time the + or - buttons
  //are pressed
  componentDidUpdate(){
    this.timer.current.style.color = "#" + Math.floor(Math.random()*16777215).toString(16)
  }

  //we can stop this behavior via shouldComponenUpdate (note this method has access
  //to the next props/state as arguments AND the current props/state as this.props/state):
  shouldComponentUpdate(nextProps, nextState){
    if(this.state.time === nextState.time){
      return false
    } return true
    }
  //ALTERNATIVE to above is to change the Timer component from regular to Pure
  //then we don't need shouldComponentUpdate bc Pure components have their own version of it

  render() {
    const { time, color, logText } = this.state;
    return (
      <section className="Timer" style={{ background: color }} ref={this.timer}>
        <h1>{time}</h1>
        <button onClick={this.stopClock}>Stop</button>
        <aside className="logText">{logText}</aside>
        <small onClick={this.handleClose}>X</small>
      </section>
    );
  }

  clockTick = () => {
    this.setState(prevState => ({
      time: prevState.time + this.props.updateInterval
    }));
  };

  stopClock = () => {
    clearInterval(this.interval);
    this.setState({ className: "hidden" });
  };

  // for the 'x' button,
  handleClose = () => {
    this.props.removeTimer(this.props.id);
  };
}

export default Timer;
