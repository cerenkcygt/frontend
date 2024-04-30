import React from 'react'
import ListItems from '../components/ListItems'
import axiosInstance from '../api/axiosInstance'
import { useState, useEffect } from 'react'

const Womans = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        axiosInstance.get("/product/1").then((res) => {
            setProducts(res.data.products);
        });
    }, []);

    console.log(products);

  return (
    <div className='flex flex-col mx-auto w-full gap-3'>
        <h1 className="text-2xl font-bold">Kadın</h1>
        <ListItems products={products}/>
    </div>
  )
}

export default Womans