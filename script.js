document.addEventListener('DOMContentLoaded', () => {

    // --- Configurações do Observer de Animação ---
    const observerOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('show');
                }, index * 100);

                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // --- Elementos que vão aparecer suavemente ao rolar a página ---
    const animatedElements = document.querySelectorAll(
        'section, .modern-list-item, .bento-card, .email-item, .form-container, .diferencial-wrapper'
    );

    animatedElements.forEach((el) => {
        el.classList.add('fade-scroll');
        observer.observe(el);
    });


    // --- Controle do Botão Flutuante de WhatsApp ---
    const whatsappBtn = document.getElementById('whatsapp-float');

    if (whatsappBtn) {
        window.addEventListener('scroll', () => {
            const scrollPosition = window.scrollY;

            if (scrollPosition > 300) {
                whatsappBtn.classList.add('visible');
            } else {
                whatsappBtn.classList.remove('visible');
            }
        });
    }

});


// --- Função do formulário para enviar mensagem ao WhatsApp ---
function enviarParaWhatsApp(event) {
    event.preventDefault();

    const nome = document.getElementById('nome')?.value || '';
    const setor = document.getElementById('setor')?.value || '';
    const assunto = document.getElementById('assunto')?.value || '';
    const mensagem = document.getElementById('mensagem')?.value || '';

    const numeroWhatsApp = "554188452588";

    const textoFormatado =
        `*Nova Mensagem pelo Site*%0A%0A` +
        `*Nome:* ${nome}%0A` +
        `*Setor Desejado:* ${setor}%0A` +
        `*Assunto:* ${assunto}%0A` +
        `*Mensagem:* ${mensagem}`;

    const urlWhatsApp = `https://wa.me/${numeroWhatsApp}?text=${textoFormatado}`;

    window.open(urlWhatsApp, '_blank');

    const form = document.getElementById('whatsappForm');

    if (form) {
        form.reset();
    }
}