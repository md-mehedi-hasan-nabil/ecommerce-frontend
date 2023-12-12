import { useEffect } from "react";
import AdminLayout from "../../components/Layout/AdminLayout";
import { 
  useAddProductMutation,
  useGetCategoriesQuery,
} from "../../features/product/productApi";
import { toast } from "react-hot-toast";

export default function AddProduct() {
  const { isSuccess: isSuccessFetchCategories, data: categories } =
    useGetCategoriesQuery();
  const [addProduct, { isSuccess: isSuccessAddProduct, isError, error }] =
    useAddProductMutation();

  isError && console.log(error);

  useEffect(() => {
    if (isSuccessAddProduct) {
      toast.success("Product add successfully!");
    }
  }, [isSuccessAddProduct]);

  function handleAddProduct(e) {
    e.preventDefault();
    const form = e.target;

    const title = form.title.value;
    const thumbnail = form.thumbnail.value;
    const images = form.images.value ? form.images.value.split("\n") : "";
    const price = form.price.value;
    const quantity = form.quantity.value;
    const short_description = form.short_description.value;
    const long_description = form.long_description.value;
    const category = form.category.value;

    console.log({
      title,
      thumbnail,
      images,
      price,
      quantity,
      short_description,
      long_description,
      category,
    });
    
    addProduct({
      title,
      thumbnail,
      images,
      price,
      quantity,
      short_description,
      long_description,
      category,
    });

    e.target.reset();
  }

  return (
    <>
      <div>
        <h2 className="text-2xl font-semibold mb-4">Add New Product</h2>
        <form onSubmit={handleAddProduct}>
          <div className="mb-6">
            <label
              htmlFor="title"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Title*
            </label>
            <input
              type="text"
              id="title"
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="Enter product title"
              required
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="thumbnail"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Thumbnail*
            </label>
            <input
              type="url"
              id="thumbnail"
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="Enter product thumbnail"
              required
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="images"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Add three category images url
            </label>
            <textarea
              id="images"
              rows="4"
              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Product Category image url 1
Product Category image url 2
Product Category image url 3
              "
            ></textarea>
          </div>

          <div className="flex gap-4">
            <div className="mb-6 w-full">
              <label
                htmlFor="price"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Price*
              </label>
              <input
                type="number"
                id="price"
                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="Enter product price"
                required
              />
            </div>
            <div className="mb-6 w-full">
              <label
                htmlFor="quantity"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Quantity*
              </label>
              <input
                type="number"
                id="quantity"
                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="Enter product quantity"
                required
              />
            </div>
          </div>

          <div className="mb-6">
            <label
              htmlFor="short_description"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Enter product short description
            </label>
            <textarea
              id="short_description"
              rows="4"
              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Product description..."
            ></textarea>
          </div>

          <div className="mb-6">
            <label
              htmlFor="long_description"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Enter product description
            </label>
            <textarea
              id="long_description"
              rows="4"
              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Product description..."
            ></textarea>
          </div>

          <div className="mb-6">
            <label
              htmlFor="category"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Select product category*
            </label>
            <select
              id="category"
              name="category"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            >
              {isSuccessFetchCategories && categories?.length > 0 ? (
                categories.map((category) => (
                  <option key={category._id} value={category._id}>
                    {category.name}
                  </option>
                ))
              ) : (
                <option>No category found.</option>
              )}
            </select>
          </div>

          <button
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
          >
            Add new product
          </button>
        </form>
      </div>
    </>
  );
}
