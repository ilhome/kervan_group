import { useRef, useState } from 'react';
import { useAppContext } from '../../context/AppContext.jsx';
import { Badge, Button, Card, Field } from '../../components/ui.jsx';
import { validNumber } from '../../utils/appData.js';

export default function StockCard({ item }) {
  const { show, t, write, itemName, photoLabel, label, busy, role } = useAppContext();
  const [amount, setAmount] = useState(String(item.current_stock));
  const photoInput = useRef(null);
  const key = item.__backendId;

  const save = async () => {
    if (!validNumber(amount)) {
      show(t('invalidStock'), true);
      return;
    }
    await write('update', { ...item, current_stock: Number(amount) }, `stock-${key}`, t('inventoryUpdated'));
  };

  const changePhoto = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      show(t('photoError'), true);
      event.target.value = '';
      return;
    }

    const reader = new FileReader();
    reader.onload = async () => {
      const item_photo = String(reader.result || '');
      if (!item_photo.startsWith('data:image/')) {
        show(t('photoError'), true);
        return;
      }
      await write(
        'update',
        { ...item, item_photo, item_photo_removed: false },
        `photo-${key}`,
        t('photoSaved')
      );
      event.target.value = '';
    };
    reader.onerror = () => show(t('photoError'), true);
    reader.readAsDataURL(file);
  };

  const removePhoto = async () => {
    if (await write(
      'update',
      { ...item, item_photo: '', item_photo_removed: true },
      `photo-${key}`,
      t('photoRemoved')
    )) {
      if (photoInput.current) photoInput.current.value = '';
    }
  };

  const deleteItem = async () => {
    if (!globalThis.confirm(t('confirmDeleteInventory').replace('{name}', itemName(item)))) return;
    await write('delete', item, `delete-${key}`, t('inventoryItemDeleted'));
  };

  return (
    <Card className="inventory-card">
      {item.item_photo
        ? <img src={item.item_photo} alt={photoLabel(item)} loading="lazy" className="w-full h-32 object-cover rounded-lg bg-[#f7f3eb] mb-3" />
        : <div className="inventory-photo-placeholder w-full h-32 grid place-items-center muted text-sm bg-[#f1e7d5]">{t('noPhoto')}</div>}
      {role === 'admin' && (
        <div className={`inventory-photo-actions${item.item_photo ? '' : ' inventory-photo-actions-new'}`}>
          <input
            ref={photoInput}
            id={`photo-${key}`}
            className="sr-only"
            type="file"
            accept="image/*"
            aria-label={t(item.item_photo ? 'replacePhoto' : 'uploadPhoto')}
            disabled={!!busy}
            onChange={changePhoto}
          />
          <label
            htmlFor={`photo-${key}`}
            title={t(item.item_photo ? 'replacePhoto' : 'uploadPhoto')}
            className={`btn secondary inventory-action${busy ? ' opacity-50 pointer-events-none' : ''}`}
          >
            {t(item.item_photo ? 'replacePhotoShort' : 'uploadPhotoShort')}
          </label>
          {item.item_photo && (
            <Button
              variant="secondary"
              disabled={!!busy}
              className="inventory-action"
              title={t('removePhoto')}
              onClick={removePhoto}
            >
              {t('removePhotoShort')}
            </Button>
          )}
          <Button
            variant="danger"
            className="inventory-action inventory-delete"
            disabled={!!busy}
            title={t('delete')}
            aria-label={`${t('delete')} ${itemName(item)}`}
            onClick={deleteItem}
          >
            {t('delete')}
          </Button>
        </div>
      )}
      <div className="inventory-card-content">
        <div className="inventory-item-heading">
          <strong>{itemName(item)}</strong>
          <Badge>{label(item.category)}</Badge>
        </div>
        <div className="inventory-item-meta">
          <p className="small-meta">{t('supplier')}: {item.supplier}</p>
          <p className="small-meta">{t('threshold')}: {item.reorder_threshold} {item.unit}</p>
        </div>
        <div className="inventory-stock-controls">
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
              className="inventory-action inventory-availability"
              disabled={!!busy}
              onClick={() => write('update', { ...item, available: !item.available }, `toggle-${key}`, t('inventoryUpdated'))}
            >
              {label(item.available ? 'Available' : 'Unavailable')}
            </Button>
          </div>
        </div>
        <Button className="inventory-action inventory-save" disabled={!!busy} onClick={save}>
          {busy === `stock-${key}` ? t('saving') : t('save')}
        </Button>
      </div>
    </Card>
  );
}
