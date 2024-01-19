import {
  useGetCategoriesQuery,
  useGetProductsQuery,
} from "../../features/product/productApi";
import ProductCard from "./ProductCard";
import Loader from "../Loader/Loader";

export default function FilterProductByCategory() {
  const { isSuccess, data: products, isLoading } = useGetProductsQuery();
  const { isSuccess: isSuccessFetchCategories, data: categories } =
    useGetCategoriesQuery();

  let content;

  if (isLoading) {
    content = <Loader />;
  } else if (isSuccess && products?.length > 0) {
    content = products.map((product) => (
      <ProductCard key={product._id} product={product} />
    ));
  } else if (isSuccess && products?.length == 0) {
    content = <h2>No product here.</h2>;
  } else {
    content = <h2>Something was wrong.</h2>;
  }

  return (
    <div className="grid grid-cols-12 gap-6 mt-5">
      <div className="col-span-12 md:col-span-3">
        <div className="p-3 bg-white rounded-lg shadow dark:bg-gray-700">
          <h6 className="mb-3 text-sm font-medium text-gray-900 dark:text-white">
            Category
          </h6>
          <ul
            className="space-y-3 text-sm py-2"
          >
            <li className="flex items-center">
              <input
                id="all"
                type="checkbox"
                value=""
                className="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
              />

              <label
                htmlFor="all"
                className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-100"
              >
                All
              </label>
            </li>
            {isSuccessFetchCategories &&
              categories?.length &&
              categories.map((category) => (
                <li key={category?._id} className="flex items-center">
                  <input
                    id={category?.name}
                    type="checkbox"
                    value=""
                    className="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                  />

                  <label
                    htmlFor={category?.name}
                    className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-100"
                  >
                    {category?.name}
                  </label>
                </li>
              ))}
          </ul>
        </div>
      </div>
      <div className="col-span-12 md:col-span-9">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">{content}</div>
      </div>
    </div>
  );
}
