import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import NoteList from './NoteList';

import '../styles/notes-view.css';
import Note from './Note';

export default class NotesView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      notes: [],
      currentNote: undefined,
    };

    this.handleCloseNote = this.handleCloseNote.bind(this);
    this.handleNewNote = this.handleNewNote.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.handleGet = this.handleGet.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  async componentDidMount() {
    await this.handleSearch('');
  }

  handleCloseNote() {
    this.setState({ currentNote: undefined });
  }

  handleNewNote() {
    this.setState({ currentNote: { id: '-1', title: '', content: '' } });
  }

  async handleSearch(search) {
    const { handleError } = this.props;

    try {
      const { data: { err, notes } } = await axios.post('/api/notes/getPreviews', { search });

      if (err) handleError(err);
      else this.setState({ notes });
    } catch (err) {
      handleError(err);
    }
  }

  async handleGet(id) {
    const { handleError } = this.props;

    try {
      const { data: { err, note } } = await axios.post('/api/notes/get', { id });

      if (err) handleError(err);
      else this.setState({ currentNote: note });
    } catch (err) {
      handleError(err);
    }
  }

  async handleSave({ id, title, content }) {
    const { handleError } = this.props;

    try {
      let res;
      if (id === '-1') {
        res = await axios.post('/api/notes/post', { title, content });
        const { data: { id: newId, title: newTitle, content: newContent } } = res;

        this.setState({ currentNote: { id: newId, title: newTitle, content: newContent } });
      } else {
        res = await axios.put('/api/notes/put', { id, title, content });
      }

      await this.handleSearch('');
      const { data: { err } } = res;
      if (err) handleError(err);
    } catch (err) {
      handleError(err);
    }
  }

  async handleDelete(id) {
    const { handleError } = this.props;

    if (id === '-1') {
      this.setState({ currentNote: undefined });
      return;
    }

    try {
      const { data: { err } } = await axios.post('/api/notes/delete', { id });
      await this.handleSearch('');
      if (err) handleError(err);
    } catch (err) {
      handleError(err);
    }
  }

  render() {
    const { notes, currentNote } = this.state;

    let currentNoteView;
    if (currentNote) {
      const { id, title, content } = currentNote;
      currentNoteView = (
        <Note
          id={id}
          title={title}
          content={content}
          onSave={this.handleSave}
          onDelete={this.handleDelete}
          onClose={this.handleCloseNote}
        />
      );
    }

    return (
      <div className="notes-view-wrapper">
        <div className={`current-note ${currentNoteView ? 'viewing-note' : ''}`}>
          {currentNoteView}
        </div>
        <div className="notes-view" style={(currentNoteView) ? { filter: 'blur(2px)' } : {}}>
          <NoteList notes={notes} onClick={this.handleGet} onDelete={this.handleDelete} />
          <FontAwesomeIcon
            type="button"
            onClick={this.handleNewNote}
            className="add-button"
            icon={faPlus}
          />
        </div>
      </div>
    );
  }
}

NotesView.propTypes = {
  handleError: PropTypes.func.isRequired,
};
