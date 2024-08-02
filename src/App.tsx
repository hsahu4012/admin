import React, { useEffect } from 'react';
import './App.css';
import axios from 'axios';
import Header from './components/shared/Header';
import Footer from './components/shared/Footer';
import LeftPanel from './components/shared/LeftPanel';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './style.css';
import './template.css';
import './cs-skin-elastic.css';
import DataApp from './DataContext';

import SecureHeader from './components/shared/SecureHeader';
import SecureFooter from './components/shared/SecureFooter';
import SecureLeftPanel from './components/shared/SecureLeftPanel';

import Home from './components/common/Home';
import Login from './components/common/Login';


import QsAdd from './components/admin/QsAdd';
import BulkProductAdd from './components/admin/BulkQsAdd';
import QsEdit from './components/admin/QsEdit';
import QsList from './components/admin/QsList';
import ExamsList from './components/admin/ExamsList';
import ExamsAdd from './components/admin/ExamsAdd';
import ExamsUpdate from './components/admin/ExamsUpdate';
import DashboardAdmin from './components/admin/DashboardAdmin';
import AdminNotice from './components/admin/Notice';

import UsersList from './components/admin/UsersList';
import UserAdd from './components/admin/UserAdd';
import UserUpdate from './components/admin/UserUpdate';
import Profile from './components/common/Profile';
import SubjectList from './components/admin/SubjectList';
import SubjectAdd from './components/admin/SubjectAdd';
import SubjectUpdate from './components/admin/SubjectUpdate';
import CustomerDetails from './components/customer/CustomerDetails';
import CustomerCreate from './components/customer/CustomerCreate';
import CustomerUpdate from './components/customer/CustomerUpdate';

import CategoryDetails from './components/category/CategoryDetails';
import CategoryCreate from './components/category/CategoryCreate';
import CategoryUpdate from './components/category/CategoryUpdate';

import ProductsList from './components/admin/products/ProductsList';
import ProductAdd from './components/admin/products/ProductAdd';
import ProductEdit from './components/admin/products/ProductEdit';
import ProductView from './components/admin/products/ProductView';

//complain routes
import ComplainsList from './components/Complains/ComplainsList';
import ComplainsAdd from './components/Complains/ComplainsAdd';
import ComplainsEdit from './components/Complains/ComplainsEdit';

//brand routes
import BrandList from './components/brand/BrandList';
import BrandCreate from './components/brand/BrandCreate';
import BrandUpdate from './components/brand/BrandUpdate';

import Subcategorylist from './components/admin/Sub-Category/Subcategorylist';
import Subcategoryadd from './components/admin/Sub-Category/Subcategoryadd';
import Subcategoryedit from './components/admin/Sub-Category/Subcategoryedit';
import Subcategoryview from './components/admin/Sub-Category/Subcategoryview';

import Addressdetails from './components/admin/Address/Addressdetails';
import Addressadd from './components/admin/Address/Addressadd';
import Addressupdate from './components/admin/Address/Addressupdate';

import Orderslist from './components/orders/Orderslist';
import OrdersUpdate from './components/orders/OrdersUpdate';
import OrdersCreate from './components/orders/OrdersCreate';
import WishlistList from './components/wishlist/WishlistList';
import WishlistAdd from './components/wishlist/WishlistAdd';
import WishlistUpdate from './components/wishlist/WishlistUpdate';
import OrderDetailsList from './components/order details/OrderDetailList';
import OrderDetailAdd from './components/order details/OrderDetailAdd';
import OrderDetailUpdate from './components/order details/OrderDetailUpdate';

import VendorList from './components/admin/VendorList';
import VendorAdd from './components/admin/VendorAdd';
import VendorUpdate from './components/admin/VendorUpdate';

import ImageList from './components/imageup/ImageList';

