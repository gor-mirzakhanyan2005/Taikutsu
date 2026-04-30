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

        try {
            const res = await fetch("/api/category", {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    userid,
                    categories
                })
            });

            if (!res.ok) {
                const text = await res.text();
                alert(text);
                return;
            }

            const data = await res.json();
            console.log(data);
            alert("Preferences confirmed successfuly!");
            navigate("/")
        } catch (err) {
            console.error(err);
            alert("Server error.")
        }
    }

    const preferenceTags = [
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
                  {preferenceTags.slice(0, 26).map((tag) => { return <li className={categories.includes(tag.name) ? styles.selectedTag : styles.unselectedTag} onClick={() => toggleCategory(tag)}><span>{tag.name}{tag.emoji}</span></li> })}
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