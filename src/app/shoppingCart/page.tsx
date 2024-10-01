"use client";
import Header from "@/components/header";
import { useState, useEffect } from "react";
import Footer from "@/components/footer";
import * as Yup from "yup";
import { set, useForm } from "react-hook-form";
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
  const [price, setPrice] = useState(0);
  const [cart, setCart] = useState({
    items: [],
    price: 0,
  });
   
  const validationSchema = Yup.object().shape({});
  const formOptions = { resolver: yupResolver(validationSchema) };
  const { register, handleSubmit, reset, formState } = useForm(formOptions);
  const submitForm = async (data: any) => {
    const id = localStorage.getItem("id");
    let obj = { id: id, cart: cart };

    

    const formData = JSON.stringify(obj);
    try {
      const req = await fetch(
        `${process.env.NEXT_PUBLIC_backend_Link}updateCart`,
        {
          method: "POST",
          body: formData,
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
      const file = await req.json();
      console.log(cart.items);
      window.location.reload();
    } catch (err: any) {
      console.log(err);
    }
  };
  const makePayment = async () => {
    const stripe = await loadStripe("process.env.stripeKey");
    const body = {
      products: cart.items,
    };
    const headers = { "Content-Type": "application/json" };
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_backend_Link}checkout`,
      {
        method: "POST",
        headers: headers,
        body: JSON.stringify(body),
      },
    );
    const session = await response.json();

    window.location.href = session.url;
  };
  useEffect(() => {
    (async () => {
      const id = localStorage.getItem("id");
      const user = await fetch(
        `${process.env.NEXT_PUBLIC_backend_Link}cart/${id}`,
      );
      const data = await user.json();

      setCart(data.cart.cart);
      console.log(data.cart.cart);
    })();
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
  }, []);
  let index = -1;

  const items: any = cart.items.map((item: any) => {
   const images:any = item.images
   const src: any = images
    index++;
    const id = index;
    const total = item.price * item.stock;
    console.log(item);
    return (
      <>
        <div className="flex items-center justify-evenly w-[100%] ml-3 border-b-2 border-white border-solid mb-10">
          <img className="w-[6vw]" src={item.images[0]} alt={item.name} />

          <h1 className=" text-xl w-[10vw] font-bold">{item.product}</h1>
          <h2 className=" text-lg font-bold w-10 mr-10">{item.price.toFixed(2)}</h2>
          <form onClick={handleSubmit(submitForm)}>
            <select
              id={`${id}`}
              onChange={() => {
                const obj: any = cart.items;
                const amount = document.getElementById(
                  `${id}`,
                ) as HTMLSelectElement;
                let cartPrice = cart.price;
                if (obj[id].amount === amount.value) {
                  return;
                } else if (obj[id].amount > amount.value) {
                  const difference = obj[id].amount - parseInt(amount.value);
                  const priceDifference = obj[id].price * difference;
                  obj[id].total = obj[id].total - priceDifference;
                  obj[id].amount = amount.value;
                  cartPrice = cartPrice - priceDifference;
                } else if (obj[id].amount < amount.value) {
                  const difference = parseInt(amount.value) - obj[id].amount;
                  obj[id].amount = amount.value;
                  const addition = obj[id].price * difference;
                  obj[id].total = obj[id].total + addition;
                  cartPrice = cartPrice + addition;
                }
                /*                     obj[id].price = obj[id].price*parseInt(amount.value) */
                setCart({ items: obj, price: cartPrice });
                handleSubmit(submitForm);
              }}
              name=""
              className="text-black w-16 ml-16 text-center"
              defaultValue={item.amount}
            >
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>

            <button
              type="button"
              onClick={(event) => {
                const obj: any = cart.items;
                if (id == 0) {
                  if (obj.length === 1) {
                    cart.items=[]
                    cart.price = 0
                    
                    console.log(cart)
                    handleSubmit(submitForm);
                    return
                }
              cart.price-=obj[id].price*obj[id].stock
              cart.items = obj.filter(
                (item: any, index: number) => index != id,
              );
              handleSubmit(submitForm)
              }else if (id > 0) {
                
                  /* obj.map((item: any, index: number) => {
                    if (index === id) {
                      newPrice += item.total;
                    }
                    obj.slice()
                  }); */
                  const deletedItem = obj[id].price * obj[id].stock;
            
                  /*   console.log(obj)
                  const body = {items: obj.concat(split), price: cart.price-price} */
                  const item = obj.filter(
                    (item: any, index: number) => index != id,
                  );
                  
                cart.items = item
                cart.price = cart.price - deletedItem
                 
              
                  handleSubmit(submitForm);
                }
              }}
              id={`${id}`}
            >
              delete{" "}
            </button>
          </form>
        </div>
      </>
    );
  });
  return (
    <>
      <Header />
      <main className="brandPage flex">
        <div className="flex flex-col bg-[#353935] w-[50%] m-10 text-white p-10">
          <div className="flex items-center justify-evenly ml-[100px] w-[100%] ">
            <h1 className=" text-xl font-bold">Item</h1>
            <h2 className=" text-lg font-bold ">Price</h2>
            <h3 className="font-bold mr-10">Quantity</h3>
          </div>
          <div></div>
          <form onSubmit={handleSubmit(submitForm)}>
            {items}
            <button
              onClick={makePayment}
              type="button"
              className="border-2 border-black border-solid bg-white text-black w-24"
            >
              Enter
            </button>
          </form>
        </div>
        <div className="flex flex-col bg-white w-[30%] m-10 p-10" id="summary">
          <div>
            <h1 className="text-xl font-bold border-solid ">
              Item Total: {cart.price.toFixed(2)}
            </h1>
            <h2 className="text-lg font-bold">
              Sales Tax: {(cart.price * 0.06).toFixed(2)}{" "}
            </h2>
            <h3 className="text-lg font-bold">Shipping: 0</h3>
            <h4 className="text-lg font-bold">
              Total: {(cart.price + cart.price * 0.06).toFixed(2)}
            </h4>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
