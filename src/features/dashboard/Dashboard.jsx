import { useAppContext } from '../../context/AppContext.jsx';
import { Badge, Button, Card } from '../../components/ui.jsx';
import { today } from '../../utils/appData.js';
import Deadline from '../orders/Deadline.jsx';
import OrderCard from '../orders/OrderCard.jsx';

export function Dashboard(){
        const { lang, t, role, branch, branchName, startOrder, visibleOrders, lowStock, itemName, navigate, branches, label } = useAppContext();
        const daily=visibleOrders.filter(order=>order.order_date===today);
        const stats=[[t('todayOrders'),daily.length],[t('pendingApproval'),visibleOrders.filter(o=>o.status==='Pending').length],
          [t('preparingOrders'),visibleOrders.filter(o=>o.status==='Preparing').length],[t('readyOrders'),visibleOrders.filter(o=>o.status==='Ready').length]];
        return <section className="stack">
          <div className="row-between"><div><p className="small-meta">{new Date().toLocaleDateString({en:'en-GB',ko:'ko-KR',tr:'tr-TR'}[lang],{weekday:'long',month:'long',day:'numeric',year:'numeric'})}</p>
            <h2>{t('dashboard')}</h2>{role==='store'&&<p className="muted">{t('yourBranch')}: <strong>{branchName(branch)}</strong></p>}</div>
            {(role==='store'||role==='admin')&&<Button className="full-phone" onClick={startOrder}>＋ {t('newOrder')}</Button>}</div>
          {role==='store'&&<Deadline/>}
          <div className="stat-grid">{stats.map(([name,value])=><Card key={name}><p className="small-meta">{name}</p><strong className="text-3xl block mt-2">{value}</strong></Card>)}</div>
          <div className="grid-cards">
            <Card><h3 className="font-bold mb-4">{t('ordersByBranch')}</h3>{branches.filter(b=>role!=='store'||b.branch_id===branch).map(b=>{
              const n=visibleOrders.filter(o=>o.branch_id===b.branch_id).length;
              return <div key={b.__backendId} className="mb-4"><div className="row-between text-sm mb-2"><span>{b.branch_name}</span><strong>{n}</strong></div>
                <div className="bar"><span style={{width:`${Math.min(100,n/Math.max(1,visibleOrders.length)*100)}%`}}/></div></div>;
            })}</Card>
            <Card><h3 className="font-bold mb-3">{role==='store'?t('orderHistory'):t('stockAlerts')}</h3>
              {role==='store'?visibleOrders.slice(0,4).map(o=><div key={o.__backendId} className="line row-between text-sm"><span>{o.order_date}</span><Badge>{label(o.status)}</Badge></div>):
                <><p className="small-meta mb-2">{lowStock.length} {t('needsAttention')}</p>{lowStock.slice(0,6).map(i=><div key={i.__backendId} className="line row-between text-sm"><span>{itemName(i)}</span><strong>{i.available?`${i.current_stock} ${i.unit}`:t('unavailable')}</strong></div>)}</>}
              {!(role==='store'?visibleOrders.length:lowStock.length)&&<p className="muted py-5">{t(role==='store'?'noOrders':'healthy')}</p>}
            </Card>
          </div>
          <Card><div className="row-between mb-4"><h3 className="font-bold">{t('recentOrders')}</h3><Button variant="ghost" onClick={()=>navigate('orders')}>{t('viewQueue')} →</Button></div>
            <div className="stack">{visibleOrders.slice(0,5).map(o=><OrderCard key={o.__backendId} order={o}/>)}
              {!visibleOrders.length&&<p className="muted py-4">{t('noOrders')}</p>}</div></Card>
        </section>;
      }
