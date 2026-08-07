// Navtara Astrology Core Engine
const NAKSHATRAS = [
  "Ashwini", "Bharani", "Krittika", "Rohini", "Mrigashira", "Ardra", "Punarvasu", "Pushya", "Ashlesha",
  "Magha", "Purva Phalguni", "Uttara Phalguni", "Hasta", "Chitra", "Swati", "Vishakha", "Anuradha", "Jyeshtha",
  "Mula", "Purva Ashadha", "Uttara Ashadha", "Shravana", "Dhanishta", "Shatabhisha", "Purva Bhadrapada", "Uttara Bhadrapada", "Revati"
];

const TARA_TYPES = {
  1: { name: "Janma Tara", status: "Average", do: "Routine work", dont: "Major decisions" },
  2: { name: "Sampat Tara", status: "Good", do: "Financial deals, investments", dont: "Conflicts" },
  3: { name: "Vipat Tara", status: "Bad", do: "Rest, prayer", dont: "Travel, agreements" },
  4: { name: "Kshem Tara", status: "Good", do: "Family, property work", dont: "High risk" },
  5: { name: "Pratyari Tara", status: "Bad", do: "Careful talk", dont: "Arguments, loans" },
  6: { name: "Sadhak Tara", status: "Excellent", do: "Important deals, big work", dont: "Procrastination" },
  7: { name: "Vadh Tara", status: "Very Bad", do: "Rest, stay calm", dont: "New starts" },
  8: { name: "Mitra Tara", status: "Good", do: "Socializing, partnerships", dont: "Isolation" },
  0: { name: "Param Mitra Tara", status: "Excellent", do: "All good activities", dont: "Negative thinking" }
};

// Function: Calculate Tara for single user
function getTaraInfo(birthNakshatraIndex, currentNakshatraIndex) {
  let count = (currentNakshatraIndex - birthNakshatraIndex + 27) % 27 + 1;
  let taraIndex = count % 9;
  return TARA_TYPES[taraIndex];
}

// Function: Find Best Common Day for 3 Users
function checkCommonBestDay(usersNakshatras, currentNakshatraIndex) {
  let results = usersNakshatras.map(nakshatraIndex => getTaraInfo(nakshatraIndex, currentNakshatraIndex));
  let isAllGood = results.every(tara => tara.status === "Good" || tara.status === "Excellent");
  return { isBestDay: isAllGood, userTaras: results };
}
