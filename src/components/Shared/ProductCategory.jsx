import { useEffect, useState } from "react";
import {
  useAddProductCategoryMutation,
  useGetCategoriesQuery,
} from "../../features/product/productApi";
import { toast } from "react-hot-toast";
import { Modal } from "flowbite-react";

export default function ProductCategory() {
  const { isSuccess, data: categories, refetch } = useGetCategoriesQuery();
  const [addProductCategory, { isSuccess: isSuccessAddProductCategory }] =
    useAddProductCategoryMutation();

  const [openModal, setOpenModal] = useState(false);
  const [image, setImage] = useState(null);

  useEffect(() => {
    if (isSuccessAddProductCategory) {
      toast.success("Product category add successfully!");
      refetch();
    }
  }, [isSuccessAddProductCategory, refetch]);

  function handleImage(input) {
    if (input.files && input.files[0]) {
      var reader = new FileReader();

      reader.onload = function (e) {
        const base64String = e.target.result;
        setImage(base64String);
      };

      reader.readAsDataURL(input.files[0]);
    }
  }

  function handleAddCategory(e) {
    e.preventDefault();

    const name = e.target.name.value;
    const featured = e.target.featured.value;

    if (name && image && featured) {
      addProductCategory({
        name,
        icon: image,
        featured: featured === "yes",
      });

      setOpenModal(false);
      e.target.reset();
    } else {
      toast.error("Field required");
    }
  }

  return (
    <>
      <button
        onClick={() => setOpenModal(true)}
        className="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        Add new category
      </button>

      <div className="grid grid-cols-12 gap-4 mt-6">
        {isSuccess && categories.length > 0 ? (
          categories.map((category) => (
            <div
              key={category._id}
              className="col-span-12 md:col-span-4 border p-4 rounded-md cursor-pointer hover:shadow-lg"
            >
              <img className="w-12" src={category.icon} alt="icon" />
              <h2 className="text-xl font-medium capitalize">
                {category.name}
              </h2>
            </div>
          ))
        ) : (
          <h2>No Category found.</h2>
        )}
      </div>

      <Modal show={openModal} onClose={() => setOpenModal(false)}>
        <Modal.Header>Add new category</Modal.Header>
        <Modal.Body>
          <form className="space-y-6" onSubmit={handleAddCategory}>
            <div>
              <label
                htmlFor="name"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Enter category name*
              </label>
              <input
                type="text"
                name="name"
                id="name"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="Caterory name"
                required
              />
            </div>

            <div className="flex items-center justify-center w-full">
              <label
                htmlFor="dropzone-file"
                className="flex flex-col items-center justify-center w-full h-48 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
              >
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <svg
                    className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 16"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                    />
                  </svg>
                  <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                    <span className="font-semibold">Click to upload</span> or
                    drag and drop
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    SVG, PNG, JPG or GIF (MAX. 800x400px)
                  </p>
                </div>
                <input
                  id="dropzone-file"
                  type="file"
                  name="icon"
                  onChange={(e) => handleImage(e.target)}
                  className="hidden"
                  required
                />
              </label>
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Featured Category*
              </label>
              <div className="flex">
                <div className="flex items-center me-4">
                  <input
                    id="inline-radio"
                    type="radio"
                    value="yes"
                    name="featured"
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 focus:ring-2"
                  />
                  <label
                    htmlFor="inline-radio"
                    className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    Yes
                  </label>
                </div>
                <div>
                  <div className="flex items-center me-4">
                    <input
                      id="inline-2-radio"
                      type="radio"
                      value="no"
                      name="featured"
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 focus:ring-2"
                    />
                    <label
                      htmlFor="inline-2-radio"
                      className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >
                      No
                    </label>
                  </div>
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Add category
            </button>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
}
