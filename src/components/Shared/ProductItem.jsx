import PropTypes from "prop-types";
import { useState } from "react";

export default function ProductItem({ product, index }) {
  const { _id, title, thumbnail, category, price } = product || {};
  const [editMode, setEditMode] = useState(false);

  return (
    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
      <th
        scope="row"
        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
      >
        {index + 1}
      </th>
      <td className="px-6 py-4 line-clamp-2">{title}</td>
      <td className="px-6 py-4">
        <img className="w-16 object-cover" src={thumbnail} alt={title} />
      </td>
      <td className="px-6 py-4">{category.name}</td>
      <td className="px-6 py-4">{price}</td>
      <td className="px-6 py-4 text-right">
        {editMode ? (
          <>
            <button
              onClick={() => setEditMode(false)}
              className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
            >
              Cancel
            </button>
            <button className="ml-4 font-medium text-blue-600 dark:text-blue-500 hover:underline">
              Update
            </button>
          </>
        ) : (
          <button
            onClick={() => setEditMode(true)}
            className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
          >
            Edit
          </button>
        )}
      </td>
    </tr>
  );
}

ProductItem.propTypes = {
  product: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
};
