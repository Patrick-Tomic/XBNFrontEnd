"use client";
import { useEffect } from "react";
import Header from "@/components/header";
import Footer from "@/components/footer";

export default function Success() {
  useEffect(() => {
    const bodyData = JSON.stringify({ id: localStorage.getItem("id"), cart: "success" });

    const fetchCart = async () => {
      await fetch(`${process.env.NEXT_PUBLIC_backend_Link}update`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: bodyData,
      });
    };
    fetchCart();

    const ship = async () => {
      await fetch(`${process.env.NEXT_PUBLIC_backend_Link}shipping`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: bodyData,
      });
    };
    ship();
  });

  return (
    <>
      <Header />
      <main className="bg-[#0a0a0a] min-h-screen flex items-center justify-center px-4">
        <div className="bg-[#111111] border border-[#2a2a2a] rounded-2xl p-12 max-w-[480px] w-full text-center shadow-[0_8px_40px_rgba(0,0,0,0.6)]">
          <div className="w-16 h-16 rounded-full bg-[#1a2a1a] border border-[#22c55e] flex items-center justify-center mx-auto mb-6">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M5 13L9 17L19 7" stroke="#22c55e" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <h1 className="text-white text-3xl font-bold mb-3">Payment Successful</h1>
          <p className="text-[#a3a3a3] text-sm mb-8">
            Thank you for your order! You'll receive a confirmation email shortly.
          </p>
          <a
            href="/"
            className="inline-block bg-[#ff4d00] hover:bg-[#ff6b2b] text-white font-bold px-8 py-3 rounded-xl transition-colors tracking-wide text-sm"
          >
            Continue Shopping
          </a>
        </div>
      </main>
      <Footer />
    </>
  );
}
