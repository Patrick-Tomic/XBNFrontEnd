'use client';
import Header from "@/components/header";
import Footer from "@/components/footer";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import * as Yup from 'yup';

export default function Contact() {
  const [sent, setSent] = useState(false);

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
  }, []);

  const validationSchema = Yup.object().shape({
    email: Yup.string().required(),
    header: Yup.string().required(),
    message: Yup.string().required(),
  });
  const { register, handleSubmit, reset } = useForm({ resolver: yupResolver(validationSchema) });

  const submitForm = async (data: any) => {
    try {
      await fetch(`${process.env.NEXT_PUBLIC_backend_Link}contact`, {
        method: "POST",
        body: JSON.stringify({ header: data.header, email: data.email, message: data.message }),
        headers: { "Content-Type": "application/json" },
      });
      reset();
      setSent(true);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Header />
      <main className="bg-[#0a0a0a] min-h-screen flex items-center justify-center px-4 py-16">
        <div className="w-full max-w-[560px] bg-[#111111] border border-[#2a2a2a] rounded-2xl p-10 shadow-[0_8px_40px_rgba(0,0,0,0.6)]">
          <div className="mb-8">
            <h1 className="text-white text-3xl font-bold tracking-wide">Contact Us</h1>
            <p className="text-[#525252] text-sm mt-2">We typically respond within 24 hours</p>
          </div>

          {sent && (
            <div className="mb-6 bg-[#1a2a1a] border border-[#22c55e] rounded-lg px-4 py-3 text-[#22c55e] text-sm">
              Message sent! We'll get back to you soon.
            </div>
          )}

          <form className="flex flex-col gap-5" onSubmit={handleSubmit(submitForm)}>
            <div className="flex flex-col gap-1.5">
              <label htmlFor="email" className="text-[#a3a3a3] text-xs uppercase tracking-widest font-medium">
                Email
              </label>
              <input
                id="email"
                type="email"
                {...register("email")}
                className="bg-[#1a1a1a] border border-[#2a2a2a] focus:border-[#ff4d00] outline-none text-white rounded-lg px-4 py-3 text-sm transition-colors"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="header" className="text-[#a3a3a3] text-xs uppercase tracking-widest font-medium">
                Subject
              </label>
              <input
                id="header"
                type="text"
                {...register("header")}
                className="bg-[#1a1a1a] border border-[#2a2a2a] focus:border-[#ff4d00] outline-none text-white rounded-lg px-4 py-3 text-sm transition-colors"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="message" className="text-[#a3a3a3] text-xs uppercase tracking-widest font-medium">
                Message
              </label>
              <textarea
                id="message"
                rows={6}
                {...register("message")}
                className="bg-[#1a1a1a] border border-[#2a2a2a] focus:border-[#ff4d00] outline-none text-white rounded-lg px-4 py-3 text-sm transition-colors resize-none"
              />
            </div>

            <button
              type="submit"
              className="w-full py-4 bg-[#ff4d00] hover:bg-[#ff6b2b] text-white font-bold rounded-xl text-base tracking-wide transition-colors mt-2"
            >
              Send Message
            </button>
          </form>
        </div>
      </main>
      <Footer />
    </>
  );
}
