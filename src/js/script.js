// B2B AZAD
// AMIRHOSSEIN PANAHI - ARMIN PANAHI - ARMINP10 - P10CODING



// 1- SLIDE FOR SPECIAL PRODUCT'S
// START 

// END 






// POPUP FOR SEARCH PROVINCE
// START
/* LIST OF ALL PROVINCES OF IRAN */
const PROVINCES = [
  "کل ایران",
  "آذربایجان شرقی",
  "آذربایجان غربی",
  "اردبیل",
  "اصفهان",
  "البرز",
  "ایلام",
  "بوشهر",
  "تهران",
  "چهارمحال و بختیاری",
  "خراسان رضوی",
  "خراسان شمالی",
  "خراسان جنوبی",
  "خوزستان",
  "زنجان",
  "سمنان",
  "سیستان و بلوچستان",
  "فارس",
  "قزوین",
  "قم",
  "کردستان",
  "کرمانشاه",
  "کرمان",
  "کهگیلویه و بویراحمد",
  "گلستان",
  "گیلان",
  "لرستان",
  "مازندران",
  "مرکزی",
  "هرمزگان",
  "همدان",
  "یزد"
];

/* SELECT STATUS OF COLLECTION */
let selected = new Set();

/* ELEMENT'S */
const popup = document.getElementById('popup');
const openPopupBtn = document.getElementById('openPopupBtn');
const provinceList = document.getElementById('provinceList');
const searchInput = document.getElementById('searchInput');
const selectedTagsContainer = document.getElementById('selectedTagsContainer');
const removeAllBtn = document.getElementById('removeAllBtn');
const cancelBtn = document.getElementById('cancelBtn');
const confirmBtn = document.getElementById('confirmBtn');

/* OPEN & CLOSE POPUP */
openPopupBtn.addEventListener('click', () => {
  popup.style.display = 'flex';
  // SET TRANSITION FOR GIVE SOME TIME
  requestAnimationFrame(() => popup.classList.add('show'));
  searchInput.focus();
  renderList();
  renderSelectedTags();
});

function closePopup(){
  popup.classList.remove('show');
  // CLOSE AFFECT
  setTimeout(()=> popup.style.display='none', 200);
}
cancelBtn.addEventListener('click', closePopup);
removeAllBtn.addEventListener('click', () => {
  selected.clear();
  renderList();
  renderSelectedTags();
});
confirmBtn.addEventListener('click', () => {
  // SEND SELECTED
  const arr = Array.from(selected);
  console.log('انتخاب‌های نهایی:', arr);
  closePopup();
});

/* CLOSE WHEN CLICK ON BACKDROP*/
window.addEventListener('click', (e) => {
  if (e.target === popup) closePopup();
});
/* ESC KEYBOARD EVENT FOR CLOSE POPUP */
window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closePopup();
});

/* رندر لیست با فیلتر جستجو */
function renderList(){
  const q = searchInput.value.trim().replace(/\s+/g,' ').toLowerCase();
  provinceList.innerHTML = '';
  const filtered = PROVINCES.filter(p => p.toLowerCase().includes(q));
  // اگر هیچ موردی پیدا نشه پیام نمایش بده
  if(filtered.length === 0){
    const empty = document.createElement('div');
    empty.style.padding = '18px';
    empty.style.color = '#999';
    empty.textContent = 'هیچ استانی پیدا نشد.';
    provinceList.appendChild(empty);
    return;
  }
  filtered.forEach(name => {
    const item = document.createElement('div');
    item.className = 'province-item';
    item.tabIndex = 0;

    const label = document.createElement('div');
    label.className = 'province-label';
    label.textContent = name;

    const cb = document.createElement('div');
    cb.className = 'checkbox ' + (selected.has(name) ? 'checked' : '');
    cb.innerHTML = selected.has(name) ? '✓' : '';

    // کلیک روی آیتم: افزودن/حذف انتخاب
    item.addEventListener('click', (e) => {
      toggleSelect(name);
    });
    // دسترسی کیبورد
    item.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggleSelect(name);
      }
    });

    item.appendChild(label);
    item.appendChild(cb);
    provinceList.appendChild(item);
  });
}

/* جستجو */
searchInput.addEventListener('input', () => renderList());

/* افزودن/حذف از انتخاب‌شده‌ها و اسکرول تا بالای تگ‌ها (در عکس تگ‌ها بالای سرچ هستند) */
function toggleSelect(name){
  if(selected.has(name)){
    selected.delete(name);
  } else {
    selected.add(name);
  }
  renderList();
  renderSelectedTags();
}

/* رندر ناحیه تگ‌ها */
function renderSelectedTags(){
  selectedTagsContainer.innerHTML = '';
  // چیدمان مانند عکس: آیتم‌ها از راست به چپ (RTL) اضافه میشن
  Array.from(selected).forEach(name => {
    const t = document.createElement('div');
    t.className = 'tag';
    t.setAttribute('data-name', name);

    const txt = document.createElement('span');
    txt.textContent = name;

    const x = document.createElement('span');
    x.className = 'x';
    x.innerHTML = '×';
    x.title = 'حذف';
    x.addEventListener('click', (e) => {
      e.stopPropagation();
      selected.delete(name);
      renderList();
      renderSelectedTags();
    });

    t.appendChild(txt);
    t.appendChild(x);
    selectedTagsContainer.appendChild(t);
  });

  // اگر هیچ انتخابی نباشه یک فضای خالی کوچک بذار
  if(selected.size === 0){
    const hint = document.createElement('div');
    hint.style.color = '#9aa0a6';
    hint.style.fontSize = '14px';
    hint.textContent = 'هیچ استانی انتخاب نشده است';
    selectedTagsContainer.appendChild(hint);
  }
}
/* وقتی صفحه لود شد، روی لیست رندر اولیه بزن */
document.addEventListener('DOMContentLoaded', () => {
  renderList();
});
// END



/////////////////////////////////////////////////////////////////////////////



// SPECIAL ADS SLIDER
const swiper = new Swiper(".mySwiper", {
  slidesPerView: 4,       // تعداد کارت‌ها در هر ردیف
  spaceBetween: 20,        // فاصله بین کارت‌ها
  loop: true,              // حرکت بی‌نهایت
  navigation: {
    prevEl: ".swiper-button-prev",
  },
  allowTouchMove: false,
  breakpoints: {
    768: { slidesPerView: 4 },
    480: { slidesPerView: 4 },
  },
});



/////////////////////////////////////////////////////////////////////////////




// SAVE PRODUCT TO FAVORATE'S
const favIcons = document.querySelectorAll(".add_to_fav");

favIcons.forEach(icon => {
    icon.addEventListener("click", () => {
      icon.classList.toggle("fa-solid");
      icon.classList.toggle("fa-regular");
      icon.classList.toggle("active_favicon");
    });
  });

favIcons.addEventListener("click",click_on_favicon);




// FINISH