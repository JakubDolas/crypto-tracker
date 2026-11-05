export async function fetchTopCoins(limit = 10) {
  const response = await fetch('https://api.binance.com/api/v3/ticker/24hr')

  if (!response.ok) {
    throw new Error('Błąd połączenia z serwerem Binance')
  }

  const allTickers = await response.json()

  const topSymbols = [
    { symbol: 'BTCUSDT', name: 'Bitcoin', ticker: 'BTC' },
    { symbol: 'ETHUSDT', name: 'Ethereum', ticker: 'ETH' },
    { symbol: 'BNBUSDT', name: 'BNB', ticker: 'BNB' },
    { symbol: 'SOLUSDT', name: 'Solana', ticker: 'SOL' },
    { symbol: 'XRPUSDT', name: 'XRP', ticker: 'XRP' },
    { symbol: 'DOGEUSDT', name: 'Dogecoin', ticker: 'DOGE' },
    { symbol: 'ADAUSDT', name: 'Cardano', ticker: 'ADA' },
    { symbol: 'AVAXUSDT', name: 'Avalanche', ticker: 'AVAX' },
    { symbol: 'DOTUSDT', name: 'Polkadot', ticker: 'DOT' },
    { symbol: 'LINKUSDT', name: 'Chainlink', ticker: 'LINK' },
  ].slice(0, limit)

  return topSymbols.map((item) => {
    const data = allTickers.find((t) => t.symbol === item.symbol) || {}
    const price = parseFloat(data.lastPrice) || 0
    const change = parseFloat(data.priceChangePercent) || 0

    return {
      id: item.symbol,
      name: item.name,
      symbol: item.ticker,
      current_price: price,
      price_change_percentage_24h: change,
      image: `https://raw.githubusercontent.com/spothq/cryptocurrency-icons/master/128/color/${item.ticker.toLowerCase()}.png`,
    }
  })
}