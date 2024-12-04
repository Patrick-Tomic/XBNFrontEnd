 
import XBN from "/public/xbnLogoB.png";
import X from "/public/X.png";
import SocialMedia from "./social";
import Image from "next/image";
import { useEffect } from "react";
export default function UserMenu() {
  useEffect(() => {
    document
      .getElementById("settingAnchor")
      ?.addEventListener("mouseover", () => {
        document
          .getElementById("divSetting")
          ?.setAttribute("style", "transform:scaleX(1);");
      });
    document
      .getElementById("settingAnchor")
      ?.addEventListener("mouseout", () => {
        document
          .getElementById("divSetting")
          ?.setAttribute("style", "transform:scaleX(.5);");
      });
    
    document
      .getElementById("brandAnchor")
      ?.addEventListener("mouseover", () => {
        document
          .getElementById("divBrand")
          ?.setAttribute("style", "transform:scaleX(1);");
      });
    document.getElementById("brandAnchor")?.addEventListener("mouseout", () => {
      document
        .getElementById("divBrand")
        ?.setAttribute("style", "transform:scaleX(.5);");
    });
    document.getElementById("catAnchor")?.addEventListener("mouseover", () => {
      document
        .getElementById("divCategory")
        ?.setAttribute("style", "transform:scaleX(1);");
    });
    document.getElementById("catAnchor")?.addEventListener("mouseout", () => {
      document
        .getElementById("divCategory")
        ?.setAttribute("style", "transform:scaleX(.5);");
    });
    document
      .getElementById("productAnchor")
      ?.addEventListener("mouseover", () => {
        document
          .getElementById("divProducts")
          ?.setAttribute("style", "transform:scaleX(1);");
      });
    document
      .getElementById("productAnchor")
      ?.addEventListener("mouseout", () => {
        document
          .getElementById("divProducts")
          ?.setAttribute("style", "transform:scaleX(.5);");
      });
    document
      .getElementById("contactAnchor")
      ?.addEventListener("mouseover", () => {
        document
          .getElementById("divContact")
          ?.setAttribute("style", "transform:scaleX(1);");
      });
    document
      .getElementById("contactAnchor")
      ?.addEventListener("mouseout", () => {
        document
          .getElementById("divContact")
          ?.setAttribute("style", "transform:scaleX(.5);");
      });
      
  });
  
  return (
    <div
      id="userClass"
      className="z-[11] absolute flex border-2 border-solid origin-right border-black font-[Junge] bg-[#FFFBD6] w-[417px] h-[100%] scale-x-0 transition-all duration-[.5s] ease-in-out flex-col
        lg:text-xl md:text-xl sm:text-xl max-[640px]:text-xl
        "
    >
      <div className="flex justify-around border-b-2 border-black border-solid">
        <Image
          className="w-[200px] h-[100px] max-[400px]:w-[150px] max-[400px]:h-[75px]"
          src={XBN}
          alt="Xtreme Body Nutrition"
        />
        <button
          className="3xl:mr-12 max-[640px]:mr-32 max-[400px]:mr-44 lg:mr-16 md:mr-24 sm:mr-24"
          id="userMenuExit"
          onClick={() => {
            document
              .getElementById("userClass")
              ?.setAttribute("style", "transform:scaleX(0);");
            document
              .getElementById("loginForm")
              ?.setAttribute("style", "display:none");
          }}
        >
          <Image src={X} alt="X" />
        </button>
      </div>
      <div className="h-[60%] ">
      <div className="flex pt-10 mb-10  flex-col justify-around">
        <a id="brandAnchor" href="#">
          Brands
        </a>
        <div
          id="divBrand"
          className="border-b-2 w-[50%] ml-1 scale-[.5] solid border-2 ease-in-out transition-all delay-[.1s] origin-left border-black"
        ></div>
      </div>
      <div className="flex pt-10 mb-10  flex-col justify-around">
        <a id="catAnchor" href="#">
          Categories
        </a>
        <div
          className="border-b-2 w-[50%] ml-1 scale-[.5] solid border-2 ease-in-out transition-all delay-[.1s] origin-left border-black"
          id="divCategory"
        ></div>
      </div>
      <div className="flex pt-10 mb-10  flex-col justify-around">
        <a id="productAnchor" href="#">
          All Products
        </a>
        <div
          className="border-b-2 ml-1 w-[50%] scale-[.5] solid border-2 ease-in-out transition-all delay-[.1s] origin-left border-black"
          id="divProducts"
        ></div>
      </div>
      <div className="flex pt-10 mb-10  flex-col justify-around">
        <a id="contactAnchor" href="#">
          Contact Us
        </a>
        <div
          className="border-b-2 w-[50%] scale-[.5] ml-1 solid border-2 ease-in-out transition-all delay-[.1s] origin-left border-black"
          id="divContact"
        ></div>
      </div>
      <div className="flex pt-10 mb-10  flex-col justify-around">
      <a id="settingAnchor" href={`/settings/${localStorage.getItem("id")}`}>Settings</a>
        <div
          className="border-b-2 w-[50%] scale-[.5] ml-1 solid border-2 ease-in-out transition-all delay-[.1s] origin-left border-black"
          id="divSetting"
        ></div>
      </div>
      </div>
      <div className="flex">
        <button
          id="logoutBtn"
          className="hidden sm:text-base sm:w-[8vw] md:w-[8vw] lg:w-[6vw] font-sans border-solid border-black border-2 rounded-xl text-lg w-[4vw] h-[4vh]"
          onClick={() => {
            localStorage.clear();
            window.location.reload();
          }}
        >
          Logout
        </button>
        
      </div>
      <div className="flex startingBtns justify-center max-[640px]:justify-start  sm:justify-start md:justify-start lg:justify-start mt-2">
        <button
          id="login"
          className="lg:w-[10vw] phone:w-[15vw] 3xl:w-[5vw] sm:w-[10vw] md:w-[10vw] max-[640px]:w-[10vw] font-sans border-solid border-black border-2 rounded-xl hover:bg-[#FF6726] ease-in-out transition-all hover:text-white text-lg w-[5vw] bg-white h-[4vh] mr-10"
          onClick={() => {
            document
              .querySelector("main")
              ?.setAttribute("style", "filter: blur(10px)");
            document
              .querySelector("header")
              ?.setAttribute("style", "filter: blur(10px)");
            document
              .getElementById("loginForm")
              ?.setAttribute("style", "visibility:visible; opacity:1;");
          }}
        >
          Login
        </button>
        <a href="/signup">
          <button className="sm:w-[10vw] 3xl:w-[5vw] phone:w-[20vw] phone:text-base max-[640px]:w-[10vw] max-[640px]:text-sm lg:w-[10vw] md:w-[10vw] font-sans lg:text-base border-solid border-black border-2 rounded-xl text-lg bg-white w-[5vw] h-[4vh] hover:bg-[#FF6726] ease-in-out transition-all hover:text-white">
            Sign-up
          </button>
        </a>
      </div>
      <div className="left-0">
        <div className=" ">
          <SocialMedia />
        </div>
      </div>
    </div>
  );
}
