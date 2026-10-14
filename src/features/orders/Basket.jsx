import { useAppContext } from '../../context/AppContext.jsx';

export default function Basket({review=false}){
        const { selectedItems, draft, isMeat, itemName, calc, t } = useAppContext();
        return <div className="stack">
          {selectedItems.map(item=>{
            const meat=isMeat(item),id=item.__backendId,kg=draft[`kg-${id}`],qty=draft[`qty-${id}`];
            return <div key={id} className="line row-between">
              <strong>{itemName(item)}</strong><span className="text-right">{meat?calc(kg,qty):`${draft[id]} ${item.unit||''}`}</span>
            </div>;
          })}
          {!selectedItems.length&&!review&&<p className="muted text-sm">{t('emptyBasket')}</p>}
        </div>;
      }
