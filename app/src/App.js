import './styles/App.css';

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import { PagesList } from './pages/constants/pages';

function App() {
  return (
    <div>
        <Router>
          <Routes>
            <Route exact path = "/*" element = { <Navigate to="/" /> } />
            { PagesList.map((page) => ( <Route path={page.path} element={page.component} /> ))}
          </Routes>
        </Router>
    </div>
  );
}

export default App;