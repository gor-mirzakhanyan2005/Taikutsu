import styles from '../stylesheets/MostPopular.module.scss';

function MostPopular() {

    const dummyMostPopular = [
        {
            image: "https://m.media-amazon.com/images/I/81VIte-lt7L._SL1500_.jpg",
            name: "Spider-Man (2002) / Spider-Man 2 (2004) / Spider-Man 3 (2007) - Set ",
            description: "Three legendary movies about the Wall Crawler in a single bundle!",
            price: "37.99",
            rating: 8,
            tags: ["Toys", "Accessories"],
        },
        {
            image: "https://m.media-amazon.com/images/I/81VIte-lt7L._SL1500_.jpg",
            name: "Spider-Man (2002) / Spider-Man 2 (2004) / Spider-Man 3 (2007) - Set ",
            description: "Three legendary movies about the Wall Crawler in a single bundle!",
            price: "37.99",
            rating: 8,
            tags: ["Toys", "Accessories"],
        },
        {
            image: "https://m.media-amazon.com/images/I/81VIte-lt7L._SL1500_.jpg",
            name: "Spider-Man (2002) / Spider-Man 2 (2004) / Spider-Man 3 (2007) - Set ",
            description: "Three legendary movies about the Wall Crawler in a single bundle!",
            price: "37.99",
            rating: 10,
            tags: ["Toys", "Accessories"],
        },
        {
            image: "https://m.media-amazon.com/images/I/81VIte-lt7L._SL1500_.jpg",
            name: "Spider-Man (2002) / Spider-Man 2 (2004) / Spider-Man 3 (2007) - Set ",
            description: "Three legendary movies about the Wall Crawler in a single bundle!",
            price: "37.99",
            rating: 9,
            tags: ["Toys", "Accessories"],
        },
        {
            image: "https://m.media-amazon.com/images/I/81VIte-lt7L._SL1500_.jpg",
            name: "Spider-Man (2002) / Spider-Man 2 (2004) / Spider-Man 3 (2007) - Set ",
            description: "Three legendary movies about the Wall Crawler in a single bundle!",
            price: "37.99",
            rating: 10,
            tags: ["Toys", "Accessories"],
        },
    ]

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
              {dummyMostPopular.map(item => {
                  return (
                      <li>
                          <div className={styles.mostPopularCard}>
                            <div className={styles.ratingDisplay}>
                              {getRating(item.rating)}
                            </div>
                            <img src={item.image} />
                            <ul className={styles.tagList}>
                              {item.tags.map(tag => {
                                  return (
                                      <span className={styles.tag}>{tag}</span>
                                  )
                              })}
                            </ul>
                            <span className={styles.name}>{truncate(item.name, 100)}</span>
                            <span className={styles.price}>{item.price}</span>
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