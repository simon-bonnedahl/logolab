import { ThemeProvider } from "@/components/theme-provider"
import LogoEditor from "./components/logo-editor"
import { Navbar } from "./components/navbar"

function App() {

  return (
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <main className="flex flex-col h-screen w-screen">
      <Navbar />
      <LogoEditor />

      </main>
     
    </ThemeProvider>
  )
}

export default App




