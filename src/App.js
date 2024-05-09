
import './App.css';
import Home from './Pages/home';
import Aboutus from './Pages/aboutus';
import ViewProducts from './Pages/viewproducts';
import {BrowserRouter, Routes, Route} from 'react-router-dom';


function App() {
  return (
    <div >
     <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path="/home" element={<Home/>}/>
          <Route path="/aboutus" element={<Aboutus/>}/>
          <Route path="/product/view-products" element={<ViewProducts />} />
        </Routes>

     </BrowserRouter>
     
    </div>
  );
}

export default App;
