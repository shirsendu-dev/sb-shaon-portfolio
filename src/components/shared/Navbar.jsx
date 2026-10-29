"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { FiArrowUpRight, FiMenu, FiX } from "react-icons/fi";
import { navigation, site } from "@/data/site";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const toggleRef = useRef(null);
  const menuRef = useRef(null);

  useEffect(() => {
    if (!open) return;

    function handleKey(event) {
      if (event.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    }

    function handleOutside(event) {
      if (
        !menuRef.current?.contains(event.target) &&
        !toggleRef.current?.contains(event.target)
      ) {
        setOpen(false);
      }
    }

    document.addEventListener("keydown", handleKey);
    document.addEventListener("pointerdown", handleOutside);

    return () => {
      document.removeEventListener("keydown", handleKey);
      document.removeEventListener("pointerdown", handleOutside);
    };
  }, [open]);

  return (
    <header className="site-header">
      <div className="container nav-inner">
        <Link
          className="brand"
          href="/#home"
          aria-label={`${site.name} home`}
          onClick={() => setOpen(false)}
        >
          <span className="brand-mark" aria-hidden="true">
            s<span>b</span>
          </span>
          <span className="brand-name">
            {site.name}<span className="accent">.</span>
          </span>
        </Link>
        <nav className="desktop-nav" aria-label="Main navigation">
          {navigation.map((item) => (
            <Link href={item.href} key={item.label}>
              {item.label}
            </Link>
          ))}
        </nav>
        <Link className="nav-cta" href="/#contact">
          Let’s Talk <FiArrowUpRight aria-hidden="true" />
        </Link>
        <button
          ref={toggleRef}
          className="menu-toggle"
          aria-expanded={open}
          aria-controls="mobile-navigation"
          aria-label={open ? "Close navigation" : "Open navigation"}
          onClick={() => setOpen(!open)}
        >
          {open ? <FiX aria-hidden="true" /> : <FiMenu aria-hidden="true" />}
        </button>
        <nav
          ref={menuRef}
          id="mobile-navigation"
          className="mobile-nav"
          hidden={!open}
          aria-label="Mobile navigation"
        >
          {navigation.map((item) => (
            <Link
              href={item.href}
              key={item.label}
              onClick={() => setOpen(false)}
            >
              {item.label}
              <FiArrowUpRight aria-hidden="true" />
            </Link>
          ))}
          <Link
            className="mobile-menu-cta"
            href="/#contact"
            onClick={() => setOpen(false)}
          >
            Let’s Talk <FiArrowUpRight aria-hidden="true" />
          </Link>
        </nav>
      </div>
    </header>
  );
}
