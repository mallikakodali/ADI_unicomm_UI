// Tab switching functionality
document.addEventListener('DOMContentLoaded', function() {
  const tabs = document.querySelectorAll('.tab');
  const overviewContent = document.getElementById('overview-content');
  const ledgerContent = document.getElementById('ledger-content');
  const consumptionContent = document.getElementById('consumption-content');
  const azureP3Content = document.getElementById('azure-p3-content');
  const commitBucketsContent = document.getElementById('commit-buckets-content');
  const billingSettingsContent = document.getElementById('billing-settings-content');
  const billingsContent = document.getElementById('billings-content');
  const pricingPlanContent = document.getElementById('pricing-plan-content');
  
  tabs.forEach(tab => {
    tab.addEventListener('click', function() {
      // Remove active class from all tabs
      tabs.forEach(t => t.classList.remove('active'));
      // Add active class to clicked tab
      this.classList.add('active');
      
      // Hide all tab contents
      overviewContent.style.display = 'none';
      if (ledgerContent) ledgerContent.style.display = 'none';
      consumptionContent.style.display = 'none';
      if (azureP3Content) azureP3Content.style.display = 'none';
      commitBucketsContent.style.display = 'none';
      billingSettingsContent.style.display = 'none';
      billingsContent.style.display = 'none';
      if (pricingPlanContent) pricingPlanContent.style.display = 'none';
      
      // Handle tab content visibility
      const tabName = this.getAttribute('data-tab');
      
      if (tabName === 'overview') {
        overviewContent.style.display = 'block';
      } else if (tabName === 'ledger') {
        if (ledgerContent) ledgerContent.style.display = 'block';
      } else if (tabName === 'consumption') {
        consumptionContent.style.display = 'block';
      } else if (tabName === 'azure-p3') {
        if (azureP3Content) azureP3Content.style.display = 'block';
      } else if (tabName === 'commit-buckets') {
        commitBucketsContent.style.display = 'block';
      } else if (tabName === 'billing-settings') {
        billingSettingsContent.style.display = 'block';
      } else if (tabName === 'billings') {
        billingsContent.style.display = 'block';
      } else if (tabName === 'pricing-plan') {
        if (pricingPlanContent) pricingPlanContent.style.display = 'block';
      }
    });
  });
});

// Edit mode toggle for billing schedules
let isEditMode = false;

function toggleEditMode() {
  isEditMode = !isEditMode;
  const billingSection = document.querySelector('.billing-channels-table');
  const editButton = document.querySelector('.section-header .toolbar-btn');
  
  if (isEditMode) {
    billingSection.classList.add('edit-mode');
    editButton.innerHTML = `
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M20 6L9 17l-5-5"/>
      </svg>
      Save Changes
    `;
    editButton.classList.add('primary');
    editButton.classList.remove('outline');
    
    // Show tooltip/hint
    showEditHint();
  } else {
    billingSection.classList.remove('edit-mode');
    editButton.innerHTML = `
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M17 3a2.828 2.828 0 114 4L7.5 20.5 2 22l1.5-5.5L17 3z"/>
      </svg>
      Edit Billing Schedule
    `;
    editButton.classList.remove('primary');
    editButton.classList.add('outline');
    
    // Hide hint
    hideEditHint();
  }
}

function showEditHint() {
  // Remove existing hint if any
  hideEditHint();
  
  const hint = document.createElement('div');
  hint.className = 'edit-hint';
  hint.innerHTML = '<strong>Edit Mode:</strong> Click on any installment row to modify the date or amount. Only Prepaid installment schedules can be edited.';
  
  const section = document.querySelector('.billing-channels-table');
  section.parentNode.insertBefore(hint, section);
}

function hideEditHint() {
  const existingHint = document.querySelector('.edit-hint');
  if (existingHint) {
    existingHint.remove();
  }
}

// Collapse All functionality for Billings tab
document.addEventListener('DOMContentLoaded', function() {
  const collapseBtn = document.getElementById('collapseAllBtn');
  if (collapseBtn) {
    let isCollapsed = false;
    collapseBtn.addEventListener('click', function() {
      isCollapsed = !isCollapsed;
      const rows = document.querySelectorAll('.billings-table tbody tr');
      
      if (isCollapsed) {
        this.innerHTML = `
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M6 9l6 6 6-6"/>
          </svg>
          Expand All
        `;
      } else {
        this.innerHTML = `
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M18 15l-6-6-6 6"/>
          </svg>
          Collapse All
        `;
      }
    });
  }
});

