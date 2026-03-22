import React from 'react';
import PropTypes from 'prop-types';
import NotePreview from './NotePreview';

import '../styles/note-list.css';

const AsyncFunction = Object.getPrototypeOf(async () => {}).constructor;

export default function NoteList({ notes, onClick, onDelete }) {
  const noteList = notes.map((note) => {
    const { id, title, content } = note;

    return (
      <NotePreview
        key={id}
        title={title}
        content={content}
        onClick={async () => { await onClick(id); }}
        onDelete={async () => { await onDelete(id); }}
      />
    );
  });

  return (
    <div className="note-list-parent">
      <div className="note-list">
        {noteList}
      </div>
    </div>
  );
}

NoteList.propTypes = {
  notes: PropTypes.arrayOf(PropTypes.object).isRequired,
  onClick: PropTypes.instanceOf(AsyncFunction).isRequired,
  onDelete: PropTypes.instanceOf(AsyncFunction).isRequired,
};
