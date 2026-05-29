import { useEffect, useRef } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { gsap } from "gsap";
import { Header, Footer } from "./components";

function PageTransition() {
  const location = useLocation();
  const wrapperRef = useRef(null);
  const prevPath = useRef(location.pathname);

  useEffect(() => {
    if (prevPath.current === location.pathname) return;
    prevPath.current = location.pathname;

    const el = wrapperRef.current;
    if (!el) return;

    gsap.fromTo(
      el,
      { opacity: 0, y: 14 },
      { opacity: 1, y: 0, duration: 0.35, ease: "power2.out" }
    );
  }, [location.pathname]);

  return (
    <div ref={wrapperRef} className="page-transition min-h-screen">
      <Outlet />
    </div>
  );
}

export default function App() {
  return (
    <>
      <Header />
      <PageTransition />
      <Footer />
    </>
  );
}
