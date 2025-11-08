import {Wrapper} from "./components/wrapper"
import { Providers } from "./providers/app-providers"

const App = () => {
  return (
    <Providers>
      <Wrapper />
    </Providers>
  )
}

export default App