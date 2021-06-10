import './App.css'
import Header from './components/Header'
import Box from './components/Box'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Home from './components/Home'
import Category from './components/Category'

function App() {
  return (
    <Router>
      <div className="App">
        <Header></Header>
        <Switch>
          <Route path="/owner/box/:id" exact>
            <Box owner={true}></Box>
          </Route>
          <Route path="/watcher/box/:id" exact>
            <Box></Box>
          </Route>
          <Route path="/" exact>
            <Home></Home>
          </Route>
          <Route path="/category/:cat" exact>
            <Category></Category>
          </Route>
        </Switch>
      </div>
    </Router>
  )
}

export default App
