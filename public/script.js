const BASE_URL = 'http://localhost:3000/api';
let allExpenses = [];
let currentPage = 1;
let expensesPerPage = parseInt(localStorage.getItem('expensesPerPage')) || 1;

document.addEventListener('DOMContentLoaded', () => {
  const input = document.getElementById('expense-count');
  if (input) input.value = expensesPerPage;

  const token = localStorage.getItem('token');
  const premiumStatus = localStorage.getItem('isPremiumUser') === 'true';
  if (token) {
    isPremiumUser = premiumStatus;
    showExpenses();
  } else {
    showLogin();
  }

 
  document.getElementById('toggle-report').addEventListener('click', () => {
    const section = document.getElementById('report-section');
    const btn = document.getElementById('toggle-report');
    if (section.style.display === "none") {
      section.style.display = "block";
      btn.textContent = "Hide Report";
      renderReport("all");
    } else {
      section.style.display = "none";
      btn.textContent = "Show Report";
    }
  });
});


function showSignup() {
  document.getElementById('login-box').style.display = 'none';
  document.getElementById('signup-box').style.display = 'block';
  document.getElementById('forgot-password-box').style.display = 'none';
}
function showLogin() {
  document.getElementById('signup-box').style.display = 'none';
  document.getElementById('login-box').style.display = 'block';
  document.getElementById('forgot-password-box').style.display = 'none';
  document.getElementById('expense-box').style.display = 'none';
}
function showForgotPassword() {
  document.getElementById('login-box').style.display = 'none';
  document.getElementById('signup-box').style.display = 'none';
  document.getElementById('forgot-password-box').style.display = 'block';
}
function showExpenses() {
  document.getElementById('login-box').style.display = 'none';
  document.getElementById('signup-box').style.display = 'none';
  document.getElementById('forgot-password-box').style.display = 'none';
  document.getElementById('expense-box').style.display = 'block';
  updatePremiumUI();
  fetchExpenses();
}

// Auth
function signup() {
  const name = document.getElementById('signup-name').value;
  const email = document.getElementById('signup-email').value;
  const password = document.getElementById('signup-password').value;
  fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email, password }),
  }).then(res => res.json()).then(data => {
    alert(data.message);
    if (data.message === 'Successfully created new user') showLogin();
  });
}

