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
import PageRepertorioObras from './views/PageRepertorioObras'
import PageAutor from './views/PageAutor'
import PageConcertos from './views/PageConcertos'
import PageGaleria from './views/PageGaleria'
import PageRevista from './views/PageRevista'

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
          <Route path="/revista-sinos/:id">
            <PageRevista/>
          </Route>
          <Route path="/repertorio-sinos/autor/:id">
            <PageAutor parent={['Repertório Sinos','/repertorio-sinos']} />
          </Route>
          <Route path="/concertos-sinos/autor/:id">
            <PageAutor parent={['Concertos Sinos','/concertos-sinos']} />
          </Route>
          <Route path="/concertos-sinos">
            <PageConcertos />
          </Route>
          <Route exact path="/repertorio-sinos">
            <PageRepertorio />
          </Route>
          <Route path="/repertorio-sinos/obras">
            <PageRepertorioObras />
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
          <Route path="/galeria">
            <PageGaleria />
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