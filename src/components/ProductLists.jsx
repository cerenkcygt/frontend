import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function Example({products}) {
    
    const totalProducts = products.length;
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [productsPerPage, setProductsPerPage] = useState(4);
    const [currentSlide, setCurrentSlide] = useState(0);
    const totalDots = Math.ceil(totalProducts / productsPerPage);

  useEffect(() => {
    function handleResize() {
      setWindowWidth(window.innerWidth);
    }

    window.addEventListener('resize', handleResize);

    // Update number of products per page based on window width
    const updateProductsPerPage = () => {
      if (windowWidth >= 1024) {
        setProductsPerPage(4);
      } else if (windowWidth >= 768) {
        setProductsPerPage(2);
      } else {
        setProductsPerPage(1);
      }
    };

    updateProductsPerPage();

    return () => window.removeEventListener('resize', handleResize);
  }, [windowWidth]);

  const nextSlide = () => {
    const nextIndex = currentSlide + productsPerPage;
    setCurrentSlide(nextIndex >= totalProducts ? 0 : nextIndex);
  };

  const prevSlide = () => {
    const prevIndex = currentSlide - productsPerPage;
    setCurrentSlide(prevIndex < 0 ? totalProducts - (totalProducts % productsPerPage || productsPerPage) : prevIndex);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index * productsPerPage);
  };

return (
<div className="bg-white">
    <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
    <h2 className="text-2xl font-bold tracking-tight text-gray-900">Yeni Ürünler</h2>

    <div className="flex items-center justify-between">
        <button onClick={prevSlide} aria-label="Previous slide">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        </button>
        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
        {products.slice(currentSlide, currentSlide + productsPerPage).map((product) => (
            <div key={product.id} className="group relative w-full">
            <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                <img
                src={product.img_url}
                alt={product.name}
                className=" object-fit w-80 h-80"
                />
            </div>
            <div className="mt-4 flex justify-between">
                <div>
                <h3 className="text-sm text-gray-700">
                    <Link to={`/details/${product.id}`} className="font-medium text-gray-900 hover:text-gray-700">
                    <span aria-hidden="true" className="absolute inset-0" />
                    {product.name}
                    </Link>
                </h3>
                </div>
                <p className="text-sm font-medium text-gray-900">{product.price} {" TL"}</p>
            </div>
            </div>
        ))}
        </div>
        <button onClick={nextSlide} aria-label="Next slide">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
        </button>
    </div>

    {totalDots > 1 && totalProducts <= 10 || windowWidth > 768 && (
          <div className="flex justify-center mt-4">
            {Array.from({ length: totalDots }).map((_, index) => (
              <button
                key={index}
                className={`h-3 w-3 mx-1 rounded-full ${index === Math.floor(currentSlide / productsPerPage) ? 'bg-black' : 'bg-gray-300'}`}
                onClick={() => goToSlide(index)}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        )}
    </div>
</div>
);
}