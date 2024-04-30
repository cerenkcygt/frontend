import React from 'react'
import axiosInstance from '../api/axiosInstance'
import { useState, useEffect } from 'react'
import { List } from 'antd';
import ListItems from '../components/ListItems'

const Accessory = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        axiosInstance.get("/product/7").then((res) => {
            setProducts(res.data.products);
        });
    }, []);

  return (
    <div className='flex flex-col mx-auto w-full gap-3'>
        <h1 className="text-2xl font-bold">Aksesuar</h1>
        <ListItems products={products}/>
    </div>
  )
}

export default Accessory
