import { useState } from 'react';
import { useAppContext } from '../../context/AppContext.jsx';
import { Badge, Button, Card, Field } from '../../components/ui.jsx';
import { validNumber } from '../../utils/appData.js';

export default function StockCard({ item }) {
  const { show, t, write, itemName, photoLabel, label, busy } = useAppContext();
  const [amount, setAmount] = useState(String(item.current_stock));
  const key = item.__backendId;

  const save = async () => {
    if (!validNumber(amount)) {
      show(t('invalidStock'), true);
      return;
    }
    await write('update', { ...item, current_stock: Number(amount) }, `stock-${key}`, t('inventoryUpdated'));
  };

  return (
    <Card>
      {item.item_photo
        ? <img src={item.item_photo} alt={photoLabel(item)} loading="lazy" className="w-full h-32 object-contain rounded-lg bg-[#f7f3eb] mb-3" />
        : <div className="w-full h-32 rounded-lg bg-[#f1e7d5] mb-3 grid place-items-center muted text-sm">{t('noPhoto')}</div>}
      <div className="row-between"><strong>{itemName(item)}</strong><Badge>{label(item.category)}</Badge></div>
      <p className="small-meta mt-2">{t('supplier')}: {item.supplier}</p>
      <p className="small-meta mt-1">{t('threshold')}: {item.reorder_threshold} {item.unit}</p>
      <div className="form-grid mt-4">
        <Field
          id={`stock-${key}`}
          label={`${t('currentStock')} (${item.unit || ''})`}
          type="number"
          min="0"
          step="0.01"
          value={amount}
          onChange={(event) => setAmount(event.target.value)}
        />
        <div>
          <span className="label">{t('availability')}</span>
          <Button
            variant="secondary"
            className="full-phone"
            disabled={!!busy}
            onClick={() => write('update', { ...item, available: !item.available }, `toggle-${key}`, t('inventoryUpdated'))}
          >
            {label(item.available ? 'Available' : 'Unavailable')}
          </Button>
        </div>
      </div>
      <Button className="full-phone mt-4" disabled={!!busy} onClick={save}>
        {busy === `stock-${key}` ? t('saving') : t('save')}
      </Button>
    </Card>
  );
}
