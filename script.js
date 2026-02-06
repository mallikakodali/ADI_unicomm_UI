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
  // Monthly consumption values (cumulative) - Contract: Feb 2026 - Feb 2027
  // OTD ($10k) applied in first month
  // Consumption data: Compute + Support (18% of compute), minus OTD in first month
  consumption: {
    'feb-2026': { 
      cloud: 50941, support: 5094, dse: 0, 
      otd: 10000, comp: 0, prepaidRollover: 0,
      net: 46035  // 50941 + 5094 - 10000
    },
    'mar-2026': { 
      cloud: 110330, support: 11033, dse: 0,
      otd: 10000, comp: 0, prepaidRollover: 0,
      net: 111363  // 46035 + 65328
    },
    'apr-2026': { 
      cloud: 163086, support: 16309, dse: 0,
      otd: 10000, comp: 0, prepaidRollover: 0,
      net: 169395  // 111363 + 58032
    },
    'may-2026': { 
      cloud: 217310, support: 21731, dse: 0,
      otd: 10000, comp: 0, prepaidRollover: 0,
      net: 229041  // 169395 + 59646
    },
    'jun-2026': { 
      cloud: 267785, support: 26779, dse: 0,
      otd: 10000, comp: 0, prepaidRollover: 0,
      net: 284564  // 229041 + 55523
    },
    'jul-2026': { 
      cloud: 321324, support: 32133, dse: 0,
      otd: 10000, comp: 0, prepaidRollover: 0,
      net: 343457  // 284564 + 58893
    },
    'aug-2026': { 
      cloud: 376914, support: 37692, dse: 0,
      otd: 10000, comp: 0, prepaidRollover: 0,
      net: 404606  // 343457 + 61149
    },
    'sep-2026': { 
      cloud: 434354, support: 43436, dse: 0,
      otd: 10000, comp: 0, prepaidRollover: 0,
      net: 467790  // 404606 + 63184
    },
    'oct-2026': { 
      cloud: 487884, support: 48788, dse: 0,
      otd: 10000, comp: 0, prepaidRollover: 0,
      net: 526672  // 467790 + 58882 (MTD)
    },
    'all': { 
      cloud: 487884, support: 48788, dse: 0, 
      otd: 10000, comp: 0, prepaidRollover: 0, 
      net: 526672
    }
  },
  // Monthly billing values (cumulative)
  // Prepaid at start: Direct $100k, AWS MP $50k, Azure P3 $500k = $650k
  // In-deal burst: $8,041 (Azure Premium OpenAI exceeds Direct prepaid in Oct)
  billing: {
    'feb-2026': { direct: 100000, awsMP: 50000, p3: 500000, burst: 0, total: 650000 },
    'mar-2026': { direct: 100000, awsMP: 50000, p3: 500000, burst: 0, total: 650000 },
    'apr-2026': { direct: 100000, awsMP: 50000, p3: 500000, burst: 0, total: 650000 },
    'may-2026': { direct: 100000, awsMP: 50000, p3: 500000, burst: 0, total: 650000 },
    'jun-2026': { direct: 100000, awsMP: 50000, p3: 500000, burst: 0, total: 650000 },
    'jul-2026': { direct: 100000, awsMP: 50000, p3: 500000, burst: 0, total: 650000 },
    'aug-2026': { direct: 100000, awsMP: 50000, p3: 500000, burst: 0, total: 650000 },
    'sep-2026': { direct: 100000, awsMP: 50000, p3: 500000, burst: 0, total: 650000 },
    'oct-2026': { direct: 100000, awsMP: 50000, p3: 500000, burst: 8041, total: 658041 },
    'all': { direct: 100000, awsMP: 50000, p3: 500000, burst: 8041, total: 658041 }
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
  
  // First pane-rows (index 0) is the main result (Total Billed, Total Consumption, Difference)
  if (allPaneRows[0]) {
    const mainRows = allPaneRows[0].querySelectorAll('.pane-row');
    if (mainRows.length >= 3) {
      mainRows[0].querySelector('span:last-child').textContent = formatCurrency(billing.total);
      mainRows[1].querySelector('span:last-child').textContent = formatCurrency(consumption.net);
      mainRows[2].querySelector('span:last-child').textContent = formatCurrency(difference);
    }
  }
  
  // Second pane-rows (index 1) is Total Net Consumption breakdown
  if (allPaneRows[1]) {
    const consumptionRows = allPaneRows[1].querySelectorAll('.pane-row');
    if (consumptionRows.length >= 5) {
      consumptionRows[0].querySelector('span:last-child').textContent = formatCurrency(consumption.cloud);
      consumptionRows[1].querySelector('span:last-child').textContent = formatCurrency(consumption.support);
      consumptionRows[2].querySelector('span:last-child').textContent = formatCurrency(consumption.dse);
      consumptionRows[3].querySelector('span:last-child').textContent = '($' + consumption.otd.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + ')';
      consumptionRows[4].querySelector('span:last-child').textContent = formatCurrency(consumption.net);
    }
  }
  
  // Third pane-rows (index 2) is Total Billed breakdown
  if (allPaneRows[2]) {
    const billingRows = allPaneRows[2].querySelectorAll('.pane-row');
    if (billingRows.length >= 5) {
      billingRows[0].querySelector('span:last-child').textContent = formatCurrency(billing.direct);
      billingRows[1].querySelector('span:last-child').textContent = formatCurrency(billing.awsMP);
      billingRows[2].querySelector('span:last-child').textContent = formatCurrency(billing.p3);
      // Burst row - show amount or $0.00 if no burst
      billingRows[3].querySelector('span:last-child').textContent = formatCurrency(billing.burst);
      billingRows[4].querySelector('span:last-child').textContent = formatCurrency(billing.total);
    }
  }
}

