import CartTotal from "../Componets/CardTotal";
import { useCart } from "../Context/CartContext";
import binIcon from "../assets/frontend_assets/bin_icon.png";


const Cart = () => {
  const { cartItems, removeFromCart } = useCart();

  return (
    <div className="border-t pt-14">

      <h2 className="text-2xl mb-6">YOUR CART</h2>

      {cartItems.length === 0 && (
        <p className="text-gray-500">Cart is empty</p>
      )}

      {cartItems.map((item) => (
        <div
          key={`${item.id}-${item.sizes}`}
          className="flex gap-6 border-b py-4"
        >
          <img src={item.imageUrls[0]} className="w-20" />

          <div className="flex-1">
            <p className="font-medium">{item.name}</p>
            <p>${item.price}</p>
            <p>Size: {item.size}</p>
            <p>Qty: {item.qty}</p>
          </div>

          <button
  onClick={() => removeFromCart(item._id, item.size)}
  className="p-2 rounded-full hover:bg-red-100 transition"
  title="Remove item"
>
  <img
    src={binIcon}
    alt="Remove"
    className="w-4 h-4"
  />
</button>

        </div>
      ))}
     
     <div className=" flex justify-end my-18">
      <CartTotal/>
     </div>
      
    </div>
  );
};

export default Cart;
