import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom"
import Home from './views/Home'
import Cursos from './views/Cursos'
import Temp from './views/Temp'

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/o-projeto">
          <Temp />
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