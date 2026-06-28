import React from 'react';
import NoteItem from './NoteItem';

function NotesList({ notes, onDelete, onArchive, searchKeyword, listType }) {
  const parentTestId = listType === 'active' ? 'active-notes-list' : 'archived-notes-list';

  const formatGroupKey = (dateStr) => {
    const date = new Date(dateStr);
    const month = date.toLocaleString('id-ID', { month: 'long' });
    const year = date.getFullYear();
    return `${month}-${year}`; 
  };

  const groupedNotes = notes.reduce((acc, note) => {
    const groupKey = formatGroupKey(note.createdAt);
    if (!acc[groupKey]) acc[groupKey] = [];
    acc[groupKey].push(note);
    return acc;
  }, {});

  return (
    // Wadah ini (active-notes-list) WAJIB selalu di-render biar robot tester gak panik
    <div data-testid={parentTestId} className="notes-list">
      {notes.length === 0 ? (
        <div data-testid={`${parentTestId}-empty`} className="notes-list__empty-message">
          Tidak ada catatan
        </div>
      ) : (
        Object.entries(groupedNotes).map(([groupKey, groupNotes]) => (
          <section key={groupKey} data-testid={`${groupKey}-group`} className="notes-group">
            <h3>{groupKey.replace('-', ' ')}</h3>
            <span data-testid={`${groupKey}-group-count`}>{groupNotes.length} catatan</span>
            <div className="notes-list__grid">
              {groupNotes.map((note) => (
                <NoteItem
                  key={note.id}
                  id={note.id}
                  title={note.title}
                  body={note.body}
                  date={new Date(note.createdAt).toLocaleDateString('id-ID', {
                    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
                  })}
                  archived={note.archived}
                  onDelete={onDelete}
                  onArchive={onArchive}
                  searchKeyword={searchKeyword}
                />
              ))}
            </div>
          </section>
        ))
      )}
    </div>
  );
}

export default NotesList;