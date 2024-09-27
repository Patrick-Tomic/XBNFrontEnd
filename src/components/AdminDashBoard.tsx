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
        console.log(items)
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
        <div id='obj' className='flex justify-start text-center bg-white border-2 w-[60%] border-orange-500 border-solid'>
            <img className='w-[100px] border-2 border-black border-solid' src={images[0]} alt=""/>
            <h2 className='w-[200px] mt-9'>{item.product}</h2>
            <p className='w-[200px] mt-9'>{item.price}</p>
            <p className='w-[200px] mt-9'>{item.brand.name}</p>
            <div className='w-[200px] mt-9'>
            <button onClick={() => {
                const p = document.getElementById(`${item.product}`)
                p?.setAttribute('style', 'display:block')
            }}>Expand</button>
            <p id={`${item.product}`} className='hidden absolute bg-white w-[25vw] border-2 border-black border-solid p-10 '>{item.summary} 
            <button onClick={() => {
                const p = document.getElementById(`${item.product}`)
                p?.setAttribute('style', 'display:none')
            }} className='absolute w-10 font-bold top-2 ml-5'>X</button></p>
            </div>
          <div>
            <button   onClick={() => {
                const p = document.getElementById(`${item.flavors[0]}`)
                p?.setAttribute('style', 'display:block')
                 
              
            }} className='mt-9'>[...]</button>
             <p id = {item.flavors[0]} className='w-[200px] mt-9 hidden'>{item.flavors.map((flavor: any) => {
                return flavor+','
            })}</p>
          </div>
            
            <p className='w-[200px] mt-9'>{item.stock}</p>
            <button className='absolute left-[70%] mt-10 border-white border-solid border-2 bg-white rounded-md p-2 text-blue-600 hover:text-lg hover:bg-orange-500 duration-300 transition-all ease-in-out ' >Update Item</button>
            <button className='absolute left-[80%] mt-10 bg-red-500 border-solid border-2   rounded-md p-2 text-white hover:text-lg   duration-300 transition-all ease-in-out '>Delete Item</button>

        </div>
    )  
})


 
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
            <h2 className='font-bold text-2xl m-5'>{category.type}</h2>
            
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
    <main className='bg-[#343434] min-w-full m-0'>
        <div>
            <button className='absolute left-[90%] bg-green-700 p-2 w-32 border-solid text-white text-xl rounded-lg border-white border-2 '>Add</button>
            </div>
        <div id='container' className='w-screen'>
            <div className='products w-screen' id='wrap'>
                <nav className='flex justify-around ml-20 w-[50%]'>
                    
                    <h1 className='text-white font-bold ml-16'>
                        Product Name
                    </h1>
                    <h1 className='text-white ml-10  font-bold'>
                        Price
                    </h1>
                    <h1 className='text-white ml-10 font-bold'>
                        Brand
                    </h1>
                    <h1 className='text-white ml-32 font-bold'>
                        Summary
                    </h1>
                    <h1 className='text-white font-bold'>
                        Flavors
                    </h1>
                    <h1 className='text-white font-bold'>
                        Stock
                    </h1>
                </nav>
                {items}
            </div>
              <div className='catItems hidden bg-white w-[10%]  ' id='wrap'>
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
