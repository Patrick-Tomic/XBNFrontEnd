/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-floating-promises */
"use client";
import Footer from "@/components/footer";
import Header from "@/components/header";
import React from "react";
import { useEffect, useState } from "react";

export default function brandPage(req: { params: { id: any } }) {
  const [items, setItems] = useState([]);

  useEffect(() => {
    document.getElementById("brandHead")?.addEventListener("mouseover", () => {
      document.querySelectorAll("#brandChild").forEach((c) => c.setAttribute("style", "display:block;"));
    });
    document.getElementById("categoryHead")?.addEventListener("mouseover", () => {
      document.querySelectorAll("#categoryChild").forEach((c) => c.setAttribute("style", "display:block"));
    });
    document.getElementById("catUL")?.addEventListener("mouseleave", () => {
      document.querySelectorAll("#categoryChild").forEach((c) => c.setAttribute("style", "display:hidden"));
    });
    document.getElementById("brandUL")?.addEventListener("mouseleave", () => {
      document.querySelectorAll("#brandChild").forEach((c) => c.setAttribute("style", "display:hidden"));
    });

    (async () => {
      const brandItems = await fetch(
        `${process.env.NEXT_PUBLIC_backend_Link}brand/${req.params.id}`,
      );
      const data = await brandItems.json();
      setItems(data.items);
    })();
  }, []);

  const cards = items.map((item: any) => (
    <a key={item.product} href={`/item/${item._id}`} className="group">
      <div className="bg-[#111111] border border-[#2a2a2a] rounded-xl p-5 flex flex-col items-center gap-4 hover:border-[#ff4d00] transition-all duration-200 shadow-[0_2px_12px_rgba(0,0,0,0.4)] hover:shadow-[0_4px_24px_rgba(255,77,0,0.15)]">
        <img
          className="h-[180px] w-auto object-contain group-hover:scale-105 transition-transform duration-300"
          src={item.images[0]}
          alt={item.product}
        />
        <div className="w-full text-center border-t border-[#2a2a2a] pt-4">
          <h2 className="text-white font-semibold text-base leading-snug">{item.product}</h2>
          <p className="text-[#ff4d00] font-bold text-lg mt-1">${item.price}</p>
        </div>
      </div>
    </a>
  ));

  return (
    <>
      <Header />
      <main className="bg-[#0a0a0a] min-h-screen px-[5vw] py-12">
        <div className="grid gap-6 grid-cols-2 md:grid-cols-3 2xl:grid-cols-4">
          {cards}
        </div>
      </main>
      <Footer />
    </>
  );
}
