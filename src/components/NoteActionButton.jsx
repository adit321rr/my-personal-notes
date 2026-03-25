import React from 'react';

function NoteActionButton({ variant, label, onClick, dataTestId }) {
  return (
    <button
      className={`note-item__${variant}-button`}
      onClick={onClick}
      data-testid={dataTestId}
    >
      {label}
    </button>
  );
}

export default NoteActionButton;