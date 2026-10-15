import { useAppContext } from '../../context/AppContext.jsx';
import { Badge, Button } from '../../components/ui.jsx';
import { linesOf } from '../../utils/appData.js';

export default function OrderCard({order}){
        const { branchName, label, t, formatTime, setSelectedOrder, setView, setStep } = useAppContext();
        return <article className="panel p-4 order-card order-summary-card">
          <div className="order-summary-content">
            <div className="order-summary-heading"><strong>{branchName(order.branch_id)}</strong><Badge>{label(order.status||'Pending')}</Badge></div>
            <p className="small-meta">{t('orderDate')}: {order.order_date} <span aria-hidden="true">·</span> {t('submitted')}: {formatTime(order.submitted_at)}</p>
            <p className="small-meta">{t('items')}: {linesOf(order).length} <span aria-hidden="true">·</span> {t('priority')}: {label(order.priority||'Normal')}</p>
          </div>
          <Button variant="secondary" className="order-view-button no-print" onClick={()=>{setSelectedOrder(order.__backendId);setView('orders');setStep('queue')}}>{t('view')} →</Button>
        </article>;
      }
