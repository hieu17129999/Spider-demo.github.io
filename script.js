// ===== CẤU HÌNH API (THAY LINK BACKEND CỦA BẠN) =====
const API_BASE = 'https://linkgate-backend.onrender.com/api';

// ========================================
// 1. CHUYỂN ĐỔI TAB ĐĂNG NHẬP / ĐĂNG KÝ
// ========================================

const loginTab = document.getElementById('loginTab');
const registerTab = document.getElementById('registerTab');
const loginForm = document.getElementById('loginForm');
const registerForm = document.getElementById('registerForm');

loginTab.addEventListener('click', () => {
    loginTab.classList.add('active');
    registerTab.classList.remove('active');
    loginForm.style.display = 'block';
    registerForm.style.display = 'none';
});

registerTab.addEventListener('click', () => {
    registerTab.classList.add('active');
    loginTab.classList.remove('active');
    loginForm.style.display = 'none';
    registerForm.style.display = 'block';
});

// ========================================
// 2. XỬ LÝ ĐĂNG KÝ (GỌI API)
// ========================================

registerForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = document.getElementById('registerName').value.trim();
    const email = document.getElementById('registerEmail').value.trim();
    const password = document.getElementById('registerPassword').value.trim();

    if (!name || !email || !password) {
        alert('Vui lòng điền đầy đủ thông tin.');
        return;
    }
    if (password.length < 6) {
        alert('Mật khẩu phải có ít nhất 6 ký tự.');
        return;
    }

    try {
        const res = await fetch(`${API_BASE}/auth/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, password })
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.message);

        alert('Đăng ký thành công!');
        loginTab.click();
        document.getElementById('loginEmail').value = email;
        document.getElementById('loginPassword').value = '';
    } catch (error) {
        alert('Lỗi: ' + error.message);
    }
});

// ========================================
// 3. XỬ LÝ ĐĂNG NHẬP (GỌI API)
// ========================================

loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = document.getElementById('loginEmail').value.trim();
    const password = document.getElementById('loginPassword').value.trim();

    if (!email || !password) {
        alert('Vui lòng nhập email và mật khẩu.');
        return;
    }

    try {
        const res = await fetch(`${API_BASE}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.message);

        localStorage.setItem('token', data.token);
        localStorage.setItem('currentUser', JSON.stringify(data.user));

        alert('Đăng nhập thành công!');
        window.location.href = 'dashboard.html';
    } catch (error) {
        alert('Lỗi: ' + error.message);
    }
});

// ========================================
// 4. HÀM HỖ TRỢ
// ========================================

function getToken() {
    return localStorage.getItem('token');
}

function getCurrentUser() {
    const data = localStorage.getItem('currentUser');
    return data ? JSON.parse(data) : null;
}

function logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('currentUser');
    window.location.href = 'index.html';
}
