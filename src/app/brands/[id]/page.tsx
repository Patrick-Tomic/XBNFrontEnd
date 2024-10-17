/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-floating-promises */
// eslint-disable-next-line @typescript-eslint/no-unused-expressions
"use client";
import Footer from "@/components/footer";
import Header from "@/components/header";
import React from "react";
import { useEffect, useState } from "react";
import Image from "next/image";

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export default function brandPage(req: { params: { id: any } }) {
  const [items, setItems] = useState([]);
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
    const fetchItems = async () => {
      const brandItems = await fetch(
        `${process.env.NEXT_PUBLIC_backend_Link}brand/${req.params.id}`,
      );
      const data = await brandItems.json();
      const items = data.items;
      setItems(items);
    };
    fetchItems();
  }, []);

  const div: any = items.map((item: any) => {
    const images = item.images;
    return (
      <a key={item.product} href={`/item/${item._id}`}>
        <div className="w-[25vw] xl:ml-0 md:w-[80%] md:ml-[10vw] sm:w-[80%] sm:ml-[10vw] phone:ml-10 phone:w-[80%]  bg-white p-3 border-gray-500 border-solid border-2 rounded-xl flex flex-col justify-center items-center"> 
          <Image className="2xl:w-[8vw] xl:w-[10vw] md:max-w-[100vw] md:w-[15vw] sm:w-[15vw] phone:w-[20vw] phone:max-w-[100vw] phone:text-base  h-[20vh] mb-10" src={`${images[0]}`} overrideSrc={`${images[0]}`} alt="" />
          <h2 className="text-2xl phone:text-base md:text-lg font-bold">{item.product} </h2>
          <p className="text-xl md:text-lg">{item.price}</p>
        </div>
      </a>
    );
  });

  return (
    <>
      <Header />
      <main className="h-[100%] lg:grid-cols-2 md:grid-cols-1 phone:grid-cols-1 sm:grid-cols-1 grid gap-10 2xl:grid-cols-3 brandPage ">{div}</main>
      <Footer />
    </>
  );
}
