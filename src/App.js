import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom"
import Home from './views/Home'
import Cursos from './views/Cursos'
import Page from './views/Page'

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/cursos/:id/:modulo">
          <Cursos />
        </Route>
        <Route path="/:id">
          <Page />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </Router>
  )
}

export default App