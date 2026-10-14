import { useState } from 'react';
import dataSdk from '../../dataSdk.js';
import { useAppContext } from '../../context/AppContext.jsx';
import { Card, Field } from '../../components/ui.jsx';
import { newRow } from '../../utils/appData.js';

export function Settings(){
        const { setting, recordsRef, readyRef, setBusy, replaceLocal, show, t, busy } = useAppContext();
        const [deadline,setDeadline]=useState(setting('deadline','14:00'));
        const [days,setDays]=useState(setting('delivery_days','Monday, Tuesday, Wednesday, Thursday, Friday'));
        const [defaultLang,setDefaultLang]=useState(setting('default_language','en'));
        const save=async e=>{
          e.preventDefault();
          if(!deadline||!days.trim()||!defaultLang){show(t('settingsRequired'),true);return}
          if(!readyRef.current){show(t('sheetUnavailable'),true);return}
          const values=[['deadline',deadline],['delivery_days',days.trim()],['default_language',defaultLang]];
          setBusy('settings');
          for(const [key,value] of values){
            const old=recordsRef.current.find(row=>row.type==='setting'&&row.setting_key===key);
            if(old?.setting_value===value)continue;
            let result;
            const change=old?{...old,setting_value:value}:newRow({type:'setting',setting_key:key,setting_value:value});
            try{result=await dataSdk[old?'update':'create'](change)}catch{result={isOk:false}}
            if(!result?.isOk){setBusy('');show(t('saveFailed'),true);return}
            if(old)replaceLocal(change);
          }
          setBusy('');show(t('settingsSaved'));
        };
        return <section className="max-w-2xl"><h2>{t('operatingSettings')}</h2><p className="muted mb-4">{t('settingsHelp')}</p>
          <form className="panel p-4 sm:p-5 stack" onSubmit={save}>
            <Field id="deadline" label={t('dailyDeadline')} type="time" required value={deadline} onChange={e=>setDeadline(e.target.value)}/>
            <Field id="delivery-days" label={t('deliveryDays')} required value={days} onChange={e=>setDays(e.target.value)}/>
            <Field id="default-language" label={t('defaultLanguage')}>
              <select id="default-language" className="field" value={defaultLang} onChange={e=>setDefaultLang(e.target.value)}>
                <option value="en">English</option><option value="ko">한국어</option><option value="tr">Türkçe</option>
              </select>
            </Field>
            <button type="submit" className="btn primary" disabled={!!busy}>{busy==='settings'?t('saving'):t('saveSettings')}</button>
          </form>
          <Card className="mt-4"><h3 className="font-bold mb-2">{t('roles')}</h3><p className="muted">{t('rolesHelp')}</p>
            <p className="text-sm mt-3">{['store','warehouse','driverRole','admin'].map(k=>t(k)).join(' · ')}</p>
            <p className="small-meta mt-3">{t('demoNotice')}</p></Card>
        </section>;
      }
