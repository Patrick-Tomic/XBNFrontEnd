/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
"use client";
import React, { useEffect, useState } from "react";
import "../style.scss";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import Header from "@/components/header";
export default function Signup() {
  useEffect(() => {
    document.getElementById("brandHead")?.addEventListener("mouseover", () => {
      document.querySelectorAll("#brandChild").forEach((child) => {
        child.setAttribute("style", "display:block;");
      });
    });

    document
      .getElementById("categoryHead")
      ?.addEventListener("mouseover", () => {
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
  });
  const [errMessage, setErrMessage] = useState("");
  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required("Enter first Name").min(2),
    lastName: Yup.string().required("Enter Last Name").min(2),
    email: Yup.string().required("Enter email").min(7),
    password: Yup.string()
      .required("Your password must be six characters long")
      .min(6),
    confirmPassword: Yup.string()
      .required("Please fill out the password portion")
      .oneOf([Yup.ref("password")], "Password does not match"),
  });
  const formOptions = { resolver: yupResolver(validationSchema) };
  const { register, handleSubmit, reset, formState } = useForm(formOptions);
  const { errors } = formState;

  const submitForm = async (data: any) => {
    const formData = JSON.stringify(data);
    try {
      const req = await fetch(`${process.env.NEXT_PUBLIC_backend_Link}signup`, {
        method: "POST",
        body: formData,
        headers: {
          "Content-Type": "application/json",
        },
      });
      const file = await req.json();
      if (req.status !== 200) {
        setErrMessage(file.errors[0]);
        console.log(file.message);
        return;
      }
      reset();
      console.log(file.message);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Header />
      <main className="m-10 h-[80vh] flex justify-center items-center">
        <form
          className="signup border-2 w-[60%] h-[100%] border-black border-solid"
          onSubmit={handleSubmit(submitForm)}
        >
          <div>
            <label htmlFor="firstName">First Name:</label>
            <input
              type="text"
              /* name="username" */ id="firstName"
              {...register("firstName")}
            />
          </div>
          <div>
            <label htmlFor="lastName">Last Name:</label>
            <input
              type="text"
              /* name="username" */ id="lastName"
              {...register("lastName")}
            />
          </div>
          <div className="ml-28">
            <label htmlFor="email">Email:</label>
            <input
              type="text"
              /* name="username" */ id="email"
              {...register("email")}
            />
          </div>
          <div className="ml-4">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              /* name="password" */ id=""
              {...register("password")}
            />
          </div>
          <div className="mr-44">
            <label htmlFor="confirm-password">Confirm Password:</label>
            <input
              type="password"
              /* name="confirmPassword" */ id=""
              {...register("confirmPassword")}
            />
          </div>
          <button type="submit">Submit</button>
        </form>
      </main>
    </>
  );
}
