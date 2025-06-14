import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
// import { ProductContext } from "../utils/Context";
import axios from "../utils/axios";
import Loading from "./Loading";
const Details = () => {
  const [products, setproducts] = useState(null);
  const { id } = useParams();
  console.log(id);

  const getsingleproduct = async () => {
    try {
      const { data } = await axios.get(`/products/${id}`);
      setproducts(data)
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getsingleproduct();
  }, []);

  return ( products ?
    <div className="w-[70%] h-full flex justify-between  m-auto p-[10%]">
      <img
        className="object-contain h-[80%] w-[50%]"
        src={`${products.image}`}
        alt=""
      />
      <div className="content w-[60%] px-3 py-20">
        <h1 className="text-4xl ">{`${products.title}`}</h1>
        <h3 className="text-zinc-400 py-1">{`${products.category}`}</h3>
        <h2 className="text-red-300 py-1">{`${products.price}`}</h2>
        <p className="mb-5">
         {`${products.description}`}
        </p>
        <Link className="py-2 px-5  border rounded border-blue-500 mr-5">
          Edit
        </Link>
        <Link className="py-2 px-5  border rounded border-red-500">Delete</Link>
      </div>
    </div> :<Loading/>
  );
};
export default Details;
