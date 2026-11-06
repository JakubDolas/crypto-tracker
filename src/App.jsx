import { useState } from 'react'

import { useCryptoData } from './hooks/useCryptoData'
import CryptoList from './components/CryptoList'
import SearchBar from './components/SearchBar'
import SortSelector from './components/sortSelector'

import styles from './App.module.css'

function App() {
  const { data, loading, error, refetch } = useCryptoData(10)
  const [search, setSearch] = useState('')
  const [sortBy, setSortBy] = useState('default')

  const filteredCoins = data.filter((coin) => {
    const matchesName = coin.name.toLowerCase().includes(search.toLowerCase())
    const matchesSymbol = coin.symbol.toLowerCase().includes(search.toLowerCase())

    return matchesName || matchesSymbol
  })

  const sortedCoins = [...filteredCoins].sort((a, b) => {
    if(sortBy === 'price_desc') {
      return b.current_price - a.current_price
    }
    if (sortBy === 'gainers') {
      return b.price_change_percentage_24h - a.price_change_percentage_24h
    }
    if (sortBy === 'losers') {
      a.price_change_percentage_24h - b.price_change_percentage_24h
    }
    return 0; //default
  })

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>
          Crypto <span>Pulse</span>
        </h1>
        <button className={styles.refreshBtn} onClick={refetch}>
          Odśwież kursy
        </button>
      </header>

      <div className={styles.controls}>
        <SearchBar
          value={search}
          onChange={setSearch}
        />

        <SortSelector
          value={sortBy}
          onChange={setSortBy}
        />
      </div>

      {loading && (
        <div className={styles.loading}>
          Pobieranie aktualnych kursów... 
        </div>
      )}

      {error && !loading && (
        <div className={styles.error}>
          Wystąpił błąd: {error}
        </div>
      )}

      {!loading && !error && (
        <CryptoList coins={sortedCoins} />
      )}
    </div>
  )
}

export default App