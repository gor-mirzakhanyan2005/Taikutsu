import { useContext } from 'react';
import styles from '../stylesheets/MostPopular.module.scss';
import { UserContext } from '../App';

function MostPopular() {

    const { products } = useContext(UserContext);

    const truncate = (text, maxLength) => {
        if (text.length > maxLength) {
            return text.substring(0, maxLength) + '...';
        } else {
            return text;
        }
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

  return (
      <div className={styles.mostPopularBg}>
      <h1>Most popular</h1>
          <ul className={styles.mostPopularList}>
              {products.filter(product => product.countbought > 1000).map(product => {
                  return (
                      <li key={product.productID}>
                          <div className={styles.mostPopularCard}>
                              <div className={styles.ratingDisplay}>
                                  {getRating(product.rating)}
                              </div>
                              <img src={product.image} />
                              <ul className={styles.tagList}>
                                  {product.tags.map(tag => {
                                      return (
                                          <span key={tag} className={styles.tag}>{tag}</span>
                                      )
                                  })}
                              </ul>
                              <span className={styles.name}>{truncate(product.name, 100)}</span>
                              <span className={styles.price}>{product.price}</span>
                              <button className={styles.addToCart}>Add to cart</button>
                          </div>
                      </li>
                  )
              })}
          </ul>
      </div>
  );
}

export default MostPopular;