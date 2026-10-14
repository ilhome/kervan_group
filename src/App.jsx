import { lazy, Suspense, useEffect, useMemo, useRef, useState } from 'react';
import dataSdk from './dataSdk';
import { AppProvider } from './context/AppContext.jsx';
import LoginPage from './components/LoginPage.jsx';
import Sidebar from './components/layout/Sidebar.jsx';
import Footer from './components/layout/Footer.jsx';
import RouteErrorBoundary from './components/RouteErrorBoundary.jsx';
import { Button, Card, Field } from './components/ui.jsx';
import { CATEGORIES, KEYS, PERMISSIONS, newRow, today, isDoner, isMeat, linesOf, validNumber, round } from './utils/appData.js';
import { authenticateDemoUser } from './auth/demoAuth.js';
import { EN, dictionaries } from './i18n/translations.js';
import { Dashboard } from './features/dashboard/Dashboard.jsx';
const Branches = lazy(() => import('./features/branches/Branches.jsx')
  .then(({ Branches: component }) => ({ default: component })));
const Deliveries = lazy(() => import('./features/deliveries/Deliveries.jsx')
  .then(({ Deliveries: component }) => ({ default: component })));
const Reports = lazy(() => import('./features/reports/Reports.jsx')
  .then(({ Reports: component }) => ({ default: component })));
const Settings = lazy(() => import('./features/settings/Settings.jsx')
  .then(({ Settings: component }) => ({ default: component })));
const Inventory = lazy(() => import('./features/inventory/Inventory.jsx')
  .then(({ Inventory: component }) => ({ default: component })));
