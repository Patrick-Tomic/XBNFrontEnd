'use client'
import { useEffect, useState } from "react";
import { set, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import Header from "@/components/header";
import { get } from "http";
import BillingDetails from "@/components/billingInfo";
export default function UserPage() {
    const [admin, setAdmin] = useState(false);
    const [error, setError] = useState("");
 
    const [errMessage, setErrMessage] = useState("");
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
        newPassword: Yup.string(),
        payment: Yup.array(),
        purchaseHistory: Yup.array(),
    })
    const formOptions = {resolver: yupResolver(validationSchema)}
    const {register, handleSubmit, reset, formState} = useForm(formOptions)
    const submitFormA1 = async(data: any) => {
        const id = localStorage.getItem('id')  
            const obj = {id:id , password: data.password}
            let formData = JSON.stringify(obj)
        
            try {
                const req = await fetch(`${process.env.NEXT_PUBLIC_backend_Link}verify`  , {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                const file = await req.json()
                if(!file.bool){
                    setErrMessage("Incorrect Password")
                }
                else{
                    document.getElementById('userInfoForm')?.setAttribute('style', 'display:none');
                    document.getElementById('updatePassword')?.setAttribute('style', 'display:flex; flex-direction:column');
                }
            }
            catch(err){
                console.log(err)
            }
}
const submitFormA2 = async(data: any) => {
    const id = localStorage.getItem('id')  
        const obj = {id:id , password: data.newPassword, user: user}
        let formData = JSON.stringify(obj)
        try {
            const req = await fetch(`${process.env.NEXT_PUBLIC_backend_Link}update`  , {
                method: 'POST',
                body: formData,
                headers: {
                    'Content-Type': 'application/json'
                }
            })
           const file = await req.json()
           console.log(file)
        }
        catch(err){
            console.log(err)
        }

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
    }, []);
    const purchaseHistory = user.purchaseHistory.map((purchase: any) => {
        const objects = purchase.order.map((item: any) => {
            return(
                <div>
                    <div className="flex w-32">
                        <p>{item.product}</p>
                        <p>{item.brand}</p>
                    </div>
                    <div className="flex w-32">
                        <p>{item.price}</p> -
                        <p>{item.quantity}</p>
                </div>
                </div>
            )
        })
        return(
            <div className="flex">
                <h1>{purchase.date}</h1>
            <div id="items">
                {objects}
            </div>
            <h1>Price: {purchase.price}</h1>
            </div>
        )
    })
    
    return(
        <>
        <Header />
        <main className="grid grid-cols-3 p-0 h-[100%]">
            <div className="flex flex-col bg-[#353935] col-span-1 h-[100vh] text-white p-10">
                <div id="userInfo" className="flex flex-col">
                    <h2 className="font-bold text-2xl">User Information</h2>
                    <a href="#purchase">Purchase History</a>
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
            <div className="flex flex-col col-span-2 p-0" id="settingContent">
          {/* need to create second form of authentication through email */}
            <div className="flex flex-col border-b-4 border-solid border-black" id="UpdatePasswordDiv">
                    <div className="flex justify-around w-[600px] p-10">
                        <h1 className=" font-bold text-2xl">Hello {user.firstName}</h1>
                        <button id="updateBtn" onClick={() => {
                            document.getElementById('updateBtn')?.setAttribute('style', 'display:none');
                            document.getElementById('passwordResetConfirm')?.setAttribute('style', 'display:block');
               
                            document.getElementById('password')?.removeAttribute('readOnly');
                        }} className=" bg-[#F38015] w-[100px] h-[50px] rounded-md mt-[-10px] hover:bg-[#353935] transition-all ease-in-out hover:text-white">
                            Update Password
                        </button>
                        </div>
                        <div>
                        <form action="" onSubmit={handleSubmit(submitFormA1)} className="flex flex-col p-5" id="userInfoForm">
                            
                                <label className="text-xl font-bold" htmlFor="email">Email:</label>
                                <input className="text-xl border-2 p-1 rounded-md" type="email" id="email" {...register('email')} value={user.email} readOnly/>
                                <label htmlFor="password">Password</label>
                                <input className="text-xl border-2 p-1 rounded-md" type="password" {...register('password')} id="password"  readOnly/>
                                <button className="hidden w-[100px] h-[40px] rounded-md bg-green-500 font-bold hover:bg-[#353935] transition-all ease-in-out hover:text-white" type="submit" id="passwordResetConfirm">Enter</button>
                            </form>
                            <form action="" onSubmit={handleSubmit(submitFormA2)} id="updatePassword" className="hidden flex-col">
                                <label htmlFor="resetPassword">Enter New Password</label>
                                <input className="text-xl border-2 p-1 rounded-md" type="password"  {...register('newPassword')} id="newPassword" />
                                <button className="hidden w-[100px] h-[40px] rounded-md bg-green-500 font-bold hover:bg-[#353935] transition-all ease-in-out hover:text-white" type="submit" id="resetPasswordSubmit">Enter</button>
                            </form>
                            </div>
                </div>
            <div id="purchase">

            </div>
           <BillingDetails user={user} />
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
                
                <div id="payment">

                </div>
                <div id="purchaseHistory">

                </div>
                
            </div>
        </main>
        </>
    )
}

