/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-floating-promises */
'use client'
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import Footer from '@/components/footer'
import Header from '@/components/header'
import { useEffect, useState } from 'react'
export default function itemDetail (req: { params: { id: any } }) {
  const [product, setProduct] = useState({
    product: '',
    summary: '',
    price: 0,
    images: [],
    flavors: [],
    brand: {
      name: ''
    }
  })
  const [cart, setCart] = useState({
    items: [],
    price: 0
  })
  console.log(cart)
  useEffect(() => {
    (async () => {
      const item = await fetch(`${process.env.NEXT_PUBLIC_backend_Link}product/${req.params.id}`)
      const data = await item.json()
      const product = data.product
      setProduct(product)
      const id = localStorage.getItem('id')
      const dataB = await fetch(`${process.env.NEXT_PUBLIC_backend_Link}cart/${id}`)
      const cart = await dataB.json()
      setCart(cart.cart.cart)
    })()
    if (flavors.length === 0) {
      document.getElementById('flavorSelect')?.setAttribute('style', 'display:none')
    }
    document.getElementById('brandHead')?.addEventListener('mouseover', () => {
      document.querySelectorAll('#brandChild').forEach((child) => {
        child.setAttribute('style', 'display:block;')
      })
    })

    document.getElementById('categoryHead')?.addEventListener('mouseover', () => {
      document.querySelectorAll('#categoryChild').forEach((child) => {
        child.setAttribute('style', 'display:block')
      })
    })
    document.getElementById('catUL')?.addEventListener('mouseleave', () => {
      document.querySelectorAll('#categoryChild').forEach((child) => {
        child.setAttribute('style', 'display:hidden')
      })
    })

    document.getElementById('brandUL')?.addEventListener('mouseleave', () => {
      document.querySelectorAll('#brandChild').forEach((child) => {
        child.setAttribute('style', 'display:hidden')
      })
    })
    document.getElementById('leftBtn')?.addEventListener('click', () => {
      const vw = 25
      const imgs = document.getElementById('productImg')
    })
  }, [])

  const imgs = product.images
  const flavors = product.flavors
  const productImg = (
    <div id='productImg' className='flex w-[25vw] overflow-hidden'>
      <img src={imgs[0]} alt="" />
      <img src={imgs[imgs.length - 1]} alt="" />
    </div>
  )
  const flavorOptions =  if(flavors.length > 0){
     flavors.map((flavor: any) => {
      return (
      <option key ={flavor} value={`${flavor}`}>{flavor}</option>
      )
    })}
    else{ ''}
  return (
        <>
        <Header />
        <main className='itemDetail h-[100%] bg-[F6E4C8] items-center flex flex-col  ' suppressHydrationWarning={true}>
            <div className='flex rounded-xl h-[100vh]  w-[85%] p-16 justify-around bg-[#FAF9F6]' suppressHydrationWarning={true}>
            <div className='flex justify-around items-center  w-[45vw]'>
                <button id='leftBtn'>
                    left
                </button>
                <div>
                {productImg}
                <div>
                </div>
                </div>
                <button id='rightBtn'>
                    right
                </button>
             </div>
              <div className='flex  items-center justify-between flex-col' id='rightItemDesc' suppressHydrationWarning={true} >
                <div>
              <h1 className='text-3xl font-bold mb-5'>{product.brand.name} - {product.product}</h1>
                <p className='text-2xl' suppressHydrationWarning={true}>
                    ${product.price}
                </p>
                </div>
                <form className='w-[100%]' action="">
                  <div>
                  <h3 className='text-3xl'>Amount:</h3>
                  <select className='w-[80%] text-3xl' name="amount" >
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    </select>
                  </div>
                <div className='flex justify-center items-center' id="flavorSelect">
                <h3 className='text-3xl'>Flavors:</h3>
                <select className='w-[80%] text-3xl' name="flavor" >
                  {flavorOptions }
                </select>
                </div>
                 <button id='addToCart' className='w-[90%] h-[5vh] border-solid rounded-xl border-black border-2 text-4xl'>Add to Cart</button>
                 </form>
                <p className='w-[20vw] text-xl leading-loose'>
                  {product.summary}
                </p>
              </div>
            </div>
        </main>
        <Footer />
        </>
  )
}
