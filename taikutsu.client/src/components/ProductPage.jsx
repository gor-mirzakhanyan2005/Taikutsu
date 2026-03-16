import { useParams, useNavigate } from 'react-router-dom';
import styles from '../stylesheets/ProductPage.module.scss'
import { ProductContext } from '../App';
import { useContext } from 'react';

function ProductPage() {

    let navigate = useNavigate();
    const {products } = useContext(ProductContext);

    let { productID } = useParams();

    const product = products.find(
        p => p.productID === parseInt(productID)
    )

  return (
      <div className={styles.pageContainer}>
          <div className={styles.infoContainer}>
              <img src={`data:image/png;base64,${product?.productImage}`} />
              <div className={styles.tagsAndOther}>
                  <ul>
                      {product?.categories.map((tag) => {
                          return (
                              <li className={styles.tag}>
                                  {tag}
                              </li>
                          )
                      })}
                  </ul>
                  <h2>{product?.productName}</h2>
                  <p>
                      {product?.productDescription}
                  </p>
                  <div className={styles.priceAndButtons}>
                      <span>{product?.productPrice}</span>
                      <div className={styles.buttons}>
                          <button>Add to Cart</button>
                          <button onClick={() => navigate(-1)}>Back</button>
                      </div>
                  </div>
              </div>
          </div>
      </div>
  );
}

export default ProductPage;