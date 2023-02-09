import React, { useState, useEffect } from "react";
import styles from './Throttle.module.css'

export default function Throttle(): JSX.Element {
    const [page, setPage] = useState<number>(10);
    const [books, setBook] = useState<number[]>([]);
    const [throttle, setThrottle] = useState<boolean>(false);

    // 스크롤을 내리면 100개의 box를 5개씩 추가로 생성한다.
    const handleScroll = () => {
        if (throttle) return;
        if (!throttle) {
            setThrottle(true);
            setTimeout(async () => {
                if (page >= 100) setPage(page);
                else setPage((page) => page + 5);
                setThrottle(false);
            }, 300);
        }
    };

    useEffect(() => {
        setBook(
            Array.from({ length: page }, (_, idx) => idx + 1)
        );
    }, [page]);

    return (
        <div className={styles.book} onScroll={handleScroll}>
            <div>
                {books.map((page, idx) => (
                    <div className={styles.page} key={idx}>
                        {page}
                    </div>
                ))}
            </div>
        </div>
    );
}
