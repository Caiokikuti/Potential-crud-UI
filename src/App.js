import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Route, Switch, HashRouter as Router } from 'react-router-dom'
import { createBrowserHistory } from 'history'
import Drawer from '../src/Components/Drawer'
import MenuDeveloper from './Containers/MenuDeveloper'
import { Box } from '@material-ui/core'
import CadastroDeveloper from './Containers/CadastroDeveloper'
import Login from './Containers/Login'
import CadastroUser from './Containers/CadastroUser'

const useStyles = makeStyles({
  container: {
    display: 'flex',
  },
})

function App() {
  const classes = useStyles()
  const [logged, setLogged] = useState(false)
  //  Setando as rotas e o drawer
  if (!logged) {
    return (
      <Router>
        <Route
          exact
          path='/'
          render={(props) => <Login setLogado={setLogged} />}
        />
        <Route
          exact
          path='/cadastroUser'
          render={(props) => <CadastroUser {...props} />}
        />
      </Router>
    )
  } else {
    return (
      <div className={classes.container}>
        <Router>
          <Drawer />
          <Box p={10}>
            <Switch>
              <Route
                exact
                path='/developer'
                render={(props) => <MenuDeveloper {...props} />}
              />
              <Route
                exact
                path='/developer/:id'
                render={(props) => <CadastroDeveloper {...props} />}
              />
            </Switch>
          </Box>
        </Router>
      </div>
    )
  }
}
export default App
