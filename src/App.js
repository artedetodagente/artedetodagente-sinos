import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom"
import Home from './views/Home'
import PageCursos from './views/PageCursos'
import PageNoticias from './views/PageNoticias'
import PageDefault from './views/PageDefault'
import PageAgenda from './views/PageAgenda'
import ScrollToTop from './util/ScrollToTop'

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Switch>
        <Route path="/cursos/:id">
          <PageCursos />
        </Route>
        <Route path="/noticias">
          <PageNoticias />
        </Route>
        <Route path="/programacao">
          <PageAgenda />
        </Route>
        <Route exact path="/:id">
          <PageDefault />
        </Route>
        <Route exact path="/">
          <Home />
        </Route>
      </Switch>
    </Router>
  )
}

export default App