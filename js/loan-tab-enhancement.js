/* Global theme fix: this stylesheet is loaded after base styles so every component uses the same light/dark design tokens. */
:root {
  color-scheme: light;
  --bg: #f4f7fb;
  --surface: rgba(255,255,255,0.92);
  --surface-solid: #ffffff;
  --text: #172033;
  --muted: #718096;
  --line: rgba(100,116,139,0.28);
  --blue: #4f8cff;
  --cyan: #0891b2;
  --violet: #7c3aed;
  --green: #059669;
  --yellow: #b7791f;
  --red: #dc2626;
  --shadow: 0 18px 50px rgba(15,23,42,0.10);
}

body,
body:not(.dark) {
  color-scheme: light;
  color: var(--text);
  background: radial-gradient(circle at 10% -10%, rgba(79,140,255,0.12), transparent 32%), radial-gradient(circle at 100% 0, rgba(139,92,246,0.10), transparent 30%), var(--bg);
}

body.dark {
  color-scheme: dark;
  --bg: #070b16;
  --surface: rgba(13,20,36,0.86);
  --surface-solid: #0d1424;
  --text: #f2f6ff;
  --muted: #91a2bb;
  --line: rgba(148,163,184,0.18);
  --cyan: #22d3ee;
  --green: #34d399;
  --yellow: #fbbf24;
  --red: #fb7185;
  --shadow: 0 22px 70px rgba(0,0,0,0.34);
  color: var(--text);
  background: radial-gradient(circle at 10% -10%, rgba(79,140,255,0.16), transparent 32%), radial-gradient(circle at 100% 0, rgba(139,92,246,0.14), transparent 30%), var(--bg);
}

html, body { min-height: 100%; }
body, button, input, select { font-family: inherit; }

.panel, .stat-card, .transaction-modal, .settings-item, .loan-item, .budget-item, .quick-action {
  background: var(--surface-solid);
  color: var(--text);
  border: 1px solid var(--line);
}

body.dark .panel,
body.dark .stat-card,
body.dark .transaction-modal,
body.dark .settings-item,
body.dark .loan-item,
body.dark .budget-item,
body.dark .quick-action {
  background: rgba(13,20,36,0.88);
}

