import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Reports from './pages/Reports';
import ReportDetail from './pages/ReportDetail';
import Analytics from './pages/Analytics';
import Analysts from './pages/Analysts';
import PriceLists from './pages/PriceLists';
import Login from './pages/Login';
import Contact from './pages/Contact';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="reports" element={<Reports />} />
        <Route path="report/:id" element={<ReportDetail />} />
        <Route path="analytics" element={<Analytics />} />
        <Route path="analysts" element={<Analysts />} />
        <Route path="price-lists" element={<PriceLists />} />
        <Route path="login" element={<Login />} />
        <Route path="contact" element={<Contact />} />
      </Route>
    </Routes>
  );
}
