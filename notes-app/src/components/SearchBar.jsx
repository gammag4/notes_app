import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '../styles/search-bar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

export default class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
    };

    this.handleValueChange = this.handleValueChange.bind(this);
  }

  handleValueChange(event) {
    const { onChange } = this.props;
    onChange(event.target.value);
    this.setState({ value: event.target.value });
  }

  render() {
    const { value } = this.state;

    return (
      <div className="search-bar">
        <input type="text" placeholder="" value={value} onChange={this.handleValueChange} />
        <FontAwesomeIcon className="icon" icon={faSearch} />
      </div>
    );
  }
}

SearchBar.propTypes = {
  onChange: PropTypes.func,
};

SearchBar.defaultProps = {
  onChange: () => {},
};
