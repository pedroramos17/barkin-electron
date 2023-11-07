import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import EnhancedTable from '../pages/test';
import GatewayForm from '../pages/forms/gateway';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<GatewayForm />} />
      </Routes>
    </Router>
  );
}
