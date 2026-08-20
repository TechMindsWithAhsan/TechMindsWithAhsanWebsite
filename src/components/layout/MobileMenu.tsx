"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { twMerge } from "tailwind-merge";
import { NAV_LINKS, SERVICE_LINKS } from "./Navbar";
import Button from "../ui/Button";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  pathname: string;
}

export default function MobileMenu({
  isOpen,
  onClose,
  pathname,
}: MobileMenuProps) {
  const [isServicesOpen, setIsServicesOpen] = useState(
    pathname.startsWith("/services"),
  );

  // Prevent scrolling when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <>
      {isOpen && (
        <>
          <div
            onClick={onClose}
            className="fixed inset-0 z-40 bg-[#0a0a0a]/80 backdrop-blur-sm lg:hidden"
          />
          <div className="fixed right-0 top-0 z-40 flex h-full w-full max-w-sm animate-[slideIn_180ms_ease-out] flex-col overflow-y-auto border-l border-white/5 bg-[#111111] p-6 lg:hidden">
            <div className="mt-20 flex flex-col gap-6">
              <nav className="flex flex-col gap-4">
                {NAV_LINKS.map((link) => {
                  const isActive =
                    pathname === link.path ||
                    (link.path !== "/" && pathname.startsWith(link.path));

                  if (link.name === "Services") {
                    return (
                      <div key={link.name}>
                        <div className="flex items-center justify-between">
                          <Link
                            href={link.path}
                            onClick={onClose}
                            className={twMerge(
                              "text-2xl font-semibold transition-colors",
                              isActive
                                ? "text-sky-500"
                                : "text-zinc-300 hover:text-white",
                            )}
                          >
                            Services
                          </Link>
                          <button
                            type="button"
                            aria-label="Toggle services"
                            aria-expanded={isServicesOpen}
                            onClick={() => setIsServicesOpen((open) => !open)}
                            className="p-2 text-xl text-zinc-400"
                          >
                            <span
                              aria-hidden="true"
                              className={twMerge(
                                "inline-block transition-transform",
                                isServicesOpen ? "rotate-180" : "",
                              )}
                            >
                              ⌄
                            </span>
                          </button>
                        </div>
                        {isServicesOpen && (
                          <div className="ml-4 mt-3 space-y-2 border-l border-white/10 pl-4">
                            {SERVICE_LINKS.map((service) => (
                              <Link
                                key={service.name}
                                href={`/services#${service.slug}`}
                                onClick={onClose}
                                className="block py-1 text-sm text-zinc-400 hover:text-sky-400"
                              >
                                {service.name}
                              </Link>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  }

                  return (
                    <Link
                      key={link.name}
                      href={link.path}
                      onClick={onClose}
                      className={twMerge(
                        "text-2xl font-semibold transition-colors",
                        isActive
                          ? "text-sky-500"
                          : "text-zinc-300 hover:text-white",
                      )}
                    >
                      {link.name}
                    </Link>
                  );
                })}
              </nav>

              <div className="h-px w-full bg-white/10 my-4" />

              <Button
                href="/contact"
                variant="primary"
                className="w-full"
                onClick={onClose}
              >
                Book a Call
              </Button>
            </div>
          </div>
        </>
      )}
    </>
  );
}
