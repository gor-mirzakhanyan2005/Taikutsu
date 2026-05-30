import styles from '../stylesheets/MainPage.module.scss';
import ProductCards from './ProductCards';
import { useState, useEffect, useContext } from 'react';
import { RecommendedContext, UserContext, DarkModeContext } from '../App';

function MainPage({ searchBar }) {
    const [selectedCategory, setSelectedCategory] = useState("all");

    const { setRecommended } = useContext(RecommendedContext);
    const { userId } = useContext(UserContext);
    const { darkmode } = useContext(DarkModeContext);

    const categoryList = [
        { name: "All" },
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

        fetch(`/api/recommended?userId=${userId}`)
            .then(res => res.json())
            .then(data => {
                if (data.length === 0) {
                    return fetch("/api/products").then(res => res.json())
                }
                return data;
            })
            .then(finalData => {
                console.log(finalData);
                finalData.forEach(p => p.count = 1);
                setRecommended(finalData);
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
                                        if (category.name === 'All') {
                                            setSelectedCategory('all');
                                        } else {
                                            setSelectedCategory(category.name.toLowerCase().split(" ").join("-"))
                                        }
                                        console.log(selectedCategory)
                                    }
                                    }
                                        className={selectedCategory === category.name.toLowerCase().split(" ").join("-") ? styles.active : ''}>
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