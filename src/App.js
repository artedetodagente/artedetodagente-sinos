import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom"
import Analytics from 'react-router-ga'
import Home from './views/Home'
import PageCursos from './views/PageCursos'
import PageNoticias from './views/PageNoticias'
import PageDefault from './views/PageDefault'
import PageAgenda from './views/PageAgenda'
import PageImprensa from './views/PageImprensa'
import ScrollToTop from './util/ScrollToTop'
import AcademyAgenda from './views/AcademyAgenda'

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Analytics id="UA-177273565-1" debug>
        <Switch>
          <Route path="/cursos/:id">
            <PageCursos />
          </Route>
          <Route path="/academyAgenda/:slug">
            <AcademyAgenda />
          </Route>
          <Route path="/noticias">
            <PageNoticias />
          </Route>
          <Route path="/programacao">
            <PageAgenda />
          </Route>
          <Route path="/imprensa">
            <PageImprensa />
          </Route>
          <Route exact path="/:id">
            <PageDefault />
          </Route>
          <Route exact path="/">
            <Home />
          </Route>
        </Switch>
      </Analytics>
    </Router>
  )
}

export default App