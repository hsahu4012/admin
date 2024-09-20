import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';

const ProductView = () => {
  const temp = useParams();
  console.log(temp.productid);
  const [product, setProduct] = useState({});

  const fetchProductById = async id => {
    try {
      const url = process.env.REACT_APP_API_URL + 'products/productById/' + id;
      const response = await axios.get(url);
      console.log(response.data);
      setProduct(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchProductById(temp.productid);
  }, []);
  return (
    <div>
      <h2>Products View</h2>

      <div>
        <b>Product Name -</b> {product.prod_name}
      </div>
      <div>
        <b>Category -</b> {product.categoryname}
      </div>
      <div>
        <b>Subcategory -</b> {product.subcategoryname}
      </div>
      <div>
        <b>Price -</b> {product.price}
      </div>
      <div>
        <b>Brand -</b> {product.brand_name}
      </div>
      <div>
        <b>Stock Quantity -</b> {product.stock_quantity}
      </div>
      <div>
        <b>Discount -</b> {product.discount}
      </div>
      <div>
        <b>Description -</b>{' '}
        <div dangerouslySetInnerHTML={{ __html: product.prod_desc }} />
      </div>
      <div>
        <b>Image -</b>{' '}
        <img
          src={`${process.env.REACT_APP_API_URL}${product.image}`}
          alt='Product'
          className='product-view'
        />
      </div>

      <div className='row'>
        <div className='text-center my-4'>
          <Link to='/productslist' className='btn btn-primary'>
            Back to Product List
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductView;
