import { Link } from 'react-router-dom';
import {
  GraduationCap,
  Mail,
  Phone,
  MapPin,
  Twitter,
  Linkedin,
  Github,
  ArrowRight
} from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden bg-gray-900">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Main Footer Content */}
        <div className="py-12 md:py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                <GraduationCap className="h-6 w-6 text-white" />
              </div>
              <span className="text-2xl font-black text-white">Lernis</span>
            </div>
            <p className="text-gray-400 mb-6 max-w-sm leading-relaxed text-sm">
              Ta'limni raqamli yechimlar bilan yangilaymiz. Xavfsiz, ishonchli va global darajada tan olinadigan raqamli sertifikatlar.
            </p>
            <div className="flex space-x-3">
              <a
                href="#"
                className="w-10 h-10 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center hover:scale-110 transition-all duration-300 border border-white/10"
              >
                <Twitter className="h-4 w-4 text-white" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center hover:scale-110 transition-all duration-300 border border-white/10"
              >
                <Linkedin className="h-4 w-4 text-white" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center hover:scale-110 transition-all duration-300 border border-white/10"
              >
                <Github className="h-4 w-4 text-white" />
              </a>
            </div>
          </div>

          {/* Product Links */}
          <div>
            <h3 className="text-base font-bold mb-5 text-white">Mahsulot</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/#features" className="text-sm text-gray-400 hover:text-white transition-colors duration-200 flex items-center gap-2 group">
                  <ArrowRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  Imkoniyatlar
                </Link>
              </li>
              <li>
                <Link to="/#pricing" className="text-sm text-gray-400 hover:text-white transition-colors duration-200 flex items-center gap-2 group">
                  <ArrowRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  Narxlar
                </Link>
              </li>
              <li>
                <Link to="/verify" className="text-sm text-gray-400 hover:text-white transition-colors duration-200 flex items-center gap-2 group">
                  <ArrowRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  Sertifikatni tekshirish
                </Link>
              </li>
              <li>
                <Link to="/api-docs" className="text-sm text-gray-400 hover:text-white transition-colors duration-200 flex items-center gap-2 group">
                  <ArrowRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  API hujjatlari
                </Link>
              </li>
              <li>
                <Link to="/integrations" className="text-sm text-gray-400 hover:text-white transition-colors duration-200 flex items-center gap-2 group">
                  <ArrowRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  Integratsiyalar
                </Link>
              </li>
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="text-base font-bold mb-5 text-white">Kompaniya</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/#about" className="text-sm text-gray-400 hover:text-white transition-colors duration-200 flex items-center gap-2 group">
                  <ArrowRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  Biz haqimizda
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-sm text-gray-400 hover:text-white transition-colors duration-200 flex items-center gap-2 group">
                  <ArrowRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  Blog
                </Link>
              </li>
              <li>
                <Link to="/careers" className="text-sm text-gray-400 hover:text-white transition-colors duration-200 flex items-center gap-2 group">
                  <ArrowRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  Bo'sh ish o'rinlari
                </Link>
              </li>
              <li>
                <Link to="/press" className="text-sm text-gray-400 hover:text-white transition-colors duration-200 flex items-center gap-2 group">
                  <ArrowRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  Matbuot
                </Link>
              </li>
              <li>
                <Link to="/partners" className="text-sm text-gray-400 hover:text-white transition-colors duration-200 flex items-center gap-2 group">
                  <ArrowRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  Hamkorlar
                </Link>
              </li>
            </ul>
          </div>

          {/* Support & Contact */}
          <div>
            <h3 className="text-base font-bold mb-5 text-white">Qo'llab-quvvatlash</h3>
            <ul className="space-y-3 mb-6">
              <li>
                <Link to="/help" className="text-sm text-gray-400 hover:text-white transition-colors duration-200 flex items-center gap-2 group">
                  <ArrowRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  Yordam markazi
                </Link>
              </li>
              <li>
                <Link to="/docs" className="text-sm text-gray-400 hover:text-white transition-colors duration-200 flex items-center gap-2 group">
                  <ArrowRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  Hujjatlar
                </Link>
              </li>
              <li>
                <Link to="/status" className="text-sm text-gray-400 hover:text-white transition-colors duration-200 flex items-center gap-2 group">
                  <ArrowRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  Tizim holati
                </Link>
              </li>
              <li>
                <Link to="/security" className="text-sm text-gray-400 hover:text-white transition-colors duration-200 flex items-center gap-2 group">
                  <ArrowRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  Xavfsizlik
                </Link>
              </li>
            </ul>

            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center space-x-3 text-gray-400 hover:text-white transition-colors duration-200">
                <div className="w-8 h-8 bg-blue-600/20 rounded-lg flex items-center justify-center">
                  <Mail className="h-4 w-4" />
                </div>
                <span className="text-xs">yuldoshev.dsgn@gmail.com</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-400 hover:text-white transition-colors duration-200">
                <div className="w-8 h-8 bg-green-600/20 rounded-lg flex items-center justify-center">
                  <Phone className="h-4 w-4" />
                </div>
                <span className="text-xs">+998 93 009 37 85</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-400 hover:text-white transition-colors duration-200">
                <div className="w-8 h-8 bg-purple-600/20 rounded-lg flex items-center justify-center">
                  <MapPin className="h-4 w-4" />
                </div>
                <span className="text-xs">Toshkent, O'zbekiston</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-gray-400 text-xs">
              © {currentYear} Lernis. Barcha huquqlar himoyalangan.
            </div>
            <div className="flex flex-wrap justify-center gap-6 text-xs">
              <Link to="/privacy" className="text-gray-400 hover:text-white transition-colors duration-200">
                Maxfiylik siyosati
              </Link>
              <Link to="/terms" className="text-gray-400 hover:text-white transition-colors duration-200">
                Foydalanish shartlari
              </Link>
              <Link to="/cookies" className="text-gray-400 hover:text-white transition-colors duration-200">
                Cookie siyosati
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}