// Toggle Ledger Entries section
function toggleLedger(button) {
  const bucketCard = button.closest('.commit-bucket-card');
  const ledgerSection = bucketCard.querySelector('.ledger-section');
  
  if (ledgerSection) {
    const isVisible = ledgerSection.style.display !== 'none';
    ledgerSection.style.display = isVisible ? 'none' : 'block';
    button.classList.toggle('expanded', !isVisible);
  }
}

// P3 Modal Functions
function openP3Modal() {
  const modal = document.getElementById('p3Modal');
  if (modal) {
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
  }
}

function closeP3Modal() {
  const modal = document.getElementById('p3Modal');
  if (modal) {
    modal.style.display = 'none';
    document.body.style.overflow = '';
  }
}

// Close modal on overlay click
document.addEventListener('DOMContentLoaded', function() {
  const modalOverlay = document.getElementById('p3Modal');
  if (modalOverlay) {
    modalOverlay.addEventListener('click', function(e) {
      if (e.target === modalOverlay) {
        closeP3Modal();
      }
    });
  }
});

// Close modal on escape key
document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') {
    closeP3Modal();
  }
});

// Toggle Monthly Columns in Consumption tab
function toggleMonthlyColumns() {
  const table = document.getElementById('consumptionTable');
  const monthlyCols = table.querySelectorAll('.monthly-col');
  const toggle = document.querySelector('.table-actions .expand-toggle');
  const toggleText = document.getElementById('toggleMonthlyText');
  
  const isExpanded = !monthlyCols[0].classList.contains('collapsed');
  
  monthlyCols.forEach(col => {
    if (isExpanded) {
      col.classList.add('collapsed');
    } else {
      col.classList.remove('collapsed');
    }
  });
  
  if (isExpanded) {
    toggle.classList.remove('expanded');
    toggleText.textContent = 'Expand Monthly Breakdown';
  } else {
    toggle.classList.add('expanded');
    toggleText.textContent = 'Collapse Monthly Breakdown';
  }
}

// Monthly Data for Ledger Balance and CTD Reconciliation
// Incentives consumed first: OTD ($40k), Comp ($15k), Prepaid Rollover ($20k), Postpaid Rollover ($63k)
// Then Total Commit is consumed
// Monthly gross consumption = ~$73,912 (Cloud + Support + DSE)
// Incentives are fully consumed by Month 2

