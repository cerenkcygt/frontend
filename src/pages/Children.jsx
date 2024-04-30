import React from 'react'
import axiosInstance from '../api/axiosInstance'
import { useState, useEffect } from 'react'
import ListItems from '../components/ListItems'

const Children = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        axiosInstance.get("/product/5").then((res) => {
            setProducts(res.data.products);
        });
    }, []);

  return (
    <div className='flex flex-col mx-auto w-full gap-3'>
        <h1 className="text-2xl font-bold">Çocuk</h1>
        <ListItems products={products}/>
    </div>
  )
}

export default Children
