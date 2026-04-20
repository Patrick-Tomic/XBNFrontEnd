import XBN from "/public/xbnLogoB.png";
import SocialMedia from "./social";
import Image from "next/image";
import { useEffect } from "react";

export default function UserMenu() {
  const links = [
    { id: "brandAnchor", divId: "divBrand", label: "Brands", href: "#" },
    { id: "catAnchor", divId: "divCategory", label: "Categories", href: "#" },
    { id: "productAnchor", divId: "divProducts", label: "All Products", href: "#" },
    { id: "contactAnchor", divId: "divContact", label: "Contact Us", href: "/contact" },
  ];

  useEffect(() => {
    links.forEach(({ id, divId }) => {
      document.getElementById(id)?.addEventListener("mouseover", () => {
        document.getElementById(divId)?.setAttribute("style", "transform:scaleX(1);");
      });
      document.getElementById(id)?.addEventListener("mouseout", () => {
        document.getElementById(divId)?.setAttribute("style", "transform:scaleX(.5);");
      });
    });

    const settingId = "settingAnchor";
    document.getElementById(settingId)?.addEventListener("mouseover", () => {
      document.getElementById("divSetting")?.setAttribute("style", "transform:scaleX(1);");
    });
    document.getElementById(settingId)?.addEventListener("mouseout", () => {
      document.getElementById("divSetting")?.setAttribute("style", "transform:scaleX(.5);");
    });
  });

  return (
    <div
      id="userClass"
      className="z-[11] absolute flex border-r-0 border border-[#2a2a2a] origin-right bg-[#0f0f0f] w-[380px] h-[100%] scale-x-0 transition-all duration-[.4s] ease-in-out flex-col shadow-[4px_0_40px_rgba(0,0,0,0.8)]"
    >
      {/* Header */}
      <div className="flex justify-between items-center px-6 py-5 border-b border-[#1e1e1e]">
        <Image
          className="w-[140px] h-auto object-contain opacity-80"
          src={XBN}
          alt="Xtreme Body Nutrition"
        />
        <button
          id="userMenuExit"
          className="text-[#525252] hover:text-white transition-colors text-lg leading-none w-8 h-8 flex items-center justify-center rounded-md hover:bg-[#1a1a1a]"
          onClick={() => {
            document.getElementById("userClass")?.setAttribute("style", "transform:scaleX(0);");
            document.getElementById("loginForm")?.setAttribute("style", "display:none");
          }}
        >
          ✕
        </button>
      </div>

      {/* Nav Links */}
      <nav className="flex-1 px-6 py-8 flex flex-col gap-1">
        {links.map(({ id, divId, label, href }) => (
          <div key={id} className="flex flex-col">
            <a
              id={id}
              href={href}
              className="text-[#a3a3a3] hover:text-white transition-colors tracking-widest text-sm uppercase py-3 font-medium"
            >
              {label}
            </a>
            <div
              id={divId}
              className="h-px w-[50%] scale-x-[.5] origin-left transition-transform duration-200 bg-[#ff4d00]"
            />
          </div>
        ))}

        <div className="flex flex-col mt-1">
          <a
            id="settingAnchor"
            href={`/settings/${localStorage.getItem("id")}`}
            className="text-[#a3a3a3] hover:text-white transition-colors tracking-widest text-sm uppercase py-3 font-medium"
          >
            Settings
          </a>
          <div
            id="divSetting"
            className="h-px w-[50%] scale-x-[.5] origin-left transition-transform duration-200 bg-[#ff4d00]"
          />
        </div>
      </nav>

      {/* Auth Buttons */}
      <div className="px-6 pb-6 flex flex-col gap-3">
        <button
          id="logoutBtn"
          className="hidden w-full py-2.5 rounded-lg border border-[#2a2a2a] text-[#a3a3a3] hover:border-[#ff4d00] hover:text-white transition-all text-sm tracking-wide font-medium"
          onClick={() => {
            localStorage.clear();
            window.location.reload();
          }}
        >
          Logout
        </button>

        <div className="flex gap-3 startingBtns">
          <button
            id="login"
            className="flex-1 py-2.5 rounded-lg bg-[#ff4d00] hover:bg-[#ff6b2b] text-white transition-colors text-sm tracking-wide font-semibold"
            onClick={() => {
              document.querySelector("main")?.setAttribute("style", "filter: blur(10px)");
              document.querySelector("header")?.setAttribute("style", "filter: blur(10px);");
              document.getElementById("loginForm")?.setAttribute("style", "visibility:visible; opacity:1;");
            }}
          >
            Login
          </button>
          <a href="/signup" className="flex-1">
            <button className="w-full py-2.5 rounded-lg border border-[#2a2a2a] hover:border-[#ff4d00] text-[#a3a3a3] hover:text-white transition-all text-sm tracking-wide font-medium">
              Sign Up
            </button>
          </a>
        </div>

        <div className="pt-4 border-t border-[#1e1e1e]">
          <SocialMedia />
        </div>
      </div>
    </div>
  );
}
