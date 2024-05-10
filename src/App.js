
import './App.css';
import Home from './Pages/home';
import Aboutus from './Pages/aboutus';
import ViewProducts from './Pages/viewproducts';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import AddProduct from './Pages/addproduct';
import EditProduct from './Pages/editproducts';
import DeleteProduct from './Pages/deleteproducts';


function App() {
  return (
    <div >
     <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path="/home" element={<Home/>}/>
          <Route path="/aboutus" element={<Aboutus/>}/>
          <Route path="/product/view-products" element={<ViewProducts />} />
          <Route path="/product/add-product" element={<AddProduct />} />
          <Route path='/product/edit-product' element={<EditProduct />} />
          <Route path='/product/delete-product' element={<DeleteProduct />} />
        </Routes>

     </BrowserRouter>
     
    </div>
  );
}

export default App;
