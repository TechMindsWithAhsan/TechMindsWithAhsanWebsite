"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { twMerge } from "tailwind-merge";
import Button from "../ui/Button";
import MobileMenu from "./MobileMenu";

export const NAV_LINKS = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "Services", path: "/services" },
  { name: "Portfolio", path: "/portfolio" },
  { name: "Blog", path: "/blog" },
  { name: "Contact", path: "/contact" },
];

export const SERVICE_LINKS = [
  {
    name: "AI Automation",
    slug: "ai-automation",
    description: "Agents, RAG systems, and workflow automation",
  },
  {
    name: "Custom & Web Development",
    slug: "custom-web-development",
    description: "Custom websites, web apps, and scalable digital products",
  },
  {
    name: "Mobile App Development",
    slug: "mobile-app-development",
    description: "iOS and Android apps with polished, reliable user flows",
  },
  {
    name: "AI Product Development",
    slug: "ai-product-development",
    description: "From product idea to production",
  },
  {
    name: "Growth Marketing",
    slug: "growth-marketing",
    description: "Performance marketing and conversion strategy",
  },
  {
    name: "SEO Strategy",
    slug: "seo-strategy",
    description: "Technical SEO and sustainable organic growth",
  },
  {
    name: "Tech Consulting",
    slug: "tech-consulting",
    description: "Architecture, strategy, and fractional CTO support",
  },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const servicesMenuRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsServicesOpen(false);
  }, [pathname]);

  useEffect(() => {
    const handlePointerDown = (event: PointerEvent) => {
      if (
        servicesMenuRef.current &&
        !servicesMenuRef.current.contains(event.target as Node)
      ) {
        setIsServicesOpen(false);
      }
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsServicesOpen(false);
    };
    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <>
      <header
        className={twMerge(
          "fixed top-0 w-full z-40 transition-all duration-300",
          isScrolled
            ? "bg-[#0a0a0a]/80 backdrop-blur-md py-4 shadow-lg border-b border-white/5"
            : "bg-transparent py-6",
        )}
      >
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link
              href="/"
              className="flex items-center gap-2 relative z-50"
              aria-label="TechMindsWithAhsan home"
            >
              <Image
                src="/images/logo.png?v=2"
                alt="TechMindsWithAhsan"
                width={58}
                height={58}
                className="h-12 w-12 object-contain"
                priority
              />
              <span className="hidden sm:inline text-lg font-bold tracking-tight text-white">
                TechMinds<span className="text-sky-500">WithAhsan</span>
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-8">
              {NAV_LINKS.map((link) => {
                const isActive =
                  pathname === link.path ||
                  (link.path !== "/" && pathname.startsWith(link.path));

                if (link.name === "Services") {
                  return (
                    <div
                      key={link.name}
                      ref={servicesMenuRef}
                      className="relative"
                    >
                      <button
                        type="button"
                        aria-expanded={isServicesOpen}
                        aria-controls="desktop-services-menu"
                        onClick={() => setIsServicesOpen((open) => !open)}
                        className={twMerge(
                          "flex items-center gap-1 text-sm font-medium transition-colors hover:text-sky-400",
                          isActive ? "text-sky-500" : "text-zinc-300",
                        )}
                      >
                        Services{" "}
                        <span
                          aria-hidden="true"
                          className={twMerge(
                            "text-xs transition-transform",
                            isServicesOpen ? "rotate-180" : "",
                          )}
                        >
                          ⌄
                        </span>
                      </button>
                      {isServicesOpen && (
                        <div
                          id="desktop-services-menu"
                          className="absolute left-1/2 top-full z-50 w-80 -translate-x-1/2 pt-4"
                        >
                          <div className="border border-white/10 bg-[#111111] p-2 shadow-2xl shadow-black/40">
                            <Link
                              href="/services"
                              onClick={() => setIsServicesOpen(false)}
                              className="mb-1 block rounded-lg border-b border-white/10 px-4 py-3 text-sm font-semibold text-sky-400 hover:bg-white/5"
                            >
                              View all services
                            </Link>
                            {SERVICE_LINKS.map((service) => (
                              <Link
                                key={service.name}
                                href={`/services#${service.slug}`}
                                onClick={() => setIsServicesOpen(false)}
                                className="block rounded-lg px-4 py-3 hover:bg-white/5"
                              >
                                <span className="block text-sm font-semibold text-white">
                                  {service.name}
                                </span>
                                <span className="mt-1 block text-xs leading-relaxed text-zinc-400">
                                  {service.description}
                                </span>
                              </Link>
                            ))}
                          </div>
                        </div>
                      )}
                      {isActive && (
                        <div className="h-0.5 bg-sky-500 mt-1 rounded-full" />
                      )}
                    </div>
                  );
                }

                return (
                  <Link
                    key={link.name}
                    href={link.path}
                    className={twMerge(
                      "text-sm font-medium transition-colors hover:text-sky-400",
                      isActive ? "text-sky-500" : "text-zinc-300",
                    )}
                  >
                    {link.name}
                    {isActive && (
                      <div className="h-0.5 bg-sky-500 mt-1 rounded-full" />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* CTA & Mobile Toggle */}
            <div className="flex items-center gap-4">
              <div className="hidden md:block">
                <Button href="/contact" variant="primary" size="sm">
                  Book a Call
                </Button>
              </div>

              <button
                className="lg:hidden relative z-50 text-white p-2"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label="Toggle Menu"
              >
                <div className="w-6 h-5 flex flex-col justify-between">
                  <span
                    className={twMerge(
                      "w-full h-0.5 bg-white transition-transform duration-300",
                      isMobileMenuOpen ? "rotate-45 translate-y-2" : "",
                    )}
                  />
                  <span
                    className={twMerge(
                      "w-full h-0.5 bg-white transition-opacity duration-300",
                      isMobileMenuOpen ? "opacity-0" : "",
                    )}
                  />
                  <span
                    className={twMerge(
                      "w-full h-0.5 bg-white transition-transform duration-300",
                      isMobileMenuOpen ? "-rotate-45 -translate-y-2.5" : "",
                    )}
                  />
                </div>
              </button>
            </div>
          </div>
        </div>
      </header>

      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        pathname={pathname}
      />
    </>
  );
}
