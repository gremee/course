// Плавное появление элементов при прокрутке
const animatedItems = document.querySelectorAll('.animate');

function checkAnimation() {
    const triggerBottom = window.innerHeight * 0.85;

    animatedItems.forEach(item => {
        const itemTop = item.getBoundingClientRect().top;
        if (itemTop < triggerBottom) {
            item.classList.add('visible');
        }
    });
}

window.addEventListener('scroll', checkAnimation);
window.addEventListener('load', checkAnimation);


// ===========================
//   МОДАЛЬНОЕ ОКНО
// ===========================

const openModalBtn = document.getElementById('openModal');
const modal = document.getElementById('signupModal');
const closeModalBtn = document.getElementById('closeModal');

openModalBtn.addEventListener('click', () => {
    modal.style.display = 'flex';
});

closeModalBtn.addEventListener('click', () => {
    modal.style.display = 'none';
});

window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = 'none';
    }
});


// ===========================
//   ОТПРАВКА ЧЕРЕЗ CLOUDFLARE WORKER
// ===========================

const form = document.getElementById('signupForm');
const successMessage = document.getElementById('successMessage');

// ТВОЙ production URL (ВАЖНО!)
const workerURL = "https://sabalinalbert9.workers.dev/";

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const fio = document.getElementById('fioInput').value.trim();
    const phone = document.getElementById('phoneInput').value.trim();

    try {
        const response = await fetch(workerURL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ fio, phone })
        });

        const data = await response.json();

        if (data.success) {
            successMessage.style.display = 'block';
            form.reset();

            setTimeout(() => {
                successMessage.style.display = 'none';
                modal.style.display = 'none';
            }, 2000);
        } else {
            alert("Ошибка сервера!");
            console.log(data);
        }

    } catch (err) {
        alert("Ошибка отправки запроса!");
        console.log(err);
    }
});


