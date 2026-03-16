import styles from '../stylesheets/CurrentDeals.module.scss'
import { useContext } from 'react';
import { ProductContext } from '../App';
function CurrentDeals() {

    const products = useContext(ProductContext)

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
      <div className={styles.currentDealsCont}>
          <h1>Current Deals</h1>
          <ul className={styles.dealList}>
              {products.filter(deal => deal.productDiscount > 20).map(deal => {
                  return (
                      <div className={styles.dealCard}>
                          <div className={styles.topBar}>
                              <div className={styles.ratingDisplay}>
                                  {getRating(deal.productRating)}
                              </div>
                              {deal.discount !== '0' ? 
                                <div className={styles.discount}>
                                      {`-${deal.productDiscount}%` }
                                </div>
                               : ''}
                          </div>
                          <img src={`data:image/png;base64,${deal.productImage}`} />
                          <ul className={styles.tagList}>
                              {deal.categories.map(category => {
                                  return (
                                      <span className={styles.tag}>
                                          {category}
                                      </span>
                                  )
                              }) }
                          </ul>
                          <span className={styles.name}>{truncate(deal.productName, 100)}</span>
                              <span className={styles.oldPrice}>{`${deal.productPrice}`}</span>
                              <span className={styles.price}>{`$${deal.productDiscount !== 0 ? (deal.productPrice - (deal.productPrice * (deal.productDiscount / 100))).toFixed(2) : deal.productDiscount}`}</span>
                          <button className={styles.addToCart}>Add to cart</button>
                      </div>
                  )
              }) }
          </ul>
      </div>
  );
}

export default CurrentDeals;