"use client";
import { headers } from "next/headers";
import { useEffect } from "react";

export default function Success() {
 
  const bodyData = JSON.stringify({
    id:localStorage.getItem("id"),
    cart: "success",
  })
  useEffect(() => {
    const fetchCart = async () => {
      const headers = { "Content-Type": "application/json" };
      const updateUser = await fetch(
        `${process.env.NEXT_PUBLIC_backend_Link}update`,
        {
         /*  mode:'no-cors', */
          method: "POST",
          headers: headers,
          body: bodyData,
        },
      );
      const user = await updateUser.json();
      alert("Payment Successful");
    };
    fetchCart();
    const ship = async () => {
      
      console.log(id)
      const headers = { "Content-Type": "application/json" };
      const shipped = await fetch(
        `${process.env.NEXT_PUBLIC_backend_Link}shipping`, 
        {
          method: "POST",
         /*  mode:'no-cors', */
          headers: headers,
          body: bodyData,
        },
       
      );
      const update = await shipped.json()
      console.log(update)
    };
    ship();
  });
  return (
    <div>
      <h1>Payment Successful</h1>
    </div>
  );
}
