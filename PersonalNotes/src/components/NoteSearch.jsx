import React from 'react';

function NoteSearch({ searchKeyword, onSearchChange }) {
  return (
    <div data-testid="note-search" className="note-search">
      <input
        type="text"
        placeholder="Cari catatan ..."
        data-testid="note-search-input"
        value={searchKeyword}
        onChange={(e) => onSearchChange(e.target.value)}
      />
    </div>
  );
}

export default NoteSearch;