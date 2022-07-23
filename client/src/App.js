import React, {Fragment} from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import './App.css';
import { Home } from './components/pages/Home';
import { About } from './components/pages/About';
import { Navbar } from './components/layout/Navbar';
import ContactState from './context/contact/ContactState';
import AuthState from './context/auth/AuthState';

const App = () => {
  return (
    <AuthState>
      <ContactState>
        <Router>
          <Fragment>
            <Navbar />
            <div className="App">
              <Routes>
                <Route exact path='/' element={<Home />}/>
                <Route exact path='/about' element={<About />}/>
              </Routes>
              
            </div>
          </Fragment>
        </Router>
    </ContactState>
    </AuthState>
    
  );
}

export default App;
