import Navbar from './components/Navbar';
import './index.css';
import { Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Registration from './components/Registration';
import Verifyemail from './components/Verifyemail';
import Home from './components/Home';
import Dashboard from './components/Dashboard';
import AuthProvider from './context/AuthProvider';
import PrivateRoute from './components/PrivateRoute';
function App() {

  return (
    <>

      <AuthProvider>
      <Navbar />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/login" element={<Login />} />

          <Route path="/user/*" element={<PrivateRoute />} >
            <Route path="dashboard" element={<Dashboard />} />
          </Route>

          <Route exact path="/register" element={<Registration />} />
          <Route exact path="/user/verify/:token" element={<Verifyemail />} />
        </Routes>
      </AuthProvider>
    </>
  );
}

export default App;
