import React, { useState } from 'react';

function NoteInput({ addNote }) {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [error, setError] = useState(false);

  const handleTitleChange = (e) => {
    const val = e.target.value;
    if (val.length <= 50) setTitle(val);
  };

  const handleBodyChange = (e) => {
    setBody(e.target.value);
    if (e.target.value.length >= 10 || e.target.value.length === 0) setError(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (body.length < 10) {
      setError(true);
      return;
    }
    addNote({
      id: +new Date(),
      title,
      body,
      archived: false,
      createdAt: new Date().toISOString(),
    });
    setTitle('');
    setBody('');
    setError(false);
  };

  return (
    <div data-testid="note-input" className="note-input">
      <h2>Buat Catatan</h2>
      <form data-testid="note-input-form" onSubmit={handleSubmit}>
        <p className="note-input__title__char-limit" data-testid="note-input-title-remaining">
          Sisa karakter: {50 - title.length}
        </p>
        <input
          type="text"
          placeholder="Ini adalah judul ..."
          required
          data-testid="note-input-title-field"
          value={title}
          onChange={handleTitleChange}
        />
        <textarea
          placeholder="Tuliskan catatanmu di sini ..."
          required
          data-testid="note-input-body-field"
          value={body}
          onChange={handleBodyChange}
        />
        {error && (
          <p className="note-input__feedback--error">
            Isi catatan minimal harus 10 karakter
          </p>
        )}
        <button type="submit" data-testid="note-input-submit-button">Buat</button>
      </form>
    </div>
  );
}

export default NoteInput;