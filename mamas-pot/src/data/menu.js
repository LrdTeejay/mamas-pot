// All menu data lives here. Change prices or add dishes without touching any component.

// ---------- Reusable option groups ----------
export const PORTION = {
  id: 'portion', label: 'Portion size', type: 'single', required: true,
  choices: [
    { name: 'Regular', price: 0 },
    { name: 'Large', price: 1500 },
  ],
};

export const PROTEIN = {
  id: 'protein', label: 'Choose your protein', type: 'single', required: true,
  choices: [
    { name: 'Fried chicken', price: 2500 },
    { name: 'Beef', price: 1500 },
    { name: 'Turkey', price: 3500 },
    { name: 'Fried fish', price: 2500 },
    { name: 'Goat meat', price: 3000 },
    { name: 'No protein', price: 0 },
  ],
};

export const SWALLOW = {
  id: 'swallow', label: 'Choose your swallow', type: 'single', required: true,
  choices: [
    { name: 'Pounded yam', price: 500 },
    { name: 'Eba', price: 0 },
    { name: 'Amala', price: 0 },
    { name: 'Semovita', price: 0 },
    { name: 'Wheat', price: 300 },
  ],
};

export const SOUP_PROTEIN = {
  id: 'soup-protein', label: 'Add to your soup', type: 'multi', required: false,
  choices: [
    { name: 'Assorted meat', price: 2000 },
    { name: 'Stockfish', price: 2500 },
    { name: 'Dry fish', price: 1500 },
    { name: 'Ponmo', price: 600 },
  ],
};

export const EXTRAS = {
  id: 'extras', label: 'Extras', type: 'multi', required: false,
  choices: [
    { name: 'Dodo (fried plantain)', price: 800 },
    { name: 'Moi moi', price: 1200 },
    { name: 'Coleslaw', price: 500 },
    { name: 'Boiled egg', price: 400 },
  ],
};

export const SPICE = {
  id: 'spice', label: 'Spice level', type: 'single', required: true,
  choices: [
    { name: 'Mild', price: 0 },
    { name: 'Medium', price: 0 },
    { name: 'Hot 🌶️', price: 0 },
  ],
};

export const PACK = {
  id: 'pack', label: 'Pack size', type: 'single', required: true,
  choices: [
    { name: 'Small pack', price: 0 },
    { name: 'Party pack', price: 2500 },
  ],
};

export const DRINK_SIZE = {
  id: 'size', label: 'Size', type: 'single', required: true,
  choices: [
    { name: '35cl', price: 0 },
    { name: '50cl', price: 400 },
    { name: '1 litre', price: 1200 },
  ],
};

export const TEMPERATURE = {
  id: 'temp', label: 'Serve it', type: 'single', required: true,
  choices: [
    { name: 'Chilled', price: 0 },
    { name: 'Room temperature', price: 0 },
  ],
};

// ---------- Menu ----------
export const CATEGORIES = ['All', 'Foods', 'Snacks', 'Drinks'];

