import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

export default function BillingDetails({ user }: any) {
  const [index, setIndex] = useState(0);
  const [errMessage, setErrMessage] = useState("");

  const validationSchema = Yup.object().shape({
    address: Yup.string(),
    city: Yup.string(),
    state: Yup.string(),
    zip: Yup.string(),
    updateAddress: Yup.string(),
    updateCity: Yup.string(),
    updateState: Yup.string(),
    updateZip: Yup.string(),
    index: Yup.number(),
  });
  const { register, handleSubmit } = useForm({ resolver: yupResolver(validationSchema) });

  const submitFormB = async (data: any) => {
    const id = localStorage.getItem("id");
    try {
      await fetch(`${process.env.NEXT_PUBLIC_backend_Link}update`, {
        method: "POST",
        body: JSON.stringify({ id, address: data.address, city: data.city, state: data.state, zip: data.zip }),
        headers: { "Content-Type": "application/json" },
      });
      window.location.reload();
    } catch (err: any) {
      setErrMessage(err);
    }
  };

  const submitFormB2 = async (data: any) => {
    const id = localStorage.getItem("id");
    try {
      await fetch(`${process.env.NEXT_PUBLIC_backend_Link}updateAddress`, {
        method: "POST",
        body: JSON.stringify({ id, address: data.updateAddress, city: data.updateCity, state: data.updateState, zip: data.updateZip, index }),
        headers: { "Content-Type": "application/json" },
      });
      window.location.reload();
    } catch (err: any) {
      setErrMessage(err);
    }
  };

  const inputClass = "bg-[#1a1a1a] border border-[#2a2a2a] focus:border-[#ff4d00] outline-none text-white rounded-lg px-4 py-3 text-sm transition-colors";
  const labelClass = "text-[#a3a3a3] text-xs uppercase tracking-widest font-medium";
  const btnGreen = "px-4 py-2 bg-[#22c55e] hover:bg-[#16a34a] text-white font-semibold rounded-lg transition-colors text-sm";
  const btnRed = "px-4 py-2 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-lg transition-colors text-sm";
  const btnOrange = "px-4 py-2 bg-[#ff4d00] hover:bg-[#ff6b2b] text-white font-semibold rounded-lg transition-colors text-sm";

  const billingCards = user.map((address: any, i: number) => (
    <div key={i} className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl p-5 flex items-center justify-between hover:border-[#3a3a3a] transition-colors">
      <div className="flex items-center gap-4">
        <input type="radio" name="radio" value={i} className="accent-[#ff4d00]" />
        <div className="flex flex-col">
          <p className="text-white font-semibold text-sm">{address.street}</p>
          <p className="text-[#a3a3a3] text-xs mt-0.5">{address.city}, {address.state} {address.zip}</p>
        </div>
      </div>
      <div className="flex gap-2">
        <button
          className={btnGreen}
          onClick={() => {
            document.getElementById("updateBillInfo")?.setAttribute("style", "display:flex");
            document.getElementById("addressUpdate")?.setAttribute("value", address.street);
            document.getElementById("cityInputB")?.setAttribute("value", address.city);
            document.getElementById("stateInputB")?.setAttribute("value", address.state);
            document.getElementById("zipInputB")?.setAttribute("value", address.zip);
            setIndex(i);
          }}
        >
          Edit
        </button>
        <button className={btnRed}>Delete</button>
      </div>
    </div>
  ));

  const formFields = (prefix: string, ids: { address: string; city: string; state: string; zip: string }) => (
    <div className="grid grid-cols-2 gap-4">
      <div className="col-span-2 flex flex-col gap-1">
        <label className={labelClass}>Address</label>
        <input type="text" {...register(prefix === "" ? "address" : "updateAddress")} id={ids.address} className={inputClass} />
      </div>
      <div className="flex flex-col gap-1">
        <label className={labelClass}>City</label>
        <input type="text" {...register(prefix === "" ? "city" : "updateCity")} id={ids.city} className={inputClass} />
      </div>
      <div className="flex flex-col gap-1">
        <label className={labelClass}>State</label>
        <input type="text" {...register(prefix === "" ? "state" : "updateState")} id={ids.state} className={inputClass} />
      </div>
      <div className="flex flex-col gap-1">
        <label className={labelClass}>ZIP</label>
        <input type="text" {...register(prefix === "" ? "zip" : "updateZip")} id={ids.zip} className={inputClass} />
      </div>
    </div>
  );

  return (
    <div className="bg-[#111111] border border-[#2a2a2a] rounded-2xl p-8" id="billing">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-white text-xl font-bold">Billing Information</h2>
        <button
          className={btnOrange}
          onClick={() => {
            document.getElementById("createBillInfo")?.setAttribute("style", "display:flex");
          }}
        >
          Add Address
        </button>
      </div>

      <div className="flex flex-col gap-3 mb-6">
        {billingCards}
      </div>

      {/* Update form */}
      <form
        className="hidden flex-col gap-4 bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl p-6"
        onSubmit={handleSubmit(submitFormB2)}
        id="updateBillInfo"
      >
        <h3 className="text-white font-semibold">Edit Address</h3>
        {formFields("update", { address: "addressUpdate", city: "cityInputB", state: "stateInputB", zip: "zipInputB" })}
        <div className="flex gap-3 mt-2">
          <button className={btnGreen} type="submit" id="submitNewAddress">Save</button>
          <button
            type="reset"
            className={btnRed}
            onClick={() => {
              document.getElementById("updateBillInfo")?.setAttribute("style", "display:none");
            }}
          >
            Cancel
          </button>
        </div>
      </form>

      {/* Create form */}
      <form
        className="hidden flex-col gap-4 bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl p-6"
        onSubmit={handleSubmit(submitFormB)}
        id="createBillInfo"
      >
        <h3 className="text-white font-semibold">Add New Address</h3>
        {formFields("", { address: "addressInput", city: "cityInput", state: "stateInput", zip: "zipInput" })}
        <div className="flex gap-3 mt-2">
          <button className={btnGreen} type="submit">Save</button>
          <button type="reset" className={btnRed}>Cancel</button>
        </div>
      </form>
    </div>
  );
}
