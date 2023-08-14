import './App.scss';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';   
import 'primeflex/primeflex.css';   
import TopNav from './components/menubar/TopNav';
import 'primeflex/primeflex.css';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import './DarkTheme.scss';
import React from 'react';
import Home from './components/home';
import Registration from './components/registration';
import MorePage from './components/extends';
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
                <Route path='/registration' exact element={<Registration />} />
                <Route path='/extends' exact element={<MorePage />} />
              </Routes>
            </Router>
        </header>
      </div>
    );
  }
}
export default App;
