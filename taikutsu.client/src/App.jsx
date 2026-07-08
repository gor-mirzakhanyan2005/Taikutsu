import Register from './components/Register';
import Login from './components/Login';
import Preferences from './components/Preferences';
import CurrentDeals from './components/CurrentDeals';
import MainPage from './components/MainPage';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import MainLayout from './components/MainLayout';
import AboutUs from './components/AboutUs';
import MostPopular from './components/MostPopular';
import Cart from './components/Cart';
import ProfilePage from './components/ProfilePage';
import { createContext, useState, useEffect } from 'react';
import ProductPage from './components/ProductPage';
import { CartContext } from './context/CartContext';
import Checkout from './components/Checkout';
import styles from './stylesheets/Loading.module.scss'

export const DarkModeContext = createContext();
export const RecommendedContext = createContext([]);
export const ProductContext = createContext([]);
export const UserContext = createContext();
function App() {
    const [searchBar, setSearchBar] = useState("");
    const [products, setProducts] = useState([]);
    const [recommended, setRecommended] = useState([]);
    const [user, setUser] = useState(null);
    const [cart, setCart] = useState([]);
    const [authLoading, setAuthLoading] = useState(true);
    const [darkmode, setDarkmode] = useState(() => {
        return localStorage.getItem("darkmode") === "true";
    });
    const [isHydrated, setIsHydrated] = useState(false);

    useEffect(() => {
        document.body.classList.toggle('dark', darkmode);
        document.body.classList.toggle('light', !darkmode);
        localStorage.setItem("darkmode", darkmode);
    }, [darkmode]);

    useEffect(() => {
        fetch(`/api/products`)
            .then(res => res.json())
            .then(data => {
                if (data.length === 0) {
                    return fetch("/api/products").then(res => res.json())
                }
                return data;
            })
            .then(finalData => {
                finalData.forEach(p => p.count = 1);
                setProducts(finalData);
            });
    }, []);

    const [anonId] = useState(() => {
        let id = localStorage.getItem("anonid");

        if (!id) {
            id = "anonid_" + crypto.randomUUID();
            localStorage.setItem("anonid", id)
        }

        return id;
    })

    const userId = user
        ? user.userId
        : `anon_${anonId}`;

    useEffect(() => {
        if (!userId) return;

        const fetchCart = async () => {
            try {
                const res = await fetch(`/api/cart?userId=${userId}`, {
                    method: "GET",
                    credentials: "include"
                });

                if (!res.ok) return;

                const data = await res.json();
                console.log("Raw cart response:", data);
                console.log("Cart array:", data.cart);

                setIsHydrated(true);
                setCart(data.cart ?? []);
            } catch (err) {
                console.error(err);
            }
        };

        fetchCart();
    }, [userId]);

    useEffect(() => {
        const restoreUser = async () => {
            try {
                const res = await fetch("/api/restore/me", {
                    credentials: "include"
                });

                if (res.ok) {
                    const data = await res.json();
                    setUser(data);
                }
            } catch (err) {
                console.error(err);
            } finally {
                console.log("Logged in.")
                setAuthLoading(false);
            }
        };

        restoreUser();
    }, []);

    if (authLoading) return (
        <div data-theme={darkmode ? "dark" : "light"} className={styles.loadingScreen}>
            <div className={styles.loadingCircle}></div>
        </div>
    );
    console.log(user);

    return (
        <UserContext.Provider value={{ user, setUser, userId }}>
            <DarkModeContext.Provider value={{ darkmode, setDarkmode }}>
                <CartContext.Provider value={{ cart, setCart }}>
                    <RecommendedContext.Provider value={{ recommended, setRecommended }}>
                        <ProductContext.Provider value={{ products, setProducts }}>
                            <Routes>
                                <Route path="/" element={<MainLayout setSearchBar={setSearchBar} darkmode={darkmode} setDarkmode={setDarkmode} />}>
                                    <Route index element={<MainPage searchBar={searchBar} />} />
                                    <Route path="productpages/:productID" element={<ProductPage products={products} />} />
                                    <Route path="currentdeals" element={<CurrentDeals />} />
                                    <Route path="aboutus" element={<AboutUs />} />
                                    <Route path="mostpopular" element={<MostPopular />} />
                                    <Route path="cart" element={<Cart isHydrated={isHydrated} />} />
                                    <Route path="profile" element={<ProfilePage setAuthLoading={setAuthLoading} />} />
                                    <Route path="checkout" element={<Checkout />} />
                                </Route>
                                <Route path="/login" element={<Login />} />
                                <Route path="/register" element={<Register />} />
                                <Route path="/preferences" element={<Preferences />} />
                            </Routes>
                        </ProductContext.Provider>
                    </RecommendedContext.Provider>
                </CartContext.Provider>
            </DarkModeContext.Provider>
        </UserContext.Provider>
    )
}

export default App
