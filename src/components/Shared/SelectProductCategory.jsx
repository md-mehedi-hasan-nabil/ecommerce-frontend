import PropTypes from "prop-types";
import { useGetCategoriesQuery } from "../../features/product/productApi";

export default function SelectProductCategory({
  category,
  onChange,
  label,
  className,
}) {
  const { isSuccess: isSuccessFetchCategories, data: categories } =
    useGetCategoriesQuery();
  return (
    <div className={`${className ? className : ""}`}>
      {label && (
        <label
          htmlFor="category"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          {label}
        </label>
      )}
      <select
        id="category"
        name="category"
        value={category}
        onChange={(e) => onChange(e.target.value)}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
      >
        {isSuccessFetchCategories && categories?.length > 0 ? (
          categories.map((categoryData) => (
            <option key={categoryData._id} value={categoryData._id}>
              {categoryData.name}
            </option>
          ))
        ) : (
          <option>No category found.</option>
        )}
      </select>
    </div>
  );
}

SelectProductCategory.propTypes = {
  category: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  label: PropTypes.string,
  className: PropTypes.string,
};
