const STORAGE_KEY = 'kervan-warehouse-data';

const today = new Date();
const dateKey = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;

const menuInventory = [
  { type: 'inventory', item_name: 'Tavuk', category: 'Meat', unit: 'kg', current_stock: 18, reorder_threshold: 12, supplier: 'Local butcher', available: true },
  { type: 'inventory', item_name: 'İskender sos', category: 'Sauces', unit: 'bottle', current_stock: 18, reorder_threshold: 8, supplier: 'Anatolia Foods', available: true },
  { type: 'inventory', item_name: 'Lavaş', category: 'Bread', unit: 'piece', current_stock: 12, reorder_threshold: 6, supplier: 'Daily Bakehouse', available: true },
  { type: 'inventory', item_name: 'Pide', category: 'Bread', unit: 'piece', current_stock: 16, reorder_threshold: 8, supplier: 'Daily Bakehouse', available: true },
  { type: 'inventory', item_name: 'Patates', category: 'Vegetables', unit: 'kg', current_stock: 12, reorder_threshold: 6, supplier: 'Green Market', available: true },
  { type: 'inventory', item_name: 'Soğan', category: 'Vegetables', unit: 'kg', current_stock: 10, reorder_threshold: 5, supplier: 'Green Market', available: true },
  { type: 'inventory', item_name: 'Ayran', category: 'Dairy', unit: 'bottle', current_stock: 24, reorder_threshold: 12, supplier: 'Fresh Dairy Co.', available: true },
  { type: 'inventory', item_name: 'Mango lassi', category: 'Dairy', unit: 'bottle', current_stock: 10, reorder_threshold: 5, supplier: 'Fresh Dairy Co.', available: true },
  { type: 'inventory', item_name: 'Nar suyu', category: 'Drinks', unit: 'bottle', current_stock: 18, reorder_threshold: 8, supplier: 'Kervan Beverages', available: true },
  { type: 'inventory', item_name: 'Şeftali suyu', category: 'Drinks', unit: 'bottle', current_stock: 15, reorder_threshold: 8, supplier: 'Kervan Beverages', available: true },
  { type: 'inventory', item_name: 'Masa peçete', category: 'Packaging', unit: 'pack', current_stock: 15, reorder_threshold: 6, supplier: 'PackRight', available: true },
  { type: 'inventory', item_name: 'Küçük kağıt bardak', category: 'Packaging', unit: 'pack', current_stock: 8, reorder_threshold: 4, supplier: 'PackRight', available: true },
  { type: 'inventory', item_name: 'Büyük kağıt bardak', category: 'Packaging', unit: 'pack', current_stock: 6, reorder_threshold: 4, supplier: 'PackRight', available: true },
  { type: 'inventory', item_name: 'Pipet', category: 'Packaging', unit: 'pack', current_stock: 10, reorder_threshold: 6, supplier: 'PackRight', available: true },
  { type: 'inventory', item_name: 'Islak mendil', category: 'Packaging', unit: 'pack', current_stock: 12, reorder_threshold: 6, supplier: 'PackRight', available: true },
  { type: 'inventory', item_name: 'Masa bezi', category: 'Packaging', unit: 'pack', current_stock: 8, reorder_threshold: 4, supplier: 'PackRight', available: true },
  { type: 'inventory', item_name: 'Yeşil elma', category: 'Fruit', unit: 'kg', current_stock: 10, reorder_threshold: 5, supplier: 'Green Market', available: true },
  { type: 'inventory', item_name: 'Kayısı', category: 'Fruit', unit: 'kg', current_stock: 8, reorder_threshold: 4, supplier: 'Green Market', available: true },
  { type: 'inventory', item_name: 'Mango', category: 'Fruit', unit: 'kg', current_stock: 6, reorder_threshold: 4, supplier: 'Green Market', available: true },
  { type: 'inventory', item_name: 'Baklava', category: 'Desserts', unit: 'tray', current_stock: 5, reorder_threshold: 3, supplier: 'Bakery Depot', available: true },
  { type: 'inventory', item_name: 'Dubai cookie', category: 'Desserts', unit: 'pack', current_stock: 12, reorder_threshold: 6, supplier: 'Bakery Depot', available: true },
  { type: 'inventory', item_name: 'Dubai chocolate findik', category: 'Desserts', unit: 'pack', current_stock: 12, reorder_threshold: 6, supplier: 'Bakery Depot', available: true },
  { type: 'inventory', item_name: 'Dubai chocolate pistachio', category: 'Desserts', unit: 'pack', current_stock: 12, reorder_threshold: 6, supplier: 'Bakery Depot', available: true },
  { type: 'inventory', item_name: 'Ceviz tozu', category: 'Desserts', unit: 'kg', current_stock: 4, reorder_threshold: 2, supplier: 'Bakery Depot', available: true },
  { type: 'inventory', item_name: 'Sarı vital çay', category: 'Drinks', unit: 'box', current_stock: 10, reorder_threshold: 5, supplier: 'Kervan Beverages', available: true },
  { type: 'inventory', item_name: 'K pop sos', category: 'Sauces', unit: 'bottle', current_stock: 10, reorder_threshold: 5, supplier: 'Anatolia Foods', available: true },
  { type: 'inventory', item_name: 'Şeffaf sos', category: 'Sauces', unit: 'bottle', current_stock: 8, reorder_threshold: 4, supplier: 'Anatolia Foods', available: true },
  { type: 'inventory', item_name: 'Çeşitli meyve suyu', category: 'Drinks', unit: 'bottle', current_stock: 14, reorder_threshold: 7, supplier: 'Kervan Beverages', available: true },
  { type: 'inventory', item_name: 'Beyaz köp poşet', category: 'Packaging', unit: 'pack', current_stock: 10, reorder_threshold: 5, supplier: 'PackRight', available: true },
  { type: 'inventory', item_name: 'Şişe ayran', category: 'Dairy', unit: 'bottle', current_stock: 20, reorder_threshold: 10, supplier: 'Fresh Dairy Co.', available: true },
];

