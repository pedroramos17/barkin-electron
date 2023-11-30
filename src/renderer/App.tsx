import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Login from '../pages/login';
import Signup from '../pages/signup';
import DriverForm from '../pages/forms/driver';
import Driver from '../pages/driver';
import Gateway from '../pages/gateway';
import GatewayForm from '../pages/forms/gateway';
import Profile from '../pages/profile';
import ProfileForm from '../pages/forms/profile';
import Layout from '../components/Layout';
import Missing from '../components/Missing';
import RequireAuth from '../components/RequireAuth';
import AuthProvider from '../contexts/AuthProvider';
import DrawerLayout from '../components/DrawerLayout';

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route element={<Layout />}>
            {/* public routes */}
            <Route path="signup" element={<Signup />} />

            {/* we want to protect these routes */}
            <Route path="/driver" element={<Driver />}>
              <Route path="create" element={<DriverForm />} />
            </Route>
            <Route path="gateway" element={<Gateway />}>
              <Route path="create" element={<GatewayForm />} />
            </Route>
            <Route path="profile" element={<Profile />}>
              <Route path="edit" element={<ProfileForm />} />
            </Route>
            {/* catch all */}
            <Route path="*" element={<Missing />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}
