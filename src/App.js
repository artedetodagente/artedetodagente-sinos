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
import PageAVS from './views/PageAVS'
import PageSandbox from './views/PageSandbox'
import ScrollToTop from './util/ScrollToTop'
import PageRepertorio from './views/PageRepertorio'
import PageObras from './views/PageObras'
import PageAutor from './views/PageAutor'
import PageConcerto from './views/PageConcerto'
import PageConcertos from './views/PageConcertos'

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Analytics id="UA-177273565-1" debug>
        <Switch>
          <Route path="/cursos/:id">
            <PageCursos />
          </Route>
          <Route path="/academia-virtual/:slug">
            <PageAVS />
          </Route>
          <Route exact path="/repertorio-sinos">
            <PageRepertorio />
          </Route>
          <Route exact path="/autor/:id">
            <PageAutor />
          </Route>
          <Route exact path="/concertos-sinos/concerto/:concerto_slug">
            <PageConcerto />
          </Route>
          <Route path="/concertos-sinos/concertos">
            <PageConcertos />
          </Route>
          <Route path="/repertorio-sinos/obras">
            <PageObras />
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
          <Route path="/sandbox">
            <PageSandbox />
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