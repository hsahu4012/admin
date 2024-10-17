import React, { useContext, useEffect } from 'react';
import './App.css';
import axios from 'axios';
import Header from './components/shared/Header';
import Footer from './components/shared/Footer';
import LeftPanel from './components/shared/LeftPanel';
import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './style.css';
import './template.css';
import './cs-skin-elastic.css';
import DataApp from './DataContext';
import { DataAppContext } from './DataContext';
import Loader from './components/loader/Loader';
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
import ProductCopy from './components/admin/products/ProductCopy';

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

import ContactList from './components/contact/ContactList';
import AddContact from './components/contact/AddContact';
import UpdateContact from './components/contact/UpdateContact';

import VendorList from './components/admin/VendorList';
import VendorAdd from './components/admin/VendorAdd';
import VendorUpdate from './components/admin/VendorUpdate';
import DiscountList from "./components/discount/DiscountList";
import AddDiscount from "./components/discount/AddDiscount";
import UpdateDiscount from "./components/discount/UpdateDiscount";       
import TeamList from './components/Ourteam/TeamList';
import AddTeam from './components/Ourteam/AddTeam';
import UpdateTeam from './components/Ourteam/UpdateTeam';
import Settingslist from './components/settings/Settingslist';
import SettingCreate from './components/settings/SettingCreate';
import SettingUpdate from './components/settings/SettingUpdate';

import ImageList from './components/imageup/ImageList';
import ProtectedRoutes from './ProtectedRoutes';

