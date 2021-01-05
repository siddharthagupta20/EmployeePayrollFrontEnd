import './App.css';
import {BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom';
import PayrollForm from './components/payroll-form/payroll-form';
import HomePage from './components/home-page/home-page';

function App() {
  return (
    <div >
      <Router>
        <Switch>
          <Route exact path="/home">
            <HomePage />
          </Route>
          <Route exact path="/payroll">
            <PayrollForm />
          </Route>
          <Route exact path="/payroll/:id">
            <PayrollForm />
          </Route>
          <Route exact path="">
            <Redirect exact from="/" to="/home" />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
