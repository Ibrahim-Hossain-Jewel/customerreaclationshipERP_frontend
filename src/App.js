import './App.scss';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import './DarkTheme.scss';
import React from 'react';
import Home from './components/home';
import Registration from './components/registration';
import ForgotPassword from './components/forgotpassword';
import Login from './components/login';
import TopNav from './components/menubar/TopNav';
import Settings from './components/settings';
import Dashboard from './components/dashboard';
import OrderHistory from './components/orderhistory';
class App extends React.Component {
  constructor(){
    super();
  }
  render(){
    return (
      <div className="App">
        <header className="App-header">
            <Router>
              <Routes>
                <Route path="/" exact element = {<Home />} />
                <Route path='/login' exact element = {<Login />}/>
                <Route path='/dashboard' exact element = {<Dashboard />} />
                <Route path='/registration' exact element={<Registration />} />
                <Route path='/forgot' exact element={<ForgotPassword />} />
                <Route path='/settings' exact element={<Settings />} />
                <Route path='/orderhistory' exact element={<OrderHistory />} />
              </Routes>
            </Router>
        </header>
      </div>
    );
  }
}
export default App;
