/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
"use client";
import Footer from "@/components/footer";
import aminos from "/public/aminoShelf.png";
import supps from "/public/suppShelf.png";
import pre from "/public/preShelf.png";
import Image from "next/image";
import Header from "@/components/header";
import xbn from "/public/xbnLogoB.png";
import imgA from "/public/imgA.png";
import imgB from "/public/imgB.png";
import imgC from "/public/imgC.png";
import imgD from "/public/imgD.png";
import imgE from "/public/imgE.jpg";
import imgF from "/public/imgF.jpg";
import imgG from "/public/imgG.jpg";
import { useEffect, useState } from "react";
import React from "react";

export default function Home() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    document.getElementById("brandHead")?.addEventListener("mouseover", () => {
      document.querySelectorAll("#brandChild").forEach((child) => {
        child.setAttribute("style", "display:block;");
      });
    });
    document.getElementById("categoryHead")?.addEventListener("mouseover", () => {
      document.querySelectorAll("#categoryChild").forEach((child) => {
        child.setAttribute("style", "display:block");
      });
    });
    document.getElementById("catUL")?.addEventListener("mouseleave", () => {
      document.querySelectorAll("#categoryChild").forEach((child) => {
        child.setAttribute("style", "display:hidden");
      });
    });
    document.getElementById("brandUL")?.addEventListener("mouseleave", () => {
      document.querySelectorAll("#brandChild").forEach((child) => {
        child.setAttribute("style", "display:hidden");
      });
    });

    setTimeout(() => {
      const slides = ["slideA","slideB","slideC","slideD","slideE","slideF","slideG","slideH","slideI","slideJ"];
      const show = (cls: string) => document.querySelector(`.${cls}`)?.setAttribute("style","opacity:1; visibility:visible; transition: 0.5s linear 0.5s");
      const hide = (cls: string) => document.querySelector(`.${cls}`)?.setAttribute("style","opacity:0; visibility:hidden; transition: 0.5s linear");

      const sequence: [string, string][] = [
        ["slideA","slideB"],["slideB","slideC"],["slideC","slideD"],["slideD","slideE"],
        ["slideE","slideF"],["slideF","slideG"],["slideG","slideA"],["slideG","slideH"],
        ["slideH","slideI"],["slideI","slideJ"],["slideJ","slideA"],
      ];

      if (count < sequence.length) {
        hide(sequence[count][0]);
        show(sequence[count][1]);
      }

      const num = count === 10 ? 0 : count + 1;
      setCount(num);
    }, 5000);
  });

  return (
    <>
      <Header />

      <main className="bg-[#0a0a0a] m-0 p-0 flex flex-col">
        {/* ── Hero Slider ── */}
        <section
          id="imageSlider"
          className="w-screen border-b border-[#1e1e1e] overflow-hidden"
          style={{ height: "100vh" }}
        >
          <div
            id="wrap"
            className="relative w-full h-full"
          >
            {[
              { cls: "slideA", src: pre, alt: "pre" },
              { cls: "slideB", src: imgC, alt: "aminos" },
              { cls: "slideC", src: supps, alt: "supps" },
              { cls: "slideD", src: imgA, alt: "imgA" },
              { cls: "slideE", src: imgB, alt: "imgB" },
              { cls: "slideF invisible", src: aminos, alt: "imgC" },
              { cls: "slideG", src: imgD, alt: "imgD" },
              { cls: "slideH", src: imgE, alt: "imgE" },
              { cls: "slideI", src: imgF, alt: "imgF" },
              { cls: "slideJ", src: imgG, alt: "imgG" },
            ].map(({ cls, src, alt }) => (
              <Image
                key={cls}
                className={`${cls} absolute inset-0 w-full h-full object-cover`}
                alt={alt}
                src={src}
                fill
                sizes="100vw"
                style={{ objectFit: "cover" }}
              />
            ))}
          </div>
        </section>

        {/* ── Content Row ── */}
        <section className="flex flex-col xl:flex-row gap-12 px-[5vw] py-16">
          {/* Video */}
          <div className="flex-1 flex justify-center">
            <video
              className="rounded-xl w-full max-w-[500px] h-auto border border-[#1e1e1e] shadow-[0_8px_40px_rgba(0,0,0,0.6)]"
              controls
            >
              <source src="homeVid.mp4" type="video/mp4" />
            </video>
          </div>

          {/* Our Promise */}
          <div
            id="homeDescription"
            className="flex-1 flex flex-col items-center gap-6 max-w-[500px] mx-auto"
          >
            <Image className="w-[140px] h-auto object-contain opacity-80" src={xbn} alt="XBN" />

            <div className="bg-[#111111] border border-[#2a2a2a] rounded-xl p-8 flex flex-col gap-4 shadow-[0_4px_24px_rgba(0,0,0,0.6)]">
              <div className="flex items-center gap-3">
                <div className="h-px flex-1 bg-[#ff4d00] opacity-40" />
                <h1 className="text-[#ff4d00] font-bebas tracking-[0.2em] text-2xl uppercase">
                  Our Promise
                </h1>
                <div className="h-px flex-1 bg-[#ff4d00] opacity-40" />
              </div>
              <p className="text-[#a3a3a3] text-base leading-relaxed">
                Our mission at Xtreme Body Nutrition is to develop an
                individualized supplement stack that fits your lifestyle, fitness
                goals, and training style to help you reach your goals! We pride
                ourselves on always bringing in high-quality products, and
                providing helpful employee knowledge which created the fantastic
                customer retention over the years.
              </p>
              <p className="text-[#a3a3a3] text-base leading-relaxed">
                We want to be a resource for you. Come in and chat with us today
                and make your health and fitness dream a reality!
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
