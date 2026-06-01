import { useParams, useNavigate } from 'react-router-dom';
import styles from '../stylesheets/ProductPage.module.scss'
import { DarkModeContext, ProductContext, UserContext } from '../App';
import { useContext, useEffect, useState, useRef } from 'react';
import ProfilePic from '../assets/Twitter_default_profile_400x400.png';

function ProductPage() {
    window.scrollTo(0, 0);
    const { darkmode } = useContext(DarkModeContext);
    let { userId } = useContext(UserContext);
    let navigate = useNavigate();
    const { products } = useContext(ProductContext);
    let { productID } = useParams();
    const [image, setImage] = useState();

    const hasUpdatedPreferences = useRef(false);

    const savedProduct = JSON.parse(window.localStorage.getItem('product'));

    const product = products.find(
        p => p.productID === parseInt(productID)
    )
    console.log(product);
    
    useEffect(() => {
        if (product) {
            localStorage.setItem('product', JSON.stringify(product));
        }
    }, [product]);

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

    const getRating = (rating) => {
        switch (true) {
            case rating <= 0.5:
                return <div>⯪☆☆☆☆</div>
            case rating <= 1:
                return <div>★☆☆☆☆</div>
            case rating <= 1.5:
                return <div>★⯪☆☆☆</div>
            case rating <= 2:
                return <div>★★☆☆☆</div>
            case rating <= 2.5:
                return <div>★★⯪☆☆</div>
            case rating <= 3:
                return <div>★★★☆☆</div>
            case rating <= 3.5:
                return <div>★★★⯪☆</div>
            case rating <= 4:
                return <div>★★★★☆</div>
            case rating <= 4.5:
                return <div>★★★★⯪</div>
            case rating === 5:
                return <div>★★★★★</div>
        }
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
            hasUpdatedPreferences.current = true;
                await fetch("/api/preference/update", {
                    method: "POST",
                    credentials: "include",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        Id: userId,
                        category: product.categories,
                        weight: 1
                    })
                });

            await fetch("/api/preference/insert", {
                method: "POST",
                credentials: "include",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ userid: userId })
            });
        }
        updatePreferences();
    }, [userId, product])

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

    return (
        <div data-theme={ darkmode ? "dark" : "light" } className={styles.pageContainer}>
            <div className={styles.infoContainer}>
                <div className={styles.thumbnailAndImages}>
                    <img className={styles.thumbnail} src={image} />
                    <ul className={styles.imageRow}>
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
                    <div className={styles.tag}>{convertCategory(product.categories)}</div>
                    <h2>{product ? product.productName : savedProduct.productName}</h2>
                    <p>
                        {product  ? product.productDescription : savedProduct.productDescription}
                    </p>
                    <div className={styles.priceAndButtons}>
                        <span>${product ? product.productPrice - (product.productPrice * (product.productDiscount / 100)) : savedProduct.productPrice - (savedProduct.productPrice * (savedProduct.productDiscount / 100))}</span>
                        <div className={styles.buttons}>
                            <button>Add to Cart</button>
                            <button onClick={() => navigate(-1)}>Back</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles.reviewsCont}>
                <h2>Testimonials</h2>
                <ul>
                    {product.productReviews.map((review) => (
                        <li>
                            <div className={styles.reviewCard}>
                                <div className={styles.reviewerInfo}>
                                    <img src={ProfilePic} />
                                    <div>
                                        <span>{review.reviewerName.toLowerCase().split(" ").join("")}</span>
                                        <span className={styles.date}>{review.date.slice(0, 10)}</span>
                                    </div>
                                </div>
                                <div className={styles.ratingAndComment}>
                                    {getRating(review.rating)}
                                    <span>"{review.comment}"</span>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default ProductPage;