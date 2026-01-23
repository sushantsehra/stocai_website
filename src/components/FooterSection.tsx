import { Linkedin, Mail, Twitter } from "lucide-react";
import { MdOutlineSecurity } from "react-icons/md";
import { FaLock } from "react-icons/fa6";

const Footer = () => {
  const quickLinks: string[] = [
    'About the Program',
    'Modules',
    'Testimonials',
    'Pricing',
    'FAQ'
  ];

  const footerLinks: string[] = [
    'Privacy Policy',
    'Terms of Service',
    'Refund Policy'
  ];

  return (
    <footer className="bg-slate-900 text-white py-8 md:py-12 px-4 sm:px-6">
      <div className="max-w-full container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-6 md:mb-8 container mx-auto">
          <div>
            <h3 className="text-xl sm:text-2xl lg:text-[24px] font-bold font-jakarta mb-4">
              Be More <span className="text-[#2474F5]">Promotable</span>
            </h3>
            <p className="text-white/70 mb-6 text-xs sm:text-sm lg:text-base font-jakarta font-normal leading-5.5">
              A career acceleration program by BCL. We help experienced professionals break through career plateaus using proven frameworks for visibility, credibility, and influence.
            </p>
            <div className="flex gap-3">
              <button 
                className="w-9 h-9 rounded-lg bg-white/10 hover:bg-slate-700 flex items-center justify-center transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5 text-black" />
              </button>
              <button 
                className="w-9 h-9 rounded-lg bg-white/10 hover:bg-slate-700 flex items-center justify-center transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="w-5 h-5 text-black" />
              </button>
              <button 
                className="w-9 h-9 rounded-lg bg-white/10 hover:bg-slate-700 flex items-center justify-center transition-colors"
                aria-label="Email"
              >
                <Mail className="w-5 h-5 text-black" />
              </button>
            </div>
          </div>

          <div>
            <h4 className="mb-4 text-sm sm:text-base font-bold font-jakarta">Quick Links</h4>
            <ul className="space-y-2 text-xs sm:text-sm  lg:text-base">
              {quickLinks.map((link: string, index: number) => (
                <li key={index}>
                  <a href="#" className="text-white/70 font-normal font-jakarta text-[16px] hover:text-white transition-colors">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4 text-sm sm:text-base font-jakarta">Contact Us</h4>
            <p className="text-white/70 lg:text-base font-normal font-jakarta text-xs sm:text-sm mb-2">hello@bemorepromotable.com</p>
            <p className="text-white/70 lg:text-base font-normal font-jakarta text-xs sm:text-sm mb-6">Based in Bangalore, India</p>
            <div className="pt-4 border-t border-white/10">
              <p className="text-xs sm:text-sm md:text-[14px] font-normal font-jakarta text-white/50 mb-2">Secure Payments</p>
              <div className="flex flex-wrap items-center gap-3 text-xs md:text-[12px] text-white/50">
                <span className="flex items-center gap-1  text-[12px] font-jakarta">
                  {/* <div className="w-3 h-3 rounded-full border-2 border-green-500 flex items-center justify-center">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>
                  </div> */}
                  <MdOutlineSecurity className="w-3 h-3 text-white/50  font-jakarta" />
                  SSL Secured
                </span>
                <span className="flex items-center gap-1 text-white/50 font-jakarta">
                  <FaLock className="w-3 h-3 text-white/50 text-[12px]" />
                  256-bit Encryption
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-6 md:pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 font-jakarta text-xs sm:text-sm md:text-[14px] text-white/50">
            <p>© 2026 BCL Career Labs. All rights reserved.</p>
            <div className="flex flex-wrap justify-center gap-4 md:gap-6">
              {footerLinks.map((link: string, index: number) => (
                <a key={index} href="#" className="hover:text-white transition-colors md:text-[14px] font-jakarta font-normal text-white/50">
                  {link}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;