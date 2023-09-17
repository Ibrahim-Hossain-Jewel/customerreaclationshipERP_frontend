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
import Settings from './components/settings';
import RootUpload from './components/rootupload';
import OrderHistory from './components/orderhistory';
import RootRegistration from './components/rootregistration';
import RootLogin from './components/rootlogin';
import OrderList from './components/orderlist';
class App extends React.Component {
  constructor(){
    super();
    this.state = {
      
    }
  }
  render(){
    return (
      <div className="App">
        <header className="App-header">
            <Router>
              <Routes>
                <Route path="/" exact element = {<Home />} />
                <Route path='/login' exact element = {<Login />}/>
                <Route path='/rootupload' exact element = {<RootUpload />} />
                <Route path='/registration' exact element={<Registration />} />
                <Route path='/forgot' exact element={<ForgotPassword />} />
                <Route path='/settings' exact element={<Settings />} />
                <Route path='/orderhistory' exact element={<OrderHistory />} />
                <Route path='/999111' exact element={<RootRegistration />} />
                <Route path='/rootlogin' exact element={<RootLogin />} />
                <Route path='/orderlist' exact element={<OrderList />} />
              </Routes>
            </Router>
        </header>
      </div>
    );
  }
}
export default App;