export const MENU = [
  // ===== FOODS =====
  { id: 'jollof', category: 'Foods', name: 'Party Jollof Rice', emoji: '🍛', price: 3500, rating: 4.9,
    desc: 'Smoky firewood-style jollof cooked in rich tomato and pepper sauce.',
    tags: ['Popular', 'Spicy'], options: [PORTION, PROTEIN, EXTRAS, SPICE] },
  { id: 'fried-rice', category: 'Foods', name: 'Nigerian Fried Rice', emoji: '🍚', price: 3500, rating: 4.7,
    desc: 'Colourful fried rice with liver, prawns, carrots, green beans and sweetcorn.',
    tags: ['Popular'], options: [PORTION, PROTEIN, EXTRAS] },
  { id: 'ofada', category: 'Foods', name: 'Ofada Rice & Ayamase', emoji: '🥘', price: 4500, rating: 4.8,
    desc: 'Local ofada rice with green pepper ayamase stew, egg and assorted meat.',
    tags: ['Spicy'], options: [PORTION, PROTEIN, SPICE] },
  { id: 'egusi', category: 'Foods', name: 'Egusi Soup', emoji: '🍲', price: 4000, rating: 4.9,
    desc: 'Ground melon seed soup with leafy vegetables, cooked in palm oil.',
    tags: ['Popular'], options: [SWALLOW, PROTEIN, SOUP_PROTEIN] },
  { id: 'efo-riro', category: 'Foods', name: 'Efo Riro', emoji: '🥬', price: 4000, rating: 4.6,
    desc: 'Yoruba spinach stew with locust beans (iru) and peppers.',
    tags: [], options: [SWALLOW, PROTEIN, SOUP_PROTEIN] },
  { id: 'afang', category: 'Foods', name: 'Afang Soup', emoji: '🍵', price: 4500, rating: 4.7,
    desc: 'Calabar classic with afang and waterleaf, periwinkle and crayfish.',
    tags: [], options: [SWALLOW, PROTEIN, SOUP_PROTEIN] },
  { id: 'ogbono', category: 'Foods', name: 'Ogbono Soup', emoji: '🥣', price: 3800, rating: 4.5,
    desc: 'Draw soup made from wild mango seeds, smooth and hearty.',
    tags: [], options: [SWALLOW, PROTEIN, SOUP_PROTEIN] },
  { id: 'banga', category: 'Foods', name: 'Banga Soup & Starch', emoji: '🫕', price: 4800, rating: 4.6,
    desc: 'Delta-style palm nut soup with fresh fish and beletete spice.',
    tags: ['Spicy'], options: [PROTEIN, SOUP_PROTEIN, SPICE] },
  { id: 'pepper-soup', category: 'Foods', name: 'Goat Meat Pepper Soup', emoji: '🌶️', price: 4500, rating: 4.8,
    desc: 'Hot, aromatic broth with goat meat and uziza leaves.',
    tags: ['Spicy'], options: [PORTION, SPICE] },
  { id: 'ewa-agoyin', category: 'Foods', name: 'Ewa Agoyin & Bread', emoji: '🫘', price: 2500, rating: 4.5,
    desc: 'Soft mashed beans with dark, fiery agoyin pepper sauce.',
    tags: ['Veg'], options: [PORTION, EXTRAS, SPICE] },
  { id: 'asaro', category: 'Foods', name: 'Yam Porridge (Asaro)', emoji: '🍠', price: 3000, rating: 4.4,
    desc: 'Yam cooked soft in palm oil, peppers and vegetables.',
    tags: ['Veg'], options: [PORTION, PROTEIN, EXTRAS] },
  { id: 'native-rice', category: 'Foods', name: 'Native Palm Oil Rice', emoji: '🍜', price: 3800, rating: 4.6,
    desc: 'Village-style rice with smoked fish, crayfish and scent leaves.',
    tags: [], options: [PORTION, PROTEIN, EXTRAS, SPICE] },

  // ===== SNACKS =====
  { id: 'suya', category: 'Snacks', name: 'Beef Suya', emoji: '🍢', price: 3000, rating: 4.9,
    desc: 'Grilled skewers rubbed in yaji spice, with onions and tomatoes.',
    tags: ['Popular', 'Spicy'], options: [PACK, SPICE] },
  { id: 'puff-puff', category: 'Snacks', name: 'Puff-Puff', emoji: '🍩', price: 1200, rating: 4.7,
    desc: 'Soft, sweet fried dough balls. Ten pieces per pack.',
    tags: ['Veg'], options: [PACK] },
  { id: 'meat-pie', category: 'Snacks', name: 'Meat Pie', emoji: '🥟', price: 1500, rating: 4.8,
    desc: 'Buttery pastry filled with minced beef, potato and carrot.',
    tags: ['Popular'], options: [PACK] },
  { id: 'chin-chin', category: 'Snacks', name: 'Chin Chin', emoji: '🍪', price: 1000, rating: 4.5,
    desc: 'Crunchy, lightly sweet fried dough bites with nutmeg.',
    tags: ['Veg'], options: [PACK] },
  { id: 'akara', category: 'Snacks', name: 'Akara', emoji: '🧆', price: 1200, rating: 4.6,
    desc: 'Crispy bean fritters with pepper and onions. Eight pieces.',
    tags: ['Veg'], options: [PACK, SPICE] },
  { id: 'moi-moi', category: 'Snacks', name: 'Moi Moi', emoji: '🥮', price: 1500, rating: 4.6,
    desc: 'Steamed bean pudding with egg and fish.',
    tags: [], options: [PACK] },
  { id: 'boli', category: 'Snacks', name: 'Boli & Groundnut', emoji: '🍌', price: 1500, rating: 4.7,
    desc: 'Roasted ripe plantain served with roasted groundnuts.',
    tags: ['Veg'], options: [PACK] },
  { id: 'scotch-egg', category: 'Snacks', name: 'Scotch Egg', emoji: '🥚', price: 1300, rating: 4.4,
    desc: 'Boiled egg wrapped in seasoned sausage meat, crumbed and fried.',
    tags: [], options: [PACK] },
  { id: 'plantain-chips', category: 'Snacks', name: 'Plantain Chips', emoji: '🥨', price: 800, rating: 4.5,
    desc: 'Thin, crunchy unripe plantain chips, lightly salted.',
    tags: ['Veg'], options: [PACK] },

  // ===== DRINKS =====
  { id: 'zobo', category: 'Drinks', name: 'Zobo', emoji: '🍷', price: 1000, rating: 4.8,
    desc: 'Hibiscus drink with ginger, cloves and pineapple.',
    tags: ['Popular', 'Veg'], options: [DRINK_SIZE, TEMPERATURE] },
  { id: 'kunu', category: 'Drinks', name: 'Kunu Zaki', emoji: '🥛', price: 1000, rating: 4.5,
    desc: 'Northern millet drink, smooth and lightly spiced.',
    tags: ['Veg'], options: [DRINK_SIZE, TEMPERATURE] },
  { id: 'chapman', category: 'Drinks', name: 'Chapman', emoji: '🍹', price: 2000, rating: 4.9,
    desc: 'The famous Nigerian mocktail with cucumber and orange slices.',
    tags: ['Popular'], options: [DRINK_SIZE] },
  { id: 'tigernut', category: 'Drinks', name: 'Tiger Nut Milk (Kunun Aya)', emoji: '🥥', price: 1500, rating: 4.6,
    desc: 'Creamy tiger nut, coconut and date blend.',
    tags: ['Veg'], options: [DRINK_SIZE, TEMPERATURE] },
  { id: 'palm-wine', category: 'Drinks', name: 'Fresh Palm Wine', emoji: '🍶', price: 1500, rating: 4.4,
    desc: 'Sweet, freshly tapped palm wine. 18+ only.',
    tags: [], options: [DRINK_SIZE] },
  { id: 'orange-juice', category: 'Drinks', name: 'Fresh Orange Juice', emoji: '🍊', price: 1800, rating: 4.7,
    desc: 'Freshly squeezed oranges, no added sugar.',
    tags: ['Veg'], options: [DRINK_SIZE, TEMPERATURE] },
  { id: 'pineapple-ginger', category: 'Drinks', name: 'Pineapple Ginger Smoothie', emoji: '🍍', price: 2200, rating: 4.6,
    desc: 'Pineapple, ginger and lime blended thick.',
    tags: ['Veg'], options: [DRINK_SIZE] },
  { id: 'malt', category: 'Drinks', name: 'Malt Drink', emoji: '🍺', price: 800, rating: 4.3,
    desc: 'Non-alcoholic malt, served cold.',
    tags: [], options: [TEMPERATURE] },
  { id: 'water', category: 'Drinks', name: 'Bottled Water', emoji: '💧', price: 300, rating: 4.2,
    desc: 'Table water to cool the pepper down.',
    tags: ['Veg'], options: [DRINK_SIZE, TEMPERATURE] },
];

export const DELIVERY_FEE = 1500; // flat fee in naira
export const FREE_DELIVERY_FROM = 20000; // orders at or above this get free delivery
