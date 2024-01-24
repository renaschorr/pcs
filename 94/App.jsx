import { Component } from 'react';


class App extends Component {
  state = {
    current: '0'
  };

  

  calculate() {
    const left = Number(this.state.first);
    const right = Number(this.state.current);
    let result;
    switch(this.state.operation) {
      case '+':
        result = left + right;
        break;
      case '-':
        result = left - right;
        break;
      case '*':
        result = left * right;
        break;
      case '/':
        result = left / right;
        break;
    }
    this.setState({
      current: result
    });
  }

  

  handleButtonClick(btn) {
    switch(btn) {
      case '+':
      case '-':
      case '*':
      case '/':
        this.setState({
          first: this.state.current,
          current: '',
          operation: btn
        })
        break;
      case 'C':
        this.setState({
          current: '0',
          first: 0,
          operation: null
        })
        break;
      case '=':
        this.calculate();
        break;
      case '.':
        if (this.state.current.includes('.')) {
          break;
        }
      default:
        this.setState({
          current: this.state.current === '0' ? btn.toString() : this.state.current + btn
        });
    }
  }

  render() {
const row1 = [7, 8, 9, '+'].map(n => <button key={n} onClick={() => this.handleButtonClick(n)}>{n}</button>);
const row2 = [4, 5, 6, '-'].map(n => <button key={n} onClick={() => this.handleButtonClick(n)}>{n}</button>);
const row3 = [1, 2, 3, '*'].map(n => <button key={n} onClick={() => this.handleButtonClick(n)}>{n}</button>);
const row4 = ['C', 0, '.', '/'].map(n => <button key={n} onClick={() => this.handleButtonClick(n)}>{n}</button>);
const row5 = ['='].map(n => <button key={n} onClick={() => this.handleButtonClick(n)}>{n}</button>);

const buttons = [row1, row2, row3, row4, row5].map((row, index) => <div key={index}>{row}</div>);

    return (
      <div className="calculator">
        <input value={this.state.current} readOnly/>
        {buttons}
      </div>
    );
  }
}

export default App