const monthlyData = {
  // Monthly consumption values (cumulative) - FIFO consumption of incentives
  // Order: OTD ($40k) → Comp ($15k) → Prepaid Rollover ($20k)
  // Total applied incentives: $75,000
  // Monthly gross = ~$73,912, then Total Commit is drawn
  consumption: {
    'may-2025': { 
      cloud: 50733, support: 9012, dse: 14167, 
      otd: 40000, comp: 15000, prepaidRollover: 18912,
      net: 0  // All covered by incentives ($73,912 applied)
    },
    'jun-2025': { 
      cloud: 101466, support: 18024, dse: 28334, 
      otd: 40000, comp: 15000, prepaidRollover: 20000,
      net: 72824  // $75k incentives fully depleted
    },
    'jul-2025': { 
      cloud: 152199, support: 27036, dse: 42501, 
      otd: 40000, comp: 15000, prepaidRollover: 20000,
      net: 146736
    },
    'aug-2025': { 
      cloud: 202932, support: 36048, dse: 56668, 
      otd: 40000, comp: 15000, prepaidRollover: 20000,
      net: 220648
    },
    'sep-2025': { 
      cloud: 253665, support: 45060, dse: 70835, 
      otd: 40000, comp: 15000, prepaidRollover: 20000,
      net: 294560
    },
    'oct-2025': { 
      cloud: 304398, support: 54072, dse: 85002, 
      otd: 40000, comp: 15000, prepaidRollover: 20000,
      net: 368472
    },
    'nov-2025': { 
      cloud: 355131, support: 63084, dse: 99169, 
      otd: 40000, comp: 15000, prepaidRollover: 20000,
      net: 442384
    },
    'dec-2025': { 
      cloud: 405864, support: 72096, dse: 113336, 
      otd: 40000, comp: 15000, prepaidRollover: 20000,
      net: 516296
    },
    'jan-2026': { 
      cloud: 456597, support: 81108, dse: 127503, 
      otd: 40000, comp: 15000, prepaidRollover: 20000,
      net: 590208
    },
    'feb-2026': { 
      cloud: 507330, support: 90120, dse: 141670, 
      otd: 40000, comp: 15000, prepaidRollover: 20000,
      net: 664120
    },
    'mar-2026': { 
      cloud: 558063, support: 99132, dse: 155837, 
      otd: 40000, comp: 15000, prepaidRollover: 20000,
      net: 738032
    },
    'apr-2026': { 
      cloud: 608800, support: 108144, dse: 170000, 
      otd: 40000, comp: 15000, prepaidRollover: 20000,
      net: 811944
    },
    'all': { 
      cloud: 608800, support: 108144, dse: 170000, 
      otd: 40000, comp: 15000, prepaidRollover: 20000, 
      net: 811944
    }
  },
  // Monthly billing values (cumulative) - billing happens at specific times
  billing: {
    'may-2025': { awsMP: 1000000, databricks: 1082000, p3: 100000, azureUncontrol: 0, sap: 0, total: 2182000 },
    'jun-2025': { awsMP: 1000000, databricks: 1082000, p3: 100000, azureUncontrol: 0, sap: 0, total: 2182000 },
    'jul-2025': { awsMP: 1000000, databricks: 1082000, p3: 100000, azureUncontrol: 0, sap: 0, total: 2182000 },
    'aug-2025': { awsMP: 1000000, databricks: 1082000, p3: 100000, azureUncontrol: 0, sap: 2000, total: 2184000 },
    'sep-2025': { awsMP: 1000000, databricks: 1082000, p3: 100000, azureUncontrol: 0, sap: 2000, total: 2184000 },
    'oct-2025': { awsMP: 1000000, databricks: 1082000, p3: 100000, azureUncontrol: 0, sap: 2000, total: 2184000 },
    'nov-2025': { awsMP: 1000000, databricks: 1082000, p3: 100000, azureUncontrol: 50000, sap: 4000, total: 2236000 },
    'dec-2025': { awsMP: 1000000, databricks: 1082000, p3: 100000, azureUncontrol: 50000, sap: 4000, total: 2236000 },
    'jan-2026': { awsMP: 1000000, databricks: 1082000, p3: 100000, azureUncontrol: 50000, sap: 4000, total: 2236000 },
    'feb-2026': { awsMP: 1000000, databricks: 1082000, p3: 100000, azureUncontrol: 100000, sap: 6000, total: 2288000 },
    'mar-2026': { awsMP: 1000000, databricks: 1082000, p3: 100000, azureUncontrol: 100000, sap: 6000, total: 2288000 },
    'apr-2026': { awsMP: 1000000, databricks: 1082000, p3: 100000, azureUncontrol: 100000, sap: 8000, total: 2290000 },
    'all': { awsMP: 1000000, databricks: 1082000, p3: 100000, azureUncontrol: 100000, sap: 8000, total: 2290000 }
  }
};

