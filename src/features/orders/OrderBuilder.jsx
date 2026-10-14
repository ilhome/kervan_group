import { useAppContext } from '../../context/AppContext.jsx';
import { Button, Card, Field, QuantityControl } from '../../components/ui.jsx';
import { CATEGORIES } from '../../utils/appData.js';
import Deadline from './Deadline.jsx';
import Basket from './Basket.jsx';

export default function OrderBuilder(){
        const { stock, setStep, t, validateDraft, setFirstChecked, setSecondChecked, role, branch, branchName, draftBranch, branches, setDraftBranch, draftDate, setDraftDate, draftPriority, setDraftPriority, label, draftNotes, setDraftNotes, draft, updateQuantity, calc, itemName, photoLabel, isMeat } = useAppContext();
        const catalogue=[...stock].sort((a,b)=>CATEGORIES.indexOf(a.category)-CATEGORIES.indexOf(b.category));
        return <section>
          <div className="row-between mb-4"><div><h2>{t('build')}</h2><p className="muted mt-1">{t('chooseSupplies')}</p></div>
            <Button variant="secondary" className="full-phone" onClick={()=>setStep('queue')}>← {t('backQueue')}</Button></div>
          <Deadline/>
          <form onSubmit={e=>{e.preventDefault();if(validateDraft()){setFirstChecked(false);setSecondChecked(false);setStep('check')}}}>
            <Card className="form-grid mb-4">
              <Field id="order-branch" label={`${t('branch')} *`}>
                {role==='store'?<input id="order-branch" className="field" value={branchName(branch)} readOnly/>:
                  <select id="order-branch" className="field" value={draftBranch} onChange={e=>setDraftBranch(e.target.value)}>
                    {branches.map(b=><option key={b.branch_id} value={b.branch_id}>{b.branch_name}</option>)}
                  </select>}
              </Field>
              <Field id="order-date" label={`${t('orderDate')} *`} type="date" required value={draftDate} onChange={e=>setDraftDate(e.target.value)}/>
              <Field id="order-priority" label={t('priority')}>
                <select id="order-priority" className="field" value={draftPriority} onChange={e=>setDraftPriority(e.target.value)}>
                  <option value="Normal">{t('normal')}</option><option value="Urgent">{t('urgent')}</option>
                </select>
              </Field>
            </Card>
            <div className="split-grid">
              <div>{CATEGORIES.map(category=>{
                const group=catalogue.filter(item=>item.category===category);
                return group.length?<Card key={category} className="mb-4">
                  <h3 className="font-bold pb-3 mb-3 border-b">{label(category)}</h3>
                  <div className="item-grid">{group.map(item=>{
                    const id=item.__backendId,meat=isMeat(item),kg=draft[`kg-${id}`]??'0',qty=draft[`qty-${id}`]??'0';
                    return <article key={id} className={`border border-[#e6ded2] rounded-xl p-4 min-w-0 ${!item.available?'opacity-60':''}`}>
                      {item.item_photo?<img src={item.item_photo} alt={photoLabel(item)} loading="lazy" className="w-full h-28 object-contain rounded-lg bg-[#f7f3eb] mb-3"/>:<div className="w-full h-28 rounded-lg bg-[#f1e7d5] mb-3 grid place-items-center muted text-sm">{t('noPhoto')}</div>}
                      <strong className="item-name">{itemName(item)}</strong>
                      <p className="small-meta mt-1">{item.available?`${item.current_stock} ${meat?t('kg'):item.unit} ${t('inStock')}`:t('unavailable')} · {item.supplier}</p>
                      {meat?<div className="meat-order-controls">
                        <QuantityControl id={`kg-${id}`} label={`${t('kgPerQuantity')} (${t('kg')})`} value={kg} step={0.5}
                          disabled={!item.available} onChange={value=>updateQuantity(`kg-${id}`,value)} t={t} compact/>
                        <QuantityControl id={`count-${id}`} label={t('quantityUnits')} value={qty}
                          disabled={!item.available} onChange={value=>updateQuantity(`qty-${id}`,value)} t={t} compact/>
                        <div className="calc-box meat-calc-box"><span className="block text-xs uppercase tracking-wide">{t('totalKg')}</span>{calc(kg,qty)}</div>
                      </div>:<div className="mt-4"><QuantityControl id={`count-${id}`} label={`${t('quantity')} (${item.unit||''})`}
                        value={draft[id]??'0'} disabled={!item.available} onChange={value=>updateQuantity(id,value)} t={t}/></div>}
                    </article>;
                  })}</div>
                </Card>:null;
              })}</div>
              <aside className="min-w-0"><Card className="lg:sticky lg:top-5"><h3 className="font-bold mb-3">{t('basket')}</h3><Basket/></Card></aside>
            </div>
            <Card className="mt-4"><Field id="order-notes" label={t('notesWarehouse')}>
              <textarea id="order-notes" className="field" rows="3" value={draftNotes} placeholder={t('instructions')}
                onChange={e=>setDraftNotes(e.target.value)}/></Field></Card>
            <div className="action-bar"><button className="btn primary full-phone" type="submit">{t('reviewOrder')} →</button></div>
          </form>
        </section>;
      }
