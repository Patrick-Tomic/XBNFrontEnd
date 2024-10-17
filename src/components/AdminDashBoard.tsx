
import logo from "/public/xbn.png";
import Image from "next/image";
import { useEffect, useState } from "react";
import { set, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import AdminCreate from "./adminCreate";
import AdminUpdate from "./adminUpdate";
export default function AdminDashboard() {
  const [reload, setReload] = useState("");
  const [products, setProducts] = useState([]);
  const [brands, setBrands] = useState([]);
  const [categories, setCategories] = useState([]);
  const [option, setOption] = useState("item");
  const [flavors, setFlavors] = useState(["huh"]);
  const [form, setForm] = useState("none");
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
  

  function handleItemChange(e: {
    target: { dataset: { key: any }; value: any };
  }) {
    if (e.target.dataset.key === "flavors") {
      console.log(newItem.flavors);
    }
    const { key } = e.target.dataset;
    setNewItem({ ...newItem, [key]: e.target.value });
  }
  function handleAddFlavor(e: any) {
    const flavors: any = newItem.flavors;
    flavors.push(e);

    setNewItem({ ...newItem, flavors: flavors });
  }
  function handleAddImage(e: any) {
    const images: any = newItem.images;
    images.push(e);
    setNewItem({ ...newItem, images: images });
  }

  const submitForm = async (e: any) => {
    if (form === "item") {
      let formData = JSON.stringify(newItem);
      if (option === "item") {
        //already completed for us
      } else if (option === "brand") {
        formData = JSON.stringify({ name: newItem.brand, type: "brand" });
      } else if (option === "category") {
        formData = JSON.stringify({ name: newItem.category, type: "category" });
        console.log(formData);
      }
      try {
        const req = await fetch(
          `${process.env.NEXT_PUBLIC_backend_Link}addOption`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: formData,
          },
        );
        const file = await req.json();
        if (req.status !== 200) {
          return;
        } else {
          window.location.reload();
        }
      } catch (err) {
        console.log(err);
      }
    } else {
      const formData = JSON.stringify(newItem);

      try {
        const req = await fetch(
          `${process.env.NEXT_PUBLIC_backend_Link}updateItem/${newItem._id}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: formData,
          },
        );
        const file = await req.json();
        if (req.status !== 200) {
          return;
        } else {
          window.location.reload();
        }
      } catch (err) {
        console.log(err);
      }
    }
  };

  useEffect(() => {
const exitForm: any = document.querySelector("#exitForm")
  exitForm?.addEventListener("click", () => {
    const obj = {
      product: "",
      price: "",
      brand: "",
      category: "",
      summary: "",
      flavors: [],
      stock: "",
      images: [],
      _id: "",
    };
    setNewItem(obj);
  });

    const fetchItems = async () => {
      const brandItems = await fetch(
        `${process.env.NEXT_PUBLIC_backend_Link}allitems`,
      );
      const data = await brandItems.json();
      const items: any = data.items;

      setProducts(items);
      return;
    };
    fetchItems();
    const fetchCategories = async () => {
      const catItems = await fetch(
        `${process.env.NEXT_PUBLIC_backend_Link}categories`,
      );
      const data = await catItems.json();

      const items = data.categories;
      setCategories(items);
      return;
    };
    fetchCategories();

    const fetchBrands = async () => {
      const brands = await fetch(
        `${process.env.NEXT_PUBLIC_backend_Link}brands`,
      );
      const data = await brands.json();

      const items = data.brands;
      setBrands(items);
    };
    fetchBrands();
  }, []);

  const items = products.map((item: any) => {
    const images = item.images;
    return (
      <div
        id="obj"
        className="flex z-[1] justify-start text-center bg-white border-2 w-[60%] border-orange-500 border-solid"
      >
        <Image
          className="w-[100px] border-2 border-black border-solid"
          src={images[0]}
          alt=""
        />
        <h2 className="w-[200px] mt-9">{item.product}</h2>
        <p className="w-[200px] mt-9">{item.price}</p>
        <p className="w-[200px] mt-9">{item.brand.name}</p>
        <div className="w-[200px] mt-9">
          <button
            onClick={() => {
              const p = document.getElementById(`${item.product}`);
              p?.setAttribute("style", "display:block");
            }}
          >
            Expand
          </button>
          <p
            id={`${item.product}`}
            className="hidden absolute bg-white w-[25vw] border-2 border-black border-solid p-10 "
          >
            {item.summary}
            <button
              onClick={() => {
                const p = document.getElementById(`${item.product}`);
                p?.setAttribute("style", "display:none");
              }}
              className="absolute w-10 font-bold top-2 ml-5"
            >
              X
            </button>
          </p>
        </div>
        <div>
          <button
            onClick={() => {
              const p = document.getElementById(`${item.flavors[0]}`);
              p?.setAttribute("style", "display:block");
            }}
            className="mt-9"
          >
            [...]
          </button>
          <p id={item.flavors[0]} className="w-[200px] mt-9 hidden">
            {item.flavors.map((flavor: any) => {
              return flavor + ",";
            })}
          </p>
        </div>

        <p className="w-[200px] mt-9">{item.stock}</p>
        <button
          type="button"
          onClick={() => {
            (async () => {
              console.log(item._id);
              const obj = await fetch(
                `${process.env.NEXT_PUBLIC_backend_Link}product/${item._id}`,
              );
              const data = await obj.json();
              const product = data.product;
              const object = {
                product: product.product,
                price: product.price,
                brand: product.brand,
                category: product.category,
                summary: product.summary,
                flavors: product.flavors,
                stock: product.stock,
                images: product.images,
                _id: product._id,
              };

              setNewItem(object);

              setForm("update");
              const form = document.getElementById("formUpdate");
              form?.setAttribute("style", "display:block");

              if (product.flavors.length === 0) {
                document
                  .getElementById("flavorSelect")
                  ?.setAttribute("style", "display:none");
              }
              setNewItem(product);
            })();
          }}
          className="absolute left-[70%] mt-10 border-white border-solid border-2 bg-white rounded-md p-2 text-blue-600 hover:text-lg hover:bg-orange-500 duration-300 transition-all ease-in-out "
        >
          Update
        </button>
        <button
          onClick={() => {
            const go = async () => {
              try {
                const req = await fetch(
                  `${process.env.NEXT_PUBLIC_backend_Link}deleteItem/${item._id}`,
                  {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ id: item._id }),
                  },
                );
                if (req.status !== 200) {
                  return;
                }
                window.location.reload();
              } catch (err) {
                console.log(err);
              }
            };
            go();
          }}
          className="absolute left-[80%] mt-10 bg-red-500 border-solid border-2   rounded-md p-2 text-white hover:text-lg   duration-300 transition-all ease-in-out "
        >
          Delete Item
        </button>
      </div>
    );
  });

  const brandItems = brands.map((brand: any) => {
    return (
      <div
        className="flex z-[1] justify-start text-center bg-white border-2 w-[60%] border-solid p-10"
        id="obj"
      >
        <h2 className="font-bold text-lg">{brand.name}</h2>
        <button
          className="absolute left-[55%] border-2 border-black border-solid text-lg rounded-md p-1 hover:bg-red-500 hover:text-white font-bold"
          onClick={() => {
            console.log(brand._id);
            const go = async () => {
              try {
                const req = await fetch(
                  `${process.env.NEXT_PUBLIC_backend_Link}deleteBrand/${brand._id}`,
                  {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ id: brand._id }),
                  },
                );
                if (req.status !== 200) {
                  return;
                } else {
                  window.location.reload();
                }
              } catch (err) {
                console.log(err);
              }
            };
            go();
          }}
        >
          Delete
        </button>
      </div>
    );
  });
  const categorItems = categories.map((category: any) => {
    return (
      <div
        className="flex z-[1] justify-start text-center bg-white border-2 w-[60%] border-solid p-10"
        id="obj"
      >
        <h2 className="font-bold text-2xl m-5">{category.type}</h2>
        <button
          className="absolute left-[55%] border-2 border-black border-solid text-lg rounded-md p-1 hover:bg-red-500 hover:text-white font-bold"
          onClick={() => {
            const go = async () => {
              try {
                const req = await fetch(
                  `${process.env.NEXT_PUBLIC_backend_Link}deleteCategory/${category._id}`,
                  {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ id: category._id }),
                  },
                );
                if (req.status !== 200) {
                  return;
                }
                window.location.reload();
              } catch (err) {
                console.log(err);
              }
            };
            go();
          }}
        >
          Delete
        </button>
      </div>
    );
  });
  return (
    <body className="bg-343434 h-[200vh%]">
      <header className="flex h-[5vh] justify-around">
        <Image className="w-20" src={logo} alt="Logo" />
        <button
          onClick={() => {
            const wraps = document.querySelectorAll("#wrap");
            wraps.forEach((wrap) => {
              wrap.setAttribute("style", "display:none");
            });
            setOption("item");
            document
              .querySelector(".products")
              ?.setAttribute("style", "display:block");
          }}
        >
          <h1>Products</h1>
        </button>

        <button
          onClick={() => {
            const wraps = document.querySelectorAll("#wrap");
            wraps.forEach((wrap) => {
              wrap.setAttribute("style", "display:none");
            });
            setOption("brand");
            document
              .querySelector(".brandItems")
              ?.setAttribute("style", "display:block");
          }}
        >
          <h1>Brands</h1>
        </button>

        <button
          onClick={() => {
            const wraps = document.querySelectorAll("#wrap");
            wraps.forEach((wrap) => {
              wrap.setAttribute("style", "display:none");
            });
            setOption("category");
            document
              .querySelector(".catItems")
              ?.setAttribute("style", "display:block");
          }}
        >
          <h1>Categories</h1>
        </button>
      </header>
      <main className="bg-[#343434] min-w-full m-0">
        <video className="w-[320px] h-[240px]" width="320" height="240" controls>
          <source src="adminCreate.mp4" type="video/mp4"></source>
        </video>
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
        <div>
          <button
            onClick={() => {
              setForm("item");
              const form = document.getElementById("formCreate");
              form?.setAttribute("style", "display:block");
            }}
            className="absolute left-[90%] bg-green-700 p-2 w-32 border-solid text-white text-xl rounded-lg border-white border-2 "
          >
            Add
          </button>
        </div>
        <div id="container" className="w-screen">
          <div className="products w-screen" id="wrap">
            <nav className="flex justify-around ml-20 w-[50%]">
              <h1 className="text-white font-bold ml-16">Product Name</h1>
              <h1 className="text-white ml-10  font-bold">Price</h1>
              <h1 className="text-white ml-10 font-bold">Brand</h1>
              <h1 className="text-white ml-32 font-bold">Summary</h1>
              <h1 className="text-white font-bold">Flavors</h1>
              <h1 className="text-white font-bold">Stock</h1>
            </nav>
            {items}
          </div>
          <div className="catItems hidden bg-white w-screen  " id="wrap">
            {categorItems}
          </div>
          <div className="brandItems hidden w-" id="wrap">
            {brandItems}
          </div>
        </div>
      </main>
    </body>
  );
}
