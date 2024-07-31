'use client'
import Header from '@/components/header';
import {useState, useEffect} from 'react';

export default function ShoppingCartPage() {
    const [cart, setCart] = useState({
    items:[],
    price:0
    })
    useEffect(() => {
        (async() => {
            const id = localStorage.getItem("id")
                 const user = await fetch(`${process.env.NEXT_PUBLIC_backend_Link}cart/${id}`);
             const data = await user.json();
             setCart(data.cart.cart);
         })()
         document.getElementById("brandHead")?.addEventListener("mouseover", () => {
            document.querySelectorAll("#brandChild").forEach((child) => {
                child.setAttribute("style", "display:block;");
            });
            });
        
            document.getElementById("categoryHead")?.addEventListener("mouseover", () => {
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
    }, [])
    console.log(cart.items)
   const items = cart.items.map((item: any) => {
    const src = item.image[0]
         return(
              <>
              <div className="flex flex-row">
                <img src={src} alt={item.name} />
                <div className="flex flex-col">
                     <h1>{item.name}</h1>
                     <h2>{item.price}</h2>
                     <h3>{item.quantity}</h3>
                </div>
              </div>
              </>
         )
   })
    return(
        <>
        <Header />
        <main className='flex flex-col'>
        {items}
        </main>
        </>
    )
}