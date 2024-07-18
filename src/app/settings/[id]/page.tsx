'use client'
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import Header from "@/components/header";
export default function UserPage() {
    const [admin, setAdmin] = useState(false);

    useEffect(() => {
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
        <main className="grid grid-cols-3 p-0">
            <div className="flex flex-col bg-[#353935] text-white p-10">
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
            <div className="flex flex-col col-span-2" id="settingContent">
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
    
    
                
