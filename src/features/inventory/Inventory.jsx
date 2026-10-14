import { useState } from 'react';
import { useAppContext } from '../../context/AppContext.jsx';
import { Button, Card, Field } from '../../components/ui.jsx';
import { CATEGORIES } from '../../utils/appData.js';
import AddStockForm from './AddStockForm.jsx';
import StockCard from './StockCard.jsx';

export function Inventory() {
  const { stock, invFilters, setInvFilters, role, t, label } = useAppContext();
  const [creating, setCreating] = useState(false);
  const categories = [...new Set([...CATEGORIES, ...stock.map((item) => item.category).filter(Boolean)])];
  const filtered = stock.filter((item) => (
    (!invFilters.category || item.category === invFilters.category)
    && (!invFilters.search || `${item.item_name} ${item.supplier}`.toLowerCase().includes(invFilters.search.toLowerCase()))
  ));

  return (
    <section>
      <div className="row-between">
        <div>
          <h2>{t('stockCatalogue')}</h2>
          <p className="muted mb-4">{t('stockHelp')}</p>
        </div>
        {role === 'admin' && (
          <Button onClick={() => setCreating(true)}>＋ {t('createStockItem')}</Button>
        )}
      </div>
      {role === 'admin' && creating && (
        <AddStockForm categories={categories} onCancel={() => setCreating(false)} />
      )}
      <Card className="form-grid mb-4">
        <Field
          id="inv-search"
          label={t('searchItems')}
          value={invFilters.search}
          placeholder={t('searchInventory')}
          onChange={(event) => setInvFilters((previous) => ({ ...previous, search: event.target.value }))}
        />
        <Field id="inv-category" label={t('category')}>
          <select
            id="inv-category"
            className="field"
            value={invFilters.category}
            onChange={(event) => setInvFilters((previous) => ({ ...previous, category: event.target.value }))}
          >
            <option value="">{t('allCategories')}</option>
            {categories.map((category) => (
              <option key={category} value={category}>{label(category)}</option>
            ))}
          </select>
        </Field>
      </Card>
      <div className="grid-cards three-grid">
        {filtered.map((item) => <StockCard key={item.__backendId} item={item} />)}
      </div>
      {!filtered.length && <Card>{t('noInventory')}</Card>}
    </section>
  );
}
