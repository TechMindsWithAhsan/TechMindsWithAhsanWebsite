import Link from "next/link";
import Image from "next/image";
import {
  FaLinkedin,
  FaFacebook,
  FaInstagram,
  FaTiktok,
  FaYoutube,
  FaGithub,
} from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-[#050505] border-t border-white/5 pt-16 pb-8 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-sky-500/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand Column */}
          <div className="space-y-4">
            <Link href="/" className="inline-block">
              <Image
                src="/images/logo.png?v=2"
                alt="TechMindsWithAhsan"
                width={120}
                height={120}
                className="h-24 w-24 object-contain"
              />
            </Link>
            <p className="text-zinc-400 text-sm leading-relaxed">
              Engineering Digital Empires through AI, Custom & Web Development,
              and Strategic Growth. Let&apos;s build the future together.
            </p>
            <div className="pt-2">
              <a
                href="mailto:techmindswithahsan@gmail.com"
                className="block text-zinc-300 hover:text-sky-400 transition-colors mb-1"
              >
                techmindswithahsan@gmail.com
              </a>
              <a
                href="tel:+923012661331"
                className="block text-zinc-300 hover:text-sky-400 transition-colors"
              >
                +92 301 2661331
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-6">Quick Links</h4>
            <ul className="space-y-3">
              {[
                "Home",
                "About",
                "Services",
                "Portfolio",
                "Blog",
                "Contact",
              ].map((item) => (
                <li key={item}>
                  <Link
                    href={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                    className="text-zinc-400 hover:text-sky-400 transition-colors"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white font-semibold mb-6">Services</h4>
            <ul className="space-y-3">
              {[
                "AI Automation",
                "Custom & Web Development",
                "AI Products",
                "Growth Marketing",
                "SEO Strategy",
                "Tech Consulting",
              ].map((item) => (
                <li key={item}>
                  <Link
                    href="/services"
                    className="text-zinc-400 hover:text-sky-400 transition-colors"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h4 className="text-white font-semibold mb-6">Connect</h4>
            <div className="flex items-center gap-4">
              <a
                href="https://www.linkedin.com/in/techmindswithahsan/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-[#111111] flex items-center justify-center text-zinc-400 hover:text-white hover:bg-sky-600 transition-all"
              >
                <FaLinkedin size={18} />
              </a>
              <a
                href="https://www.facebook.com/TechMindsWithAhsan"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-[#111111] flex items-center justify-center text-zinc-400 hover:text-white hover:bg-blue-600 transition-all"
              >
                <FaFacebook size={18} />
              </a>
              <a
                href="https://www.instagram.com/techmindswithahsan/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-[#111111] flex items-center justify-center text-zinc-400 hover:text-white hover:bg-pink-600 transition-all"
              >
                <FaInstagram size={18} />
              </a>
              <a
                href="https://www.tiktok.com/@techmindswithahsan"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-[#111111] flex items-center justify-center text-zinc-400 hover:text-white hover:bg-black transition-all border border-transparent hover:border-white/20"
              >
                <FaTiktok size={18} />
              </a>
              <a
                href="https://www.youtube.com/@TechMindsWithAhsan"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-[#111111] flex items-center justify-center text-zinc-400 hover:text-white hover:bg-red-600 transition-all"
              >
                <FaYoutube size={18} />
              </a>
              <a
                href="https://www.youtube.com/@Gearlabofficial"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GearLab YouTube"
                className="w-10 h-10 rounded-full bg-[#111111] flex items-center justify-center text-zinc-400 hover:text-white hover:bg-red-600 transition-all"
              >
                <FaYoutube size={18} />
              </a>
              <a
                href="https://github.com/TechMindsWithAhsan"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="TechMindsWithAhsan GitHub"
                className="w-10 h-10 rounded-full bg-[#111111] flex items-center justify-center text-zinc-400 hover:text-white hover:bg-gray-700 transition-all"
              >
                <FaGithub size={18} />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-zinc-500 text-sm text-center md:text-left">
            © {new Date().getFullYear()} TechMindsWithAhsan. All rights
            reserved. | Founded by Ahsan Hayat
          </p>
          <div className="flex items-center gap-2 text-sm text-zinc-500">
            <span>Built with</span>
            <span className="font-semibold text-white">Next.js</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
