import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { Navbar } from './components/layout/Navbar';
import { Breadcrumbs } from './components/common/Breadcrumbs';
import { Footer } from './components/layout/Footer';
import { Loader } from './components/layout/Loader';
import { AppProvider } from './context/AppContext';
import { ROUTES } from './utils/routes';

// Lazy Load Pages
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

// Scroll reset component on route navigation
const ScrollToTopOnNavigate = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

export function App() {
  return (
    <AppProvider>
      <Router>
        <ScrollToTopOnNavigate />
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
      </Router>
    </AppProvider>
  );
}

export default App;
