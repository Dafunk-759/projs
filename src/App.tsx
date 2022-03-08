import { CssBaseline, Routes, Route } from "./components"

import { AppTheme } from "./ThemeContext"

import { Home } from "./home/Home"
import { Projects } from "./home/Projects"
import NotFound from "./home/404"

import Layout from "./layout/Layout"

export default function App() {
  return (
    <AppTheme>
      <CssBaseline />
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path=":projectName"
            element={<Projects />}
          />
          <Route
            path="*"
            element={<NotFound />}
          />
        </Routes>
      </Layout>
    </AppTheme>
  )
}
