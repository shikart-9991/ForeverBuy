import { Link } from "react-router-dom";
import { useCart } from "../Context/CartContext";

const CartTotal = () => {
  const { cartItems } = useCart();

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );

  const shippingFee = cartItems.length > 0 ? 10 : 0;
  const total = subtotal + shippingFee;

  return (
    <div className="w-full sm:w-[450px]">
      <div className="w-full">
        <div className="text-2xl">
          <div className="inline-flex gap-2 items-center mb-3">
            <p className="text-gray-500">
              CART <span className="text-gray-700 font-medium">TOTALS</span>
            </p>
            <p className="w-8 sm:w-12 h-[1px] sm:h-[2px] bg-gray-700"></p>
          </div>
        </div>

        <div className="flex flex-col gap-2 mt-2 text-sm">
          <div className="flex justify-between">
            <p>Subtotal</p>
            <p>$ {subtotal.toFixed(2)}</p>
          </div>

          <hr />

          <div className="flex justify-between">
            <p>Shipping Fee</p>
            <p>$ {shippingFee.toFixed(2)}</p>
          </div>

          <hr />

          <div className="flex justify-between">
            <b>Total</b>
            <b>$ {total.toFixed(2)}</b>
          </div>
        </div>
      </div>

      <div className="w-full text-end">
        <a
          className="bg-black text-white text-sm my-8 px-8 py-3 disabled:opacity-50"
          disabled={cartItems.length === 0}
          href="/placeorder"
        

        >
          PROCEED TO CHECKOUT
        </a>
      </div>
    </div>
  );
};

export default CartTotal;
