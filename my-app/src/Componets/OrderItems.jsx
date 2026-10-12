


const OrderItem = ({ item, status, paymentType, createdAt, address }) => {



  return (
    <div className="grid grid-cols-1 sm:grid-cols-[0.5fr_2fr_1fr] 
                    lg:grid-cols-[0.5fr_2fr_1fr_1fr_1fr] 
                    gap-3 items-start border-2 border-gray-200 
                    p-5 md:p-8 my-3 md:my-4 
                    text-xs sm:text-sm text-gray-700">

      {/* IMAGE */}
      <img
        className="w-12"
        src={item.imageUrl}
        alt={item.productName}
      />

      {/* ADDRESS */}
      <div>
        <p className="mt-3 mb-2 font-medium">
          {address.firstName} {address.lastName}
        </p>

        <div>
          <p>{address.street},</p>
          <p>
            {address.city}, {address.state}, {address.country},
            {address.zipCode}, {address.phoneNumber}
          </p>
        </div>
      </div>

      {/* ORDER INFO */}
      <div>
        <p className="text-sm sm:text-[15px]">
          Items : {item.quantity}
        </p>

        <p className="mt-3">
          Method : {paymentType}
        </p>

        <p>
          Status : {status}
        </p>

        <p>
          Date :{" "}
          {new Date(createdAt).toLocaleDateString()}
        </p>
      </div>

      {/* PRICE */}
      <p className="text-sm sm:text-[15px] font-medium">
        ₹{item.price}
      </p>

      {/* TRACK ORDER BUTTON */}
       
    </div>
  );
};

export default OrderItem;
