import { useContext, useState } from 'react';
import styles from '../stylesheets/Preferences.module.scss'
import { useNavigate } from 'react-router';
import { DarkModeContext, UserContext } from '../App';

function Preferences() {
    const { darkmode } = useContext(DarkModeContext);
    const { user, setUser } = useContext(UserContext);
    const [more, setMore] = useState(false);
    const [categories, setCategories] = useState([]);

    const userid = user.userId;
    console.log(userid);

    const navigate = useNavigate();

    const preferenceTags = [
        { name: "Beauty", emoji: "💄", value: "beauty" },
        { name: "Fragrances", emoji: "🌸", value: "fragrances" },
        { name: "Furniture", emoji: "🛋️", value: "furniture" },
        { name: "Groceries", emoji: "🛒", value: "groceries" },
        { name: "Home Decoration", emoji: "🏠", value: "home-decoration" },
        { name: "Kitchen Accessories", emoji: "🍳", value: "kitchen-accessories" },
        { name: "Laptops", emoji: "💻", value: "laptops" },
        { name: "Mens Shirts", emoji: "👔", value: "mens-shirts" },
        { name: "Mens Shoes", emoji: "👟", value: "mens-shoes" },
        { name: "Mens Watches", emoji: "⌚", value: "mens-watches" },
        { name: "Mobile Accessories", emoji: "📱", value: "mobile-accessories" },
        { name: "Motorcycle", emoji: "🏍️", value: "motorcycle" },
        { name: "Skin Care", emoji: "🧴", value: "skin-care" },
        { name: "Smartphones", emoji: "📲", value: "smartphones" },
        { name: "Sports Accessories", emoji: "🏋️", value: "sports-accessories" },
        { name: "Sunglasses", emoji: "🕶️", value: "sunglasses" },
        { name: "Tablets", emoji: "📟", value: "tablets" },
        { name: "Tops", emoji: "👕", value: "tops" },
        { name: "Vehicle", emoji: "🚗", value: "vehicle" },
        { name: "Womens Bags", emoji: "👜", value: "womens-bags" },
        { name: "Womens Dresses", emoji: "👗", value: "womens-dresses" },
        { name: "Womens Jewellery", emoji: "💍", value: "womens-jewellery" },
        { name: "Womens Shoes", emoji: "👠", value: "womens-shoes" },
        { name: "Womens Watches", emoji: "⌚", value: "womens-watches" },
    ];

    const handleConfirm = async (e) => {
        e.preventDefault();

        try {
            const deleteRes = await fetch("/api/preference/delete", {
                method: "PUT",
                credentials: "include",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ userId: userid })
            });

            if (!deleteRes.ok) {
                alert("Failed to reset preferences: " + await deleteRes.text());
                return;
            }

            for (const value of categories) {
                const res = await fetch("/api/preference/update", {
                    method: "PUT",
                    credentials: "include",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ id: userid, category: value, weight: 10 })
                });

                if (!res.ok) {
                    alert(await res.text());
                    return;
                }
            }

            const insertRes = await fetch("/api/preference/insert", {
                method: "PUT",
                credentials: "include",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ userid: userid })
            });

            if (!insertRes.ok) {
                alert(await insertRes.text());
                return;
            }

            if (user) {
                const userRes = await fetch("/api/restore/me", {
                    credentials: "include",
                });

                if (userRes.ok) {
                    const updatedUser = await userRes.json();
                    setUser(updatedUser);
                }
            }

            alert("Preferences confirmed successfully!");
            navigate("/");
        } catch (err) {
            console.error(err);
            alert("Server error.");
        }
    };

    const toggleCategory = (category) => {
        setCategories((prevCategories) => {
            if (prevCategories.includes(category.value)) {
                console.log(prevCategories.filter((item) => item !== category.value))
                return prevCategories.filter((item) => item !== category.value);
            } else {
                console.log([...prevCategories, category.value])
                return [...prevCategories, category.value];
            }
        })
    }

  return (
      <div data-theme={darkmode ? "dark" : "light"} className={styles.preferencesBg}>
          <h1>What are your preferences?</h1>
          <div className={styles.tagListCont}>
              <ul className={styles.tagList}>
                  {preferenceTags.slice(0, 10).map((tag) => { return <li className={categories.includes(tag.value) ? styles.selectedTag : styles.unselectedTag} onClick={() => toggleCategory(tag)}><span>{tag.name}{tag.emoji}</span></li> }) }
              </ul>
              {more ? <ul className={styles.tagList}>
                  {preferenceTags.slice(10, 26).map((tag) => { return <li className={categories.includes(tag.value) ? styles.selectedTag : styles.unselectedTag} onClick={() => toggleCategory(tag)}><span>{tag.name}{tag.emoji}</span></li> })}
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