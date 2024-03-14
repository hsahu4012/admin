import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { DataAppContext } from "../../DataContext";

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
    setTest(true);
  }, [localContext.appstate]);

  return (
    <>
      <aside
        id="left-panel"
        className={showmenu ? "left-panel display_block" : "left-panel"}
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
                  <li className="menu-item-has-children dropdown">
                    <Link to="/userslist">Users</Link>
                  </li>
                  <li className="menu-item-has-children dropdown">
                    <Link to="/customerDetails">Customers</Link>
                  </li>
                  <li className="menu-item-has-children dropdown">
                    <Link to="/productslist">Products</Link>
                  </li>
                  <li className="menu-item-has-children dropdown">
                    <Link to="/categoryDetails">Category</Link>
                  </li>
                  <li className="menu-item-has-children dropdown">
                    <Link to="/subcategorylist">Sub-Category</Link>
                  </li>
                  <li className="menu-item-has-children dropdown">
                    <Link to="/addressdetails">Address</Link>
                  </li>

                  <li className="menu-item-has-children dropdown">
                    <Link to="/orders">Orders</Link>
                  </li>

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
    </>
  );
};

export default LeftPanel;
