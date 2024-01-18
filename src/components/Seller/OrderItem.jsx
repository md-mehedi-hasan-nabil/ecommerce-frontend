import PropTypes from "prop-types";

export default function OrderItem({ order, index }) {
  const { _id, title, thumbnail, category, price } = order || {};
  console.log(order);

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
      <td className="px-6 py-4">
        {category?.name ? category?.name : "unknown"}
      </td>
      <td className="px-6 py-4">{price}</td>
    </tr>
  );
}

OrderItem.propTypes = {
  order: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
};
