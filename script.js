const coins = {
  bitcoin: 'Bitcoin',
  ethereum: 'Ethereum',
  shiba: 'Shiba Inu',
  solana: 'Solana',
  dogecoin: 'Dogecoin',
  cardano: 'Cardano',
  xrp: 'XRP',
  polkadot: 'Polkadot',
  litecoin: 'Litecoin',
  avalanche: 'Avalanche'
};

const container = document.getElementById('crypto-container');

// Create coin blocks
Object.keys(coins).forEach(id => {
  const div = document.createElement('div');
  div.className = 'coin';
  div.id = id;
  container.appendChild(div);
});

function fetchPrices() {
  const ids = Object.keys(coins).join(',');
  fetch(`https://api.coingecko.com/api/v3/simple/price?ids=${ids}&vs_currencies=inr`)
    .then(res => res.json())
    .then(data => {
      Object.entries(coins).forEach(([id, name]) => {
        const price = data[id]?.inr ?? 'N/A';
        document.getElementById(id).innerHTML = `
          <h2>${name}</h2>
          <p>₹${price.toLocaleString()}</p>
        `;
      });
    });
}

fetchPrices();
setInterval(fetchPrices, 30000);