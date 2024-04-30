import React from 'react'
import { Badge, Descriptions } from 'antd';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axiosInstance from '../api/axiosInstance';

const categories = [
    {
        id: 1,
        name: "Kadın"
    },
    {
        id: 2,
        name: "Erkek"
    },
    {
        id: 4,
        name: "Bebek"
    },
    {
        id: 5,
        name: "Çocuk"
    },
    {
        id:7,
        name: "Aksesuar"
    }
]

const Details = () => {
    const { id } = useParams();
    const [product, setProduct] = useState({});
    const [loading, setLoading] = useState(true);
    console.log(id);

    useEffect(() => {
        axiosInstance.get(`/product/id/${id}`).then((res) => {
            setProduct(res.data);
            setLoading(false);
            console.log(res.data);
        });
    }, [id]);

  return (
    <div>
        <Descriptions title="Product Details" bordered>
            <Descriptions.Item label="Name">{product.name}</Descriptions.Item>
            <Descriptions.Item label="Price">{product.price}</Descriptions.Item>
            <Descriptions.Item label="Image"><img src={product.img_url} alt={product.name} style={{width: "100px"}}/></Descriptions.Item>
            <Descriptions.Item label="Category">{categories.find((category) => category.id === product.category_id)?.name}</Descriptions.Item>
            <Descriptions.Item label="Stock">
            <Badge status={product.stock > 0 ? "success" : "error"} text={product.stock > 0 ? "In Stock" : "Out of Stock"} />
            </Descriptions.Item>
        </Descriptions>
    </div>
  )
}

export default Details
