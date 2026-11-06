import { useState } from 'react'

import { useCryptoData } from './hooks/useCryptoData'
import CryptoList from './components/CryptoList'
import SearchBar from './components/SearchBar'

import styles from './App.module.css'

function App() {
  const { data, loading, error, refetch } = useCryptoData(10)
  const [search, setSearch] = useState('')

  const filteredCoins = data.filter((coin) => {
    const matchesName = coin.name.toLowerCase().includes(search.toLowerCase())
    const matchesSymbol = coin.symbol.toLowerCase().includes(search.toLowerCase())

    return matchesName || matchesSymbol
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

      <SearchBar
        value={search}
        onChange={setSearch}
      />

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
        <CryptoList coins={filteredCoins} />
      )}
    </div>
  )
}

export default App