import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { lazy, Suspense, useEffect } from "react";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import CursorGlow from "./components/CursorGlow";
import AmbientField from "./components/AmbientField";
import Home from "./pages/Home";
import { projects } from "./data/projects";

const ROUTE_TITLES: Record<string, string> = {
  "/": "Aya Core Studios — Creative Technologist",
  "/work": "Work — Aya Core Studios",
  "/about": "About — Aya Core Studios",
  "/services": "Services — Aya Core Studios",
  "/contact": "Contact — Aya Core Studios",
};

function DocumentTitle() {
  const { pathname } = useLocation();
  useEffect(() => {
    const projectMatch = pathname.match(/^\/work\/([^/]+)/);
    if (projectMatch) {
      const project = projects.find((p) => p.slug === projectMatch[1]);
      document.title = project
        ? `${project.name} — Aya Core Studios`
        : "Aya Core Studios — Creative Technologist";
      return;
    }
    document.title = ROUTE_TITLES[pathname] ?? "Aya Core Studios — Creative Technologist";
  }, [pathname]);
  return null;
}

// Everything past the landing page loads on demand, so a first-time
// visitor only pays for Home — not Work, About, Services, and Contact
// all bundled together up front.
const Work = lazy(() => import("./pages/Work"));
const ProjectDetail = lazy(() => import("./pages/ProjectDetail"));
const About = lazy(() => import("./pages/About"));
const Services = lazy(() => import("./pages/Services"));
const Contact = lazy(() => import("./pages/Contact"));

function PageWrapper({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <motion.main
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.main>
  );
}

function App() {
  const location = useLocation();

  return (
    <div className="relative min-h-screen">
      <DocumentTitle />
      <CursorGlow />
      <AmbientField />
      <Nav />
      <AnimatePresence mode="wait">
        <Suspense fallback={null}>
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<PageWrapper><Home /></PageWrapper>} />
            <Route path="/work" element={<PageWrapper><Work /></PageWrapper>} />
            <Route path="/work/:slug" element={<PageWrapper><ProjectDetail /></PageWrapper>} />
            <Route path="/about" element={<PageWrapper><About /></PageWrapper>} />
            <Route path="/services" element={<PageWrapper><Services /></PageWrapper>} />
            <Route path="/contact" element={<PageWrapper><Contact /></PageWrapper>} />
          </Routes>
        </Suspense>
      </AnimatePresence>
      <Footer />
    </div>
  );
}

export default App;
