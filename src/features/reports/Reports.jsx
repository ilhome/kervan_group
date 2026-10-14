import { useAppContext } from '../../context/AppContext.jsx';
import { Badge, Card, Field } from '../../components/ui.jsx';
import { STATES, linesOf } from '../../utils/appData.js';

export function Reports(){
        const { orders, reportFilters, setReportFilters, t, branches, label } = useAppContext();
        const filtered=orders.filter(o=>(!reportFilters.start||o.order_date>=reportFilters.start)&&
          (!reportFilters.end||o.order_date<=reportFilters.end));
        const totals={};
        filtered.forEach(o=>linesOf(o).forEach(line=>{totals[line.name]=(totals[line.name]||0)+Number(line.qty||0)}));
        const popular=Object.entries(totals).sort((a,b)=>b[1]-a[1]).slice(0,5);
        const max=Math.max(1,...popular.map(([,n])=>n));
        return <section><h2 className="mb-4">{t('orderActivity')}</h2>
          <Card className="form-grid mb-4">
            <Field id="report-from" label={t('from')} type="date" value={reportFilters.start}
              onChange={e=>setReportFilters({...reportFilters,start:e.target.value})}/>
            <Field id="report-to" label={t('to')} type="date" value={reportFilters.end}
              onChange={e=>setReportFilters({...reportFilters,end:e.target.value})}/>
          </Card>
          <div className="grid-cards three-grid mb-4">
            {[[t('orders'),filtered.length],[t('requestedLines'),filtered.reduce((n,o)=>n+linesOf(o).length,0)],
              [t('completed'),filtered.filter(o=>o.status==='Completed').length]].map(([name,value])=>
              <Card key={name}><p className="muted">{name}</p><strong className="block text-3xl mt-2">{value}</strong></Card>)}
          </div>
          <div className="grid-cards">
            <Card><h3 className="font-bold mb-4">{t('mostRequested')}</h3>{popular.map(([name,value])=>
              <div key={name} className="mb-4"><div className="row-between text-sm mb-2"><span>{name}</span><strong>{value}</strong></div>
                <div className="bar"><span style={{width:`${value/max*100}%`}}/></div></div>)}
              {!popular.length&&<p className="muted">{t('noRangeOrders')}</p>}</Card>
            <Card><h3 className="font-bold mb-3">{t('branchTotals')}</h3>{branches.map(b=>
              <div className="line row-between text-sm" key={b.__backendId}><span>{b.branch_name}</span>
                <strong>{filtered.filter(o=>o.branch_id===b.branch_id).length}</strong></div>)}
              <h3 className="font-bold mt-6 mb-2">{t('fulfilmentStatus')}</h3>{STATES.map(s=>
                <div className="row-between py-1" key={s}><Badge>{label(s)}</Badge>
                  <strong>{filtered.filter(o=>o.status===s).length}</strong></div>)}</Card>
          </div>
        </section>;
      }

