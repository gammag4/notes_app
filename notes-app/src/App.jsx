import React, { Component } from 'react';
import ErrorList from './components/ErrorList';
import NotesView from './components/NotesView';

import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.errorListRef = React.createRef();

    this.handleError = this.handleError.bind(this);
  }

  handleError(err) {
    this.errorListRef.current.handleError(err);
  }

  render() {
    console.log(this.errorListRef);
    return (
      <div className="App">
        <NotesView handleError={this.handleError} />
        <ErrorList ref={this.errorListRef} />
      </div>
    );
  }
}

export default App;
