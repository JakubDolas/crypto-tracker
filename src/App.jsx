import { useCryptoData } from './hooks/useCryptoData'
import CryptoList from './components/CryptoList'
import styles from './App.module.css'

function App() {
  const { data, loading, error, refetch } = useCryptoData(10)

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
        <CryptoList coins={data} />
      )}
    </div>
  )
}

export default App