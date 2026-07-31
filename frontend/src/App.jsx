import React, { Suspense, lazy, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { Navbar } from './components/layout/Navbar';
import { Breadcrumbs } from './components/common/Breadcrumbs';
import { Footer } from './components/layout/Footer';
import { Loader } from './components/layout/Loader';
import { AppProvider } from './context/AppContext';
import { ROUTES } from './utils/routes';

// Lazy Load Public Pages
const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const Academics = lazy(() => import('./pages/Academics'));
const Admission = lazy(() => import('./pages/Admission'));
const Facilities = lazy(() => import('./pages/Facilities'));
const Faculty = lazy(() => import('./pages/Faculty'));
const Gallery = lazy(() => import('./pages/Gallery'));
const Career = lazy(() => import('./pages/Career'));
const Contact = lazy(() => import('./pages/Contact'));
const VisionMission = lazy(() => import('./pages/VisionMission'));
const SignIn = lazy(() => import('./pages/SignIn'));
const NotFound = lazy(() => import('./pages/NotFound'));

// Lazy Load Admin CMS Pages
const AdminLogin = lazy(() => import('./pages/admin/AdminLogin'));
const AdminDashboard = lazy(() => import('./pages/admin/AdminDashboard'));
const AdminInquiries = lazy(() => import('./pages/admin/AdminInquiries'));
const AdminAdmissions = lazy(() => import('./pages/admin/AdminAdmissions'));
const AdminFaculty = lazy(() => import('./pages/admin/AdminFaculty'));
const AdminCareers = lazy(() => import('./pages/admin/AdminCareers'));
const AdminApplicants = lazy(() => import('./pages/admin/AdminApplicants'));
const AdminGallery = lazy(() => import('./pages/admin/AdminGallery'));
const AdminFees = lazy(() => import('./pages/admin/AdminFees'));

// Scroll reset component on route navigation
const ScrollToTopOnNavigate = () => {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) {
      setTimeout(() => {
        const element = document.getElementById(hash.substring(1));
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname, hash]);
  return null;
};

// Main App Shell with Conditional Header/Footer for Admin
const AppShell = () => {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  if (isAdminRoute) {
    return (
      <div className="min-h-screen bg-slate-900 font-sans antialiased text-slate-100 selection:bg-emerald-600 selection:text-white">
        <Suspense fallback={<Loader />}>
          <Routes>
            <Route path={ROUTES.ADMIN_LOGIN} element={<AdminLogin />} />
            <Route path="/admin" element={<Navigate to={ROUTES.ADMIN_DASHBOARD} replace />} />
            <Route path={ROUTES.ADMIN_DASHBOARD} element={<AdminDashboard />} />
            <Route path={ROUTES.ADMIN_INQUIRIES} element={<AdminInquiries />} />
            <Route path={ROUTES.ADMIN_ADMISSIONS} element={<AdminAdmissions />} />
            <Route path={ROUTES.ADMIN_APPLICANTS} element={<AdminApplicants />} />
            <Route path={ROUTES.ADMIN_FACULTY} element={<AdminFaculty />} />
            <Route path={ROUTES.ADMIN_CAREERS} element={<AdminCareers />} />
            <Route path={ROUTES.ADMIN_GALLERY} element={<AdminGallery />} />
            <Route path={ROUTES.ADMIN_FEES} element={<AdminFees />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 font-sans antialiased text-slate-900 selection:bg-green-600 selection:text-white">
      <Navbar />
      <Breadcrumbs />
      <main className="grow">
        <Suspense fallback={<Loader />}>
          <Routes>
            <Route path={ROUTES.HOME} element={<Home />} />
            <Route path={ROUTES.ABOUT} element={<About />} />
            <Route path={ROUTES.ACADEMICS} element={<Academics />} />
            <Route path={ROUTES.ADMISSION} element={<Admission />} />
            <Route path={ROUTES.FACILITIES} element={<Facilities />} />
            <Route path={ROUTES.FACULTY} element={<Faculty />} />
            <Route path={ROUTES.GALLERY} element={<Gallery />} />
            <Route path={ROUTES.CAREER} element={<Career />} />
            <Route path={ROUTES.CONTACT} element={<Contact />} />
            <Route path={ROUTES.VISION_MISSION} element={<VisionMission />} />
            <Route path={ROUTES.SIGN_IN} element={<SignIn />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
    </div>
  );
};

export function App() {
  return (
    <AppProvider>
      <Router>
        <ScrollToTopOnNavigate />
        <AppShell />
      </Router>
    </AppProvider>
  );
}

export default App;