body.modal-open { overflow: hidden; }
.modal-backdrop {
  position: fixed; inset: 0; z-index: 100;
  display: grid; place-items: center;
  width: 100vw; height: 100dvh; padding: clamp(12px, 4vw, 40px);
  overflow-y: auto; background: rgba(2,6,23,.68); backdrop-filter: blur(8px); -webkit-backdrop-filter: blur(8px);
}
.modal-backdrop.hidden { display: none; }
.transaction-modal {
  width: min(680px,100%); max-height: min(90dvh,760px); overflow: auto; overscroll-behavior: contain;
  padding: clamp(20px,4vw,32px); color: var(--text); background: var(--surface-solid);
  border: 1px solid var(--line); border-radius: 24px; box-shadow: 0 26px 90px rgba(0,0,0,.38);
}
body.dark .transaction-modal { background: linear-gradient(145deg, rgba(19,30,52,.98), rgba(10,16,30,.98)); }
.modal-header { display:flex; align-items:flex-start; justify-content:space-between; gap:16px; margin-bottom:20px; }
.transaction-modal h2 { margin:4px 0 0; font-size: clamp(1.35rem, 4vw, 1.8rem); }
.modal-close { display:grid; place-items:center; width:40px; height:40px; flex:0 0 auto; border:1px solid var(--line); border-radius:12px; background: rgba(148,163,184,.1); color: var(--text); font-size:1.5rem; cursor:pointer; }
.transaction-tabs { display:grid; grid-template-columns:repeat(3,minmax(0,1fr)); gap:8px; padding:5px; margin-bottom:20px; border:1px solid var(--line); border-radius:15px; background: rgba(148,163,184,.08); }
.transaction-tab { min-height:44px; border:1px solid transparent; border-radius:11px; background:transparent; color:var(--muted); font-weight:700; cursor:pointer; }
.transaction-tab.active { color:#fff; background: linear-gradient(135deg, var(--blue), var(--violet)); box-shadow: 0 8px 18px rgba(79,140,255,.2); }
.transaction-form-grid, .repayment-row { display:grid; grid-template-columns:repeat(2,minmax(0,1fr)); gap:16px; }
.transaction-form-grid .full { grid-column:1/-1; }
.transaction-modal label { display:grid; gap:7px; min-width:0; }
.transaction-modal label > span { color: var(--muted); font-size:.86rem; font-weight:700; }
.transaction-modal input, .transaction-modal select { width:100%; min-width:0; min-height:46px; padding:0 12px; border:1px solid var(--line); border-radius:12px; outline:none; background: var(--surface-solid); color: var(--text); }
body.dark .transaction-modal input, body.dark .transaction-modal select { background: rgba(7,11,22,.72); }
.transaction-modal input:focus, .transaction-modal select:focus, .transaction-tab:focus-visible, .modal-close:focus-visible { border-color: var(--cyan); box-shadow: 0 0 0 3px rgba(34,211,238,.16); }
.repayment-row.hidden { display:none; }
.form-error { display:none; margin:0 0 16px; padding:12px 14px; border:1px solid rgba(251,113,133,.42); border-radius:12px; background: rgba(251,113,133,.1); color: var(--red); font-weight:600; line-height:1.4; }
.form-error.visible { display:block; }

.table-wrap { width:100%; max-width:100%; overflow-x:auto; overflow-y:hidden; -webkit-overflow-scrolling:touch; }
.table-wrap table { width:100%; min-width:680px; border-collapse:collapse; }
.table-wrap th, .table-wrap td { overflow-wrap:anywhere; }

.budget-category-management-list { display:grid; gap:8px; margin-top:14px; }
.budget-category-management-row { display:flex; align-items:center; justify-content:space-between; gap:12px; padding:10px 12px; border:1px solid var(--line); border-radius:12px; background: rgba(79,140,255,.04); }
.budget-category-management-meta { display:grid; gap:3px; min-width:0; }
.budget-category-management-meta strong { overflow-wrap:anywhere; }
.budget-category-management-meta small { color: var(--muted); }
.budget-category-management-actions { display:flex; gap:6px; flex:0 0 auto; }
.budget-category-management-actions button { min-height:32px; padding:6px 9px; border:1px solid var(--line); border-radius:9px; background: rgba(148,163,184,.08); color: var(--text); font-size:.75rem; }
.budget-category-management-actions .delete { color: var(--red); }
.budget-category-type { display:grid; gap:8px; margin-top:12px; }
.budget-category-type select { min-height:42px; padding:0 12px; border:1px solid var(--line); border-radius:12px; background: var(--surface-solid); color: var(--text); }

.floating-add-transaction {
  position: fixed; right: clamp(16px, 3vw, 32px); bottom: clamp(16px, 3vw, 32px); width: 64px; height: 64px; min-height: 64px; padding: 0;
  border-radius: 50%; display: inline-grid; place-items: center; z-index: 90; background: linear-gradient(135deg, var(--blue), var(--violet)); color: white; border: none; box-shadow: 0 18px 40px rgba(79,140,255,0.35);
}
.floating-add-transaction span:first-child { width:auto; height:auto; background:transparent; font-size:2rem; line-height:1; }
.floating-add-transaction span:last-child { display:none; }
body.modal-open .floating-add-transaction { opacity:0; visibility:hidden; pointer-events:none; }

.topbar { position:relative; min-width:0; }
.topbar-actions { margin-left:auto; min-width:0; display:flex; align-items:center; justify-content:flex-end; gap:12px; flex-wrap:nowrap; }
.topbar-actions .month-picker { min-width:0; }
.topbar-actions .month-picker select { max-width:180px; }
.sync-status, #syncButton { flex:0 0 auto; white-space:nowrap; }

@media (max-width:820px) {
  .topbar { align-items:flex-start; flex-direction:column; gap:14px; }
  .topbar-actions { width:100%; justify-content:flex-end; flex-wrap:wrap; }
  .topbar-actions .month-picker { order:3; width:100%; }
  .topbar-actions .month-picker select { flex:1; max-width:none; }
}
@media (max-width:560px) {
  .transaction-form-grid, .repayment-row { grid-template-columns:1fr; gap:13px; }
  .transaction-form-grid .full { grid-column:auto; }
  .transaction-tabs { grid-template-columns:1fr; }
  .transaction-modal { max-height: calc(100dvh - 24px); border-radius:18px; }
  .topbar-actions { gap:8px; }
  .sync-status { max-width: calc(100% - 80px); overflow:hidden; text-overflow:ellipsis; }
  .floating-add-transaction { right: 16px; bottom: 16px; }
}
@media (prefers-reduced-motion: reduce) { .floating-add-transaction, .transaction-modal { transition:none; } }

/* Compatibility fix: prevent keyboard from auto-opening when modal opens on mobile */
#transactionModal input[name="amount"], #transactionModal input[name="note"], #transactionModal input[name="date"], #transactionModal input[name="repaymentAmount"] {
  font-size: 16px;
}

