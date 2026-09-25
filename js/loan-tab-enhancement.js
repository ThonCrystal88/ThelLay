(() => {
  'use strict';

  const STORAGE_KEY = 'moneyflow-v3';
  const readState = () => {
    try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}'); } catch (_) { return {}; }
  };
  const saveState = (state) => {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); } catch (_) {}
  };
  const number = (value) => Number(String(value ?? '0').replace(/,/g, '')) || 0;
  const esc = (value) => String(value ?? '').replace(/[&<>"']/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[char] || char));
  const makeId = (prefix) => window.crypto?.randomUUID?.() || `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2)}`;
  const money = (value) => `${Math.round(number(value)).toLocaleString('en-US')} MMK`;

  const closeModal = (modal) => {
    if (!modal) return;
    modal.classList.add('hidden');
    document.body.classList.remove('modal-open');
    document.activeElement?.blur?.();
  };

  const ensureLoanCategory = (select) => {
    if (!select) return;
    let option = [...select.options].find((item) => item.value.toLowerCase() === 'loan');
    if (!option) {
      option = document.createElement('option');
      option.value = 'Loan';
      option.textContent = 'Loan';
      select.appendChild(option);
    }
    select.value = 'Loan';
  };

  const populateRepayments = (modal) => {
    const select = modal.querySelector('select[name="loanId"]');
    if (!select) return;
    const loans = (readState().loans || []).filter((loan) => number(loan.balance ?? loan.remaining) > 0);
    select.innerHTML = loans.length
      ? loans.map((loan) => `<option value="${esc(loan.id)}">${esc(loan.name || 'Loan')} · ${money(loan.balance ?? loan.remaining)}</option>`).join('')
      : '<option value="">No outstanding loans</option>';
    select.disabled = !loans.length;
  };

  const setMode = (modal, mode) => {
    const form = modal.querySelector('#transactionForm');
    if (!form) return;
    modal.querySelectorAll('.transaction-tab').forEach((tab) => tab.classList.toggle('active', tab.dataset.mode === mode));
    const type = form.querySelector('select[name="type"]');
    const category = form.querySelector('select[name="category"]');
    const amount = form.querySelector('input[name="amount"]');
    const amountLabel = amount?.closest('label');
    const repaymentFields = modal.querySelector('#repaymentFields');
    const repaymentAmount = form.querySelector('input[name="repaymentAmount"]');
    const loanSelect = form.querySelector('select[name="loanId"]');
    const isLoan = mode === 'loan';
    const isRepayment = mode === 'repayment';

    amountLabel?.classList.toggle('hidden-field', isRepayment);
    repaymentFields?.classList.toggle('hidden', !isRepayment);
    amount.required = !isRepayment;
    repaymentAmount.required = isRepayment;
    loanSelect.required = isRepayment;

    if (isLoan) {
      type.value = 'income'; type.disabled = true;
      ensureLoanCategory(category); category.disabled = true;
      form.querySelector('input[name="note"]').placeholder = 'Loan name';
    } else if (isRepayment) {
      type.value = 'expense'; type.disabled = true;
      category.value = 'Loan repayment'; category.disabled = true;
      populateRepayments(modal);
    } else {
      type.disabled = false; category.disabled = false;
      form.querySelector('input[name="note"]').placeholder = 'Optional note';
    }
  };

  const saveLoan = (form) => {
    const state = readState();
    state.transactions = Array.isArray(state.transactions) ? state.transactions : [];
    state.loans = Array.isArray(state.loans) ? state.loans : [];
    const amount = number(form.querySelector('input[name="amount"]')?.value);
    const note = String(form.querySelector('input[name="note"]')?.value || '').trim();
    if (!amount) return 'Enter a valid loan amount greater than zero.';
    if (!note) return 'Enter the loan name in the Note field.';
    const loanId = makeId('loan');
    const date = form.querySelector('input[name="date"]')?.value || new Date().toISOString().slice(0, 10);
    state.loans.push({ id: loanId, name: note, principal: amount, paid: 0, balance: amount, remaining: amount, date, note });
    state.transactions.push({ id: makeId('tx'), type: 'income', category: 'Loan', amount, date, note, loanId, loanType: 'loan' });
    saveState(state); window.dispatchEvent(new CustomEvent('moneyflow:state-updated')); return '';
  };

  const saveRepayment = (form) => {
    const state = readState();
    state.transactions = Array.isArray(state.transactions) ? state.transactions : [];
    state.loans = Array.isArray(state.loans) ? state.loans : [];
    const loanId = form.querySelector('select[name="loanId"]')?.value || '';
    const amount = number(form.querySelector('input[name="repaymentAmount"]')?.value);
    const loan = state.loans.find((item) => String(item.id) === String(loanId));
    if (!loan || number(loan.balance ?? loan.remaining) <= 0) return 'Select an outstanding loan.';
    if (!amount || amount > number(loan.balance ?? loan.remaining)) return 'Enter a valid repayment amount within the loan balance.';
    const date = form.querySelector('input[name="date"]')?.value || new Date().toISOString().slice(0, 10);
    const note = String(form.querySelector('input[name="note"]')?.value || '').trim();
    loan.paid = number(loan.paid) + amount;
    loan.balance = Math.max(0, number(loan.balance ?? loan.remaining) - amount);
    loan.remaining = loan.balance;
    state.transactions.push({ id: makeId('tx'), type: 'expense', category: 'Loan repayment', amount, date, note, loanId, loanType: 'payback' });
    saveState(state); window.dispatchEvent(new CustomEvent('moneyflow:state-updated')); return '';
  };

  const repairModal = (modal) => {
    if (!modal) return;
    const tabs = modal.querySelector('.transaction-tabs');
    if (!tabs) return;
    if (!tabs.querySelector('[data-mode="loan"]')) {
      const standard = tabs.querySelector('[data-mode="standard"]');
      if (standard) {
        const loan = document.createElement('button');
        loan.type = 'button'; loan.className = 'transaction-tab loan-tab'; loan.dataset.mode = 'loan'; loan.textContent = 'Loan';
        standard.insertAdjacentElement('afterend', loan);
      }
    }
    if (!tabs.dataset.bound) {
      tabs.dataset.bound = 'true';
      tabs.addEventListener('click', (event) => {
        const tab = event.target.closest('.transaction-tab');
        if (!tab) return;
        event.preventDefault(); event.stopImmediatePropagation(); setMode(modal, tab.dataset.mode);
      }, true);
    }
    if (!modal.dataset.closeBound) {
      modal.dataset.closeBound = 'true';
      modal.querySelector('.modal-close')?.addEventListener('click', (event) => { event.preventDefault(); closeModal(modal); }, true);
      modal.querySelector('[data-close-modal]')?.addEventListener('click', (event) => { event.preventDefault(); closeModal(modal); }, true);
    }
  };

  const addStyles = () => {
    if (document.getElementById('mobile-transaction-fixes')) return;
    const style = document.createElement('style');
    style.id = 'mobile-transaction-fixes';
    style.textContent = `
      .transaction-tabs{display:grid!important;grid-template-columns:repeat(3,minmax(0,1fr));gap:8px}
      .transaction-modal .hidden-field{display:none!important}
      .transaction-modal{color:var(--text);background:var(--surface-solid);border-color:var(--line)}
      body.dark .transaction-modal{background:linear-gradient(145deg,rgba(19,30,52,.98),rgba(10,16,30,.98))}
      .floating-add-transaction{position:fixed!important;right:20px!important;bottom:20px!important;width:64px!important;height:64px!important;min-height:64px!important;padding:0!important;border-radius:50%!important;display:grid!important;place-items:center!important;z-index:90!important}
      .floating-add-transaction span:last-child{display:none!important}
      .floating-add-transaction span:first-child{font-size:2rem!important;background:transparent!important}
      @media(max-width:560px){.transaction-tabs{grid-template-columns:1fr!important}.floating-add-transaction{right:16px!important;bottom:16px!important}}
    `;
    document.head.appendChild(style);
  };

  const bind = () => {
    addStyles();
    const observer = new MutationObserver(() => repairModal(document.getElementById('transactionModal')));
    observer.observe(document.body, { childList: true, subtree: true });
    document.addEventListener('keydown', (event) => { if (event.key === 'Escape') closeModal(document.getElementById('transactionModal')); });
    document.addEventListener('submit', (event) => {
      const form = event.target.closest('#transactionForm');
      const modal = form?.closest('#transactionModal');
      const mode = modal?.querySelector('.transaction-tab.active')?.dataset.mode;
      if (!form || !modal || !['loan', 'repayment'].includes(mode)) return;
      event.preventDefault(); event.stopImmediatePropagation();
      const errorBox = modal.querySelector('#transactionFormError');
      const error = mode === 'loan' ? saveLoan(form) : saveRepayment(form);
      if (error) { errorBox.textContent = error; errorBox.classList.add('visible'); return; }
      closeModal(modal); window.location.reload();
    }, true);
    window.addEventListener('moneyflow:state-updated', () => {
      const state = readState();
      if (state.settings?.categoriesUserCleared && Array.isArray(state.categories) && state.categories.length) {
        state.categories = []; saveState(state);
      }
    });
    repairModal(document.getElementById('transactionModal'));
  };

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', bind, { once: true }); else bind();
})();
