import { useContext, useState } from 'react';
import styles from '../stylesheets/Preferences.module.scss'
import { useNavigate } from 'react-router';
import { DarkModeContext, UserContext } from '../App';

function Preferences() {
    const { darkmode } = useContext(DarkModeContext);
    const { user } = useContext(UserContext);
    const [more, setMore] = useState(false);
    const [categories, setCategories] = useState([]);

    const userid = user.userId;
    console.log(userid);

    const navigate = useNavigate();

    const handleConfirm = async (e) => {
        e.preventDefault();

        for (const category of categories) {
            try {
                const res = await fetch("/api/preference/update", {
                    method: "POST",
                    credentials: "include",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        id: userid,
                        category: category.toLowerCase().split(" ").join("-")
                    })
                });

                if (!res.ok) {
                    const text = await res.text();
                    alert(text);
                    return;
                }
            } catch (err) {
                console.error(err);
                alert("Server error.")
            }
        }
        alert("Preferences confirmed successfully!");
        navigate("/")
    }

    const preferenceTags = [
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

    const toggleCategory = (category) => {
        setCategories((prevCategories) => {
            if (prevCategories.includes(category.name)) {
                console.log(prevCategories.filter((item) => item !== category.name))
                return prevCategories.filter((item) => item !== category.name);
            } else {
                console.log([...prevCategories, category.name])
                return [...prevCategories, category.name];
            }
        })
    }

  return (
      <div data-theme={darkmode ? "dark" : "light"} className={styles.preferencesBg}>
          <h1>What are your preferences?</h1>
          <div className={styles.tagListCont}>
              <ul className={styles.tagList}>
                  {preferenceTags.slice(0, 10).map((tag) => { return <li className={categories.includes(tag.name) ? styles.selectedTag : styles.unselectedTag} onClick={() => toggleCategory(tag)}><span>{tag.name}{tag.emoji}</span></li> }) }
              </ul>
              {more ? <ul className={styles.tagList}>
                  {preferenceTags.slice(10, 26).map((tag) => { return <li className={categories.includes(tag.name) ? styles.selectedTag : styles.unselectedTag} onClick={() => toggleCategory(tag)}><span>{tag.name}{tag.emoji}</span></li> })}
              </ul> : " "}
              <button className={styles.showMore} onClick={() => setMore(!more)}>
                  {more ? 'Show Less' : 'Show More'}
              </button>
          </div>
          <button className={styles.confirmPreferences} onClick={handleConfirm}>Confirm preferences</button>
      </div>
  );
}

export default Preferences;