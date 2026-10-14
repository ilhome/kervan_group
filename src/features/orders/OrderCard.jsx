import { useAppContext } from '../../context/AppContext.jsx';
import { Badge, Button } from '../../components/ui.jsx';
import { linesOf } from '../../utils/appData.js';

export default function OrderCard({order}){
        const { branchName, label, t, formatTime, setSelectedOrder, setView, setStep } = useAppContext();
        return <article className="panel p-4 order-card">
          <div className="min-w-0">
            <div className="row-between"><strong>{branchName(order.branch_id)}</strong><Badge>{label(order.status||'Pending')}</Badge></div>
            <p className="small-meta mt-2">{t('orderDate')}: {order.order_date} · {t('submitted')}: {formatTime(order.submitted_at)}</p>
            <p className="small-meta mt-1">{t('items')}: {linesOf(order).length} · {t('priority')}: {label(order.priority||'Normal')}</p>
          </div>
          <Button variant="secondary" className="full-phone self-end no-print" onClick={()=>{setSelectedOrder(order.__backendId);setView('orders');setStep('queue')}}>{t('view')} →</Button>
        </article>;
      }
