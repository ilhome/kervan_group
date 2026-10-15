import { useAppContext } from '../../context/AppContext.jsx';
import { Button, Card, Field } from '../../components/ui.jsx';
import { STATES } from '../../utils/appData.js';
import Deadline from './Deadline.jsx';
import OrderCard from './OrderCard.jsx';
import OrderBuilder from './OrderBuilder.jsx';
import OrderReview from './OrderReview.jsx';
import OrderDetail from './OrderDetail.jsx';

export default function Orders() {
  const {
    visibleOrders,
    queueFilters,
    setQueueFilters,
    selectedOrder,
    activeOrder,
    step,
    role,
    t,
    startOrder,
    branch,
    branchName,
    branches,
    label,
  } = useAppContext();
  const filtered = visibleOrders.filter((order) => (
    (!queueFilters.date || order.order_date === queueFilters.date)
    && (!queueFilters.branch || order.branch_id === queueFilters.branch)
    && (!queueFilters.status || order.status === queueFilters.status)
  ));

  if (selectedOrder) return <OrderDetail key={selectedOrder} order={activeOrder} />;
  if (step === 'build') return <OrderBuilder />;
  if (step === 'check' || step === 'final') return <OrderReview />;

  return (
    <section className="daily-orders-page">
      <div className="row-between orders-heading">
        <div>
          <h2>{t(role === 'store' ? 'orderHistory' : 'orderQueue')}</h2>
          <p className="orders-count">{visibleOrders.length} {t('totalOrders')}</p>
        </div>
        <Button className="orders-primary-action" onClick={startOrder}>＋ {t('createOrder')}</Button>
      </div>
      {role === 'store' && <Deadline />}
      <Card className="form-grid orders-filters">
        <Field
          id="filter-date"
          label={t('orderDate')}
          type="date"
          value={queueFilters.date}
          onChange={(event) => setQueueFilters({ ...queueFilters, date: event.target.value })}
        />
        <Field id="filter-branch" label={t('branch')}>
          {role === 'store' ? (
            <input id="filter-branch" className="field" value={branchName(branch)} readOnly />
          ) : (
            <select
              id="filter-branch"
              className="field"
              value={queueFilters.branch}
              onChange={(event) => setQueueFilters({ ...queueFilters, branch: event.target.value })}
            >
              <option value="">{t('allBranches')}</option>
              {branches.map((item) => (
                <option key={item.branch_id} value={item.branch_id}>{item.branch_name}</option>
              ))}
            </select>
          )}
        </Field>
        <Field id="filter-status" label={t('status')}>
          <select
            id="filter-status"
            className="field"
            value={queueFilters.status}
            onChange={(event) => setQueueFilters({ ...queueFilters, status: event.target.value })}
          >
            <option value="">{t('allStatuses')}</option>
            {STATES.map((status) => <option key={status} value={status}>{label(status)}</option>)}
          </select>
        </Field>
      </Card>
      <div className="stack orders-list">
        {filtered.map((order) => <OrderCard key={order.__backendId} order={order} />)}
        {!filtered.length && <Card><p className="muted py-5 text-center">{t('noOrders')}</p></Card>}
      </div>
    </section>
  );
}
