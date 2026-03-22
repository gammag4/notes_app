import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import PropTypes from 'prop-types';

import '../styles/note-preview.css';

const AsyncFunction = Object.getPrototypeOf(async () => {}).constructor;

export default function NotePreview({
  title, content, onClick, onDelete,
}) {
  return (
    <button
      type="button"
      className="note-preview"
      onClick={onClick}
    >
      <div className="title text" hascontent={String(!!title)}>{title || 'No Title'}</div>
      <div className="content text" hascontent={String(!!content)}>
        {content || 'No Content'}
      </div>
      <div className="icons">
        <FontAwesomeIcon
          type="button"
          onClick={async (e) => {
            e.stopPropagation();
            await onDelete();
          }}
          className="icon delete"
          icon={faTrashAlt}
        />
      </div>
    </button>
  );
}

NotePreview.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  onClick: PropTypes.instanceOf(AsyncFunction).isRequired,
  onDelete: PropTypes.instanceOf(AsyncFunction).isRequired,
};
