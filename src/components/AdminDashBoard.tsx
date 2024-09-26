'use client'
import {useEffect, useState} from 'react'
import logo from '/public/xbn.png'
import Image from 'next/image'
export default function AdminDashboard(){
    const [products, setProducts] = useState([])
    const [brands, setBrands] = useState([])
    const [categories, setCategories] = useState([])
useEffect(() => {
    const fetchItems = async () => {
        const brandItems = await fetch(`${process.env.NEXT_PUBLIC_backend_Link}allitems`)
        const data = await brandItems.json()
        const items: any = data.items
        console.log(items)
        setProducts(items)
      }
      fetchItems() 
    const fetchCategories = async () => {
        const catItems = await fetch(`${process.env.NEXT_PUBLIC_backend_Link}categories`)
        const data = await catItems.json()
      
        const items = data.categories
        setCategories(items)
    }
    fetchCategories()

    const fetchBrands = async () => {
        const brands = await fetch(`${process.env.NEXT_PUBLIC_backend_Link}brands`)
        const data = await brands.json()
       
        const items = data.brands
        setBrands(items)
     
    }
    fetchBrands()
    
},[])

const items = products.map((item: any) => {
    const images = item.images
    return (
        <div id='obj' className='flex justify-around bg-white border-2 w-[80%] border-orange-500 border-solid'>
            <img className='w-20' src={images[0]} alt=""/>
            <h2>{item.product}</h2>
            <p>{item.price}</p>
            <p>{item.brand.name}</p>
            <p>{item.category}</p>
            <div>
            <button>Summary</button>
            <p className='hidden'>{item.summary}</p>
            </div>
          
            <p>{item.flavors.map((flavor: any) => {
                return flavor
            })}</p>
            <p>{item.stock}</p>
        </div>
    )  
})

console.log(brands)
 
  const brandItems = brands.map((brand: any) => {
    return(
        <div  className='bg-white'id='obj'>
            <h2>{brand.name}</h2>
            
        </div>
    )
})
const categorItems = categories.map((category: any) => {
    return(
        <div id='obj'>
            <h2>{category.type}</h2>
            
        </div>
    )
})  
return(
    <>
    <header className='flex h-[5vh] justify-around'>
        <Image className='w-20' src = {logo} alt= 'Logo' />
        <button onClick={() => {
          const wraps = document.querySelectorAll('#wrap')
          wraps.forEach((wrap) => {
            wrap.setAttribute('style', 'display:none')})
        
            document.querySelector('.products')?.setAttribute('style', 'display:block')
        }}><h1>Products</h1></button>
         
         <button onClick={() => {
        const wraps = document.querySelectorAll('#wrap')
        wraps.forEach((wrap) => {
          wrap.setAttribute('style', 'display:none')})
      
            document.querySelector('.brandItems')?.setAttribute('style', 'display:block')
        }}><h1>Brands</h1></button>

        <button onClick={() => {
           const wraps = document.querySelectorAll('#wrap')
              wraps.forEach((wrap) => {
                wrap.setAttribute('style', 'display:none')})
            
            document.querySelector('.catItems')?.setAttribute('style', 'display:block')
        }}><h1>Categories</h1></button>
    </header>
    <main className='bg-[#343434] w-[100%] margin-0'>
        <div id='container'>
            <div className='products w-[100%]' id='wrap'>
                {items}
            </div>
              <div className='catItems hidden' id='wrap'>
                {categorItems}
            </div> 
            <div className='brandItems hidden' id='wrap'>
             {brandItems}
            </div> 

        </div>
    </main>
    </>
)
}
