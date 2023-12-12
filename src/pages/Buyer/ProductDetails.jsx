import { useParams } from "react-router-dom";
import Layout from "../../components/Layout/BuyerLayout";
import { useGetProductQuery } from "../../features/product/productApi";
import AddToCartButton from "../../components/Buyer/AddToCartButton";


export default function ProductDetails() {
  const { productId } = useParams() || {};
  const {
    isSuccess,
    data: product,
    isLoading,
  } = useGetProductQuery(productId, {
    skip: productId ? false : true,
  });

  const {
    title,
    thumbnail,
    price,
    quantity,
    images,
    short_description,
    long_description,
    category,
  } = product || {};

  return (
    <Layout>
      {isLoading && !isSuccess ? (
        <div
          role="status"
          className="container py-5 space-y-8 animate-pulse md:space-y-0 md:space-x-8 md:flex md:items-center"
        >
          <div className="flex items-center justify-center w-full h-48 bg-gray-300 rounded sm:w-96 dark:bg-gray-700">
            <svg
              className="w-10 h-10 text-gray-200 dark:text-gray-600"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 18"
            >
              <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
            </svg>
          </div>
          <div className="w-full">
            <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
            <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[480px] mb-2.5"></div>
            <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
            <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[440px] mb-2.5"></div>
            <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[460px] mb-2.5"></div>
            <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px]"></div>
          </div>
          <span className="sr-only">Loading...</span>
        </div>
      ) : (
        <div className="container grid grid-cols-12 gap-6">
          <div className="col-span-4">
            <img src={thumbnail} alt={title} />
            <div className="flex gap-4 mt-8">
              {images?.length > 0 &&
                images.map((image) => (
                  <img className="w-24" key={image} src={image} alt="" />
                ))}
            </div>
          </div>
          <div className="col-span-8 flex flex-col gap-4 mt-6">
            <h2 className="font-bold text-2xl">{title}</h2>
            <p className="text-lg">{short_description}</p>
            <p className="text-lg">{long_description}</p>
            <div className="flex items-center gap-8">
              <p className="text-3xl font-semibold">Price: $ {price}</p>
              <p className="text-xl font-semibold">Quantity: {quantity}</p>
            </div>
            {category?.name && (
              <p className="text-lg font-medium capitalize">
                Category: {category.name}
              </p>
            )}
            <div>
              <AddToCartButton size="md" product={product} />
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
}
