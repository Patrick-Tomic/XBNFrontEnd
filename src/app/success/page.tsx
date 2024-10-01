"use client";
import { headers } from "next/headers";
import { useEffect } from "react";

export default function Success() {
  useEffect(() => {
    const fetchCart = async () => {
      const headers = { "Content-Type": "application/json" };
      const updateUser = await fetch(
        `${process.env.NEXT_PUBLIC_backend_Link}update`,
        {
          method: "POST",
          headers: headers,
          body: JSON.stringify({
            id: localStorage.getItem("id"),
            cart: "success",
          }),
        },
      );
      const user = await updateUser.json();
      alert("Payment Successful");
    };
    fetchCart();
    const ship = async () => {
      const headers = { "Content-Type": "application/json" };
      const shipped = await fetch(
        `${process.env.NEXT_PUBLIC_backend_Link}shipping`,
        {
          method: "POST",
          headers: headers,
          body: JSON.stringify({ id: localStorage.getItem("id") }),
        },
      );
    };
    ship();
  });
  return (
    <div>
      <h1>Payment Successful</h1>
    </div>
  );
}
