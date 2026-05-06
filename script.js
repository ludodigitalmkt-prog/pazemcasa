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

    const hiddenElements = document.querySelectorAll('.hidden');
    hiddenElements.forEach((el) => observer.observe(el));

    // --- Controle do Botão Flutuante de WhatsApp ---
    const whatsappBtn = document.getElementById('whatsapp-float');
    
    window.addEventListener('scroll', () => {
        const scrollPosition = window.scrollY;
        if (scrollPosition > 300) {
            whatsappBtn.classList.add('visible');
        } else {
            whatsappBtn.classList.remove('visible');
        }
    });

    // --- Lógica do Formulário de E-mail para WhatsApp ---
    const emailForm = document.getElementById('emailForm');
    
    if(emailForm) {
        emailForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Captura dos campos
            const nome = document.getElementById('nome').value;
            const setorEmail = document.getElementById('setor').value;
            const assunto = document.getElementById('assunto').value;
            const mensagem = document.getElementById('mensagem').value;
            
            // Número oficial atualizado: (47) 9143-9129
            const numeroWhatsApp = "554791439129";
            
            // Montagem da mensagem estruturada
            const mensagemFormatada = `*Nova Solicitação de Atendimento*\n\n` +
                                     `*Para:* ${setorEmail}\n` +
                                     `*De:* ${nome}\n` +
                                     `*Assunto:* ${assunto}\n\n` +
                                     `*Mensagem:* \n${mensagem}`;
            
            // Codificação para URL
            const textoEncoded = encodeURIComponent(mensagemFormatada);
            
            // Redirecionamento para o WhatsApp
            const urlFinal = `https://wa.me/${numeroWhatsApp}?text=${textoEncoded}`;
            
            window.open(urlFinal, '_blank');
            
            // Opcional: Limpar formulário após envio
            emailForm.reset();
        });
    }
});