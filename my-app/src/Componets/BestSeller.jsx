
import axios from "axios";
import { useState , useEffect } from "react";

const BestSeller = () => {

  const [bestSellerProduct , setbestSellerProduct] = useState([]);
  useEffect(() =>{

    
          const fetchBestProdut =  async () => {
            try{
                 const request = await axios.get("http://localhost:8080/api/product/bestSeller");
             setbestSellerProduct(request.data);
            }catch(error){
              console.log(error);
            }
          }
          fetchBestProdut();
  } ,[])






  

  return (
    <div className="my-10">
      {/* Section Header */}
      <div className="text-center py-8 text-3xl">
        <div className="inline-flex gap-2 items-center mb-3">
          <p className="text-gray-500">
            BEST <span className="text-gray-700 font-medium">SELLERS</span>
          </p>
          <p className="w-8 sm:w-12 h-[1px] sm:h-[2px] bg-gray-700"></p>
        </div>

        <p className="w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600">
          Lorem Ipsum is simply dummy text of the printing and typesetting industry.
          Lorem Ipsum has been the.
        </p>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
        {bestSellerProduct.map((item) => (
          <a
            key={item.id}
            href={`/product/${item.id}`}
            className="text-gray-700 cursor-pointer"
          >
            <div className="overflow-hidden">
              <img
                src={item.imageUrls[0]} 
                alt={item.name}
                className="hover:scale-110 transition ease-in-out"
              />
            </div>

            <p className="pt-3 pb-1 text-sm">{item.name}</p>
            <p className="text-sm font-medium">${item.price}</p>
          </a>
        ))}
      </div>
    </div>
  );
};

export default BestSeller;
