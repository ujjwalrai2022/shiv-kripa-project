import React from "react";
import {
  MailOutlined,
  PhoneOutlined,
  WhatsAppOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

function Footer() {
    const navigate= useNavigate()
  return (
    <footer className="bg-black text-white mt-16 px-6 py-10 rounded-t-3xl">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Brand */}
        <div>
          <h2 className="text-2xl font-bold">Shiv Kripa Photo Framing</h2>
          <p className="text-gray-400 mt-3">
            Premium photo frames, posters & customized designs for your home and
            workspace.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2 text-gray-400">
            <li className="hover:text-white cursor-pointer">Home</li>
            <li className="hover:text-white cursor-pointer">Catalogue</li>
            <li onClick={()=>navigate("/about")} className="hover:text-white cursor-pointer">About</li>
            <li className="hover:text-white cursor-pointer">Contact</li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Contact</h3>

          <div
            className="flex items-center gap-3 text-gray-400 hover:text-white cursor-pointer"
            onClick={() =>
              (window.location.href = "mailto:ujjwalrai702@gmail.com")
            }
          >
            <MailOutlined />
            <span>ujjwalrai702@gmail.com</span>
          </div>

          <div onClick={()=>(window.location.href="tel:9103000643")} className="flex items-center gap-3 mt-3 text-gray-400 hover:text-white cursor-pointer">
            <PhoneOutlined />
            <span>+91 9103000643</span>
          </div>

          <div
            className="flex items-center gap-3 mt-3 text-gray-400 hover:text-white cursor-pointer"
            onClick={() =>
              window.open("https://api.whatsapp.com/send?phone=9103000643")
            }
          >
            <WhatsAppOutlined />
            <span>Chat on WhatsApp</span>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-gray-700 mt-8 pt-5 text-center text-gray-500 text-sm">
        © {new Date().getFullYear()} Shiv Kripa Photo Framing. All rights
        reserved.
      </div>
    </footer>
  );
}

export default Footer;
