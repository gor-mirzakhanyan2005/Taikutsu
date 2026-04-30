import { useContext, useState } from 'react';
import styles from '../stylesheets/Cart.module.scss';
import { useEffect } from 'react';
import { CartContext } from '../context/CartContext';
import { DarkModeContext, UserContext } from '../App.jsx'
import { useNavigate } from 'react-router-dom';

function Cart() {
    const navigate = useNavigate();
    const { darkmode } = useContext(DarkModeContext);
    const { userId } = useContext(UserContext)
    const {cart, setCart} = useContext(CartContext);
    const [subtotal, setSubtotal] = useState(0);

    const handleIncrement = (id) => {
        const newArray = cart.map((item) => {
            if (item.productID === id) {
                return { ...item, count: item.count + 1 };
            } else {
                console.error()
                return item;
            }
        })
        setCart(newArray);
    }

    const handleDelete = (id) => {
        const newArray = cart.filter((item) => item.productID !== id);

        setCart(newArray);  
    }

    const handleDecrement = (id) => {
        const newArray = cart.map((item) => {
            if (item.productID === id) {
                return { ...item, count: item.count - 1 };
            } else {
                return item;
            }
        })

        setCart(newArray);
    }

    const handleCheckout = () => {
        if (!userId) return;
        if (cart.length == 0) return;

        const categories = [...new Set(cart.flatMap(item => item.categories))]

        const updatePreferences = async () => {
            for (const category of categories) {
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
        navigate('/checkout');
    }

    useEffect(() => {
        const updateCart = async () => {
            try {
                const updateRes = await fetch("/api/cart", {
                    method: "PUT",
                    credentials: "include",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        userId: userId,
                        cart: cart.map(item => ({
                            productID: item.productID,
                            productName: item.productName,
                            count: item.count
                        })),
                        categories: cart.map(item => ({
                            categories: item.categories
                        }))
                    })
                })

                if (!updateRes.ok) {
                    const text = await updateRes.text();
                    alert(text);
                    return;
                }
            } catch (err) {
                console.error(err);
            }
        }

        updateCart();
    }, [cart, userId])

    useEffect(() => {
        const findSubtotal = () => {
            let newSubtotal = cart.reduce((accumulator, item) => accumulator + (item.productPrice * item.count), 0);
            setSubtotal(newSubtotal.toFixed(2));
        }

        findSubtotal();
    }, [cart])

    useEffect(() => {
        const filterCountZeros = () => {
            for (let i = 0; i < cart.length; i++) {
                if (cart[i].count == 0) {
                    setCart(cart.filter(item => item.count !== 0));
                }
            }
        }

        filterCountZeros();
    }, [cart, setCart])

    useEffect(() => {
        console.log(cart);
    }, [cart])

  return (
      <div data-theme={darkmode ? "dark" : "light"} className={styles.cartBg}>
          <div className={styles.itemListCont}>
              <ul className={styles.itemList}>
                  {cart.map(item => {
                      return (
                          <li key={item.productId}>
                              <div className={styles.cartItemCard}>
                                  <img src={`data:image/png;base64,${item.productThumbnail}`} />
                                  <div className={styles.itemBlock}>
                                      <span className={styles.name}>{item.productName}</span>
                                      <div className={styles.counter}>
                                          <button className={styles.decrement} onClick={() => handleDecrement(item.productID)}>-</button>
                                          <div className={styles.countShow}>{item.count}</div>
                                          <button className={styles.increment} onClick={() => handleIncrement(item.productID)}>+</button>
                                      </div>
                                      <button className={styles.removeItem} onClick={() => handleDelete(item.productID)}>Remove item</button>
                                  </div>
                                  <span className={styles.itemPrice}>{item.productPrice}</span>
                              </div>
                          </li>
                      )
                  }) }
              </ul>
          </div>
          <div className={styles.subtotalAndCheckout}>
              <span className={styles.subtotal}>Subtotal:</span>
              <span className={styles.subtotalNumber}>{subtotal}</span>
              {cart.length > 0 && <button onClick={() => handleCheckout} className={styles.checkout}>Proceed to Checkout</button>}
          </div>
      </div>
  );
  }
export default Cart;