const Orders = lazy(() => import('./features/orders/Orders.jsx'));

    function App(){
      const [lang,setLang]=useState(()=>{try{return dictionaries[localStorage.getItem('kervan-language')]?localStorage.getItem('kervan-language'):'en'}catch{return 'en'}});
      const [records,setRecords]=useState([]);
      const recordsRef=useRef([]);
      const [ready,setReady]=useState(false);
      const [loadError,setLoadError]=useState(false);
      const readyRef=useRef(false);
      const [identity,setIdentity]=useState(null);
      const role=identity?.role||'store';
      const [view,setView]=useState('dashboard');
      const [menuOpen,setMenuOpen]=useState(false);
      const menuButton=useRef(null);
      const branch=identity?.branchId||'1';
      const [selectedOrder,setSelectedOrder]=useState(null);
      const [step,setStep]=useState('queue');
      const [draft,setDraft]=useState({});
      const [draftDate,setDraftDate]=useState(today);
      const [draftBranch,setDraftBranch]=useState('1');
      const [draftPriority,setDraftPriority]=useState('Normal');
      const [draftNotes,setDraftNotes]=useState('');
      const [firstChecked,setFirstChecked]=useState(false);
      const [secondChecked,setSecondChecked]=useState(false);
      const [queueFilters,setQueueFilters]=useState({date:'',branch:'',status:''});
      const [invFilters,setInvFilters]=useState({search:'',category:''});
      const [reportFilters,setReportFilters]=useState({start:'',end:''});
      const [notice,setNotice]=useState(null);
      const noticeTimer=useRef(null);
      const [busy,setBusy]=useState('');
      const t=key=>dictionaries[lang]?.[key]||EN[key]||key;
      const label=value=>t(KEYS[value]||value);
      const rows=type=>records.filter(row=>row.type===type);
      const branches=useMemo(()=>rows('branch').sort((a,b)=>Number(a.branch_id)-Number(b.branch_id)),[records]);
      const stock=useMemo(()=>rows('inventory'),[records]);
      const orders=useMemo(()=>rows('order').sort((a,b)=>String(b.submitted_at).localeCompare(String(a.submitted_at))),[records]);
      const visibleOrders=useMemo(()=>orders.filter(order=>role!=='store'||order.branch_id===branch),[orders,role,branch]);
      const branchName=id=>branches.find(row=>row.branch_id===String(id))?.branch_name||`${t('branch')} ${id}`;
      const setting=(key,fallback)=>rows('setting').find(row=>row.setting_key===key)?.setting_value||fallback;
      const itemName=item=>isDoner(item)?t('donerMeat'):item.item_name;
      const photoLabel=item=>t('photoAlt').replace('{name}',itemName(item));
      const formatTime=value=>value?new Date(value).toLocaleString({en:'en-GB',ko:'ko-KR',tr:'tr-TR'}[lang],{month:'short',day:'numeric',hour:'numeric',minute:'2-digit'}):'—';
      const calc=(kg,qty)=>t('calculation').replace('{kg}',kg||0).replace('{qty}',qty||0).replace('{total}',round((Number(kg)||0)*(Number(qty)||0)));
      const selectedItems=useMemo(()=>stock.filter(item=>isMeat(item)?
        Number(draft[`kg-${item.__backendId}`])>0&&Number(draft[`qty-${item.__backendId}`])>0:
        Number(draft[item.__backendId])>0),[stock,draft]);
      const show=(message,error=false)=>{
        setNotice({message,error});clearTimeout(noticeTimer.current);
        noticeTimer.current=setTimeout(()=>setNotice(null),6500);
      };
      const commitRecords=next=>{recordsRef.current=next;setRecords(next)};
      const replaceLocal=updated=>commitRecords(recordsRef.current.map(row=>row.__backendId===updated.__backendId?updated:row));
      const write=async(method,row,key,message)=>{
        if(!readyRef.current){show(t('sheetUnavailable'),true);return false}
        setBusy(key);
        let result;
        try{result=await dataSdk[method](row)}catch{result={isOk:false}}
        setBusy('');
        if(!result?.isOk){show(t('saveFailed'),true);return false}
        if(method==='update')replaceLocal(row);
        show(message);return true;
      };
      useEffect(()=>{
        document.documentElement.lang=lang;
        try{localStorage.setItem('kervan-language',lang)}catch{}
      },[lang]);
      useEffect(()=>{
        let active=true;
        let unsubscribe=()=>{};
        (async()=>{
          try{
            const result=await dataSdk.init({onDataChanged(data){
              if(!active)return;
              commitRecords(data);
              setLoadError(false);
              readyRef.current=true;setReady(true);
            }});
            if(!active){result.unsubscribe?.();return}
            unsubscribe=result.unsubscribe||unsubscribe;
            if(!result.isOk&&active){
              readyRef.current=false;
              setReady(false);
              setLoadError(true);
              show(EN.loadFailed,true);
            }
            else if(active){readyRef.current=true;setReady(true)}
          }catch{if(active){
            readyRef.current=false;
            setReady(false);
            setLoadError(true);
            show(EN.loadFailed,true);
          }}
        })();
        return()=>{active=false;unsubscribe();clearTimeout(noticeTimer.current)};
      },[]);
      const navigate=next=>{
        if(!PERMISSIONS[role].includes(next)){show(t('restricted'),true);return}
        setView(next);setSelectedOrder(null);setMenuOpen(false);
        if(next==='orders')setStep('queue');
      };
      const login=(username,password)=>{
        const account=authenticateDemoUser(username,password,branches);
        if(!account)return false;
        setIdentity({username:account.username,role:account.role,branchId:account.branchId});
        setView(PERMISSIONS[account.role][0]);
        setSelectedOrder(null);
        setStep('queue');
        return true;
      };
      const logout=()=>{
        setIdentity(null);
        setSelectedOrder(null);
        setMenuOpen(false);
        setDraft({});
      };
      const startOrder=()=>{
        setDraft({});setDraftNotes('');setDraftDate(today);
        setDraftBranch(role==='store'?branch:(branches[0]?.branch_id||'1'));
        setDraftPriority('Normal');setFirstChecked(false);setSecondChecked(false);
        setSelectedOrder(null);setStep('build');setView('orders');
      };
      const updateQuantity=(key,value)=>{
        setDraft(previous=>({...previous,[key]:value}));
        setFirstChecked(false);setSecondChecked(false);
      };
      const validateDraft=()=>{
        if(!draftDate||!(role==='store'?branch:draftBranch)||!selectedItems.length){show(t('selectItem'),true);return false}
        if(Object.values(draft).some(value=>value!==''&&!validNumber(value))){show(t('invalidQuantity'),true);return false}
        return true;
      };
      const submitOrder=async()=>{
        if(!firstChecked||!secondChecked){show(t(!firstChecked?'firstRequired':'secondRequired'),true);return}
        if(!validateDraft())return;
        if(recordsRef.current.length>=999){show(t('limit'),true);return}
        const target=role==='store'?branch:draftBranch;
        const orderLines=selectedItems.map(item=>{
          if(isMeat(item)){
            const kg=Number(draft[`kg-${item.__backendId}`]),quantity=Number(draft[`qty-${item.__backendId}`]);
            const totalKg=round(kg*quantity);
            return {name:item.item_name,kgPerQuantity:kg,quantity,totalKg,qty:totalKg,approved:totalKg,unit:'kg',substitute:''};
          }
          const qty=Number(draft[item.__backendId]);
          return {name:item.item_name,qty,approved:qty,unit:item.unit,substitute:''};
        });
        const row=newRow({type:'order',branch_id:target,branch_name:branchName(target),order_date:draftDate,
          items_json:JSON.stringify(orderLines),notes:draftNotes,status:'Pending',priority:draftPriority,
          submitted_at:new Date().toISOString(),submitted_by:role==='store'?branchName(branch):role,delivery_status:'Assigned'});
        if(await write('create',row,'submit',t('submittedSuccess'))){
          setStep('queue');setDraft({});setFirstChecked(false);setSecondChecked(false);
        }
      };
      const nextStatus={Pending:'Approved',Approved:'Preparing',Preparing:'Ready',Ready:'Dispatched',Dispatched:'Completed'};
      const activeOrder=records.find(row=>row.__backendId===selectedOrder&&row.type==='order');
      const lowStock=useMemo(()=>stock.filter(item=>Number(item.current_stock)<=Number(item.reorder_threshold)||!item.available),[stock]);

      const roleKey={store:'store',warehouse:'warehouse',driver:'driverRole',admin:'admin'}[role];
      if(!identity)return <LoginPage t={t} branches={branches} onLogin={login} ready={ready} loadError={loadError}/>;
      const appContext={
        t,label,recordsRef,readyRef,role,view,setView,menuOpen,setMenuOpen,menuButton,
        branch,selectedOrder,setSelectedOrder,step,setStep,draft,setDraft,draftDate,setDraftDate,
        draftBranch,setDraftBranch,draftPriority,setDraftPriority,draftNotes,setDraftNotes,firstChecked,
        setFirstChecked,secondChecked,setSecondChecked,queueFilters,setQueueFilters,invFilters,setInvFilters,
        reportFilters,setReportFilters,notice,setNotice,ready,busy,setBusy,branches,stock,orders,visibleOrders,
        branchName,setting,itemName,photoLabel,formatTime,calc,selectedItems,show,commitRecords,replaceLocal,
        write,updateQuantity,validateDraft,submitOrder,nextStatus,activeOrder,lowStock,startOrder,
        navigate,lang,setLang,roleKey,CATEGORIES,newRow,validNumber,linesOf,isDoner,isMeat,
      };
      return <AppProvider value={appContext}><div className="app-frame">
        <div className="layout">
          <Sidebar role={role} view={view} menuOpen={menuOpen} menuButton={menuButton}
            t={t} navigate={navigate} setMenuOpen={setMenuOpen}/>
          <div className="main-area">
            <header className="topbar">
              <div className="topbar-inner">
                <div><p className="eyebrow">Kervan / {t(roleKey)}</p><h1>{t(view)}</h1></div>
                <div className="controls">
                  <Field id="language" label={t('language')}>
                    <select id="language" className="field" value={lang} onChange={e=>setLang(e.target.value)}>
                      <option value="en">English</option><option value="ko">한국어</option><option value="tr">Türkçe</option>
                    </select>
                  </Field>
                  <Button variant="secondary" onClick={logout}>{t('logout')}</Button>
                </div>
              </div>
            </header>
            <main className="workspace">
              {notice&&<div role="status" aria-live="polite" className={`notice ${notice.error?'error':'ok'}`}>{notice.message}</div>}
              {!ready&&<p className="small-meta mb-3">{t('saving')}</p>}
              <RouteErrorBoundary key={view} message={t('screenLoadFailed')} reloadLabel={t('reload')}>
                <Suspense fallback={<p className="route-loading" role="status" aria-live="polite">{t('loading')}</p>}>
                  {view==='dashboard'?<Dashboard/>:view==='orders'?<Orders/>:view==='inventory'?<Inventory/>:
                    view==='branches'?<Branches/>:view==='reports'?<Reports/>:view==='driver'?<Deliveries/>:<Settings/>}
                </Suspense>
              </RouteErrorBoundary>
            </main>
          </div>
        </div>
        <Footer/>
      </div></AppProvider>;
    }

export default App;
