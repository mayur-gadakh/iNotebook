
import './App.css';
import About from './components/About';
import Navbar from './components/Navbar';
import Home from './components/Home';

import {
  BrowserRouter as BrowserRouter,
  Routes,
  Route
}
  from "react-router-dom";
import ContaxtState from './context/ContaxtState';

import { ToastContainer } from 'react-toastify';

  import 'react-toastify/dist/ReactToastify.css';
  import Signup from './components/Signup';
  import Login from './components/Login';
  



        

function App() {
  return (
    <div>
<ContaxtState>
      <BrowserRouter>
    
        <Navbar></Navbar>
        <ToastContainer />
        <div className='container'>
        <Routes>
          

          <Route exact path="/" element={<Home></Home>}></Route>
          <Route exact path="/about" element={<About></About>}></Route>
          <Route exact path="/login" element={<Login></Login>}></Route>
          <Route exact path="/Signup" element={<Signup></Signup>}></Route>
          

          
        </Routes>
       
        </div>
      </BrowserRouter>
      </ContaxtState>
      
    </div>
  )
}

export default App;
