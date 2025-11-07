type Note = {
  id: number;
  note: string;
};

type FrameWindowAction = "CLOSE" | "MAXIMIZE" | "MINIMIZE";

type EventPayloadMapping = {
  sendFrameAction: FrameWindowAction;
  getNote: { note_id: number };
  getNotes: null;
  deleteNote: { note_id: number };
  setNote: Note;
  createNote: { note_content: string };
};

type UnSubscribeFunction = () => void;

interface Window {
  electron: {
    sendFrameAction: (payload: FrameWindowAction) => void;
    getNote: (payload: { note_id: number }) => Promise<Note | null>;
    getNotes: () => Promise<Note[]>;
    deleteNote: (payload: { note_id: number }) => Promise<void>;
    setNote: (note: Note) => Promise<void>;
    createNote: (payload: { note_content: string }) => Promise<Note>;
  };
}