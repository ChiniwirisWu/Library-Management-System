import './styles/App.css';
import { useState } from 'react';

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import { PagesList } from './constants/pages';
import Session from './session/session';
import { SessionContext } from './session/session';

function App() {

  const [session, setSession] = useState(new Session());

  return (
    <SessionContext.Provider value={{session, setSession}}>
        <Router>
          <Routes>
            <Route exact path = "/*" element = { <Navigate to="/" /> } />
            { PagesList.map((page) => ( <Route path={page.path} element={page.component} /> ))}
          </Routes>
        </Router>
    </SessionContext.Provider>
  );
}

export default App;