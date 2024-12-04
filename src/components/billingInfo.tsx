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
  const formOptions = { resolver: yupResolver(validationSchema) };
  const { register, handleSubmit, reset, formState } = useForm(formOptions);

  const submitFormB = async (data: any) => {
    const id = localStorage.getItem("id");
    const obj = {
      id: id,
      address: data.address,
      city: data.city,
      state: data.state,
      zip: data.zip,
    };
    const formData = JSON.stringify(obj);
    try {
      const req = await fetch(`${process.env.NEXT_PUBLIC_backend_Link}update`, {
        method: "POST",
        body: formData,
        headers: {
          "Content-Type": "application/json",
        },
      });
      const file = await req.json();
      console.log(file);
      window.location.reload();
    } catch (err: any) {
      setErrMessage(err);
    }
  };
  const submitFormB2 = async (data: any) => {
    const id = localStorage.getItem("id");
    const obj = {
      id: id,
      address: data.updateAddress,
      city: data.updateCity,
      state: data.updateState,
      zip: data.updateZip,
      index: index,
    };
    const formData = JSON.stringify(obj);
    try {
      const req = await fetch(
        `${process.env.NEXT_PUBLIC_backend_Link}updateAddress`,
        {
          method: "POST",
          body: formData,
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
      const file = await req.json();
      console.log(file);
      window.location.reload();
    } catch (err: any) {
      const submitFormB = async (data: any) => {
        const id = localStorage.getItem("id");
        const obj = {
          id: id,
          address: data.address,
          city: data.city,
          state: data.state,
          zip: data.zip,
        };
        const formData = JSON.stringify(obj);
        try {
          const req = await fetch(
            `${process.env.NEXT_PUBLIC_backend_Link}update`,
            {
              method: "POST",
              body: formData,
              headers: {
                "Content-Type": "application/json",
              },
            },
          );
          const file = await req.json();
          console.log(file);
          window.location.reload();
        } catch (err: any) {
          setErrMessage(err);
        }
      };
      const submitFormB2 = async (data: any) => {
        const id = localStorage.getItem("id");
        const obj = {
          id: id,
          address: data.updateAddress,
          city: data.updateCity,
          state: data.updateState,
          zip: data.updateZip,
          index: index,
        };
        const formData = JSON.stringify(obj);
        try {
          const req = await fetch(
            `${process.env.NEXT_PUBLIC_backend_Link}updateAddress`,
            {
              method: "POST",
              body: formData,
              headers: {
                "Content-Type": "application/json",
              },
            },
          );
          const file = await req.json();
          console.log(file);
          window.location.reload();
        } catch (err: any) {
          setErrMessage(err);
        }
      };
    }
  };

  const billingInfo = user.map((address: any) => {
    let index = -1;
    index++;
    return (
      <div className="flex bg-[#FFFBD6] p-10 justify-around border-4 rounded-md border-solid mb-3 border-[#353935]">
        <input id={`radio${index}`} type="radio" name={`radio`} value={index} />
        <label htmlFor={`${address.street}`}>
          <div className="flex flex-col">
            <h1 className="text-xl font-bold">{address.street}</h1>
            <p className="font-semibold">
              {address.city} {address.state}, {address.zip}
            </p>
          </div>
        </label>

        <button
          className=" bg-green-500 w-[100px] h-[50px] rounded-md mt-[-10px] hover:bg-[#353935] transition-all ease-in-out hover:text-white"
          onClick={() => {
            document
              .getElementById("updateBillInfo")
              ?.setAttribute("style", "display:flex");
            document
              .getElementById("addressUpdate")
              ?.setAttribute("value", address.street);
            document
              .getElementById("cityInputB")
              ?.setAttribute("value", address.city);
            document
              .getElementById("stateInputB")
              ?.setAttribute("value", address.state);
            document
              .getElementById("zipInputB")
              ?.setAttribute("value", address.zip);
            setIndex(index);
          }}
        >
          Edit
        </button>
        <button className=" bg-red-500 w-[100px] h-[50px] rounded-md mt-[-10px] hover:bg-[#353935] transition-all ease-in-out hover:text-white">
          Delete
        </button>
      </div>
    );
  });
  return (
    <div className=" border-b-2 border-black border-solid p-10" id="billing">
      <div className="flex w-[600px] justify-around">
        <h1 className="font-bold text-2xl">Billing Information</h1>
        <button
          onClick={() => {
            document
              .getElementById("createBillInfo")
              ?.setAttribute("style", "display:flex");
          }}
          className=" bg-[#F38015] w-[100px] h-[50px] rounded-md mt-[-10px] hover:bg-[#353935] transition-all ease-in-out hover:text-white"
        >
          Add Billing Option{" "}
        </button>
      </div>
      <form action="">
        <fieldset className="p-10">{billingInfo}</fieldset>
      </form>
      <form
        className="hidden flex-col"
        onSubmit={handleSubmit(submitFormB2)}
        id="updateBillInfo"
        action=""
      >
        <label htmlFor="">Address</label>
        <input type="text" {...register("updateAddress")} id="addressUpdate" />
        <label htmlFor="">City</label>
        <input type="text" {...register("updateCity")} id="cityInputB" />
        <label htmlFor="">State</label>
        <input type="text" id="stateInputB" {...register("updateState")} />
        <label htmlFor="">Zip Code:</label>
        <input type="text" {...register("updateZip")} id="zipInputB" />
        <div>
          <button
            className=" w-[100px] h-[40px] rounded-md bg-green-500 font-bold hover:bg-[#353935] transition-all ease-in-out hover:text-white"
            type="submit"
            id="submitNewAddress"
          >
            Enter
          </button>
          <button type='reset' onClick={()=> {
           document
           .getElementById("createBillInfo")
           ?.setAttribute("style", "display:hidden");
          }} className=" w-[100px] h-[40px] rounded-md bg-red-500 font-bold hover:bg-[#353935] transition-all ease-in-out hover:text-white">
            Cancel
          </button>
        </div>
      </form>

      <form
        className="hidden flex-col"
        onSubmit={handleSubmit(submitFormB)}
        id="createBillInfo"
        action=""
      >
        <label htmlFor="">Address</label>
        <input type="text" {...register("address")} id="addressInput" />
        <label htmlFor="">City</label>
        <input type="text" {...register("city")} id="cityInput" />
        <label htmlFor="">State</label>
        <input type="text" id="stateInput" {...register("state")} />
        <label htmlFor="">Zip Code:</label>
        <input type="text" {...register("zip")} id="zipInput" />
        <div>
          <button
            className=" w-[100px] h-[40px] rounded-md bg-green-500 font-bold hover:bg-[#353935] transition-all ease-in-out hover:text-white"
            type="submit"
            id="submitNewAddress"
          >
            Enter
          </button>
          <button className=" w-[100px] h-[40px] rounded-md bg-red-500 font-bold hover:bg-[#353935] transition-all ease-in-out hover:text-white">
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
