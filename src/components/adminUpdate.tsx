import InputSection from "./input";
export default function AdminUpdate({
  onChange,
  _id,
  addFlavor,
  product,
  price,
  flavors,
  stock,
  summary,
  brand,
  category,
  images,
  brands,
  categories,
  addImage,
  onSubmit,
}: any) {
  {
    const brandList = brands;
    const catList = categories;

    const optionBrands = brandList.map((bra: any) => {
      return <option value={bra.name}>{bra.name}</option>;
    });
    const optionCat = catList.map((cat: any) => {
      console.log(category);
      console.log(cat);
      if (cat === category) {
        console.log(category);
        console.log(cat);
        return (
          <option value={cat.type} selected>
            {cat.type}
          </option>
        );
      }
      return <option value={cat.type}>{cat.type}</option>;
    });

    const flavorList: any = flavors.map((flavor: any) => {
      return (
        <div>
          <p className="font-bold">{flavor}</p>
        </div>
      );
    });
    const imgs: any = images;
    const imageList: any = imgs.map((img: any) => {
      return <p>{img}</p>;
    });

    const itemForm = (
      <form>
        <InputSection
          type="text"
          placeholder=""
          value={product}
          text="Product Name"
          onChange={onChange}
          dataKey="product"
        />
        <InputSection
          type="number"
          placeholder=""
          value={price}
          text="Price"
          onChange={onChange}
          dataKey="price"
        />
        <div>
          <label htmlFor="brand">Brand:</label>
          <select
            value={brand}
            onChange={onChange}
            name="brand"
            data-key="brand"
            id=""
          >
            {optionBrands}
          </select>
        </div>
        <div>
          <div className="grid grid-cols-3">
            <label htmlFor="flavors">Flavors:</label>
            {flavorList}
          </div>
          <button
            type="button"
            onClick={() => {
              const newFlavorDiv: any = document.getElementById("newFlavorDiv");
              newFlavorDiv.classList.toggle("hidden");
            }}
          >
            Add Flavor
          </button>{" "}
          <p className="text-red-700 hidden" id="flavorError">
            Please Enter a flavor
          </p>
          <div className="hidden" id="newFlavorDiv">
            <form action="">
              <input
                className="border-2 border-black border-solid"
                onSubmit={addFlavor}
                required={false}
                type="text"
                id="newFlavor"
              />
              <button
                type="button"
                onClick={() => {
                  const newFlavor: any = document.getElementById("newFlavor");
                  if (newFlavor.value === "") {
                    const flavorError: any =
                      document.getElementById("flavorError");
                    flavorError.classList.toggle("hidden");
                    return;
                  }
                  const flavorError: any =
                    document.getElementById("imageError");
                  if (flavorError.classList.contains("hidden") === false) {
                    flavorError.classList.toggle("hidden");
                  }
                  addFlavor(newFlavor.value);
                  const flavafla: any = document.getElementById("newImageDiv");
                  newFlavor.value = "";
                  flavafla.classList.toggle("hidden");
                }}
              >
                Enter
              </button>
            </form>
          </div>
        </div>
        <div>
          <label htmlFor="category">Category:</label>
          <select
            value={category}
            onChange={onChange}
            name="category"
            data-key="category"
            id=""
          >
            {optionCat}
          </select>
        </div>
        <InputSection
          onChange={onChange}
          type="number"
          value={stock}
          text="Stock"
          placeholder=""
          dataKey="stock"
        />
        <div className="flex flex-col items-start p-10 border-b-2 border-black border-solid">
          <label htmlFor="summary">Summary:</label>
          <textarea
            id="summary"
            className="border-2 border-solid border-black rounded"
            name="summary"
            data-key="summary"
           
            onChange={onChange}
            cols={60}
            rows={10}
          >
            {summary}
          </textarea>
        </div>

        <div>
          <div className="grid grid-cols-3">
            <label htmlFor="images">Images:</label>
            {imageList}
          </div>
          <button
            type="button"
            onClick={() => {
              const newImageDiv: any = document.getElementById("newImageDiv");
              newImageDiv.classList.toggle("hidden");
            }}
          >
            Add Image
          </button>{" "}
          <p className="text-red-700 hidden" id="imageError">
            Please Enter an AWS link to the bucket
          </p>
          <div className="hidden" id="newImageDiv">
            <form action="">
              <input
                className="border-2 border-black border-solid"
                onSubmit={addImage}
                required={false}
                type="text"
                id="newImage"
              />
              <button
                type="button"
                onClick={() => {
                  const newImage: any = document.getElementById("newImage");
                  if (newImage.value === "") {
                    const imageError: any =
                      document.getElementById("imageError");
                    imageError.classList.toggle("hidden");
                    return;
                  }
                  const imageError: any = document.getElementById("imageError");
                  if (imageError.classList.contains("hidden") === false) {
                    imageError.classList.toggle("hidden");
                  }
                  addImage(newImage.value);
                  const flavafla: any = document.getElementById("newImageDiv");
                  newImage.value = "";
                  flavafla.classList.toggle("hidden");
                }}
              >
                Enter
              </button>
            </form>
          </div>
        </div>
        <button
          className="border-2 border-solid border-black p-1 rounded-md hover:bg-orange-400"
          onClick={onSubmit}
          type="button"
        >
          Enter
        </button>
      </form>
    );

    return (
      <div
        id="formUpdate"
        className="fixed hidden z-[20] bg-[#FFFBE9] left-[15%] top-[15%] w-[60%] p-10 border-2 border-solid border-black"
      >
        <button
          id="exitForm"
          onClick={() => {
            product = "";
            const form = document.getElementById("formCreate");
            const formUpdate = document.getElementById("formUpdate");

            formUpdate?.setAttribute("style", "display:none");
            form?.setAttribute("style", "display:none");
            const inputs = document.querySelectorAll("input");
            const summary: any = document.querySelector("#summary");
            summary.innerHTML = "";
            inputs.forEach((input) => {
              input.value = "";
            });
          }}
          className="font-bold text-xl hover:text-orange-500  ml-[90%] mb-4"
        >
          X
        </button>
        {itemForm}
      </div>
    );
  }
}
