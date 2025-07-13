let map; // Declare map variable globally

// Start button click
document.getElementById('startBtn').addEventListener('click', () => {
  document.querySelector('.intro').classList.add('hidden');
  document.getElementById('safetyScreen').classList.remove('hidden');

  // Initialize map only once
  if (!map) {
    map = L.map('map').setView([12.9716, 77.5946], 13); // Center at Bangalore

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors',
    }).addTo(map);

    // Example safety zones
    const zones = [
      { lat: 12.9721, lon: 77.5937, score: 35 },
      { lat: 12.9750, lon: 77.6000, score: 78 },
      { lat: 12.9680, lon: 77.5800, score: 60 },
    ];

    zones.forEach((zone) => {
      let color = zone.score < 50 ? 'red' : zone.score < 70 ? 'orange' : 'green';
      let circle = L.circle([zone.lat, zone.lon], {
        color: color,
        fillColor: color,
        fillOpacity: 0.5,
        radius: 200,
      }).addTo(map);
      circle.bindPopup(`Safety Score: ${zone.score}%`);
    });
  }
});

// Start Monitoring button click
document.getElementById('monitorBtn').addEventListener('click', () => {
  // Generate a random safety score
  const score = Math.floor(Math.random() * (95 - 60) + 60);
  document.getElementById('safetyScore').textContent = `Safety Score: ${score}%`;

  // Transition to monitoring screen after 1 second
  setTimeout(() => {
    document.getElementById('safetyScreen').classList.add('hidden');
    document.getElementById('monitorScreen').classList.remove('hidden');
  }, 1000);
});

// Simulate Aggression Event button click
document.getElementById('simulateBtn').addEventListener('click', () => {
  document.getElementById('monitorScreen').classList.add('hidden');
  document.getElementById('incidentScreen').classList.remove('hidden');

  const now = new Date();
  document.getElementById('timestamp').textContent = `Time: ${now.toLocaleString()}`;

  // Simulate evidence log entry
  const logList = document.getElementById('logList');
  const block = document.createElement('div');
  block.classList.add('log-block');

  block.innerHTML = `
    <h4>🛡 Incident Logged to Blockchain</h4>
    <p><strong>Time:</strong> ${now.toLocaleString()}</p>
    <p><strong>Block #:</strong> ${Math.floor(Math.random() * 9000 + 1000)}</p>
    <p><strong>Txn Hash:</strong> 0x${Math.random().toString(16).substring(2, 18)}</p>
    <p><strong>Status:</strong> ✅ Confirmed</p>
  `;

  logList.appendChild(block);
});

// View Evidence Log button click
document.getElementById('logBtn').addEventListener('click', () => {
  document.getElementById('incidentScreen').classList.add('hidden');
  document.getElementById('logScreen').classList.remove('hidden');
});

// Back to Start button click
document.getElementById('backBtn').addEventListener('click', () => {
  document.getElementById('logScreen').classList.add('hidden');
  document.querySelector('.intro').classList.remove('hidden');
});

// Start Microphone Monitoring
document.getElementById('startMicBtn').addEventListener('click', () => {
  const statusEl = document.getElementById('monitorStatus');

  // Ask for microphone access
  navigator.mediaDevices.getUserMedia({ audio: true, video: false })
    .then((stream) => {
      statusEl.textContent = 'Status: Listening...';

      const audioContext = new (window.AudioContext || window.webkitAudioContext)();
      const analyser = audioContext.createAnalyser();
      const microphone = audioContext.createMediaStreamSource(stream);
      const dataArray = new Uint8Array(analyser.fftSize);

      microphone.connect(analyser);

      // Function to monitor audio level
      const detect = () => {
        analyser.getByteTimeDomainData(dataArray);
        let sum = 0;
        for (let i = 0; i < dataArray.length; i++) {
          const value = dataArray[i] - 128;
          sum += value * value;
        }
        const volume = Math.sqrt(sum / dataArray.length);

        if (volume > 20) {
          // Detected loud sound
          statusEl.textContent = 'Status: Aggression Detected!';
          stream.getTracks().forEach(track => track.stop());
          triggerIncidentFromMic();
          return;
        }

        requestAnimationFrame(detect);
      };

      detect();
    })
    .catch((err) => {
      statusEl.textContent = 'Microphone access denied.';
      console.error('Microphone error:', err);
    });
});

// Function to simulate aggression detection via mic
function triggerIncidentFromMic() {
  document.getElementById('monitorScreen').classList.add('hidden');
  document.getElementById('incidentScreen').classList.remove('hidden');
document.getElementById('incidentScreen').classList.add('fade-in');

// Play alert sound
document.getElementById('alertSound').play();


  const now = new Date();
  document.getElementById('timestamp').textContent = `Time: ${now.toLocaleString()}`;
  // Populate trusted guardians
const guardians = [
  { name: 'Priya Sharma', distance: '150m', avatar: 'https://i.pravatar.cc/150?img=32' },
  { name: 'Meena Patel', distance: '230m', avatar: 'https://i.pravatar.cc/150?img=47' },
  { name: 'Officer Raj', distance: '300m', avatar: 'https://i.pravatar.cc/150?img=12' }
];

const guardianList = document.getElementById('guardianList');
guardianList.innerHTML = ''; // Clear any old entries

guardians.forEach((g) => {
  const card = document.createElement('div');
  card.classList.add('guardian-card');
  card.innerHTML = `
    <img src="${g.avatar}" alt="${g.name}">
    <p><strong>${g.name}</strong></p>
    <p>${g.distance} away</p>
    <p class="status">Alerted ✅</p>
  `;
  guardianList.appendChild(card);
});


  // Add log entry (same visual style as simulate button)
  const logList = document.getElementById('logList');
  const block = document.createElement('div');
  block.classList.add('log-block');

 const statuses = ['Pending ⏳', 'Processing 🔄', 'Confirmed ✅'];
const status = statuses[Math.floor(Math.random() * statuses.length)];

block.innerHTML = `
  <h4>🛡 Incident Logged to Blockchain</h4>
  <p><strong>Time:</strong> ${now.toLocaleString()}</p>
  <p><strong>Block #:</strong> ${Math.floor(Math.random() * 9000 + 1000)}</p>
  <p><strong>Txn Hash:</strong> 0x${Math.random().toString(16).substring(2, 18)}</p>
  <p><strong>Status:</strong> ${status}</p>
`;


  logList.appendChild(block);
}
