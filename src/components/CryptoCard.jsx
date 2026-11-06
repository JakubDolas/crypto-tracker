import { useState } from 'react'

import styles from './CryptoCard.module.css'
import PriceChart from './PriceChart'

function CryptoCard({ coin, rank }) {
    const isPositive = coin.price_change_percentage_24h >= 0
    const [isExpanded, setIsExpanded] = useState(false)

    const formattedPrice = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    }).format(coin.current_price)

    const formattedChange = Math.abs(coin.price_change_percentage_24h).toFixed(2)

    return (
        <div className={styles.card} onClick={() => setIsExpanded(!isExpanded)}>
            <div className={styles.leftSection}>
                <span className={styles.rank}>#{rank}</span>
                <img src={coin.image} alt={coin.name} className={styles.image}/>
                <div className={styles.nameInfo}>
                    <span className={styles.name}>{coin.name}</span>
                    <span className={styles.symbol}>{coin.symbol}</span>
                </div>
            </div>

            <div className={styles.rightSection}>
                <span className={styles.price}>{formattedPrice}</span>
                <span className={isPositive ? styles.positive : styles.negative}>
                    {isPositive ? '▲ +' : '▼ -'}{formattedChange}%
                </span>
            </div>

            {isExpanded && (
                <PriceChart symbol={coin.id} isPositive={isPositive}/>
            )}

        </div>
    )
}

export default CryptoCard

