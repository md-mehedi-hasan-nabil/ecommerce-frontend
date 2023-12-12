import { Button } from "flowbite-react";
import CartProductItems from "../../components/Buyer/CartProductItems";
import BuyerLayout from "../../components/Layout/BuyerLayout";
import { Link } from "react-router-dom";

export default function CartPage() {
  return (
    <BuyerLayout>
      <div className="py-5">
        <CartProductItems className="w-full h-auto" />
        <div className="flex justify-end py-8">
          <Link to="/payment">
            <Button>Place Order</Button>
          </Link>
        </div>
      </div>
    </BuyerLayout>
  );
}
