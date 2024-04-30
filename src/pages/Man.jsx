import React from 'react'
import axiosInstance from '../api/axiosInstance'
import { useState, useEffect } from 'react'
import ListItems from '../components/ListItems'


const Man = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axiosInstance.get("/product/2").then((res) => {
            setProducts(res.data.products);
            setLoading(false);
        });
    }, []);

    console.log(products);
  return (
    <div className='flex flex-col mx-auto w-full gap-3'>
        <h1 className="text-2xl font-bold">Erkek</h1>
        <ListItems products={products} loading={loading}/>
    </div>
  )
}

export default Man
