import { useState } from 'react';
import { useAppContext } from '../../context/AppContext.jsx';
import { Badge, Button, Card, Field } from '../../components/ui.jsx';
import { linesOf } from '../../utils/appData.js';

export default function OrderDetail({order}){
        const { role, t, validNumber, linesOf, show, nextStatus, branchName, formatTime, write, setSelectedOrder, busy, label } = useAppContext();
        const editable=role==='warehouse'||role==='admin';
        const [approved,setApproved]=useState(()=>linesOf(order).map(line=>String(line.approved??line.qty??0)));
        const [substitutes,setSubstitutes]=useState(()=>linesOf(order).map(line=>line.substitute||''));
        const [notes,setNotes]=useState(order?.fulfilment_notes||'');
        if(!order)return <Card>{t('orderMissing')}</Card>;
        const save=async(next)=>{
          const values=approved.map(Number);
          if(values.some((value,index)=>!validNumber(approved[index]))){show(t('invalidQuantity'),true);return}
          const updated=linesOf(order).map((line,index)=>({...line,approved:values[index],substitute:substitutes[index].trim()}));
          const change={...order,items_json:JSON.stringify(updated),fulfilment_notes:notes.trim(),status:next||order.status};
          await write('update',change,next?'advance':'detail',t(next?'orderMarked':'detailsSaved'));
        };
        return <section>
          <Button variant="ghost" className="mb-4 no-print" onClick={()=>setSelectedOrder(null)}>← {t('backQueue')}</Button>
          <div className="row-between mb-4"><div><p className="eyebrow">{t('pickingList')} / {order.order_date}</p>
            <h2>{branchName(order.branch_id)}</h2><p className="small-meta">{t('submitted')}: {formatTime(order.submitted_at)} · {label(order.priority||'Normal')}</p></div>
            <div className="flex flex-wrap items-center gap-2"><Badge>{label(order.status)}</Badge>
              {editable&&<Button variant="secondary" className="no-print" onClick={()=>window.print()}>{t('print')}</Button>}</div></div>
          <div className="stack">{linesOf(order).map((line,index)=><Card key={`${index}-${line.name}`}>
            <strong>{line.name}</strong>
            {line.kgPerQuantity!==undefined&&<p className="small-meta mt-1">{line.kgPerQuantity} {t('kg')} × {line.quantity} = {line.totalKg} {t('kg')}</p>}
            <p className="mt-2"><span className="muted">{t('requested')}: </span>
              <strong>{line.kgPerQuantity!==undefined?`${line.totalKg} ${t('kg')}`:`${line.qty} ${line.unit||''}`}</strong></p>
            {editable?<div className="form-grid mt-3">
              <Field id={`approved-${index}`} label={`${t('approved')}: ${line.name}`} type="number" min="0" step="0.01"
                value={approved[index]} onChange={e=>setApproved(previous=>previous.map((v,i)=>i===index?e.target.value:v))}/>
              <Field id={`sub-${index}`} label={`${t('availabilitySub')}: ${line.name}`} value={substitutes[index]}
                placeholder={t('subPlaceholder')} onChange={e=>setSubstitutes(previous=>previous.map((v,i)=>i===index?e.target.value:v))}/>
            </div>:<><p className="small-meta mt-1">{t('approved')}: {line.approved??line.qty} {line.unit||''}</p>
              {line.substitute&&<p className="small-meta mt-1">{t('availabilitySub')}: {line.substitute}</p>}</>}
          </Card>)}</div>
          <div className="form-grid mt-4"><Card><h3 className="font-bold mb-2">{t('branchNotes')}</h3><p>{order.notes||t('noNotes')}</p></Card>
            <Card>{editable?<Field id="fulfilment-notes" label={t('fulfilmentNotes')}>
              <textarea id="fulfilment-notes" className="field" rows="3" value={notes}
                placeholder={t('fulfilmentPlaceholder')} onChange={e=>setNotes(e.target.value)}/></Field>:
              <><h3 className="font-bold mb-2">{t('fulfilmentNotes')}</h3><p>{order.fulfilment_notes||t('none')}</p></>}</Card></div>
          {editable&&<div className="action-bar no-print">
            <Button variant="secondary" className="full-phone" disabled={!!busy} onClick={()=>save(null)}>
              {busy==='detail'?t('saving'):t('saveDetails')}</Button>
            {nextStatus[order.status]&&<Button className="full-phone" disabled={!!busy} onClick={()=>save(nextStatus[order.status])}>
              {busy==='advance'?t('saving'):`${t('mark')} ${label(nextStatus[order.status])}`}</Button>}
          </div>}
        </section>;
      }
