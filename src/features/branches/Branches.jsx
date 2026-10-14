import { useState } from 'react';
import { useAppContext } from '../../context/AppContext.jsx';
import { Badge, Field } from '../../components/ui.jsx';
import { DEMO_ACCOUNTS } from '../../auth/demoAuth.js';
import AddBranchForm from './AddBranchForm.jsx';

export function BranchCard({item}){
        const { t, show, write, busy } = useAppContext();
        const [name,setName]=useState(item.branch_name);
        const [contact,setContact]=useState(item.contact_person);
        const [phone,setPhone]=useState(item.contact_phone||'');
        const [route,setRoute]=useState(item.delivery_route);
        const [active,setActive]=useState(item.active);
        const save=async e=>{
          e.preventDefault();
          if(!name.trim()||!contact.trim()||!phone.trim()){show(t('branchRequired'),true);return}
          await write('update',{...item,branch_name:name.trim(),contact_person:contact.trim(),contact_phone:phone.trim(),
            delivery_route:route.trim(),active},`branch-${item.__backendId}`,t('branchUpdated'));
        };
        const demoAccount=DEMO_ACCOUNTS.find(account=>account.role==='store'&&account.branchId===item.branch_id);
        return <form className="panel p-4 sm:p-5 stack" onSubmit={save}>
          <div className="row-between"><h3 className="font-bold">{t('branch')} {item.branch_id}</h3><Badge>{t(active?'active':'inactive')}</Badge></div>
          <Field id={`name-${item.branch_id}`} label={t('branchName')} required value={name} onChange={e=>setName(e.target.value)}/>
          <Field id={`contact-${item.branch_id}`} label={t('contact')} required value={contact} onChange={e=>setContact(e.target.value)}/>
          <Field id={`phone-${item.branch_id}`} label={t('managerPhone')} type="tel" autoComplete="tel" required value={phone} onChange={e=>setPhone(e.target.value)}/>
          <Field id={`route-${item.branch_id}`} label={t('routeNotes')} value={route} onChange={e=>setRoute(e.target.value)}/>
          {(item.store_username||demoAccount)&&<p className="small-meta">{t('storeLoginName')}: {item.store_username||demoAccount.username}</p>}
          <label className="check-row"><input type="checkbox" checked={active} onChange={e=>setActive(e.target.checked)}/><span>{t('activeBranch')}</span></label>
          <button className="btn primary" disabled={!!busy} type="submit">{busy===`branch-${item.__backendId}`?t('saving'):t('saveBranch')}</button>
        </form>;
      }


export function Branches(){
        const { t, branches, role } = useAppContext();
        const [creating,setCreating]=useState(false);
        return <section><div className="row-between mb-4"><div><h2>{t('branchDirectory')}</h2><p className="muted">{t('branchHelp')}</p></div>
          {role==='admin'&&<button type="button" className="btn primary full-phone" onClick={()=>setCreating(value=>!value)}>
            {creating?t('cancel'):`＋ ${t('createBranch')}`}</button>}</div>
          {role==='admin'&&creating&&<AddBranchForm onCancel={()=>setCreating(false)}/>}
          <div className="grid-cards three-grid">{branches.map(item=><BranchCard key={item.__backendId} item={item}/>)}</div>
        </section>;
      }