function App() {

  //temp code to keep server live
  const callApiQsList = async () => {
    console.log('running.............................')
    try {
      const url = process.env.REACT_APP_API_URL + 'products/allProducts';
      const response = await axios.get(url);
    }
    catch (error) { console.log(error); }
  }
  useEffect(() => {
    setInterval(() => callApiQsList(), 10000)
  }, [])
  //temp code to keep server live

  // const handleUploadSuccess = () => {
  //   console.log(`File uploaded successfully.`);
  // };

  return (
    <>
      <BrowserRouter>
        <DataApp>
          <>
            <LeftPanel />
            {/* <div className='container-fluid'> */}
            <div id="right-panel" className="right-panel">
              <Header />
              <div className='row maincontent content'>

                <div className='col-12 scrollPage'>

                  <Routes>
                    <Route path='/orderDetailsUpdate/:id' element={<OrderDetailUpdate />} />
                    <Route path='/orderDetailsCreate' element={<OrderDetailAdd />} />
                    <Route path='/orderDetails' element={<OrderDetailsList />} />
                    <Route path='/wishlistUpdate/:id' element={<WishlistUpdate />} />
                    <Route path='/wishlistCreate' element={<WishlistAdd />} />
                    <Route path='/wishlist' element={<WishlistList />} />
                    <Route path='/orders' element={<Orderslist />} />
                    <Route path='/orderCreate' element={<OrdersCreate />} />
                    <Route path='/orderUpdate/:id' element={<OrdersUpdate />} />
                    <Route path='/customerDetails' element={<CustomerDetails />} />
                    <Route path='/customerCreate' element={<CustomerCreate />} />
                    <Route path='/customerUpdate/:id' element={<CustomerUpdate />} />
                    <Route path='/profile' element={<Profile />} />
                    <Route path='/dashboardadmin' element={<DashboardAdmin />} />
                    <Route path='/adminnotice' element={<AdminNotice />} />
                    <Route path='/home' element={<Home />} />
                    <Route path='/login' element={<Login />} />
                    <Route path='/qslist' element={<QsList />} />
                    <Route path='/qsadd' element={<QsAdd />} />
                    <Route path='/Bulkqsadd' element={<BulkProductAdd />} />
                    <Route path='/qsedit/:id' element={<QsEdit />} />
                    <Route path='/examslist' element={<ExamsList />} />
                    <Route path='/examsadd' element={<ExamsAdd />} />
                    <Route path='/examsupdate/:examId' element={<ExamsUpdate />} />
                    <Route path='/userslist' element={<UsersList />} />
                    <Route path='/useradd' element={<UserAdd />} />
                    <Route path='/useredit/:id' element={<UserUpdate />} />
                    <Route path='/subjectslist' element={<SubjectList />} />
                    <Route path='/subjectadd' element={<SubjectAdd />} />
                    <Route path='/subjectedit/:id' element={<SubjectUpdate />} />

                    <Route path='/categoryDetails' element={<CategoryDetails />} />
                    <Route path='/categoryCreate' element={<CategoryCreate />} />
                    <Route path='/categoryUpdate/:id' element={<CategoryUpdate />} />
                    <Route path='/productslist' element={<ProductsList />} />
                    <Route path='/productadd' element={<ProductAdd />} />
                    <Route path='/productedit/:productid' element={<ProductEdit />} />
                    <Route path='/productview/:productid' element={<ProductView />} />
                    <Route path='/subcategorylist' element={<Subcategorylist />} />
                    <Route path='/subcategoryadd' element={<Subcategoryadd />} />
                    <Route path='/subcategoryedit/:subcategoryid' element={<Subcategoryedit />} />
                    <Route path='/subcategoryview/:subcategoryid' element={<Subcategoryview />} />
                    {/* complains route */}
                    <Route path='/complainslist' element={<ComplainsList />} />
                    <Route path='/complainsadd' element={<ComplainsAdd />} />
                    <Route path='/complainsedit/:complainid' element={<ComplainsEdit />} />

                    {/* brand route */}
                    <Route path='/brandlist' element={<BrandList />} />
                    <Route path='/brandcreate' element={<BrandCreate />} />
                    <Route path='/brandupdate/:id' element={<BrandUpdate />} />

                    <Route path='/addressdetails' element={<Addressdetails />} />
                    <Route path='/addressadd' element={<Addressadd />} />
                    <Route path='/addressupdate/:addressid' element={<Addressupdate />} />

                    <Route path='/vendorDetails' element={<VendorList />} />
                    <Route path='/vendoradd' element={<VendorAdd />} />
                    <Route path='/vendoredit/:vendorid' element={<VendorUpdate />} />

                    <Route path='/imageList' element={<ImageList />} />

                    <Route path='/' element={<DashboardAdmin />} />
                  </Routes>
                </div>

              </div>
              <Footer />
            </div>
          </>
        </DataApp>
      </BrowserRouter>
    </>
  );
}

export default App;
