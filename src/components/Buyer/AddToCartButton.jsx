import { Button } from "flowbite-react";
import PropTypes from "prop-types";
import useFirebaseAuth from "../../hooks/useFirebaseAuth";
import { useAddToCartMutation } from "../../features/cart/cartApi";
import { useEffect } from "react";
import { toast } from "react-hot-toast";

export default function AddToCartButton({ product, size = "xs" }) {
  const { _id } = product || {};
  const {user} = useFirebaseAuth();
  const [addProductToCart, { isSuccess: isSuccessAddProductToCart }] =
    useAddToCartMutation();

  useEffect(() => {
    if (isSuccessAddProductToCart) {
      toast.success("Product add successfully!");
    }
  }, [isSuccessAddProductToCart]);

  function handleAddToCart(product_id) {
    addProductToCart({
      product_id,
      email: user.email,
    });
  }
  return (
    <Button onClick={() => handleAddToCart(_id)} size={size}>
      Add to cart
    </Button>
  );
}

AddToCartButton.propTypes = {
  product: PropTypes.object.isRequired,
  size: PropTypes.string.isRequired,
};
