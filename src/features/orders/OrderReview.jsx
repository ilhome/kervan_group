import { useAppContext } from '../../context/AppContext.jsx';
import { Button, Card } from '../../components/ui.jsx';
import Basket from './Basket.jsx';

export default function Review(){
        const { step, secondChecked, firstChecked, setStep, setSecondChecked, setFirstChecked, t, branchName, role, branch, draftBranch, draftDate, label, draftPriority, draftNotes, submitOrder, busy, show } = useAppContext();
        const final=step==='final',checked=final?secondChecked:firstChecked;
        return <section className="max-w-4xl">
          <Button variant="ghost" className="mb-4" onClick={()=>{if(final){setStep('check');setSecondChecked(false)}else{setStep('build');setFirstChecked(false);setSecondChecked(false)}}}>
            ← {t(final?'backFirst':'editOrder')}
          </Button>
          <div className="border-l-4 border-[#b8914c] pl-4 mb-5">
            <p className="eyebrow">{t(final?'secondStep':'firstStep')}</p>
            <h2>{t(final?'finalReview':'checkQuantities')}</h2><p className="muted">{t(final?'secondCheck':'firstCheck')}</p>
          </div>
          <Card><p className="font-bold mb-3">{branchName(role==='store'?branch:draftBranch)} · {draftDate} · {label(draftPriority)}</p>
            <Basket review/><p className="text-sm mt-4"><strong>{t('notes')}:</strong> {draftNotes||t('none')}</p></Card>
          <div className="review-action mt-4">
            <label className="check-row"><input type="checkbox" checked={checked}
              onChange={e=>final?setSecondChecked(e.target.checked):setFirstChecked(e.target.checked)}/>
              <span>{t(final?'secondConfirm':'firstConfirm')}</span></label>
            <Button className="full-phone mt-3" disabled={!checked||busy==='submit'} onClick={()=>{
              if(final)submitOrder();else if(firstChecked){setSecondChecked(false);setStep('final')}else show(t('firstRequired'),true);
            }}>{busy==='submit'?t('saving'):t(final?'submitOrder':'continueFinal')}</Button>
          </div>
        </section>;
      }
