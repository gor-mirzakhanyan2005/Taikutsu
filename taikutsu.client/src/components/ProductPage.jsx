import { useParams, useNavigate } from 'react-router-dom';
import styles from '../stylesheets/ProductPage.module.scss'
import { DarkModeContext, ProductContext, UserContext } from '../App';
<<<<<<< HEAD
import { useContext, useEffect, useState, useRef } from 'react';
=======
import { useContext, useEffect, useState } from 'react';
>>>>>>> 868210d7054466c3f8d446fb4c36d40280a576f5

function ProductPage() {
    const { darkmode } = useContext(DarkModeContext);
    let { userId } = useContext(UserContext);
    let navigate = useNavigate();
    const { products } = useContext(ProductContext);
    let { productID } = useParams();
    const [image, setImage] = useState();
<<<<<<< HEAD
    const hasUpdatedPreferences = useRef(false);
=======
>>>>>>> 868210d7054466c3f8d446fb4c36d40280a576f5

    const savedProduct = JSON.parse(window.localStorage.getItem('product'));

    const product = products.find(
        p => p.productID === parseInt(productID)
    )
    
    useEffect(() => {
        if (product) {
            localStorage.setItem('product', JSON.stringify(product));
        }
    }, [product]);

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

    useEffect(() => {
        //Перевірка наявності ідентифікатора користувача
        if (!userId) return;
        //Перевірка наявності товару
        if (!product) return;
        //Перевірка того, чи були вже відновлені уподобання (через useRef)
        if (hasUpdatedPreferences.current) return;

        //Функція асинхронного звернення до бази даних
        const updatePreferences = async () => {
=======
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
>>>>>>> 868210d7054466c3f8d446fb4c36d40280a576f5
                await fetch("/api/preference/update", {
                    method: "POST",
                    credentials: "include",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        Id: userId,
<<<<<<< HEAD
                        category: product.categories,
                    })
                });
=======
                        category: category,
                    })
                });
            }
>>>>>>> 868210d7054466c3f8d446fb4c36d40280a576f5
        }
        updatePreferences();
    }, [userId, product])

<<<<<<< HEAD

    useEffect(() => {
        if (product) {
            setImage(product.productImages[0]);
        } else {
            setImage(savedProduct.productImages[0]);
        }
    }, [product]);

    if (!product) {
        return <div>Loading...</div>
    }

=======
    useEffect(() => {
        if (product) {
            setImage(product.productThumbnail);
        } else {
            setImage(savedProduct.productThumbnail)
        }
    }, [product]);

>>>>>>> 868210d7054466c3f8d446fb4c36d40280a576f5
    return (
        <div data-theme={ darkmode ? "dark" : "light" } className={styles.pageContainer}>
            <div className={styles.infoContainer}>
                <div className={styles.thumbnailAndImages}>
                    <img className={styles.thumbnail} src={image} />
                    <ul className={styles.imageRow}>
<<<<<<< HEAD
=======
                        <li onClick={() => setImage(product ? product.productThumbnail : savedProduct.productThumbnail)}>
                            <img src={product ? product.productThumbnail : savedProduct.productThumbnail} />
                        </li>
>>>>>>> 868210d7054466c3f8d446fb4c36d40280a576f5
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
<<<<<<< HEAD
                    <div className={styles.tag}>{convertCategory(product.categories)}</div>
=======
                    <ul>
                        {product?.categories.map((tag) => {
                            return (
                                <li className={styles.tag}>
                                    {tag}
                                </li>
                            )
                        })}
                    </ul>
>>>>>>> 868210d7054466c3f8d446fb4c36d40280a576f5
                    <h2>{product ? product.productName : savedProduct.productName}</h2>
                    <p>
                        {product  ? product.productDescription : savedProduct.productDescription}
                    </p>
                    <div className={styles.priceAndButtons}>
<<<<<<< HEAD
                        <span>${product ? product.productPrice - (product.productPrice * (product.productDiscount / 100)) : savedProduct.productPrice - (savedProduct.productPrice * (savedProduct.productDiscount / 100))}</span>
=======
                        <span>{product ? product.productPrice : savedProduct.productPrice}</span>
>>>>>>> 868210d7054466c3f8d446fb4c36d40280a576f5
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