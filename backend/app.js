const NAKSHATRAS = [
  "Ashwini", "Bharani", "Krittika", "Rohini", "Mrigashira", "Ardra", "Punarvasu", "Pushya", "Ashlesha",
  "Magha", "Purva Phalguni", "Uttara Phalguni", "Hasta", "Chitra", "Swati", "Vishakha", "Anuradha", "Jyeshtha",
  "Mula", "Purva Ashadha", "Uttara Ashadha", "Shravana", "Dhanishta", "Shatabhisha", "Purva Bhadrapada", "Uttara Bhadrapada", "Revati"
];

const TARA_INFO = {
  1: { name: "Janma Tara", status: "Average", type: "neutral", do: "Aam rozmarra ke kaam karein", dont: "Koi badi shuruat na karein" },
  2: { name: "Sampat Tara", status: "Acha", type: "good", do: "Paisa invest karein, business deal karein", dont: "Bahs na karein" },
  3: { name: "Vipat Tara", status: "Bura", type: "bad", do: "Aaram aur puja paath karein", dont: "Naye contract sign na karein, yatra na karein" },
  4: { name: "Kshem Tara", status: "Acha", type: "good", do: "Property, family aur health ke kaam karein", dont: "Bada risk na lein" },
  5: { name: "Pratyari Tara", status: "Bura", type: "bad", do: "Saavdhani se baat karein", dont: "Karza na lein, ladai se bachein" },
  6: { name: "Sadhak Tara", status: "Bahut Acha", type: "good", do: "Important meetings, exam, target work", dont: "Aalas na karein" },
  7: { name: "Vadh Tara", status: "Bahut Bura", type: "bad", do: "Shant rahein, rest karein", dont: "Koi bhi naya ya shubh kaam bilkul na karein" },
  8: { name: "Mitra Tara", status: "Acha", type: "good", do: "Doston se milein, partnership deals karein", dont: "Akela na rahein" },
  0: { name: "Param Mitra Tara", status: "Atyadhik Acha", type: "good", do: "Sabhi shubh aur bade kaam karein", dont: "Negative na sochein" }
};

// Auto-fill Dropdowns on Load
window.onload = function() {
  const dropdowns = ['user-nakshatra', 'current-nakshatra', 'p1-nakshatra', 'p2-nakshatra', 'p3-nakshatra', 'target-nakshatra'];
  dropdowns.forEach(id => {
    let select = document.getElementById(id);
    NAKSHATRAS.forEach((nak, index) => {
      let opt = document.createElement('option');
      opt.value = index;
      opt.innerHTML = nak;
      select.appendChild(opt);
    });
  });
  // Default Dhanishta for user
  document.getElementById('user-nakshatra').value = 22; 
};

function showTab(tabName) {
  document.getElementById('daily-tab').style.display = tabName === 'daily' ? 'block' : 'none';
  document.getElementById('group-tab').style.display = tabName === 'group' ? 'block' : 'none';
}

function getTaraIndex(birthIndex, currentIndex) {
  let count = (currentIndex - birthIndex + 27) % 27 + 1;
  return count % 9;
}

// 1. Single Person Calculation
function calculateDailyTara() {
  let birth = parseInt(document.getElementById('user-nakshatra').value);
  let current = parseInt(document.getElementById('current-nakshatra').value);
  
  let taraIdx = getTaraIndex(birth, current);
  let info = TARA_INFO[taraIdx];

  document.getElementById('daily-result').innerHTML = `
    <h4>Tara Name: <b>${info.name}</b></h4>
    <p>Status: <span class="${info.type}">${info.status}</span></p>
    <p><b>Kya Karein (Do's):</b> ${info.do}</p>
    <p><b>Kya Na Karein (Don'ts):</b> ${info.dont}</p>
  `;
}

// 2. Group Calculation (3 People Match)
function calculateGroupTara() {
  let p1 = parseInt(document.getElementById('p1-nakshatra').value);
  let p2 = parseInt(document.getElementById('p2-nakshatra').value);
  let p3 = parseInt(document.getElementById('p3-nakshatra').value);
  let target = parseInt(document.getElementById('target-nakshatra').value);

  let taras = [p1, p2, p3].map(p => TARA_INFO[getTaraIndex(p, target)]);
  let isBestDay = taras.every(t => t.type === "good");

  let resultHTML = `<h4>Target Day Result:</h4>`;
  if(isBestDay) {
    resultHTML += `<h3 class="good">🎉 Yeh Din Teeno Ke Liye SHUBH Hai! 🎉</h3>`;
  } else {
    resultHTML += `<h3 class="bad">⚠️ Yeh Din Sabhi Ke Liye Anukool Nahi Hai.</h3>`;
  }

  taras.forEach((t, i) => {
    resultHTML += `<p>Person ${i+1}: <b>${t.name}</b> (<span class="${t.type}">${t.status}</span>)</p>`;
  });

  document.getElementById('group-result').innerHTML = resultHTML;
}
