import styles from './SortSelector.module.css'

function SortSelector ({ value, onChange }) {
    return (
        <div className={styles.container}>
            <select className={styles.select} value={value} onChange={(e) => onChange(e.target.value)}>
                <option value="default">Domyślnie (Ranking)</option>
                <option value="price_desc">Cena: najwyższa</option>
                <option value="gainers">Największe wzrosty</option>
                <option value="losers">Największe spadki</option>
            </select>
        </div>
    )
}

export default SortSelector