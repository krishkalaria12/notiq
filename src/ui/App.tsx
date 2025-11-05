import Editor from "./components/editor/editor"
import { Providers } from "./providers/app-providers"

const App = () => {
  return (
    <Providers>
      <Editor />
    </Providers>
  )
}

export default App