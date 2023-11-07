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

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Profile />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/driver" element={<Driver />}>
          <Route path="/driver/create" element={<DriverForm />} />
        </Route>
        <Route path="/gateway" element={<Gateway />}>
          <Route path=":id" element={<GatewayForm />} />
        </Route>
        <Route path="/profile" element={<Profile />}>
          <Route path=":id" element={<ProfileForm />} />
        </Route>
      </Routes>
    </Router>
  );
}
