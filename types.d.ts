type TNoteBlock = {
  id: string;
  type: string;
  data: {
    text: string;
  };
};

type TNote = {
  time: number;
  blocks: TNoteBlock[];
  version: string;
};

type Note = {
  id: number;
  note: string | TNote;
};

type FrameWindowAction = "CLOSE" | "MAXIMIZE" | "MINIMIZE";

type EventPayloadMapping = {
  sendFrameAction: FrameWindowAction;
  getNote: { note_id: number };
  getNotes: null;
  deleteNote: { note_id: number };
  setNote: Note;
};

type UnSubscribeFunction = () => void;

interface Window {
  electron: {
    sendFrameAction: (payload: FrameWindowAction) => void;
    getNote: (payload: { note_id: number }) => Promise<Note | null>;
    getNotes: () => Promise<Note[]>;
    deleteNote: (payload: { note_id: number }) => Promise<void>;
    setNote: (note: Note) => Promise<void>;
  };
}