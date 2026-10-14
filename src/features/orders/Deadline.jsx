import { useAppContext } from '../../context/AppContext.jsx';
import { today } from '../../utils/appData.js';

export default function Deadline(){
        const { t, setting } = useAppContext();
        const deadline=setting('deadline','14:00');
        const passed=new Date()>new Date(`${today}T${deadline}:00`);
        return <div className="panel p-4 mb-4" style={{background:passed?'#fff1d7':'#eee5d5'}}>
          <strong>{t('cutoff')}: {deadline}</strong><p className="text-sm mt-1">{t(passed?'deadlinePassed':'deadlineAhead')}</p>
          <p className="small-meta mt-1">{t('deliveryDays')}: {setting('delivery_days','Monday, Tuesday, Wednesday, Thursday, Friday')}</p>
        </div>;
      }
