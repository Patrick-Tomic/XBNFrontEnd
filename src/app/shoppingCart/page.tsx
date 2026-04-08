"use client";
import Header from "@/components/header";
import { useState, useEffect } from "react";
import Footer from "@/components/footer";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loadStripe } from "@stripe/stripe-js";
import React from "react";

export default function ShoppingCartPage() {
  type item = {
    name: string;
    price: number;
    quantity: number;
    image: Array<string>;
    flavor: string;
    brand: string | null;
  };

  const [cart, setCart] = useState({ items: [], price: 0 });
  const { register, handleSubmit } = useForm({ resolver: yupResolver(Yup.object().shape({})) });

  const submitForm = async (data: any) => {
    const id = localStorage.getItem("id");
    try {
      await fetch(`${process.env.NEXT_PUBLIC_backend_Link}updateCart`, {
        method: "POST",
        body: JSON.stringify({ id, cart }),
        headers: { "Content-Type": "application/json" },
      });
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  const makePayment = async () => {
    const stripe = await loadStripe(`${process.env.NEXT_PUBLIC_stripeKey}`);
    const response = await fetch(`${process.env.NEXT_PUBLIC_backend_Link}checkout`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ products: cart.items }),
    });
    const session = await response.json();
    window.location.href = session.url;
  };

  useEffect(() => {
    (async () => {
      const id = localStorage.getItem("id");
      const user = await fetch(`${process.env.NEXT_PUBLIC_backend_Link}cart/${id}`);
      const data = await user.json();
      setCart(data.cart.cart);
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

  let index = -1;
  const items: any = cart.items.map((item: any) => {
    index++;
    const id = index;
    return (
      <div
        key={id}
        className="flex items-center gap-4 py-5 border-b border-[#1e1e1e] last:border-0"
      >
        <img className="w-16 h-16 object-contain rounded-lg bg-[#1a1a1a] p-1" src={item.images[0]} alt={item.name} />
        <div className="flex-1 min-w-0">
          <h3 className="text-white font-semibold text-sm truncate">{item.product}</h3>
          {item.flavor && <p className="text-[#a3a3a3] text-xs mt-0.5">{item.flavor}</p>}
        </div>
        <p className="text-white font-bold w-20 text-right">${item.price.toFixed(2)}</p>
        <form onClick={handleSubmit(submitForm)} className="flex items-center gap-3">
          <select
            id={`${id}`}
            onChange={() => {
              const obj: any = cart.items;
              const amount = document.getElementById(`${id}`) as HTMLSelectElement;
              let cartPrice = cart.price;
              if (obj[id].amount === amount.value) return;
              if (obj[id].amount > amount.value) {
                const diff = obj[id].amount - parseInt(amount.value);
                obj[id].total = obj[id].total - obj[id].price * diff;
                obj[id].amount = amount.value;
                cartPrice -= obj[id].price * diff;
              } else {
                const diff = parseInt(amount.value) - obj[id].amount;
                obj[id].amount = amount.value;
                obj[id].total = obj[id].total + obj[id].price * diff;
                cartPrice += obj[id].price * diff;
              }
              setCart({ items: obj, price: cartPrice });
              handleSubmit(submitForm);
            }}
            className="bg-[#1a1a1a] border border-[#2a2a2a] text-white rounded-lg px-3 py-1.5 text-sm outline-none focus:border-[#ff4d00]"
            defaultValue={item.amount}
          >
            {[1,2,3,4,5].map((n) => <option key={n} value={n}>{n}</option>)}
          </select>

          <button
            type="button"
            className="text-[#525252] hover:text-red-400 transition-colors text-sm"
            onClick={() => {
              const obj: any = cart.items;
              if (obj.length === 1) {
                cart.items = [];
                cart.price = 0;
                handleSubmit(submitForm);
                return;
              }
              cart.price -= obj[id].price * obj[id].stock;
              cart.items = obj.filter((_: any, i: number) => i !== id);
              handleSubmit(submitForm);
            }}
          >
            Remove
          </button>
        </form>
      </div>
    );
  });

  const tax = cart.price * 0.06;
  const total = cart.price + tax;

  return (
    <>
      <Header />
      <main className="bg-[#0a0a0a] min-h-screen px-[5vw] py-12 flex flex-col lg:flex-row gap-8">
        {/* Cart Items */}
        <div className="flex-1 bg-[#111111] border border-[#2a2a2a] rounded-2xl p-8">
          <h1 className="text-white font-bold text-2xl mb-6 tracking-wide">Shopping Cart</h1>

          {cart.items.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 gap-4">
              <p className="text-[#525252] text-lg">Your cart is empty</p>
              <a href="/" className="text-[#ff4d00] hover:text-[#ff6b2b] text-sm underline transition-colors">
                Continue Shopping
              </a>
            </div>
          ) : (
            <form onSubmit={handleSubmit(submitForm)}>
              {items}
            </form>
          )}
        </div>

        {/* Order Summary */}
        <div className="lg:w-[320px] flex flex-col gap-4">
          <div className="bg-[#111111] border border-[#2a2a2a] rounded-2xl p-8 flex flex-col gap-4">
            <h2 className="text-white font-bold text-lg mb-2">Order Summary</h2>

            <div className="flex justify-between text-sm">
              <span className="text-[#a3a3a3]">Subtotal</span>
              <span className="text-white font-medium">${cart.price.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-[#a3a3a3]">Sales Tax (6%)</span>
              <span className="text-white font-medium">${tax.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-[#a3a3a3]">Shipping</span>
              <span className="text-[#22c55e] font-medium">Free</span>
            </div>

            <div className="border-t border-[#2a2a2a] pt-4 flex justify-between">
              <span className="text-white font-bold">Total</span>
              <span className="text-[#ff4d00] font-bold text-xl">${total.toFixed(2)}</span>
            </div>

            <button
              onClick={makePayment}
              type="button"
              className="w-full py-4 bg-[#ff4d00] hover:bg-[#ff6b2b] text-white font-bold rounded-xl text-base tracking-wide transition-colors mt-2"
            >
              Checkout
            </button>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
