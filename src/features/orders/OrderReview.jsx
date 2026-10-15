import { useAppContext } from '../../context/AppContext.jsx';
import { Button, Card } from '../../components/ui.jsx';
import Basket from './Basket.jsx';

export default function Review(){
        const { step, secondChecked, firstChecked, setStep, setSecondChecked, setFirstChecked, t, branchName, role, branch, draftBranch, draftDate, label, draftPriority, draftNotes, submitOrder, busy, show } = useAppContext();
        const final=step==='final',checked=final?secondChecked:firstChecked;
        return <section className="daily-orders-page order-review-page">
          <Button variant="ghost" className="order-review-back" onClick={()=>{if(final){setStep('check');setSecondChecked(false)}else{setStep('build');setFirstChecked(false);setSecondChecked(false)}}}>
            ← {t(final?'backFirst':'editOrder')}
          </Button>
          <div className="order-review-heading">
            <p className="eyebrow">{t(final?'secondStep':'firstStep')}</p>
            <h2>{t(final?'finalReview':'checkQuantities')}</h2><p className="muted">{t(final?'secondCheck':'firstCheck')}</p>
          </div>
          <Card className="order-review-summary"><p className="order-review-meta">{branchName(role==='store'?branch:draftBranch)} <span>·</span> {draftDate} <span>·</span> {label(draftPriority)}</p>
            <Basket review/><p className="text-sm mt-4"><strong>{t('notes')}:</strong> {draftNotes||t('none')}</p></Card>
          <div className="review-action order-review-action">
            <label className="check-row"><input type="checkbox" checked={checked}
              onChange={e=>final?setSecondChecked(e.target.checked):setFirstChecked(e.target.checked)}/>
              <span>{t(final?'secondConfirm':'firstConfirm')}</span></label>
            <Button className="order-review-submit" disabled={!checked||busy==='submit'} onClick={()=>{
              if(final)submitOrder();else if(firstChecked){setSecondChecked(false);setStep('final')}else show(t('firstRequired'),true);
            }}>{busy==='submit'?t('saving'):t(final?'submitOrder':'continueFinal')}</Button>
          </div>
        </section>;
      }
