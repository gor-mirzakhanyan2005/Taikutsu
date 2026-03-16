import Register from './components/Register';
import Login from './components/Login';
import Preferences from './components/Preferences';
import CurrentDeals from './components/CurrentDeals';
import MainPage from './components/MainPage';
import { Routes, Route} from 'react-router-dom';
import './App.css';
import MainLayout from './components/MainLayout';
import AboutUs from './components/AboutUs';
import MostPopular from './components/MostPopular';
import Cart from './components/Cart';
import ProfilePage from './components/ProfilePage';
import { createContext, useState, useEffect } from 'react';
import ProductPage from './components/ProductPage';
import { CartContext } from './context/CartContext';

export const ProductContext = createContext([])
export const UserContext = createContext()

function App() {
    const [searchBar, setSearchBar] = useState("");
    const [products, setProducts] = useState([])
    const [user, setUser] = useState(null);
    const [cart, setCart] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5145/api/products')
            .then(response => response.json())
            .then(productData => {
                productData.map(product => product.count = 1);
                console.log(productData);
                setProducts(productData);
            });
    }, [])

    return (
        <UserContext.Provider value={{ user, setUser }}>
            <CartContext.Provider value={{ cart, setCart }}>
                <ProductContext.Provider value={{ products, setProducts }}>
                    <Routes>
                        <Route path="/" element={<MainLayout setSearchBar={setSearchBar} />}>
                            <Route index element={<MainPage searchBar={searchBar} />} />
                            <Route path="productpages/:productID" element={<ProductPage products={products} />} />
                            <Route path="currentdeals" element={<CurrentDeals />} />
                            <Route path="aboutus" element={<AboutUs />} />
                            <Route path="mostpopular" element={<MostPopular />} />
                            <Route path="cart" element={<Cart />} />
                            <Route path="profile" element={<ProfilePage />} />
                        </Route>
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/preferences" element={<Preferences />} />
                    </Routes>
                </ProductContext.Provider>
            </CartContext.Provider>
        </UserContext.Provider>
  )
}

export default App
