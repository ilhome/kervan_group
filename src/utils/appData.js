export const CATEGORIES = ['Meat', 'Bread', 'Vegetables', 'Sauces', 'Dairy', 'Drinks', 'Packaging', 'Fruit', 'Desserts', 'Bakery', 'Cleaning'];
export const STATES = ['Pending', 'Approved', 'Preparing', 'Ready', 'Dispatched', 'Completed'];
export const DELIVERY_STATES = ['Assigned', 'Picked up', 'Out for delivery', 'Delivered', 'Exception'];

export const NAV = {
  dashboard: '▦',
  orders: '▤',
  inventory: '▣',
  driver: '▱',
  branches: '⌂',
  reports: '▥',
  settings: '⚙',
};

export const PERMISSIONS = {
  store: ['dashboard', 'orders'],
  warehouse: ['dashboard', 'orders', 'inventory', 'reports'],
  driver: ['driver'],
  admin: ['dashboard', 'orders', 'inventory', 'driver', 'branches', 'reports', 'settings'],
};

export const KEYS = {
  Meat: 'meat',
  Bread: 'bread',
  Vegetables: 'vegetables',
  Sauces: 'sauces',
  Dairy: 'dairy',
  Drinks: 'drinks',
  Packaging: 'packaging',
  Fruit: 'fruit',
  Desserts: 'desserts',
  Bakery: 'bakery',
  Cleaning: 'cleaning',
  Pending: 'pending',
  Approved: 'approvedStatus',
  Preparing: 'preparing',
  Ready: 'ready',
  Dispatched: 'dispatched',
  Completed: 'completedStatus',
  Assigned: 'assigned',
  'Picked up': 'pickedUp',
  'Out for delivery': 'outForDelivery',
  Delivered: 'delivered',
  Exception: 'exception',
  Normal: 'normal',
  Urgent: 'urgent',
};

export const BLANK = {
  type: '',
  branch_id: '',
  branch_name: '',
  order_date: '',
  items_json: '',
  notes: '',
  status: '',
  priority: '',
  submitted_at: '',
  submitted_by: '',
  fulfilment_notes: '',
  item_name: '',
  category: '',
  unit: '',
  current_stock: 0,
  reorder_threshold: 0,
  supplier: '',
  available: true,
  contact_person: '',
  delivery_route: '',
  active: true,
  setting_key: '',
  setting_value: '',
  driver_notes: '',
  delivery_status: '',
};

export const newRow = (value) => ({ ...BLANK, ...value });
export const dateKey = (date) => {
  const value = new Date(date);
  return `${value.getFullYear()}-${String(value.getMonth() + 1).padStart(2, '0')}-${String(value.getDate()).padStart(2, '0')}`;
};
export const today = dateKey(new Date());
export const isDoner = (item) => /döner|doner/i.test(String(item?.item_name || ''));
export const isMeat = (item) => String(item?.category || '').trim().toLowerCase() === 'meat' || isDoner(item);
export const linesOf = (order) => {
  try {
    const value = JSON.parse(order.items_json || '[]');
    return Array.isArray(value) ? value : [];
  } catch {
    return [];
  }
};
export const validNumber = (value) => value !== '' && Number.isFinite(Number(value)) && Number(value) >= 0;
export const round = (value) => Math.round(value * 100) / 100;
