import React from 'react'
import { Route, Routes } from 'react-router-dom';
import Header from './component/Header'
import Footer from './component/Footer';
import Home from './pages/Home/Home';
import AboutDoctor from './pages/About/AboutDoctor';
import BlogList from './pages/Blogs/BlogGrid';
import BlogDetail from './pages/Blogs/BlogDetail';
import ContactPage from './pages/Contact/ContactPage';
import Gallery from './pages/Gallery/Gallery';
import Career from './pages/Carrer/Carrer';
import SocialMediaIcons from './component/SocailMedia';
import About from './pages/About/About';
import PackageList from './pages/Package/PackageList';
import PackageDetail from './pages/Package/PackageDetail';
import TestPage from './pages/Test/TestPage';
import DetailPackage from './pages/Package/PackageDetail/DetailPackage';
import DemoPackage from './pages/Package/PackageDetail/DemoPackage';
import TestDetail from './pages/Test/TestDetail/TestDetail';
import ServiceList from './pages/ServiceOffered/ServiceList';
import TestTable from './pages/Test/TestTable';
import CareerForm from './pages/Carrer/CarrerForm';
import ServicePage from './pages/Service/ServicePage';
import ServicePageDetails from './pages/ServiceOffered/ServicePageDetails';
import FindTest from './pages/Test/FindTest';
import ReviewWidget from './component/Review';
import AppointmentForm from './component/AppoitmentForm';
import SidebarCart from './pages/Cart/SideBarCart';
import CheckoutPage from './pages/Cart/Checkout';
import TeamDetail from './pages/About/TeamDetial';
import BlogDetail1 from './pages/Blogs/BlogDetails1';
import BlogDetail2 from './pages/Blogs/BlogDetail2';
import ServiceListPage from './pages/ServiceOffered/ServiceListPage';
import BookHomeCollectionForm from './pages/Package/BookHomeCollection';
import ServiceSubListPage from './pages/ServiceOffered/ServiceSubListPage';
import ServiceDetailsMorePage from './pages/ServiceOffered/ServiceDetailsMorePage';
import ServiceCheckout from './pages/ServiceOffered/ServiceCheckOut';
import TopHeader1 from './component/TopHeader1';
import TermCondition from './pages/razorpay/TermCondition';
import Pathology from './pages/pathology/Pathology';
import TestCheckOut from './pages/Test/TestCheckOut';
import DirectorMessage from './pages/About/Director';
import ScanDetail from './pages/Scan/ScanDetail';
import TestMoreDetail from './pages/Test/TestMoreDetail';
import CheckOutPage from './pages/Checkout/CheckOutPage';
import PackageMoreDetail from './pages/pathology/PathologyMoreDetails';
import PathologyMoreDetail from './pages/pathology/PathologyDetail'
import Dashboard from './pages/Checkout/DashBoard';
import PrivacyPolicy from './utlis/PrivacyPolicy';
import RefundPolicy from './utlis/RefundPolicy';
import Login from './utlis/Login';
import TermsAndConditions from './utlis/TermCondition';
import SidebarContent from './component/SideBarContent';
import Ayush from './utlis/Ayush';
import OurManagement from './pages/About/OurManagement';
import DeletePrivacyPolicy from './utlis/DeletePolicy';
import CareerPage from './pages/Carrer/Carrer1';
import CareerListingPage from './pages/Carrer/CarrerListing'
import CareerPageDescription from './pages/Carrer/CarrerDescription';

// 🚫 Right-Click & Inspect Element Disable Code
const disableInspect = () => {
  document.addEventListener("contextmenu", (event) => event.preventDefault()); // Right-click disabled

  document.addEventListener("keydown", (event) => {
    if (
      event.ctrlKey && event.shiftKey && (event.keyCode === 73 || event.keyCode === 74) // Ctrl+Shift+I, Ctrl+Shift+J
      || event.ctrlKey && event.keyCode === 85 // Ctrl+U (View Source)
      || event.keyCode === 123 // F12
    ) {
      event.preventDefault();
    }
  });
};



const App = () => {
  // useEffect(() => {
  //   disableInspect();
  // }, []);

  return (
    <div className='overflow-x-hidden'>
    <TopHeader1/>
    <Header/>
       <Routes>
         <Route path='/' element={<Home/>} />
         <Route path='/about' element={<About/>} />
         <Route path='/director-message' element={<DirectorMessage/>} />
         <Route path='/review' element={<ReviewWidget/>} />
         <Route path='/about/team' element={<AboutDoctor/>} />
         <Route path='/about/management' element={<OurManagement/>} />
         <Route path='/about/team/:name' element={<TeamDetail/>} />
         <Route path='/blog' element={<BlogList/>} />
         <Route path='/blog/:name/detail' element={<BlogDetail/>} />
         <Route path='/contact' element={<ContactPage/>} />
         <Route path='/gallery' element={<Gallery/>} />
         {/* <Route path='/carrer' element={<CareerForm/>} /> */}
         <Route path='/carrer' element={<CareerPage/>} />
         <Route path='/carrer/:department' element={<CareerListingPage/>} />
         <Route path='/carrer/description/:department' element={<CareerPageDescription/>} />
         <Route path='/jobs/apply' element={<CareerForm/>} />
         <Route path='/package' element={<PackageList/>} />
         <Route path='/package/:name/detail' element={<DemoPackage/>} />
         <Route path='/scan' element={<ServiceListPage/>} />
         <Route path='/scan/:slug' element={<ServiceDetailsMorePage/>} />
         <Route path='/test/:slug' element={<TestMoreDetail/>} />
         <Route path='/service/checkout' element={<ServiceCheckout/>} />
         <Route path='/demo' element={<DetailPackage/>} />
         <Route path='/demo/p1' element={<DemoPackage/>} />
         <Route path='/find/test' element={<TestPage/>} />
         <Route path='/find/test/:table' element={<TestTable/>} />
         <Route path='/find/test/:table/cart' element={<TestCheckOut/>} />
         
         {/* <Route path='/pathology/:id' element={<FindTest/>} /> */}
         <Route path='/find/test/:name/detail' element={<TestDetail/>} />
         <Route path='/appointment' element={<AppointmentForm/>} />
         <Route path='/add/cart' element={<SidebarCart/>} />
         <Route path='/checkout' element={<CheckoutPage/>} />
         <Route path='/book-home-collection' element={<BookHomeCollectionForm/>} />

         <Route  path='/pathology' element={<Pathology/>}/>
         <Route  path='/pathology/:slug' element={<PathologyMoreDetail/>}/>
         <Route  path='/scan/detail' element={<ScanDetail/>}/>
         <Route  path='/scan/checkout' element={<CheckOutPage/>}/>
         <Route path='/package/:slug' element={<PackageMoreDetail/>} />
         <Route path='/dashboard' element={<Dashboard/>} />
         <Route path='/privacy-policy' element={<PrivacyPolicy/>} />
         <Route path='/delete-account' element={<DeletePrivacyPolicy/>} />
         <Route path='/refund-cancelation' element={<RefundPolicy/>} />
         <Route path='/term-condition' element={<TermsAndConditions/>} />
         <Route path='/login' element={<Login/>} />


         <Route path='/ayush' element={<Ayush/>}/>
       </Routes>
   <Footer/>  
   <SidebarContent/>
   {/* <SocialMediaIcons/>  */}
  </div>
  );
};

export default App;
