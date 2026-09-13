// Deterministic catalogue seeder for Agarwal Ji Medical Store.
// Run with: node --env-file=.env scripts/seed.mjs   (or: node scripts/seed.mjs)
import fs from "node:fs";
import path from "node:path";
import pg from "pg";

const { Pool } = pg;

function loadEnv() {
  if (process.env.DATABASE_URL) return process.env.DATABASE_URL;
  const envPath = path.resolve(process.cwd(), ".env");
  if (fs.existsSync(envPath)) {
    for (const line of fs.readFileSync(envPath, "utf8").split("\n")) {
      const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/i);
      if (m) process.env[m[1]] = m[2].replace(/^["']|["']$/g, "");
    }
  }
  return process.env.DATABASE_URL;
}

const DATABASE_URL = loadEnv();
if (!DATABASE_URL) throw new Error("DATABASE_URL missing");
const pool = new Pool({ connectionString: DATABASE_URL });

/* ---------------------------------- rng ---------------------------------- */
let seedState = 20240815;
function rnd() {
  seedState |= 0;
  seedState = (seedState + 0x6d2b79f5) | 0;
  let t = Math.imul(seedState ^ (seedState >>> 15), 1 | seedState);
  t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
}
const pick = (arr) => arr[Math.floor(rnd() * arr.length)];
const pickN = (arr, n) => {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(rnd() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy.slice(0, Math.min(n, copy.length));
};
const between = (a, b) => a + rnd() * (b - a);
const intBetween = (a, b) => Math.floor(between(a, b + 1));

/* ------------------------------- brand pool ------------------------------ */
const BRANDS = [
  "Cipla", "Sun Pharma", "Zydus", "Mankind", "Dr. Reddy's", "Lupin", "Abbott", "Torrent",
  "Alkem", "Intas", "Glenmark", "Zydus Cadila", "Aristo", "Hetero", "Ajanta", "USV",
  "Ipca", "Macleods", "JB Chemicals", "Wockhardt", "Himalaya", "Dabur", "Patanjali",
  "Baidyanath", "Zandu", "Pfizer", "GSK", "Sanofi", "Novartis", "Merck", "Boehringer",
  "Eli Lilly", "AstraZeneca", "Systopic", "Neon", "Wallace", "Shreya", "Alembic",
  "Bharat Serums", "Emcure", "FDC", "Franco-Indian", "Jagsonpal", "Karnataka Antibiotics",
];

/* --------------------------- pack / form helpers -------------------------- */
const PACKS = {
  Tablet: [
    { l: "strip of 10 tablets", m: 1 },
    { l: "strip of 15 tablets", m: 1.4 },
    { l: "strip of 20 tablets", m: 1.8 },
    { l: "strip of 30 tablets", m: 2.6 },
    { l: "bottle of 60 tablets", m: 5 },
  ],
  Capsule: [
    { l: "strip of 10 capsules", m: 1 },
    { l: "strip of 15 capsules", m: 1.45 },
    { l: "strip of 30 capsules", m: 2.7 },
    { l: "bottle of 60 capsules", m: 5.1 },
  ],
  Syrup: [
    { l: "bottle of 60 ml", m: 1 },
    { l: "bottle of 100 ml", m: 1.5 },
    { l: "bottle of 150 ml", m: 2 },
    { l: "bottle of 200 ml", m: 2.5 },
  ],
  Suspension: [
    { l: "bottle of 60 ml", m: 1 },
    { l: "bottle of 100 ml", m: 1.6 },
  ],
  Injection: [
    { l: "vial of 2 ml", m: 1 },
    { l: "vial of 5 ml", m: 1.9 },
    { l: "pack of 3 ampoules", m: 2.7 },
  ],
  Cream: [
    { l: "tube of 15 gm", m: 1 },
    { l: "tube of 30 gm", m: 1.7 },
    { l: "tube of 50 gm", m: 2.4 },
  ],
  Ointment: [
    { l: "tube of 15 gm", m: 1 },
    { l: "tube of 30 gm", m: 1.75 },
  ],
  Gel: [
    { l: "tube of 15 gm", m: 1 },
    { l: "tube of 30 gm", m: 1.8 },
  ],
  Drops: [
    { l: "bottle of 5 ml", m: 1 },
    { l: "bottle of 10 ml", m: 1.7 },
    { l: "bottle of 15 ml", m: 2.2 },
  ],
  Spray: [
    { l: "spray of 15 gm", m: 1 },
    { l: "spray of 30 gm", m: 1.7 },
    { l: "nasal spray of 10 ml", m: 1.4 },
  ],
  Powder: [
    { l: "sachet of 5 gm", m: 1 },
    { l: "box of 10 sachets", m: 8.5 },
    { l: "jar of 200 gm", m: 32 },
  ],
  Solution: [
    { l: "bottle of 30 ml", m: 1 },
    { l: "bottle of 60 ml", m: 1.8 },
    { l: "bottle of 100 ml", m: 2.7 },
  ],
  Device: [
    { l: "1 unit", m: 1 },
    { l: "box of 2 units", m: 1.9 },
    { l: "combo pack of 3", m: 2.8 },
  ],
  TestKit: [
    { l: "box of 1 test", m: 1 },
    { l: "box of 3 tests", m: 2.6 },
    { l: "box of 5 tests", m: 4 },
  ],
  Condom: [
    { l: "packet of 3 condoms", m: 1 },
    { l: "packet of 10 condoms", m: 2.8 },
    { l: "packet of 20 condoms", m: 5.1 },
    { l: "value pack of 40 condoms", m: 9.2 },
  ],
  Soap: [
    { l: "box of 75 gm", m: 1 },
    { l: "pack of 4 x 100 gm", m: 4.6 },
    { l: "bottle of 200 ml", m: 2.6 },
  ],
  Wipe: [
    { l: "pack of 40 wipes", m: 1 },
    { l: "pack of 3 x 72 wipes", m: 2.6 },
  ],
  Lozenge: [
    { l: "strip of 8 lozenges", m: 1 },
    { l: "strip of 12 lozenges", m: 1.4 },
    { l: "box of 30 lozenges", m: 3.2 },
  ],
  Sachet: [
    { l: "sachet of 21.8 gm", m: 1 },
    { l: "box of 5 sachets", m: 4.7 },
    { l: "box of 10 sachets", m: 9 },
  ],
};

const formsOf = (f) => (Array.isArray(f) ? f : [f]);

/* -------------------------------- categories ------------------------------ */
// item tuple: [name, composition, uses, forms, strengths, rx, [minPrice,maxPrice]]
const CATALOG = [
  {
    slug: "pain-relief",
    name: "Pain Relief & Fever",
    tagline: "Fast relief from fever, body ache and joint pain",
    description:
      "Analgesics, antipyretics and anti-inflammatory medicines for headaches, fever, back pain, arthritis and muscular injuries.",
    icon: "thermometer",
    accent: "from-rose-500 to-orange-500",
    items: [
      ["Dolo", "Paracetamol 650 mg", "fever, headache and mild body pain", ["Tablet"], ["650 mg", "500 mg"], false, [18, 42]],
      ["Crocin Advance", "Paracetamol 500 mg", "fever and pain relief", ["Tablet"], ["500 mg", "650 mg"], false, [16, 38]],
      ["Calpol", "Paracetamol", "infant and child fever", ["Tablet", "Suspension"], ["250 mg", "120 mg/5 ml"], false, [22, 60]],
      ["Combiflam", "Ibuprofen 400 mg + Paracetamol 325 mg", "pain, swelling and fever", ["Tablet", "Suspension"], ["400+325 mg", "100+162.5 mg/5 ml"], false, [24, 55]],
      ["Brufen", "Ibuprofen 400 mg", "inflammatory pain and swelling", ["Tablet", "Suspension"], ["400 mg", "200 mg", "100 mg/5 ml"], false, [20, 48]],
      ["Meftal-P", "Mefenamic Acid 250 mg", "menstrual cramps and fever", ["Tablet", "Suspension"], ["250 mg", "500 mg", "100 mg/5 ml"], false, [26, 62]],
      ["Zerodol-P", "Aceclofenac 100 mg + Paracetamol 325 mg", "arthritis and musculoskeletal pain", ["Tablet"], ["100+325 mg", "150+325 mg"], true, [42, 96]],
      ["Voveran", "Diclofenac Sodium 50 mg", "joint pain and post-operative pain", ["Tablet", "Injection"], ["50 mg", "75 mg/3 ml"], true, [28, 88]],
      ["Flexon", "Ibuprofen + Paracetamol", "back pain and sprains", ["Tablet", "Suspension"], ["400+325 mg", "100+162.5 mg/5 ml"], false, [22, 58]],
      ["Saridon", "Paracetamol 250 mg + Propyphenazone 150 mg + Caffeine 50 mg", "headache and migraine pain", ["Tablet"], ["250+150+50 mg"], false, [30, 68]],
      ["Disprin", "Aspirin 350 mg", "headache, fever and pain", ["Tablet"], ["350 mg"], false, [10, 26]],
      ["Volini Gel", "Diclofenac Diethylamine 1.16% w/w", "localized muscle and joint pain", ["Gel", "Spray"], ["1.16% w/w", "0.1% w/w"], false, [95, 260]],
      ["Moov Pain Relief Cream", "Wintergreen Oil + Menthol + Turpentine Oil", "back and neck pain", ["Cream"], ["30 gm", "50 gm"], false, [110, 240]],
      ["Iodex Ultra Gel", "Menthol 8% + Thymol 0.6%", "sprains, strains and stiffness", ["Gel", "Ointment"], ["8% w/w"], false, [85, 195]],
      ["Nimulid", "Nimesulide 100 mg", "acute painful inflammatory conditions", ["Tablet", "Gel"], ["100 mg", "1% w/w"], true, [38, 92]],
      ["Relaxyl", "Thiocolchicoside 8 mg", "muscle spasm and back stiffness", ["Capsule", "Gel"], ["8 mg", "0.25% w/w"], true, [78, 175]],
      ["Migranil", "Ergotamine 1 mg + Caffeine 100 mg + Paracetamol 250 mg", "migraine attacks", ["Tablet"], ["1+100+250 mg"], true, [62, 140]],
      ["Sibelium", "Flunarizine 5 mg", "migraine prophylaxis and vertigo", ["Capsule"], ["5 mg", "10 mg"], true, [98, 220]],
      ["Hifenac-SP", "Aceclofenac + Serratiopeptidase + Paracetamol", "post-traumatic swelling and pain", ["Tablet"], ["100+15+325 mg"], true, [55, 130]],
      ["Ibugesic Plus", "Ibuprofen + Paracetamol", "paediatric fever with pain", ["Suspension"], ["100+162.5 mg/5 ml"], false, [45, 95]],
      ["Paracetamol IV Infusion", "Paracetamol 10 mg/ml", "hospital grade fever control", ["Injection"], ["100 ml", "50 ml"], true, [75, 160]],
      ["Dynapar AQ", "Diclofenac Sodium 75 mg", "severe acute pain", ["Injection"], ["75 mg/2 ml", "75 mg/3 ml"], true, [40, 120]],
    ],
  },
  {
    slug: "cold-cough",
    name: "Cold, Cough & Allergy",
    tagline: "Antihistamines, cough syrups and nasal relief",
    description:
      "Symptomatic relief for seasonal flu, allergic rhinitis, dry and wet cough, sinus congestion and throat irritation.",
    icon: "lungs",
    accent: "from-sky-500 to-cyan-500",
    items: [
      ["Cetzine", "Cetirizine 10 mg", "sneezing, runny nose and skin allergy", ["Tablet", "Syrup"], ["10 mg", "5 mg/5 ml"], false, [12, 40]],
      ["Alerid", "Cetirizine Hydrochloride", "allergic rhinitis and urticaria", ["Tablet", "Syrup"], ["10 mg", "5 mg/5 ml"], false, [14, 42]],
      ["Montair-LC", "Montelukast 10 mg + Levocetirizine 5 mg", "asthma with allergic rhinitis", ["Tablet"], ["10+5 mg", "5+2.5 mg"], true, [95, 210]],
      ["Telekast-L", "Montelukast + Levocetirizine", "chronic allergy and cough", ["Tablet"], ["10+5 mg"], true, [88, 195]],
      ["Allegra", "Fexofenadine 120 mg", "seasonal allergies without drowsiness", ["Tablet", "Suspension"], ["120 mg", "180 mg", "30 mg/5 ml"], false, [120, 320]],
      ["Benadryl Cough Formula", "Diphenhydramine + Ammonium Chloride + Sodium Citrate", "cough and throat irritation", ["Syrup"], ["150 ml", "50 ml"], false, [95, 220]],
      ["Ascoril LS", "Ambroxol + Levosalbutamol + Guaiphenesin", "productive cough with wheeze", ["Syrup"], ["100 ml", "60 ml"], true, [105, 230]],
      ["Honitus Herbal Cough Remedy", "Tulsi + Ginger + Mulethi", "herbal cough relief", ["Syrup"], ["100 ml", "200 ml"], false, [65, 150]],
      ["Corex-DX", "Dextromethorphan + Chlorpheniramine", "dry irritating cough", ["Syrup"], ["100 ml"], true, [88, 190]],
      ["Sinarest", "Paracetamol + Phenylephrine + Caffeine", "cold, fever and blocked nose", ["Tablet", "Syrup"], ["500+10+30 mg", "125+5+30 mg/5 ml"], false, [28, 75]],
      ["Cheston Cold", "Cetirizine + Paracetamol + Phenylephrine", "common cold symptoms", ["Tablet"], ["5+500+10 mg"], false, [42, 95]],
      ["Wikoryl", "Paracetamol + Phenylephrine + Chlorpheniramine", "head cold and body ache", ["Tablet", "Syrup"], ["500+10+2 mg", "125+5+1 mg/5 ml"], false, [32, 80]],
      ["Coldact", "Chlorpheniramine + Phenylephrine", "runny nose and congestion", ["Capsule"], ["4+10 mg"], false, [25, 65]],
      ["Otrivin Nasal Spray", "Xylometazoline 0.1%", "nasal congestion relief", ["Spray", "Drops"], ["0.1% w/v", "0.05% w/v"], false, [105, 230]],
      ["Nasivion", "Oxymetazoline 0.05%", "blocked nose in adults and children", ["Spray", "Drops"], ["0.05% w/v", "0.025% w/v"], false, [95, 210]],
      ["Rhinocort Aqua", "Budesonide 32 mcg", "allergic rhinitis maintenance", ["Spray"], ["32 mcg", "64 mcg"], true, [265, 520]],
      ["Mucolite", "Ambroxol 30 mg", "loosens thick phlegm", ["Tablet", "Syrup"], ["30 mg", "15 mg/5 ml"], false, [55, 130]],
      ["Strepsils", "2,4-Dichlorobenzyl Alcohol + Amylmetacresol", "sore throat lozenges", ["Lozenge"], ["Orange", "Honey & Lemon", "Original"], false, [45, 145]],
      ["Koflet-H", "Ginger + Tulsi + Honey", "herbal throat soothing", ["Lozenge"], ["Honey", "Ginger"], false, [40, 120]],
      ["Karvol Plus", "Menthol + Thymol + Eucalyptus Oil", "steam inhalation capsules", ["Capsule"], ["Inhalation capsule"], false, [45, 110]],
      ["Asthalin", "Salbutamol 2 mg", "bronchospasm and wheezing", ["Tablet", "Syrup", "Solution"], ["2 mg", "1 mg/5 ml", "100 mcg inhaler"], true, [35, 260]],
      ["Deriphyllin", "Etofylline + Theophylline", "asthma and COPD relief", ["Tablet", "Injection"], ["84.5+32 mg", "200 mg/2 ml"], true, [40, 130]],
    ],
  },
  {
    slug: "antibiotics",
    name: "Antibiotics & Antifungals",
    tagline: "Prescription-only infection control",
    description:
      "Antibacterial and antifungal treatments for throat, urinary, skin, dental and respiratory infections. Valid prescription required.",
    icon: "capsule",
    accent: "from-indigo-500 to-violet-600",
    items: [
      ["Augmentin 625", "Amoxicillin 500 mg + Clavulanic Acid 125 mg", "bacterial respiratory and skin infections", ["Tablet"], ["625 mg", "1 g"], true, [145, 340]],
      ["Mox", "Amoxicillin 500 mg", "throat, ear and chest infections", ["Capsule", "Syrup"], ["500 mg", "250 mg", "125 mg/5 ml"], true, [70, 180]],
      ["Azithral 500", "Azithromycin 500 mg", "respiratory and soft tissue infection", ["Tablet", "Suspension"], ["500 mg", "250 mg", "200 mg/5 ml"], true, [95, 260]],
      ["Taxim-O", "Cefixime 200 mg", "urinary tract and typhoid fever", ["Tablet", "Suspension"], ["200 mg", "100 mg", "50 mg/5 ml"], true, [110, 280]],
      ["Phexin", "Cephalexin 500 mg", "skin and bone infections", ["Capsule", "Suspension"], ["500 mg", "250 mg"], true, [95, 230]],
      ["Dox-1 LB", "Doxycycline 100 mg", "acne, malaria prophylaxis and chest infection", ["Capsule"], ["100 mg", "200 mg"], true, [65, 165]],
      ["Zanocin", "Ofloxacin 200 mg", "urinary and gastrointestinal infection", ["Tablet"], ["200 mg", "400 mg"], true, [55, 140]],
      ["Levoflox", "Levofloxacin 500 mg", "pneumonia and kidney infection", ["Tablet"], ["500 mg", "750 mg"], true, [70, 190]],
      ["Ciplox", "Ciprofloxacin 500 mg", "bacterial infection of gut and urinary tract", ["Tablet"], ["500 mg", "250 mg"], true, [35, 95]],
      ["Norflox-TZ", "Norfloxacin 400 mg + Tinidazole 600 mg", "diarrhoea and dysentery", ["Tablet"], ["400+600 mg"], true, [65, 150]],
      ["Flagyl", "Metronidazole 400 mg", "amoebiasis and anaerobic infection", ["Tablet", "Suspension"], ["400 mg", "200 mg", "100 mg/5 ml"], true, [30, 90]],
      ["Clindan", "Clindamycin 300 mg", "dental and deep tissue infection", ["Capsule", "Gel"], ["300 mg", "1% w/w"], true, [120, 300]],
      ["Linzolid", "Linezolid 600 mg", "resistant gram-positive infection", ["Tablet"], ["600 mg"], true, [210, 480]],
      ["Monotel", "Ceftriaxone 1 g", "severe bacterial infection", ["Injection"], ["1 g", "500 mg"], true, [40, 145]],
      ["Amikacin Sulfate", "Amikacin 500 mg", "hospital grade infection control", ["Injection"], ["500 mg/2 ml", "250 mg/2 ml"], true, [45, 160]],
      ["Forcan 150", "Fluconazole 150 mg", "fungal and yeast infections", ["Capsule"], ["150 mg", "200 mg"], true, [55, 160]],
      ["Canditral", "Itraconazole 100 mg", "ringworm and systemic fungal infection", ["Capsule"], ["100 mg", "200 mg"], true, [180, 420]],
      ["Terbifin", "Terbinafine 250 mg", "nail and skin fungus", ["Tablet", "Cream"], ["250 mg", "1% w/w"], true, [95, 260]],
      ["Lulican", "Luliconazole 1% w/w", "athlete foot and jock itch", ["Cream", "Solution"], ["1% w/w", "1% lotion"], true, [160, 380]],
      ["Candid Cream", "Clotrimazole 1% w/w", "candidal skin infection", ["Cream", "Powder", "Solution"], ["1% w/w", "100 mg vaginal"], false, [55, 165]],
      ["Nizoral", "Ketoconazole 2% w/w", "dandruff and seborrhoeic dermatitis", ["Soap", "Solution"], ["2% shampoo", "Soap"], false, [180, 420]],
      ["Mupirocin Ointment", "Mupirocin 2% w/w", "impetigo and wound infection", ["Ointment"], ["2% w/w", "5 gm", "10 gm"], true, [110, 260]],
    ],
  },
  {
    slug: "diabetes",
    name: "Diabetes Care",
    tagline: "Sugar control, insulin and monitoring",
    description:
      "Oral anti-diabetics, insulin, neuropathy support and diabetic nutrition for long-term blood sugar management.",
    icon: "droplet",
    accent: "from-teal-500 to-emerald-600",
    items: [
      ["Glycomet", "Metformin 500 mg", "type 2 diabetes control", ["Tablet"], ["500 mg", "850 mg", "1000 mg SR"], true, [22, 78]],
      ["Okamet", "Metformin + Glimepiride", "combination sugar control", ["Tablet"], ["500+1 mg", "500+2 mg"], true, [55, 150]],
      ["Amaryl", "Glimepiride 2 mg", "insulin secretion support", ["Tablet"], ["1 mg", "2 mg", "3 mg"], true, [65, 175]],
      ["Reclide MR", "Gliclazide 80 mg", "modified release sugar control", ["Tablet"], ["80 mg", "60 mg MR"], true, [95, 240]],
      ["Galvus Met", "Vildagliptin 50 mg + Metformin 500 mg", "dual action diabetes therapy", ["Tablet"], ["50+500 mg", "50+1000 mg"], true, [185, 420]],
      ["Istamet", "Sitagliptin 50 mg + Metformin 500 mg", "HbA1c reduction", ["Tablet"], ["50+500 mg", "50+1000 mg"], true, [195, 450]],
      ["Trajenta", "Linagliptin 5 mg", "kidney safe diabetes control", ["Tablet"], ["5 mg"], true, [310, 620]],
      ["Forxiga", "Dapagliflozin 10 mg", "glucose excretion and heart protection", ["Tablet"], ["5 mg", "10 mg"], true, [410, 880]],
      ["Jardiance", "Empagliflozin 10 mg", "diabetes with cardiac benefit", ["Tablet"], ["10 mg", "25 mg"], true, [480, 980]],
      ["Teniva", "Teneligliptin 20 mg", "affordable DPP-4 inhibitor", ["Tablet"], ["20 mg"], true, [130, 290]],
      ["Pioz", "Pioglitazone 15 mg", "insulin sensitivity improvement", ["Tablet"], ["15 mg", "30 mg"], true, [55, 140]],
      ["Voglibose-GM", "Voglibose 0.2 mg + Metformin", "post-meal sugar spikes", ["Tablet"], ["0.2+500 mg", "0.3+500 mg"], true, [105, 260]],
      ["Basalog", "Insulin Glargine 100 IU/ml", "long acting basal insulin", ["Injection"], ["3 ml pen", "10 ml vial"], true, [395, 900]],
      ["Huminsulin R", "Human Insulin 100 IU/ml", "rapid acting mealtime insulin", ["Injection"], ["10 ml vial", "3 ml pen"], true, [150, 480]],
      ["Thiofit Plus", "Alpha Lipoic Acid + Vitamin B complex", "diabetic neuropathy support", ["Capsule", "Tablet"], ["100 mg", "200 mg"], false, [230, 560]],
      ["Protinex Diabetes", "High protein diabetic nutrition", "meal replacement for diabetics", ["Powder"], ["Vanilla 200 gm", "Chocolate 200 gm"], false, [340, 690]],
      ["Sugar Free Natura", "Sucralose sweetener", "zero calorie sugar substitute", ["Tablet", "Powder"], ["100 pellets", "1 gm sachets"], false, [110, 290]],
      ["BGR-34", "Ayurvedic anti-diabetic formula", "herbal glucose support", ["Tablet"], ["100 tablets"], false, [325, 720]],
      ["Karela Jamun Juice", "Momordica + Syzygium extract", "natural blood sugar support", ["Solution"], ["500 ml", "1 litre"], false, [150, 380]],
      ["Accu-Chek Active Strips", "Glucose test strips", "daily sugar monitoring", ["TestKit"], ["50 strips", "100 strips"], false, [750, 1850]],
    ],
  },
  {
    slug: "heart-bp",
    name: "Heart & Blood Pressure",
    tagline: "Cardiac care you can trust",
    description:
      "Antihypertensives, statins, blood thinners and heart supplements prescribed for long-term cardiovascular health.",
    icon: "heart",
    accent: "from-red-500 to-rose-600",
    items: [
      ["Amlokind", "Amlodipine 5 mg", "high blood pressure control", ["Tablet"], ["2.5 mg", "5 mg", "10 mg"], true, [25, 78]],
      ["Telma 40", "Telmisartan 40 mg", "hypertension and kidney protection", ["Tablet"], ["40 mg", "80 mg"], true, [95, 240]],
      ["Telma-H", "Telmisartan + Hydrochlorothiazide", "combination BP control", ["Tablet"], ["40+12.5 mg", "80+12.5 mg"], true, [120, 300]],
      ["Losar", "Losartan Potassium 50 mg", "blood pressure and heart failure", ["Tablet"], ["50 mg", "100 mg"], true, [85, 210]],
      ["Cardace", "Ramipril 5 mg", "post heart-attack protection", ["Capsule", "Tablet"], ["2.5 mg", "5 mg", "10 mg"], true, [95, 230]],
      ["Metolar XR", "Metoprolol Succinate 50 mg", "heart rate and BP control", ["Tablet"], ["25 mg", "50 mg", "100 mg"], true, [65, 175]],
      ["Betaloc", "Metoprolol Tartrate 50 mg", "angina and hypertension", ["Tablet"], ["50 mg", "100 mg"], true, [45, 130]],
      ["Aten", "Atenolol 50 mg", "long term BP management", ["Tablet"], ["25 mg", "50 mg", "100 mg"], true, [25, 80]],
      ["Concor", "Bisoprolol 5 mg", "heart failure and hypertension", ["Tablet"], ["2.5 mg", "5 mg", "10 mg"], true, [110, 260]],
      ["Nebistar", "Nebivolol 5 mg", "cardio-selective beta blocker", ["Tablet"], ["2.5 mg", "5 mg"], true, [105, 240]],
      ["Lasix", "Furosemide 40 mg", "oedema and fluid overload", ["Tablet", "Injection"], ["40 mg", "20 mg/2 ml"], true, [25, 85]],
      ["Atorva", "Atorvastatin 10 mg", "cholesterol lowering", ["Tablet"], ["10 mg", "20 mg", "40 mg"], true, [55, 160]],
      ["Rosuvas", "Rosuvastatin 10 mg", "LDL reduction therapy", ["Tablet"], ["5 mg", "10 mg", "20 mg"], true, [120, 320]],
      ["Clopilet A", "Clopidogrel 75 mg + Aspirin 75 mg", "clot prevention after stent", ["Capsule"], ["75+75 mg"], true, [110, 260]],
      ["Ecosprin 75", "Aspirin 75 mg", "antiplatelet therapy", ["Tablet"], ["75 mg", "150 mg"], false, [10, 40]],
      ["Xarelto", "Rivaroxaban 20 mg", "anticoagulant for DVT and AF", ["Tablet"], ["10 mg", "15 mg", "20 mg"], true, [780, 1650]],
      ["Eliquis", "Apixaban 5 mg", "stroke prevention in AF", ["Tablet"], ["2.5 mg", "5 mg"], true, [820, 1720]],
      ["Digoxin", "Digoxin 0.25 mg", "heart failure rhythm support", ["Tablet", "Injection"], ["0.25 mg", "0.5 mg/2 ml"], true, [35, 120]],
      ["Nitrolingual Spray", "Nitroglycerin 0.4 mg", "emergency angina relief", ["Spray"], ["0.4 mg/dose"], true, [240, 520]],
      ["Ranexa", "Ranolazine 500 mg", "chronic angina management", ["Tablet"], ["500 mg", "1000 mg"], true, [380, 780]],
      ["Seacod", "Cod Liver Oil with Omega 3", "heart and joint support", ["Capsule"], ["1000 mg", "500 mg"], false, [180, 460]],
      ["CoQ10 Forte", "Coenzyme Q10 100 mg", "cardiac energy support", ["Capsule"], ["100 mg", "200 mg"], false, [420, 950]],
      ["Omron HEM-7124", "Digital BP monitor", "home blood pressure tracking", ["Device"], ["Upper arm"], false, [1650, 3400]],
    ],
  },
  {
    slug: "digestion",
    name: "Stomach & Digestion",
    tagline: "Acidity, gas and gut health",
    description:
      "Antacids, PPIs, laxatives, probiotics and liver tonics for acidity, constipation, indigestion and gut immunity.",
    icon: "stomach",
    accent: "from-amber-500 to-yellow-500",
    items: [
      ["Pantop", "Pantoprazole 40 mg", "acidity and gastric ulcer", ["Tablet", "Injection"], ["40 mg", "20 mg", "40 mg vial"], true, [65, 180]],
      ["Pan-D", "Pantoprazole + Domperidone", "acidity with nausea", ["Capsule"], ["40+30 mg"], true, [95, 220]],
      ["Razo 20", "Rabeprazole 20 mg", "GERD and reflux", ["Tablet"], ["20 mg", "10 mg"], true, [85, 200]],
      ["Omez", "Omeprazole 20 mg", "ulcer and acid control", ["Capsule"], ["20 mg", "40 mg"], true, [45, 130]],
      ["Nexpro", "Esomeprazole 40 mg", "erosive oesophagitis", ["Tablet"], ["20 mg", "40 mg"], true, [105, 260]],
      ["Domstal", "Domperidone 10 mg", "nausea and vomiting", ["Tablet", "Suspension"], ["10 mg", "5 mg/5 ml"], true, [35, 95]],
      ["Emeset", "Ondansetron 4 mg", "chemo and post-op vomiting", ["Tablet", "Injection"], ["4 mg", "8 mg", "2 mg/5 ml"], true, [25, 90]],
      ["Sucrafil", "Sucralfate 1 g", "ulcer coating and healing", ["Suspension", "Tablet"], ["1 g/5 ml", "1 g"], true, [105, 250]],
      ["Digene", "Simethicone + Magnesium Hydroxide", "gas and acidity", ["Suspension", "Tablet"], ["200 ml mint", "200 ml orange"], false, [105, 250]],
      ["Gelusil MPS", "Antacid with Simethicone", "indigestion and bloating", ["Suspension", "Tablet"], ["150 ml", "MPS liquid"], false, [95, 220]],
      ["Duphalac", "Lactulose 10 g/15 ml", "constipation relief", ["Syrup"], ["100 ml", "200 ml", "450 ml"], false, [135, 420]],
      ["Cremaffin Plus", "Liquid Paraffin + Milk of Magnesia", "stool softener", ["Syrup"], ["150 ml", "225 ml"], false, [125, 320]],
      ["Isabgol", "Psyllium husk", "natural fibre laxative", ["Powder"], ["100 gm", "200 gm", "400 gm"], false, [105, 380]],
      ["Electral", "Oral Rehydration Salts", "dehydration and diarrhoea", ["Sachet", "Powder"], ["21.8 gm sachet", "1 litre pack"], false, [20, 60]],
      ["Econorm", "Saccharomyces boulardii 250 mg", "antibiotic associated diarrhoea", ["Sachet", "Capsule"], ["250 mg", "60 mg paediatric"], false, [155, 340]],
      ["Bifilac", "Prebiotic + Probiotic capsules", "gut flora restoration", ["Capsule", "Sachet"], ["10 capsules", "5 sachets"], false, [105, 260]],
      ["Panzytrate", "Pancreatin 150 mg", "digestive enzyme support", ["Capsule", "Tablet"], ["150 mg", "300 mg"], true, [85, 210]],
      ["Cyclopam", "Dicyclomine + Simethicone", "abdominal cramps and colic", ["Tablet", "Suspension"], ["20+40 mg", "10+40 mg/5 ml"], true, [45, 130]],
      ["Colospa", "Mebeverine 135 mg", "irritable bowel syndrome", ["Tablet", "Capsule"], ["135 mg", "200 mg SR"], true, [115, 280]],
      ["Udiliv", "Ursodeoxycholic Acid 300 mg", "gallstone and liver support", ["Tablet", "Suspension"], ["300 mg", "150 mg"], true, [240, 560]],
      ["Liv-52", "Herbal hepatoprotective", "liver function support", ["Tablet", "Syrup"], ["DS tablet", "100 ml syrup"], false, [85, 260]],
      ["Gas-O-Fast", "Fruit salt antacid", "instant gas relief", ["Sachet"], ["Jeera", "Orange", "Mixed fruit"], false, [15, 45]],
      ["Pudin Hara", "Mentha oil pearls", "gas and abdominal pain", ["Capsule"], ["10 pearls", "25 pearls"], false, [35, 110]],
    ],
  },
  {
    slug: "vitamins",
    name: "Vitamins & Supplements",
    tagline: "Daily nutrition for every age",
    description:
      "Multivitamins, B-complex, calcium, iron, protein powders and immunity boosters for energy and recovery.",
    icon: "sun",
    accent: "from-orange-500 to-amber-500",
    items: [
      ["Becosules", "Vitamin B Complex with C", "mouth ulcers and energy", ["Capsule", "Syrup"], ["Z capsules", "200 ml syrup"], false, [30, 95]],
      ["Zincovit", "Multivitamin with Zinc", "immunity and recovery", ["Tablet", "Syrup"], ["Tablet", "100 ml"], false, [95, 230]],
      ["Supradyn", "Multivitamin multimineral", "daily vitality", ["Tablet", "Capsule"], ["Daily", "Effervescent"], false, [105, 280]],
      ["Revital H", "Ginseng multivitamin", "energy and stamina", ["Capsule"], ["30 capsules", "60 capsules"], false, [295, 680]],
      ["Neurobion Forte", "Vitamin B1 B6 B12", "nerve health and tingling", ["Tablet"], ["30 tablets", "60 tablets"], false, [35, 130]],
      ["Nurokind-OD", "Methylcobalamin 1500 mcg", "vitamin B12 deficiency", ["Tablet"], ["1500 mcg", "750 mcg"], true, [85, 220]],
      ["Folvite", "Folic Acid 5 mg", "pregnancy and anaemia support", ["Tablet"], ["5 mg", "1 mg"], false, [30, 90]],
      ["Livogen Z", "Iron + Folic Acid + Zinc", "iron deficiency anaemia", ["Tablet", "Syrup"], ["Tablet", "200 ml"], false, [45, 150]],
      ["Orofer XT", "Iron Polymaltose + Folic Acid", "pregnancy iron supplement", ["Tablet", "Syrup"], ["100 mg", "200 ml"], false, [95, 250]],
      ["Dexorange", "Iron, B12 and Folic Acid", "blood building tonic", ["Syrup"], ["200 ml", "450 ml"], false, [145, 380]],
      ["Shelcal 500", "Elemental Calcium 500 mg + Vitamin D3", "bone strength", ["Tablet"], ["500 mg", "1000 mg"], false, [95, 260]],
      ["Calcirol", "Cholecalciferol 60000 IU", "vitamin D3 weekly sachet", ["Sachet", "Capsule", "Injection"], ["60000 IU", "3 lac IU/ml"], true, [25, 95]],
      ["Uprise D3", "Vitamin D3 60000 IU", "bone and immunity support", ["Capsule", "Syrup"], ["60k capsule", "600 IU/5 ml"], false, [45, 160]],
      ["Limcee", "Vitamin C 500 mg chewable", "immunity and skin health", ["Tablet"], ["Orange", "Lemon", "Chewable 500 mg"], false, [20, 65]],
      ["Evion 400", "Vitamin E 400 mg", "skin, hair and muscle health", ["Capsule"], ["400 mg", "200 mg"], false, [30, 95]],
      ["Keraglo", "Biotin with amino acids", "hair fall control", ["Capsule", "Tablet"], ["Keraglo", "Keraglo Men"], false, [340, 780]],
      ["Protinex", "Protein nutrition powder", "muscle and recovery support", ["Powder"], ["Chocolate 250 gm", "Original 400 gm", "Vanilla 200 gm"], false, [310, 890]],
      ["Ensure", "Complete balanced nutrition", "meal supplement for adults", ["Powder"], ["Vanilla 400 gm", "Chocolate 1 kg"], false, [520, 1650]],
      ["Seven Seas", "Cod liver oil capsule", "joint and heart support", ["Capsule"], ["Original", "Plus D3"], false, [210, 520]],
      ["Chyawanprash", "Amla and 40 herbal blend", "daily immunity tonic", ["Powder"], ["250 gm", "500 gm", "1 kg"], false, [110, 480]],
      ["Zincofar", "Zinc Sulphate 50 mg", "zinc deficiency and diarrhoea", ["Tablet", "Syrup"], ["50 mg", "20 mg/5 ml"], false, [55, 165]],
      ["Carbamide Forte Omega 3", "Fish oil 1000 mg", "heart, brain and joint care", ["Capsule"], ["60 softgels", "120 softgels"], false, [395, 980]],
    ],
  },
  {
    slug: "sexual-wellness",
    name: "Sexual Wellness & Protection",
    tagline: "100% discreet, judgement-free care",
    description:
      "Condoms, contraceptives, lubricants, pregnancy tests and clinician-approved intimate wellness products. Every order ships in plain, unmarked packaging.",
    icon: "shield",
    accent: "from-fuchsia-500 to-purple-600",
    ageRestricted: true,
    items: [
      ["Durex Ultra Thin", "Natural latex condom", "ultra thin protection with natural feel", ["Condom"], ["3 condoms", "10 condoms", "20 condoms"], false, [65, 380]],
      ["Durex Air", "Ultra thin latex condom", "barely-there intimacy", ["Condom"], ["3 condoms", "10 condoms"], false, [120, 480]],
      ["Durex Extra Time", "Benzocaine 5% delay condom", "extended performance", ["Condom"], ["3 condoms", "10 condoms", "20 condoms"], false, [135, 520]],
      ["Durex Mutual Pleasure", "Ribbed and dotted condom", "enhanced stimulation for both partners", ["Condom"], ["10 condoms", "20 condoms"], false, [185, 560]],
      ["Durex Play Classic", "Water based intimate lubricant", "comfortable friction-free intimacy", ["Solution"], ["50 ml", "100 ml"], false, [185, 460]],
      ["Durex Play Tingle", "Tingling water based lubricant", "cooling sensation", ["Solution"], ["50 ml"], false, [225, 480]],
      ["KamaSutra Dotted", "Dotted latex condom", "extra stimulation", ["Condom"], ["3 condoms", "10 condoms", "20 condoms"], false, [45, 320]],
      ["KamaSutra Ultra Thin", "Premium latex condom", "close to natural feel", ["Condom"], ["10 condoms"], false, [95, 340]],
      ["Manforce Ultra Thin", "Latex condom with silicone lubricant", "protection with comfort", ["Condom"], ["3 condoms", "10 condoms", "40 condoms"], false, [45, 350]],
      ["Manforce Flavored", "Flavoured latex condom", "strawberry, chocolate and mint range", ["Condom"], ["Strawberry", "Chocolate", "Mixed pack"], false, [75, 320]],
      ["Okamoto 0.03", "Ultra thin latex condom", "0.03 mm Japanese technology", ["Condom"], ["3 condoms", "10 condoms"], false, [245, 720]],
      ["Skyn Elite", "Non-latex polyisoprene condom", "latex-free sensitive skin option", ["Condom"], ["3 condoms", "10 condoms"], false, [225, 680]],
      ["Manforce Stayon Delay Spray", "Lidocaine 10% topical spray", "delayed ejaculation support", ["Spray"], ["15 gm", "30 gm"], false, [215, 520]],
      ["Climax Spray", "Lidocaine 10% w/w delay spray", "longer lasting performance", ["Spray"], ["12 gm"], false, [185, 460]],
      ["K-Y Personal Lubricant", "Water based jelly", "clinically tested intimate lubricant", ["Solution", "Gel"], ["50 gm", "100 gm"], false, [295, 680]],
      ["Mala-D", "Levonorgestrel + Ethinyl Estradiol", "daily oral contraceptive", ["Tablet"], ["21 tablets", "28 tablets"], true, [55, 190]],
      ["Unwanted-72", "Levonorgestrel 1.5 mg", "emergency contraception within 72 hours", ["Tablet"], ["1 tablet"], false, [85, 165]],
      ["i-Pill", "Levonorgestrel 1.5 mg", "emergency contraceptive pill", ["Tablet"], ["1 tablet"], false, [95, 180]],
      ["Saheli", "Ormeloxifene 30 mg", "non-steroidal weekly contraceptive", ["Tablet"], ["4 tablets", "8 tablets"], true, [85, 220]],
      ["Multiload Cu 375", "Copper T intrauterine device", "long term reversible contraception", ["Device"], ["Single sterile pack"], true, [380, 950]],
      ["Prega News", "hCG pregnancy test kit", "one minute early pregnancy detection", ["TestKit"], ["1 test", "3 tests"], false, [45, 165]],
      ["I-Can Pregnancy Test", "hCG urine strip", "accurate home pregnancy check", ["TestKit"], ["1 test", "2 tests"], false, [45, 150]],
      ["Clearblue Digital", "Digital pregnancy test with weeks indicator", "99% accurate digital result", ["TestKit"], ["1 test"], false, [420, 980]],
      ["Suhagra 100", "Sildenafil Citrate 100 mg", "erectile dysfunction treatment", ["Tablet"], ["50 mg", "100 mg"], true, [110, 320]],
      ["Manforce 100", "Sildenafil Citrate 100 mg", "prescription ED therapy", ["Tablet"], ["50 mg", "100 mg"], true, [95, 290]],
      ["Tazzle 20", "Tadalafil 20 mg", "long acting ED treatment", ["Tablet"], ["10 mg", "20 mg"], true, [145, 420]],
      ["Confido", "Herbal sexual wellness formula", "ayurvedic support for male wellness", ["Tablet"], ["60 tablets", "100 tablets"], false, [105, 260]],
      ["Tentex Forte", "Herbal male vitality capsules", "stamina and vitality support", ["Capsule"], ["60 capsules", "100 capsules"], false, [145, 340]],
      ["Dabur Shilajit Gold", "Shilajit with Swarna Bhasma", "strength and endurance support", ["Capsule"], ["20 capsules", "50 capsules"], false, [245, 720]],
      ["Oosure", "Myo-inositol + D-chiro inositol", "PCOS and female fertility support", ["Sachet", "Tablet"], ["10 sachets", "30 tablets"], false, [380, 920]],
      ["Menosan", "Herbal menopause support", "hot flashes and hormonal balance", ["Tablet"], ["60 tablets", "120 tablets"], false, [195, 480]],
      ["Replens Vaginal Moisturiser", "Polycarbophil based gel", "long lasting intimate hydration", ["Gel"], ["35 gm", "6 applicators"], false, [520, 1150]],
      ["Lactacyd Intimate Wash", "Lactic acid intimate hygiene wash", "pH balanced intimate care", ["Solution", "Soap"], ["60 ml", "200 ml"], false, [145, 420]],
    ],
  },
  {
    slug: "skin-hair",
    name: "Skin & Hair Care",
    tagline: "Dermatology, wound care and sun protection",
    description:
      "Medicated creams, acne treatment, antifungal dusting powders, sunscreens, moisturisers and hair-fall solutions.",
    icon: "sparkle",
    accent: "from-pink-500 to-rose-500",
    items: [
      ["Betadine Ointment", "Povidone Iodine 5% w/w", "wound and burn antisepsis", ["Ointment", "Solution"], ["5% 15 gm", "10% gargle"], false, [75, 260]],
      ["Neosporin", "Neomycin + Bacitracin + Polymyxin B", "infected cuts and wounds", ["Ointment", "Powder"], ["10 gm", "5 gm"], false, [55, 165]],
      ["Soframycin", "Framycetin Sulphate 1% w/w", "skin infection and dressing", ["Cream", "Ointment"], ["30 gm", "100 gm"], false, [65, 220]],
      ["Burnol", "Aminacridine + Picric Acid", "minor burn first aid", ["Cream"], ["15 gm", "30 gm"], false, [45, 130]],
      ["Cetaphil Gentle Cleanser", "Mild non-soap cleanser", "sensitive and acne prone skin", ["Soap", "Solution"], ["125 ml", "250 ml", "500 ml"], false, [215, 950]],
      ["Moisturex", "Urea + Lactic acid cream", "rough, dry and scaly skin", ["Cream"], ["50 gm", "100 gm"], false, [165, 420]],
      ["Venusia Max", "Intensive moisturising lotion", "very dry and eczema prone skin", ["Cream", "Solution"], ["100 gm", "250 gm lotion"], false, [285, 720]],
      ["Tenovate", "Clobetasol Propionate 0.05% w/w", "severe inflammatory skin condition", ["Cream", "Ointment"], ["0.05% 25 gm", "0.05% lotion"], true, [75, 210]],
      ["Momate", "Mometasone Furoate 0.1% w/w", "psoriasis and eczema", ["Cream", "Ointment"], ["0.1% 10 gm", "0.1% lotion"], true, [95, 250]],
      ["Melacare", "Hydroquinone + Tretinoin + Mometasone", "pigmentation and melasma", ["Cream"], ["15 gm", "30 gm"], true, [105, 280]],
      ["Deriva MS", "Adapalene 0.1% w/w", "acne and comedone treatment", ["Gel", "Cream"], ["0.1% 15 gm", "0.1% 30 gm"], true, [145, 380]],
      ["Persol AC", "Benzoyl Peroxide 2.5% w/w", "bacterial acne treatment", ["Gel", "Cream"], ["2.5% 20 gm", "5% 20 gm"], true, [95, 240]],
      ["Clindac A", "Clindamycin 1% w/w gel", "inflammatory acne", ["Gel", "Solution"], ["1% 15 gm", "1% lotion"], true, [115, 290]],
      ["Retino-A", "Tretinoin 0.025% w/w", "acne and photo-ageing", ["Cream"], ["0.025% 20 gm", "0.05% 20 gm"], true, [145, 350]],
      ["Scalpe Plus", "Ketoconazole 2% + Zinc Pyrithione", "dandruff and scalp fungus", ["Soap", "Solution"], ["75 ml shampoo", "50 gm soap"], false, [195, 520]],
      ["Mintop 5", "Minoxidil 5% solution", "hereditary hair regrowth", ["Solution", "Spray"], ["2% 60 ml", "5% 60 ml", "10% 60 ml"], true, [395, 1150]],
      ["Tugain Foam", "Minoxidil 5% foam", "alopecia treatment", ["Solution"], ["5% 60 gm", "10% 60 gm"], true, [520, 1350]],
      ["UV Doux", "Broad spectrum SPF 50 sunscreen", "gel based sun protection", ["Cream", "Gel"], ["50 gm", "80 gm"], false, [425, 980]],
      ["La Shield SPF 50", "Sunscreen gel for oily skin", "UVA and UVB protection", ["Gel"], ["50 gm"], false, [495, 1050]],
      ["Aqualogica Radiance", "Dewy sunscreen SPF 50", "lightweight daily sunscreen", ["Cream"], ["50 gm"], false, [395, 850]],
      ["Abzorb Dusting Powder", "Clotrimazole + Talc", "sweat rash and fungal infection", ["Powder"], ["100 gm", "150 gm"], false, [95, 240]],
      ["Dermicool Prickly Heat", "Cooling talcum powder", "summer heat rash relief", ["Powder"], ["100 gm", "300 gm", "400 gm"], false, [95, 320]],
      ["Desitin Diaper Rash", "Zinc Oxide 13% w/w", "baby diaper rash care", ["Cream"], ["56 gm", "113 gm"], false, [285, 680]],
      ["Parachute Coconut Oil", "100% pure coconut oil", "hair and skin nourishment", ["Solution"], ["100 ml", "250 ml", "500 ml"], false, [45, 260]],
    ],
  },
  {
    slug: "baby-mother",
    name: "Baby & Mother Care",
    tagline: "Nutrition and care for growing families",
    description:
      "Infant formula, weaning cereals, baby hygiene, feeding essentials, diapers and pregnancy nutrition.",
    icon: "baby",
    accent: "from-cyan-500 to-blue-500",
    items: [
      ["Cerelac", "Wheat apple infant cereal", "weaning nutrition from 6 months", ["Powder"], ["300 gm", "1.2 kg"], false, [245, 890]],
      ["Lactogen 1", "Infant formula milk powder", "stage 1 infant nutrition", ["Powder"], ["200 gm", "400 gm", "1 kg"], false, [245, 1250]],
      ["NAN Pro 2", "Follow up formula", "stage 2 infant nutrition", ["Powder"], ["400 gm", "1 kg"], false, [625, 1980]],
      ["Farex", "Rice and vegetable baby cereal", "first solid food for babies", ["Powder"], ["300 gm", "500 gm"], false, [145, 420]],
      ["Himalaya Baby Shampoo", "Gentle baby cleanser", "tear-free hair wash", ["Soap", "Solution"], ["200 ml", "400 ml", "700 ml"], false, [145, 460]],
      ["Johnson's Baby Soap", "Mild baby cleansing bar", "daily baby bath", ["Soap"], ["75 gm", "pack of 4"], false, [35, 180]],
      ["Sebamed Baby Lotion", "pH 5.5 moisturising lotion", "newborn skin hydration", ["Cream", "Solution"], ["200 ml", "400 ml"], false, [395, 980]],
      ["Mamaearth Baby Oil", "Almond and jojoba baby oil", "massage and moisturising", ["Solution"], ["200 ml", "400 ml"], false, [245, 620]],
      ["Woodwards Gripe Water", "Herbal colic relief", "infant gas and colic", ["Solution"], ["100 ml", "200 ml"], false, [55, 165]],
      ["Colicaid Drops", "Simethicone + Dill oil", "infant colic drops", ["Drops"], ["15 ml", "30 ml"], true, [95, 240]],
      ["Pampers Premium Care", "Ultra soft baby diapers", "up to 12 hour dryness", ["Wipe", "Device"], ["Pack of 30", "Pack of 66", "Jumbo pack"], false, [425, 1650]],
      ["Huggies Wonder Pants", "Stretchable diaper pants", "comfortable overnight dryness", ["Wipe"], ["Pack of 34", "Pack of 68"], false, [495, 1750]],
      ["Chicco Baby Wipes", "Aloe vera wet wipes", "gentle cleansing on the go", ["Wipe"], ["72 wipes", "pack of 3"], false, [195, 580]],
      ["Pigeon Feeding Bottle", "Anti-colic PP bottle", "breast-like feeding experience", ["Device"], ["160 ml", "240 ml"], false, [395, 1150]],
      ["Medela Breast Pump", "Manual breast milk pump", "comfortable milk expression", ["Device"], ["Harmony manual"], false, [2450, 5200]],
      ["Lansinoh Nipple Cream", "Lanolin soothing cream", "breastfeeding comfort", ["Cream"], ["10 gm", "40 gm"], false, [285, 780]],
      ["OBIMin", "Pregnancy multivitamin", "antenatal nutrition support", ["Tablet", "Capsule"], ["30 tablets", "60 tablets"], true, [135, 380]],
      ["Protinex Mama", "Protein for pregnant mothers", "mother and foetal nutrition", ["Powder"], ["250 gm", "500 gm"], false, [395, 980]],
      ["Fol 12 Plus", "Calcium, D3 and B12 for pregnancy", "bone health in pregnancy", ["Tablet"], ["30 tablets", "60 tablets"], false, [125, 340]],
      ["Baby Orajel Teething Gel", "Chamomile teething gel", "soothes sore gums", ["Gel"], ["15 gm", "30 gm"], false, [215, 480]],
    ],
  },
  {
    slug: "ayurveda",
    name: "Ayurveda & Homeopathy",
    tagline: "Classical and herbal remedies",
    description:
      "Trusted ayurvedic formulations, herbal juices, classical churnas and homeopathic dilutions for holistic wellness.",
    icon: "leaf",
    accent: "from-emerald-500 to-green-600",
    items: [
      ["Dabur Chyawanprash", "Amla and 41 herbs", "daily immunity tonic", ["Powder"], ["500 gm", "1 kg"], false, [185, 520]],
      ["Dabur Shilajit", "Shuddha Shilajit resin", "strength and stamina", ["Capsule", "Powder"], ["20 capsules", "15 gm resin"], false, [225, 680]],
      ["Himalaya Ashwagandha", "Withania somnifera extract", "stress and sleep support", ["Tablet", "Capsule"], ["60 tablets", "120 tablets"], false, [165, 460]],
      ["Patanjali Divya Triphala", "Amla, Haritaki, Baheda churna", "digestion and detox", ["Powder", "Capsule"], ["100 gm", "200 gm"], false, [55, 180]],
      ["Organic India Tulsi Drops", "Holy basil concentrate", "respiratory immunity", ["Drops"], ["30 ml", "60 ml"], false, [215, 520]],
      ["Patanjali Giloy Juice", "Tinospora cordifolia", "immunity and fever support", ["Solution"], ["500 ml", "1 litre"], false, [145, 320]],
      ["Baidyanath Amla Juice", "Emblica officinalis", "hair, skin and digestion", ["Solution"], ["500 ml", "1 litre"], false, [125, 320]],
      ["Zandu Kesari Jeevan", "Herbal health tonic", "energy and vitality", ["Powder"], ["200 gm", "500 gm"], false, [145, 420]],
      ["Dabur Madhunashini", "Herbal anti-diabetic juice", "sugar level support", ["Solution"], ["500 ml", "1 litre"], false, [185, 460]],
      ["Himalaya Neem Capsules", "Azadirachta indica", "blood purification and acne", ["Capsule"], ["60 capsules", "120 capsules"], false, [135, 320]],
      ["Baidyanath Brahmi", "Bacopa monnieri tablets", "memory and focus support", ["Tablet"], ["60 tablets", "120 tablets"], false, [95, 240]],
      ["Dabur Arjun", "Terminalia arjuna", "cardiac strength support", ["Tablet", "Powder"], ["60 tablets", "100 gm"], false, [105, 280]],
      ["SBL Arnica 30CH", "Arnica montana dilution", "injury and bruise relief", ["Solution", "Drops"], ["30 ml dilution", "30CH globules"], false, [85, 240]],
      ["Dr. Reckeweg R89", "Homeopathic lipocol", "weight management drops", ["Drops"], ["30 ml"], false, [215, 480]],
      ["Allen's A1 Lipotrophin", "Homeopathic weight drops", "fat metabolism support", ["Drops"], ["30 ml"], false, [165, 380]],
      ["SBL Rhus Toxicodendron 200CH", "Homeopathic dilution", "joint pain and stiffness", ["Solution"], ["30 ml"], false, [95, 240]],
      ["Patanjali Divya Peya", "Herbal tea", "digestive wellness tea", ["Sachet"], ["25 tea bags", "100 gm"], false, [85, 240]],
      ["Dabur Honey", "100% pure honey", "natural sweetener and tonic", ["Solution"], ["250 gm", "500 gm", "1 kg"], false, [145, 520]],
      ["Hajmola", "Digestive tablets", "after meal digestion", ["Tablet"], ["100 tablets", "pack of 6"], false, [20, 90]],
      ["Isabgol Sat-Isabgol", "Psyllium husk", "regular bowel movement", ["Powder"], ["100 gm", "400 gm"], false, [105, 320]],
    ],
  },
  {
    slug: "devices",
    name: "Devices & Equipment",
    tagline: "Clinic-grade home monitoring",
    description:
      "BP monitors, glucometers, oximeters, nebulisers, thermometers, orthopaedic supports and first aid essentials.",
    icon: "stethoscope",
    accent: "from-slate-500 to-gray-700",
    items: [
      ["Omron HEM-7156", "Fully automatic BP monitor", "irregular heartbeat detection", ["Device"], ["Upper arm"], false, [2450, 4200]],
      ["Dr. Morepen BP-09", "Digital BP monitor", "home blood pressure check", ["Device"], ["Upper arm"], false, [1450, 2600]],
      ["Accu-Chek Active", "Glucometer with 10 strips", "fast blood glucose reading", ["Device", "TestKit"], ["Meter kit", "50 strips", "100 strips"], false, [895, 2250]],
      ["Accu-Chek Instant", "Smart glucometer kit", "app connected glucose tracking", ["Device", "TestKit"], ["Meter kit", "50 strips"], false, [1150, 2650]],
      ["OneTouch Select Plus", "Blood glucose monitoring kit", "simple 3 step testing", ["Device", "TestKit"], ["Meter kit", "50 strips"], false, [995, 2400]],
      ["Omron NE-C101", "Compressor nebuliser", "asthma and cough therapy", ["Device"], ["Adult and child mask"], false, [1950, 3600]],
      ["Dr. Morepen Pulse Oximeter", "Fingertip SpO2 and heart rate monitor", "oxygen saturation check", ["Device"], ["Fingertip OLED"], false, [795, 1900]],
      ["Dr. Morepen Thermometer", "Digital fever thermometer", "instant temperature reading", ["Device"], ["MT-101", "MT-202"], false, [95, 320]],
      ["Infrared Thermometer", "Non-contact digital thermometer", "hygienic temperature screening", ["Device"], ["Forehead model"], false, [1250, 2900]],
      ["Vissco Knee Cap", "Compression knee support", "ligament support and pain relief", ["Device"], ["Size M", "Size L", "Pair"], false, [395, 950]],
      ["Vissco Lumbar Belt", "Back support belt", "posture and lumbar support", ["Device"], ["Size M", "Size L", "Size XL"], false, [695, 1550]],
      ["Healthgenie Weighing Scale", "Digital body weight scale", "accurate home weight tracking", ["Device"], ["Glass top 180 kg"], false, [695, 1650]],
      ["N95 Mask", "5 layer protective respirator", "airborne particle protection", ["Device"], ["Pack of 5", "Pack of 20"], false, [195, 900]],
      ["Surgical Face Mask", "3 layer disposable mask", "daily hygiene protection", ["Device"], ["Box of 50", "Box of 100"], false, [145, 620]],
      ["BD Micro-Finer Syringe", "Insulin syringe 40 IU", "accurate insulin dosing", ["Device"], ["Pack of 10", "Pack of 50"], false, [95, 520]],
      ["Disposable Cotton", "Absorbent surgical cotton", "wound cleaning and dressing", ["Device"], ["100 gm", "500 gm"], false, [45, 240]],
      ["Crepe Bandage", "Elastic compression bandage", "sprain and swelling support", ["Device"], ["7.5 cm", "10 cm"], false, [85, 260]],
      ["First Aid Box", "Complete emergency kit", "home and travel first aid", ["Device"], ["32 pieces", "56 pieces"], false, [395, 1250]],
      ["Hot Water Bag", "Pain relief hot pack", "cramp and stiffness therapy", ["Device"], ["2 litre", "Foldable"], false, [195, 520]],
      ["Nasal Aspirator", "Baby nose cleaner", "infant congestion relief", ["Device"], ["Manual", "Electric"], false, [145, 890]],
      ["Glucometer Lancets", "Sterile disposable lancets", "painless blood sample", ["Device"], ["Box of 50", "Box of 200"], false, [145, 520]],
    ],
  },
  {
    slug: "personal-care",
    name: "Personal Care & Hygiene",
    tagline: "Everyday wellness essentials",
    description:
      "Oral care, bathing soaps, hair care, feminine hygiene, sanitizers and grooming products from trusted brands.",
    icon: "bottle",
    accent: "from-violet-500 to-fuchsia-500",
    items: [
      ["Colgate Strong Teeth", "Calcium enriched toothpaste", "daily cavity protection", ["Soap"], ["100 gm", "200 gm", "pack of 3"], false, [45, 220]],
      ["Sensodyne Repair & Protect", "Stannous fluoride toothpaste", "sensitive teeth relief", ["Soap"], ["70 gm", "100 gm"], false, [165, 380]],
      ["Thermoseal RA", "Potassium nitrate toothpaste", "dental sensitivity care", ["Soap"], ["80 gm", "150 gm"], false, [125, 320]],
      ["Listerine Mouthwash", "Essential oil mouth rinse", "germ protection for 12 hours", ["Solution"], ["250 ml", "500 ml"], false, [145, 380]],
      ["Hexidine Mouthwash", "Chlorhexidine 0.2% w/v", "gum infection and post dental care", ["Solution"], ["100 ml", "250 ml"], true, [95, 260]],
      ["Colgate 360 Toothbrush", "Charcoal bristle brush", "complete oral cleaning", ["Device"], ["Pack of 2", "Pack of 4"], false, [75, 260]],
      ["Oral-B Tongue Cleaner", "Stainless tongue scraper", "fresh breath daily", ["Device"], ["Single", "Pack of 2"], false, [35, 120]],
      ["Dettol Original Handwash", "Germ protection liquid handwash", "99.9% germ removal", ["Solution", "Soap"], ["200 ml", "refill 750 ml"], false, [85, 320]],
      ["Lifebuoy Soap", "Germ protection bathing bar", "daily hygiene", ["Soap"], ["pack of 4", "pack of 6"], false, [95, 320]],
      ["Medimix Ayurvedic", "18 herb bathing soap", "skin infection protection", ["Soap"], ["75 gm", "125 gm", "pack of 6"], false, [35, 260]],
      ["Dove Cream Beauty Bar", "Moisturising cleanser", "soft nourished skin", ["Soap"], ["100 gm", "pack of 3"], false, [85, 320]],
      ["Head & Shoulders", "Anti-dandruff shampoo", "dandruff free scalp", ["Solution"], ["180 ml", "340 ml", "650 ml"], false, [145, 520]],
      ["Clinic Plus Shampoo", "Milk protein shampoo", "stronger healthier hair", ["Solution"], ["175 ml", "650 ml", "1 litre"], false, [85, 380]],
      ["Tresemme Keratin Smooth", "Sulphate free shampoo", "frizz control and shine", ["Solution"], ["185 ml", "580 ml"], false, [195, 620]],
      ["Garnier Color Naturals", "Ammonia free hair colour", "natural looking coverage", ["Solution", "Powder"], ["Black", "Dark brown", "Burgundy"], false, [135, 380]],
      ["Gillette Guard Razor", "Single blade safety razor", "smooth comfortable shave", ["Device"], ["Pack of 2", "Pack of 6"], false, [55, 280]],
      ["Nivea Body Lotion", "Deep moisture lotion", "48 hour hydration", ["Solution", "Cream"], ["200 ml", "400 ml", "600 ml"], false, [195, 520]],
      ["Vaseline Petroleum Jelly", "Pure skin protecting jelly", "dry skin and lip care", ["Gel"], ["50 ml", "100 ml", "250 ml"], false, [45, 220]],
      ["BoroPlus Antiseptic Cream", "Herbal antiseptic", "multi-purpose skin care", ["Cream"], ["20 ml", "40 ml", "120 ml"], false, [35, 180]],
      ["Whisper Ultra Clean", "Sanitary pads with wings", "overnight period protection", ["Wipe"], ["Pack of 15", "Pack of 30", "Pack of 50"], false, [95, 420]],
      ["Sofy Bodyfit", "Ultra thin sanitary pad", "leak-proof comfort", ["Wipe"], ["Pack of 10", "Pack of 28"], false, [85, 340]],
      ["Sirona Menstrual Cup", "Medical grade silicone cup", "reusable period care", ["Device"], ["Size S", "Size M", "Size L"], false, [595, 1450]],
      ["Himalaya Neem Face Wash", "Herbal purifying facewash", "pimple and oil control", ["Soap", "Solution"], ["50 ml", "100 ml", "150 ml"], false, [55, 240]],
      ["Dabur Lal Tail", "Baby massage oil", "bone strength and growth", ["Solution"], ["50 ml", "200 ml"], false, [95, 320]],
    ],
  },
  {
    slug: "eye-ear-dental",
    name: "Eye, Ear & Dental",
    tagline: "Specialist care for sense organs",
    description:
      "Lubricating and antibiotic eye drops, ear wax removers, dental gels and oral care treatments.",
    icon: "eye",
    accent: "from-blue-500 to-indigo-600",
    items: [
      ["Refresh Tears", "Carboxymethylcellulose 0.5%", "dry eye lubrication", ["Drops"], ["10 ml", "30 x 0.35 ml unit dose"], false, [145, 420]],
      ["Liquifilm Tears", "Polyvinyl Alcohol 1.4%", "artificial tear drops", ["Drops"], ["15 ml"], false, [95, 260]],
      ["Genteal Gel Drops", "Hypromellose lubricant", "long lasting dry eye relief", ["Drops", "Gel"], ["10 ml", "Gel 3 x 5 gm"], false, [195, 480]],
      ["Moxikind-CM", "Moxifloxacin 0.5% eye drops", "bacterial eye infection", ["Drops"], ["5 ml"], true, [85, 220]],
      ["Ciplox Eye Ointment", "Ciprofloxacin 0.3%", "conjunctivitis treatment", ["Ointment", "Drops"], ["3.5 gm", "10 ml drops"], true, [55, 160]],
      ["Olopatadine Eye Drops", "Olopatadine 0.1%", "allergic eye itching", ["Drops"], ["5 ml"], true, [145, 380]],
      ["Naphcon-A", "Naphazoline + Pheniramine", "red itchy eye relief", ["Drops"], ["10 ml", "15 ml"], false, [105, 280]],
      ["Timoptic-XE", "Timolol 0.5% gel forming", "glaucoma pressure control", ["Drops"], ["2.5 ml", "5 ml"], true, [245, 580]],
      ["Xalatan", "Latanoprost 0.005%", "ocular hypertension", ["Drops"], ["2.5 ml"], true, [520, 1150]],
      ["Soliwax", "Docusate sodium ear drops", "ear wax softening", ["Drops"], ["10 ml", "20 ml"], false, [115, 290]],
      ["Otocin", "Chloramphenicol + Beclomethasone", "ear infection and inflammation", ["Drops"], ["7 ml"], true, [75, 190]],
      ["Candiderma Ear Drops", "Clotrimazole + Lignocaine", "fungal ear infection", ["Drops"], ["10 ml"], true, [95, 240]],
      ["Dentogel", "Choline Salicylate + Lignocaine", "toothache and mouth ulcer", ["Gel"], ["10 gm", "15 gm"], true, [75, 190]],
      ["Borocaine Plus", "Benzydamine lozenges", "throat and gum pain", ["Lozenge"], ["Orange", "Lemon"], false, [45, 140]],
      ["Hexigel", "Chlorhexidine 0.2% dental gel", "gingivitis and oral hygiene", ["Gel"], ["15 gm", "30 gm"], false, [95, 240]],
      ["Teebudent", "Lignocaine teething gel", "infant teething pain", ["Gel"], ["10 gm"], true, [65, 160]],
      ["Fitty Denture Cleanser", "Effervescent denture tablets", "denture stain removal", ["Tablet"], ["32 tablets", "64 tablets"], false, [185, 460]],
      ["Orasept Mouthwash", "Phenol based oral rinse", "sore throat and gum infection", ["Solution"], ["177 ml"], false, [145, 340]],
      ["Eye Lubricant Ointment", "Paraffin based ophthalmic ointment", "night time eye dryness", ["Ointment"], ["3.5 gm", "5 gm"], false, [85, 210]],
      ["Dental Floss", "Waxed fluoride floss", "interdental plaque removal", ["Device"], ["50 m", "pack of 3"], false, [75, 260]],
    ],
  },
];

const FORMS_FOR_ITEM = (forms) => {
  const out = [];
  for (const f of formsOf(forms)) {
    if (f === "Soap" && formsOf(forms).includes("Solution")) continue;
    out.push(f);
  }
  return out;
};

function slugify(str) {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 90);
}

/* ------------------------------ build rows ------------------------------ */
const MAX_PER_ITEM = 46;
const rows = [];
const usedSlugs = new Set();
const catRows = [];

for (const cat of CATALOG) {
  catRows.push({
    slug: cat.slug,
    name: cat.name,
    tagline: cat.tagline,
    description: cat.description,
    icon: cat.icon,
    accent: cat.accent,
    ageRestricted: !!cat.ageRestricted,
    sort: catRows.length,
  });

  for (const item of cat.items) {
    const [baseName, composition, uses, forms, strengths, rx, priceRange] = item;
    const brandPool = cat.slug === "sexual-wellness" || cat.slug === "devices"
      ? ["Cipla", "Mankind", "Zydus", "Abbott", "Himalaya", "Dabur", "Sun Pharma", "Torrent", "Glenmark", "USV", "Intas", "Alkem", "Dr. Reddy's", "Systopic", "Ajanta"]
      : BRANDS;
    const chosenBrands = pickN(brandPool, intBetween(5, 7));
    const combos = [];
    for (const brand of chosenBrands) {
      for (const form of formsOf(forms)) {
        const packs = PACKS[form] || PACKS.Tablet;
        for (const strength of strengths) {
          for (const pack of pickN(packs, Math.min(3, packs.length))) {
            combos.push({ brand, form, strength, pack });
          }
        }
      }
    }
    const shuffled = pickN(combos, Math.min(MAX_PER_ITEM, combos.length));

    for (const combo of shuffled) {
      const fullName = `${combo.brand} ${baseName}${combo.strength && !combo.strength.includes("/") ? ` ${combo.strength}` : ""}`.replace(/\s+/g, " ").trim();
      const packLabel = `${combo.form === "Condom" || combo.form === "Device" || combo.form === "TestKit" || combo.form === "Wipe" ? "" : ""}${combo.pack.l}`;
      let slug = slugify(`${fullName} ${packLabel}`);
      let guard = 2;
      while (usedSlugs.has(slug)) slug = `${slugify(`${fullName} ${packLabel}`)}-${guard++}`;
      usedSlugs.add(slug);

      const base = between(priceRange[0], priceRange[1]);
      const mrp = Math.max(9, Math.round(base * combo.pack.m * (0.95 + rnd() * 0.25)));
      const discountPct = combo.form === "Device" ? intBetween(4, 14) : intBetween(8, 32);
      const price = Math.max(5, Math.round(mrp * (1 - discountPct / 100)));
      const stockRoll = rnd();
      const stock = stockRoll < 0.05 ? 0 : stockRoll < 0.15 ? intBetween(1, 12) : intBetween(15, 420);

      rows.push({
        name: `${fullName} ${combo.form === "Device" || combo.form === "TestKit" || combo.form === "Condom" || combo.form === "Wipe" || combo.form === "Soap" ? "" : combo.form.toLowerCase()}`.replace(/\s+/g, " ").trim(),
        slug,
        brand: combo.brand,
        manufacturer: combo.brand,
        categorySlug: cat.slug,
        description:
          `${fullName} (${packLabel}) by ${combo.brand} contains ${composition}. It is commonly used for ${uses}. ` +
          `Store below 30°C in a cool, dry place away from direct sunlight and keep out of reach of children. ` +
          (rx
            ? "This is a prescription (Schedule H) medicine and will be dispensed only against a valid prescription uploaded at checkout."
            : "This is an over-the-counter product that can be purchased without a prescription."),
        composition,
        uses: uses.charAt(0).toUpperCase() + uses.slice(1),
        form: combo.form,
        packSize: packLabel,
        strength: combo.strength,
        mrp,
        price,
        discountPct,
        stock,
        requiresPrescription: !!rx,
        rating: Number(between(3.6, 5).toFixed(2)),
        reviewCount: intBetween(4, 2480),
        isFeatured: rnd() < 0.05,
        isBestseller: rnd() < 0.09,
        ageRestricted: !!cat.ageRestricted,
      });
    }
  }
}

/* ------------------------------ insert rows ------------------------------ */
async function insertChunked(table, columns, data) {
  const CHUNK = 400;
  for (let i = 0; i < data.length; i += CHUNK) {
    const slice = data.slice(i, i + CHUNK);
    const values = [];
    const params = [];
    let p = 1;
    for (const row of slice) {
      values.push(`(${columns.map((c) => `$${p++}`).join(",")})`);
      for (const c of columns) params.push(row[c] ?? null);
    }
    await pool.query(
      `INSERT INTO ${table} (${columns.map((c) => `"${c}"`).join(",")}) VALUES ${values.join(",")}`,
      params,
    );
    process.stdout.write(`\r  inserted ${Math.min(i + CHUNK, data.length)}/${data.length} ${table}`);
  }
  process.stdout.write("\n");
}

const catIdBySlug = new Map();
await (async () => {
  console.log("Agarwal Ji Medical Store — seeding catalogue");
  await pool.query(
    "TRUNCATE TABLE order_items, orders, prescription_requests, messages, products, categories RESTART IDENTITY CASCADE",
  );
  await insertChunked(
    "categories",
    ["slug", "name", "tagline", "description", "icon", "accent", "age_restricted", "sort"],
    catRows.map((c) => ({ ...c, age_restricted: c.ageRestricted })),
  );
  const res = await pool.query("SELECT id, slug FROM categories");
  for (const r of res.rows) catIdBySlug.set(r.slug, r.id);

  const productRows = rows.map((r) => ({
    name: r.name,
    slug: r.slug,
    brand: r.brand,
    manufacturer: r.manufacturer,
    category_id: catIdBySlug.get(r.categorySlug),
    description: r.description,
    composition: r.composition,
    uses: r.uses,
    form: r.form,
    pack_size: r.packSize,
    strength: r.strength,
    mrp: r.mrp,
    price: r.price,
    discount_pct: r.discountPct,
    stock: r.stock,
    requires_prescription: r.requiresPrescription,
    rating: r.rating,
    review_count: r.reviewCount,
    is_featured: r.isFeatured,
    is_bestseller: r.isBestseller,
    age_restricted: r.ageRestricted,
  }));
  await insertChunked(
    "products",
    [
      "name", "slug", "brand", "manufacturer", "category_id", "description", "composition", "uses",
      "form", "pack_size", "strength", "mrp", "price", "discount_pct", "stock",
      "requires_prescription", "rating", "review_count", "is_featured", "is_bestseller", "age_restricted",
    ],
    productRows,
  );

  const countRes = await pool.query("SELECT count(*)::int AS n FROM products");
  const catRes = await pool.query("SELECT count(*)::int AS n FROM categories");
  console.log(`Done: ${catRes.rows[0].n} categories, ${countRes.rows[0].n} products`);
  await pool.end();
})().catch(async (err) => {
  console.error(err);
  await pool.end();
  process.exit(1);
});
