import './App.scss';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './components/Login';
import Dashboard from './components/Dashboard';


function App() {
  return (
    <Router>
      <div className='container'>
      <Switch>
        <Route path='/' exact component={Login} />
        <Route path='/login' component={Login} />
        <Route path='/dashboard' component={Dashboard} />
      </Switch>
      </div>
    </Router>
  );
}

export default App;
