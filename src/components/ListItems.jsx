import React, { useState } from 'react';
import { Input, Select } from 'antd';
import { Link } from 'react-router-dom';

export default function Example({ products, loading }) {
  const [filter, setFilter] = useState('');
  const [sortOrder, setSortOrder] = useState('ascending');

  const filteredProducts = products
    .filter(product =>
      product.name.toLowerCase().includes(filter.toLowerCase())
    )
    .sort((a, b) => {
      return sortOrder === 'ascending' 
        ? a.price - b.price 
        : b.price - a.price;
    });

    if (loading) {
        return <div className="flex justify-center items-center h-96">Yükleniyor...</div>;
    }

  return (
    <div className="bg-white w-full">
      <div className="max-w-7xl mx-auto px-5 lg:px-8">

        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <Input
            placeholder="Ürün ara"
            value={filter}
            onChange={e => setFilter(e.target.value)}
            className="w-full md:max-w-xs mb-3 md:mb-0"
          />

          <Select
            defaultValue="ascending"
            style={{ width: 180 }}
            onChange={value => setSortOrder(value)}
          >
            <Select.Option value="ascending">Düşükten Yükseğe</Select.Option>
            <Select.Option value="descending">Yüksekten Düşüğe</Select.Option>
          </Select>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <div key={product.id} className="group">
              <Link 
                to={`/details/${product.id}`}
                className="bg-gray-200 rounded-lg overflow-hidden">
                <img
                  src={product.img_url}
                  alt={product.name}
                  className="h-80 w-full object-fit group-hover:opacity-75 transition-opacity duration-300 ease-in-out"
                />
              </Link>
              <h3 className="mt-4 text-md text-gray-700">{product.name}</h3>
              <p className="text-lg font-medium text-gray-900">{`${product.price} TL`}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