/* Ensure empty category states aren't auto-resurrected */
#categoryList .empty-state {
  color: var(--muted);
}

/* Force responsive transaction table to scroll horizontally rather than shrink */
.table-wrap {
  overflow-x: auto;
  width: 100%;
}
.table-wrap table {
  min-width: 720px;
}

/* no-op compatibility block to maintain theme styles in different browsers */
body.dark .panel,
body.dark .transaction-modal,
body.dark .settings-item,
body.dark .loan-item,
body.dark .quick-action,
body.dark .budget-bar-card {
  background: rgba(13,20,36,0.9);
}

/* Fix modal close / visibility for popup under phone browser */
.modal-backdrop.hidden { display: none !important; }
.transaction-modal .hidden { display: none !important; }

/* Remove built-in default sample category resurrection */
.category-default-hidden {
  display: none !important;
}

/* Keep Add Transaction features separated from Quick Entry */
.quick-action, .quick-action-row, .secondary-btn, .danger-btn { vertical-align: middle; }

/* Loan repayment tab should not show repayment amount in standard mode */
#repaymentFields.hidden { display: none !important; }

/* Disable keyboard autopopup from opening once modal is shown */
body.modal-open * { -webkit-tap-highlight-color: transparent; }

/* Transaction table responsiveness */
.transaction-table-wrap { overflow-x: auto; }
.transaction-table-wrap table { min-width: 720px; }

/* Mobile friendly modal layout */
@media (max-width: 560px) {
  .modal-backdrop { padding: 12px; }
  .transaction-modal { width: min(100%, 100%); }
}

/* Prevent default category list from reappearing when user removes categories */
#categoryList .settings-item button[data-remove-category] {
  cursor: pointer;
}

/* Theme-safe form controls */
.transaction-modal input,
.transaction-modal select,
.transaction-modal button,
.month-picker select,
#budgetCategory,
#categoryForm input,
#categoryForm select {
  font-size: 16px;
}

/* Fix category delete UI stuck */
.budget-category-management-row .delete {
  opacity: 1;
  pointer-events: auto;
}

/* Loan repayment items should not appear in standard type selectors */
select[name="type"] option[value="repayment"],
select[name="category"] option[value="Loan repayment"]:not(:checked) {
  display: none;
}

/* Fix hidden state resets */
.repayment-row.hidden,
.transaction-modal .hidden,
#repaymentFields.hidden {
  display: none !important;
}

/* keep bottom-right circular action from acting like text label */
.floating-add-transaction {
  text-indent: 0;
  letter-spacing: 0;
}

/* ensure popup closes consistent on mobile Safari */
.modal-close, [data-close-modal], .ghost-btn { -webkit-appearance: none; }

/* fix modal on small screens with safe area */
@supports (padding: max(0px)) {
  .modal-backdrop { padding: max(12px, env(safe-area-inset-bottom)) max(12px, env(safe-area-inset-right)) max(12px, env(safe-area-inset-left)) max(12px, env(safe-area-inset-top)); }
}

/* keep transaction table always scrollable */
#transactionTable td,
#transactionTable th {
  white-space: nowrap;
}

/* remove stale sample categories from default state */
[data-remove-category], .delete {
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

/* Add transaction should act like single-purpose button */
#floatingAddTransaction {
  cursor: pointer;
}

/* Loan tab should be visible in modal */
.transaction-tabs .transaction-tab[data-mode="loan"] {
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

/* suppress keyboard auto-open in modal input fields */
#transactionModal input {
  -webkit-user-modify: read-write-plaintext-only;
}

/* App theme compatibility */
@media (prefers-color-scheme: dark) {
  body:not(.dark) {
    background: radial-gradient(circle at 10% -10%, rgba(79,140,255,0.16), transparent 32%), radial-gradient(circle at 100% 0, rgba(139,92,246,0.14), transparent 30%), var(--bg);
  }
}

/* Avoid hidden repayment row in standard entry */
#repaymentFields {
  display: none;
}
#repaymentFields:not(.hidden) {
  display: grid;
}

/* Ensure proper amount field behavior */
input[name="amount"], input[name="repaymentAmount"] {
  appearance: textfield;
  -moz-appearance: textfield;
}

/* Date field compatibility */
input[type="date"] {
  color-scheme: light;
}
body.dark input[type="date"] {
  color-scheme: dark;
}

/* minimum mobile safe layout */
@media (max-width: 400px) {
  .transaction-modal { padding: 16px; }
  .modal-header { gap: 8px; }
}

/* table render state */
#transactionTable td:last-child, #transactionTable th:last-child {
  min-width: 80px;
}