// Update CTD Reconciliation based on selected month
function updateCTDReconciliation(month) {
  const consumption = monthlyData.consumption[month];
  const billing = monthlyData.billing[month];
  
  if (!consumption || !billing) return;
  
  // In-deal burst only shows in Oct when Azure Premium OpenAI exceeds Direct prepaid
  const hasBurst = billing.burst > 0;
  
  // Find CTD Reconciliation section
  const ctdSection = document.querySelector('#ledger-content .recon-two-pane-grid');
  
  if (ctdSection) {
    const reconPanes = ctdSection.querySelectorAll('.recon-pane');
    
    // Update CTD Recon Breakdown (first pane)
    if (reconPanes[0]) {
      const rows = reconPanes[0].querySelectorAll('.pane-row');
      if (rows.length >= 3) {
        rows[0].querySelector('span:last-child').textContent = formatCurrency(billing.total);
        rows[1].querySelector('span:last-child').textContent = formatCurrency(consumption.net);
        // CTD Status
        const statusSpan = rows[2].querySelector('span:last-child');
        if (hasBurst) {
          statusSpan.textContent = 'In-Deal Burst';
          statusSpan.className = 'burst-amount';
        } else {
          statusSpan.textContent = 'No Burst';
          statusSpan.className = '';
        }
      }
    }
    
    // Update Burst Allocation (second pane)
    if (reconPanes[1]) {
      const burstRow = reconPanes[1].querySelector('.pane-row.total span:last-child');
      if (burstRow) {
        if (hasBurst) {
          burstRow.textContent = formatCurrency(billing.burst);
          burstRow.className = 'burst-amount';
        } else {
          burstRow.textContent = 'N/A';
          burstRow.className = '';
        }
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
  'indeal-burst-oct': {
    id: 'burst-2026-010',
    status: 'Draft',
    statusClass: 'draft',
    billingTag: 'In-deal Burst',
    billingTagClass: 'in-deal',
    billingPeriod: 'Oct 1 - 31, 2026',
    postingPeriod: 'Oct 2026',
    postingDate: 'Oct 31, 2026',
    billingDate: 'Nov 1, 2026',
    nsIdentifier: '--',
    nsSalesOrderId: '--',
    nsClass: 'MC',
    nsIntegration: 'Will integrate to NetSuite',
    nsIntegrationClass: 'integrate',
    reseller: '--',
    isCommit: false,
    items: [
      { sku: 'DB-BURST-INDEAL', desc: 'In-Deal Burst - Direct Channel', cloud: 'Direct', qty: '1.000', price: '$8,041.00', gross: '$8,041.00', net: '$8,041.00' }
    ],
    totalItems: 1,
    totalGross: '$8,041.00',
    totalNet: '$8,041.00'
  },
  // Feb 2026: Compute $50,941 (AWS $5,441, Azure $45,500 incl OpenAI $9,169), Support $5,094
  'drawdown-feb-2026': {
    id: 'drawdown-2026-002',
    status: 'Finalized',
    statusClass: 'finalized',
    billingTag: 'Drawdown Statement',
    billingTagClass: 'drawdown',
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
      { sku: 'AZURE-OPENAI-SERVING', desc: 'Azure Premium OpenAI Serving Model', cloud: 'Azure', qty: '9,169.00', price: '$1.00', gross: '$9,169.00', net: 'N/A' },
      { sku: 'AZURE-PREMIUM-COMPUTE', desc: 'Azure Premium All-Purpose Compute', cloud: 'Azure', qty: '87,594.00', price: '$0.25', gross: '$21,898.50', net: 'N/A' },
      { sku: 'AZURE-PREMIUM-JOBS', desc: 'Azure Premium Jobs Compute', cloud: 'Azure', qty: '120,525.00', price: '$0.06', gross: '$7,231.50', net: 'N/A' },
      { sku: 'AZURE-SERVERLESS-SQL', desc: 'Azure Premium Serverless SQL', cloud: 'Azure', qty: '20,003.00', price: '$0.36', gross: '$7,201.00', net: 'N/A' },
      { sku: 'AWS-PREMIUM-COMPUTE', desc: 'AWS Premium All-Purpose Compute', cloud: 'AWS', qty: '13,082.40', price: '$0.25', gross: '$3,270.60', net: 'N/A' },
      { sku: 'AWS-PREMIUM-JOBS', desc: 'AWS Premium Jobs Compute', cloud: 'AWS', qty: '18,170.00', price: '$0.06', gross: '$1,090.20', net: 'N/A' },
      { sku: 'AWS-SERVERLESS', desc: 'AWS Premium Serverless Compute', cloud: 'AWS', qty: '6,354.12', price: '$0.17', gross: '$1,080.20', net: 'N/A' },
      { sku: 'MC-PRODUCTION-SUPPORT', desc: 'MC Production Support', cloud: 'All', qty: '1.00', price: '$5,094.00', gross: '$5,094.00', net: 'N/A' }
    ],
    totalItems: 8,
    totalGross: '$56,035.00',
    totalNet: 'N/A'
  },
  // Mar 2026: Compute $59,389 (AWS $5,491, Azure $53,898 incl OpenAI $13,066), Support $5,939
  'drawdown-mar-2026': {
    id: 'drawdown-2026-003',
    status: 'Finalized',
    statusClass: 'finalized',
    billingTag: 'Drawdown Statement',
    billingTagClass: 'drawdown',
    billingPeriod: 'Mar 1 - 31, 2026',
    postingPeriod: 'Mar 2026',
    postingDate: 'Mar 31, 2026',
    billingDate: 'Apr 1, 2026',
    nsIdentifier: '--',
    nsSalesOrderId: '--',
    nsClass: 'MC',
    nsIntegration: 'Will NOT integrate to NetSuite',
    nsIntegrationClass: 'no-integrate',
    reseller: '--',
    isCommit: false,
    isDrawdown: true,
    items: [
      { sku: 'AZURE-OPENAI-SERVING', desc: 'Azure Premium OpenAI Serving Model', cloud: 'Azure', qty: '13,066.00', price: '$1.00', gross: '$13,066.00', net: 'N/A' },
      { sku: 'AZURE-PREMIUM-COMPUTE', desc: 'Azure Premium All-Purpose Compute', cloud: 'Azure', qty: '98,398.00', price: '$0.25', gross: '$24,599.50', net: 'N/A' },
      { sku: 'AZURE-PREMIUM-JOBS', desc: 'Azure Premium Jobs Compute', cloud: 'Azure', qty: '135,542.00', price: '$0.06', gross: '$8,132.50', net: 'N/A' },
      { sku: 'AZURE-SERVERLESS-SQL', desc: 'Azure Premium Serverless SQL', cloud: 'Azure', qty: '22,222.00', price: '$0.36', gross: '$8,100.00', net: 'N/A' },
      { sku: 'AWS-PREMIUM-COMPUTE', desc: 'AWS Premium All-Purpose Compute', cloud: 'AWS', qty: '13,254.80', price: '$0.25', gross: '$3,313.70', net: 'N/A' },
      { sku: 'AWS-PREMIUM-JOBS', desc: 'AWS Premium Jobs Compute', cloud: 'AWS', qty: '18,120.00', price: '$0.06', gross: '$1,087.20', net: 'N/A' },
      { sku: 'AWS-SERVERLESS', desc: 'AWS Premium Serverless Compute', cloud: 'AWS', qty: '6,412.35', price: '$0.17', gross: '$1,090.10', net: 'N/A' },
      { sku: 'MC-PRODUCTION-SUPPORT', desc: 'MC Production Support', cloud: 'All', qty: '1.00', price: '$5,939.00', gross: '$5,939.00', net: 'N/A' }
    ],
    totalItems: 8,
    totalGross: '$65,328.00',
    totalNet: 'N/A'
  },
  // Apr 2026: Compute $52,756 (AWS $5,121, Azure $47,635 incl OpenAI $11,079), Support $5,276
  'drawdown-apr-2026': {
    id: 'drawdown-2026-004',
    status: 'Finalized',
    statusClass: 'finalized',
    billingTag: 'Drawdown Statement',
    billingTagClass: 'drawdown',
    billingPeriod: 'Apr 1 - 30, 2026',
    postingPeriod: 'Apr 2026',
    postingDate: 'Apr 30, 2026',
    billingDate: 'May 1, 2026',
    nsIdentifier: '--',
    nsSalesOrderId: '--',
    nsClass: 'MC',
    nsIntegration: 'Will NOT integrate to NetSuite',
    nsIntegrationClass: 'no-integrate',
    reseller: '--',
    isCommit: false,
    isDrawdown: true,
    items: [
      { sku: 'AZURE-OPENAI-SERVING', desc: 'Azure Premium OpenAI Serving Model', cloud: 'Azure', qty: '11,079.00', price: '$1.00', gross: '$11,079.00', net: 'N/A' },
      { sku: 'AZURE-PREMIUM-COMPUTE', desc: 'Azure Premium All-Purpose Compute', cloud: 'Azure', qty: '88,134.00', price: '$0.25', gross: '$22,033.50', net: 'N/A' },
      { sku: 'AZURE-PREMIUM-JOBS', desc: 'Azure Premium Jobs Compute', cloud: 'Azure', qty: '121,042.00', price: '$0.06', gross: '$7,262.50', net: 'N/A' },
      { sku: 'AZURE-SERVERLESS-SQL', desc: 'Azure Premium Serverless SQL', cloud: 'Azure', qty: '20,167.00', price: '$0.36', gross: '$7,260.00', net: 'N/A' },
      { sku: 'AWS-PREMIUM-COMPUTE', desc: 'AWS Premium All-Purpose Compute', cloud: 'AWS', qty: '12,291.20', price: '$0.25', gross: '$3,072.80', net: 'N/A' },
      { sku: 'AWS-PREMIUM-JOBS', desc: 'AWS Premium Jobs Compute', cloud: 'AWS', qty: '17,137.00', price: '$0.06', gross: '$1,028.22', net: 'N/A' },
      { sku: 'AWS-SERVERLESS', desc: 'AWS Premium Serverless Compute', cloud: 'AWS', qty: '5,999.88', price: '$0.17', gross: '$1,019.98', net: 'N/A' },
      { sku: 'MC-PRODUCTION-SUPPORT', desc: 'MC Production Support', cloud: 'All', qty: '1.00', price: '$5,276.00', gross: '$5,276.00', net: 'N/A' }
    ],
    totalItems: 8,
    totalGross: '$58,032.00',
    totalNet: 'N/A'
  },
  // May 2026: Compute $54,224 (AWS $5,455, Azure $48,769 incl OpenAI $13,556), Support $5,422
  'drawdown-may-2026': {
    id: 'drawdown-2026-005',
    status: 'Finalized',
    statusClass: 'finalized',
    billingTag: 'Drawdown Statement',
    billingTagClass: 'drawdown',
    billingPeriod: 'May 1 - 31, 2026',
    postingPeriod: 'May 2026',
    postingDate: 'May 31, 2026',
    billingDate: 'Jun 1, 2026',
    nsIdentifier: '--',
    nsSalesOrderId: '--',
    nsClass: 'MC',
    nsIntegration: 'Will NOT integrate to NetSuite',
    nsIntegrationClass: 'no-integrate',
    reseller: '--',
    isCommit: false,
    isDrawdown: true,
    items: [
      { sku: 'AZURE-OPENAI-SERVING', desc: 'Azure Premium OpenAI Serving Model', cloud: 'Azure', qty: '13,556.00', price: '$1.00', gross: '$13,556.00', net: 'N/A' },
      { sku: 'AZURE-PREMIUM-COMPUTE', desc: 'Azure Premium All-Purpose Compute', cloud: 'Azure', qty: '84,932.00', price: '$0.25', gross: '$21,233.00', net: 'N/A' },
      { sku: 'AZURE-PREMIUM-JOBS', desc: 'Azure Premium Jobs Compute', cloud: 'Azure', qty: '116,333.00', price: '$0.06', gross: '$6,980.00', net: 'N/A' },
      { sku: 'AZURE-SERVERLESS-SQL', desc: 'Azure Premium Serverless SQL', cloud: 'Azure', qty: '19,444.00', price: '$0.36', gross: '$7,000.00', net: 'N/A' },
      { sku: 'AWS-PREMIUM-COMPUTE', desc: 'AWS Premium All-Purpose Compute', cloud: 'AWS', qty: '13,094.00', price: '$0.25', gross: '$3,273.50', net: 'N/A' },
      { sku: 'AWS-PREMIUM-JOBS', desc: 'AWS Premium Jobs Compute', cloud: 'AWS', qty: '18,192.00', price: '$0.06', gross: '$1,091.52', net: 'N/A' },
      { sku: 'AWS-SERVERLESS', desc: 'AWS Premium Serverless Compute', cloud: 'AWS', qty: '6,411.65', price: '$0.17', gross: '$1,089.98', net: 'N/A' },
      { sku: 'MC-PRODUCTION-SUPPORT', desc: 'MC Production Support', cloud: 'All', qty: '1.00', price: '$5,422.00', gross: '$5,422.00', net: 'N/A' }
    ],
    totalItems: 8,
    totalGross: '$59,646.00',
    totalNet: 'N/A'
  },
  // Jun 2026: Compute $50,475 (AWS $4,642, Azure $45,833 incl OpenAI $11,105), Support $5,048
  'drawdown-jun-2026': {
    id: 'drawdown-2026-006',
    status: 'Finalized',
    statusClass: 'finalized',
    billingTag: 'Drawdown Statement',
    billingTagClass: 'drawdown',
    billingPeriod: 'Jun 1 - 30, 2026',
    postingPeriod: 'Jun 2026',
    postingDate: 'Jun 30, 2026',
    billingDate: 'Jul 1, 2026',
    nsIdentifier: '--',
    nsSalesOrderId: '--',
    nsClass: 'MC',
    nsIntegration: 'Will NOT integrate to NetSuite',
    nsIntegrationClass: 'no-integrate',
    reseller: '--',
    isCommit: false,
    isDrawdown: true,
    items: [
      { sku: 'AZURE-OPENAI-SERVING', desc: 'Azure Premium OpenAI Serving Model', cloud: 'Azure', qty: '11,105.00', price: '$1.00', gross: '$11,105.00', net: 'N/A' },
      { sku: 'AZURE-PREMIUM-COMPUTE', desc: 'Azure Premium All-Purpose Compute', cloud: 'Azure', qty: '83,755.00', price: '$0.25', gross: '$20,938.75', net: 'N/A' },
      { sku: 'AZURE-PREMIUM-JOBS', desc: 'Azure Premium Jobs Compute', cloud: 'Azure', qty: '114,908.00', price: '$0.06', gross: '$6,894.50', net: 'N/A' },
      { sku: 'AZURE-SERVERLESS-SQL', desc: 'Azure Premium Serverless SQL', cloud: 'Azure', qty: '19,152.00', price: '$0.36', gross: '$6,894.75', net: 'N/A' },
      { sku: 'AWS-PREMIUM-COMPUTE', desc: 'AWS Premium All-Purpose Compute', cloud: 'AWS', qty: '11,140.80', price: '$0.25', gross: '$2,785.20', net: 'N/A' },
      { sku: 'AWS-PREMIUM-JOBS', desc: 'AWS Premium Jobs Compute', cloud: 'AWS', qty: '15,528.00', price: '$0.06', gross: '$931.68', net: 'N/A' },
      { sku: 'AWS-SERVERLESS', desc: 'AWS Premium Serverless Compute', cloud: 'AWS', qty: '5,442.47', price: '$0.17', gross: '$925.12', net: 'N/A' },
      { sku: 'MC-PRODUCTION-SUPPORT', desc: 'MC Production Support', cloud: 'All', qty: '1.00', price: '$5,048.00', gross: '$5,048.00', net: 'N/A' }
    ],
    totalItems: 8,
    totalGross: '$55,523.00',
    totalNet: 'N/A'
  },
  // Jul 2026: Compute $53,539 (AWS $4,647, Azure $48,892 incl OpenAI $13,385), Support $5,354
  'drawdown-jul-2026': {
    id: 'drawdown-2026-007',
    status: 'Finalized',
    statusClass: 'finalized',
    billingTag: 'Drawdown Statement',
    billingTagClass: 'drawdown',
    billingPeriod: 'Jul 1 - 31, 2026',
    postingPeriod: 'Jul 2026',
    postingDate: 'Jul 31, 2026',
    billingDate: 'Aug 1, 2026',
    nsIdentifier: '--',
    nsSalesOrderId: '--',
    nsClass: 'MC',
    nsIntegration: 'Will NOT integrate to NetSuite',
    nsIntegrationClass: 'no-integrate',
    reseller: '--',
    isCommit: false,
    isDrawdown: true,
    items: [
      { sku: 'AZURE-OPENAI-SERVING', desc: 'Azure Premium OpenAI Serving Model', cloud: 'Azure', qty: '13,385.00', price: '$1.00', gross: '$13,385.00', net: 'N/A' },
      { sku: 'AZURE-PREMIUM-COMPUTE', desc: 'Azure Premium All-Purpose Compute', cloud: 'Azure', qty: '85,622.00', price: '$0.25', gross: '$21,405.50', net: 'N/A' },
      { sku: 'AZURE-PREMIUM-JOBS', desc: 'Azure Premium Jobs Compute', cloud: 'Azure', qty: '117,512.00', price: '$0.06', gross: '$7,050.72', net: 'N/A' },
      { sku: 'AZURE-SERVERLESS-SQL', desc: 'Azure Premium Serverless SQL', cloud: 'Azure', qty: '19,586.00', price: '$0.36', gross: '$7,050.78', net: 'N/A' },
      { sku: 'AWS-PREMIUM-COMPUTE', desc: 'AWS Premium All-Purpose Compute', cloud: 'AWS', qty: '11,152.80', price: '$0.25', gross: '$2,788.20', net: 'N/A' },
      { sku: 'AWS-PREMIUM-JOBS', desc: 'AWS Premium Jobs Compute', cloud: 'AWS', qty: '15,480.00', price: '$0.06', gross: '$928.80', net: 'N/A' },
      { sku: 'AWS-SERVERLESS', desc: 'AWS Premium Serverless Compute', cloud: 'AWS', qty: '5,470.59', price: '$0.17', gross: '$930.00', net: 'N/A' },
      { sku: 'MC-PRODUCTION-SUPPORT', desc: 'MC Production Support', cloud: 'All', qty: '1.00', price: '$5,354.00', gross: '$5,354.00', net: 'N/A' }
    ],
    totalItems: 8,
    totalGross: '$58,893.00',
    totalNet: 'N/A'
  },
  // Aug 2026: Compute $55,590 (AWS $5,290, Azure $50,300 incl OpenAI $11,118), Support $5,559
  'drawdown-aug-2026': {
    id: 'drawdown-2026-008',
    status: 'Finalized',
    statusClass: 'finalized',
    billingTag: 'Drawdown Statement',
    billingTagClass: 'drawdown',
    billingPeriod: 'Aug 1 - 31, 2026',
    postingPeriod: 'Aug 2026',
    postingDate: 'Aug 31, 2026',
    billingDate: 'Sep 1, 2026',
    nsIdentifier: '--',
    nsSalesOrderId: '--',
    nsClass: 'MC',
    nsIntegration: 'Will NOT integrate to NetSuite',
    nsIntegrationClass: 'no-integrate',
    reseller: '--',
    isCommit: false,
    isDrawdown: true,
    items: [
      { sku: 'AZURE-OPENAI-SERVING', desc: 'Azure Premium OpenAI Serving Model', cloud: 'Azure', qty: '11,118.00', price: '$1.00', gross: '$11,118.00', net: 'N/A' },
      { sku: 'AZURE-PREMIUM-COMPUTE', desc: 'Azure Premium All-Purpose Compute', cloud: 'Azure', qty: '94,449.00', price: '$0.25', gross: '$23,612.25', net: 'N/A' },
      { sku: 'AZURE-PREMIUM-JOBS', desc: 'Azure Premium Jobs Compute', cloud: 'Azure', qty: '129,798.00', price: '$0.06', gross: '$7,787.88', net: 'N/A' },
      { sku: 'AZURE-SERVERLESS-SQL', desc: 'Azure Premium Serverless SQL', cloud: 'Azure', qty: '21,616.00', price: '$0.36', gross: '$7,781.87', net: 'N/A' },
      { sku: 'AWS-PREMIUM-COMPUTE', desc: 'AWS Premium All-Purpose Compute', cloud: 'AWS', qty: '12,696.00', price: '$0.25', gross: '$3,174.00', net: 'N/A' },
      { sku: 'AWS-PREMIUM-JOBS', desc: 'AWS Premium Jobs Compute', cloud: 'AWS', qty: '17,633.00', price: '$0.06', gross: '$1,058.00', net: 'N/A' },
      { sku: 'AWS-SERVERLESS', desc: 'AWS Premium Serverless Compute', cloud: 'AWS', qty: '6,223.53', price: '$0.17', gross: '$1,058.00', net: 'N/A' },
      { sku: 'MC-PRODUCTION-SUPPORT', desc: 'MC Production Support', cloud: 'All', qty: '1.00', price: '$5,559.00', gross: '$5,559.00', net: 'N/A' }
    ],
    totalItems: 8,
    totalGross: '$61,149.00',
    totalNet: 'N/A'
  },
  // Sep 2026: Compute $57,440 (AWS $5,293, Azure $52,147 incl OpenAI $13,786), Support $5,744
  'drawdown-sep-2026': {
    id: 'drawdown-2026-009',
    status: 'Finalized',
    statusClass: 'finalized',
    billingTag: 'Drawdown Statement',
    billingTagClass: 'drawdown',
    billingPeriod: 'Sep 1 - 30, 2026',
    postingPeriod: 'Sep 2026',
    postingDate: 'Sep 30, 2026',
    billingDate: 'Oct 1, 2026',
    nsIdentifier: '--',
    nsSalesOrderId: '--',
    nsClass: 'MC',
    nsIntegration: 'Will NOT integrate to NetSuite',
    nsIntegrationClass: 'no-integrate',
    reseller: '--',
    isCommit: false,
    isDrawdown: true,
    items: [
      { sku: 'AZURE-OPENAI-SERVING', desc: 'Azure Premium OpenAI Serving Model', cloud: 'Azure', qty: '13,786.00', price: '$1.00', gross: '$13,786.00', net: 'N/A' },
      { sku: 'AZURE-PREMIUM-COMPUTE', desc: 'Azure Premium All-Purpose Compute', cloud: 'Azure', qty: '92,530.00', price: '$0.25', gross: '$23,132.50', net: 'N/A' },
      { sku: 'AZURE-PREMIUM-JOBS', desc: 'Azure Premium Jobs Compute', cloud: 'Azure', qty: '127,143.00', price: '$0.06', gross: '$7,628.58', net: 'N/A' },
      { sku: 'AZURE-SERVERLESS-SQL', desc: 'Azure Premium Serverless SQL', cloud: 'Azure', qty: '21,111.00', price: '$0.36', gross: '$7,599.92', net: 'N/A' },
      { sku: 'AWS-PREMIUM-COMPUTE', desc: 'AWS Premium All-Purpose Compute', cloud: 'AWS', qty: '12,703.20', price: '$0.25', gross: '$3,175.80', net: 'N/A' },
      { sku: 'AWS-PREMIUM-JOBS', desc: 'AWS Premium Jobs Compute', cloud: 'AWS', qty: '17,620.00', price: '$0.06', gross: '$1,057.20', net: 'N/A' },
      { sku: 'AWS-SERVERLESS', desc: 'AWS Premium Serverless Compute', cloud: 'AWS', qty: '6,235.29', price: '$0.17', gross: '$1,060.00', net: 'N/A' },
      { sku: 'MC-PRODUCTION-SUPPORT', desc: 'MC Production Support', cloud: 'All', qty: '1.00', price: '$5,744.00', gross: '$5,744.00', net: 'N/A' }
    ],
    totalItems: 8,
    totalGross: '$63,184.00',
    totalNet: 'N/A'
  },
  // Oct 2026: Compute $53,530 (AWS $5,419, Azure $48,111 incl OpenAI $11,777), Support $5,353
  'drawdown-oct-2026': {
    id: 'drawdown-2026-010',
    status: 'Draft',
    statusClass: 'draft',
    billingTag: 'Drawdown Statement',
    billingTagClass: 'drawdown',
    billingPeriod: 'Oct 1 - 31, 2026',
    postingPeriod: 'Oct 2026',
    postingDate: 'Oct 31, 2026',
    billingDate: 'Nov 1, 2026',
    nsIdentifier: '--',
    nsSalesOrderId: '--',
    nsClass: 'MC',
    nsIntegration: 'Will NOT integrate to NetSuite',
    nsIntegrationClass: 'no-integrate',
    reseller: '--',
    isCommit: false,
    isDrawdown: true,
    items: [
      { sku: 'AZURE-OPENAI-SERVING', desc: 'Azure Premium OpenAI Serving Model', cloud: 'Azure', qty: '11,777.00', price: '$1.00', gross: '$11,777.00', net: 'N/A' },
      { sku: 'AZURE-PREMIUM-COMPUTE', desc: 'Azure Premium All-Purpose Compute', cloud: 'Azure', qty: '87,608.00', price: '$0.25', gross: '$21,902.00', net: 'N/A' },
      { sku: 'AZURE-PREMIUM-JOBS', desc: 'Azure Premium Jobs Compute', cloud: 'Azure', qty: '120,267.00', price: '$0.06', gross: '$7,216.00', net: 'N/A' },
      { sku: 'AZURE-SERVERLESS-SQL', desc: 'Azure Premium Serverless SQL', cloud: 'Azure', qty: '20,044.00', price: '$0.36', gross: '$7,216.00', net: 'N/A' },
      { sku: 'AWS-PREMIUM-COMPUTE', desc: 'AWS Premium All-Purpose Compute', cloud: 'AWS', qty: '13,005.60', price: '$0.25', gross: '$3,251.40', net: 'N/A' },
      { sku: 'AWS-PREMIUM-JOBS', desc: 'AWS Premium Jobs Compute', cloud: 'AWS', qty: '18,128.00', price: '$0.06', gross: '$1,087.68', net: 'N/A' },
      { sku: 'AWS-SERVERLESS', desc: 'AWS Premium Serverless Compute', cloud: 'AWS', qty: '6,352.82', price: '$0.17', gross: '$1,079.92', net: 'N/A' },
      { sku: 'MC-PRODUCTION-SUPPORT', desc: 'MC Production Support', cloud: 'All', qty: '1.00', price: '$5,353.00', gross: '$5,353.00', net: 'N/A' }
    ],
    totalItems: 8,
    totalGross: '$58,883.00',
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
