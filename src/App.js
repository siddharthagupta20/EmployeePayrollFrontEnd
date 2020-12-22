import './App.css';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import PayrollForm from './components/payroll-form/payroll-form';

function App() {
  return (
    <div >
      <Router>
        <Switch>
          <Route path="/payroll" component={PayrollForm} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
