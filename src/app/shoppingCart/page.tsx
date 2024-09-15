'use client'
import Header from '@/components/header';
import {useState, useEffect} from 'react';
import Footer from '@/components/footer';
import * as Yup from 'yup';
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
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
    const validationSchema = Yup.object().shape({
         
    })
    const formOptions = {resolver: yupResolver(validationSchema)}
    const {register, handleSubmit, reset, formState} = useForm(formOptions)
    const submitForm = async(data: any) => {
        const id = localStorage.getItem('id')
        const obj = {id:id, cart: cart}
        const formData = JSON.stringify(obj)
        try {
            const req = await fetch(`${process.env.NEXT_PUBLIC_backend_Link}updateCart`, {
                method: 'POST',
                body: formData,
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            const file = await req.json()
            console.log(cart.items)
            window.location.reload()
        }
        catch(err: any){
            console.log(err)
        }

    }
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
    let index = -1
   const items = cart.items.map((item: any) => {
    const src = item.image[0]
    index++
    const id = index
   

   const images = item.image
         return(
              <>
              <div className="flex items-center justify-evenly w-[60%] border-2 border-black border-solid">
                <img className='w-[6vw]  border-2 border-red border-solid' src={src} alt={item.name} />
                
                     <h1 className=' text-xl w-[10vw] font-bold'>{item.name}</h1>
                     <h2 className=' text-lg font-bold w-10 mr-16'>{item.price}</h2>
                   <select id={`${id}`} onChange={() => {
                    const obj: any = cart.items
                    const amount = document.getElementById(`${id}`) as HTMLSelectElement
                    obj[id].amount = amount.value
                    setCart({items: obj, price: cart.price})
                    console.log(cart)
                   }} name="" className='text-black' defaultValue={item.amount} >
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                   </select>
                   <button  type='submit' onClick={() => {
                    const obj = cart.items
                    const split = obj.splice(0, id+1)
                    split.pop()
                    const join = split.concat(obj)
                    setCart({items: join, price: cart.price})
                    console.log(cart)    
                   }} id={`${id}`}>delete </button>
              </div>
              </>
         )
   })
    return(
        <>
        <Header />
        <main className='flex flex-col bg-[#353935] m-10 text-white'>
        <div className="flex items-center justify-around ml-[450px] w-[30vw] ">
            <h1 className=' text-xl font-bold ml-[-5vw]'>Item</h1>
            <h2 className=' text-lg font-bold ml-10'>Price</h2>
            <h3 className='font-bold'>Quantity</h3>
        </div>
        <div>
  
        </div>
        <form onSubmit={handleSubmit(submitForm)}>
        {items}
        <button type='submit' className='border-2 border-black border-solid bg-white text-black w-24' >Enter</button>
        </form>
        </main>
        </>
    )
}