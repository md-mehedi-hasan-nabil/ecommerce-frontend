import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useGetCartsQuery } from "../../features/cart/cartApi";
import useFirebaseAuth from "../../hooks/useFirebaseAuth";
import CartItem from "../../components/Buyer/Navbar/CartItem";
import CartItemLoader from "../Loader/CartItemLOader";

export default function CartProductItems({ className }) {
  const { user } = useFirebaseAuth();
  const [totalProduct, setTotalProduct] = useState([]);

  const {
    isSuccess: isSuccessFetchCarts,
    data: carts,
    isLoading,
    isSuccess,
  } = useGetCartsQuery();

  useEffect(() => {
    if (isSuccessFetchCarts) {
      const totalItem = carts?.filter(
        (cart) => cart.user?.email === user?.email
      );
      setTotalProduct(totalItem);
    }
  }, [isSuccessFetchCarts, carts, user]);

  if (isLoading) {
    return <CartItemLoader />;
  }

  return (
    <div
      className={`${
        className ? className : ""
      } bg-slate-100 w-[32rem] overflow-y-auto ${
        totalProduct.length === 0 ? "" : "h-80"
      }`}
    >
      {totalProduct?.length > 0 && isSuccess ? (
        totalProduct?.map((cart) => <CartItem key={cart._id} cart={cart} />)
      ) : (
        <h2 className="text-center py-4 text-xl">Cart is empty</h2>
      )}
    </div>
  );
}

CartProductItems.propTypes = {
  className: PropTypes.string,
};
