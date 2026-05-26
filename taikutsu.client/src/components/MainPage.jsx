import styles from '../stylesheets/MainPage.module.scss';
import ProductCards from './ProductCards';
import { useState, useEffect, useContext } from 'react';
<<<<<<< HEAD
import { RecommendedContext, UserContext, DarkModeContext } from '../App';
=======
import { ProductContext, UserContext, DarkModeContext } from '../App';
>>>>>>> 868210d7054466c3f8d446fb4c36d40280a576f5

function MainPage({ searchBar }) {
    const [selectedCategory, setSelectedCategory] = useState("");

<<<<<<< HEAD
    const { setRecommended } = useContext(RecommendedContext);
=======
    const { setProducts } = useContext(ProductContext);
>>>>>>> 868210d7054466c3f8d446fb4c36d40280a576f5
    const { userId } = useContext(UserContext);
    const { darkmode } = useContext(DarkModeContext);

    const categoryList = [
        { name: "Beauty", emoji: "💄" },
        { name: "Fragrances", emoji: "🌸" },
        { name: "Furniture", emoji: "🛋️" },
        { name: "Groceries", emoji: "🛒" },
        { name: "Home Decoration", emoji: "🏠" },
        { name: "Kitchen Accessories", emoji: "🍳" },
        { name: "Laptops", emoji: "💻" },
        { name: "Mens Shirts", emoji: "👔" },
        { name: "Mens Shoes", emoji: "👟" },
        { name: "Mens Watches", emoji: "⌚" },
        { name: "Mobile Accessories", emoji: "📱" },
        { name: "Motorcycle", emoji: "🏍️" },
        { name: "Skin Care", emoji: "🧴" },
        { name: "Smartphones", emoji: "📲" },
        { name: "Sports Accessories", emoji: "🏋️" },
        { name: "Sunglasses", emoji: "🕶️" },
        { name: "Tablets", emoji: "📟" },
        { name: "Tops", emoji: "👕" },
        { name: "Vehicle", emoji: "🚗" },
        { name: "Womens Bags", emoji: "👜" },
        { name: "Womens Dresses", emoji: "👗" },
        { name: "Womens Jewellery", emoji: "💍" },
        { name: "Womens Shoes", emoji: "👠" },
        { name: "Womens Watches", emoji: "⌚" },
    ];

    useEffect(() => {
        if (!userId) return;

<<<<<<< HEAD
        fetch(`/api/recommended?userId=${userId}`)
=======
        fetch(`/api/products/recommended?userId=${userId}`)
>>>>>>> 868210d7054466c3f8d446fb4c36d40280a576f5
            .then(res => res.json())
            .then(data => {
                if (data.length === 0) {
                    return fetch("/api/products").then(res => res.json())
                }
                return data;
            })
            .then(finalData => {
                finalData.forEach(p => p.count = 1);
<<<<<<< HEAD
                setRecommended(finalData);
=======
                setProducts(finalData);
>>>>>>> 868210d7054466c3f8d446fb4c36d40280a576f5
            });

        console.log(userId);
    }, [userId]);

    return (
        <>
            <main data-theme={darkmode ? "dark" : "light"} className={styles.mainPageBg}>
                <div className={styles.tagSearchCont}>
                    <h2>...or, filter with tags!</h2>
                    <ul className={styles.tagSearchTags}>
                        {
                            categoryList.map(category => {
                                return (
                                    <li onClick={() => {
                                        setSelectedCategory(category.name.toLowerCase().split(" ").join("-"))
                                        console.log(selectedCategory)
                                    }
                                    }>
                                        <span>{category.name}{category.emoji}</span>
                                    </li>
                                )
                            })
                        }
                    </ul>
                </div>
                <ProductCards searchBar={searchBar} selectedCategory={selectedCategory} />
            </main>
        </>
    );
}

export default MainPage;