/**
 * BRANDINGKIT — Business Automation & Digital Growth Agency
 * Interactive JavaScript Engine
 */

document.addEventListener('DOMContentLoaded', () => {
  initThemeToggle();
  initStickyHeader();
  initMobileMenu();
  initPlatformTabs();
  initServiceFilters();
  initRoiCalculator();
  initFaqAccordion();
  initConsultationModal();
  initChartInteractivity();
});

/* ==========================================================================
   1. STICKY HEADER & SCROLL BEHAVIOR
   ========================================================================== */
function initStickyHeader() {
  const header = document.querySelector('.site-header');
  if (!header) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 30) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }, { passive: true });
}

/* ==========================================================================
   2. MOBILE NAVIGATION DRAWER
   ========================================================================== */
function initMobileMenu() {
  const toggleBtn = document.querySelector('.mobile-menu-toggle');
  const drawer = document.querySelector('.mobile-nav-drawer');
  const drawerLinks = document.querySelectorAll('.mobile-drawer-links a, .mobile-nav-drawer .btn');

  if (!toggleBtn || !drawer) return;

  toggleBtn.addEventListener('click', () => {
    drawer.classList.toggle('open');
    const isOpen = drawer.classList.contains('open');
    toggleBtn.setAttribute('aria-expanded', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  drawerLinks.forEach(link => {
    link.addEventListener('click', () => {
      drawer.classList.remove('open');
      document.body.style.overflow = '';
      toggleBtn.setAttribute('aria-expanded', 'false');
    });
  });
}

/* ==========================================================================
   3. BUSINESS AUTOMATION PLATFORM TABS
   ========================================================================== */
function initPlatformTabs() {
  const tabBtns = document.querySelectorAll('.plat-tab-btn');
  const tabContents = document.querySelectorAll('.plat-tab-content');

  if (!tabBtns.length || !tabContents.length) return;

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetTab = btn.getAttribute('data-tab');

      // Update button active state
      tabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      // Update panel visibility
      tabContents.forEach(content => {
        if (content.id === targetTab) {
          content.classList.add('active');
        } else {
          content.classList.remove('active');
        }
      });
    });
  });
}

/* ==========================================================================
   4. SERVICES SECTION CATEGORY FILTER
   ========================================================================== */
function initServiceFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const serviceCards = document.querySelectorAll('.service-card');

  if (!filterBtns.length || !serviceCards.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const category = btn.getAttribute('data-filter');

      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      serviceCards.forEach(card => {
        const cardCat = card.getAttribute('data-category');
        if (category === 'all' || cardCat.includes(category)) {
          card.style.display = 'flex';
          card.style.animation = 'fadeInPanel 0.4s ease forwards';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/* ==========================================================================
   5. INTERACTIVE ROI CALCULATOR
   ========================================================================== */
function initRoiCalculator() {
  const spendSlider = document.getElementById('calcSpend');
  const dealSlider = document.getElementById('calcDeal');
  const industrySelect = document.getElementById('calcIndustry');

  const spendDisplay = document.getElementById('spendDisplay');
  const dealDisplay = document.getElementById('dealDisplay');

  const outLeads = document.getElementById('outLeads');
  const outConversions = document.getElementById('outConversions');
  const outHours = document.getElementById('outHours');
  const outRevenue = document.getElementById('outRevenue');
  const outRoi = document.getElementById('outRoi');

  if (!spendSlider || !dealSlider) return;

  const industryMultipliers = {
    b2b: { cpl: 850, closeRate: 0.12, hoursFactor: 0.08 },
    healthcare: { cpl: 450, closeRate: 0.22, hoursFactor: 0.06 },
    realestate: { cpl: 1200, closeRate: 0.08, hoursFactor: 0.1 },
    ecommerce: { cpl: 320, closeRate: 0.28, hoursFactor: 0.05 },
    services: { cpl: 650, closeRate: 0.18, hoursFactor: 0.07 }
  };

  function formatIndianCurrency(num) {
    if (num >= 10000000) {
      return '₹' + (num / 10000000).toFixed(2) + ' Cr';
    } else if (num >= 100000) {
      return '₹' + (num / 100000).toFixed(2) + ' L';
    } else {
      return '₹' + num.toLocaleString('en-IN');
    }
  }

  function updateCalculations() {
    const spend = parseInt(spendSlider.value, 10);
    const dealValue = parseInt(dealSlider.value, 10);
    const industryKey = industrySelect ? industrySelect.value : 'b2b';
    const profile = industryMultipliers[industryKey] || industryMultipliers.b2b;

    // Format display
    spendDisplay.textContent = formatIndianCurrency(spend);
    dealDisplay.textContent = formatIndianCurrency(dealValue);

    // Dynamic Calculations
    // 1. Leads generated from spend & average cost per lead
    const leads = Math.round(spend / profile.cpl);
    
    // 2. Automated conversions with +40% boost over standard manual processes
    const conversions = Math.max(1, Math.round(leads * profile.closeRate * 1.4));
    
    // 3. Operational hours saved via WhatsApp & CRM workflows
    const savedHours = Math.round(leads * profile.hoursFactor * 1.5) + 35;
    
    // 4. Projected Pipeline Revenue
    const projectedRevenue = conversions * dealValue;
    
    // 5. Projected ROAS / ROI Multiple
    const roiMultiple = (projectedRevenue / spend).toFixed(1);

    // Update UI
    outLeads.textContent = leads.toLocaleString('en-IN');
    outConversions.textContent = conversions.toLocaleString('en-IN');
    outHours.textContent = savedHours + ' hrs';
    outRevenue.textContent = formatIndianCurrency(projectedRevenue);
    if (outRoi) outRoi.textContent = roiMultiple + 'x ROI';
  }

  spendSlider.addEventListener('input', updateCalculations);
  dealSlider.addEventListener('input', updateCalculations);
  if (industrySelect) industrySelect.addEventListener('change', updateCalculations);

  updateCalculations();
}

/* ==========================================================================
   6. FAQ ACCORDION
   ========================================================================== */
function initFaqAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const btn = item.querySelector('.faq-question-btn');
    if (!btn) return;

    btn.addEventListener('click', () => {
      const isActive = item.classList.contains('active');

      // Close all other items
      faqItems.forEach(i => i.classList.remove('active'));

      // If clicked item wasn't open, open it
      if (!isActive) {
        item.classList.add('active');
      }
    });
  });
}

/* ==========================================================================
   7. CONSULTATION BOOKING MODAL & TOAST
   ========================================================================== */
function initConsultationModal() {
  const modal = document.getElementById('consultationModal');
  const openButtons = document.querySelectorAll('.open-consultation-btn, a[href="#consultation"]');
  const closeBtn = document.querySelector('.modal-close-btn');
  const form = document.getElementById('consultationForm');
  const toast = document.getElementById('toastNotice');

  if (!modal) return;

  function openModal(prefillService = '') {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';

    if (prefillService) {
      const checkbox = modal.querySelector(`input[name="services"][value="${prefillService}"]`);
      if (checkbox) {
        checkbox.checked = true;
        checkbox.closest('.custom-checkbox-pill')?.classList.add('checked');
      }
    }
  }

  function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }

  openButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const service = btn.getAttribute('data-service') || '';
      openModal(service);
    });
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', closeModal);
  }

  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });

  // Checkbox pill toggle visual states
  const checkboxPills = modal.querySelectorAll('.custom-checkbox-pill');
  checkboxPills.forEach(pill => {
    const input = pill.querySelector('input');
    if (!input) return;

    pill.addEventListener('click', (e) => {
      if (e.target !== input) {
        input.checked = !input.checked;
      }
      pill.classList.toggle('checked', input.checked);
    });
  });

  // Handle Form Submit
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('consultName')?.value || '';
      const phone = document.getElementById('consultPhone')?.value || '';
      const company = document.getElementById('consultCompany')?.value || '';
      const selectedServices = Array.from(modal.querySelectorAll('input[name="services"]:checked'))
        .map(el => el.value)
        .join(', ');

      closeModal();

      // Show toast
      if (toast) {
        const toastMsg = toast.querySelector('.toast-msg');
        if (toastMsg) {
          toastMsg.textContent = `Thank you ${name}! Our Chennai team will reach out via WhatsApp at ${phone} within 15 minutes.`;
        }
        toast.classList.add('show');
        setTimeout(() => {
          toast.classList.remove('show');
        }, 5500);
      }

      // Optional WhatsApp trigger redirect
      const waText = encodeURIComponent(
        `Hi Brandingkit Team, I am interested in accelerating my business growth.\nName: ${name}\nCompany: ${company}\nPhone: ${phone}\nServices: ${selectedServices || 'All-in-one Growth Stack'}`
      );
      
      // Delay slightly for smooth UX
      setTimeout(() => {
        window.open(`https://wa.me/919840000000?text=${waText}`, '_blank');
      }, 1200);

      form.reset();
      checkboxPills.forEach(p => p.classList.remove('checked'));
    });
  }
}

/* ==========================================================================
   8. HERO CHART INTERACTION & PULSE EFFECT
   ========================================================================== */
function initChartInteractivity() {
  const chartSvg = document.querySelector('.chart-svg-container svg');
  if (!chartSvg) return;

  const points = chartSvg.querySelectorAll('.data-point');
  points.forEach(point => {
    point.addEventListener('mouseenter', () => {
      point.setAttribute('r', '7');
      point.setAttribute('stroke-width', '3');
    });
    point.addEventListener('mouseleave', () => {
      point.setAttribute('r', '4.5');
      point.setAttribute('stroke-width', '2');
    });
  });
}

/* ==========================================================================
   9. DARK & LIGHT THEME TOGGLE ENGINE
   ========================================================================== */
function initThemeToggle() {
  const toggleBtns = document.querySelectorAll('.theme-toggle-btn');
  if (!toggleBtns.length) return;

  const savedTheme = localStorage.getItem('theme');
  const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  let currentTheme = savedTheme ? savedTheme : (systemDark ? 'dark' : 'light');

  function updateThemeUI(theme) {
    currentTheme = theme;
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);

    toggleBtns.forEach(btn => {
      const textSpan = btn.querySelector('.theme-toggle-text');
      const isDark = theme === 'dark';
      btn.setAttribute('aria-label', isDark ? 'Switch to Light Theme' : 'Switch to Dark Theme');
      btn.setAttribute('title', isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode');
      if (textSpan) {
        textSpan.textContent = isDark ? 'Light Mode' : 'Dark Mode';
      }
    });
  }

  // Set initial UI state
  updateThemeUI(currentTheme);

  // Click handlers for theme toggle buttons
  toggleBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';
      updateThemeUI(nextTheme);
    });
  });

  // Listen to OS system color scheme changes if user has not set explicit preference
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    if (!localStorage.getItem('theme')) {
      updateThemeUI(e.matches ? 'dark' : 'light');
    }
  });
}
