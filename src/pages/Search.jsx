import React, { useEffect , useState } from 'react';
import { useLocation } from 'react-router-dom';
import axiosInstance from '../api/axiosInstance';
import  ListItems  from '../components/ListItems';

function useQuery() {
    return new URLSearchParams(useLocation().search);
  }
  
const Search = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    let query = useQuery();
    
    useEffect(() => {
        axiosInstance.get(`/product/search?query=${query.get("q")}`).then((res) => {
            setProducts(res.data.products);
            setLoading(false);
        });
    }
    , [query.get("q")]);

    console.log(products);

  return (
    <div className='flex flex-col mx-auto w-full gap-3'>
        <h1 className="text-2xl font-bold">Arama Sonuçları</h1>
        <ListItems products={products} loading={loading}/>
    </div>
  )
}

export default Search