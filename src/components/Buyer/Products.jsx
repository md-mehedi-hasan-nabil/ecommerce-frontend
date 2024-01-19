import { useGetProductsQuery } from "../../features/product/productApi";
import ProductCard from "./ProductCard";
import Loader from "../Loader/Loader";

export default function Products() {
  const { isSuccess, data: products, isLoading } = useGetProductsQuery();

  let content;

  if (isLoading) {
    content = <Loader />;
  } else if (isSuccess && products?.length > 0) {
    content = products
      ?.slice(0, 8)
      ?.map((product) => <ProductCard key={product._id} product={product} />);
  } else if (isSuccess && products?.length == 0) {
    content = <h2>No product here.</h2>;
  } else {
    content = <h2>Something was wrong.</h2>;
  }

  return (
    <div>
      <h2 className="text-4xl font-bold my-8">All Products</h2>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">{content}</div>
    </div>
  );
}