const starterRecords = [
  { type: 'branch', branch_id: '1', branch_name: 'Downtown', contact_person: 'Aylin Kaya', contact_phone: '', delivery_route: 'Central district', active: true },
  { type: 'branch', branch_id: '2', branch_name: 'Riverside', contact_person: 'Emre Demir', contact_phone: '', delivery_route: 'Riverside market', active: true },
  { type: 'branch', branch_id: '3', branch_name: 'Old Town', contact_person: 'Deniz Arslan', contact_phone: '', delivery_route: 'Old town square', active: true },
  { type: 'inventory', item_name: 'Chicken döner', category: 'Meat', unit: 'kg', current_stock: 48, reorder_threshold: 20, supplier: 'Anatolia Foods', available: true },
  { type: 'inventory', item_name: 'Beef', category: 'Meat', unit: 'kg', current_stock: 7, reorder_threshold: 12, supplier: 'Anatolia Foods', available: true },
  { type: 'inventory', item_name: 'Flatbread', category: 'Bread', unit: 'pack', current_stock: 36, reorder_threshold: 12, supplier: 'Daily Bakehouse', available: true },
  { type: 'inventory', item_name: 'Tomatoes', category: 'Vegetables', unit: 'kg', current_stock: 18, reorder_threshold: 8, supplier: 'Green Market', available: true },
  { type: 'inventory', item_name: 'Garlic sauce', category: 'Sauces', unit: 'bottle', current_stock: 22, reorder_threshold: 8, supplier: 'Anatolia Foods', available: true },
  { type: 'inventory', item_name: 'Yogurt', category: 'Dairy', unit: 'tub', current_stock: 14, reorder_threshold: 6, supplier: 'Fresh Dairy Co.', available: true },
  { type: 'inventory', item_name: 'Water', category: 'Drinks', unit: 'case', current_stock: 30, reorder_threshold: 10, supplier: 'Kervan Beverages', available: true },
  { type: 'inventory', item_name: 'Takeaway boxes', category: 'Packaging', unit: 'pack', current_stock: 9, reorder_threshold: 10, supplier: 'PackRight', available: true },
  { type: 'inventory', item_name: 'Surface cleaner', category: 'Cleaning', unit: 'bottle', current_stock: 16, reorder_threshold: 6, supplier: 'CleanWorks', available: true },
  ...menuInventory,
  {
    type: 'order',
    branch_id: '1',
    branch_name: 'Downtown',
    order_date: dateKey,
    items_json: JSON.stringify([
      { name: 'Flatbread', qty: 8, approved: 8, unit: 'pack' },
      { name: 'Chicken döner', qty: 6, approved: 6, unit: 'kg' },
    ]),
    notes: 'Please deliver before lunch.',
    status: 'Pending',
    priority: 'Normal',
    submitted_at: today.toISOString(),
    submitted_by: 'Downtown',
    fulfilment_notes: '',
    delivery_status: 'Assigned',
    driver_notes: '',
  },
  {
    type: 'order',
    branch_id: '2',
    branch_name: 'Riverside',
    order_date: dateKey,
    items_json: JSON.stringify([{ name: 'Tomatoes', qty: 5, approved: 5, unit: 'kg' }]),
    notes: '',
    status: 'Ready',
    priority: 'Urgent',
    submitted_at: new Date(today.getTime() - 60 * 60 * 1000).toISOString(),
    submitted_by: 'Riverside',
    fulfilment_notes: 'Packed and ready for dispatch.',
    delivery_status: 'Assigned',
    driver_notes: '',
  },
  { type: 'setting', setting_key: 'deadline', setting_value: '14:00' },
  { type: 'setting', setting_key: 'delivery_days', setting_value: 'Monday, Tuesday, Wednesday, Thursday, Friday' },
  { type: 'setting', setting_key: 'default_language', setting_value: 'en' },
].map((record, index) => ({ ...record, __backendId: `starter-${index + 1}` }));

