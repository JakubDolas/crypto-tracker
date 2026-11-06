import { useState, useEffect } from 'react'
import { fetchCoinHistory } from '../api/cryptoApi'
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
} from 'recharts'

import styles from './PriceChart.module.css'

function PriceChart({ symbol, isPositive }){
    const [history, setHistory] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const loadHistory = async () => {
            try {
                setLoading(true)
                const data = await fetchCoinHistory(symbol)
                setHistory(data)
            } catch (err){
                console.error('Blad wykresu', err)
            } finally {
                setLoading(false)
            }
        }

        loadHistory()
    }, [symbol])

    if (loading) {
        return (
            <div className={styles.loading}>
                Ładowanie wykresu...
            </div>
        )
    }

    const chartColor = isPositive ? '#0ecb81' : '#f6465d'

    return (
        <div className={styles.chartContainer}>
            <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={history}>
                    <XAxis dataKey="time" stroke="#848e9c" fontSize={11} tickLine={false} interval={2} />
                    <YAxis domain={['auto', 'auto']} hide={true} />
                    
                    <Tooltip
                    contentStyle={{
                        backgroundColor: '#181a20',
                        borderColor: '#2b313a',
                        borderRadius: '8px',
                        color: '#fff',
                    }}
                    formatter={(value) => [`$${value.toLocaleString()}`, 'Cena']}
                    />
                    
                    <Area
                        type="monotone"
                        dataKey="price"
                        stroke={chartColor}
                        strokeWidth={2}
                        fill={chartColor}
                        fillOpacity={0.1}
                    />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    )
}

export default PriceChart