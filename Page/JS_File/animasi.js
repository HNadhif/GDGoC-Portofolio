// Fungsi untuk Typewriter Effect
function initTypewriter() {
    const helloText = document.querySelector('.text-box h1');
    if (!helloText) return;

    const originalText = helloText.textContent;
    helloText.textContent = '';
    helloText.classList.add('typewriter-cursor');

    let i = 0;
    const typeWriter = () => {
        if (i < originalText.length) {
            helloText.textContent += originalText.charAt(i);
            i++;
            setTimeout(typeWriter, 100);
        } else {
            // Hapus cursor setelah selesai
            setTimeout(() => {
                helloText.classList.remove('typewriter-cursor');
            }, 500);
        }
    };

    // Mulai setelah delay
    setTimeout(typeWriter, 800);
}

// Fungsi untuk Fade-in Animation
function initFadeIn() {
    // Sekarang pilih <li> saja, bukan <a> langsung
    // Karena animasi tetap di <li>, <a> akan ikut parentnya
    const elementsToAnimate = [
        ...document.querySelectorAll('nav > ul > li'),
        document.querySelector('.profile-pic'),
        document.querySelector('.text-box')
    ].filter(el => el !== null);

    // Sisanya sama...
    elementsToAnimate.forEach(el => {
        el.classList.add('fade-in');
    });

    setTimeout(() => {
        elementsToAnimate.forEach((el, index) => {
            setTimeout(() => {
                el.classList.add('visible');
            }, index * 150);
        });
    }, 500);
}

// Fungsi untuk inisialisasi semua animasi
function initAnimations() {
    // Cek jika user tidak menyukai motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
        // Skip animasi jika user pilih reduced motion
        document.querySelector('.text-box h1').classList.remove('typewriter-cursor');
        return;
    }

    // Jalankan animasi
    initFadeIn();
    initTypewriter();

    // Tambahkan efek hover pada profile picture
    const profilePic = document.querySelector('.profile-pic');
    if (profilePic) {
        profilePic.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.02)';
            this.style.transition = 'transform 0.3s ease';
        });

        profilePic.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    }
}

// Event listener untuk memastikan DOM selesai load
document.addEventListener('DOMContentLoaded', initAnimations);

// Fallback jika DOMContentLoaded sudah terlewat
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAnimations);
} else {
    // DOM sudah selesai load
    initAnimations();
}

// Optional: Tambahkan event listener untuk viewport changes
window.addEventListener('resize', function() {
    // Reset atau adjust animasi jika perlu
});