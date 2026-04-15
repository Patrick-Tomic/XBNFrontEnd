"use client";
import logo from "/public/xbn.png";
import Image from "next/image";
import { useEffect, useState } from "react";
import AdminCreate from "./adminCreate";
import AdminUpdate from "./adminUpdate";

export default function AdminDashboard() {
  const [products, setProducts] = useState([]);
  const [brands, setBrands] = useState([]);
  const [categories, setCategories] = useState([]);
  const [option, setOption] = useState("item");
  const [form, setForm] = useState("none");
  const [expandedSummary, setExpandedSummary] = useState<string | null>(null);
  const [expandedFlavors, setExpandedFlavors] = useState<string | null>(null);
  const [newItem, setNewItem] = useState({
    product: "",
    price: "",
    brand: "",
    category: "",
    summary: "",
    flavors: [],
    stock: "",
    images: [],
    _id: "",
  });

  function handleItemChange(e: { target: { dataset: { key: any }; value: any } }) {
    const { key } = e.target.dataset;
    setNewItem({ ...newItem, [key]: e.target.value });
  }
  function handleAddFlavor(e: any) {
    const flavors: any = [...newItem.flavors];
    flavors.push(e);
    setNewItem({ ...newItem, flavors });
  }
  function handleAddImage(e: any) {
    const images: any = [...newItem.images];
    images.push(e);
    setNewItem({ ...newItem, images });
  }

  const resetItem = () =>
    setNewItem({ product: "", price: "", brand: "", category: "", summary: "", flavors: [], stock: "", images: [], _id: "" });

  const submitForm = async () => {
    if (form === "item") {
      let formData = JSON.stringify(newItem);
      if (option === "brand") formData = JSON.stringify({ name: newItem.brand, type: "brand" });
      else if (option === "category") formData = JSON.stringify({ name: newItem.category, type: "category" });
      try {
        const req = await fetch(`${process.env.NEXT_PUBLIC_backend_Link}addOption`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: formData,
        });
        if (req.status === 200) window.location.reload();
      } catch (err) { console.log(err); }
    } else {
      try {
        const req = await fetch(`${process.env.NEXT_PUBLIC_backend_Link}updateItem/${newItem._id}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newItem),
        });
        if (req.status === 200) window.location.reload();
      } catch (err) { console.log(err); }
    }
  };

  const deleteItem = async (id: string) => {
    try {
      const req = await fetch(`${process.env.NEXT_PUBLIC_backend_Link}deleteItem/${id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      if (req.status === 200) window.location.reload();
    } catch (err) { console.log(err); }
  };

  const deleteBrand = async (id: string) => {
    try {
      const req = await fetch(`${process.env.NEXT_PUBLIC_backend_Link}deleteBrand/${id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      if (req.status === 200) window.location.reload();
    } catch (err) { console.log(err); }
  };

  const deleteCategory = async (id: string) => {
    try {
      const req = await fetch(`${process.env.NEXT_PUBLIC_backend_Link}deleteCategory/${id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      if (req.status === 200) window.location.reload();
    } catch (err) { console.log(err); }
  };

  useEffect(() => {
    const exitForm: any = document.querySelector("#exitForm");
    exitForm?.addEventListener("click", resetItem);

    const fetchItems = async () => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_backend_Link}allitems`);
      const data = await res.json();
      setProducts(data.items);
    };
    const fetchCategories = async () => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_backend_Link}categories`);
      const data = await res.json();
      setCategories(data.categories);
    };
    const fetchBrands = async () => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_backend_Link}brands`);
      const data = await res.json();
      setBrands(data.brands);
    };
    fetchItems();
    fetchCategories();
    fetchBrands();
  }, []);

  const tabLabel = option === "item" ? "Product" : option === "brand" ? "Brand" : "Category";

  return (
    <div className="bg-[#0a0a0a] min-h-screen">
      {/* Header */}
      <header className="bg-[#111111] border-b border-[#2a2a2a] px-8 py-4 flex items-center justify-between sticky top-0 z-10">
        <div className="flex items-center gap-8">
          <Image className="w-14" src={logo} alt="Logo" />
          <nav className="flex gap-1">
            {[
              { label: "Products", value: "item" },
              { label: "Brands", value: "brand" },
              { label: "Categories", value: "category" },
            ].map((tab) => (
              <button
                key={tab.value}
                onClick={() => setOption(tab.value)}
                className={`px-5 py-2 rounded-lg text-sm font-semibold transition-colors ${
                  option === tab.value
                    ? "bg-[#ff4d00] text-white"
                    : "text-[#a3a3a3] hover:text-white hover:bg-[#1e1e1e]"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>
        <button
          onClick={() => {
            setForm("item");
            document.getElementById("formCreate")?.setAttribute("style", "display:block");
          }}
          className="bg-[#ff4d00] hover:bg-[#ff6b2b] text-white font-bold px-6 py-2 rounded-lg transition-colors text-sm"
        >
          + Add {tabLabel}
        </button>
      </header>

      <main className="px-8 py-8 max-w-7xl mx-auto w-full">
        {/* How-to video */}
        <div className="mb-8 bg-[#111111] border border-[#2a2a2a] rounded-xl p-6 flex flex-col gap-3">
          <p className="text-[#a3a3a3] text-xs uppercase tracking-widest font-semibold">How to add a product</p>
          <video className="rounded-lg w-full max-w-lg" controls>
            <source src="/adminCreate.mp4" type="video/mp4" />
          </video>
        </div>

        <AdminCreate
          typeForm={option}
          onChange={handleItemChange}
          addFlavor={handleAddFlavor}
          product={newItem.product}
          price={newItem.price}
          flavors={newItem.flavors}
          stock={newItem.stock}
          type={newItem.category}
          name={newItem.brand}
          summary={newItem.summary}
          brands={brands}
          categories={categories}
          images={newItem.images}
          _id={newItem._id}
          addImage={handleAddImage}
          onSubmit={submitForm}
        />
        <AdminUpdate
          onChange={handleItemChange}
          addFlavor={handleAddFlavor}
          product={newItem.product}
          _id={newItem._id}
          price={newItem.price}
          flavors={newItem.flavors}
          stock={newItem.stock}
          summary={newItem.summary}
          brand={newItem.brand}
          category={newItem.category}
          images={newItem.images}
          brands={brands}
          categories={categories}
          addImage={handleAddImage}
          onSubmit={submitForm}
        />

        {/* Products Table */}
        {option === "item" && (
          <div className="bg-[#111111] border border-[#2a2a2a] rounded-xl ">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[#2a2a2a]">
                  {["Image", "Product", "Price", "Brand", "Flavors", "Stock", "Summary", "Actions"].map((col) => (
                    <th key={col} className="text-left text-[#a3a3a3] text-xs uppercase tracking-widest font-semibold px-5 py-4">
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {(products as any[]).map((item: any) => (
                  <tr key={item._id} className="border-b border-[#1e1e1e] hover:bg-[#161616] transition-colors">
                    <td className="px-5 py-4">
                      <img src={item.images[0]} alt={item.product} className="w-14 h-14 object-contain rounded-lg bg-[#0f0f0f]" />
                    </td>
                    <td className="px-5 py-4 text-white font-medium text-sm">{item.product}</td>
                    <td className="px-5 py-4 text-[#ff4d00] font-bold text-sm">${item.price}</td>
                    <td className="px-5 py-4 text-[#a3a3a3] text-sm">{item.brand?.name}</td>
                    <td className="px-5 py-4">
                      {item.flavors?.length > 0 ? (
                        <div>
                          <button
                            onClick={() => setExpandedFlavors(expandedFlavors === item._id ? null : item._id)}
                            className="text-[#a3a3a3] hover:text-[#ff4d00] text-xs underline transition-colors"
                          >
                            {expandedFlavors === item._id ? "Hide" : `${item.flavors.length} flavor${item.flavors.length !== 1 ? "s" : ""}`}
                          </button>
                          {expandedFlavors === item._id && (
                            <div className="mt-1 flex flex-wrap gap-1">
                              {item.flavors.map((f: string) => (
                                <span key={f} className="bg-[#1e1e1e] text-[#a3a3a3] text-xs px-2 py-0.5 rounded">{f}</span>
                              ))}
                            </div>
                          )}
                        </div>
                      ) : (
                        <span className="text-[#3a3a3a] text-xs">—</span>
                      )}
                    </td>
                    <td className="px-5 py-4 text-[#a3a3a3] text-sm">{item.stock}</td>
                    <td className="px-5 py-4 max-w-[200px]">
                      <button
                        onClick={() => setExpandedSummary(expandedSummary === item._id ? null : item._id)}
                        className="text-[#a3a3a3] hover:text-[#ff4d00] text-xs underline transition-colors"
                      >
                        {expandedSummary === item._id ? "Collapse" : "View"}
                      </button>
                      {expandedSummary === item._id && (
                        <p className="mt-1 text-[#a3a3a3] text-xs leading-relaxed">{item.summary}</p>
                      )}
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex gap-2">
                        <button
                          onClick={async () => {
                            const res = await fetch(`${process.env.NEXT_PUBLIC_backend_Link}product/${item._id}`);
                            const data = await res.json();
                            const p = data.product;
                            setNewItem(p);
                            setForm("update");
                            document.getElementById("formUpdate")?.setAttribute("style", "display:block");
                            if (p.flavors.length === 0) {
                              document.getElementById("flavorSelect")?.setAttribute("style", "display:none");
                            }
                          }}
                          className="px-3 py-1.5 bg-[#1e1e1e] hover:bg-[#2a2a2a] text-[#60a5fa] text-xs font-semibold rounded-lg border border-[#2a2a2a] transition-colors"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => deleteItem(item._id)}
                          className="px-3 py-1.5 bg-[#1e1e1e] hover:bg-red-900/40 text-red-400 text-xs font-semibold rounded-lg border border-[#2a2a2a] transition-colors"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {products.length === 0 && (
              <div className="text-center text-[#3a3a3a] py-16 text-sm">No products found.</div>
            )}
          </div>
        )}

        {/* Brands List */}
        {option === "brand" && (
          <div className="bg-[#111111] border border-[#2a2a2a] rounded-xl overflow-hidden">
            <div className="border-b border-[#2a2a2a] px-6 py-4 flex">
              <span className="text-[#a3a3a3] text-xs uppercase tracking-widest font-semibold flex-1">Brand Name</span>
              <span className="text-[#a3a3a3] text-xs uppercase tracking-widest font-semibold">Actions</span>
            </div>
            {(brands as any[]).map((brand: any) => (
              <div key={brand._id} className="flex items-center px-6 py-4 border-b border-[#1e1e1e] hover:bg-[#161616] transition-colors">
                <h2 className="text-white font-medium flex-1">{brand.name}</h2>
                <button
                  onClick={() => deleteBrand(brand._id)}
                  className="px-3 py-1.5 bg-[#1e1e1e] hover:bg-red-900/40 text-red-400 text-xs font-semibold rounded-lg border border-[#2a2a2a] transition-colors"
                >
                  Delete
                </button>
              </div>
            ))}
            {brands.length === 0 && (
              <div className="text-center text-[#3a3a3a] py-16 text-sm">No brands found.</div>
            )}
          </div>
        )}

        {/* Categories List */}
        {option === "category" && (
          <div className="bg-[#111111] border border-[#2a2a2a] rounded-xl overflow-hidden">
            <div className="border-b border-[#2a2a2a] px-6 py-4 flex">
              <span className="text-[#a3a3a3] text-xs uppercase tracking-widest font-semibold flex-1">Category Name</span>
              <span className="text-[#a3a3a3] text-xs uppercase tracking-widest font-semibold">Actions</span>
            </div>
            {(categories as any[]).map((category: any) => (
              <div key={category._id} className="flex items-center px-6 py-4 border-b border-[#1e1e1e] hover:bg-[#161616] transition-colors">
                <h2 className="text-white font-medium flex-1">{category.type}</h2>
                <button
                  onClick={() => deleteCategory(category._id)}
                  className="px-3 py-1.5 bg-[#1e1e1e] hover:bg-red-900/40 text-red-400 text-xs font-semibold rounded-lg border border-[#2a2a2a] transition-colors"
                >
                  Delete
                </button>
              </div>
            ))}
            {categories.length === 0 && (
              <div className="text-center text-[#3a3a3a] py-16 text-sm">No categories found.</div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
