/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-floating-promises */
'use client'
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import Footer from '@/components/footer'
import Header from '@/components/header'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'
import { number } from 'yup'
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
  // form submittion

  const validationSchema = Yup.object().shape({
    amount: Yup.number().required(),
    flavor: Yup.string().required()
  })
  const formOptions = { resolver: yupResolver(validationSchema) }
  const { register, handleSubmit, reset, formState } = useForm(formOptions)
  const submitForm = async (data: any) => {
    const id = localStorage.getItem('id')
    console.log(id)
    // eslint-disable-next-line object-shorthand
    const obj = { product: product.product, flavor: data.flavor, amount: data.amount, price: product.price, id: id }
    const formData = JSON.stringify(obj)
    try {
      const req = await fetch(`${process.env.NEXT_PUBLIC_backend_Link}addcart`, {
        method: 'POST',
        body: formData,
        headers: {
          'Content-Type': 'application/json'
        }
      })
      const file = await req.json()
      console.log(file)
    } catch (err) {
      console.log(err)
    }
  }
  useEffect(() => {
    (async () => {
      const item = await fetch(`${process.env.NEXT_PUBLIC_backend_Link}product/${req.params.id}`)
      const data = await item.json()
      const product = data.product
      console.log(product)
      if (product.flavors.length === 0) {
        document.getElementById('flavorSelect')?.setAttribute('style', 'display:none')
      } 
      setProduct(product)
      const id = localStorage.getItem('id')
      const dataB = await fetch(`${process.env.NEXT_PUBLIC_backend_Link}cart/${id}`)
      const cart = await dataB.json()
      setCart(cart.cart.cart)
    })()
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
  const images = imgs.map((img: any) => {
    return (
      <img src={img} alt = {product.product} />
    )
  })
  const flavorOptions: any = flavors.map((flavor: any) => {
    return (
      <>
      <option key ={flavor} value={`${flavor}`}>{flavor}
      </option>
      </>
    )
  })
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
                {images}
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
                <form className='w-[100%]' onSubmit={handleSubmit(submitForm)}>
                <div className='flex justify-center items-center' id="flavorSelect">
                <h3 className='text-3xl'>Flavors:</h3>
                <select className='w-[80%] text-3xl' defaultValue={flavors[0]} {...register('flavor')} >
                  {flavorOptions}
                </select>
                </div>
                  <div>
                  <h3 className='text-3xl'>Amount:</h3>
                  <select defaultValue={'1'} className='w-[80%] text-3xl' {...register('amount')} >
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    </select>
                  </div>

                 <button type='submit' id='addToCart' className='w-[90%] h-[5vh] border-solid rounded-xl border-black border-2 text-4xl'>Add to Cart</button>
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
