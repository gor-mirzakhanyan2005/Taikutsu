import { useContext } from 'react';
import styles from '../stylesheets/ProductCards.module.scss'
import { Link } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import { ProductContext } from '../App';


function ProductCards({searchBar, selectedCategory}) {

    const { products } = useContext(ProductContext);
    const { cart, setCart } = useContext(CartContext);

    const truncate = (text, maxLength) => {
        if (text.length > maxLength) {
            return text.substring(0, maxLength) + '...';
        } else {
            return text;
        }
    }

    const addToCart = (product) => {
        setCart(prevCart => [...prevCart, product]);
    }

    const getRating = (rating) => {
        switch (rating) {
            case 0:
                return <div>☆☆☆☆☆</div>
            case 1:
                return <div>⯪☆☆☆☆</div>
            case 2:
                return <div>★☆☆☆☆</div>
            case 3:
                return <div>★⯪☆☆☆</div>
            case 4:
                return <div>★★☆☆☆</div>
            case 5:
                return <div>★★⯪☆☆</div>
            case 6:
                return <div>★★★☆☆</div>
            case 7:
                return <div>★★★⯪☆</div>
            case 8:
                return <div>★★★★☆</div>
            case 9:
                return <div>★★★★⯪</div>
            case 10:
                return <div>★★★★★</div>
        }
    }

    const filteredProducts = products.filter(product => {
        const nameMatch = searchBar == "" || product.productName.toLowerCase().includes(searchBar.toLowerCase());

        const categoryMatch = selectedCategory == "" || selectedCategory == "All" || product.categories.includes(selectedCategory);

        return nameMatch && categoryMatch;
    })

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
}

export default ProductCards;