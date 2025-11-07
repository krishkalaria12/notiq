import Database from "better-sqlite3";

const db = new Database("notes.sql");
db.pragma("journal_mode = WAL");

function create_notes_table() {
  db.prepare(`
    CREATE TABLE IF NOT EXISTS notes (
      id   INTEGER UNIQUE PRIMARY KEY AUTOINCREMENT,
      note TEXT
    )
  `).run();
}

export async function create_note(noteContent: string): Promise<Note> {
  create_notes_table();
  const stmt = db.prepare(`
    INSERT INTO notes (note)
    VALUES (?)
  `);
  const result = stmt.run(JSON.stringify(noteContent));

  return {
    id: result.lastInsertRowid as number,
    note: noteContent,
  };
}

export async function set_note(data: Note): Promise<void> {
  create_notes_table();
  const stmt = db.prepare(`
    INSERT INTO notes (id, note)
    VALUES (?, ?)
    ON CONFLICT(id) DO UPDATE SET note = excluded.note
  `);
  stmt.run(data.id, JSON.stringify(data.note));
}

export async function get_all_notes(): Promise<Note[]> {
  create_notes_table();

  const stmt = db.prepare<[], { id: number; note: string }>(
    "SELECT * FROM notes ORDER BY id DESC"
  );

  const rows = stmt.all();

  return rows.map((row) => ({
    id: row.id,
    note: JSON.parse(row.note),
  }));
}

export async function get_note(payload: {
  note_id: number;
}): Promise<Note | null> {
  create_notes_table();

  const stmt = db.prepare<[number], { id: number; note: string }>(
    "SELECT * FROM notes WHERE id = ?"
  );

  const result = stmt.get(payload.note_id);

  if (!result) return null;

  return {
    id: result.id,
    note: JSON.parse(result.note),
  };
}

export async function delete_note(payload: { note_id: number }): Promise<void> {
  create_notes_table();
  const stmt = db.prepare("DELETE FROM notes WHERE id = ?");
  stmt.run(payload.note_id);
}