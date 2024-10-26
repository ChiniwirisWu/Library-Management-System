import './styles/App.css';

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Welcome from './pages/welcome';
import Login from './pages/login';

function App() {
  return (
    <div>
        <Router>
          <Routes>
            <Route exact path = "/" element = {<Welcome />} />
            <Route path = "/login" element = {<Login />} />
            <Route path = "*" element = {<Navigate to="/" />} />
          </Routes>
        </Router>
    </div>
  );
}

export default App;