import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import { addProduct, updateProduct } from "./utilities/dbFunctions";
import LoggedBar from "./loggedBar";

export default function InventoryApp() {

  const location = useLocation()      // to get the states
  const {product } = location.state!==null?location.state:""  // state brings product data with it? store it
  const {register, handleSubmit, setValue, reset, formState: { errors } } = useForm({});
  const navigate = useNavigate()
  const [postResponse, setPostResponse] = useState("")    // to store API responses
  
  const emptyForm = {   // only to clean our form quickly
    id: "",
    productName: "",
    brand: "",
    quantity: "",
    image: "",
    price: "",
  }
  const [formData, setFormData] = useState(emptyForm);

  const handleOnChange = (evt) => {       // to show characters as user fills the form
    const fieldName = evt.target.name;
    const fieldValue = evt.target.value;
    setFormData((prevData) => {
      return {
        ...prevData,
        id: crypto.randomUUID(),
        [fieldName]: fieldValue,
      };
    });
  };

    
  // this function calls addProduct() or editProduct according to from
  // where this component was called
  const handleOnSubmit = (evt) => {
    evt.preventDefault;
     setPostResponse("");
    product ?
      updateProduct(formData).then((result) => setPostResponse(result)) :
      addProduct(formData).then((result) => setPostResponse(result))
    product ? "":setFormData(()=>{reset();return emptyForm})
  };

  // when this component is loaded, the form is filled with product data
  // if the call came from Edit button in InventoryCard component, otherwise
  // leaves it empty
  
 useEffect(()=>{
    product?
    setFormData(()=>{
        setValue("productName",product.productName)
        setValue("brand",product.brand)
        setValue("quantity",product.quantity)
        setValue("image",product.image)
        setValue("price",product.price)
      return product}):navigate("/addProduct")
    console.log(formData)
  },[])

  return (
    <>
      <LoggedBar/>
      <div className="Form-Container">
      <form action="" onSubmit={handleSubmit(handleOnSubmit)}  >
        <div className="Input-Container">
          <label htmlFor="productName">Product Name</label>
          <input
            type="text"
            {...register("productName", {
              required: "Please provide a product name",
            })}
            id="productName"
            onChange={handleOnChange}
            value={formData.productName}
          />
          <p>{errors.productName?.message}</p>
        </div>
        <div className="Input-Container">
          <label htmlFor="brand">Brand</label>
          <input
            type="text"
            {...register("brand", {
              required: "Please provide a brand name",
            })}
            id="brand"
            onChange={handleOnChange}
            value={formData.brand}
          />
          <p>{errors.brand?.message}</p>
        </div>
        <div className="Input-Container">
          <label htmlFor="quantity">Quantity</label>
          <input
            type="text"
            {...register("quantity", {
              required: "Please provide a quantity",
            })}
            id="quantity"
            onChange={handleOnChange}
            value={formData.quantity}
          />
          <p>{errors.quantity?.message}</p>
        </div>
        <div className="Input-Container">
          <label htmlFor="image">Image Link</label>
          <input
            type="text"
            {...register("image", {
              required: "Please provide a image URL",
            })}
            id="image"
            onChange={handleOnChange}
            value={formData.image}
          />
          <p>{errors.image?.message}</p>
        </div>
        <div className="Input-Container">
          <label htmlFor="price">Price</label>
          <input
            type="text"
            {...register("price", {
              required: "Please provide a price",
            })}
            id="price"
            onChange={handleOnChange}
            value={formData.price}
          />
          <p>{errors.price?.message}</p>
        </div>
      
        <button>{product ? "Edit Product" : "Add To Inventory"}</button>
        <button onClick={()=>navigate("/main")}>Back</button>
        <br/>
        <div>{postResponse}</div>
      </form>
      </div>
    </>
  );
}
