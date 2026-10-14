import { useState } from 'react';
import { useAppContext } from '../../context/AppContext.jsx';
import { Badge, Card, Field } from '../../components/ui.jsx';
import { DELIVERY_STATES, linesOf, today } from '../../utils/appData.js';

export function DeliveryCard({order}){
        const { branches, branchName, t, label, linesOf, write, busy } = useAppContext();
        const relatedBranch=branches.find(b=>b.branch_id===order.branch_id);
        const [deliveryStatus,setDeliveryStatus]=useState(order.delivery_status||'Assigned');
        const [driverNotes,setDriverNotes]=useState(order.driver_notes||'');
        const save=async e=>{
          e.preventDefault();
          await write('update',{...order,delivery_status:deliveryStatus,driver_notes:driverNotes.trim()},
            `delivery-${order.__backendId}`,t('deliverySaved'));
        };
        return <article className="panel p-4 sm:p-5 min-w-0">
          <div className="row-between"><div className="min-w-0"><h3 className="font-bold">{branchName(order.branch_id)}</h3>
            <p className="small-meta mt-1">{relatedBranch?.delivery_route||t('addressPlaceholder')}</p>
            <p className="small-meta mt-1">{t('contact')}: {relatedBranch?.contact_person||t('contactPlaceholder')}</p></div>
            <Badge>{label(order.delivery_status||'Assigned')}</Badge></div>
          <div className="border-t mt-4 pt-3"><strong>{t('orderSummary')}</strong>
            {linesOf(order).map((line,index)=><div key={index} className="line row-between text-sm">
              <span>{line.name}</span><span>{line.approved??line.qty} {line.unit}</span></div>)}</div>
          <form onSubmit={save} className="stack border-t mt-4 pt-4">
            <Field id={`delivery-${order.__backendId}`} label={t('deliveryStatus')}>
              <select id={`delivery-${order.__backendId}`} className="field" value={deliveryStatus}
                onChange={e=>setDeliveryStatus(e.target.value)}>
                {DELIVERY_STATES.map(s=><option key={s} value={s}>{label(s)}</option>)}
              </select>
            </Field>
            <Field id={`driver-notes-${order.__backendId}`} label={t('deliveryNotes')}>
              <textarea id={`driver-notes-${order.__backendId}`} className="field" rows="2" value={driverNotes}
                placeholder={t('deliveryPlaceholder')} onChange={e=>setDriverNotes(e.target.value)}/></Field>
            <button className="btn primary" type="submit" disabled={!!busy}>
              {busy===`delivery-${order.__backendId}`?t('saving'):t('saveDelivery')}</button>
          </form>
        </article>;
      }


export function Deliveries(){
        const { orders, t } = useAppContext();
        const deliveries=orders.filter(o=>o.order_date===today&&
          ['Approved','Preparing','Ready','Dispatched','Completed'].includes(o.status));
        return <section><h2>{t('routeToday')}</h2><p className="muted mb-4">{t('deliveriesToday')}: {deliveries.length}</p>
          <div className="grid-cards">{deliveries.map(o=><DeliveryCard key={o.__backendId} order={o}/>)}</div>
          {!deliveries.length&&<Card>{t('noDeliveries')}</Card>}
        </section>;
      }
