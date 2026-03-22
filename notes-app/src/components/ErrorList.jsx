import React, { Component } from 'react';
import Error from './Error';
import '../styles/error-list.css';

export default class ErrorList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      errors: [],
      errorIndex: 0,
    };

    this.handleError = this.handleError.bind(this);
  }

  handleError(err) {
    const { errors, errorIndex } = this.state;
    this.setState({
      errors: errors.concat([{ errorIndex, err: JSON.stringify(err) }]),
      errorIndex: errorIndex + 1,
    });

    setTimeout(() => {
      const { errors: errors2 } = this.state;
      const newErrors = errors2.filter((val) => val.errorIndex !== errorIndex);
      this.setState({ errors: newErrors });
    }, 5000);
  }

  render() {
    const { errors } = this.state;

    return (
      <div className="error-list">
        {errors.map(({ errorIndex, err }) => (
          <Error key={errorIndex} err={err} />
        ))}
      </div>
    );
  }
}
