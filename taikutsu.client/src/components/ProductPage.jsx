import { useParams, useNavigate } from 'react-router-dom';
import styles from '../stylesheets/ProductPage.module.scss'
import { DarkModeContext, ProductContext, UserContext } from '../App';
import { useContext, useEffect, useState } from 'react';

function ProductPage() {
    const { darkmode } = useContext(DarkModeContext);
    let { userId } = useContext(UserContext);
    let navigate = useNavigate();
    const { products } = useContext(ProductContext);
    let { productID } = useParams();
    const [image, setImage] = useState();

    const savedProduct = JSON.parse(window.localStorage.getItem('product'));

    const product = products.find(
        p => p.productID === parseInt(productID)
    )

    useEffect(() => {
        if (product) {
            localStorage.setItem('product', JSON.stringify(product));
        }
    }, [product]);

    useEffect(() => {
        console.log("useEffect triggered");
        console.log("userId:", userId);
        console.log("product:", product);

        if (!userId) return;
        if (!product) return;

        const updatePreferences = async () => {
            for (const category of product.categories) {
                await fetch("/api/preference/update", {
                    method: "POST",
                    credentials: "include",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        Id: userId,
                        category: category,
                    })
                });
            }
        }
        updatePreferences();
    }, [userId, product])

    useEffect(() => {
        if (product) {
            setImage(product.productThumbnail);
        } else {
            setImage(savedProduct.productThumbnail)
        }
    }, [product]);

    return (
        <div data-theme={ darkmode ? "dark" : "light" } className={styles.pageContainer}>
            <div className={styles.infoContainer}>
                <div className={styles.thumbnailAndImages}>
                    <img className={styles.thumbnail} src={image} />
                    <ul className={styles.imageRow}>
                        <li onClick={() => setImage(product ? product.productThumbnail : savedProduct.productThumbnail)}>
                            <img src={product ? product.productThumbnail : savedProduct.productThumbnail} />
                        </li>
                        {product ? product.productImages.map((url, i) => (
                            <li key={i} onClick={() => setImage(url)}>
                                <img src={url} />
                            </li>
                        )) :
                            savedProduct.productImages.map((url, i) => (
                                <li key={i} onClick={() => setImage(url)}>
                                    <img src={url} />
                                </li>
                            ))
                        }
                    </ul>
                </div>
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
                    <h2>{product ? product.productName : savedProduct.productName}</h2>
                    <p>
                        {product  ? product.productDescription : savedProduct.productDescription}
                    </p>
                    <div className={styles.priceAndButtons}>
                        <span>{product ? product.productPrice : savedProduct.productPrice}</span>
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