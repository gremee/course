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
//   ОТПРАВКА В TELEGRAM
// ===========================

const form = document.getElementById('signupForm');
const successMessage = document.getElementById('successMessage');

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const fio = document.getElementById('fioInput').value.trim();
    const phone = document.getElementById('phoneInput').value.trim();

    const token = "7961448183:AAHiKDaCPlzM5u2tHvl9AZCTkWSZnat2mcc";
    const chatId = 1215690345;

    const message = `📩 НОВАЯ ЗАЯВКА\n\n👤 ФИО: ${fio}\n📱 Телефон: ${phone}`;

    fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            chat_id: chatId,
            text: message
        })
    })
    .then(() => {
        successMessage.style.display = 'block';
        form.reset();

        setTimeout(() => {
            successMessage.style.display = 'none';
            modal.style.display = 'none';
        }, 2000);
    })
    .catch(err => {
        alert("Ошибка отправки!");
        console.log(err);
    });
});
