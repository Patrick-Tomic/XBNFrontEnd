"use client";
import React from "react";
import InputSection from "./input";

const selectCls = "bg-[#1a1a1a] border border-[#2a2a2a] focus:border-[#ff4d00] outline-none text-[#e5e5e5] rounded-lg px-4 py-2.5 text-sm transition-colors w-full";
const labelCls = "text-[#a3a3a3] text-xs uppercase tracking-widest font-medium";
const inlineBtnCls = "text-[#a3a3a3] hover:text-[#ff4d00] text-sm transition-colors underline";
const submitBtnCls = "mt-4 bg-[#ff4d00] hover:bg-[#ff6b2b] text-white font-bold px-6 py-2.5 rounded-lg transition-colors text-sm";
const smallInputCls = "bg-[#1a1a1a] border border-[#2a2a2a] focus:border-[#ff4d00] outline-none text-[#e5e5e5] rounded-lg px-3 py-2 text-sm transition-colors";
const addEntryBtnCls = "bg-[#1e1e1e] hover:bg-[#2a2a2a] text-[#e5e5e5] text-xs font-medium px-3 py-1.5 rounded-lg border border-[#2a2a2a] transition-colors";

export default function AdminCreate({
  onChange,
  _id,
  typeForm,
  addFlavor,
  product,
  price,
  flavors,
  stock,
  type,
  name,
  summary,
  brand,
  category,
  images,
  brands,
  categories,
  addImage,
  onSubmit,
}: any) {
  const optionBrands = brands.map((b: any) => <option key={b.name} value={b.name}>{b.name}</option>);
  const optionCat = categories.map((c: any) => <option key={c.type} value={c.type}>{c.type}</option>);

  const flavorList = flavors.map((flavor: any) => (
    <span key={flavor} className="bg-[#1e1e1e] text-[#e5e5e5] text-xs px-2 py-1 rounded border border-[#2a2a2a]">
      {flavor}
    </span>
  ));

  const imageList = images.map((img: any) => (
    <p key={img} className="text-[#a3a3a3] text-xs break-all">{img}</p>
  ));

  const brandForm = (
    <form className="flex flex-col gap-2">
      <InputSection type="text" placeholder="" value={name} text="Brand Name" onChange={onChange} dataKey="name" />
      <button className={submitBtnCls} onClick={onSubmit} type="button">Save</button>
    </form>
  );

  const categoryForm = (
    <form className="flex flex-col gap-2">
      <InputSection type="text" placeholder="" value={category} text="Category Name" onChange={onChange} dataKey="category" />
      <button className={submitBtnCls} onClick={onSubmit} type="button">Save</button>
    </form>
  );

  const itemForm = (
    <form className="flex flex-col gap-1">
      <InputSection type="text" placeholder="" value={product} text="Product Name" onChange={onChange} dataKey="product" />
      <InputSection type="number" placeholder="" value={price} text="Price" onChange={onChange} dataKey="price" />

      <div className="flex flex-col gap-1.5 py-3">
        <label className={labelCls}>Brand</label>
        <select value={brand} onChange={onChange} name="brand" data-key="brand" className={selectCls}>
          {optionBrands}
        </select>
      </div>

      <div className="flex flex-col gap-1.5 py-3 border-t border-[#2a2a2a]">
        <label className={labelCls}>Flavors</label>
        <div className="flex flex-wrap gap-2 mb-2">{flavorList}</div>
        <button type="button" className={inlineBtnCls}
          onClick={() => document.getElementById("newFlavorDiv")?.classList.toggle("hidden")}>
          + Add Flavor
        </button>
        <p className="text-red-400 text-xs hidden" id="flavorError">Please enter a flavor</p>
        <div className="hidden flex gap-2 mt-1" id="newFlavorDiv">
          <input className={smallInputCls} type="text" id="newFlavor" />
          <button type="button" className={addEntryBtnCls}
            onClick={() => {
              const newFlavor: any = document.getElementById("newFlavor");
              if (newFlavor.value === "") {
                document.getElementById("flavorError")?.classList.remove("hidden");
                return;
              }
              document.getElementById("flavorError")?.classList.add("hidden");
              addFlavor(newFlavor.value);
              newFlavor.value = "";
              document.getElementById("newFlavorDiv")?.classList.add("hidden");
            }}>
            Add
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-1.5 py-3">
        <label className={labelCls}>Category</label>
        <select value={category} onChange={onChange} name="category" data-key="category" className={selectCls}>
          {optionCat}
        </select>
      </div>

      <InputSection onChange={onChange} type="number" value={stock} text="Stock" placeholder="" dataKey="stock" />

      <div className="flex flex-col gap-1.5 py-3 border-t border-[#2a2a2a]">
        <label className={labelCls}>Summary</label>
        <textarea
          className="bg-[#1a1a1a] border border-[#2a2a2a] focus:border-[#ff4d00] outline-none text-[#e5e5e5] rounded-lg px-4 py-2.5 text-sm transition-colors w-full resize-y"
          name="summary" data-key="summary" onChange={onChange} rows={6}
        >
          {summary}
        </textarea>
      </div>

      <div className="flex flex-col gap-1.5 py-3 border-t border-[#2a2a2a]">
        <label className={labelCls}>Images</label>
        <div className="flex flex-col gap-1 mb-2">{imageList}</div>
        <button type="button" className={inlineBtnCls}
          onClick={() => document.getElementById("newImageDiv")?.classList.toggle("hidden")}>
          + Add Image URL
        </button>
        <p className="text-red-400 text-xs hidden" id="imageError">Please enter an image URL</p>
        <div className="hidden flex gap-2 mt-1" id="newImageDiv">
          <input className={`${smallInputCls} flex-1`} type="text" id="newImage" />
          <button type="button" className={addEntryBtnCls}
            onClick={() => {
              const newImage: any = document.getElementById("newImage");
              if (newImage.value === "") {
                document.getElementById("imageError")?.classList.remove("hidden");
                return;
              }
              document.getElementById("imageError")?.classList.add("hidden");
              addImage(newImage.value);
              newImage.value = "";
              document.getElementById("newImageDiv")?.classList.add("hidden");
            }}>
            Add
          </button>
        </div>
      </div>

      <button className={submitBtnCls} onClick={onSubmit} type="button">Save Product</button>
    </form>
  );

  let form: any = <></>;
  if (typeForm === "item") form = itemForm;
  else if (typeForm === "category") form = categoryForm;
  else if (typeForm === "brand") form = brandForm;

  return (
    <div
      id="formCreate"
      className="fixed hidden z-[20] bg-[#111111] border border-[#2a2a2a] rounded-2xl left-[15%] top-[8%] w-[70%] p-10 shadow-[0_8px_40px_rgba(0,0,0,0.8)] overflow-y-auto max-h-[85vh]"
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-[#e5e5e5] font-bold text-lg">
          {typeForm === "item" ? "Add Product" : typeForm === "brand" ? "Add Brand" : "Add Category"}
        </h2>
        <button
          onClick={() => {
            document.getElementById("formCreate")?.setAttribute("style", "display:none");
            document.querySelectorAll("input").forEach((i) => { i.value = ""; });
          }}
          className="text-[#a3a3a3] hover:text-[#ff4d00] font-bold text-xl transition-colors"
        >
          ✕
        </button>
      </div>
      {form}
    </div>
  );
}
