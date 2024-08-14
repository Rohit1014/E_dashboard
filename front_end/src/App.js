import './App.css';
import Footer from './Component/Footer';
import Signup from './Component/signup';
import PrivateComponent from './Component/PrivateComponent';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import Login from './Component/Login';
import Nav from './Component/nav';
import AddProduct from './Component/AddProduct';
import ProductList from './Component/ProductList';
import UpdateProduct from './Component/UpdateProduct';
import Profile from './Component/Profile';
import EditUser from './Component/EditUser';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Nav />
      <Routes>
        <Route element={<PrivateComponent />} >
        <Route path="/" element={<ProductList /> } />
        <Route path="/add" element={ <AddProduct /> } />
        <Route path="/update/:id" element={<UpdateProduct />} />
        <Route path="/logout" element={<h1> logout Product listing component </h1>} />
        <Route path="/profile" element={<Profile/>} />
        <Route path="/edituser" element={<EditUser />} />

        
        </Route>


        <Route path="/login" element={<Login />} />

        <Route path="/Signup" element={<Signup />} />
      </Routes>
      <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
