import { useEffect, useRef, useState } from 'react';
import dataSdk from './dataSdk';

    const EN={
      dashboard:'Overview',orders:'Daily orders',inventory:'Inventory',branches:'Branches',reports:'Reports',settings:'Settings',driver:'Deliveries',
      store:'Store User',warehouse:'Warehouse Admin',driverRole:'Driver',admin:'System Admin',demoRole:'Demo role',language:'Language',yourBranch:'Assigned branch',
      tagline:'Daily supply, delivered with care.',demoNotice:'Demo roles preview different screens; they are not secure sign-in.',
      todayOrders:'Today’s orders',pendingApproval:'Pending approval',preparingOrders:'In preparation',readyOrders:'Ready for delivery',
      ordersByBranch:'Orders by branch',stockAlerts:'Low-stock alerts',healthy:'Stock levels look healthy.',recentOrders:'Recent orders',
      viewQueue:'View queue',newOrder:'New order',createOrder:'Create daily order',orderQueue:'Order queue',orderHistory:'Order history & status',
      orderDate:'Order date',branch:'Branch',status:'Status',allBranches:'All branches',allStatuses:'All statuses',view:'View',
      submitted:'Submitted',items:'Items',priority:'Priority',normal:'Normal',urgent:'Urgent',noOrders:'No orders match these filters.',
      cutoff:'Daily cut-off',deadlinePassed:'Today’s deadline has passed. You can still submit for warehouse review.',
      deadlineAhead:'Submit before the cut-off for same-day processing.',deliveryDays:'Delivery days',build:'Build a daily order',
      chooseSupplies:'Choose supplies and enter the quantity your kitchen needs.',backQueue:'Back to orders',quantity:'Quantity',
      inStock:'in stock',unavailable:'Unavailable',notesWarehouse:'Notes for warehouse',instructions:'Delivery instructions or special requests',
      basket:'Current basket',emptyBasket:'Choose items from the catalogue to start your basket.',reviewOrder:'Review order',
      checkQuantities:'Check quantities',firstCheck:'First check · Verify every item and quantity',
      firstConfirm:'I have checked each item and its quantity.',continueFinal:'Continue to final review',finalReview:'Final confirmation',
      secondCheck:'Second check · Confirm before submitting',secondConfirm:'I have checked the complete order a second time and approve submission.',
      submitOrder:'Submit order',editOrder:'Edit quantities',backFirst:'Back to first check',notes:'Notes',none:'None',
      selectItem:'Select a branch, date, and at least one item quantity.',invalidQuantity:'Enter valid quantities of zero or greater.',
      firstRequired:'Confirm the first quantity check to continue.',secondRequired:'Confirm the final quantity check before submitting.',
      submittedSuccess:'Order submitted to the warehouse.',limit:'The 999-record limit has been reached.',
      pickingList:'Picking list',print:'Print picking list',requested:'Requested',approved:'Approved',availabilitySub:'Availability / substitute',
      subPlaceholder:'Unavailable / substitute',branchNotes:'Branch notes',noNotes:'No notes added.',
      fulfilmentNotes:'Warehouse fulfilment notes',fulfilmentPlaceholder:'Shortages, substitutions, delivery notes',
      saveDetails:'Save quantities & notes',mark:'Mark',detailsSaved:'Fulfilment details saved.',orderMarked:'Order status updated.',
      stockCatalogue:'Stock catalogue',stockHelp:'Adjust on-hand quantities and flag unavailable supplies.',uploadPhoto:'Upload item photo',removePhoto:'Remove photo',replacePhoto:'Replace photo',noPhoto:'No photo added',photoAlt:'Photo of {name}',photoError:'Please choose a valid image file.',photoSaved:'Item photo saved.',
      searchItems:'Search items or suppliers',searchInventory:'Search inventory',category:'Category',allCategories:'All categories',
      currentStock:'Current stock',threshold:'Threshold',supplier:'Supplier',availability:'Availability',adjustStock:'Adjust stock',
      available:'Available',save:'Save',noInventory:'No inventory items match your search.',inventoryUpdated:'Inventory updated.',
      invalidStock:'Enter a valid non-negative stock quantity.',createStockItem:'Create new stock item',stockItemName:'Item name',stockUnit:'Unit of measure',stockDescription:'Notes or description',stockAvailability:'Available for ordering',createItem:'Create item',cancel:'Cancel',itemCreated:'Stock item created.',itemRequired:'Item name, category, and unit are required.',duplicateItem:'An item with this name already exists in this category.',categoryRequired:'Choose or enter a category.',customCategory:'New category',customCategoryPlaceholder:'Enter a new category',categoryChoice:'Category',branchDirectory:'Branch directory',
      branchHelp:'Manage branch names and delivery information.',branchName:'Branch name',contact:'Contact person',
      routeNotes:'Delivery route / address notes',activeBranch:'Active branch',active:'Active',inactive:'Inactive',
      saveBranch:'Save branch',branchUpdated:'Branch updated.',branchRequired:'Branch name and contact are required.',
      orderActivity:'Order activity',from:'From',to:'To',requestedLines:'Requested lines',completed:'Completed',
      mostRequested:'Most requested items',branchTotals:'Branch order totals',fulfilmentStatus:'Fulfilment status',
      noRangeOrders:'No orders in this date range.',operatingSettings:'Operating settings',
      settingsHelp:'Changes update order and delivery guidance across the app.',dailyDeadline:'Daily order deadline',
      defaultLanguage:'Default language for new visitors',saveSettings:'Save settings',settingsSaved:'Settings saved.',
      settingsRequired:'Complete all settings.',roles:'User roles',rolesHelp:'Use the demo role selector to preview each role. This is not authentication.',
      routeToday:'Assigned delivery route',deliveriesToday:'Deliveries for today',addressPlaceholder:'Address not provided — update branch delivery notes.',
      contactPlaceholder:'Contact not provided',orderSummary:'Order summary',deliveryStatus:'Delivery status',
      deliveryNotes:'Delivery notes or exception',deliveryPlaceholder:'Record delivery details or describe an exception',
      saveDelivery:'Save delivery update',deliverySaved:'Delivery update saved.',noDeliveries:'No deliveries assigned for today.',
      assigned:'Assigned',pickedUp:'Picked up',outForDelivery:'Out for delivery',delivered:'Delivered',exception:'Exception',
      pending:'Pending',approvedStatus:'Approved',preparing:'Preparing',ready:'Ready',dispatched:'Dispatched',completedStatus:'Completed',
      meat:'Meat',donerMeat:'Chicken döner',kg:'kg',kgPerQuantity:'Weight per unit',quantityUnits:'Quantity',totalKg:'Total kg',
      calculation:'{kg} kg per unit × {qty} = {total} kg total',decreaseKg:'Decrease weight per unit',
      increaseKg:'Increase weight per unit',decreaseQuantity:'Decrease quantity',increaseQuantity:'Increase quantity',
      bread:'Bread',vegetables:'Vegetables',sauces:'Sauces',dairy:'Dairy',drinks:'Drinks',packaging:'Packaging',cleaning:'Cleaning',
      saving:'Saving…',saveFailed:'Could not save. Please try again.',sheetUnavailable:'The Canva Sheet is not ready. Please try again.',
      loadFailed:'Could not connect to the Canva Sheet. Please reload.',restricted:'This screen is not available to this role.',
      orderMissing:'Order not found.',firstStep:'STEP 1 OF 2',secondStep:'STEP 2 OF 2',menu:'Open menu',closeMenu:'Close menu',
      addToOrder:'Add to order',totalOrders:'total orders',needsAttention:'items need attention'
    };
    const KO={
      dashboard:'개요',orders:'일일 주문',inventory:'재고',branches:'지점',reports:'보고서',settings:'설정',driver:'배송',
      store:'매장 직원',warehouse:'창고 관리자',driverRole:'배송 기사',admin:'시스템 관리자',demoRole:'체험 역할',language:'언어',yourBranch:'담당 지점',
      tagline:'매일 필요한 물품을 정성껏 배송합니다.',demoNotice:'체험 역할 선택은 화면만 변경하며 보안 로그인은 아닙니다.',
      todayOrders:'오늘의 주문',pendingApproval:'승인 대기',preparingOrders:'준비 중',readyOrders:'배송 준비 완료',
      ordersByBranch:'지점별 주문',stockAlerts:'재고 부족 알림',healthy:'재고 상태가 양호합니다.',recentOrders:'최근 주문',
      viewQueue:'주문 목록 보기',newOrder:'새 주문',createOrder:'일일 주문 만들기',orderQueue:'주문 목록',orderHistory:'주문 내역 및 상태',
      orderDate:'주문 날짜',branch:'지점',status:'상태',allBranches:'전체 지점',allStatuses:'전체 상태',view:'보기',
      submitted:'제출 시각',items:'품목',priority:'우선순위',normal:'일반',urgent:'긴급',noOrders:'조건에 맞는 주문이 없습니다.',
      cutoff:'일일 주문 마감',deadlinePassed:'오늘 마감 시간이 지났습니다. 창고 검토를 위해 주문을 제출할 수 있습니다.',
      deadlineAhead:'당일 처리를 원하면 마감 전에 제출하세요.',deliveryDays:'배송 요일',build:'일일 주문 작성',
      chooseSupplies:'필요한 물품과 수량을 선택하세요.',backQueue:'주문 목록으로',quantity:'수량',inStock:'재고',
      unavailable:'품절',notesWarehouse:'창고 전달 사항',instructions:'배송 안내 또는 특별 요청',
      basket:'현재 장바구니',emptyBasket:'카탈로그에서 품목을 선택하세요.',reviewOrder:'주문 검토',
      checkQuantities:'수량 확인',firstCheck:'첫 번째 확인 · 모든 품목과 수량 검토',
      firstConfirm:'각 품목과 수량을 확인했습니다.',continueFinal:'최종 검토로',finalReview:'최종 확인',
      secondCheck:'두 번째 확인 · 제출 전 재확인',secondConfirm:'전체 주문을 다시 확인했으며 제출에 동의합니다.',
      submitOrder:'주문 제출',editOrder:'수량 수정',backFirst:'첫 번째 확인으로',notes:'메모',none:'없음',
      selectItem:'지점과 날짜를 선택하고 품목 수량을 하나 이상 입력하세요.',invalidQuantity:'수량은 0 이상의 올바른 숫자여야 합니다.',
      firstRequired:'계속하려면 첫 번째 수량 확인에 동의하세요.',secondRequired:'제출하려면 최종 수량 확인에 동의하세요.',
      submittedSuccess:'주문을 창고에 제출했습니다.',limit:'저장 가능한 999건 한도에 도달했습니다.',
      pickingList:'피킹 목록',print:'피킹 목록 인쇄',requested:'요청 수량',approved:'승인 수량',
      availabilitySub:'재고 / 대체품',subPlaceholder:'품절 / 대체품',branchNotes:'지점 메모',noNotes:'메모가 없습니다.',
      fulfilmentNotes:'창고 처리 메모',fulfilmentPlaceholder:'부족 품목, 대체품, 배송 메모',
      saveDetails:'수량 및 메모 저장',detailsSaved:'처리 내용을 저장했습니다.',orderMarked:'주문 상태를 변경했습니다.',
      stockCatalogue:'재고 카탈로그',stockHelp:'보유 수량을 조정하고 품절 여부를 표시하세요.',uploadPhoto:'품목 사진 업로드',removePhoto:'사진 삭제',replacePhoto:'사진 교체',noPhoto:'등록된 사진 없음',photoAlt:'{name} 사진',photoError:'올바른 이미지 파일을 선택하세요.',photoSaved:'품목 사진을 저장했습니다.',
      searchItems:'품목 또는 공급업체 검색',searchInventory:'재고 검색',category:'분류',allCategories:'전체 분류',
      currentStock:'현재 재고',threshold:'재주문 기준',supplier:'공급업체',availability:'판매 가능 여부',
      adjustStock:'재고 조정',available:'이용 가능',save:'저장',noInventory:'검색 결과가 없습니다.',
      inventoryUpdated:'재고를 변경했습니다.',invalidStock:'0 이상의 올바른 재고 수량을 입력하세요.',createStockItem:'새 재고 품목 만들기',stockItemName:'품목명',stockUnit:'단위',stockDescription:'메모 또는 설명',stockAvailability:'주문 가능',createItem:'품목 만들기',cancel:'취소',itemCreated:'재고 품목을 만들었습니다.',itemRequired:'품목명, 분류, 단위를 입력하세요.',duplicateItem:'같은 분류에 같은 이름의 품목이 이미 있습니다.',categoryRequired:'분류를 선택하거나 입력하세요.',customCategory:'새 분류',customCategoryPlaceholder:'새 분류 입력',categoryChoice:'분류',
      branchDirectory:'지점 목록',branchHelp:'지점 이름과 배송 정보를 관리하세요.',branchName:'지점 이름',
      contact:'담당자',routeNotes:'배송 경로 / 주소 안내',activeBranch:'운영 중인 지점',active:'운영 중',
      inactive:'운영 중지',saveBranch:'지점 저장',branchUpdated:'지점 정보를 변경했습니다.',
      branchRequired:'지점 이름과 담당자를 입력하세요.',orderActivity:'주문 현황',from:'시작일',to:'종료일',
      requestedLines:'요청 품목 수',completed:'완료',mostRequested:'많이 주문한 품목',branchTotals:'지점별 주문 합계',
      fulfilmentStatus:'처리 상태',noRangeOrders:'해당 기간에 주문이 없습니다.',operatingSettings:'운영 설정',
      settingsHelp:'주문 마감과 배송 안내를 앱 전체에 적용합니다.',dailyDeadline:'일일 주문 마감 시간',
      defaultLanguage:'신규 방문자 기본 언어',saveSettings:'설정 저장',settingsSaved:'설정을 저장했습니다.',
      settingsRequired:'모든 설정을 입력하세요.',roles:'사용자 역할',rolesHelp:'체험 선택기로 역할별 화면을 확인할 수 있습니다. 실제 인증 기능은 아닙니다.',
      routeToday:'담당 배송 경로',deliveriesToday:'오늘의 배송',addressPlaceholder:'주소 정보 없음 — 지점 배송 메모를 수정하세요.',
      contactPlaceholder:'담당자 정보 없음',orderSummary:'주문 요약',deliveryStatus:'배송 상태',
      deliveryNotes:'배송 메모 또는 예외 사항',deliveryPlaceholder:'배송 내용이나 예외 사항을 기록하세요',
      saveDelivery:'배송 정보 저장',deliverySaved:'배송 정보를 저장했습니다.',noDeliveries:'오늘 배정된 배송이 없습니다.',
      assigned:'배정됨',pickedUp:'픽업 완료',outForDelivery:'배송 중',delivered:'배송 완료',exception:'예외 발생',
      pending:'대기',approvedStatus:'승인',preparing:'준비 중',ready:'준비 완료',dispatched:'출발',completedStatus:'완료',
      meat:'육류',donerMeat:'치킨 도너',kgPerQuantity:'개당 무게',quantityUnits:'수량',totalKg:'총 kg',
      calculation:'개당 {kg} kg × {qty}개 = 총 {total} kg',decreaseKg:'개당 무게 줄이기',
      increaseKg:'개당 무게 늘리기',decreaseQuantity:'수량 줄이기',increaseQuantity:'수량 늘리기',
      bread:'빵',vegetables:'채소',sauces:'소스',dairy:'유제품',drinks:'음료',packaging:'포장재',cleaning:'청소용품',
      saving:'저장 중…',saveFailed:'저장하지 못했습니다. 다시 시도하세요.',sheetUnavailable:'Canva 시트가 준비되지 않았습니다.',
      loadFailed:'Canva 시트에 연결할 수 없습니다. 새로고침하세요.',restricted:'이 역할에서는 해당 화면을 볼 수 없습니다.',
      orderMissing:'주문을 찾을 수 없습니다.',firstStep:'1 / 2단계',secondStep:'2 / 2단계',menu:'메뉴 열기',
      closeMenu:'메뉴 닫기',addToOrder:'주문에 추가',totalOrders:'건의 주문',needsAttention:'개 품목 확인 필요'
    };
    const TR={
      dashboard:'Genel bakış',orders:'Günlük siparişler',inventory:'Stok',branches:'Şubeler',reports:'Raporlar',
      settings:'Ayarlar',driver:'Teslimatlar',store:'Mağaza Kullanıcısı',warehouse:'Depo Yöneticisi',
      driverRole:'Sürücü',admin:'Sistem Yöneticisi',demoRole:'Demo rolü',language:'Dil',yourBranch:'Atanan şube',
      tagline:'Günlük tedarik, özenle teslim.',demoNotice:'Demo rolü yalnızca görünümü değiştirir; güvenli oturum açma değildir.',
      todayOrders:'Bugünkü siparişler',pendingApproval:'Onay bekliyor',preparingOrders:'Hazırlanıyor',
      readyOrders:'Teslimata hazır',ordersByBranch:'Şubelere göre siparişler',stockAlerts:'Düşük stok uyarıları',
      healthy:'Stok seviyeleri iyi durumda.',recentOrders:'Son siparişler',viewQueue:'Siparişleri gör',
      newOrder:'Yeni sipariş',createOrder:'Günlük sipariş oluştur',orderQueue:'Sipariş listesi',
      orderHistory:'Sipariş geçmişi ve durumu',orderDate:'Sipariş tarihi',branch:'Şube',status:'Durum',
      allBranches:'Tüm şubeler',allStatuses:'Tüm durumlar',view:'Görüntüle',submitted:'Gönderilme',
      items:'Ürünler',priority:'Öncelik',normal:'Normal',urgent:'Acil',noOrders:'Filtrelere uygun sipariş yok.',
      cutoff:'Günlük son saat',deadlinePassed:'Bugünün son saati geçti. Siparişi depo incelemesine gönderebilirsiniz.',
      deadlineAhead:'Aynı gün işlem için son saatten önce gönderin.',deliveryDays:'Teslimat günleri',
      build:'Günlük sipariş hazırla',chooseSupplies:'Mutfağınız için gerekli ürünleri ve miktarları seçin.',
      backQueue:'Siparişlere dön',quantity:'Miktar',inStock:'stokta',unavailable:'Mevcut değil',
      notesWarehouse:'Depoya notlar',instructions:'Teslimat talimatları veya özel istekler',
      basket:'Güncel sepet',emptyBasket:'Sepete eklemek için katalogdan ürün seçin.',reviewOrder:'Siparişi gözden geçir',
      checkQuantities:'Miktarları kontrol et',firstCheck:'İlk kontrol · Her ürünü ve miktarını doğrulayın',
      firstConfirm:'Her ürünü ve miktarını kontrol ettim.',continueFinal:'Son incelemeye geç',
      finalReview:'Son onay',secondCheck:'İkinci kontrol · Göndermeden önce onaylayın',
      secondConfirm:'Siparişin tamamını ikinci kez kontrol ettim ve gönderilmesini onaylıyorum.',
      submitOrder:'Siparişi gönder',editOrder:'Miktarları düzenle',backFirst:'İlk kontrole dön',notes:'Notlar',
      none:'Yok',selectItem:'Şube, tarih ve en az bir ürün miktarı seçin.',
      invalidQuantity:'Miktarlar sıfır veya daha büyük geçerli sayılar olmalıdır.',
      firstRequired:'Devam etmek için ilk miktar kontrolünü onaylayın.',
      secondRequired:'Göndermeden önce son miktar kontrolünü onaylayın.',
      submittedSuccess:'Sipariş depoya gönderildi.',limit:'999 kayıt sınırına ulaşıldı.',
      pickingList:'Toplama listesi',print:'Toplama listesini yazdır',requested:'Talep edilen',
      approved:'Onaylanan',availabilitySub:'Stok / alternatif',subPlaceholder:'Mevcut değil / alternatif',
      branchNotes:'Şube notları',noNotes:'Not eklenmedi.',fulfilmentNotes:'Depo hazırlık notları',
      fulfilmentPlaceholder:'Eksikler, alternatifler, teslimat notları',saveDetails:'Miktarları ve notları kaydet',
      detailsSaved:'Hazırlık bilgileri kaydedildi.',orderMarked:'Sipariş durumu güncellendi.',
      stockCatalogue:'Stok kataloğu',stockHelp:'Eldeki miktarları ayarlayın ve mevcut olmayan ürünleri işaretleyin.',uploadPhoto:'Ürün fotoğrafı yükle',removePhoto:'Fotoğrafı kaldır',replacePhoto:'Fotoğrafı değiştir',noPhoto:'Fotoğraf eklenmedi',photoAlt:'{name} fotoğrafı',photoError:'Lütfen geçerli bir görsel dosyası seçin.',photoSaved:'Ürün fotoğrafı kaydedildi.',
      searchItems:'Ürün veya tedarikçi ara',searchInventory:'Stokta ara',category:'Kategori',
      allCategories:'Tüm kategoriler',currentStock:'Mevcut stok',threshold:'Yeniden sipariş eşiği',
      supplier:'Tedarikçi',availability:'Bulunabilirlik',adjustStock:'Stok ayarla',available:'Mevcut',
      save:'Kaydet',noInventory:'Aramanızla eşleşen ürün yok.',inventoryUpdated:'Stok güncellendi.',
      invalidStock:'Sıfır veya daha büyük geçerli bir stok miktarı girin.',createStockItem:'Yeni stok ürünü oluştur',stockItemName:'Ürün adı',stockUnit:'Ölçü birimi',stockDescription:'Notlar veya açıklama',stockAvailability:'Siparişe açık',createItem:'Ürün oluştur',cancel:'İptal',itemCreated:'Stok ürünü oluşturuldu.',itemRequired:'Ürün adı, kategori ve birim gereklidir.',duplicateItem:'Bu kategoride aynı ada sahip bir ürün zaten var.',categoryRequired:'Bir kategori seçin veya girin.',customCategory:'Yeni kategori',customCategoryPlaceholder:'Yeni kategori girin',categoryChoice:'Kategori',branchDirectory:'Şube rehberi',
      branchHelp:'Şube adlarını ve teslimat bilgilerini yönetin.',branchName:'Şube adı',contact:'İlgili kişi',
      routeNotes:'Teslimat güzergâhı / adres notları',activeBranch:'Aktif şube',active:'Aktif',
      inactive:'Pasif',saveBranch:'Şubeyi kaydet',branchUpdated:'Şube güncellendi.',
      branchRequired:'Şube adı ve ilgili kişi gerekli.',orderActivity:'Sipariş etkinliği',
      from:'Başlangıç',to:'Bitiş',requestedLines:'Talep edilen kalemler',completed:'Tamamlandı',
      mostRequested:'En çok istenen ürünler',branchTotals:'Şube sipariş toplamları',
      fulfilmentStatus:'Hazırlık durumu',noRangeOrders:'Bu tarih aralığında sipariş yok.',
      operatingSettings:'İşletme ayarları',settingsHelp:'Değişiklikler sipariş son saatini ve teslimat bilgisini günceller.',
      dailyDeadline:'Günlük sipariş son saati',defaultLanguage:'Yeni ziyaretçilerin varsayılan dili',
      saveSettings:'Ayarları kaydet',settingsSaved:'Ayarlar kaydedildi.',settingsRequired:'Tüm ayarları doldurun.',
      roles:'Kullanıcı rolleri',rolesHelp:'Her rolü görmek için demo seçiciyi kullanın. Bu bir kimlik doğrulama sistemi değildir.',
      routeToday:'Atanan teslimat güzergâhı',deliveriesToday:'Bugünkü teslimatlar',
      addressPlaceholder:'Adres yok — şube teslimat notlarını güncelleyin.',contactPlaceholder:'İlgili kişi belirtilmedi',
      orderSummary:'Sipariş özeti',deliveryStatus:'Teslimat durumu',deliveryNotes:'Teslimat notu veya istisna',
      deliveryPlaceholder:'Teslimat ayrıntılarını veya bir istisnayı yazın',saveDelivery:'Teslimatı kaydet',
      deliverySaved:'Teslimat güncellendi.',noDeliveries:'Bugün atanmış teslimat yok.',
      assigned:'Atandı',pickedUp:'Teslim alındı',outForDelivery:'Dağıtımda',delivered:'Teslim edildi',
      exception:'İstisna',pending:'Bekliyor',approvedStatus:'Onaylandı',preparing:'Hazırlanıyor',
      ready:'Hazır',dispatched:'Yola çıktı',completedStatus:'Tamamlandı',meat:'Et',donerMeat:'Tavuk döner',
      kgPerQuantity:'Birim ağırlığı',quantityUnits:'Miktar',totalKg:'Toplam kg',
      calculation:'Birim başına {kg} kg × {qty} = toplam {total} kg',decreaseKg:'Birim ağırlığını azalt',
      increaseKg:'Birim ağırlığını artır',decreaseQuantity:'Miktarı azalt',increaseQuantity:'Miktarı artır',
      bread:'Ekmek',vegetables:'Sebze',sauces:'Soslar',dairy:'Süt ürünleri',drinks:'İçecekler',
      packaging:'Ambalaj',cleaning:'Temizlik',saving:'Kaydediliyor…',
      saveFailed:'Kaydedilemedi. Lütfen tekrar deneyin.',sheetUnavailable:'Canva Sheet hazır değil.',
      loadFailed:'Canva Sheet bağlantısı kurulamadı. Lütfen yenileyin.',
      restricted:'Bu rol bu ekranı görüntüleyemez.',orderMissing:'Sipariş bulunamadı.',
      firstStep:'1 / 2. ADIM',secondStep:'2 / 2. ADIM',menu:'Menüyü aç',closeMenu:'Menüyü kapat',
      addToOrder:'Siparişe ekle',totalOrders:'sipariş',needsAttention:'ürün ilgilenilmeyi bekliyor'
    };
    const dictionaries={en:EN,ko:KO,tr:TR};
    const CATEGORIES=['Meat','Bread','Vegetables','Sauces','Dairy','Drinks','Packaging','Cleaning'];
    const STATES=['Pending','Approved','Preparing','Ready','Dispatched','Completed'];
    const DELIVERY_STATES=['Assigned','Picked up','Out for delivery','Delivered','Exception'];
    const KEYS={Meat:'meat',Bread:'bread',Vegetables:'vegetables',Sauces:'sauces',Dairy:'dairy',Drinks:'drinks',Packaging:'packaging',Cleaning:'cleaning',
      Pending:'pending',Approved:'approvedStatus',Preparing:'preparing',Ready:'ready',Dispatched:'dispatched',Completed:'completedStatus',
      Assigned:'assigned','Picked up':'pickedUp','Out for delivery':'outForDelivery',Delivered:'delivered',Exception:'exception',
      Normal:'normal',Urgent:'urgent'};
    const NAV={dashboard:'▦',orders:'▤',inventory:'▣',driver:'▱',branches:'⌂',reports:'▥',settings:'⚙'};
    const PERMISSIONS={store:['dashboard','orders'],warehouse:['dashboard','orders','inventory','reports'],
      driver:['driver'],admin:['dashboard','orders','inventory','driver','branches','reports','settings']};
    const BLANK={type:'',branch_id:'',branch_name:'',order_date:'',items_json:'',notes:'',status:'',priority:'',
      submitted_at:'',submitted_by:'',fulfilment_notes:'',item_name:'',category:'',unit:'',current_stock:0,
      reorder_threshold:0,supplier:'',available:true,contact_person:'',delivery_route:'',active:true,
      setting_key:'',setting_value:'',driver_notes:'',delivery_status:''};
    const newRow=value=>({...BLANK,...value});
    const dateKey=d=>{const x=new Date(d);return `${x.getFullYear()}-${String(x.getMonth()+1).padStart(2,'0')}-${String(x.getDate()).padStart(2,'0')}`};
    const today=dateKey(new Date());
    const isDoner=item=>/döner|doner/i.test(String(item?.item_name||''));
    const linesOf=order=>{try{const value=JSON.parse(order.items_json||'[]');return Array.isArray(value)?value:[]}catch{return []}};
    const validNumber=value=>value!==''&&Number.isFinite(Number(value))&&Number(value)>=0;
    const round=value=>Math.round(value*100)/100;
    function Field({id,label,children,...props}){return <div><label className="label" htmlFor={id}>{label}</label>{children||<input id={id} className="field" {...props}/>}</div>}
    function Button({children,variant='primary',className='',...props}){return <button type="button" className={`btn ${variant} ${className}`} {...props}>{children}</button>}
    function Badge({children}){return <span className="badge">{children}</span>}
    function Card({children,className=''}){return <div className={`panel p-4 sm:p-5 ${className}`}>{children}</div>}
    function QuantityControl({id,label,value,step=1,disabled,onChange,t}){
      const n=Number(value)||0;
      return <div>
        <label className="label" htmlFor={id}>{label}</label>
        <div className="quantity-row">
          <button type="button" disabled={disabled} aria-label={`${t('decreaseQuantity')}: ${label}`} onClick={()=>onChange(String(Math.max(0,round(n-step))))}>−</button>
          <input id={id} className="field" inputMode="decimal" type="number" min="0" step={step} disabled={disabled}
            value={value} onChange={e=>onChange(e.target.value)}/>
          <button type="button" disabled={disabled} aria-label={`${t('increaseQuantity')}: ${label}`} onClick={()=>onChange(String(round(n+step)))}>+</button>
        </div>
      </div>
    }

    function App(){
      const [lang,setLang]=useState(()=>{try{return dictionaries[localStorage.getItem('kervan-language')]?localStorage.getItem('kervan-language'):'en'}catch{return 'en'}});
      const [records,setRecords]=useState([]);
      const recordsRef=useRef([]);
      const [ready,setReady]=useState(false);
      const readyRef=useRef(false);
      const [role,setRole]=useState('store');
      const [view,setView]=useState('dashboard');
      const [menuOpen,setMenuOpen]=useState(false);
      const menuButton=useRef(null);
      const [branch,setBranch]=useState('1');
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
      const branches=rows('branch').sort((a,b)=>Number(a.branch_id)-Number(b.branch_id));
      const stock=rows('inventory');
      const orders=rows('order').sort((a,b)=>String(b.submitted_at).localeCompare(String(a.submitted_at)));
      const visibleOrders=orders.filter(order=>role!=='store'||order.branch_id===branch);
      const branchName=id=>branches.find(row=>row.branch_id===String(id))?.branch_name||`${t('branch')} ${id}`;
      const setting=(key,fallback)=>rows('setting').find(row=>row.setting_key===key)?.setting_value||fallback;
      const itemName=item=>isDoner(item)?t('donerMeat'):item.item_name;
      const photoLabel=item=>t('photoAlt').replace('{name}',itemName(item));
      const formatTime=value=>value?new Date(value).toLocaleString({en:'en-GB',ko:'ko-KR',tr:'tr-TR'}[lang],{month:'short',day:'numeric',hour:'numeric',minute:'2-digit'}):'—';
      const calc=(kg,qty)=>t('calculation').replace('{kg}',kg||0).replace('{qty}',qty||0).replace('{total}',round((Number(kg)||0)*(Number(qty)||0)));
      const selectedItems=stock.filter(item=>isDoner(item)?
        Number(draft[`kg-${item.__backendId}`])>0&&Number(draft[`qty-${item.__backendId}`])>0:
        Number(draft[item.__backendId])>0);
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
              readyRef.current=true;setReady(true);
            }});
            if(!active){result.unsubscribe?.();return}
            unsubscribe=result.unsubscribe||unsubscribe;
            if(!result.isOk&&active)show(EN.loadFailed,true);
            else if(active){readyRef.current=true;setReady(true)}
          }catch{if(active)show(EN.loadFailed,true)}
        })();
        return()=>{active=false;unsubscribe();clearTimeout(noticeTimer.current)};
      },[]);
      useEffect(()=>{
        if(!menuOpen)return;
        const close=e=>{if(e.key==='Escape'){setMenuOpen(false);menuButton.current?.focus()}};
        document.addEventListener('keydown',close);
        return()=>document.removeEventListener('keydown',close);
      },[menuOpen]);
      const navigate=next=>{
        if(!PERMISSIONS[role].includes(next)){show(t('restricted'),true);return}
        setView(next);setSelectedOrder(null);setMenuOpen(false);
        if(next==='orders')setStep('queue');
      };
      const changeRole=next=>{
        setRole(next);setView(PERMISSIONS[next][0]);setSelectedOrder(null);setStep('queue');setMenuOpen(false);
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
          if(isDoner(item)){
            const kg=Number(draft[`kg-${item.__backendId}`]),quantity=Number(draft[`qty-${item.__backendId}`]);
            const totalKg=round(kg*quantity);
            return {name:item.item_name,kgPerQuantity:kg,quantity,totalKg,qty:totalKg,approved:totalKg,unit:item.unit,substitute:''};
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
      const lowStock=stock.filter(item=>Number(item.current_stock)<=Number(item.reorder_threshold)||!item.available);

      function Deadline(){
        const deadline=setting('deadline','14:00');
        const passed=new Date()>new Date(`${today}T${deadline}:00`);
        return <div className="panel p-4 mb-4" style={{background:passed?'#fff1d7':'#eee5d5'}}>
          <strong>{t('cutoff')}: {deadline}</strong><p className="text-sm mt-1">{t(passed?'deadlinePassed':'deadlineAhead')}</p>
          <p className="small-meta mt-1">{t('deliveryDays')}: {setting('delivery_days','Monday, Tuesday, Wednesday, Thursday, Friday')}</p>
        </div>;
      }
      function OrderCard({order}){
        return <article className="panel p-4 order-card">
          <div className="min-w-0">
            <div className="row-between"><strong>{branchName(order.branch_id)}</strong><Badge>{label(order.status||'Pending')}</Badge></div>
            <p className="small-meta mt-2">{t('orderDate')}: {order.order_date} · {t('submitted')}: {formatTime(order.submitted_at)}</p>
            <p className="small-meta mt-1">{t('items')}: {linesOf(order).length} · {t('priority')}: {label(order.priority||'Normal')}</p>
          </div>
          <Button variant="secondary" className="full-phone self-end no-print" onClick={()=>{setSelectedOrder(order.__backendId);setView('orders');setStep('queue')}}>{t('view')} →</Button>
        </article>;
      }
      function Dashboard(){
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
      function Basket({review=false}){
        return <div className="stack">
          {selectedItems.map(item=>{
            const doner=isDoner(item),id=item.__backendId,kg=draft[`kg-${id}`],qty=draft[`qty-${id}`];
            return <div key={id} className="line row-between">
              <strong>{itemName(item)}</strong><span className="text-right">{doner?calc(kg,qty):`${draft[id]} ${item.unit||''}`}</span>
            </div>;
          })}
          {!selectedItems.length&&!review&&<p className="muted text-sm">{t('emptyBasket')}</p>}
        </div>;
      }
      function OrderBuilder(){
        const catalogue=[...stock].sort((a,b)=>CATEGORIES.indexOf(a.category)-CATEGORIES.indexOf(b.category));
        return <section>
          <div className="row-between mb-4"><div><h2>{t('build')}</h2><p className="muted mt-1">{t('chooseSupplies')}</p></div>
            <Button variant="secondary" className="full-phone" onClick={()=>setStep('queue')}>← {t('backQueue')}</Button></div>
          <Deadline/>
          <form onSubmit={e=>{e.preventDefault();if(validateDraft()){setFirstChecked(false);setSecondChecked(false);setStep('check')}}}>
            <Card className="form-grid mb-4">
              <Field id="order-branch" label={`${t('branch')} *`}>
                <select id="order-branch" className="field" value={role==='store'?branch:draftBranch} disabled={role==='store'}
                  onChange={e=>setDraftBranch(e.target.value)}>
                  {branches.map(b=><option key={b.branch_id} value={b.branch_id}>{b.branch_name}</option>)}
                </select>
              </Field>
              <Field id="order-date" label={`${t('orderDate')} *`} type="date" required value={draftDate} onChange={e=>setDraftDate(e.target.value)}/>
              <Field id="order-priority" label={t('priority')}>
                <select id="order-priority" className="field" value={draftPriority} onChange={e=>setDraftPriority(e.target.value)}>
                  <option value="Normal">{t('normal')}</option><option value="Urgent">{t('urgent')}</option>
                </select>
              </Field>
            </Card>
            <div className="split-grid">
              <div>{CATEGORIES.map(category=>{
                const group=catalogue.filter(item=>item.category===category);
                return group.length?<Card key={category} className="mb-4">
                  <h3 className="font-bold pb-3 mb-3 border-b">{label(category)}</h3>
                  <div className="item-grid">{group.map(item=>{
                    const id=item.__backendId,doner=isDoner(item),kg=draft[`kg-${id}`]??'0',qty=draft[`qty-${id}`]??'0';
                    return <article key={id} className={`border border-[#e6ded2] rounded-xl p-4 min-w-0 ${!item.available?'opacity-60':''}`}>
                      {item.item_photo?<img src={item.item_photo} alt={photoLabel(item)} loading="lazy" className="w-full h-28 object-contain rounded-lg bg-[#f7f3eb] mb-3"/>:<div className="w-full h-28 rounded-lg bg-[#f1e7d5] mb-3 grid place-items-center muted text-sm">{t('noPhoto')}</div>}
                      <strong className="item-name">{itemName(item)}</strong>
                      <p className="small-meta mt-1">{item.available?`${item.current_stock} ${doner?t('kg'):item.unit} ${t('inStock')}`:t('unavailable')} · {item.supplier}</p>
                      {doner?<div className="stack mt-4">
                        <QuantityControl id={`kg-${id}`} label={`${t('kgPerQuantity')} (${t('kg')})`} value={kg} step={0.5}
                          disabled={!item.available} onChange={value=>updateQuantity(`kg-${id}`,value)} t={t}/>
                        <QuantityControl id={`count-${id}`} label={t('quantityUnits')} value={qty}
                          disabled={!item.available} onChange={value=>updateQuantity(`qty-${id}`,value)} t={t}/>
                        <div className="calc-box"><span className="block text-xs uppercase tracking-wide">{t('totalKg')}</span>{calc(kg,qty)}</div>
                      </div>:<div className="mt-4"><QuantityControl id={`count-${id}`} label={`${t('quantity')} (${item.unit||''})`}
                        value={draft[id]??'0'} disabled={!item.available} onChange={value=>updateQuantity(id,value)} t={t}/></div>}
                    </article>;
                  })}</div>
                </Card>:null;
              })}</div>
              <aside className="min-w-0"><Card className="lg:sticky lg:top-5"><h3 className="font-bold mb-3">{t('basket')}</h3><Basket/></Card></aside>
            </div>
            <Card className="mt-4"><Field id="order-notes" label={t('notesWarehouse')}>
              <textarea id="order-notes" className="field" rows="3" value={draftNotes} placeholder={t('instructions')}
                onChange={e=>setDraftNotes(e.target.value)}/></Field></Card>
            <div className="action-bar"><button className="btn primary full-phone" type="submit">{t('reviewOrder')} →</button></div>
          </form>
        </section>;
      }
      function Review(){
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
      function Orders(){
        const filtered=visibleOrders.filter(o=>(!queueFilters.date||o.order_date===queueFilters.date)&&
          (!queueFilters.branch||o.branch_id===queueFilters.branch)&&(!queueFilters.status||o.status===queueFilters.status));
        if(selectedOrder)return <OrderDetail key={selectedOrder} order={activeOrder}/>;
        if(step==='build')return <OrderBuilder/>;
        if(step==='check'||step==='final')return <Review/>;
        return <section>
          <div className="row-between mb-4"><div><h2>{t(role==='store'?'orderHistory':'orderQueue')}</h2>
            <p className="muted text-sm">{visibleOrders.length} {t('totalOrders')}</p></div>
            <Button className="full-phone" onClick={startOrder}>＋ {t('createOrder')}</Button></div>
          {role==='store'&&<Deadline/>}
          <Card className="form-grid mb-4">
            <Field id="filter-date" label={t('orderDate')} type="date" value={queueFilters.date}
              onChange={e=>setQueueFilters({...queueFilters,date:e.target.value})}/>
            <Field id="filter-branch" label={t('branch')}>
              <select id="filter-branch" className="field" disabled={role==='store'}
                value={role==='store'?branch:queueFilters.branch}
                onChange={e=>setQueueFilters({...queueFilters,branch:e.target.value})}>
                {role!=='store'&&<option value="">{t('allBranches')}</option>}
                {branches.map(b=><option key={b.branch_id} value={b.branch_id}>{b.branch_name}</option>)}
              </select>
            </Field>
            <Field id="filter-status" label={t('status')}>
              <select id="filter-status" className="field" value={queueFilters.status}
                onChange={e=>setQueueFilters({...queueFilters,status:e.target.value})}>
                <option value="">{t('allStatuses')}</option>{STATES.map(s=><option key={s} value={s}>{label(s)}</option>)}
              </select>
            </Field>
          </Card>
          <div className="stack">{filtered.map(o=><OrderCard key={o.__backendId} order={o}/>)}
            {!filtered.length&&<Card><p className="muted py-5 text-center">{t('noOrders')}</p></Card>}</div>
        </section>;
      }
      function OrderDetail({order}){
        const editable=role==='warehouse'||role==='admin';
        const [approved,setApproved]=useState(()=>linesOf(order).map(line=>String(line.approved??line.qty??0)));
        const [substitutes,setSubstitutes]=useState(()=>linesOf(order).map(line=>line.substitute||''));
        const [notes,setNotes]=useState(order?.fulfilment_notes||'');
        if(!order)return <Card>{t('orderMissing')}</Card>;
        const save=async(next)=>{
          const values=approved.map(Number);
          if(values.some((value,index)=>!validNumber(approved[index]))){show(t('invalidQuantity'),true);return}
          const updated=linesOf(order).map((line,index)=>({...line,approved:values[index],substitute:substitutes[index].trim()}));
          const change={...order,items_json:JSON.stringify(updated),fulfilment_notes:notes.trim(),status:next||order.status};
          await write('update',change,next?'advance':'detail',t(next?'orderMarked':'detailsSaved'));
        };
        return <section>
          <Button variant="ghost" className="mb-4 no-print" onClick={()=>setSelectedOrder(null)}>← {t('backQueue')}</Button>
          <div className="row-between mb-4"><div><p className="eyebrow">{t('pickingList')} / {order.order_date}</p>
            <h2>{branchName(order.branch_id)}</h2><p className="small-meta">{t('submitted')}: {formatTime(order.submitted_at)} · {label(order.priority||'Normal')}</p></div>
            <div className="flex flex-wrap items-center gap-2"><Badge>{label(order.status)}</Badge>
              {editable&&<Button variant="secondary" className="no-print" onClick={()=>window.print()}>{t('print')}</Button>}</div></div>
          <div className="stack">{linesOf(order).map((line,index)=><Card key={`${index}-${line.name}`}>
            <strong>{line.name}</strong>
            {line.kgPerQuantity!==undefined&&<p className="small-meta mt-1">{line.kgPerQuantity} {t('kg')} × {line.quantity} = {line.totalKg} {t('kg')}</p>}
            <p className="mt-2"><span className="muted">{t('requested')}: </span>
              <strong>{line.kgPerQuantity!==undefined?`${line.totalKg} ${t('kg')}`:`${line.qty} ${line.unit||''}`}</strong></p>
            {editable?<div className="form-grid mt-3">
              <Field id={`approved-${index}`} label={`${t('approved')}: ${line.name}`} type="number" min="0" step="0.01"
                value={approved[index]} onChange={e=>setApproved(previous=>previous.map((v,i)=>i===index?e.target.value:v))}/>
              <Field id={`sub-${index}`} label={`${t('availabilitySub')}: ${line.name}`} value={substitutes[index]}
                placeholder={t('subPlaceholder')} onChange={e=>setSubstitutes(previous=>previous.map((v,i)=>i===index?e.target.value:v))}/>
            </div>:<><p className="small-meta mt-1">{t('approved')}: {line.approved??line.qty} {line.unit||''}</p>
              {line.substitute&&<p className="small-meta mt-1">{t('availabilitySub')}: {line.substitute}</p>}</>}
          </Card>)}</div>
          <div className="form-grid mt-4"><Card><h3 className="font-bold mb-2">{t('branchNotes')}</h3><p>{order.notes||t('noNotes')}</p></Card>
            <Card>{editable?<Field id="fulfilment-notes" label={t('fulfilmentNotes')}>
              <textarea id="fulfilment-notes" className="field" rows="3" value={notes}
                placeholder={t('fulfilmentPlaceholder')} onChange={e=>setNotes(e.target.value)}/></Field>:
              <><h3 className="font-bold mb-2">{t('fulfilmentNotes')}</h3><p>{order.fulfilment_notes||t('none')}</p></>}</Card></div>
          {editable&&<div className="action-bar no-print">
            <Button variant="secondary" className="full-phone" disabled={!!busy} onClick={()=>save(null)}>
              {busy==='detail'?t('saving'):t('saveDetails')}</Button>
            {nextStatus[order.status]&&<Button className="full-phone" disabled={!!busy} onClick={()=>save(nextStatus[order.status])}>
              {busy==='advance'?t('saving'):`${t('mark')} ${label(nextStatus[order.status])}`}</Button>}
          </div>}
        </section>;
      }
      function InventoryItem({item}){
        const [amount,setAmount]=useState(String(item.current_stock));
        const key=item.__backendId;
        const save=async()=>{
          if(!validNumber(amount)){show(t('invalidStock'),true);return}
          await write('update',{...item,current_stock:Number(amount)},`stock-${key}`,t('inventoryUpdated'));
        };
        return <Card>
          {item.item_photo?<img src={item.item_photo} alt={photoLabel(item)} loading="lazy" className="w-full h-32 object-contain rounded-lg bg-[#f7f3eb] mb-3"/>:<div className="w-full h-32 rounded-lg bg-[#f1e7d5] mb-3 grid place-items-center muted text-sm">{t('noPhoto')}</div>}
          <div className="row-between"><strong>{itemName(item)}</strong><Badge>{label(item.category)}</Badge></div>
          <p className="small-meta mt-2">{t('supplier')}: {item.supplier}</p>
          <p className="small-meta mt-1">{t('threshold')}: {item.reorder_threshold} {item.unit}</p>
          <div className="form-grid mt-4">
            <Field id={`stock-${key}`} label={`${t('currentStock')} (${item.unit||''})`} type="number" min="0" step="0.01"
              value={amount} onChange={e=>setAmount(e.target.value)}/>
            <div><span className="label">{t('availability')}</span>
              <Button variant="secondary" className="full-phone" disabled={!!busy} onClick={()=>write('update',{...item,available:!item.available},`toggle-${key}`,t('inventoryUpdated'))}>
                {label(item.available?'Available':'Unavailable')}</Button></div>
          </div>
          <Button className="full-phone mt-4" disabled={!!busy} onClick={save}>
            {busy===`stock-${key}`?t('saving'):t('save')}</Button>
        </Card>;
      }
      function Inventory(){
        const [creating,setCreating]=useState(false);
        const [form,setForm]=useState({name:'',category:'Meat',customCategory:'',unit:'kg',stock:'0',threshold:'0',supplier:'',available:true,notes:'',item_photo:''});
        const categories=[...new Set([...CATEGORIES,...stock.map(item=>item.category).filter(Boolean)])];
        const filtered=stock.filter(item=>(!invFilters.category||item.category===invFilters.category)&&
          (!invFilters.search||`${item.item_name} ${item.supplier}`.toLowerCase().includes(invFilters.search.toLowerCase())));
        const update=(key,value)=>setForm(previous=>({...previous,[key]:value}));
        const create=async e=>{
          e.preventDefault();
          const category=form.category==='__custom__'?form.customCategory.trim():form.category;
          if(!form.name.trim()||!category||!form.unit.trim()){show(t('itemRequired'),true);return}
          if(form.category==='__custom__'&&!category){show(t('categoryRequired'),true);return}
          if(!validNumber(form.stock)||!validNumber(form.threshold)){show(t('invalidStock'),true);return}
          if(stock.some(item=>String(item.item_name).trim().toLowerCase()===form.name.trim().toLowerCase()&&String(item.category).toLowerCase()===category.toLowerCase())){show(t('duplicateItem'),true);return}
          if(recordsRef.current.length>=999){show(t('limit'),true);return}
          const row=newRow({type:'inventory',item_name:form.name.trim(),category,unit:form.unit.trim(),current_stock:Number(form.stock),reorder_threshold:Number(form.threshold),supplier:form.supplier.trim(),available:form.available,notes:form.notes.trim(),item_photo:form.item_photo||''});
          if(await write('create',row,'create-item',t('itemCreated'))){setForm({name:'',category:'Meat',customCategory:'',unit:'kg',stock:'0',threshold:'0',supplier:'',available:true,notes:'',item_photo:''});setCreating(false)}
        };
        return <section><div className="row-between"><div><h2>{t('stockCatalogue')}</h2><p className="muted mb-4">{t('stockHelp')}</p></div>{role==='admin'&&<Button onClick={()=>setCreating(true)}>＋ {t('createStockItem')}</Button>}</div>
          {role==='admin'&&creating&&<form className="panel p-4 sm:p-5 stack mb-4" onSubmit={create}><div className="form-grid">
            <Field id="new-stock-name" label={t('stockItemName')} required value={form.name} onChange={e=>update('name',e.target.value)}/>
            <Field id="new-stock-category" label={t('categoryChoice')}><select id="new-stock-category" className="field" value={form.category} onChange={e=>update('category',e.target.value)}>{categories.map(c=><option key={c} value={c}>{label(c)}</option>)}<option value="__custom__">{t('customCategory')}</option></select></Field>
            {form.category==='__custom__'&&<Field id="new-stock-custom-category" label={t('customCategory')} placeholder={t('customCategoryPlaceholder')} value={form.customCategory} onChange={e=>update('customCategory',e.target.value)}/>}<Field id="new-stock-unit" label={t('stockUnit')} required value={form.unit} onChange={e=>update('unit',e.target.value)}/>
            <Field id="new-stock-current" label={t('currentStock')} type="number" min="0" step="0.01" required value={form.stock} onChange={e=>update('stock',e.target.value)}/><Field id="new-stock-threshold" label={t('threshold')} type="number" min="0" step="0.01" required value={form.threshold} onChange={e=>update('threshold',e.target.value)}/><Field id="new-stock-supplier" label={t('supplier')} value={form.supplier} onChange={e=>update('supplier',e.target.value)}/></div>
            <div><label className="label" htmlFor="new-stock-photo">{t('uploadPhoto')}</label><input id="new-stock-photo" className="field" type="file" accept="image/*" onChange={e=>{const file=e.target.files?.[0];if(!file)return;if(!file.type.startsWith('image/')){show(t('photoError'),true);return}const reader=new FileReader();reader.onload=()=>update('item_photo',String(reader.result||''));reader.readAsDataURL(file)}}/>
              {form.item_photo&&<div className="mt-3"><img src={form.item_photo} alt={t('uploadPhoto')} className="w-full h-32 object-contain rounded-lg bg-[#f7f3eb]"/><Button variant="secondary" className="mt-2" onClick={()=>{update('item_photo','');const input=document.getElementById('new-stock-photo');if(input)input.value=''}}>{t('removePhoto')}</Button></div>}</div>
            <Field id="new-stock-notes" label={t('stockDescription')}><textarea id="new-stock-notes" className="field" rows="3" value={form.notes} onChange={e=>update('notes',e.target.value)}/></Field><label className="check-row"><input type="checkbox" checked={form.available} onChange={e=>update('available',e.target.checked)}/><span>{t('stockAvailability')}</span></label><div className="review-action action-bar"><Button type="submit" disabled={busy==='create-item'}>{busy==='create-item'?t('saving'):t('createItem')}</Button><Button variant="secondary" onClick={()=>setCreating(false)}>{t('cancel')}</Button></div>
          </form>}
          <Card className="form-grid mb-4"><Field id="inv-search" label={t('searchItems')} value={invFilters.search} placeholder={t('searchInventory')} onChange={e=>setInvFilters(previous=>({...previous,search:e.target.value}))}/><Field id="inv-category" label={t('category')}><select id="inv-category" className="field" value={invFilters.category} onChange={e=>setInvFilters(previous=>({...previous,category:e.target.value}))}><option value="">{t('allCategories')}</option>{categories.map(c=><option key={c} value={c}>{label(c)}</option>)}</select></Field></Card><div className="grid-cards three-grid">{filtered.map(item=><InventoryItem key={item.__backendId} item={item}/>)}</div>{!filtered.length&&<Card>{t('noInventory')}</Card>}
        </section>;
      }
      function BranchCard({item}){
        const [name,setName]=useState(item.branch_name);
        const [contact,setContact]=useState(item.contact_person);
        const [route,setRoute]=useState(item.delivery_route);
        const [active,setActive]=useState(item.active);
        const save=async e=>{
          e.preventDefault();
          if(!name.trim()||!contact.trim()){show(t('branchRequired'),true);return}
          await write('update',{...item,branch_name:name.trim(),contact_person:contact.trim(),
            delivery_route:route.trim(),active},`branch-${item.__backendId}`,t('branchUpdated'));
        };
        return <form className="panel p-4 sm:p-5 stack" onSubmit={save}>
          <div className="row-between"><h3 className="font-bold">{t('branch')} {item.branch_id}</h3><Badge>{t(active?'active':'inactive')}</Badge></div>
          <Field id={`name-${item.branch_id}`} label={t('branchName')} required value={name} onChange={e=>setName(e.target.value)}/>
          <Field id={`contact-${item.branch_id}`} label={t('contact')} required value={contact} onChange={e=>setContact(e.target.value)}/>
          <Field id={`route-${item.branch_id}`} label={t('routeNotes')} value={route} onChange={e=>setRoute(e.target.value)}/>
          <label className="check-row"><input type="checkbox" checked={active} onChange={e=>setActive(e.target.checked)}/><span>{t('activeBranch')}</span></label>
          <button className="btn primary" disabled={!!busy} type="submit">{busy===`branch-${item.__backendId}`?t('saving'):t('saveBranch')}</button>
        </form>;
      }
      function Branches(){
        return <section><h2>{t('branchDirectory')}</h2><p className="muted mb-4">{t('branchHelp')}</p>
          <div className="grid-cards three-grid">{branches.map(item=><BranchCard key={item.__backendId} item={item}/>)}</div>
        </section>;
      }
      function Reports(){
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
      function DeliveryCard({order}){
        const relatedBranch=branches.find(b=>b.branch_id===order.branch_id);
        const [deliveryStatus,setDeliveryStatus]=useState(order.delivery_status||'Assigned');
        const [driverNotes,setDriverNotes]=useState(order.driver_notes||'');
        const save=async e=>{
          e.preventDefault();
          await write('update',{...order,delivery_status:deliveryStatus,driver_notes:driverNotes.trim()},
            `delivery-${order.__backendId}`,t('deliverySaved'));
        };
        return <article className="panel p-4 sm:p-5 min-w-0">
          <div className="row-between"><div className="min-w-0"><h3 className="font-bold">{branchName(order.branch_id)}</h3>
            <p className="small-meta mt-1">{relatedBranch?.delivery_route||t('addressPlaceholder')}</p>
            <p className="small-meta mt-1">{t('contact')}: {relatedBranch?.contact_person||t('contactPlaceholder')}</p></div>
            <Badge>{label(order.delivery_status||'Assigned')}</Badge></div>
          <div className="border-t mt-4 pt-3"><strong>{t('orderSummary')}</strong>
            {linesOf(order).map((line,index)=><div key={index} className="line row-between text-sm">
              <span>{line.name}</span><span>{line.approved??line.qty} {line.unit}</span></div>)}</div>
          <form onSubmit={save} className="stack border-t mt-4 pt-4">
            <Field id={`delivery-${order.__backendId}`} label={t('deliveryStatus')}>
              <select id={`delivery-${order.__backendId}`} className="field" value={deliveryStatus}
                onChange={e=>setDeliveryStatus(e.target.value)}>
                {DELIVERY_STATES.map(s=><option key={s} value={s}>{label(s)}</option>)}
              </select>
            </Field>
            <Field id={`driver-notes-${order.__backendId}`} label={t('deliveryNotes')}>
              <textarea id={`driver-notes-${order.__backendId}`} className="field" rows="2" value={driverNotes}
                placeholder={t('deliveryPlaceholder')} onChange={e=>setDriverNotes(e.target.value)}/></Field>
            <button className="btn primary" type="submit" disabled={!!busy}>
              {busy===`delivery-${order.__backendId}`?t('saving'):t('saveDelivery')}</button>
          </form>
        </article>;
      }
      function Deliveries(){
        const deliveries=orders.filter(o=>o.order_date===today&&
          ['Approved','Preparing','Ready','Dispatched','Completed'].includes(o.status));
        return <section><h2>{t('routeToday')}</h2><p className="muted mb-4">{t('deliveriesToday')}: {deliveries.length}</p>
          <div className="grid-cards">{deliveries.map(o=><DeliveryCard key={o.__backendId} order={o}/>)}</div>
          {!deliveries.length&&<Card>{t('noDeliveries')}</Card>}
        </section>;
      }
      function Settings(){
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

      const roleKey={store:'store',warehouse:'warehouse',driver:'driverRole',admin:'admin'}[role];
      return <div className="app-frame">
        <header className="mobile-header">
          <div className="brand-mark" aria-hidden="true">K</div>
          <div className="header-brand"><div className="brand">Kervan Restaurant</div>
            <div className="brand-caption">{t(roleKey)}</div></div>
          <button ref={menuButton} type="button" className="menu-button" aria-label={t(menuOpen?'closeMenu':'menu')}
            aria-expanded={menuOpen} aria-controls="main-navigation" onClick={()=>setMenuOpen(!menuOpen)}>
            {menuOpen?'×':'☰'}</button>
        </header>
        <button type="button" className={`sidebar-shade ${menuOpen?'open':''}`} aria-label={t('closeMenu')}
          tabIndex={menuOpen?0:-1} onClick={()=>setMenuOpen(false)}/>
        <div className="layout">
          <aside className={`sidebar ${menuOpen?'open':''}`} aria-label={t('menu')}>
            <div className="sidebar-inner">
              <div className="desktop-brand items-center gap-3 px-2 mb-7">
                <div className="brand-mark" aria-hidden="true">K</div>
                <div><div className="brand">Kervan</div>
                  <div className="brand-caption">Restaurant · Warehouse</div></div>
              </div>
              <nav id="main-navigation" aria-label="Main navigation">
                {PERMISSIONS[role].map(name=><button key={name} type="button"
                  className={`nav-button ${view===name?'active':''}`}
                  aria-current={view===name?'page':undefined} onClick={()=>navigate(name)}>
                  <span className="nav-icon" aria-hidden="true">{NAV[name]}</span><span>{t(name)}</span></button>)}
              </nav>
              <p className="small-meta px-3 mt-8" style={{color:'#c8beb0'}}>{t('tagline')}</p>
            </div>
          </aside>
          <div className="main-area">
            <header className="topbar">
              <div className="topbar-inner">
                <div><p className="eyebrow">Kervan / {t(roleKey)}</p><h1>{t(view)}</h1></div>
                <div className="controls">
                  <Field id="role" label={t('demoRole')}>
                    <select id="role" className="field" value={role} onChange={e=>changeRole(e.target.value)}>
                      {['store','warehouse','driver','admin'].map(value=><option key={value} value={value}>
                        {t(value==='driver'?'driverRole':value)}</option>)}
                    </select>
                  </Field>
                  <Field id="language" label={t('language')}>
                    <select id="language" className="field" value={lang} onChange={e=>setLang(e.target.value)}>
                      <option value="en">English</option><option value="ko">한국어</option><option value="tr">Türkçe</option>
                    </select>
                  </Field>
                  {role==='store'&&<div className="branch-control"><Field id="active-branch" label={t('yourBranch')}>
                    <select id="active-branch" className="field" value={branch} onChange={e=>{
                      setBranch(e.target.value);setDraftBranch(e.target.value);setSelectedOrder(null);
                    }}>
                      {branches.map(b=><option key={b.branch_id} value={b.branch_id}>{b.branch_name}</option>)}
                    </select>
                  </Field></div>}
                </div>
              </div>
            </header>
            <main className="workspace">
              {notice&&<div role="status" aria-live="polite" className={`notice ${notice.error?'error':'ok'}`}>{notice.message}</div>}
              {!ready&&<p className="small-meta mb-3">{t('saving')}</p>}
              {view==='dashboard'?<Dashboard/>:view==='orders'?<Orders/>:view==='inventory'?<Inventory/>:
                view==='branches'?<Branches/>:view==='reports'?<Reports/>:view==='driver'?<Deliveries/>:<Settings/>}
            </main>
          </div>
        </div>
      </div>;
    }

export default App;
