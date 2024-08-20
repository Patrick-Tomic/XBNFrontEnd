'use client'
import Header from '@/components/header';
import {useState, useEffect} from 'react';

export default function ShoppingCartPage() {
    /* type item = {
        name: string,
        price: number,
        quantity: number,
        image: Array<string>,
        flavor: string,
        brand: string | null
    } */
    const [cart, setCart] = useState({
    items:[],
    price:0
    })
    useEffect(() => {
        (async() => {
            const id = localStorage.getItem("id")
                 const user = await fetch(`${process.env.NEXT_PUBLIC_backend_Link}cart/${id}`);
             const data = await user.json();
             console.log(data.cart.cart)
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
   
   const items = cart.items.map((item: any) => {
    const src = item.image[0]
   const images = item.image
         return(
              <>
              <div className="flex items-center justify-around w-[50%]">
                <img className='w-[6vw] mb-5' src={src} alt={item.name} />
                
                     <h1 className=' text-xl font-bold'>{item.name}</h1>
                     <h2 className=' text-lg font-bold'>{item.price}</h2>
                     <h3>{item.amount}</h3>
              </div>
              </>
         )
   })
    return(
        <>
        <Header />
        <main className='flex flex-col bg-[#353935] m-10 text-white'>
        <div className="flex items-center justify-around ml-[300px] w-[30vw] ">
             
            <h1 className=' text-xl font-bold'>Item</h1>
            <h2 className=' text-lg font-bold'>Price</h2>
            <h3>Quantity</h3>
        </div>
        {items}
        </main>
        </>
    )
}