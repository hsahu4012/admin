import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { DataAppContext } from "../../DataContext";
import { toBeVisible } from "@testing-library/jest-dom/matchers";

const LeftPanel = () => {
  const localContext = useContext(DataAppContext);
  const usertype = localStorage.getItem("usertype");
  const { appstate } = localContext;
  const { showmenu } = appstate;
  //console.log('usertype', usertype)
  //console.log('localcontext in left panel - ', localContext);

  //to re-rende left panel on login
  const [test, setTest] = useState(false);
  useEffect(() => {
    setTest(appstate.loginstatus);
  }, [localContext.appstate]);

  return (
    <>
      {test && (
        <aside
          id="left-panel"
          className={!test ? "left-panel display_block" : "left-panel"}
        >
          <nav className="navbar navbar-expand-sm navbar-default">
            <div id="main-menu" className="main-menu collapse navbar-collapse">
              <ul className="nav navbar-nav">
                {/* <li className="menu-title">&nbsp;</li> */}

                {true && (
                  <>
                    {/* <li className="menu-item-has-children dropdown"></li>
                                        <li className="menu-item-has-children dropdown"></li> */}
                    <li className="menu-title">Admin Options</li>

                    <li className="menu-item-has-children dropdown bg-success bg-opacity-25">
                      <Link to="/brandlist">Brands</Link>
                    </li>
                    <li className="menu-item-has-children dropdown bg-success bg-opacity-25">
                      <Link to="/categoryDetails">Category</Link>
                    </li>
                    <li className="menu-item-has-children dropdown bg-success bg-opacity-25">
                      <Link to="/subcategorylist">Sub-Category</Link>
                    </li>
                    <li className="menu-item-has-children dropdown bg-success bg-opacity-25">
                      <Link to="/productslist">Products</Link>
                    </li>

                    <li className="menu-item-has-children dropdown bg-warning bg-opacity-25">
                      <Link to="/userslist">Users</Link>
                    </li>
                    <li className="menu-item-has-children dropdown bg-warning bg-opacity-25">
                      <Link to="/customerDetails">Customers</Link>
                    </li>
                    <li className="menu-item-has-children dropdown bg-warning bg-opacity-25">
                      <Link to="/addressdetails">Address</Link>
                    </li>

                    <li className="menu-item-has-children dropdown bg-primary bg-opacity-25">
                      <Link to="/orders">Orders</Link>
                    </li>
                    <li className="menu-item-has-children dropdown">
                      <Link to="/orderDetails">Orders Details</Link>
                    </li>

                    <li className="menu-item-has-children dropdown">
                      <Link to="/wishlist">WishList</Link>
                    </li>

                    <li className="menu-item-has-children dropdown">
                      <Link to="/complainslist">Complains</Link>
                    </li>

                    <li className="menu-item-has-children dropdown">
                      <Link to="/vendorDetails">Vendor</Link>
                    </li>

                    <li className="menu-item-has-children dropdown">
                      <Link to="/imageList">Image Upload</Link>
                    </li>

                    {!test && (
                      <li className="menu-item-has-children dropdown">
                        <Link to="/login">Login</Link>
                      </li>
                    )}

                    {test && (
                      <li className="menu-item-has-children dropdown">
                        <Link
                          to="/login"
                          onClick={() => {
                            localContext.logout_user();
                          }}
                        >
                          Logout
                        </Link>
                      </li>
                    )}

                    {/* <li className="menu-title">Student Options</li>
                                        <li className="menu-item-has-children dropdown"><Link to='/profile' >Profile</Link></li>
                                        <li className="menu-item-has-children dropdown"><Link to='/dashboard' >Dashboard</Link></li>
                                        <li className="menu-item-has-children dropdown"><Link to='/examlist' >Upcoming Exams</Link></li>
                                        <li className="menu-item-has-children dropdown"><Link to='/examtaken' >Exams Taken</Link></li> */}
                  </>
                )}

                {/* {
                                (usertype === 'student') && (
                                    <>
                                        <li className="menu-item-has-children dropdown"><Link to='/profile' >Profile</Link></li>
                                        <li className="menu-item-has-children dropdown"><Link to='/dashboard' >Dashboard</Link></li>
                                        <li className="menu-item-has-children dropdown"><Link to='/examlist' >Upcoming Exams</Link></li>
                                        <li className="menu-item-has-children dropdown"><Link to='/examtaken' >Exams Taken</Link></li>
                                    </>
                                )
                            } */}
              </ul>
            </div>
          </nav>
        </aside>
      )}
    </>
  );
};

export default LeftPanel;
