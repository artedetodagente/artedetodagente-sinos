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
        <Route path="/:id">
          <Page />
        </Route>
        <Route path="/cursos/:id">
          <Cursos />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </Router>
  )
}

export default App