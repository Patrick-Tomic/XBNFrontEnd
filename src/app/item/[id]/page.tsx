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
    flavor: Yup.string()
  })
  const formOptions = { resolver: yupResolver(validationSchema) }
  const { register, handleSubmit, reset, formState } = useForm(formOptions)
  const submitForm = async (data: any) => {
    const id = localStorage.getItem('id')
    // eslint-disable-next-line object-shorthand
    const obj = { product: product, flavor: data.flavor, amount: data.amount, price: product.price, id: id }
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
      document.getElementById('productImg')?.setAttribute('style', `transform:translateX(${0}px); transition: transform 0.5s ease-in-out;`)
    })
    document.getElementById('rightBtn')?.addEventListener('click', () => {
      const vw: any = document.getElementById('firstImg')?.clientWidth
      document.getElementById('productImg')?.setAttribute('style', `transform:translateX(-${vw}px);transition: transform 0.5s ease-in-out;`)
    })
    const imgWidth: any = document.getElementById('productImg')?.clientWidth
    const width = imgWidth / 2
    const imgWrap = document.getElementById('imgWrap')?.setAttribute('style', `max-width:${width}px`)
    let bool = false
    document.getElementById('secondImg')?.addEventListener('mousedown', (e) => {
      const img: any = document.getElementById('secondImg')
    console.log(e.pageX, e.pageY, img.width, img.height)
      let x = 0
      let y = 0
      const XCoord = e.pageX
      const YCoord = e.pageY
      let translateX = ((XCoord) / img.width)*150
      let translateY = ((YCoord) / img.height)*150
      if(XCoord > 230){
        translateX = -translateX
      }
      if(YCoord > 230){
        translateY = -translateY
      }
      x = XCoord
      y = YCoord
      bool = true
    console.log(translateX, translateY)
      img.setAttribute('style', ` transform:scale(2) translate(${translateX}px, ${translateY}px); transition: transform 0.5s ease-in-out;`)
   
      /* img?.addEventListener('mousemove',  (e: any) => {
         
        const XCoord = e.clientX
        const YCoord = e.clientY
        let translateX = ((e.pageX - img.style.offset - img.style.left) / img.width)*20
        let translateY = ((e.pageY - img.style.offset - img.style.top) / img.height)*20
        if(x < XCoord){ translateX = -translateX}
        if(y < YCoord){ translateY = -translateY}
        x = XCoord
        y = YCoord
      
        img.setAttribute('style', ` transform:scale(2) translate(${translateX}px, ${translateY}px); transition: transform 0.5s ease-in-out;`)
        
      }) */

      })
  }, [])
  const imgs = product.images
  const flavors = product.flavors
  const productImg = (
    <div id='productImg' className='flex w-[100%] '>
      <img id='firstImg' src={imgs[0]} alt="" />
      <img id='secondImg'  src={imgs[imgs.length - 1]} alt="" />
      <div>

      </div>
    </div>
  )
  const images = imgs.map((img: any) => {
    return (
      <img className='max-w-[100vw]' src={img} alt = {product.product} />
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
        <main className='itemDetail h-[100%] bg-[#F6E4C8] items-center flex flex-col  ' suppressHydrationWarning={true}>
            <div className='flex rounded-xl h-[100vh]  w-[85%] p-16 justify-around bg-[#353935] text-white' suppressHydrationWarning={true}>
            <div className='flex justify-around items-center  '>
                <button id='leftBtn'>
                <svg width="70" height="56" viewBox="0 0 70 56" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path className='hover:fill-[#F28C28] transition-all ease-in-out' d="M69.2419 55.9557L0.758179 28.0002L69.2419 0.0441831L48.8496 28.0002L69.2419 55.9557Z" fill="black"/>
                </svg>
                </button>
                 <div id='imgWrap' className='flex overflow-hidden  w-[100vw]'>
                 {productImg}
                <div>
                </div>
                </div>
                <button id='rightBtn'>
                <svg width="69" height="56" viewBox="0 0 69 56" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path className='hover:fill-[#F28C28] transition-all ease-in-out' d="M0.519995 55.9116L69 27.956L0.519995 -6.33003e-06L20.9111 27.956L0.519995 55.9116Z" fill="black"/>
                </svg>
                </button>
             </div>
              <div className='flex  items-center justify-around flex-col' id='rightItemDesc' suppressHydrationWarning={true} >
                <div>
              <h1 className='text-3xl font-bold mb-5'>{product.brand.name} - {product.product}</h1>
                <p className='text-2xl' suppressHydrationWarning={true}>
                    ${product.price}
                </p>
                </div>
                <form className='w-[100%] h-[20vh] flex flex-col justify-around ' onSubmit={handleSubmit(submitForm)}>
                <div className='flex justify-center items-center' id="flavorSelect">
                <h3 className='text-3xl'>Flavors:</h3>
                <select className='w-[80%] text-black text-3xl' defaultValue={flavors[0]} {...register('flavor')} >
                  {flavorOptions}
                </select>
                </div>
                  <div className='flex justify-center items-center self-start '>
                  <h3 className='text-3xl'>Amount:</h3>
                  <select defaultValue={'1'} className='w-[40%] text-black text-3xl text-center' {...register('amount')} >
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    </select>
                  </div>

                 <button type='submit' id='addToCart' className='w-[90%] h-[5vh] border-solid bg-white text-black rounded-xl border-black border-2 text-4xl'>Add to Cart</button>
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
