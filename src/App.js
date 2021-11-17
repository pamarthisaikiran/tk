import {Route, Switch, Redirect} from 'react-router-dom'

import LoginForm from './components/LoginPage'
import Home from './components/Home'

import ProtectedRoute from './components/ProtectedRoute'
import SelectedRestarent from './components/SelectedRestarent'
import Cart from './components/Cart'
import NotFound from './components/NotFound'
import './App.css'

const sortByOptions = [
  {
    id: 0,
    displayText: 'Highest',
    value: 'Highest',
  },
  {
    id: 2,
    displayText: 'Lowest',
    value: 'Lowest',
  },
]
/*  <Route exact path="/login" component={LoginPage} /> */
const App = () => (
  <Switch>
    <Route exact path="/login" component={LoginForm} />
    <ProtectedRoute exact path="/" component={Home} />
    <ProtectedRoute exact path="/rest/:id" component={SelectedRestarent} />
    <ProtectedRoute exact path="/cart" component={Cart} />
    <Route path="/bad-path" component={NotFound} />
    <Redirect to="bad-path" />
  </Switch>
)

export default App
