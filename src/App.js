import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom"
import Home from './views/Home'
import Cursos from './views/Cursos'
import Page from './views/Page'
import ScrollToTop from './util/ScrollToTop'

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Switch>
        <Route path="/cursos/:id">
          <Cursos />
        </Route>
        <Route exact path="/:id">
          <Page />
        </Route>
        <Route exact path="/">
          <Home />
        </Route>
      </Switch>
    </Router>
  )
}

export default App