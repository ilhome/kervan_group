import { useState } from 'react';
import { useAppContext } from '../../context/AppContext.jsx';
import { Button, Field } from '../../components/ui.jsx';
import { newRow, validNumber } from '../../utils/appData.js';

const emptyForm = () => ({
  name: '',
  category: 'Meat',
  customCategory: '',
  unit: 'kg',
  stock: '0',
  threshold: '0',
  supplier: '',
  available: true,
  notes: '',
  item_photo: '',
});

export default function AddStockForm({ categories, onCancel }) {
  const { t, show, stock, recordsRef, write, busy, label } = useAppContext();
  const [form, setForm] = useState(emptyForm);
  const update = (key, value) => setForm((previous) => ({ ...previous, [key]: value }));

  const create = async (event) => {
    event.preventDefault();
    const category = form.category === '__custom__' ? form.customCategory.trim() : form.category;
    if (!form.name.trim() || !category || !form.unit.trim()) {
      show(t('itemRequired'), true);
      return;
    }
    if (!validNumber(form.stock) || !validNumber(form.threshold)) {
      show(t('invalidStock'), true);
      return;
    }
    if (stock.some((item) => (
      String(item.item_name).trim().toLowerCase() === form.name.trim().toLowerCase()
      && String(item.category).toLowerCase() === category.toLowerCase()
    ))) {
      show(t('duplicateItem'), true);
      return;
    }
    if (recordsRef.current.length >= 999) {
      show(t('limit'), true);
      return;
    }

    const row = newRow({
      type: 'inventory',
      item_name: form.name.trim(),
      category,
      unit: form.unit.trim(),
      current_stock: Number(form.stock),
      reorder_threshold: Number(form.threshold),
      supplier: form.supplier.trim(),
      available: form.available,
      notes: form.notes.trim(),
      item_photo: form.item_photo || '',
    });
    if (await write('create', row, 'create-item', t('itemCreated'))) onCancel();
  };

  const selectPhoto = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      show(t('photoError'), true);
      return;
    }
    const reader = new FileReader();
    reader.onload = () => update('item_photo', String(reader.result || ''));
    reader.readAsDataURL(file);
  };

  return (
    <form className="panel p-4 sm:p-5 stack mb-4" onSubmit={create}>
      <div className="form-grid">
        <Field id="new-stock-name" label={t('stockItemName')} required value={form.name} onChange={(event) => update('name', event.target.value)} />
        <Field id="new-stock-category" label={t('categoryChoice')}>
          <select id="new-stock-category" className="field" value={form.category} onChange={(event) => update('category', event.target.value)}>
            {categories.map((category) => <option key={category} value={category}>{label(category)}</option>)}
            <option value="__custom__">{t('customCategory')}</option>
          </select>
        </Field>
        {form.category === '__custom__' && (
          <Field
            id="new-stock-custom-category"
            label={t('customCategory')}
            placeholder={t('customCategoryPlaceholder')}
            value={form.customCategory}
            onChange={(event) => update('customCategory', event.target.value)}
          />
        )}
        <Field id="new-stock-unit" label={t('stockUnit')} required value={form.unit} onChange={(event) => update('unit', event.target.value)} />
        <Field id="new-stock-current" label={t('currentStock')} type="number" min="0" step="0.01" required value={form.stock} onChange={(event) => update('stock', event.target.value)} />
        <Field id="new-stock-threshold" label={t('threshold')} type="number" min="0" step="0.01" required value={form.threshold} onChange={(event) => update('threshold', event.target.value)} />
        <Field id="new-stock-supplier" label={t('supplier')} value={form.supplier} onChange={(event) => update('supplier', event.target.value)} />
      </div>
      <div>
        <label className="label" htmlFor="new-stock-photo">{t('uploadPhoto')}</label>
        <input id="new-stock-photo" className="field" type="file" accept="image/*" onChange={selectPhoto} />
        {form.item_photo && (
          <div className="mt-3">
            <img src={form.item_photo} alt={t('uploadPhoto')} className="w-full h-32 object-contain rounded-lg bg-[#f7f3eb]" />
            <Button
              variant="secondary"
              className="mt-2"
              onClick={() => {
                update('item_photo', '');
                const input = document.getElementById('new-stock-photo');
                if (input) input.value = '';
              }}
            >
              {t('removePhoto')}
            </Button>
          </div>
        )}
      </div>
      <Field id="new-stock-notes" label={t('stockDescription')}>
        <textarea id="new-stock-notes" className="field" rows="3" value={form.notes} onChange={(event) => update('notes', event.target.value)} />
      </Field>
      <label className="check-row">
        <input type="checkbox" checked={form.available} onChange={(event) => update('available', event.target.checked)} />
        <span>{t('stockAvailability')}</span>
      </label>
      <div className="review-action action-bar">
        <Button type="submit" disabled={busy === 'create-item'}>
          {busy === 'create-item' ? t('saving') : t('createItem')}
        </Button>
        <Button variant="secondary" onClick={onCancel}>{t('cancel')}</Button>
      </div>
    </form>
  );
}
