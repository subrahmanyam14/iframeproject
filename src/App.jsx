import { createContext, useState } from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Register from './Components/CommonComponents/Register';
import Home from './Components/CommonComponents/Home';
import ExtandPage from './Components/CardComponents/ExtandPage';
import ImageSlider from './Components/CardComponents/ImageSlider';
import Card from './Components/CardComponents/Card';
import Cards from './Components/CardComponents/Cards';
import UserProfile from './Components/CommonComponents/UserProfile'
import ForgetPassword from './Components/CommonComponents/ForgotPassword';
import Login from './Components/CommonComponents/Login';
import AddCard from './Components/Admin/AddCard';
import UpdateCard from './Components/Admin/UpdateCard';
import NavBar from './Components/NavComponent/NavBar';
import AllCards from './Components/CardComponents/AllCards';
import Footer from './Components/FooterComponent/Footer';
import AdminDashBoard from './Components/Admin/AdminDashBoard'; 


export const  Store = createContext();

function App() {
  const [token, setToken] = useState("");

  return (
    <>
      <BrowserRouter>
      <NavBar/>
      <Routes>
        <Route path='/' element={<Home/>} />

        <Route path='/register' element={<Register/>} />
        <Route path='/login' element={<Login/>}/>
        <Route path='/forgot-password' element={<ForgetPassword/>} />

        <Route path='/profile' element={<UserProfile/>} />

        <Route path='/add-card' element={<AddCard/>} /> 
        <Route path='/edit-card' element={<UpdateCard/>} />
        <Route path='/all-cards' element={<AllCards/>} />
        <Route path='/card-carousel' element={<Cards/>} />
        <Route path='/card' element={<Card/>} />
        <Route path='/image-slider' element={<ImageSlider/>}/>
        <Route path='/fullpage' element={<ExtandPage/>} />

        <Route path='/admin-dashboard' element={<AdminDashBoard/>}/>


        {/* <Route path='/user-dashboard' element={<UserDashBoard/>} /> */}
      </Routes>
      <Footer/>
      </BrowserRouter>
    </>
  )
}

export default App
