import './styles/App.css';

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Welcome from './pages/welcome';
import Login from './pages/login';
import Ficha from './pages/ficha';
import Request from './pages/request';
import Home from './pages/home';

function App() {
  return (
    <div>
        <Router>
          <Routes>
            <Route exact path = "/" element = {<Welcome />} />
            <Route path = "*" element = {<Navigate to="/" />} />
            <Route path = "/login" element = {<Login />} />
            <Route path = "/ficha" element = {<Ficha />} />
            <Route path = "/home" element = {<Home />} />
            <Route path = "/signup-request" element = {<Request title="Solicitud de Registro" />} />
            <Route path = "/password-request" element = {<Request title="Solicitud de Cambio de Contraseña" />} />
          </Routes>
        </Router>
    </div>
  );
}

export default App;