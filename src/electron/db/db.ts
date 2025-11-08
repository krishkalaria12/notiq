import sqlite3 from "sqlite3";
import { open, Database } from "sqlite";

let db: Database | null = null;

async function getDb() {
  if (!db) {
    db = await open({
      filename: "notes.sql",
      driver: sqlite3.Database,
    });
    await db.exec("PRAGMA journal_mode = WAL");
  }
  return db;
}

async function create_notes_table() {
  const database = await getDb();
  await database.exec(`
    CREATE TABLE IF NOT EXISTS notes (
      id   INTEGER UNIQUE PRIMARY KEY AUTOINCREMENT,
      note TEXT
    )
  `);
}

export async function create_note(noteContent: string): Promise<Note> {
  await create_notes_table();
  const database = await getDb();
  const result = await database.run(
    `INSERT INTO notes (note) VALUES (?)`,
    noteContent
  );

  return {
    id: result.lastID as number,
    note: noteContent,
  };
}

export async function set_note(data: Note): Promise<void> {
  await create_notes_table();
  const database = await getDb();
  await database.run(
    `INSERT INTO notes (id, note)
     VALUES (?, ?)
     ON CONFLICT(id) DO UPDATE SET note = excluded.note`,
    data.id,
    data.note
  );
}

export async function get_all_notes(): Promise<Note[]> {
  await create_notes_table();
  const database = await getDb();

  const rows = await database.all<{ id: number; note: string }[]>(
    "SELECT * FROM notes ORDER BY id DESC"
  );

  return rows;
}

export async function get_note(payload: {
  note_id: number;
}): Promise<Note | null> {
  await create_notes_table();
  const database = await getDb();

  const result = await database.get<{ id: number; note: string }>(
    "SELECT * FROM notes WHERE id = ?",
    payload.note_id
  );

  if (!result) return null;

  return {
    id: result.id,
    note: result.note,
  };
}

export async function delete_note(payload: { note_id: number }): Promise<void> {
  await create_notes_table();
  const database = await getDb();
  await database.run("DELETE FROM notes WHERE id = ?", payload.note_id);
}