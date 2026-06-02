// ============================================
// MANEJO DE DATOS FINANCIEROS EN TIEMPO REAL
// ============================================

// Configuración de API (Finnhub)
const FINNHUB_API_KEY = 'd8fh7h9r01qn4439v2egd8fh7h9r01qn4439v2f0';
const FINNHUB_API_URL = 'https://finnhub.io/api/v1';

// Símbolos de índices
const MARKET_SYMBOLS = {
    '^IBEX': { name: 'IBEX 35', symbol: '^IBEX', type: 'indice' },
    '^GSPC': { name: 'S&P 500', symbol: '^GSPC', type: 'indice' },
    'EURUSD=X': { name: 'EUR/USD', symbol: 'EURUSD=X', type: 'forex' }
};

// Variables globales
let chartInstance = null;
let marketData = {};
let priceHistory = {};

// Inicializar datos mockeados para demostración
function initMockData() {
    const now = new Date();
    const dates = [];
    const generatePriceData = (basePrice, volatility = 0.02) => {
        const prices = [basePrice];
        for (let i = 1; i < 48; i++) {
            const change = (Math.random() - 0.5) * volatility * basePrice;
            prices.push(prices[i - 1] + change);
        }
        return prices;
    };

    // Datos IBEX
    priceHistory['^IBEX'] = {
        prices: generatePriceData(18436.70),
        times: generateTimes(48),
        openPrice: 18436.70,
        highPrice: 18550,
        lowPrice: 18300
    };

    // Datos S&P 500
    priceHistory['^GSPC'] = {
        prices: generatePriceData(7519.21),
        times: generateTimes(48),
        openPrice: 7519.21,
        highPrice: 7600,
        lowPrice: 7450
    };

    // Datos EUR/USD
    priceHistory['EURUSD=X'] = {
        prices: generatePriceData(1.1628),
        times: generateTimes(48),
        openPrice: 1.1628,
        highPrice: 1.1700,
        lowPrice: 1.1550
    };
}

// Generar etiquetas de tiempo
function generateTimes(count) {
    const times = [];
    const now = new Date();
    for (let i = count - 1; i >= 0; i--) {
        const time = new Date(now.getTime() - i * 30 * 60000); // 30 min intervals
        times.push(time.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' }));
    }
    return times;
}

// Obtener datos de Finnhub API (implementación real)
async function fetchMarketData(symbol) {
    try {
        // Usar API real de Finnhub
        const response = await fetch(`${FINNHUB_API_URL}/quote?symbol=${symbol}&token=${FINNHUB_API_KEY}`);
        const data = await response.json();
        
        if (data.c) {
            return {
                price: data.c,
                change: data.d,
                changePercent: data.dp,
                timestamp: new Date(data.t * 1000)
            };
        } else {
            // Si falla, usar datos mockeados
            return generateMockQuote(symbol);
        }
    } catch (error) {
        console.error('Error fetching market data:', error);
        // Usar datos mockeados como fallback
        return generateMockQuote(symbol);
    }
}

// Obtener datos históricos intradiarios
async function fetchIntraday(symbol) {
    try {
        // Obtener datos de hoy (1 minuto de resolución)
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const day = String(today.getDate()).padStart(2, '0');
        
        const fromDate = `${year}-${month}-${day}`;
        const toDate = fromDate;
        
        const url = `${FINNHUB_API_URL}/stock/candle?symbol=${symbol}&resolution=30&from=1609459200&to=1735689600&token=${FINNHUB_API_KEY}`;
        const response = await fetch(url);
        const data = await response.json();
        
        if (data.o && data.o.length > 0) {
            return {
                times: data.t.map(t => new Date(t * 1000).toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })),
                opens: data.o,
                closes: data.c,
                highs: data.h,
                lows: data.l,
                volumes: data.v
            };
        } else {
            // Usar datos generados si no hay datos disponibles
            return generateMockHistory(symbol);
        }
    } catch (error) {
        console.error('Error fetching intraday data:', error);
        return generateMockHistory(symbol);
    }
}

// Generar historial de precios mockeado
function generateMockHistory(symbol) {
    const basePrice = priceHistory[symbol].openPrice;
    const volatility = 0.02;
    const prices = [];
    let currentPrice = basePrice;
    
    for (let i = 0; i < 48; i++) {
        const change = (Math.random() - 0.5) * volatility * basePrice;
        currentPrice += change;
        prices.push(currentPrice);
    }

    return {
        times: generateTimes(48),
        opens: prices,
        closes: prices,
        highs: prices.map(p => p * 1.001),
        lows: prices.map(p => p * 0.999),
        volumes: Array(48).fill(1000000)
    };
}

