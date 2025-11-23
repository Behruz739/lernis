import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, GraduationCap } from 'lucide-react';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Scroll event listener
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    const element = document.querySelector(targetId);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
    setIsMenuOpen(false);
  };

  const navLinks = [
    { name: 'Qanday ishlaydi', href: '#how-it-works' },
    { name: 'Imkoniyatlar', href: '#features' },
    { name: 'Fikrlar', href: '#testimonials' },
    { name: 'Biz haqimizda', href: '#about' },
    { name: 'Narxlar', href: '#pricing' },
    { name: 'FAQ', href: '#faq' },
  ];

  return (
    <nav
      className={`fixed left-0 right-0 z-50 transition-all duration-300 ease-out will-change-transform ${isScrolled
        ? 'top-2 sm:top-4'
        : 'top-0'
        }`}
    >
      <div
        className={`mx-auto transition-all duration-300 ease-out will-change-transform ${isScrolled
          ? 'max-w-[95%] sm:max-w-5xl bg-white/95 shadow-lg shadow-black/5 rounded-full py-2 px-4'
          : 'max-w-7xl bg-transparent py-4 sm:py-6 px-4 sm:px-6 lg:px-8'
          }`}
      >
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center pl-2">
            <Link to="/" className="flex items-center gap-2 group">
              <div className="w-9 h-9 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-300">
                <GraduationCap className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900 tracking-tight group-hover:text-blue-600 transition-colors">Lernis</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1 bg-white/40 backdrop-blur-sm px-2 py-1.5 rounded-full border border-white/20 shadow-sm">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleSmoothScroll(e, link.href)}
                className="text-sm font-medium text-gray-600 hover:text-gray-900 px-4 py-2 rounded-full hover:bg-white/60 transition-all duration-200 cursor-pointer"
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center gap-3 pr-2">
            <Link
              to="/auth/login"
              className="text-sm font-medium text-gray-600 hover:text-gray-900 px-4 py-2 rounded-full hover:bg-white/50 transition-all duration-200"
            >
              Kirish
            </Link>
            <Link
              to="/auth/register"
              className="bg-gray-900 text-white px-6 py-2.5 rounded-full hover:bg-black hover:shadow-lg hover:scale-105 transition-all duration-300 text-sm font-bold shadow-md"
            >
              Boshlash
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden flex items-center pr-2">
            <button
              onClick={toggleMenu}
              className="p-2 rounded-full hover:bg-white/50 transition-colors text-gray-700"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isMenuOpen && (
        <div className="absolute top-full left-4 right-4 mt-2 p-4 bg-white/90 backdrop-blur-xl rounded-3xl border border-white/50 shadow-2xl lg:hidden animate-in fade-in slide-in-from-top-4 duration-200">
          <div className="flex flex-col space-y-2">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleSmoothScroll(e, link.href)}
                className="px-4 py-3 text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50/50 rounded-xl transition-all duration-200"
              >
                {link.name}
              </a>
            ))}
            <div className="h-px bg-gray-200/50 my-2"></div>
            <Link
              to="/auth/login"
              className="px-4 py-3 text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50/50 rounded-xl transition-all duration-200"
              onClick={() => setIsMenuOpen(false)}
            >
              Kirish
            </Link>
            <Link
              to="/auth/register"
              className="bg-gray-900 text-white px-4 py-3 rounded-xl hover:bg-black transition-all duration-200 text-center text-sm font-bold shadow-lg mt-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Boshlash
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
