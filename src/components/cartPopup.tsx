import { useEffect, useState } from "react";
export default function CartPopup() {
    const [cart, setCart] = useState({
        items: [],
        price: 0
    })
    useEffect(() => {
        const getCart = async () => {
            const id = localStorage.getItem('id')
            const data = await fetch(`${process.env.NEXT_PUBLIC_backend_Link}cart/${id}`)
            const cart = await data.json()
            setCart(cart)
        }
    })
    console.log(cart)
    const items = cart.items.map((item: any) => {
        return(
            <div className="flex">
                <h1>item.</h1>
            </div>
        )
    })
    return (

    )
}