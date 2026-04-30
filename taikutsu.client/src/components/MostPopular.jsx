import { useContext, useState } from 'react';
import styles from '../stylesheets/MostPopular.module.scss';
import { ProductContext, UserContext, DarkModeContext } from '../App';
import { CartContext } from '../context/CartContext.jsx';
import { Link } from 'react-router-dom';
import Pagination from '../components/Pagination';

function MostPopular() {
    const { cart, setCart } = useContext(CartContext);
    const { darkmode } = useContext(DarkModeContext);
    const { userId } = useContext(UserContext);
    const { products } = useContext(ProductContext);
    const [currentPage, setCurrentPage] = useState(() => {
        return JSON.parse(localStorage.getItem('mostpopularpage')) || 1;
    });

    const cards = 12;

    const truncate = (text, maxLength) => {
        if (text.length > maxLength) {
            return text.substring(0, maxLength) + '...';
        } else {
            return text;
        }
    }

    const popularProducts = products.filter(product => product.productCountBought > 100);

    const lastIndex = currentPage * cards;
    const firstIndex = lastIndex - cards;
    const currentRange = popularProducts.slice(firstIndex, lastIndex);

    const getRating = (rating) => {
        switch (true) {
            case rating < 0.5:
                return <div>⯪☆☆☆☆</div>
            case rating < 1:
                return <div>★☆☆☆☆</div>
            case rating < 1.5:
                return <div>★⯪☆☆☆</div>
            case rating < 2:
                return <div>★★☆☆☆</div>
            case rating < 2.5:
                return <div>★★⯪☆☆</div>
            case rating < 3:
                return <div>★★★☆☆</div>
            case rating < 3.5:
                return <div>★★★⯪☆</div>
            case rating < 4:
                return <div>★★★★☆</div>
            case rating < 4.5:
                return <div>★★★★⯪</div>
            case rating === 5:
                return <div>★★★★★</div>
        }
    }

    const addToCart = async (product) => {
        console.log("product.categories:", product.categories);
        console.log("product.Categories:", product.Categories);
        const newItem = {
            productID: product.productID,
            productName: product.productName,
            productPrice: product.productPrice,
            productThumbnail: product.productThumbnail,
            productDiscount: product.productDiscount,
            categories: product.categories ?? product.Categories,
            count: 1
        };

        const newCart = [...cart, newItem];
        setCart(newCart);

        await fetch("/api/cart", {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify({ userId, cart: newCart })
        });

        for (const category of newItem.categories ?? []) {
            await fetch("/api/preference/update", {
                method: "POST",
                credentials: "include",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    Id: userId,
                    category: category,
                })
            });
        }
    };

    const convertCategory = (str) => {
        let splitStr = str.split("-");
        let partOne = splitStr[0].charAt(0).toUpperCase() + splitStr[0].slice(1);
        let finalCategory;

        if (splitStr.length > 1) {
            let partTwo = splitStr[1].charAt(0).toUpperCase() + splitStr[1].slice(1);
            finalCategory = partOne + " " + partTwo;
        } else {
            finalCategory = partOne;
        }

        return finalCategory;
    }

    return (
        <div data-theme={darkmode ? "dark" : "light"} className={styles.mostPopularBg}>
            <h1>Most popular</h1>
            <ul className={styles.mostPopularList}>
                {currentRange.filter(product => product.productCountBought > 100).map(product => {
                    return (
                        <li key={product.productID}>
                            <div className={styles.mostPopularCard}>
                                <Link to={`/productpages/${product.productID}`}>
                                    <div className={styles.topBar}>
                                        <div className={styles.ratingDisplay}>
                                            {getRating(product.productRating)}
                                        </div>
                                        {product.productDiscount !== 0 ?
                                            <div className={styles.discount}>
                                                {`-${product.productDiscount}%`}
                                            </div>
                                            : ''}
                                    </div>
                                    <img src={product.productThumbnail} onError={() => console.log("Failed to load:", product.productThumbnail)} />
                                    <div className={styles.tag}>
                                        {convertCategory(product.categories)}
                                    </div>
                                    <span className={styles.name}>{truncate(product.productName, 60)}</span>
                                    {product.productDiscount !== 0 ? <p className={styles.oldPrice}>{`$${product.productPrice}`}</p> : <p className={styles.oldPrice}></p>}
                                    <p className={styles.price}>{`$${product.productDiscount !== 0 ? (product.productPrice - (product.productPrice * (product.productDiscount / 100))).toFixed(2) : product.productPrice}`}</p>
                                </Link>
                                <button className={styles.addToCart} onClick={async () => {
                                    let key = product.productID;
                                    const thisProduct = cart.find(p => p.productID === key);

                                    if (thisProduct) {
                                        const updatedCart = cart.map(
                                            product => product.productID === key ? {
                                                ...product,
                                                count: product.count + 1
                                            } : product
                                        );
                                        setCart(updatedCart);

                                        await fetch("/api/cart", {
                                            method: "PUT",
                                            headers: { "Content-Type": "application/json" },
                                            credentials: "include",
                                            body: JSON.stringify({ userId, cart: updatedCart })
                                        });

                                        for (const category of product.categories ?? []) {
                                            await fetch("/api/preference/update", {
                                                method: "POST",
                                                credentials: "include",
                                                headers: { "Content-Type": "application/json" },
                                                body: JSON.stringify({
                                                    Id: userId,
                                                    category: category,
                                                })
                                            });
                                        }
                                    } else {
                                        await addToCart(product);
                                    }
                                }}>Add to cart</button>
                            </div>
                        </li>
                    )
                })}
            </ul>
            <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} displayItems={currentRange} pageKey='mostpopularpage' />
        </div>
    );
}

export default MostPopular;