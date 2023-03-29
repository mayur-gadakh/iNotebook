
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
import Alert from './components/Alert';


        

function App() {
  return (
    <div>
<ContaxtState>
      <BrowserRouter>
    
        <Navbar></Navbar>
        <Alert message={"this is alert "}></Alert>
        <div className='container'>
        <Routes>
          

          <Route exact path="/" element={<Home></Home>}></Route>
          <Route exact path="/about" element={<About></About>}></Route>
          
        </Routes>
       
        </div>
      </BrowserRouter>
      </ContaxtState>
      
    </div>
  )
}

export default App;