function readRecords() {
  const stored = window.localStorage.getItem(STORAGE_KEY);
  if (stored === null) {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(starterRecords));
    return starterRecords;
  }

  const records = JSON.parse(stored);
  if (!Array.isArray(records)) {
    throw new Error('Saved warehouse data must be a list of records.');
  }

  const inventoryByName = new Map(
    records
      .filter((record) => record.type === 'inventory')
      .map((record) => [String(record.item_name).trim().toLowerCase(), record])
  );

  const missingInventory = menuInventory.filter((item) => !inventoryByName.has(String(item.item_name).trim().toLowerCase()));
  if (missingInventory.length) {
    const merged = [...records, ...missingInventory.map((item, index) => ({ ...item, __backendId: `menu-seed-${Date.now()}-${index}` }))];
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(merged));
    return merged;
  }

  return records;
}

const listeners = new Set();
let records;

function persist(nextRecords) {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(nextRecords));
  records = nextRecords;
  listeners.forEach((listener) => listener(records));
}

const dataSdk = {
  async init({ onDataChanged }) {
    records = readRecords();
    listeners.add(onDataChanged);
    onDataChanged(records);
    return {
      isOk: true,
      unsubscribe: () => listeners.delete(onDataChanged),
    };
  },

  async create(record) {
    const next = {
      ...record,
      __backendId: record.__backendId || `record-${globalThis.crypto.randomUUID()}`,
    };
    persist([...records, next]);
    return { isOk: true };
  },

  async update(record) {
    const index = records.findIndex((item) => item.__backendId === record.__backendId);
    if (index === -1) {
      return { isOk: false };
    }

    const next = records.slice();
    next[index] = record;
    persist(next);
    return { isOk: true };
  },
};

export default dataSdk;
