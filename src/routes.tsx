import { useEffect } from 'react';
import { createMemoryRouter, Outlet, useLocation } from 'react-router';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import FloatingWidgets from './components/FloatingWidgets';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ServicesPage from './pages/ServicesPage';
import ProjectsPage from './pages/ProjectsPage';
import BlogPage from './pages/BlogPage';
import ContactPage from './pages/ContactPage';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
    window.history.replaceState(null, '', '/');
  }, [pathname]);
  return null;
}

function Root() {
  return (
    <div className="min-h-screen flex flex-col">
      <ScrollToTop />
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <FloatingWidgets />
    </div>
  );
}

function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="font-display text-8xl font-bold text-[#8B1D24]/20 mb-4">404</div>
        <h2 className="font-display text-3xl font-semibold text-[#0F172A] mb-3">Page Not Found</h2>
        <p className="text-[#64748B] mb-6">The page you're looking for doesn't exist.</p>
        <a href="/" className="inline-flex items-center gap-2 px-6 py-3 text-white font-semibold rounded-full text-sm" style={{ background: '#8B1D24' }}>
          Go Home
        </a>
      </div>
    </div>
  );
}

export const router = createMemoryRouter([
  {
    path: '/',
    Component: Root,
    children: [
      { index: true, Component: HomePage },
      { path: 'about-us', Component: AboutPage },
      { path: 'our-services', Component: ServicesPage },
      { path: 'our-services/:type', Component: ServicesPage },
      { path: 'our-projects', Component: ProjectsPage },
      { path: 'our-projects/:projectId', Component: ProjectsPage },
      { path: 'blog', Component: BlogPage },
      { path: 'blog/:articleId', Component: BlogPage },
      { path: 'contact-us', Component: ContactPage },
      { path: '*', Component: NotFound },
    ],
  },
]);
