"use client";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import Header from "@/components/header";
import BillingDetails from "@/components/billingInfo";
import React from "react";

export default function UserPage() {
  const [errMessage, setErrMessage] = useState("");
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    address: [],
    payment: [],
    purchaseHistory: [],
    cart: {},
  });

  const { register, handleSubmit } = useForm({
    resolver: yupResolver(
      Yup.object().shape({
        email: Yup.string(),
        password: Yup.string(),
        newPassword: Yup.string(),
        payment: Yup.array(),
        purchaseHistory: Yup.array(),
      }),
    ),
  });

  const submitFormA1 = async (data: any) => {
    const id = localStorage.getItem("id");
    try {
      const req = await fetch(`${process.env.NEXT_PUBLIC_backend_Link}verify`, {
        method: "POST",
        body: JSON.stringify({ id, password: data.password }),
        headers: { "Content-Type": "application/json" },
      });
      const file = await req.json();
      if (!file.bool) {
        setErrMessage("Incorrect password");
      } else {
        document.getElementById("userInfoForm")?.setAttribute("style", "display:none");
        document.getElementById("updatePassword")?.setAttribute("style", "display:flex; flex-direction:column");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const submitFormA2 = async (data: any) => {
    const id = localStorage.getItem("id");
    try {
      await fetch(`${process.env.NEXT_PUBLIC_backend_Link}update`, {
        method: "POST",
        body: JSON.stringify({ id, password: data.newPassword, user }),
        headers: { "Content-Type": "application/json" },
      });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    (async () => {
      const id = localStorage.getItem("id");
      const res = await fetch(`${process.env.NEXT_PUBLIC_backend_Link}user/${id}`);
      const data = await res.json();
      setUser(data.user);
    })();

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

  const purchaseHistory = user.purchaseHistory.map((purchase: any, pi: number) => {
    const objects = purchase.items.map((item: any, ii: number) => (
      <div key={ii} className="flex justify-between items-center py-3 border-b border-[#1e1e1e] last:border-0 gap-4">
        <img className="w-14 h-14 object-contain rounded-lg bg-[#1a1a1a] p-1" src={item.images[0]} alt="" />
        <p className="flex-1 text-white text-sm font-medium">{item.product}</p>
        <p className="text-[#a3a3a3] text-sm">{item.brand}</p>
        <p className="text-[#ff4d00] font-bold">${item.price * item.stock}</p>
      </div>
    ));
    return (
      <div key={pi} className="bg-[#111111] border border-[#2a2a2a] rounded-xl p-6 mb-4">
        {objects}
      </div>
    );
  });

  const inputClass = "bg-[#1a1a1a] border border-[#2a2a2a] focus:border-[#ff4d00] outline-none text-white rounded-lg px-4 py-3 text-sm transition-colors";
  const labelClass = "text-[#a3a3a3] text-xs uppercase tracking-widest font-medium mb-1";
  const btnPrimary = "px-5 py-2.5 bg-[#ff4d00] hover:bg-[#ff6b2b] text-white font-semibold rounded-lg transition-colors text-sm";
  const btnSecondary = "px-5 py-2.5 bg-[#1a1a1a] border border-[#2a2a2a] hover:border-[#ff4d00] text-[#a3a3a3] hover:text-white font-medium rounded-lg transition-all text-sm";

  const navLinks = [
    { href: "#UpdatePasswordDiv", label: "Account" },
    { href: "#purchase", label: "Purchase History" },
    { href: "#billing", label: "Billing" },
  ];

  return (
    <>
      <Header />
      <main className="bg-[#0a0a0a] min-h-screen flex">
        {/* Sidebar */}
        <aside className="w-[240px] bg-[#0f0f0f] border-r border-[#1e1e1e] p-8 flex flex-col gap-8 flex-shrink-0">
          <div>
            <p className="text-xs uppercase tracking-widest text-[#525252] font-semibold mb-4">Account</p>
            <div className="flex flex-col gap-1">
              {navLinks.map(({ href, label }) => (
                <a
                  key={href}
                  href={href}
                  className="text-[#a3a3a3] hover:text-white transition-colors text-sm py-2 tracking-wide"
                >
                  {label}
                </a>
              ))}
            </div>
          </div>
        </aside>

        {/* Content */}
        <div className="flex-1 p-10 flex flex-col gap-10 overflow-y-auto" id="settingContent">
          {/* Password Section */}
          <section id="UpdatePasswordDiv" className="bg-[#111111] border border-[#2a2a2a] rounded-2xl p-8">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h1 className="text-white text-2xl font-bold">Hello, {user.firstName}</h1>
                <p className="text-[#525252] text-sm mt-1">Manage your account settings</p>
              </div>
              <button
                id="updateBtn"
                className={btnPrimary}
                onClick={() => {
                  document.getElementById("updateBtn")?.setAttribute("style", "display:none");
                  document.getElementById("passwordResetConfirm")?.setAttribute("style", "display:block");
                  document.getElementById("password")?.removeAttribute("readOnly");
                }}
              >
                Update Password
              </button>
            </div>

            {errMessage && (
              <div className="mb-4 bg-[#2a1a1a] border border-red-500 rounded-lg px-4 py-3 text-red-400 text-sm">
                {errMessage}
              </div>
            )}

            <form onSubmit={handleSubmit(submitFormA1)} className="flex flex-col gap-4" id="userInfoForm">
              <div className="flex flex-col gap-1">
                <label className={labelClass}>Email</label>
                <input type="email" className={inputClass} {...register("email")} value={user.email} readOnly />
              </div>
              <div className="flex flex-col gap-1">
                <label className={labelClass}>Current Password</label>
                <input type="password" className={inputClass} {...register("password")} id="password" readOnly />
              </div>
              <button
                className={`hidden ${btnSecondary} self-start`}
                type="submit"
                id="passwordResetConfirm"
              >
                Verify
              </button>
            </form>

            <form onSubmit={handleSubmit(submitFormA2)} id="updatePassword" className="hidden flex-col gap-4 mt-4">
              <div className="flex flex-col gap-1">
                <label className={labelClass}>New Password</label>
                <input type="password" className={inputClass} {...register("newPassword")} id="newPassword" />
              </div>
              <button className={`hidden ${btnPrimary} self-start`} type="submit" id="resetPasswordSubmit">
                Save Password
              </button>
            </form>
          </section>

          {/* Billing */}
          <section id="billing">
            <BillingDetails user={user.address} />
          </section>

          {/* Purchase History */}
          <section id="purchase">
            <h2 className="text-white text-xl font-bold mb-4 tracking-wide">Purchase History</h2>
            {purchaseHistory.length > 0 ? purchaseHistory : (
              <p className="text-[#525252] text-sm">No purchases yet.</p>
            )}
          </section>
        </div>
      </main>
    </>
  );
}
