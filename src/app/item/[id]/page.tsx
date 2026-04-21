/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
"use client";
import Footer from "@/components/footer";
import Header from "@/components/header";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import React from "react";

export default function itemDetail(req: { params: { id: any } }) {
  const [product, setProduct] = useState({
    product: "",
    summary: "",
    price: 0,
    images: [] as string[],
    flavors: [] as string[],
    brand: { name: "" },
  });
  const itemID = req.params.id;

  const validationSchema = Yup.object().shape({
    amount: Yup.number().required(),
    flavor: Yup.string(),
  });
  const { register, handleSubmit } = useForm({ resolver: yupResolver(validationSchema) });

  const submitForm = async (data: any) => {
    const id = localStorage.getItem("id");
    const obj = { product, flavor: data.flavor, amount: data.amount, price: product.price, itemID, id };
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_backend_Link}addcart`, {
        method: "POST",
        body: JSON.stringify(obj),
        headers: { "Content-Type": "application/json" },
      });
      if (res.ok) {
        window.dispatchEvent(new CustomEvent("cart-added"));
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    (async () => {
      const item = await fetch(`${process.env.NEXT_PUBLIC_backend_Link}product/${req.params.id}`);
      const data = await item.json();
      const p = data.product;
      if (p.flavors.length === 0) {
        document.getElementById("flavorSelect")?.setAttribute("style", "display:none");
      }
      setProduct(p);
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

    document.getElementById("leftBtn")?.addEventListener("click", () => {
      document.getElementById("productImg")?.setAttribute("style", "transform:translateX(0px); transition: transform 0.5s ease-in-out;");
    });
    document.getElementById("rightBtn")?.addEventListener("click", () => {
      const vw: any = document.getElementById("firstImg")?.clientWidth;
      document.getElementById("productImg")?.setAttribute("style", `transform:translateX(-${vw}px);transition: transform 0.5s ease-in-out;`);
    });

  }, []);

  const imgs = product.images;
  const flavors = product.flavors;

  const flavorOptions = flavors.map((flavor) => (
    <option key={flavor} value={flavor}>{flavor}</option>
  ));

  return (
    <>
      <Header />
      <main className="bg-[#0a0a0a] py-12 px-[5vw]" suppressHydrationWarning>
        <div
          className="max-w-9xl mx-auto bg-[#111111] border border-[#2a2a2a] rounded-2xl flex flex-col lg:flex-row shadow-[0_8px_40px_rgba(0,0,0,0.6)]"
          suppressHydrationWarning
        >
          {/* Image Panel */}
          <div className="w-full lg:flex-1 bg-[#0f0f0f] flex items-center justify-center p-8 border-b lg:border-b-0 lg:border-r border-[#1e1e1e] lg:min-h-[600px]">
            <div className="flex items-center  gap-4 w-full">
              <button
                id="leftBtn"
                className="text-[#525252] hover:text-[#ff4d00] transition-colors flex-shrink-0"
              >
                <svg width="40" height="32" viewBox="0 0 70 56" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    className="transition-all ease-in-out"
                    d="M69.2419 55.9557L0.758179 28.0002L69.2419 0.0441831L48.8496 28.0002L69.2419 55.9557Z"
                    fill="currentColor"
                  />
                </svg>
              </button>

              <div id="imgWrap" className="overflow-hidden w-full">
                <div id="productImg" className="flex">
                  <img id="firstImg" src={imgs[0]} alt="" className="min-w-full object-contain max-h-[700px]" />
                  <img id="secondImg" src={imgs[imgs.length - 1]} alt="" className="min-w-full object-contain max-h-[700px]" />
                </div>
              </div>

              <button
                id="rightBtn"
                className="text-[#525252] hover:text-[#ff4d00] transition-colors flex-shrink-0"
              >
                <svg width="40" height="32" viewBox="0 0 69 56" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    className="transition-all ease-in-out"
                    d="M0.519995 55.9116L69 27.956L0.519995 -6.33003e-06L20.9111 27.956L0.519995 55.9116Z"
                    fill="currentColor"
                  />
                </svg>
              </button>
            </div>
          </div>

          {/* Info Panel */}
          <div
            className="flex flex-col gap-4 lg:gap-8 p-4 lg:p-10 lg:w-[460px]  flex-shrink-0"
            id="rightItemDesc"
            suppressHydrationWarning
          >
            <div>
              <p className="text-[#ff4d00] text-xs uppercase tracking-widest font-semibold mb-1 lg:mb-2">
                {product.brand.name}
              </p>
              <h1 className="text-white text-xl lg:text-3xl font-bold leading-tight mb-2 lg:mb-3">{product.product}</h1>
              <p className="text-[#ff4d00] text-lg lg:text-2xl font-bold">${product.price}</p>
            </div>
 <div className="border-t border-[#1e1e1e] pt-4 lg:pt-6">
              <p className="text-[#a3a3a3] text-sm leading-relaxed">{product.summary}</p>
            </div>
            <form
              className="flex flex-col gap-3 w-full"
              onSubmit={handleSubmit(submitForm)}
            >
              <div id="flavorSelect" className="flex flex-col w-full max-h-[50px]">
                <label className="text-[#a3a3a3] text-xs uppercase tracking-widest font-medium">Flavor</label>
                <select
                  className="bg-[#1a1a1a] border border-[#2a2a2a] focus:border-[#ff4d00] outline-none text-white rounded-lg px-3 py-2 text-sm transition-colors w-full"
                  defaultValue={flavors[0]}
                  {...register("flavor")}
                >
                  {flavorOptions}
                </select>
              </div>

              <div className="flex flex-col max-h-[50px] ">
                <label className="text-[#a3a3a3] text-xs uppercase tracking-widest font-medium">Amount</label>
                <select
                  defaultValue="1"
                  className="bg-[#1a1a1a] border border-[#2a2a2a] focus:border-[#ff4d00] outline-none text-white rounded-lg px-3 py-2 text-sm transition-colors w-[100px]"
                  {...register("amount")}
                >
                  {[1,2,3,4,5].map((n) => <option key={n} value={n}>{n}</option>)}
                </select>
              </div>

              <button
                type="submit"
                id="addToCart"
                className="w-full py-3 lg:py-4 bg-[#ff4d00] hover:bg-[#ff6b2b] text-white font-bold rounded-xl text-base lg:text-lg tracking-wide transition-colors "
              >
                Add to Cart
              </button>
            </form>

           
          </div>
        </div>

      </main>
      <Footer />
    </>
  );
}
