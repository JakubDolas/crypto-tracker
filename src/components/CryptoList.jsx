import CryptoCard from "./CryptoCard";
import styles from './CryptoList.module.css'

function CryptoList({ coins }){
    if (!coins || coins.length === 0) {
        return (
            <div className={styles.empty}>
                Nie znaleziono żadnych kryptowalut
            </div>
        )
    }

    return (
        <div className={styles.list}>
            {coins.map((coin, index) => (
                <CryptoCard
                    key={coin.id}
                    coin={coin}
                    rank={index + 1}
                />
            ))}
        </div>
    )
}

export default CryptoList