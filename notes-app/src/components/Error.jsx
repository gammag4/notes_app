import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '../styles/error.css';

export default class Error extends Component {
  constructor(props) {
    super(props);

    this.state = {
      closed: false,
    };

    this.handleClose = this.handleClose.bind(this);
  }

  handleClose() {
    this.setState({ closed: true });
  }

  render() {
    const { err } = this.props;
    const { closed } = this.state;

    if (!err) return '';

    return (
      !closed && (
        <button
          type="button"
          className="error"
          onClick={this.handleClose}
        >
          {err}
        </button>
      )
    );
  }
}

Error.propTypes = {
  err: PropTypes.string.isRequired,
};
