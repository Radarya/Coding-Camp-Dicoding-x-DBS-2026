import React from 'react';
import NoteActionButton from './NoteActionButton';

function NoteItem({ id, title, body, date, archived, onDelete, onArchive, searchKeyword }) {
  // Fungsi penyorot teks sesuai Kriteria Advanced
  const highlightText = (text, keyword) => {
    if (!keyword) return text;
    const parts = text.split(new RegExp(`(${keyword})`, 'gi'));
    return parts.map((part, index) =>
      part.toLowerCase() === keyword.toLowerCase() ? <mark key={index}>{part}</mark> : part
    );
  };

  return (
    <div data-testid="note-item" className="note-item">
      <div data-testid="note-item-content" className="note-item__content">
        <h3 data-testid="note-item-title" className="note-item__title">
          {highlightText(title, searchKeyword)}
        </h3>
        <p data-testid="note-item-date" className="note-item__date">{date}</p>
        <p data-testid="note-item-body" className="note-item__body">
          {highlightText(body, searchKeyword)}
        </p>
      </div>
      <div data-testid="note-item-action" className="note-item__action">
        <NoteActionButton
          variant="delete"
          onClick={() => onDelete(id)}
          text="Hapus"
          dataTestId="note-item-delete-button"
        />
        <NoteActionButton
          variant="archive"
          onClick={() => onArchive(id)}
          text={archived ? "Pindahkan" : "Arsipkan"}
          dataTestId="note-item-archive-button"
        />
      </div>
    </div>
  );
}

export default NoteItem;