function login() {
  const email = document.getElementById('login-email').value;
  const password = document.getElementById('login-password').value;
  fetch(`${BASE_URL}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  }).then(res => res.json()).then(data => {
    if (data.token) {
      localStorage.setItem('token', data.token);
      localStorage.setItem('isPremiumUser', data.isPremiumUser || false);
      isPremiumUser = data.isPremiumUser || false;
      showExpenses();
    } else alert(data.message);
  });
}

// Premium UI
let isPremiumUser = false;

function updatePremiumUI() {
  document.getElementById('premium-box').style.display = isPremiumUser ? 'block' : 'none';
  document.getElementById('upgrade-box').style.display = isPremiumUser ? 'none' : 'block';
}

// Become Premium
function becomePremium() {
  const token = localStorage.getItem('token');
  fetch(`${BASE_URL.replace('/api', '')}/premium/upgrade`, {
    method: 'POST',
    headers: { 'Authorization': token }
  }).then(res => res.json()).then(data => {
    if (data.success) {
      alert("🎉 You are now a Premium User!");
      isPremiumUser = true;
      localStorage.setItem('isPremiumUser', 'true');
      updatePremiumUI();
    } else alert(data.message || "❌ Failed to upgrade.");
  });
}


function addExpense() {
  const amount = document.getElementById('expense-amount').value;
  const description = document.getElementById('expense-description').value;
  const category = document.getElementById('expense-category').value;
  const token = localStorage.getItem('token');
  if (!amount || !description || !category) return alert("Please fill all fields");

  fetch(`${BASE_URL}/expenses`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Authorization': token },
    body: JSON.stringify({ amount, description, category }),
  }).then(() => {
    document.getElementById('expense-amount').value = '';
    document.getElementById('expense-description').value = '';
    document.getElementById('expense-category').value = '';
    fetchExpenses();
  });
}

function fetchExpenses() {
  const token = localStorage.getItem('token');
  fetch(`${BASE_URL}/expenses`, { headers: { 'Authorization': token } })
    .then(res => res.json()).then(expenses => {
      allExpenses = expenses;
      renderExpenses();
    });
}

function manualExpensesPerPage() {
  const inputVal = parseInt(document.getElementById('expense-count').value);
  expensesPerPage = inputVal > 0 ? inputVal : 1;
  localStorage.setItem('expensesPerPage', expensesPerPage);
  currentPage = 1;
  renderExpenses();
}

function renderExpenses() {
  const list = document.getElementById('expense-list');
  list.innerHTML = '';
  const totalPages = Math.max(1, Math.ceil(allExpenses.length / expensesPerPage));
  if (currentPage > totalPages) currentPage = totalPages;
  const start = (currentPage - 1) * expensesPerPage;
  const expensesToShow = allExpenses.slice(start, start + expensesPerPage);
  expensesToShow.forEach(exp => {
    const li = document.createElement('li');
    li.textContent = `${exp.amount} - ${exp.description} (${exp.category}) `;
    const btn = document.createElement('button');
    btn.textContent = 'Delete';
    btn.onclick = () => deleteExpense(exp.id);
    li.appendChild(btn);
    list.appendChild(li);
  });
  document.getElementById('page-indicator').textContent = `Page ${currentPage} of ${totalPages}`;
}
function nextPage() {
  if (currentPage < Math.ceil(allExpenses.length / expensesPerPage)) currentPage++;
  renderExpenses();
}
function prevPage() {
  if (currentPage > 1) currentPage--;
  renderExpenses();
}
function deleteExpense(id) {
  const token = localStorage.getItem('token');
  fetch(`${BASE_URL}/expenses/${id}`, { method: 'DELETE', headers: { 'Authorization': token } })
    .then(() => fetchExpenses());
}

// Leaderboard Toggle
document.getElementById('show-leaderboard').addEventListener('click', async () => {
  const leaderboardList = document.getElementById('leaderboard-list');
  if (leaderboardList.style.display === 'block') {
    leaderboardList.style.display = 'none';
    document.getElementById('show-leaderboard').textContent = "Show Leaderboard";
    return;
  }
  const token = localStorage.getItem('token');
  const res = await fetch(`${BASE_URL.replace('/api', '')}/premium/showleaderboard`, { headers: { 'Authorization': token } });
  const data = await res.json();
  leaderboardList.innerHTML = '';
  data.sort((a, b) => (b.total_expense || 0) - (a.total_expense || 0));
  data.forEach(u => {
    const li = document.createElement('li');
    li.textContent = `${u.name} - Total Expense: ${u.total_expense || 0}`;
    leaderboardList.appendChild(li);
  });
  leaderboardList.style.display = 'block';
  document.getElementById('show-leaderboard').textContent = "Hide Leaderboard";
});

// Report Section
function renderReport(filter) {
  const tbody = document.querySelector('#report-table tbody');
  tbody.innerHTML = '';
  let data = [...allExpenses];
  data.forEach(exp => {
    const tr = document.createElement('tr');
    tr.innerHTML = `<td>${new Date(exp.createdAt).toLocaleDateString()}</td><td>${exp.description}</td><td>${exp.category}</td><td>${exp.amount}</td>`;
    tbody.appendChild(tr);
  });
}
document.getElementById('download-report').addEventListener('click', () => {
  if (!isPremiumUser) return alert("🚫 Only premium users can download reports!");
  let csv = "Date,Description,Category,Amount\n";
  allExpenses.forEach(exp => {
    csv += `${new Date(exp.createdAt).toLocaleDateString()},${exp.description},${exp.category},${exp.amount}\n`;
  });
  const blob = new Blob([csv], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = "expenses_report.csv";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
});

// Logout
function logout() {
  localStorage.removeItem('token');
  localStorage.removeItem('isPremiumUser');
  allExpenses = [];
  currentPage = 1;
  document.getElementById('expense-box').style.display = 'none';
  showLogin();
}


function submitForgotPassword() {
  const email = document.getElementById('forgot-email').value;
  fetch(`http://localhost:3000/password/forgotpassword`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email }),
  }).then(res => res.json()).then(data => alert(data.message));
}
function filterExpenses() {
  alert(`Filtering by ${document.getElementById('time-filter').value} (to be implemented)`);
}
