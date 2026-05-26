import { useContext, useState } from 'react';
import styles from '../stylesheets/ProductCards.module.scss'
import { Link } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import { RecommendedContext, UserContext } from '../App';
import Pagination from '../components/Pagination';

function ProductCards({ searchBar, selectedCategory }) {

    const { recommended } = useContext(RecommendedContext);
    const { cart, setCart } = useContext(CartContext);
    const { userId } = useContext(UserContext);
    const [currentPage, setCurrentPage] = useState(() => {
        return JSON.parse(localStorage.getItem('maincurrentpage')) || 1;
    });

<<<<<<< HEAD
    const cards = 12;
=======
    const { products } = useContext(ProductContext);
    const { cart, setCart } = useContext(CartContext);
>>>>>>> 868210d7054466c3f8d446fb4c36d40280a576f5

    const truncate = (text, maxLength) => {
        if (text.length > maxLength) {
            return text.substring(0, maxLength) + '...';
        } else {
            return text;
        }
    }

    const lastIndex = currentPage * cards;
    const firstIndex = lastIndex - cards;
    const currentRange = recommended.slice(firstIndex, lastIndex);

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

    const getRating = (rating) => {
        switch (rating) {
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

    const filteredProducts = currentRange.filter(product => {
        const nameMatch = searchBar == "" || product.productName.toLowerCase().includes(searchBar.toLowerCase());
        const categoryMatch = selectedCategory == "" || selectedCategory == "All" || product.categories.includes(selectedCategory);
        return nameMatch && categoryMatch;
    })

<<<<<<< HEAD
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
        <div className={styles.productCardSectionBg}>
            <ul className={styles.productCardList}>
                {Array.isArray(filteredProducts) && filteredProducts.map((card) => {
                    return (
                        <li key={card.productID}>
                            <div className={styles.productCard}>
                                <Link to={`productpages/${card.productID}`}>
                                    <div className={styles.topBar}>
                                        <div className={styles.ratingDisplay}>
                                            {getRating(card.productRating)}
                                        </div>
                                        {card.productDiscount !== 0 ?
                                            <div className={styles.discount}>
                                                {`-${card.productDiscount}%`}
                                            </div>
                                            : ''}
                                    </div>
                                    <img src={card.productThumbnail} onError={() => console.log("Failed to load:", card.productThumbnail)} />
                                    <div className={styles.tag}>
                                        {convertCategory(card.categories)}
                                    </div>
                                    <span className={styles.name}>{truncate(card.productName, 60)}</span>
                                    {card.productDiscount !== 0 ? <p className={styles.oldPrice}>{`$${card.productPrice}`}</p> : <p className={styles.oldPrice}></p>}
                                    <p className={styles.price}>{`$${card.productDiscount !== 0 ? (card.productPrice - (card.productPrice * (card.productDiscount / 100))).toFixed(2) : card.productPrice}`}</p>
                                </Link>
                                <button className={styles.addToCart} onClick={async () => {
                                    let key = card.productID;
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

                                        for (const category of card.categories ?? []) {
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
                                        await addToCart(card);
                                    }
                                }}>Add to cart</button>
                            </div>
                        </li>
                    )
                })}
            </ul>
            <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} displayItems={filteredProducts} pageKey="maincurrentpage"/>
        </div>
    );
=======
  return (
      <div className={styles.productCardSectionBg}>
          <ul className={styles.productCardList}>
              {Array.isArray(filteredProducts) && filteredProducts.map((card) => {
                  return (
                      <li key={card.productId}>
                          <div className={styles.productCard}>
                              <Link to={`productpages/${card.productID}`}>
                                  <div className={styles.topBar}>
                                      <div className={styles.ratingDisplay}>
                                          {getRating(card.productRating)}
                                      </div>
                                      {card.productDiscount !== 0 ?
                                          <div className={styles.discount}>
                                              {`-${card.productDiscount}%`}
                                          </div>
                                          : ''}
                                  </div>
                                  <img src={card.productThumbnail} onError={() => console.log("Failed to load:", card.productThumbnail)} />
                                  <ul className={styles.tagList}>
                                      {card.categories.map(category => {
                                          return (
                                              <div className={styles.tag}>
                                                  {category}
                                              </div>
                                          )
                                      })}
                                  </ul>
                                  <span className={styles.name}>{truncate(card.productName, 60)}</span>
                                  {card.productDiscount !== 0 ? <p className={styles.oldPrice}>{`$${card.productPrice}`}</p> : <p className={styles.oldPrice}></p>}
                                  <p className={styles.price}>{`$${card.productDiscount !== 0 ? (card.productPrice - (card.productPrice * (card.productDiscount / 100))).toFixed(2) : card.productPrice}`}</p>
                                  </Link>
                              <button className={styles.addToCart} onClick={() => {
                                  let key = card.productId;
                                  const thisProduct = cart.find(p => p.productId === card.productId);
                                  if (thisProduct) {
                                      setCart(prevCart => (
                                          prevCart.map(
                                              product => product.productId === key ? {
                                                  ...product,
                                                  count: product.count + 1
                                              } : product
                                          )
                                      ))
                                  } else {
                                      addToCart(card);
                                  }
                                  
                              }}>Add to cart</button>
                              </div>
                      </li>
                  )
              }) }
          </ul>
      </div>
  );
>>>>>>> 868210d7054466c3f8d446fb4c36d40280a576f5
}

export default ProductCards;