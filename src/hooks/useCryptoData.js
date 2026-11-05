import { useState, useEffect } from 'react'
import { fetchTopCoins } from '../api/cryptoApi'

export function useCryptoData(limit = 10){
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    const loadData = async () => {
        try {
            setLoading(true)
            setError(null)

            const data = await fetchTopCoins(limit)
            setData(data)
        } catch (err) {
            setError(err.message || 'Wystapil nieoczekiwany blad')
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        loadData()
    }, [limit])

    return { data, loading, error, refetch: loadData }
}