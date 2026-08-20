import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { lazy, Suspense, useEffect } from "react";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import CursorGlow from "./components/CursorGlow";
import AmbientField from "./components/AmbientField";
import WatermarkHint from "./components/WatermarkHint";
import Home from "./pages/Home";
import { projects } from "./data/projects";

const DEFAULT_TITLE = "Aya Core Studios — Creative Technologist";
const DEFAULT_DESCRIPTION =
  "Aya Core Studios — creative technology practice building platforms for communities, engineered for scale.";
const SITE_URL = "https://ayacore.netlify.app";

const ROUTE_META: Record<string, { title: string; description: string }> = {
  "/": { title: DEFAULT_TITLE, description: DEFAULT_DESCRIPTION },
  "/work": {
    title: "Work — Aya Core Studios",
    description:
      "Five platforms shipped for five South African communities — tourism, healthcare, and custom web systems, built end to end.",
  },
  "/about": {
    title: "About — Aya Core Studios",
    description: "Self-taught, systems-minded — the person and philosophy behind Aya Core Studios.",
  },
  "/services": {
    title: "Services — Aya Core Studios",
    description:
      "Full-stack engineering, UI/UX design, and business strategy — what it looks like to build with Aya Core Studios.",
  },
  "/contact": {
    title: "Contact — Aya Core Studios",
    description: "Start a project with Aya Core Studios — tourism, healthcare, gaming, or a custom web system.",
  },
};

function setMeta(selector: string, content: string) {
  const el = document.head.querySelector<HTMLMetaElement>(selector);
  if (el) el.setAttribute("content", content);
}

/**
 * Drives document.title, the meta description, and Open Graph/Twitter tags
 * per route. Without this a link to /contact or a case study page shares
 * the same generic preview card everywhere it's pasted (Slack, iMessage,
 * Twitter) instead of describing what's actually on that page.
 */
function DocumentTitle() {
  const { pathname } = useLocation();
  useEffect(() => {
    const projectMatch = pathname.match(/^\/work\/([^/]+)/);
    const project = projectMatch ? projects.find((p) => p.slug === projectMatch[1]) : undefined;

    const meta = project
      ? { title: `${project.name} — Aya Core Studios`, description: project.description }
      : ROUTE_META[pathname] ?? { title: DEFAULT_TITLE, description: DEFAULT_DESCRIPTION };

    const url = `${SITE_URL}${pathname}`;

    document.title = meta.title;
    setMeta('meta[name="description"]', meta.description);
    setMeta('meta[property="og:title"]', meta.title);
    setMeta('meta[property="og:description"]', meta.description);
    setMeta('meta[property="og:url"]', url);
    setMeta('meta[name="twitter:title"]', meta.title);
    setMeta('meta[name="twitter:description"]', meta.description);
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
const NotFound = lazy(() => import("./pages/NotFound"));

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
      <WatermarkHint />
      <AnimatePresence mode="wait">
        <Suspense fallback={null}>
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<PageWrapper><Home /></PageWrapper>} />
            <Route path="/work" element={<PageWrapper><Work /></PageWrapper>} />
            <Route path="/work/:slug" element={<PageWrapper><ProjectDetail /></PageWrapper>} />
            <Route path="/about" element={<PageWrapper><About /></PageWrapper>} />
            <Route path="/services" element={<PageWrapper><Services /></PageWrapper>} />
            <Route path="/contact" element={<PageWrapper><Contact /></PageWrapper>} />
            <Route path="*" element={<PageWrapper><NotFound /></PageWrapper>} />
          </Routes>
        </Suspense>
      </AnimatePresence>
      <Footer />
    </div>
  );
}

export default App;
