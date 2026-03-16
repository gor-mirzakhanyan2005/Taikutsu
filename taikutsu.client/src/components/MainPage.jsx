import styles from '../stylesheets/MainPage.module.scss';
import ProductCards from './ProductCards';
import { ProductContext } from '../App';
import { useState } from 'react';

function MainPage({ searchBar }) {
    const [selectedCategory, setSelectedCategory] = useState("");

    const categoryList = [
        { name: "Electronics", emoji: "🔌" },
        { name: "Computers", emoji: "💻" },
        { name: "Clothing", emoji: "👕" },
        { name: "Footwear", emoji: "👟" },
        { name: "Home", emoji: "🏠" },
        { name: "Furniture", emoji: "🛋️" },
        { name: "Beauty/personal care", emoji: "💄" },
        { name: "Sports and Fitness", emoji: "🏋️" },
        { name: "Health", emoji: "🩺" },
        { name: "Sports", emoji: "⚽" },
        { name: "Outdoors", emoji: "🏕️" },
        { name: "Toys", emoji: "🧸" },
        { name: "Games", emoji: "🎮" },
        { name: "Books", emoji: "📚" },
        { name: "Movies", emoji: "🎬" },
        { name: "Anime", emoji: "🍥" },
        { name: "Jewelry", emoji: "💍" },
        { name: "Accessories", emoji: "👜" },
        { name: "Peripherals", emoji: "🖱️" },
        { name: "Office", emoji: "🏢" },
        { name: "Stationery", emoji: "✏️" },
        { name: "Art", emoji: "🎨" },
        { name: "Mobile", emoji: "📱" },
        { name: "Security", emoji: "🔒" },
        { name: "Tools", emoji: "🛠️" },
        { name: "Gardening", emoji: "🌱" }
    ];

    return (
      <>
      <main className={styles.mainPageBg}>
          <div className={styles.tagSearchCont}>
              <h2>...or, filter with tags!</h2>
              <ul className={styles.tagSearchTags}>
                        {
                            categoryList.map(category => {
                                return (
                                    <li onClick={() => {
                                        setSelectedCategory(category.name)
                                        console.log(selectedCategory)
                                    }
}>
                                        <span>{category.name}{category.emoji}</span>
                                    </li>
                            ) })
                        }
              </ul>
          </div>
                <ProductCards searchBar={searchBar} selectedCategory={selectedCategory} />
            </main>
        </>
  );
}

export default MainPage;