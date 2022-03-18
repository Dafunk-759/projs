import { CssBaseline, Routes, Route } from "./components"

import { AppTheme } from "./context/ThemeContext"

import { Home } from "./pages/Home"
import { Projects } from "./pages/Projects"
import NotFound from "./pages/404"
import Palette from "./pages/Palette"

import Layout from "./layout/Layout"

export default function App() {
  return (
    <AppTheme>
      <CssBaseline />
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/palette" element={<Palette />} />
          <Route
            path="/project/:projectName"
            element={<Projects />}
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Layout>
    </AppTheme>
  )
}