// Generar datos ficticios realistas de precio actual
function generateMockQuote(symbol) {

// Actualizar display de índices
async function updateMarketDisplay() {
    for (const [symbol, config] of Object.entries(MARKET_SYMBOLS)) {
        try {
            const data = await fetchMarketData(symbol);
            
            if (data) {
                const priceElement = document.getElementById(`price-${symbol}`);
                const changeElement = document.getElementById(`change-${symbol}`);
                
                if (priceElement) {
                    priceElement.textContent = parseFloat(data.price).toLocaleString('es-ES', {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2
                    });
                }
                
                if (changeElement) {
                    const changeValue = parseFloat(data.changePercent);
                    const changeClass = changeValue >= 0 ? 'positive' : 'negative';
                    const sign = changeValue >= 0 ? '+' : '';
                    changeElement.textContent = `${sign}${data.changePercent}%`;
                    changeElement.className = `market-change ${changeClass}`;
                }

                // Actualizar datos locales
                marketData[symbol] = data;
            }
        } catch (error) {
            console.error(`Error actualizando ${symbol}:`, error);
        }
    }
}

// Abrir modal con gráfica
function openStockChart(name, symbol) {
    const modal = document.getElementById('chartModal');
    const chartTitle = document.getElementById('chartTitle');
    chartTitle.textContent = `Gráfica del Día - ${name}`;

    // Mostrar modal
    modal.style.display = 'block';

    // Dibujar gráfica
    drawStockChart(symbol, name);
}

// Cerrar modal
function closeStockChart() {
    const modal = document.getElementById('chartModal');
    modal.style.display = 'none';
}

// Dibujar gráfica con Chart.js
function drawStockChart(symbol, name) {
    const ctx = document.getElementById('stockChart').getContext('2d');
    
    // Obtener datos históricos (mockeados por ahora)
    let historyData = priceHistory[symbol];
    const currentData = marketData[symbol];
    
    // Destruir gráfica anterior si existe
    if (chartInstance) {
        chartInstance.destroy();
    }

    // Calcular estadísticas
    const prices = historyData.prices;
    const openPrice = historyData.openPrice;
    const highPrice = Math.max(...prices);
    const lowPrice = Math.min(...prices);
    const closePrice = prices[prices.length - 1];
    const change = closePrice - openPrice;
    const changePercent = ((change / openPrice) * 100).toFixed(2);

    // Crear gráfica
    chartInstance = new Chart(ctx, {
        type: 'line',
        data: {
            labels: historyData.times,
            datasets: [{
                label: name,
                data: prices.map(p => parseFloat(p.toFixed(2))),
                borderColor: parseFloat(changePercent) >= 0 ? '#27ae60' : '#e74c3c',
                backgroundColor: parseFloat(changePercent) >= 0 ? 'rgba(39, 174, 96, 0.1)' : 'rgba(231, 76, 60, 0.1)',
                borderWidth: 2.5,
                tension: 0.4,
                fill: true,
                pointRadius: 2,
                pointHoverRadius: 6,
                pointBackgroundColor: parseFloat(changePercent) >= 0 ? '#27ae60' : '#e74c3c',
                pointBorderColor: '#fff',
                pointBorderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    display: true,
                    labels: {
                        color: '#2c3e50',
                        font: { size: 14, weight: 'bold' }
                    }
                },
                tooltip: {
                    backgroundColor: 'rgba(0, 0, 0, 0.8)',
                    padding: 12,
                    titleFont: { size: 14, weight: 'bold' },
                    bodyFont: { size: 12 },
                    borderColor: '#1abc9c',
                    borderWidth: 1,
                    callbacks: {
                        label: function(context) {
                            return `Precio: ${context.parsed.y}`;
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: false,
                    grid: {
                        color: 'rgba(200, 200, 200, 0.15)',
                        drawBorder: true
                    },
                    ticks: {
                        callback: function(value) {
                            return parseFloat(value).toFixed(2);
                        },
                        color: '#7f8c8d'
                    }
                },
                x: {
                    grid: {
                        display: false,
                        drawBorder: false
                    },
                    ticks: {
                        color: '#7f8c8d',
                        maxTicksLimit: 8
                    }
                }
            }
        }
    });

    // Actualizar información
    const infoText = `Apertura: ${openPrice.toFixed(2)} | Máximo: ${highPrice.toFixed(2)} | Mínimo: ${lowPrice.toFixed(2)} | Cierre: ${closePrice.toFixed(2)} | Cambio: ${change.toFixed(2)} (${changePercent}%)`;
    document.getElementById('chartInfo').textContent = infoText;
}

// Cerrar modal al hacer click afuera
window.onclick = function(event) {
    const modal = document.getElementById('chartModal');
    if (event.target == modal) {
        modal.style.display = 'none';
    }
};

// Inicializar
document.addEventListener('DOMContentLoaded', function() {
    initMockData();
    updateMarketDisplay();
    
    // Actualizar cada 30 segundos
    setInterval(updateMarketDisplay, 30000);
});
