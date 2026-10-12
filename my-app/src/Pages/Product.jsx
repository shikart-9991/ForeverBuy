import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useCart } from "../Context/CartContext";
import axios from "axios";
import Related from "../Componets/Related";
import starIcon from "../assets/frontend_assets/star_icon.png";
import starDull from "../assets/frontend_assets/star_dull_icon.png";


const Product = () => {
  const { addToCart } = useCart();
  const { productId } = useParams();

  const [product, setProduct] = useState(null);
  const [image, setImage] = useState("");
  const [selectedSize, setSelectedSize] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/product/${productId}`
        );

        setProduct(response.data);
        setImage(response.data.imageUrls[0]);
      } catch (error) {
        console.error("Error fetching product", error);
      }
    };

    fetchProduct();
  }, [productId]);

  if (!product) return <p>Loading...</p>;

  const sizesArray = product.sizes.split(",");

  return (
    <div className="border-t-2 pt-10">
      <div className="flex gap-12 flex-col sm:flex-row">
        {/* LEFT - IMAGES */}
        <div className="flex-1 flex flex-col-reverse sm:flex-row gap-3">
          <div className="flex sm:flex-col overflow-x-auto sm:w-[18%]">
            {product.imageUrls.map((img, index) => (
              <img
                key={index}
                src={img}
                onClick={() => setImage(img)}
                className="w-[24%] sm:w-full sm:mb-3 cursor-pointer"
                alt=""
              />
            ))}
          </div>

          <div className="w-full sm:w-[80%]">
            <img src={image} alt="" className="w-full" />
          </div>
        </div>

        {/* RIGHT - INFO */}
        <div className="flex-1">
          <h1 className="font-medium text-2xl mt-2">{product.name}</h1>

          <div className="flex items-center gap-1 mt-2">
  <img src={starDull} className="w-4 h-4" alt="star" />
  <img src={starIcon} className="w-4 h-4" alt="star" />
  <img src={starIcon} className="w-4 h-4" alt="star" />
  <img src={starIcon} className="w-4 h-4" alt="star" />
  <img src={starIcon} className="w-4 h-4" alt="star" />

  <p className="pl-2 text-sm text-gray-600">(122)</p>
</div>



          <p className="mt-5 text-3xl font-medium">₹{product.price}</p>

          <p className="mt-5 text-gray-500 md:w-4/5">{product.description}</p>

          {/* SIZES */}
          <div className="flex flex-col gap-4 my-8">
            <p>Select Size</p>
            <div className="flex gap-2">
              {sizesArray.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`border py-2 px-4 ${
                    selectedSize === size
                      ? "bg-black text-white"
                      : "bg-gray-100"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={() => addToCart(product, selectedSize, 1)}
            className="bg-black text-white px-8 py-3 text-sm"
            disabled={!selectedSize}
          >
            ADD TO CART
          </button>
          <hr class="mt-8 sm:w-4/5"></hr>

<div class="text-sm text-gray-500 mt-5">
  <ul class="list-disc list-inside flex flex-col gap-1">
    <li>100% Original product.</li>
    <li>Cash on delivery is available on this product.</li>
    <li>Easy return and exchange policy within 7 days.</li>
  </ul>
</div>

        </div>
      </div>

      <div class="mt-20">
        <div class="flex">
          <b class="border px-5 py-3 text-sm">Description</b>
          <p class="border px-5 py-3 text-sm">Reviews (122)</p>
        </div>
        <div class="flex flex-col gap-4 border px-6 py-6 text-sm text-gray-500">
          <p>
            An e-commerce website is an online platform that facilitates the
            buying and selling of products or services over the internet. It
            serves as a virtual marketplace where businesses and individuals can
            showcase their products, interact with customers, and conduct
            transactions without the need for a physical presence. E-commerce
            websites have gained immense popularity due to their convenience,
            accessibility, and the global reach they offer.
          </p>
          <p>
            E-commerce websites typically display products or services along
            with detailed descriptions, images, prices, and any available
            variations (e.g., sizes, colors). Each product usually has its own
            dedicated page with relevant information.
          </p>
        </div>
      </div>
      <Related product={product} />
    </div>
  );
};

export default Product;
