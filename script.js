// Mengubah latar belakang Navbar saat di-scroll
const navbar = document.querySelector(".navbar");

window.addEventListener("scroll", () => {
  if (window.scrollY > 50) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});

// Efek animasi muncul perlahan saat di-scroll (Intersection Observer)
const observerOptions = {
  root: null,
  rootMargin: "0px",
  threshold: 0.1,
};

const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("show");
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

const hiddenElements = document.querySelectorAll(".hidden");
hiddenElements.forEach((el) => observer.observe(el));


// --- EFEK MENGETIK LOOPING (TERUS MENERUS) ---
const textToType = "Rizqo Dwi Y.A";
const typingElement = document.querySelector(".typing-text");
let charIndex = 0;
let isDeleting = false;

function typeWriter() {
  // Tentukan kecepatan ngetik (150ms) dan kecepatan hapus (100ms)
  let typingSpeed = isDeleting ? 100 : 150;

  if (!isDeleting) {
    // Proses mengetik
    typingElement.textContent = textToType.substring(0, charIndex + 1);
    charIndex++;
  } else {
    // Proses menghapus
    typingElement.textContent = textToType.substring(0, charIndex - 1);
    charIndex--;
  }

  // Jika teks sudah selesai diketik semua
  if (!isDeleting && charIndex === textToType.length) {
    typingSpeed = 2500; // Jeda 2.5 detik sebelum mulai menghapus
    isDeleting = true;
  } 
  // Jika teks sudah terhapus semua
  else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    typingSpeed = 500; // Jeda 0.5 detik sebelum ngetik lagi
  }

  setTimeout(typeWriter, typingSpeed);
}

document.addEventListener("DOMContentLoaded", () => {
  setTimeout(typeWriter, 500); 
});

// --- LOGIKA MENU HP (MOBILE MENU) ---
const menuToggle = document.querySelector('#mobile-menu');
const navLinks = document.querySelector('.nav-links');

// Fungsi saat tombol menu diklik
menuToggle.addEventListener('click', () => {
  menuToggle.classList.toggle('active');
  navLinks.classList.toggle('active');
});

// Fungsi agar menu otomatis tertutup saat link diklik (biar user-friendly)
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    menuToggle.classList.remove('active');
    navLinks.classList.remove('active');
  });
});


// --- LOGIKA MODAL CV LUCU ---
const btnDownload = document.getElementById('btn-download');
const cvModal = document.getElementById('cv-modal');
const closeModal = document.querySelector('.close-modal');

// Munculkan pop-up saat tombol Download CV diklik
btnDownload.addEventListener('click', (e) => {
  e.preventDefault(); // Mencegah layar lompat ke atas
  cvModal.classList.add('show-modal');
});

// Tutup pop-up saat tombol "X" diklik
closeModal.addEventListener('click', () => {
  cvModal.classList.remove('show-modal');
});

// Tutup pop-up saat user klik di luar kotak kaca
window.addEventListener('click', (e) => {
  if (e.target === cvModal) {
    cvModal.classList.remove('show-modal');
  }
});


// ==========================================
// LOGIKA WIDGET BUKA-TUTUP (GEAR, MUSIK, BAHASA)
// ==========================================

// 1. Logika Buka-Tutup Menu (Gear)
const widgetContainer = document.getElementById('widget-container');
const mainToggle = document.getElementById('main-toggle');

// Pastikan tombol utama benar-benar ada sebelum menjalankan perintah
if (mainToggle && widgetContainer) {
  mainToggle.addEventListener('click', () => {
    widgetContainer.classList.toggle('active');
  });
}

// 2. Logika Musik
const musicToggle = document.getElementById('music-toggle');
const musicSvg = document.getElementById('music-svg');
const bgMusic = document.getElementById('bg-music');
let isPlaying = false;

if (musicToggle && bgMusic) {
  musicToggle.addEventListener('click', () => {
    if (isPlaying) {
      bgMusic.pause();
      if(musicSvg) musicSvg.classList.remove('spinning'); 
    } else {
      bgMusic.play();
      if(musicSvg) musicSvg.classList.add('spinning'); 
    }
    isPlaying = !isPlaying;
  });
}

// 3. Logika Translate Bahasa (Gambar Bendera)
const langToggle = document.getElementById('lang-toggle');
const langIcon = document.getElementById('lang-icon');
let currentLang = 'id'; 
const translatableElements = document.querySelectorAll('.translatable');

if (langToggle && langIcon) {
  langToggle.addEventListener('click', () => {
    currentLang = currentLang === 'id' ? 'en' : 'id';
    
    // Ganti foto bendera (pastikan nama file di komputermu sama persis)
    langIcon.src = currentLang === 'id' ? 'pendidikan/id-flag.jpg' : 'pendidikan/en-flag.png';

    // Ubah teks yang punya class "translatable"
    translatableElements.forEach(el => {
      const newText = el.getAttribute(`data-${currentLang}`);
      if(newText) {
        el.textContent = newText;
      }
    });
  });
}
