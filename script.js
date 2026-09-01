// ========================================
// 1. CHUYỂN ĐỔI GIỮA TAB ĐĂNG NHẬP / ĐĂNG KÝ
// ========================================

const loginTab = document.getElementById('loginTab');
const registerTab = document.getElementById('registerTab');
const loginForm = document.getElementById('loginForm');
const registerForm = document.getElementById('registerForm');

// Khi bấm tab Đăng nhập
loginTab.addEventListener('click', () => {
  loginTab.classList.add('active');
  registerTab.classList.remove('active');
  loginForm.style.display = 'block';
  registerForm.style.display = 'none';
});

// Khi bấm tab Đăng ký
registerTab.addEventListener('click', () => {
  registerTab.classList.add('active');
  loginTab.classList.remove('active');
  loginForm.style.display = 'none';
  registerForm.style.display = 'block';
});

// ========================================
// 2. XỬ LÝ ĐĂNG KÝ (Lưu vào localStorage)
// ========================================

registerForm.addEventListener('submit', (e) => {
  e.preventDefault(); // Ngăn reload trang

  // Lấy dữ liệu từ ô nhập
  const name = document.getElementById('registerName').value.trim();
  const email = document.getElementById('registerEmail').value.trim();
  const password = document.getElementById('registerPassword').value.trim();

  // Kiểm tra nhập đủ chưa
  if (!name || !email || !password) {
    alert('Vui lòng điền đầy đủ thông tin.');
    return;
  }
  if (password.length < 6) {
    alert('Mật khẩu phải có ít nhất 6 ký tự.');
    return;
  }

  // Lấy danh sách user đã có (giả lập database)
  const users = JSON.parse(localStorage.getItem('users') || '[]');

  // Kiểm tra email đã tồn tại chưa
  if (users.find(u => u.email === email)) {
    alert('Email đã được đăng ký. Vui lòng đăng nhập.');
    return;
  }

  // Thêm user mới
  users.push({
    name: name,
    email: email,
    password: password, // ⚠️ Demo: chưa hash
    balance: 0,
    transactions: [],
    role: 'user'
  });

  // Lưu lại
  localStorage.setItem('users', JSON.stringify(users));

  alert('Đăng ký thành công! Bạn có thể đăng nhập ngay.');

  // Chuyển sang tab đăng nhập và điền sẵn email
  loginTab.click();
  document.getElementById('loginEmail').value = email;
  document.getElementById('loginPassword').value = '';
});

// ========================================
// 3. XỬ LÝ ĐĂNG NHẬP
// ========================================

loginForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const email = document.getElementById('loginEmail').value.trim();
  const password = document.getElementById('loginPassword').value.trim();

  if (!email || !password) {
    alert('Vui lòng nhập email và mật khẩu.');
    return;
  }

  const users = JSON.parse(localStorage.getItem('users') || '[]');
  const user = users.find(u => u.email === email && u.password === password);

  if (!user) {
    alert('Sai email hoặc mật khẩu. Vui lòng thử lại.');
    return;
  }

  sessionStorage.setItem('currentUser', JSON.stringify(user));
  alert(`Chào mừng ${user.name}! Chuyển đến Dashboard.`);
  window.location.href = 'dashboard.html';
});
