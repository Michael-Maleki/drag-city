import React from 'react';
import ReactDice from 'react-dice-complete';
import './dice.css';

class Dice extends React.Component {
  state = {
    initial: true
  }

  componentDidMount = () => {
    this.setState({initial: false})
  }

  render() {
    return (
      <div>
        <ReactDice
          numDice="1"
          rollDone={(num) => {
            this.props.p1Move(num, this.state.initial)}}
          ref={dice => this.reactDice = dice}
        />
      </div>
    )
  }
}

export default Dice;