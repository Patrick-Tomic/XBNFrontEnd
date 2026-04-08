/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
"use client";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import Header from "@/components/header";

export default function Signup() {
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
  });

  const [errMessage, setErrMessage] = useState("");
  const [success, setSuccess] = useState(false);

  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required("Enter first name").min(2),
    lastName: Yup.string().required("Enter last name").min(2),
    email: Yup.string().required("Enter email").min(7),
    password: Yup.string().required("Password must be at least 6 characters").min(6),
    confirmPassword: Yup.string()
      .required("Please confirm your password")
      .oneOf([Yup.ref("password")], "Passwords do not match"),
  });
  const { register, handleSubmit, reset, formState } = useForm({ resolver: yupResolver(validationSchema) });
  const { errors } = formState;

  const submitForm = async (data: any) => {
    try {
      const req = await fetch(`${process.env.NEXT_PUBLIC_backend_Link}signup`, {
        method: "POST",
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" },
      });
      const file = await req.json();
      if (req.status !== 200) {
        setErrMessage(file.errors[0]);
        return;
      }
      reset();
      setSuccess(true);
    } catch (err) {
      console.log(err);
    }
  };

  const fields = [
    { id: "firstName", label: "First Name", type: "text", key: "firstName" },
    { id: "lastName", label: "Last Name", type: "text", key: "lastName" },
    { id: "email", label: "Email", type: "text", key: "email" },
    { id: "password", label: "Password", type: "password", key: "password" },
    { id: "confirmPassword", label: "Confirm Password", type: "password", key: "confirmPassword" },
  ] as const;

  return (
    <>
      <Header />
      <main className="bg-[#0a0a0a] min-h-screen flex items-center justify-center px-4 py-16">
        <div className="w-full max-w-[480px] bg-[#111111] border border-[#2a2a2a] rounded-2xl p-10 shadow-[0_8px_40px_rgba(0,0,0,0.6)]">
          <div className="mb-8">
            <h1 className="text-white text-3xl font-bold tracking-wide">Create Account</h1>
            <p className="text-[#525252] text-sm mt-2">Join Xtreme Body Nutrition</p>
          </div>

          {success && (
            <div className="mb-6 bg-[#1a2a1a] border border-[#22c55e] rounded-lg px-4 py-3 text-[#22c55e] text-sm">
              Account created successfully! You can now log in.
            </div>
          )}

          {errMessage && (
            <div className="mb-6 bg-[#2a1a1a] border border-red-500 rounded-lg px-4 py-3 text-red-400 text-sm">
              {errMessage}
            </div>
          )}

          <form className="flex flex-col gap-5" onSubmit={handleSubmit(submitForm)}>
            {fields.map(({ id, label, type, key }) => (
              <div key={id} className="flex flex-col gap-1.5">
                <label htmlFor={id} className="text-[#a3a3a3] text-xs uppercase tracking-widest font-medium">
                  {label}
                </label>
                <input
                  id={id}
                  type={type}
                  {...register(key)}
                  className="bg-[#1a1a1a] border border-[#2a2a2a] focus:border-[#ff4d00] outline-none text-white rounded-lg px-4 py-3 text-sm transition-colors"
                />
                {errors[key] && (
                  <p className="text-red-400 text-xs">{errors[key]?.message}</p>
                )}
              </div>
            ))}

            <button
              type="submit"
              className="w-full py-4 bg-[#ff4d00] hover:bg-[#ff6b2b] text-white font-bold rounded-xl text-base tracking-wide transition-colors mt-2"
            >
              Create Account
            </button>

            <p className="text-center text-[#525252] text-sm">
              Already have an account?{" "}
              <button
                type="button"
                className="text-[#ff4d00] hover:text-[#ff6b2b] transition-colors"
                onClick={() => {
                  document.getElementById("login")?.click();
                }}
              >
                Sign in
              </button>
            </p>
          </form>
        </div>
      </main>
    </>
  );
}
