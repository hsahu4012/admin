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

import Dashboard from './components/student/Dashboard';
import Examlist from './components/student/Examlist';
import ExamTaken from './components/student/ExamsTaken';
import Examprogress from './components/student/Examprogress';
import Examresult from './components/student/Examresult';
import Examstart from './components/student/Examstart';
import Home from './components/common/Home';
import Login from './components/common/Login';
import ExamReview from './components/student/ExamReview';


import QsAdd from './components/admin/QsAdd';
import BulkQsAdd from './components/admin/BulkQsAdd';
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
import ExamDetail from './components/student/ExamDetail';
import Profile from './components/common/Profile';
import SubjectList from './components/admin/SubjectList';
import SubjectAdd from './components/admin/SubjectAdd';
import SubjectUpdate from './components/admin/SubjectUpdate';
import CustomerDetails from './components/customer/CustomerDetails';
import CustomerCreate from './components/customer/CustomerCreate';
import CustomerUpdate from './components/customer/CustomerUpdate';

function App() {

  //temp code to keep server live
  const callApiQsList = async () => {
    console.log('running.............................')
    try {
      const url = process.env.REACT_APP_API_URL + 'exams/fetchallexams';
      const response = await axios.get(url);
    }
    catch (error) { console.log(error); }
  }
  useEffect(() => {
    setInterval(() => callApiQsList(), 10000)
  }, [])
  //temp code to keep server live

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
                  {/* <div>
                  <br></br>
                  <br></br><br></br><br></br><br></br><br></br><br></br><br></br>
                  <br></br><br></br><br></br><br></br><br></br><br></br><br></br>
                  <br></br><br></br><br></br><br></br><br></br><br></br><br></br>
                  <br></br><br></br><br></br><br></br><br></br><br></br><br></br>
                  <br></br><br></br><br></br><br></br><br></br><br></br><br></br>
                  <br></br><br></br><br></br><br></br><br></br><br></br><br></br>
                  <br></br><br></br><br></br><br></br><br></br><br></br><br></br>
                  <br></br>
                </div> */}
                  <Routes>
                  <Route path='/customerDetails' element={<CustomerDetails />} />
                  <Route path='/customerCreate' element={<CustomerCreate />} />
                  <Route path='/customerUpdate/:id' element={<CustomerUpdate />} />
                    <Route path='/profile' element={<Profile />} />
                    <Route path='/dashboard' element={<Dashboard />} />
                    <Route path='/dashboardadmin' element={<DashboardAdmin />} />
                    <Route path='/adminnotice' element={<AdminNotice />} />
                    <Route path='/home' element={<Home />} />
                    <Route path='/login' element={<Login />} />
                    <Route path='/examlist' element={<Examlist />} />
                    <Route path='/examtaken' element={<ExamTaken />} />
                    <Route path='/examdetail/:examid' element={<ExamDetail />} />
                    <Route path='/examstart' element={<Examstart />} />
                    <Route path='/examprogress/:examid' element={<Examprogress />} />
                    <Route path='/examreview/:examid' element={<ExamReview />} />
                    <Route path='/examresult/:examid' element={<Examresult />} />
                    <Route path='/qslist' element={<QsList />} />
                    <Route path='/qsadd' element={<QsAdd />} />
                    <Route path='/Bulkqsadd' element={<BulkQsAdd />} />
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
                    <Route path='/' element={<Dashboard />} />
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
