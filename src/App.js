import './App.css';
import {BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom';
import PayrollForm from './components/payroll-form/payroll-form';
import HomePage from './components/home-page/home-page';

function App() {
  return (
    <div >
      <Router>
        <Switch>
          <Route path="/payroll" component={PayrollForm} />
          <Route path="/home" component={HomePage} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
