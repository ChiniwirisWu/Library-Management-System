import './styles/App.css';

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import { ContextWrapper } from './session/session';
import { PagesList } from './constants/pages';

function App() {


  const pagination = (
    <Router>
        <Routes>
            <Route exact path = "/*" element = { <Navigate to="/" /> } />
            { PagesList.map((page) => ( <Route path={page.path} element={page.component} /> ))}
        </Routes>
    </Router>
  );

  return (
    <ContextWrapper content={pagination} />
  );
}

export default App;