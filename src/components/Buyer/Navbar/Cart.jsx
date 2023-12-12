import { Dropdown } from "flowbite-react";
import CartProductItems from "../CartProductItems";
import { useEffect, useState } from "react";
import useFirebaseAuth from "../../../hooks/useFirebaseAuth";
import { useGetCartsQuery } from "../../../features/cart/cartApi";

export default function Cart() {
  const { user } = useFirebaseAuth();

  const [totalProduct, setTotalProduct] = useState([]);

  const { isSuccess: isSuccessFetchCarts, data: carts } = useGetCartsQuery();

  useEffect(() => {
    if (isSuccessFetchCarts) {
      const totalItem = carts?.filter(
        (cart) => cart.user?.email === user?.email
      );
      setTotalProduct(totalItem);
    }
  }, [isSuccessFetchCarts, carts, user]);

  return (
    <Dropdown
      arrowIcon={false}
      inline={true}
      label={
        <div className="mx-2">
          <button
            type="button"
            className="relative inline-flex items-center p-3 text-sm font-medium text-center bg-slate-100 hover:bg-slate-200 rounded-full"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
            <div className="absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-red-500 border-2 border-white rounded-full -top-1 -right-1 dark:border-gray-900">
              {totalProduct?.length}
            </div>
          </button>
        </div>
      }
    >
      <Dropdown.Header>
        <div className="flex">
          <h3 className="font-semibold text-gray-600 text-xs uppercase w-3/5">
            Product Details
          </h3>
          <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5">
            Quantity
          </h3>
          <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5">
            Price
          </h3>
        </div>
      </Dropdown.Header>
      {/* cart item */}
      <CartProductItems />
    </Dropdown>
  );
}
