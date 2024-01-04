import { useGetCategoriesQuery } from "../../features/product/productApi";

export default function ProductCategory() {
  const { isSuccess, data: categories } = useGetCategoriesQuery();
  return (
    <div className="container">
      <div className="text-center py-5 mt-5">
        <h3 className="text-3xl font-semibold mb-3">Featured Category</h3>
        <p>Get your desired product from featured category</p>
      </div>

      <div className="flex flex-col md:flex-row justify-center items-center gap-4 md:gap-8 my-10">
        {isSuccess &&
          categories?.length > 0 &&
          categories.map(
            (category) =>
              category?.featured && (
                <div
                  key={category._id}
                  className="rounded-full border cursor-pointer w-32 h-32 p-3 flex flex-col justify-center items-center transition hover:shadow-lg"
                >
                  <img
                    draggable={false}
                    className="w-12 grayscale"
                    src={category.icon}
                    alt="icon"
                  />
                  <p className="text-lg font-semibold mt-1">{category.name}</p>
                </div>
              )
          )}
      </div>
    </div>
  );
}
