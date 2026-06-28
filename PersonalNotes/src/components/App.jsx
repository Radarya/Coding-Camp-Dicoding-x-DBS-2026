import React, { useState } from 'react';
import NoteInput from './NoteInput';
import NotesList from './NotesList';
import NoteSearch from './NoteSearch';
import { getInitialData } from '../utils/index'; // Tambahkan import data bawaan ini

function App() {
  // Gunakan data bawaan sebagai state awal biar layar gak kosong
  const [notes, setNotes] = useState(getInitialData());
  const [searchKeyword, setSearchKeyword] = useState('');

  const onAddNote = (newNote) => {
    setNotes([...notes, newNote]);
  };

  const onDeleteNote = (id) => {
    setNotes(notes.filter(note => note.id !== id));
  };

  const onArchiveNote = (id) => {
    setNotes(notes.map(note =>
      note.id === id ? { ...note, archived: !note.archived } : note
    ));
  };

  const onSearchChange = (keyword) => {
    setSearchKeyword(keyword);
  };

  const filteredNotes = notes.filter(note =>
    note.title.toLowerCase().includes(searchKeyword.toLowerCase())
  );

  const activeNotes = filteredNotes.filter(note => !note.archived);
  const archivedNotes = filteredNotes.filter(note => note.archived);

  return (
    <div data-testid="note-app" className="note-app">
      <header data-testid="note-app-header" className="note-app__header">
        <h1>Notes App</h1>
        <NoteSearch searchKeyword={searchKeyword} onSearchChange={onSearchChange} />
      </header>
      <main data-testid="note-app-body" className="note-app__body">
        <NoteInput addNote={onAddNote} />
        <h2>Catatan Aktif ({activeNotes.length})</h2>
        <NotesList
          notes={activeNotes}
          onDelete={onDeleteNote}
          onArchive={onArchiveNote}
          searchKeyword={searchKeyword}
          listType="active"
        />
        <h2 data-testid="archived-notes-section">Arsip ({archivedNotes.length})</h2>
        <NotesList
          notes={archivedNotes}
          onDelete={onDeleteNote}
          onArchive={onArchiveNote}
          searchKeyword={searchKeyword}
          listType="archived"
        />
      </main>
    </div>
  );
}

export default App;