import  XBN  from '/public/xbnLogoB.png'
import X from '/public/X.png'
import SocialMedia from './social'
import Image from 'next/image'
export default function UserMenu() {
    return (
        <div className="z-[11] border-2 border-solid border-black font-[Junge] bg-[#FFFBD6] w-[250px] h-[300px] absolute top-[20%] flex flex-col">
            <div className='flex justify-around'>
                <Image className='w-[100px] h-[50px]' src={XBN} alt='Xtreme Body Nutrition' />
                <button> 
                <Image src = { X } alt='X' />
                </button>
            </div>
            <a href="#">Brands</a>
            <a href="#">Categories</a>
            <a href="#">All Products</a>
            <a href="#">Contact Us</a>
            <div className='flex justify-around'>
              <button id='login' className=' font-sans border-solid border-black border-2 rounded-xl text-lg w-[4vw] h-[4vh] mr-10' onClick={() => {
                document.getElementById('loginForm')?.setAttribute('style', 'display:block')
              }}>Login</button>
              <a href="/signup"><button className=' font-sans border-solid border-black border-2 rounded-xl text-lg w-[4vw] h-[4vh]'>Sign-up</button></a>
              </div>
            <SocialMedia />
        </div>
    )
}