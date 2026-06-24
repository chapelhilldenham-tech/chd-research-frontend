import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import AdminLayout from './components/AdminLayout';
import Home from './pages/Home';
import Reports from './pages/Reports';
import ReportDetail from './pages/ReportDetail';
import Analytics from './pages/Analytics';
import Analysts from './pages/Analysts';
import PriceLists from './pages/PriceLists';
import Login from './pages/Login';
import Contact from './pages/Contact';
import AdminLogin from './pages/admin/AdminLogin';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminReports from './pages/admin/AdminReports';
import AdminReportDetail from './pages/admin/AdminReportDetail';
import AdminAnalytics from './pages/admin/AdminAnalytics';
import AdminPriceLists from './pages/admin/AdminPriceLists';
import AdminAnalysts from './pages/admin/AdminAnalysts';
import AdminImport from './pages/admin/AdminImport';

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
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<AdminDashboard />} />
        <Route path="reports" element={<AdminReports />} />
        <Route path="reports/import" element={<AdminImport />} />
        <Route path="reports/:id" element={<AdminReportDetail />} />
        <Route path="analytics" element={<AdminAnalytics />} />
        <Route path="price-lists" element={<AdminPriceLists />} />
        <Route path="analysts" element={<AdminAnalysts />} />
      </Route>
    </Routes>
  );
}
