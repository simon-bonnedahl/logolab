import { ThemeProvider } from "@/components/theme-provider"
import LogoEditor from "./components/logo-editor"
import { Navbar } from "./components/navbar"
import { TailwindIndicator } from "./components/tailwind-indicator"
import { Analytics } from "@vercel/analytics/react"

function App() {

  return (
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <main className="flex flex-col h-screen w-screen">
      <Navbar />
      <div className="hidden lg:block">
      <LogoEditor />
      </div>
      <div className="lg:hidden flex h-screen w-full items-center justify-center p-6 text-center">
        <p className="text-2xl font-semibold">
          This app is not optimized for mobile devices. Please use a desktop or laptop to view the app.
        </p>
      </div>

      </main>
      <TailwindIndicator/>
      <Analytics/>
     
    </ThemeProvider>
  )
}

export default App




