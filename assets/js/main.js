// Update copyright year
document.getElementById('currentYear').textContent = new Date().getFullYear();

// Smooth scrolling for navigation
document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === "#ai-consultation" || document.querySelector(targetId)) {
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        }
    });
});

// AI Consultation Form Logic
const getAiIdeasBtn = document.getElementById('getAiIdeasBtn');
const businessChallengeInput = document.getElementById('businessChallenge');
const aiIdeasResultDiv = document.getElementById('aiIdeasResult');
const loadingMessage = document.getElementById('loadingMessage');
const ideasContainer = document.getElementById('ideasContainer');
const errorMessage = document.getElementById('errorMessage');

getAiIdeasBtn.addEventListener('click', async () => {
    const challenge = businessChallengeInput.value.trim();
    if (!challenge) {
        alert('Mohon masukkan deskripsi bisnis atau tantangan Anda.');
        return;
    }

    loadingMessage.classList.remove('hidden');
    ideasContainer.innerHTML = '';
    errorMessage.classList.add('hidden');
    getAiIdeasBtn.disabled = true;

    try {
        const response = await generateAiIdeas(challenge);
        displayAiIdeas(response);
    } catch (error) {
        console.error('Error fetching AI ideas:', error);
        errorMessage.textContent = `Maaf, terjadi kesalahan: ${error.message}. Coba lagi nanti.`;
        errorMessage.classList.remove('hidden');
    } finally {
        loadingMessage.classList.add('hidden');
        getAiIdeasBtn.disabled = false;
    }
});

// Contact Form Handling
document.getElementById('contactForm').addEventListener('submit', async function(event) {
    event.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email_contact').value;
    const message = document.getElementById('message').value;

    try {
        await emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', {
            from_name: name,
            from_email: email,
            message: message,
            to_email: 'amuadnasir@gmail.com'
        });
        
        alert('Pesan berhasil dikirim!');
        this.reset();
    } catch (error) {
        alert('Gagal mengirim pesan. Silakan coba lagi.');
        console.error('EmailJS Error:', error);
    }
});