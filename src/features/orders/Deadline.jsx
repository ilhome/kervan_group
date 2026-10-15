import { useAppContext } from '../../context/AppContext.jsx';
import { today } from '../../utils/appData.js';

export default function Deadline(){
        const { t, setting } = useAppContext();
        const deadline=setting('deadline','14:00');
        const passed=new Date()>new Date(`${today}T${deadline}:00`);
        return <div className={`panel order-deadline${passed?' passed':''}`}>
          <div className="order-deadline-heading"><strong>{t('cutoff')}</strong><span>{deadline}</span></div>
          <p className="order-deadline-message">{t(passed?'deadlinePassed':'deadlineAhead')}</p>
          <p className="small-meta mt-1">{t('deliveryDays')}: {setting('delivery_days','Monday, Tuesday, Wednesday, Thursday, Friday')}</p>
        </div>;
      }
