import { useEffect } from "react";
import { useForm } from "react-hook-form";

export default function InventoryForm({
  formData,
  handleOnChange,
  handleOnSubmit,
  toggleEdit,
}) {
  useEffect(() => reset(formData), [toggleEdit]);
  const { id } = formData;
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: id
      ? formData
      : {
          id: "Default",
          productName: "Default",
          brand: "Default",
          quantity: "Default",
          image: "Default",
          price: "Default",
        },
  });

  return (
    <div className="Form-Container">
      <form action="" onSubmit={handleSubmit(handleOnSubmit)}>
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

        <button>{toggleEdit ? "Edit Product" : "Add To Inventory"}</button>
      </form>
    </div>
  );
}
