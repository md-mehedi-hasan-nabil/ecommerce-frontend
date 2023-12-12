import { Link } from "react-router-dom";
import DashboardLayout from "../../components/Layout/AdminLayout";
import { useGetProductsQuery } from "../../features/product/productApi";
import useFirebaseAuth from "../../hooks/useFirebaseAuth";

export default function Products() {
  const {user} = useFirebaseAuth();
  const { data: products, isSuccess: isSuccessFetchProducts } =
    useGetProductsQuery();

  return (
    <DashboardLayout>
      <Link
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2"
        to="/admin/add-product"
      >
        Add product
      </Link>
      <div className="pt-6">
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  #
                </th>
                <th scope="col" className="px-6 py-3">
                  Product name
                </th>
                <th scope="col" className="px-6 py-3">
                  Thumbnail
                </th>
                <th scope="col" className="px-6 py-3">
                  Category
                </th>
                <th scope="col" className="px-6 py-3">
                  Price
                </th>
                <th scope="col" className="px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {isSuccessFetchProducts && products?.length > 0 ? (
                products
                  ?.filter((product) => product?.user?.email === user?.email)
                  ?.map((product, index) => (
                    <tr
                      key={product._id}
                      className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                    >
                      <th
                        scope="row"
                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                      >
                        {index + 1}
                      </th>
                      <td className="px-6 py-4 line-clamp-2">
                        {product.title}
                      </td>
                      <td className="px-6 py-4">
                        <img
                          className="w-16 object-cover"
                          src={product.thumbnail}
                          alt={product.title}
                        />
                      </td>
                      <td className="px-6 py-4">{product.category.name}</td>
                      <td className="px-6 py-4">{product.price}</td>
                      <td className="px-6 py-4 text-right">
                        <button className="font-medium text-blue-600 dark:text-blue-500 hover:underline">
                          Edit
                        </button>
                      </td>
                    </tr>
                  ))
              ) : (
                <h2>No product here.</h2>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
}
