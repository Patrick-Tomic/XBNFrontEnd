'use client'
import { useEffect, useState } from "react";
import { set, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import Header from "@/components/header";
export default function UserPage() {
    const [admin, setAdmin] = useState(false);
    const [user, setUser] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        address: [],
        payment: [],
        purchaseHistory: [],
        cart: {}
    })
    const validationSchema = Yup.object().shape({
        email: Yup.string(),
        password: Yup.string(),
        address: Yup.array(),
        payment: Yup.array(),
        purchaseHistory: Yup.array()
    })
    const formOptions = {resolver: yupResolver(validationSchema)}
    const {register, handleSubmit, reset, formState} = useForm(formOptions)
    const submitForm = async(data: any) => {
        const id = localStorage.getItem('id')  
        document.getElementById('passwordReset')?.addEventListener('click', async() => {
            const obj = {id:id , password: data.password}
            const formData = JSON.stringify(obj)
            try {
                const req = await fetch(`${process.env.NEXT_PUBLIC_backend_Link}verify`, {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
            }
            catch(err){
                console.log(err)
            }
    })
}
    useEffect(() => {
        (async() => {
           const id = localStorage.getItem("id")
                const user = await fetch(`${process.env.NEXT_PUBLIC_backend_Link}user/${id}`);
            const data = await user.json();
            setUser(data.user);
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
    });
    const [errMessage, setErrMessage] = useState("");
    return(
        <>
        <Header />
        <main className="grid grid-cols-3 p-0 h-[100%]">
            <div className="flex flex-col bg-[#353935] col-span-1 h-[100vh] text-white p-10">
                <div id="userInfo" className="flex flex-col">
                    <h2 className="font-bold text-2xl">User Information</h2>
                    <a href="#">Purchase History</a>
                    <a href="#billing">Billing Information</a>
                    <a href="#payment">Payment Methods</a>
                </div>
                <div id="admin" className="flex flex-col">
                <h2 className="font-bold text-2xl">Admin</h2>
                    <a href="#inventory">Inventory</a>
                    <a href="Tools">Tools</a>
                    <a href="FAQ">FAQ</a>
                </div>
            </div>
            <div className="flex flex-col col-span-2 p-10" id="settingContent">
            <div className="flex flex-col">
                    <div className="flex justify-around w-[600px]">
                        <h1 className=" font-bold text-2xl">Hello {user.firstName}</h1>
                       
                        <button id="updateBtn" onClick={() => {
                            document.getElementById('updateBtn')?.setAttribute('style', 'display:none');
                            document.getElementById('passwordReset')?.setAttribute('style', 'display:block');
               
                            document.getElementById('password')?.removeAttribute('readonly');
                        }} className=" bg-[#F38015] w-[100px] h-[50px] rounded-md mt-1 hover:bg-[#353935] transition-all ease-in-out hover:text-white">
                            Update Password
                        </button>
                        </div>
                        <form action="" onSubmit={handleSubmit(submitForm)} className="flex flex-col " id="userInfo">
                            
                                <label htmlFor="email">Email</label>
                                <input type="email" id="email" {...register('email')} value={user.email} readOnly/>
                                <label htmlFor="password">Password</label>
                                <input type="password" {...register('password')} id="password" placeholder="*********" value={user.password} readOnly/>
                                <button className="hidden border-2 border-black border-solid bg-green-500 w-[10vw]" type="submit" id="passwordReset">Enter</button>
                            </form>
                        
                   

                </div>
            <div id="adminDiv">
                    <div id="inventory">

                    </div>
                    <div id="tools">

                    </div>
                    <div id="faq">

                    </div>
                </div>
                <div id="userInfo">

                </div>
                <div id="billing">

                </div>
                <div id="payment">

                </div>
                <div id="purchaseHistory">

                </div>
                
            </div>
        </main>
        </>
    )
}

