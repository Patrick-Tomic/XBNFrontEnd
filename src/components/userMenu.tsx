import  XBN  from '/public/xbnLogoB.png'
import X from '/public/X.png'
import SocialMedia from './social'
import Image from 'next/image'
export default function UserMenu() {
    return (
        <div id='userClass' className="z-[11] border-2 border-solid border-black font-[Junge] bg-[#FFFBD6] w-[250px] h-[300px] top-[20%] hidden flex-col">
            <div className='flex justify-around'>
                <Image className='w-[100px] h-[50px]' src={XBN} alt='Xtreme Body Nutrition' />
                <button id='userMenuExit' onClick={() => {
                    document.getElementById('userClass')?.setAttribute('style', 'display:none')
                    document.getElementById('loginForm')?.setAttribute('style', 'display:none')
                }}> 
                <Image src = { X } alt='X' />
                </button>
            </div>
            <a href="#">Brands</a>
            <a href="#">Categories</a>
            <a href="#">All Products</a>
            <a href="#">Contact Us</a>
            <div className='flex justify-center'>
              <button id='login' className=' font-sans border-solid border-black border-2 rounded-xl hover:bg-[#FF6726] ease-in-out transition-all hover:text-white text-lg w-[6vw] bg-white h-[4vh] mr-10' onClick={() => {
                document.getElementById('loginForm')?.setAttribute('style', 'display:block')
              }}>Login</button>
              <a href="/signup"><button className=' font-sans border-solid border-black border-2 rounded-xl text-lg bg-white w-[6vw] h-[4vh] hover:bg-[#FF6726] ease-in-out transition-all hover:text-white'>Sign-up</button></a>
              </div>
              <div className='left-0'>
            <SocialMedia />
            </div>
        </div>
    )
}