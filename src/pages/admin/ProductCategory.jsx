import { useEffect, useState } from "react";
import AdminLayout from "../../components/Layout/AdminLayout";
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

  useEffect(() => {
    if (isSuccessAddProductCategory) {
      toast.success("Product category add successfully!");
      refetch();
    }
  }, [isSuccessAddProductCategory, refetch]);

  function handleAddCategory(e) {
    e.preventDefault();
    const name = e.target.name.value;
    addProductCategory({
      name,
    });
    setOpenModal(false);
    e.target.reset();
  }

  return (
    <AdminLayout>
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

            <button
              type="submit"
              className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Add category
            </button>
          </form>
        </Modal.Body>
      </Modal>
    </AdminLayout>
  );
}
