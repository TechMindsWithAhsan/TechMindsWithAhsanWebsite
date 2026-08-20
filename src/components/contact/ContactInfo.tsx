import { FiMail, FiMapPin, FiMessageCircle, FiLinkedin, FiFacebook, FiInstagram, FiYoutube } from 'react-icons/fi';
import { FaTiktok, FaGithub } from 'react-icons/fa';

export default function ContactInfo() {
  return (
    <div className="flex flex-col gap-8 h-full">
      <div className="bg-[#111111] p-8 rounded-2xl border border-gray-800 flex-grow">
        <h3 className="text-2xl font-bold text-white mb-6">Direct Contact</h3>
        
        <div className="space-y-6">
          <a href="mailto:techmindswithahsan@gmail.com" className="flex items-start gap-4 group">
            <div className="p-3 bg-[#0EA5E9]/10 text-[#0EA5E9] rounded-lg group-hover:bg-[#0EA5E9] group-hover:text-white transition-colors">
              <FiMail className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm text-gray-400 mb-1">Email</p>
              <p className="text-white font-medium group-hover:text-[#0EA5E9] transition-colors">techmindswithahsan@gmail.com</p>
            </div>
          </a>

          <a href="https://wa.me/923012661331" target="_blank" rel="noopener noreferrer" className="flex items-start gap-4 group">
            <div className="p-3 bg-[#25D366]/10 text-[#25D366] rounded-lg group-hover:bg-[#25D366] group-hover:text-white transition-colors">
              <FiMessageCircle className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm text-gray-400 mb-1">WhatsApp</p>
              <p className="text-white font-medium group-hover:text-[#25D366] transition-colors">+92 301 2661331</p>
            </div>
          </a>

          <div className="flex items-start gap-4">
            <div className="p-3 bg-gray-800 text-gray-400 rounded-lg">
              <FiMapPin className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm text-gray-400 mb-1">Location</p>
              <p className="text-white font-medium">Karachi, Pakistan</p>
            </div>
          </div>
        </div>

        <div className="mt-8 p-4 bg-[#0A0A0A] rounded-xl border border-gray-800">
          <p className="text-sm text-gray-300 leading-relaxed">
            Prefer a quick chat? Reach out on WhatsApp for a fast response.
          </p>
        </div>
      </div>

      <div className="bg-[#111111] p-8 rounded-2xl border border-gray-800">
        <h3 className="text-lg font-bold text-white mb-4">Follow the Journey</h3>
        <div className="flex flex-wrap gap-4">
          <a href="https://www.linkedin.com/in/techmindswithahsan/" target="_blank" rel="noopener noreferrer" className="p-3 bg-[#0A0A0A] border border-gray-800 text-gray-400 hover:text-[#0EA5E9] hover:border-[#0EA5E9] rounded-lg transition-all">
            <FiLinkedin className="w-5 h-5" />
          </a>
          <a href="https://www.facebook.com/TechMindsWithAhsan" target="_blank" rel="noopener noreferrer" className="p-3 bg-[#0A0A0A] border border-gray-800 text-gray-400 hover:text-blue-500 hover:border-blue-500 rounded-lg transition-all">
            <FiFacebook className="w-5 h-5" />
          </a>
          <a href="https://www.instagram.com/techmindswithahsan/" target="_blank" rel="noopener noreferrer" className="p-3 bg-[#0A0A0A] border border-gray-800 text-gray-400 hover:text-pink-500 hover:border-pink-500 rounded-lg transition-all">
            <FiInstagram className="w-5 h-5" />
          </a>
          <a href="https://www.tiktok.com/@techmindswithahsan" target="_blank" rel="noopener noreferrer" className="p-3 bg-[#0A0A0A] border border-gray-800 text-gray-400 hover:text-white hover:border-white rounded-lg transition-all">
            <FaTiktok className="w-5 h-5" />
          </a>
          <a href="https://www.youtube.com/@TechMindsWithAhsan" target="_blank" rel="noopener noreferrer" className="p-3 bg-[#0A0A0A] border border-gray-800 text-gray-400 hover:text-red-500 hover:border-red-500 rounded-lg transition-all">
            <FiYoutube className="w-5 h-5" />
          </a>
          <a href="https://www.youtube.com/@Gearlabofficial" target="_blank" rel="noopener noreferrer" aria-label="GearLab YouTube" className="p-3 bg-[#0A0A0A] border border-gray-800 text-gray-400 hover:text-red-500 hover:border-red-500 rounded-lg transition-all">
            <FiYoutube className="w-5 h-5" />
          </a>
          <a href="https://github.com/TechMindsWithAhsan" target="_blank" rel="noopener noreferrer" aria-label="TechMindsWithAhsan GitHub" className="p-3 bg-[#0A0A0A] border border-gray-800 text-gray-400 hover:text-white hover:border-white rounded-lg transition-all">
            <FaGithub className="w-5 h-5" />
          </a>
        </div>
      </div>
    </div>
  );
}
