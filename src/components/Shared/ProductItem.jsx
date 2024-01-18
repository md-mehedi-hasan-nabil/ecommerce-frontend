import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import SelectProductCategory from "./SelectProductCategory";
import {
  useDeleteProductMutation,
  useUpdateProductMutation,
} from "../../features/product/productApi";
import toast from "react-hot-toast";
import { Button, Modal } from "flowbite-react";

export default function ProductItem({ product, index, refetch }) {
  const [updateProduct, { isSuccess: isSuccessUpdateProduct }] =
    useUpdateProductMutation();
  const [deleteProduct, { isSuccess: isSuccessDeleteProduct }] =
    useDeleteProductMutation();
  const { _id, title, thumbnail, category, price } = product || {};

  const [openModal, setOpenModal] = useState(false);
  const [editMode, setEditMode] = useState(false);

  const [productTitle, setProductTitle] = useState(title);
  const [productThumbnail, setProductThumbnail] = useState(thumbnail);
  const [productCategory, setProductCategory] = useState(category?._id);
  const [productPrice, setProductPrice] = useState(price);

  useEffect(() => {
    if (isSuccessUpdateProduct) {
      toast.success("Product update successfull.");
      setEditMode(false);
      refetch();
    }
  }, [isSuccessUpdateProduct, refetch]);

  useEffect(() => {
    if (isSuccessDeleteProduct) {
      toast.success("Product deleted.");
      refetch();
    }
  }, [isSuccessDeleteProduct, refetch]);

  function handleUpdateProduct() {
    if (productPrice && productThumbnail && productCategory && productPrice) {
      const obj = {
        title: productTitle,
        thumbnail: productThumbnail,
        category: productCategory,
        price: productPrice,
      };
      updateProduct({
        id: _id,
        body: obj,
      });
    }
  }

  function handleDelete() {
    if (_id) {
      deleteProduct({ id: _id });
    }
  }

  return (
    <>
      <Modal
        show={openModal}
        size="md"
        onClose={() => setOpenModal(false)}
        popup
      >
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              Are you sure you want to delete this product?
            </h3>
            <div className="flex justify-center gap-4">
              <Button
                color="failure"
                onClick={() => {
                  handleDelete();
                  setOpenModal(false);
                }}
              >
                {"Yes, I'm sure"}
              </Button>
              <Button color="gray" onClick={() => setOpenModal(false)}>
                No, cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
      <tr className="bg-white border-b hover:bg-gray-50">
        <th
          scope="row"
          className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
        >
          {index + 1}
        </th>
        <td className="px-6 py-4 line-clamp-2">
          {editMode ? (
            <input
              type="text"
              name="title"
              value={productTitle}
              onChange={(e) => setProductTitle(e.target.value)}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            />
          ) : (
            title
          )}
        </td>
        <td className="px-6 py-4">
          {editMode ? (
            <input
              type="url"
              name="thumbnail"
              value={productThumbnail}
              onChange={(e) => setProductThumbnail(e.target.value)}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            />
          ) : (
            <img className="w-16 object-cover" src={thumbnail} alt={title} />
          )}
        </td>
        <td className="px-6 py-4">
          {editMode ? (
            <SelectProductCategory
              category={productCategory}
              onChange={setProductCategory}
            />
          ) : category?.name ? (
            category?.name
          ) : (
            "unknown"
          )}
        </td>
        <td className="px-6 py-4">
          {editMode ? (
            <input
              type="text"
              name="price"
              value={productPrice}
              onChange={(e) => setProductPrice(e.target.value)}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            />
          ) : (
            price
          )}
        </td>
        <td className="px-6 py-4 text-right">
          {editMode ? (
            <p className="flex gap-1">
              <button
                onClick={() => setEditMode(false)}
                className="font-medium text-red-600 hover:underline"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdateProduct}
                className="ml-4 font-medium text-blue-600 hover:underline"
              >
                Update
              </button>
            </p>
          ) : (
            <p className="flex gap-5">
              <button
                onClick={() => setEditMode(true)}
                className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                  />
                </svg>
              </button>
              <button
                onClick={() => setOpenModal(true)}
                className="font-medium text-red-600 hover:underline"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                  />
                </svg>
              </button>
            </p>
          )}
        </td>
      </tr>
    </>
  );
}

ProductItem.propTypes = {
  product: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
  refetch: PropTypes.func.isRequired,
};
