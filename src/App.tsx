import { ThemeProvider } from "@/components/theme-provider"
import LogoEditor from "./components/logo-editor"
import { Navbar } from "./components/navbar"
import { TailwindIndicator } from "./components/tailwind-indicator"

function App() {

  return (
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <main className="flex flex-col h-screen w-screen">
      <Navbar />
      <LogoEditor />

      </main>
      <TailwindIndicator/>
     
    </ThemeProvider>
  )
}

export default App




