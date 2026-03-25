import React from 'react';
import NoteItem from './NoteItem';

function NotesList({ notes, onDelete, onArchive, dataTestId = 'notes-list', searchKeyword }) {
  // TODO [Basic] validasi notes agar tidak kosong.
  const hasNotes = notes.length > 0; // update dengan nilai yang sesuai

  if (!hasNotes) {
    return (
      <div className="notes-list" data-testid={dataTestId}>
        <p className="notes-list__empty-message" data-testid={`${dataTestId}-empty`}>
          Tidak ada catatan
        </p>
      </div>
    );
  }

  // Advanced Criteria: Pengelompokan berdasarkan bulan dan tahun
  const groupedNotes = notes.reduce((acc, note) => {
    const date = new Date(note.createdAt);
    // Menghasilkan format "Bulan Tahun" (Contoh: "Januari 2024")
    const groupKey = date.toLocaleDateString('id-ID', { month: 'long', year: 'numeric' });
    
    if (!acc[groupKey]) {
      acc[groupKey] = [];
    }
    acc[groupKey].push(note);
    return acc;
  }, {});

  return (
    <div className="notes-list" data-testid={dataTestId}>
      {/* TODO [Basic] gunakan array.map untuk merender NoteItem untuk setiap catatan. */}
      {/* TODO [Skilled] ekstrak tombol aksi menjadi komponen reusable agar dipakai NoteItem. */}
      {/* TODO [Advanced] kelompokkan catatan per bulan-tahun dan render tiap grup dalam <section className="notes-group">. */}
    {Object.entries(groupedNotes).map(([groupKey, groupNotes]) => {
        const testIdKey = groupKey.replace(/\s+/g, '-').toLowerCase();
        
        return (
          <section key={groupKey} data-testid={`${testIdKey}-group`} className="notes-group">
            <h3>{groupKey}</h3>
            <span data-testid={`${testIdKey}-group-count`}>{groupNotes.length} catatan</span>
            
            <div className="notes-group__list">
              {groupNotes.map((note) => (
                <NoteItem
                  key={note.id}
                  note={note}
                  onDelete={onDelete}
                  onArchive={onArchive}
                  searchKeyword={searchKeyword}
                />
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}

export default NotesList;

