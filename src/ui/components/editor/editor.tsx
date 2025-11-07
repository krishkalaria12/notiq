import EditorJsTemplate from './editor-js-template'

interface editorProps {
  note: string
  setContent: (content: string) => void;
}

const Editor = ({ note, setContent }: editorProps) => {
  return (
    <div>
      <EditorJsTemplate note={note} setContent={setContent} />
    </div>
  )
}

export default Editor