function App() {
  //temp code to keep server live
  // const callApiQsList = async () => {
  //   console.log("running.............................");
  //   try {
  //     const url = process.env.REACT_APP_API_URL + "products/allProducts";
  //     const response = await axios.get(url);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  // useEffect(() => {
  //   setInterval(() => callApiQsList(), 10000);
  // }, []);
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
            <div id='right-panel' className='right-panel'>
              <Header />
              <div className='row maincontent content'>
                <div className='col-12 scrollPage'>
                  <Routes>
                  <Route path='/loader' element={<Loader />} />
                    <Route
                      path='/orderDetailsUpdate/:id'
                      element={
                        <ProtectedRoutes
                          props={{ Component: OrderDetailUpdate }}
                        />
                      }
                    />
                    <Route
                      path='/orderDetailsCreate'
                      element={
                        <ProtectedRoutes
                          props={{ Component: OrderDetailAdd }}
                        />
                      }
                    />
                    <Route
                      path='/orderDetails'
                      element={
                        <ProtectedRoutes
                          props={{ Component: OrderDetailsList }}
                        />
                      }
                    />
                    <Route
                      path='/wishlistUpdate/:id'
                      element={
                        <ProtectedRoutes
                          props={{ Component: WishlistUpdate }}
                        />
                      }
                    />
                    <Route
                      path='/wishlistCreate'
                      element={
                        <ProtectedRoutes props={{ Component: WishlistAdd }} />
                      }
                    />
                    <Route
                      path='/wishlist'
                      element={
                        <ProtectedRoutes props={{ Component: WishlistList }} />
                      }
                    />
                    <Route
                      path='/orders'
                      element={
                        <ProtectedRoutes props={{ Component: Orderslist }} />
                      }
                    />
                    <Route
                      path='/orderCreate'
                      element={
                        <ProtectedRoutes props={{ Component: OrdersCreate }} />
                      }
                    />
                    <Route
                      path='/orderUpdate/:id'
                      element={
                        <ProtectedRoutes props={{ Component: OrdersUpdate }} />
                      }
                    />
                    <Route
                      path='/customerDetails'
                      element={
                        <ProtectedRoutes
                          props={{ Component: CustomerDetails }}
                        />
                      }
                    />
                    <Route
                      path='/customerCreate'
                      element={
                        <ProtectedRoutes
                          props={{ Component: CustomerCreate }}
                        />
                      }
                    />
                    <Route
                      path='/customerUpdate/:id'
                      element={
                        <ProtectedRoutes
                          props={{ Component: CustomerUpdate }}
                        />
                      }
                    />
                    <Route
                      path='/profile'
                      element={
                        <ProtectedRoutes props={{ Component: Profile }} />
                      }
                    />
                    <Route
                      path='/dashboardadmin'
                      element={
                        <ProtectedRoutes
                          props={{ Component: DashboardAdmin }}
                        />
                      }
                    />
                    <Route
                      path='/adminnotice'
                      element={
                        <ProtectedRoutes props={{ Component: AdminNotice }} />
                      }
                    />
                    <Route
                      path='/home'
                      element={<ProtectedRoutes props={{ Component: Home }} />}
                    />
                    <Route
                      path='/login'
                      element={<ProtectedRoutes props={{ Component: Login }} />}
                    />
                    <Route
                      path='/qslist'
                      element={
                        <ProtectedRoutes props={{ Component: QsList }} />
                      }
                    />
                    <Route
                      path='/qsadd'
                      element={<ProtectedRoutes props={{ Component: QsAdd }} />}
                    />
                    <Route
                      path='/Bulkqsadd'
                      element={
                        <ProtectedRoutes
                          props={{ Component: BulkProductAdd }}
                        />
                      }
                    />
                    <Route
                      path='/qsedit/:id'
                      element={
                        <ProtectedRoutes props={{ Component: QsEdit }} />
                      }
                    />
                    <Route
                      path='/examslist'
                      element={
                        <ProtectedRoutes props={{ Component: ExamsList }} />
                      }
                    />
                    <Route
                      path='/examsadd'
                      element={
                        <ProtectedRoutes props={{ Component: ExamsAdd }} />
                      }
                    />
                    <Route
                      path='/examsupdate/:examId'
                      element={
                        <ProtectedRoutes props={{ Component: ExamsUpdate }} />
                      }
                    />
                    <Route
                      path='/userslist'
                      element={
                        <ProtectedRoutes props={{ Component: UsersList }} />
                      }
                    />
                    <Route
                      path='/useradd'
                      element={
                        <ProtectedRoutes props={{ Component: UserAdd }} />
                      }
                    />
                    <Route
                      path='/useredit/:id'
                      element={
                        <ProtectedRoutes props={{ Component: UserUpdate }} />
                      }
                    />
                    <Route
                      path='/subjectslist'
                      element={
                        <ProtectedRoutes props={{ Component: SubjectList }} />
                      }
                    />
                    <Route
                      path='/subjectadd'
                      element={
                        <ProtectedRoutes props={{ Component: SubjectAdd }} />
                      }
                    />
                    <Route
                      path='/subjectedit/:id'
                      element={
                        <ProtectedRoutes props={{ Component: SubjectUpdate }} />
                      }
                    />

                    <Route
                      path='/categoryDetails'
                      element={
                        <ProtectedRoutes
                          props={{ Component: CategoryDetails }}
                        />
                      }
                    />
                    <Route
                      path='/categoryCreate'
                      element={
                        <ProtectedRoutes
                          props={{ Component: CategoryCreate }}
                        />
                      }
                    />
                    <Route
                      path='/categoryUpdate/:id'
                      element={
                        <ProtectedRoutes
                          props={{ Component: CategoryUpdate }}
                        />
                      }
                    />
                    <Route
                      path='/productslist'
                      element={
                        <ProtectedRoutes props={{ Component: ProductsList }} />
                      }
                    />
                    <Route
                      path='/productadd'
                      element={
                        <ProtectedRoutes props={{ Component: ProductAdd }} />
                      }
                    />
                    <Route
                      path='/productedit/:productid'
                      element={
                        <ProtectedRoutes props={{ Component: ProductEdit }} />
                      }
                    />
                    <Route
                      path='/productview/:productid'
                      element={
                        <ProtectedRoutes props={{ Component: ProductView }} />
                      }
                    />
                    <Route
                      path='/productcopy/:productid'
                      element={
                        <ProtectedRoutes props={{ Component: ProductCopy }} />
                      }
                    />
                    <Route
                      path='/subcategorylist'
                      element={
                        <ProtectedRoutes
                          props={{ Component: Subcategorylist }}
                        />
                      }
                    />
                    <Route
                      path='/subcategoryadd'
                      element={
                        <ProtectedRoutes
                          props={{ Component: Subcategoryadd }}
                        />
                      }
                    />
                    <Route
                      path='/subcategoryedit/:subcategoryid'
                      element={
                        <ProtectedRoutes
                          props={{ Component: Subcategoryedit }}
                        />
                      }
                    />
                    <Route
                      path='/subcategoryview/:subcategoryid'
                      element={
                        <ProtectedRoutes
                          props={{ Component: Subcategoryview }}
                        />
                      }
                    />
                    {/* complains route */}
                    <Route
                      path='/complainslist'
                      element={
                        <ProtectedRoutes props={{ Component: ComplainsList }} />
                      }
                    />
                    <Route
                      path='/complainsadd'
                      element={
                        <ProtectedRoutes props={{ Component: ComplainsAdd }} />
                      }
                    />
                    <Route
                      path='/complainsedit/:complainid'
                      element={
                        <ProtectedRoutes props={{ Component: ComplainsEdit }} />
                      }
                    />

                    {/* brand route */}
                    <Route
                      path='/brandlist'
                      element={
                        <ProtectedRoutes props={{ Component: BrandList }} />
                      }
                    />
                    <Route
                      path='/brandcreate'
                      element={
                        <ProtectedRoutes props={{ Component: BrandCreate }} />
                      }
                    />
                    <Route
                      path='/brandupdate/:id'
                      element={
                        <ProtectedRoutes props={{ Component: BrandUpdate }} />
                      }
                    />

                    <Route
                      path='/addressdetails'
                      element={
                        <ProtectedRoutes
                          props={{ Component: Addressdetails }}
                        />
                      }
                    />
                    <Route
                      path='/addressadd'
                      element={
                        <ProtectedRoutes props={{ Component: Addressadd }} />
                      }
                    />
                    <Route
                      path='/addressupdate/:addressid'
                      element={
                        <ProtectedRoutes props={{ Component: Addressupdate }} />
                      }
                    />

                    <Route
                      path='/ContactList'
                      element={
                        <ProtectedRoutes props={{ Component: ContactList }} />
                      }
                    />
                    <Route
                      path='/AddContact'
                      element={
                        <ProtectedRoutes props={{ Component: AddContact }} />
                      }
                    />
                    <Route
                      path='/UpdateContact/:id'
                      element={
                        <ProtectedRoutes props={{ Component: UpdateContact }} />
                      }
                    />

                    <Route
                      path='/vendorDetails'
                      element={
                        <ProtectedRoutes props={{ Component: VendorList }} />
                      }
                    />
                    <Route
                      path='/vendoradd'
                      element={
                        <ProtectedRoutes props={{ Component: VendorAdd }} />
                      }
                    />
                    <Route
                      path='/vendoredit/:vendorid'
                      element={
                        <ProtectedRoutes props={{ Component: VendorUpdate }} />
                      }
                    />

                    <Route
                      path="/discountlist"
                      element={
                        <ProtectedRoutes props={{ Component: DiscountList }} />
                      }
                    />
                     <Route
                      path="/adddiscount"
                      element={
                        <ProtectedRoutes props={{ Component: AddDiscount  }} />
                      }
                    />
                    <Route
                      path="/updatediscount/:id"
                      element={
                        <ProtectedRoutes props={{ Component: UpdateDiscount }} />
                        }
                    />
                    
                   <Route
                      path='/teamlist'
                      element={
                        <ProtectedRoutes props={{ Component: TeamList }} />
                      }
                    />
                    <Route
                      path='/addteam'
                      element={
                        <ProtectedRoutes props={{ Component: AddTeam }} />
                      }
                    />
                    <Route
                      path='/updateteam/:id'
                      element={
                        <ProtectedRoutes props={{ Component: UpdateTeam }} />

                      }
                    />

                    <Route
                      path='/settingslist'
                      element={
                        <ProtectedRoutes props={{ Component: Settingslist }} />
                      }
                    />
                    <Route
                      path='/settingCreate'
                      element={
                        <ProtectedRoutes props={{ Component: SettingCreate }} />
                      }
                    />
                    <Route
                      path='/settingUpdate/:id'
                      element={
                        <ProtectedRoutes props={{ Component: SettingUpdate }} />
                      }
                    />

                    <Route
                      path='/imageList'
                      element={
                        <ProtectedRoutes props={{ Component: ImageList }} />
                      }
                    />

                    <Route
                      path='/'
                      element={
                        <ProtectedRoutes
                          props={{ Component: DashboardAdmin }}
                        />
                      }
                    />
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
