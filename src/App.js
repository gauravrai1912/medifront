
import './App.css';
import Home from './Pages/home';
import Aboutus from './Pages/aboutus';
import ViewProducts from './Pages/Products/viewproducts';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import AddProduct from './Pages/Products/addproduct';
import EditProduct from './Pages/Products/editproducts';
import DeleteProduct from './Pages/Products/deleteproducts';
import Loginpage from './Pages/loginpage';
import ForgotPasswordPage from './Pages/forgotpasswordpage';
import ResetPasswordPage from './Pages/resetPasswordPage';
import ViewSupplierPage from './Pages/Suppliers/viewsuppliers';
import AddSupplier from './Pages/Suppliers/addsupplier';
import EditSupplier from './Pages/Suppliers/editsupplier';
import DeleteSupplier from './Pages/Suppliers/deletesupplier';
import CreateOrders from './Pages/Orders/createorder';
import CreateOrderDetails from './Pages/Orders/createOrderDetails';
import ViewOrderDetails from './Pages/Orders/vieworders';
import EditOrderDetails from './Pages/Orders/editorderdetails';
import ViewInventory from './Pages/Inventory/viewinventory';
import AddInventory from './Pages/Inventory/addinventory';
import EditInventory from './Pages/Inventory/editinventory';
import DeleteInventory from './Pages/Inventory/deleteinventory';
import EditProfile from './Pages/editprofile';
import UpdatePassword from './Pages/updatepassword';
import DeleteOrder from './Pages/Orders/deleteorder';
import SignUpDialog from './Pages/signuppage';


function App() {
  return (
    <div >
     <BrowserRouter>
        <Routes>
          <Route path='/' element={<Loginpage/>}/>
          <Route path="/home" element={<Home/>}/>
          <Route path="/aboutus" element={<Aboutus/>}/>
          <Route path="/product/view-products" element={<ViewProducts />} />
          <Route path="/product/add-product" element={<AddProduct />} />
          <Route path='/product/edit-product' element={<EditProduct />} />
          <Route path='/product/delete-product' element={<DeleteProduct />} />
          <Route path='/login' element={<Loginpage/>}/>
          <Route path='/forgotpassword' element={<ForgotPasswordPage/>}/>
          <Route path='/reset-password' element={<ResetPasswordPage/>}/>
          <Route path='/suppliers/view-suppliers' element={<ViewSupplierPage/>}/>
          <Route path='/suppliers/add-supplier' element={<AddSupplier/>}/>
          <Route path='/suppliers/edit-supplier' element={<EditSupplier/>}/>
          <Route path='/suppliers/delete-supplier' element={<DeleteSupplier/>}/>
          <Route path='/orders/create-order' element={<CreateOrders/>}/>
          <Route path='/orders/order-details' element={<CreateOrderDetails/>}/>
          <Route path='/orders/view-orders' element={<ViewOrderDetails/>}/>
          <Route path='/orders/edit-order' element={<EditOrderDetails/>}/>
          <Route path='/inventory/check-inventory' element={<ViewInventory/>}/>
          <Route path='/inventory/add-inventory' element={<AddInventory/>}/>
          <Route path='/inventory/update-inventory' element={<EditInventory/>}/>
          <Route path='/inventory/delete-inventory' element={<DeleteInventory/>}/>
          <Route path='/edit-profile' element={<EditProfile/>}/>
          <Route path='/update-password' element={<UpdatePassword/>}/>
          <Route path='/orders/delete-order' element={<DeleteOrder/>}/>
          <Route path='/signup' element={<SignUpDialog/>}/>

        </Routes>

     </BrowserRouter>
     
    </div>
  );
}

export default App;
