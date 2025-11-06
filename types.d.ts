type FrameWindowAction = "CLOSE" | "MAXIMIZE" | "MINIMIZE"

type EventPayloadMapping = {
    sendFrameAction: FrameWindowAction
}

interface Window {
  electron: {
    sendFrameAction: (payload: FrameWindowAction) => void;
  };
}