// Format currency
function formatCurrency(value) {
  return '$' + value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

// Update Ledger Balance based on selected month
function updateLedgerBalance(month) {
  const consumption = monthlyData.consumption[month];
  const billing = monthlyData.billing[month];
  
  if (!consumption || !billing) {
    console.log('No data for month:', month);
    return;
  }
  
  const difference = billing.total - consumption.net;
  
  // Find the ledger pane (third commit-pane in the grid)
  const commitPanes = document.querySelectorAll('#ledger-content .commit-panes-grid .commit-pane');
  const ledgerPane = commitPanes[2]; // Third pane (index 2)
  
  if (!ledgerPane) {
    console.log('Ledger pane not found');
    return;
  }
  
  // Update main Ledger Balance Result
  const allPaneRows = ledgerPane.querySelectorAll('.pane-rows');
  
  // First pane-rows is the main result (Total Billed, Total Consumption, Difference)
  if (allPaneRows[0]) {
    const mainRows = allPaneRows[0].querySelectorAll('.pane-row');
    if (mainRows.length >= 3) {
      mainRows[0].querySelector('span:last-child').textContent = formatCurrency(billing.total);
      mainRows[1].querySelector('span:last-child').textContent = formatCurrency(consumption.net);
      mainRows[2].querySelector('span:last-child').textContent = formatCurrency(difference);
    }
  }
  
  // Second pane-rows is inside first ledger-section (Total Net Consumption breakdown)
  if (allPaneRows[1]) {
    const consumptionRows = allPaneRows[1].querySelectorAll('.pane-row');
    if (consumptionRows.length >= 7) {
      consumptionRows[0].querySelector('span:last-child').textContent = formatCurrency(consumption.cloud);
      consumptionRows[1].querySelector('span:last-child').textContent = formatCurrency(consumption.support);
      consumptionRows[2].querySelector('span:last-child').textContent = formatCurrency(consumption.dse);
      consumptionRows[3].querySelector('span:last-child').textContent = '($' + consumption.otd.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + ')';
      consumptionRows[4].querySelector('span:last-child').textContent = '($' + consumption.comp.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + ')';
      consumptionRows[5].querySelector('span:last-child').textContent = '($' + consumption.prepaidRollover.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + ')';
      consumptionRows[6].querySelector('span:last-child').textContent = formatCurrency(consumption.net);
    }
  }
  
  // Third pane-rows is inside second ledger-section (Total Billed breakdown)
  if (allPaneRows[2]) {
    const billingRows = allPaneRows[2].querySelectorAll('.pane-row');
    if (billingRows.length >= 6) {
      billingRows[0].querySelector('span:last-child').textContent = formatCurrency(billing.awsMP);
      billingRows[1].querySelector('span:last-child').textContent = formatCurrency(billing.databricks);
      billingRows[2].querySelector('span:last-child').textContent = formatCurrency(billing.p3);
      billingRows[3].querySelector('span:last-child').textContent = formatCurrency(billing.azureUncontrol);
      billingRows[4].querySelector('span:last-child').textContent = formatCurrency(billing.sap);
      billingRows[5].querySelector('span:last-child').textContent = formatCurrency(billing.total);
    }
  }
}

// Update CTD Reconciliation based on selected month
function updateCTDReconciliation(month) {
  const consumption = monthlyData.consumption[month];
  const billing = monthlyData.billing[month];
  
  if (!consumption || !billing) return;
  
  const difference = billing.total - consumption.net;
  const isBurst = consumption.net > billing.total;
  const burstAmount = isBurst ? consumption.net - billing.total : 0;
  
  // Find CTD Reconciliation section (first recon-two-pane-grid in ledger content)
  const ctdSection = document.querySelector('#ledger-content .section-header-row + .recon-two-pane-grid') ||
                     document.querySelector('#ledger-content .recon-two-pane-grid');
  
  if (ctdSection) {
    const reconPanes = ctdSection.querySelectorAll('.recon-pane');
    
    // Update CTD Recon Breakdown (first pane)
    if (reconPanes[0]) {
      const rows = reconPanes[0].querySelectorAll('.pane-row');
      if (rows.length >= 3) {
        rows[0].querySelector('span:last-child').textContent = formatCurrency(consumption.net);
        rows[1].querySelector('span:last-child').textContent = formatCurrency(billing.total);
        rows[2].querySelector('span:last-child').textContent = isBurst ? 'Burst (Consumption > Billed)' : 'No Burst (Billed > Consumption)';
      }
    }
    
    // Update Burst Allocation (second pane)
    if (reconPanes[1]) {
      const burstRow = reconPanes[1].querySelector('.pane-row.total span:last-child');
      if (burstRow) {
        burstRow.textContent = isBurst ? formatCurrency(burstAmount) : 'N/A';
      }
    }
  }
}

// Initialize month filter event listeners
document.addEventListener('DOMContentLoaded', function() {
  // Ledger Balance month filter
  const ledgerMonthFilter = document.getElementById('ledgerMonthFilter');
  if (ledgerMonthFilter) {
    ledgerMonthFilter.addEventListener('change', function() {
      updateLedgerBalance(this.value);
    });
  }
  
  // CTD Reconciliation month filter
  const ctdMonthFilter = document.getElementById('ctdMonthFilter');
  if (ctdMonthFilter) {
    ctdMonthFilter.addEventListener('change', function() {
      updateCTDReconciliation(this.value);
    });
  }
});

// Toggle Ledger Entries in Commit Buckets tab
function toggleLedgerEntries(button) {
  const bucketCard = button.closest('.commit-bucket-card');
  const ledgerExpanded = bucketCard.querySelector('.bucket-ledger-expanded');
  
  if (ledgerExpanded) {
    const isHidden = ledgerExpanded.style.display === 'none' || ledgerExpanded.style.display === '';
    ledgerExpanded.style.display = isHidden ? 'block' : 'none';
    button.classList.toggle('expanded', isHidden);
  }
}

// Make toggleLedgerEntries available globally
window.toggleLedgerEntries = toggleLedgerEntries;

// Billing Detail Modal Data
const billingDetailData = {
  'commit-db-y1': {
    id: 'db-commit-2025-001',
    status: 'Finalized',
    statusClass: 'finalized',
    billingPeriod: 'May 9 - 31, 2025',
    postingPeriod: 'May 2025',
    postingDate: 'May 9, 2025',
    billingDate: 'May 9, 2025',
    nsIdentifier: '--',
    nsSalesOrderId: '17291001',
    nsClass: 'MC',
    nsIntegration: 'Will integrate to NetSuite',
    nsIntegrationClass: 'integrate',
    reseller: '--',
    isCommit: true,
    items: [
      { sku: 'DB-COMMIT-PREPAID', desc: 'Databricks Commit - Prepaid Installment', cloud: 'All', qty: '1.000', price: '$1,082,000.00', gross: '$1,082,000.00' }
    ],
    totalItems: 1,
    totalGross: '$1,082,000.00'
  },
  'commit-aws-y1': {
    id: 'aws-commit-2025-001',
    status: 'Finalized',
    statusClass: 'finalized',
    billingPeriod: 'May 9 - 31, 2025',
    postingPeriod: 'May 2025',
    postingDate: 'May 9, 2025',
    billingDate: 'May 9, 2025',
    nsIdentifier: '--',
    nsSalesOrderId: '17291002',
    nsClass: 'MC',
    nsIntegration: 'Will integrate to NetSuite',
    nsIntegrationClass: 'integrate',
    reseller: '--',
    isCommit: true,
    items: [
      { sku: 'DB-COMMIT-PREPAID-AWS', desc: 'Databricks Commit - AWS Marketplace Prepaid', cloud: 'AWS', qty: '1.000', price: '$1,000,000.00', gross: '$1,000,000.00' }
    ],
    totalItems: 1,
    totalGross: '$1,000,000.00'
  },
  'indeal-burst-feb': {
    id: 'burst-2026-002',
    status: 'Draft',
    statusClass: 'draft',
    billingPeriod: 'Feb 1 - 28, 2026',
    postingPeriod: 'Feb 2026',
    postingDate: 'Feb 28, 2026',
    billingDate: 'Mar 1, 2026',
    nsIdentifier: '--',
    nsSalesOrderId: '17292138',
    nsClass: 'MC',
    nsIntegration: 'Will integrate to NetSuite',
    nsIntegrationClass: 'integrate',
    reseller: '--',
    isCommit: false,
    items: [
      { sku: 'DB-BURST-COMPUTE', desc: 'Premium All-Purpose Compute', cloud: 'AWS', qty: '12,456.231', price: '$0.25', gross: '$3,114.06', net: '$3,114.06' },
      { sku: 'DB-BURST-COMPUTE-PHT', desc: 'Premium All-Purpose Compute (Photon)', cloud: 'AWS', qty: '5,373.420', price: '$0.25', gross: '$1,343.36', net: '$1,343.36' },
      { sku: 'DB-BURST-JOBS', desc: 'Premium Jobs Compute', cloud: 'AWS', qty: '1,074.481', price: '$0.06', gross: '$64.47', net: '$64.47' },
      { sku: 'DB-BURST-SERVERLESS', desc: 'Premium Serverless Compute', cloud: 'AWS', qty: '2,916.821', price: '$0.17', gross: '$495.86', net: '$495.86' },
      { sku: 'DB-BURST-SQL', desc: 'Premium Serverless SQL Compute', cloud: 'AWS', qty: '0.198', price: '$0.36', gross: '$0.07', net: '$0.07' },
      { sku: 'DB-BURST-STORAGE', desc: 'Premium Databricks Storage', cloud: 'AWS', qty: '0.642', price: '$1.08', gross: '$0.69', net: '$0.69' }
    ],
    totalItems: 6,
    totalGross: '$5,018.46',
    totalNet: '$5,018.46'
  },
  'drawdown-aws-jan': {
    id: 'drawdown-2026-001',
    status: 'Finalized',
    statusClass: 'finalized',
    billingPeriod: 'Jan 1 - 31, 2026',
    postingPeriod: 'Jan 2026',
    postingDate: 'Jan 31, 2026',
    billingDate: 'Feb 1, 2026',
    nsIdentifier: '--',
    nsSalesOrderId: '--',
    nsClass: 'MC',
    nsIntegration: 'Will NOT integrate to NetSuite',
    nsIntegrationClass: 'no-integrate',
    reseller: '--',
    isCommit: false,
    isDrawdown: true,
    items: [
      { sku: 'AWS-PREMIUM-COMPUTE', desc: 'AWS Premium All-Purpose Compute', cloud: 'AWS', qty: '156,892.41', price: '$0.25', gross: '$39,223.10', net: 'N/A' },
      { sku: 'AWS-PREMIUM-COMPUTE-PHT', desc: 'AWS Premium All-Purpose Compute (Photon)', cloud: 'AWS', qty: '42,315.68', price: '$0.25', gross: '$10,578.92', net: 'N/A' },
      { sku: 'AWS-PREMIUM-JOBS', desc: 'AWS Premium Jobs Compute', cloud: 'AWS', qty: '187,448.10', price: '$0.06', gross: '$11,246.89', net: 'N/A' },
      { sku: 'AWS-PREMIUM-JOBS-PHT', desc: 'AWS Premium Jobs Compute (Photon)', cloud: 'AWS', qty: '21,335.80', price: '$0.05', gross: '$1,066.79', net: 'N/A' },
      { sku: 'AWS-SERVERLESS', desc: 'AWS Premium Serverless Compute', cloud: 'AWS', qty: '24,118.20', price: '$0.17', gross: '$4,100.09', net: 'N/A' },
      { sku: 'AWS-SERVERLESS-SQL', desc: 'AWS Premium Serverless SQL Compute', cloud: 'AWS', qty: '5,955.10', price: '$0.36', gross: '$2,143.84', net: 'N/A' },
      { sku: 'AWS-STORAGE', desc: 'AWS Premium Databricks Storage', cloud: 'AWS', qty: '277,618.50', price: '$0.02', gross: '$5,552.37', net: 'N/A' }
    ],
    totalItems: 7,
    totalGross: '$73,912.00',
    totalNet: 'N/A'
  },
  'drawdown-aws-feb': {
    id: 'drawdown-2026-002',
    status: 'Draft',
    statusClass: 'draft',
    billingPeriod: 'Feb 1 - 28, 2026',
    postingPeriod: 'Feb 2026',
    postingDate: 'Feb 28, 2026',
    billingDate: 'Mar 1, 2026',
    nsIdentifier: '--',
    nsSalesOrderId: '--',
    nsClass: 'MC',
    nsIntegration: 'Will NOT integrate to NetSuite',
    nsIntegrationClass: 'no-integrate',
    reseller: '--',
    isCommit: false,
    isDrawdown: true,
    items: [
      { sku: 'AWS-PREMIUM-COMPUTE', desc: 'AWS Premium All-Purpose Compute', cloud: 'AWS', qty: '156,892.41', price: '$0.25', gross: '$39,223.10', net: 'N/A' },
      { sku: 'AWS-PREMIUM-COMPUTE-PHT', desc: 'AWS Premium All-Purpose Compute (Photon)', cloud: 'AWS', qty: '42,315.68', price: '$0.25', gross: '$10,578.92', net: 'N/A' },
      { sku: 'AWS-PREMIUM-JOBS', desc: 'AWS Premium Jobs Compute', cloud: 'AWS', qty: '187,448.10', price: '$0.06', gross: '$11,246.89', net: 'N/A' },
      { sku: 'AWS-PREMIUM-JOBS-PHT', desc: 'AWS Premium Jobs Compute (Photon)', cloud: 'AWS', qty: '21,335.80', price: '$0.05', gross: '$1,066.79', net: 'N/A' },
      { sku: 'AWS-SERVERLESS', desc: 'AWS Premium Serverless Compute', cloud: 'AWS', qty: '24,118.20', price: '$0.17', gross: '$4,100.09', net: 'N/A' },
      { sku: 'AWS-SERVERLESS-SQL', desc: 'AWS Premium Serverless SQL Compute', cloud: 'AWS', qty: '5,955.10', price: '$0.36', gross: '$2,143.84', net: 'N/A' },
      { sku: 'AWS-STORAGE', desc: 'AWS Premium Databricks Storage', cloud: 'AWS', qty: '277,618.50', price: '$0.02', gross: '$5,552.37', net: 'N/A' }
    ],
    totalItems: 7,
    totalGross: '$73,912.00',
    totalNet: 'N/A'
  },
  'postpaid-azure-dec': {
    id: 'postpaid-2025-012',
    status: 'Finalized',
    statusClass: 'finalized',
    billingPeriod: 'Dec 1 - 31, 2025',
    postingPeriod: 'Dec 2025',
    postingDate: 'Dec 31, 2025',
    billingDate: 'Jan 1, 2026',
    nsIdentifier: '--',
    nsSalesOrderId: '17291856',
    nsClass: 'MC',
    nsIntegration: 'Will integrate to NetSuite',
    nsIntegrationClass: 'integrate',
    reseller: '--',
    isCommit: false,
    items: [
      { sku: 'AZURE-PREMIUM-COMPUTE', desc: 'Azure Premium All-Purpose Compute', cloud: 'Azure', qty: '98,456.123', price: '$0.25', gross: '$24,614.03', net: '$24,614.03' },
      { sku: 'AZURE-PREMIUM-JOBS', desc: 'Azure Premium Jobs Compute', cloud: 'Azure', qty: '156,234.000', price: '$0.06', gross: '$9,374.04', net: '$9,374.04' },
      { sku: 'AZURE-SERVERLESS', desc: 'Azure Premium Serverless Compute', cloud: 'Azure', qty: '24,891.000', price: '$0.17', gross: '$4,231.47', net: '$4,231.47' },
      { sku: 'AZURE-STORAGE', desc: 'Azure Premium Databricks Storage', cloud: 'Azure', qty: '89,413.000', price: '$0.02', gross: '$1,788.26', net: '$1,788.26' }
    ],
    totalItems: 4,
    totalGross: '$40,007.80',
    totalNet: '$40,007.80'
  },
  'postpaid-direct-jan': {
    id: 'postpaid-2026-001',
    status: 'Sent',
    statusClass: 'sent',
    billingPeriod: 'Jan 1 - 31, 2026',
    postingPeriod: 'Jan 2026',
    postingDate: 'Jan 31, 2026',
    billingDate: 'Feb 1, 2026',
    nsIdentifier: '--',
    nsSalesOrderId: '17292145',
    nsClass: 'MC',
    nsIntegration: 'Will integrate to NetSuite',
    nsIntegrationClass: 'integrate',
    reseller: '--',
    isCommit: false,
    items: [
      { sku: 'DB-PREMIUM-COMPUTE', desc: 'Databricks Premium All-Purpose Compute', cloud: 'Direct', qty: '3,456.123', price: '$0.25', gross: '$864.03', net: '$864.03' },
      { sku: 'DB-PREMIUM-JOBS', desc: 'Databricks Premium Jobs Compute', cloud: 'Direct', qty: '5,234.000', price: '$0.06', gross: '$314.04', net: '$314.04' },
      { sku: 'DB-STORAGE', desc: 'Databricks Premium Storage', cloud: 'Direct', qty: '8,082.000', price: '$0.02', gross: '$161.64', net: '$161.64' }
    ],
    totalItems: 3,
    totalGross: '$1,339.71',
    totalNet: '$1,339.71'
  },
  'postpaid-azure-jan': {
    id: 'postpaid-2026-002',
    status: 'Finalized',
    statusClass: 'finalized',
    billingPeriod: 'Jan 1 - 31, 2026',
    postingPeriod: 'Jan 2026',
    postingDate: 'Jan 31, 2026',
    billingDate: 'Feb 1, 2026',
    nsIdentifier: '--',
    nsSalesOrderId: '17292146',
    nsClass: 'MC',
    nsIntegration: 'Will integrate to NetSuite',
    nsIntegrationClass: 'integrate',
    reseller: '--',
    isCommit: false,
    items: [
      { sku: 'AZURE-PREMIUM-COMPUTE', desc: 'Azure Premium All-Purpose Compute', cloud: 'Azure', qty: '102,345.678', price: '$0.25', gross: '$25,586.42', net: '$25,586.42' },
      { sku: 'AZURE-PREMIUM-JOBS', desc: 'Azure Premium Jobs Compute', cloud: 'Azure', qty: '134,567.000', price: '$0.06', gross: '$8,074.02', net: '$8,074.02' },
      { sku: 'AZURE-SERVERLESS', desc: 'Azure Premium Serverless Compute', cloud: 'Azure', qty: '21,456.000', price: '$0.17', gross: '$3,647.52', net: '$3,647.52' },
      { sku: 'AZURE-STORAGE', desc: 'Azure Premium Databricks Storage', cloud: 'Azure', qty: '46,547.000', price: '$0.02', gross: '$930.94', net: '$930.94' }
    ],
    totalItems: 4,
    totalGross: '$38,238.90',
    totalNet: '$38,238.90'
  },
  'overage-azure-jan': {
    id: 'overage-2026-001',
    status: 'Finalized',
    statusClass: 'finalized',
    billingPeriod: 'Jan 1 - 31, 2026',
    postingPeriod: 'Jan 2026',
    postingDate: 'Jan 31, 2026',
    billingDate: 'Feb 1, 2026',
    nsIdentifier: '--',
    nsSalesOrderId: '--',
    nsClass: 'MC',
    nsIntegration: 'Will integrate to NetSuite',
    nsIntegrationClass: 'integrate',
    reseller: '--',
    isCommit: false,
    items: [],
    totalItems: 0,
    totalGross: '$0.00',
    totalNet: '$0.00'
  }
};

// Open Billing Detail Modal
function openBillingDetail(event, billingKey) {
  event.preventDefault();
  
  const data = billingDetailData[billingKey];
  if (!data) return;
  
  const modal = document.getElementById('billingDetailModal');
  
  // Populate modal data
  document.getElementById('modalBillingId').textContent = data.id;
  document.getElementById('modalStatus').textContent = data.status;
  document.getElementById('modalStatus').className = 'meta-badge ' + data.statusClass;
  document.getElementById('modalBillingPeriod').textContent = data.billingPeriod;
  document.getElementById('modalPostingPeriod').textContent = data.postingPeriod;
  document.getElementById('modalPostingDate').textContent = data.postingDate;
  document.getElementById('modalBillingDate').textContent = data.billingDate;
  document.getElementById('modalNsIdentifier').textContent = data.nsIdentifier;
  
  if (data.nsSalesOrderId === '--') {
    document.getElementById('modalNsSalesOrderId').innerHTML = '--';
  } else {
    document.getElementById('modalNsSalesOrderId').innerHTML = '<a href="#" class="info-link">' + data.nsSalesOrderId + ' <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/><path d="M15 3h6v6"/><path d="M10 14L21 3"/></svg></a>';
  }
  
  document.getElementById('modalNsClass').textContent = data.nsClass;
  document.getElementById('modalNsIntegration').textContent = data.nsIntegration;
  document.getElementById('modalNsIntegration').className = 'modal-info-value ' + data.nsIntegrationClass;
  document.getElementById('modalReseller').textContent = data.reseller;
  
  // Build billing items table
  // Show Net Amount column only for non-commit and non-drawdown items
  const showNetColumn = !data.isCommit && !data.isDrawdown;
  
  let tableHtml = '<table class="modal-billing-table"><thead><tr>';
  tableHtml += '<th>SKU</th><th>Description</th><th>Cloud</th><th>Quantity</th><th>Unit Price</th><th>Gross Amount</th>';
  if (showNetColumn) {
    tableHtml += '<th>Net Amount</th>';
  }
  tableHtml += '</tr></thead><tbody>';
  
  const colspan = showNetColumn ? 7 : 6;
  
  if (data.items.length === 0) {
    tableHtml += '<tr><td colspan="' + colspan + '" style="text-align: center; color: var(--text-muted); padding: 24px;">No billing items for this period</td></tr>';
  } else {
    data.items.forEach(item => {
      tableHtml += '<tr>';
      tableHtml += '<td>' + item.sku + '</td>';
      tableHtml += '<td>' + item.desc + '</td>';
      tableHtml += '<td>' + item.cloud + '</td>';
      tableHtml += '<td class="number">' + item.qty + '</td>';
      tableHtml += '<td class="amount">' + item.price + '</td>';
      tableHtml += '<td class="amount">' + item.gross + '</td>';
      if (showNetColumn) {
        tableHtml += '<td class="amount">' + (item.net || item.gross) + '</td>';
      }
      tableHtml += '</tr>';
    });
  }
  
  tableHtml += '</tbody><tfoot><tr>';
  const footerColspan = 5;
  tableHtml += '<td colspan="' + footerColspan + '" class="total-label">Total (' + data.totalItems + ' items):</td>';
  tableHtml += '<td class="amount"><strong>' + data.totalGross + '</strong></td>';
  if (showNetColumn) {
    tableHtml += '<td class="amount"><strong>' + (data.totalNet || data.totalGross) + '</strong></td>';
  }
  tableHtml += '</tr></tfoot></table>';
  
  document.getElementById('modalBillingTable').innerHTML = tableHtml;
  
  // Show modal
  modal.style.display = 'flex';
  document.body.style.overflow = 'hidden';
}

// Close Billing Detail Modal
function closeBillingDetail() {
  const modal = document.getElementById('billingDetailModal');
  modal.style.display = 'none';
  document.body.style.overflow = '';
}

// Close modal on escape key
document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') {
    closeBillingDetail();
  }
});

// Close modal on backdrop click
document.addEventListener('click', function(e) {
  const modal = document.getElementById('billingDetailModal');
  if (e.target === modal) {
    closeBillingDetail();
  }
});

// Make functions available globally
window.openBillingDetail = openBillingDetail;
window.closeBillingDetail = closeBillingDetail;
