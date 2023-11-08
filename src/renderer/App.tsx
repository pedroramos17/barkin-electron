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

// // Get api ipc connection from main world process

// // calling IPC exposed from preload script
// window.electron.ipcRenderer.once('api', (arg) => {
//   //form post signup email and password

//   const request = {
//     name: arg.name,
//     email: arg.email,
//     password: arg.password,
//   }
// });
export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/driver" element={<Driver />}>
          <Route path="create" element={<DriverForm />} />
        </Route>
        <Route path="/gateway" element={<Gateway />}>
          <Route path="create" element={<GatewayForm />} />
        </Route>
        <Route path="/profile" element={<Profile />}>
          <Route path="edit" element={<ProfileForm />} />
        </Route>
      </Routes>
    </Router>
  );
}
