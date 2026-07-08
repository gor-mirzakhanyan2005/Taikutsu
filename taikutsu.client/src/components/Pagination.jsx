import React from 'react';
import styles from "../stylesheets/Pagination.module.scss";
import { useEffect } from 'react';

const Pages = ({ currentPage, setCurrentPage, displayItems, pageKey, pageSize = 12 }) => {
    const totalPages = Math.ceil(displayItems.length / pageSize);
    const isLastPage = currentPage >= totalPages;

    useEffect(() => {
        if (pageKey == 'maincurrentpage') {
            localStorage.setItem('maincurrentpage', currentPage);
        } else if (pageKey == 'mostpopularpage') {
            localStorage.setItem('mostpopularpage', currentPage);
        } else if (pageKey == 'dealpage') {
            localStorage.setItem('dealpage', currentPage);
        } else {
            return;
        }
    }, [currentPage, pageKey]);

    const handleBack = () => {
        setCurrentPage(currentPage - 1);

        if (currentPage === 0) {
            setCurrentPage(1);
        } else {
            return currentPage;
        }
    }

    const handleForth = () => {
        setCurrentPage(currentPage + 1);
        console.log(displayItems.length)
    }

    return (
        <div>
            <ul className={styles.pageWidget}>
                {currentPage - 1 > 0 ?
                    <li>
                        <button className={styles.pageButton} onClick={handleBack}>{currentPage - 1}</button>
                    </li>
                    :
                    <li>
                        <button className={styles.pageButtonInvis}></button>
                    </li>}
                <li>
                    <h2 className={styles.pageNumber}>{currentPage}</h2>
                </li>
                {!isLastPage ?
                    <li>
                        <button className={styles.pageButton} onClick={handleForth}>{currentPage + 1}</button>
                    </li>
                    :
                    <li>
                        <button className={styles.pageButtonInvis}></button>
                    </li>}
            </ul>
        </div>
    )
}

export default Pages