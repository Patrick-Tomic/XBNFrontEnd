/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-base-to-string */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-confusing-void-expression */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
"use client";

import UserMenu from "./userMenu";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useEffect, useState } from "react";
import xbn from "/public/xbn.png";
import React from "react";

export default function Header() {
  const [brands, setBrands] = useState([]);
  const [categories, setCategories] = useState([]);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileBrandsOpen, setMobileBrandsOpen] = useState(false);
  const [mobileCatsOpen, setMobileCatsOpen] = useState(false);

  const validationSchema = Yup.object().shape({
    username: Yup.string().required("Please enter your email"),
    password: Yup.string().required("Please enter your password"),
  });
  const formOptions = { resolver: yupResolver(validationSchema) };
  const { register, handleSubmit, reset } = useForm(formOptions);

  const submitForm = async (data: any) => {
    const formData = JSON.stringify(data);
    try {
      const req = await fetch(`${process.env.NEXT_PUBLIC_backend_Link}login`, {
        method: "POST",
        body: formData,
        headers: { "Content-Type": "application/json" },
      });
      const file = await req.json();
      if (req.status !== 200) return;
      localStorage.setItem("token", file.token);
      localStorage.setItem("userAuthorization", "true");
      localStorage.setItem("admin", file.body.admin);
      localStorage.setItem("id", file.body._id);
      reset();
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const handleCartAdded = () => {
      document.querySelectorAll(".cart-btn").forEach((cartEl) => {
        cartEl.classList.remove("cart-shake");
        void (cartEl as HTMLElement).offsetWidth;
        cartEl.classList.add("cart-shake");
        cartEl.addEventListener("animationend", () => cartEl.classList.remove("cart-shake"), { once: true });
      });
    };
    window.addEventListener("cart-added", handleCartAdded);

    document.getElementById("brandUL")?.addEventListener("mouseover", () => {
      document.getElementById("brandDiv")?.setAttribute("style", "height:80vh;");
    });
    document.getElementById("brandUL")?.addEventListener("mouseout", () => {
      document.getElementById("brandDiv")?.setAttribute("style", "height:auto;");
    });

    (async () => {
      const valid = await fetch(
        `${process.env.NEXT_PUBLIC_backend_Link}load/${localStorage.getItem("token")}`,
      );
      if (valid.status === 200) {
        document.querySelector(".startingBtns")?.setAttribute("style", "display:none");
        document.querySelector("#logoutBtn")?.setAttribute("style", "display:block");
        document.querySelectorAll(".cart-btn").forEach((el) => el.setAttribute("style", "display:flex"));
        localStorage.setItem("validToken", "true");
      } else {
        localStorage.clear();
      }
    })();

    (async () => {
      const brandResponse = await fetch(`${process.env.NEXT_PUBLIC_backend_Link}brands`);
      const data = await brandResponse.json();
      setBrands(data.brands);
    })();

    (async () => {
      const categoryResponse = await fetch(`${process.env.NEXT_PUBLIC_backend_Link}categories`);
      const dataB = await categoryResponse.json();
      setCategories(dataB.categories);
    })();
  }, []);

  const categoryListItems = categories.map((cat: any) => {
    document.getElementById(`${cat.type}`)?.addEventListener("mouseover", () => {
      document.getElementById(`div${cat.type}`)?.setAttribute("style", "transform:scaleX(1);");
    });
    document.getElementById(`${cat.type}`)?.addEventListener("mouseout", () => {
      document.getElementById(`div${cat.type}`)?.setAttribute("style", "transform:scaleX(0);");
    });
    return (
      <li
        key={cat.type}
        id="categoryChild"
        className="px-5 py-3 bg-[#111111] border-x border-[#2a2a2a] hidden hover:bg-[#1a1a1a] transition-colors"
      >
        <button
          id={`${cat.type}`}
          className="text-[#a3a3a3] hover:text-[#ff4d00] transition-colors text-sm tracking-wide uppercase font-normal"
          onClick={() => { window.location.href = `/category/${cat._id}`; }}
        >
          {cat.type}
        </button>
        <div
          className="h-px w-[80%] scale-x-0 origin-left transition-transform duration-200 bg-[#ff4d00] mt-1"
          id={`div${cat.type}`}
        />
      </li>
    );
  });

  const brandListItems = brands.map((brand: any) => {
    document.getElementById(`${brand._id}`)?.addEventListener("mouseover", () => {
      document.getElementById(`div${brand._id}`)?.setAttribute("style", "transform:scaleX(1);");
    });
    document.getElementById(`${brand._id}`)?.addEventListener("mouseout", () => {
      document.getElementById(`div${brand._id}`)?.setAttribute("style", "transform:scaleX(0);");
    });
    return (
      <li
        key={brand._id}
        id="brandChild"
        className="hidden px-5 py-3 bg-[#111111] border-x border-[#2a2a2a] hover:bg-[#1a1a1a] transition-colors"
      >
        <button
          id={`${brand._id}`}
          className="text-[#a3a3a3] hover:text-[#ff4d00] transition-colors text-sm tracking-wide uppercase font-normal"
          onClick={() => { window.location.href = `/brands/${brand._id}`; }}
        >
          {brand.name}
        </button>
        <div
          className="h-px w-[80%] scale-x-0 origin-left transition-transform duration-200 bg-[#ff4d00] mt-1"
          id={`div${brand._id}`}
        />
      </li>
    );
  });

  const CartIcon = () => (
    <svg className="w-7 h-7" fill="#a3a3a3" viewBox="0 0 902.86 902.86" xmlns="http://www.w3.org/2000/svg">
      <g>
        <path d="M671.504,577.829l110.485-432.609H902.86v-68H729.174L703.128,179.2L0,178.697l74.753,399.129h596.751V577.829z M685.766,247.188l-67.077,262.64H131.199L81.928,246.756L685.766,247.188z" />
        <path d="M578.418,825.641c59.961,0,108.743-48.783,108.743-108.744s-48.782-108.742-108.743-108.742H168.717c-59.961,0-108.744,48.781-108.744,108.742s48.782,108.744,108.744,108.744c59.962,0,108.743-48.783,108.743-108.744c0-14.4-2.821-28.152-7.927-40.742h208.069c-5.107,12.59-7.928,26.342-7.928,40.742C469.675,776.858,518.457,825.641,578.418,825.641z M209.46,716.897c0,22.467-18.277,40.744-40.743,40.744c-22.466,0-40.744-18.277-40.744-40.744c0-22.465,18.277-40.742,40.744-40.742C191.183,676.155,209.46,694.432,209.46,716.897z M619.162,716.897c0,22.467-18.277,40.744-40.743,40.744s-40.743-18.277-40.743-40.744c0-22.465,18.277-40.742,40.743-40.742S619.162,694.432,619.162,716.897z" />
      </g>
    </svg>
  );

  const UserIcon = () => (
    <svg className="w-7 h-7" viewBox="0 0 37 45" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M18.5 4.5C13.5913 4.5 9.612 8.52944 9.612 13.5C9.612 18.4706 13.5913 22.5 18.5 22.5C23.4087 22.5 27.388 18.4706 27.388 13.5C27.388 8.52944 23.4087 4.5 18.5 4.5ZM26.5903 24.2311C29.7766 21.7642 31.832 17.8752 31.832 13.5C31.832 6.04416 25.8631 0 18.5 0C11.1369 0 5.16801 6.04416 5.16801 13.5C5.16801 17.8752 7.22338 21.7642 10.4097 24.2311C8.17556 25.2319 6.12014 26.648 4.35929 28.4311C2.99958 29.8079 1.85577 31.3628 0.950149 33.0415C-0.721055 36.1393 -0.0395101 39.2979 1.84255 41.5313C3.65438 43.6815 6.55681 45 9.612 45H27.388C30.4432 45 33.3456 43.6815 35.1574 41.5314C37.0395 39.2979 37.7211 36.1393 36.0498 33.0415C35.1442 31.3628 34.0004 29.8079 32.6407 28.4311C30.8799 26.648 28.8244 25.2319 26.5903 24.2311ZM18.5 27C14.3748 27 10.4186 28.6594 7.50167 31.6131C6.44399 32.6841 5.55449 33.8933 4.85016 35.1988C4.16809 36.4632 4.38812 37.6195 5.22313 38.6104C6.12836 39.6847 7.7585 40.5 9.612 40.5H27.388C29.2415 40.5 30.8716 39.6847 31.7769 38.6104C32.6119 37.6195 32.8319 36.4632 32.1498 35.1988C31.4455 33.8933 30.556 32.6841 29.4983 31.6131C26.5814 28.6594 22.6252 27 18.5 27Z"
        fill="#a3a3a3"
      />
    </svg>
  );

  return (
    <>
      <header className="bg-[#0a0a0a] border-b border-[#1e1e1e] relative z-30">

        {/* ── Desktop nav ── */}
        <div className="hidden md:flex justify-evenly items-center h-16">
          <a href="/" className="text-[#a3a3a3] hover:text-white transition-colors tracking-widest text-sm uppercase font-normal">
            Home
          </a>

          <ul id="brandUL" className="relative">
            <li id="brandHead" className="cursor-default text-[#a3a3a3] hover:text-white transition-colors tracking-widest text-sm uppercase font-normal">
              Shop by Brand
            </li>
            <div id="brandDiv" className="brandDiv overflow-y-scroll absolute border border-[#2a2a2a] bg-[#111111] shadow-[0_8px_32px_rgba(0,0,0,0.8)] z-20 min-w-[180px]">
              {brandListItems}
            </div>
          </ul>

          <Image
            className="h-[12vh] w-auto object-contain"
            src={xbn}
            alt="XBN"
          />

          <ul id="catUL" className="relative">
            <li id="categoryHead" className="cursor-default text-[#a3a3a3] hover:text-white transition-colors tracking-widest text-sm uppercase font-normal">
              Shop by Category
            </li>
            <div id="categoryDiv" className="absolute catDiv border border-[#2a2a2a] bg-[#111111] shadow-[0_8px_32px_rgba(0,0,0,0.8)] z-20 min-w-[180px]">
              {categoryListItems}
            </div>
          </ul>

          <a href="/contact" className="text-[#a3a3a3] hover:text-white transition-colors tracking-widest text-sm uppercase font-normal">
            Contact Us
          </a>

          <div className="flex items-center gap-4">
            <button id="userMenu" onClick={() => document.getElementById("userClass")?.setAttribute("style", "transform:scale(1);")} className="hover:opacity-70 transition-opacity">
              <UserIcon />
            </button>
            <a className="cart-btn hidden hover:opacity-70 transition-opacity" href="/shoppingCart">
              <CartIcon />
            </a>
          </div>
        </div>

        {/* ── Mobile nav bar ── */}
        <div className="flex md:hidden items-center justify-between px-4 h-16">
          <a href="/">
            <Image className="h-10 w-auto object-contain" src={xbn} alt="XBN" />
          </a>

          <div className="flex items-center gap-4">
            <button id="userMenu" onClick={() => { document.getElementById("userClass")?.setAttribute("style", "transform:scale(1);"); setMobileOpen(false); }} className="hover:opacity-70 transition-opacity">
              <UserIcon />
            </button>
            <a className="cart-btn hidden hover:opacity-70 transition-opacity" href="/shoppingCart">
              <CartIcon />
            </a>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="text-[#a3a3a3] hover:text-white transition-colors p-1"
              aria-label="Toggle menu"
            >
              {mobileOpen ? (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              ) : (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* ── Mobile dropdown menu ── */}
        {mobileOpen && (
          <div className="md:hidden bg-[#111111] border-t border-[#2a2a2a] flex flex-col">
            <a href="/" className="px-6 py-4 text-[#a3a3a3] hover:text-white hover:bg-[#1a1a1a] transition-colors text-sm uppercase tracking-widest border-b border-[#2a2a2a]">
              Home
            </a>

            {/* Brands accordion */}
            <div className="border-b border-[#2a2a2a]">
              <button
                onClick={() => setMobileBrandsOpen(!mobileBrandsOpen)}
                className="w-full flex justify-between items-center px-6 py-4 text-[#a3a3a3] hover:text-white hover:bg-[#1a1a1a] transition-colors text-sm uppercase tracking-widest"
              >
                Shop by Brand
                <svg
                  className={`w-4 h-4 transition-transform duration-200 ${mobileBrandsOpen ? "rotate-180" : ""}`}
                  viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                >
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </button>
              {mobileBrandsOpen && (
                <div className="bg-[#0f0f0f] flex flex-col">
                  {(brands as any[]).map((brand: any) => (
                    <a
                      key={brand._id}
                      href={`/brands/${brand._id}`}
                      className="px-10 py-3 text-[#a3a3a3] hover:text-[#ff4d00] hover:bg-[#1a1a1a] transition-colors text-sm tracking-wide border-t border-[#1e1e1e]"
                    >
                      {brand.name}
                    </a>
                  ))}
                </div>
              )}
            </div>

            {/* Categories accordion */}
            <div className="border-b border-[#2a2a2a]">
              <button
                onClick={() => setMobileCatsOpen(!mobileCatsOpen)}
                className="w-full flex justify-between items-center px-6 py-4 text-[#a3a3a3] hover:text-white hover:bg-[#1a1a1a] transition-colors text-sm uppercase tracking-widest"
              >
                Shop by Category
                <svg
                  className={`w-4 h-4 transition-transform duration-200 ${mobileCatsOpen ? "rotate-180" : ""}`}
                  viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                >
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </button>
              {mobileCatsOpen && (
                <div className="bg-[#0f0f0f] flex flex-col">
                  {(categories as any[]).map((cat: any) => (
                    <a
                      key={cat._id}
                      href={`/category/${cat._id}`}
                      className="px-10 py-3 text-[#a3a3a3] hover:text-[#ff4d00] hover:bg-[#1a1a1a] transition-colors text-sm tracking-wide border-t border-[#1e1e1e]"
                    >
                      {cat.type}
                    </a>
                  ))}
                </div>
              )}
            </div>

            <a href="/contact" className="px-6 py-4 text-[#a3a3a3] hover:text-white hover:bg-[#1a1a1a] transition-colors text-sm uppercase tracking-widest">
              Contact Us
            </a>
          </div>
        )}

        <div className="absolute top-[1%] 2xl:left-[80.25%] xl:left-[73%] md:left-[62%] lg:left-[70%] max-[640px]:left-[35%] h-[100vh]">
          <UserMenu />
        </div>
      </header>

      {/* Login Modal */}
      <form
        id="loginForm"
        className="flex invisible flex-col fixed z-[50] text-white font-sans bg-[#111111] border border-[#2a2a2a] text-base h-auto w-[360px] top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] rounded-xl p-8 gap-5"
        onSubmit={handleSubmit(submitForm)}
      >
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-xl font-semibold tracking-wide">Sign In</h2>
          <button
            type="button"
            id="userMenuExit"
            className="text-[#525252] hover:text-white transition-colors text-xl leading-none"
            onClick={() => {
              document.querySelector("main")?.setAttribute("style", "filter: blur(0px)");
              document.querySelector("header")?.setAttribute("style", "filter: blur(0px)");
              document.getElementById("loginForm")?.setAttribute("style", "visibility:hidden;");
            }}
          >
            ✕
          </button>
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-[#a3a3a3] text-sm uppercase tracking-wider" htmlFor="email">Email</label>
          <input
            type="text"
            className="bg-[#1a1a1a] border border-[#2a2a2a] focus:border-[#ff4d00] outline-none text-white rounded-lg px-4 py-2.5 text-sm transition-colors"
            {...register("username")}
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-[#a3a3a3] text-sm uppercase tracking-wider" htmlFor="password">Password</label>
          <input
            className="bg-[#1a1a1a] border border-[#2a2a2a] focus:border-[#ff4d00] outline-none text-white rounded-lg px-4 py-2.5 text-sm transition-colors"
            type="password"
            {...register("password")}
          />
        </div>

        <button
          type="button"
          onClick={() => { window.location.href = "/identify"; }}
          className="self-start text-[#525252] hover:text-[#ff4d00] text-xs transition-colors"
        >
          Forgot Password?
        </button>

        <button
          className="bg-[#ff4d00] hover:bg-[#ff6b2b] text-white font-semibold py-3 rounded-lg transition-colors tracking-wide"
          type="submit"
        >
          Sign In
        </button>

        <button
          type="button"
          onClick={() => { window.location.href = "/signup"; }}
          className="border border-[#2a2a2a] hover:border-[#ff4d00] text-[#a3a3a3] hover:text-white font-medium py-3 rounded-lg transition-colors tracking-wide"
        >
          Create Account
        </button>
      </form>
    </>
  );
}
