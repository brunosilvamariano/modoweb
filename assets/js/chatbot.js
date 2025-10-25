/* ===================================
   CHATBOT WHATSAPP - MODO WEB
   =================================== */

document.addEventListener('DOMContentLoaded', () => {
    const chatButton = document.getElementById('whatsapp-fixed-button');
    const chatContainer = document.getElementById('chatbot-container');
    const closeButton = document.getElementById('chatbot-close-btn');
    const chatBody = document.getElementById('chatbot-body');
    const chatInput = document.getElementById('chatbot-input');
    const sendButton = document.getElementById('chatbot-send-btn');
    const phoneNumber = '5547991597258'; // WhatsApp da Modo Web

    // ===================================
    // CONTEÚDO DO CHATBOT - MODO WEB
    // ===================================
    const CHAT_CONTENT = {
        GREETING: {
            text: "Olá! 👋 Eu sou o assistente virtual da <strong>Modo Web</strong>.<br> Ajudamos empresas e profissionais a terem sites e landing pages que geram resultados reais.<br><br>Como posso te ajudar hoje?",
            options: [
                { text: "Quero saber sobre os Serviços", value: "SERVICOS" },
                { text: "Como funciona o processo?", value: "PROCESSO" },
                { text: "Quero um Orçamento / Falar no WhatsApp", value: "ORCAMENTO" },
                { text: "Ver dúvidas frequentes", value: "FAQ" }
            ]
        },
        SERVICOS: {
            text: "Temos 3 principais serviços voltados para presença digital e conversão:",
            options: [
                { text: "🌐 Sites Institucionais", value: "SITES" },
                { text: "🚀 Landing Pages Personalizadas", value: "LANDING" },
                { text: "✨ Projetos Exclusivos", value: "EXCLUSIVOS" },
                { text: "Voltar ao menu principal", value: "GREETING" }
            ]
        },
        PROCESSO: {
            text: "Nosso processo é simples, profissional e totalmente personalizado:<br><br>1️⃣ Entendimento do projeto<br>2️⃣ Design moderno e responsivo<br>3️⃣ Desenvolvimento otimizado para SEO<br>4️⃣ Publicação e acompanhamento<br><br>Quer saber mais sobre alguma etapa?",
            options: [
                { text: "Etapa 1 - Entendimento do Projeto", value: "ETAPA1" },
                { text: "Etapa 2 - Design e Desenvolvimento", value: "ETAPA2" },
                { text: "Etapa 3 - Publicação e Resultados", value: "ETAPA3" },
                { text: "Voltar ao menu principal", value: "GREETING" }
            ]
        },
        ORCAMENTO: {
            text: "Perfeito! 💬 Para um orçamento personalizado e rápido, clique abaixo e fale com nossa equipe via WhatsApp:",
            options: [
                { text: "💬 Falar com Especialista Agora", value: "WHATSAPP_LINK" },
                { text: "Voltar ao menu principal", value: "GREETING" }
            ]
        },
        FAQ: {
            text: "💡 Dúvidas comuns:<br>- Quanto tempo leva para criar um site?<br>- Posso pedir algo totalmente personalizado?<br>- Vocês fazem otimização para o Google?<br><br>Quer conversar sobre o seu projeto?",
            options: [
                { text: "Sim, quero falar com especialista", value: "WHATSAPP_LINK" },
                { text: "Voltar ao menu principal", value: "GREETING" }
            ]
        },
        SITES: {
            text: "🌐 <strong>Sites Institucionais</strong><br>Criamos sites completos para empresas e profissionais que desejam uma presença online forte e moderna.<br><br>Layout responsivo, código otimizado e design sob medida.",
            options: [
                { text: "Quero um site institucional", value: "WHATSAPP_LINK_SITES" },
                { text: "Voltar aos serviços", value: "SERVICOS" }
            ]
        },
        LANDING: {
            text: "🚀 <strong>Landing Pages Personalizadas</strong><br>Ideais para campanhas, lançamentos e captação de leads.<br>Criadas com foco total em conversão e performance.",
            options: [
                { text: "Quero uma landing page", value: "WHATSAPP_LINK_LANDING" },
                { text: "Voltar aos serviços", value: "SERVICOS" }
            ]
        },
        EXCLUSIVOS: {
            text: "✨ <strong>Projetos Exclusivos</strong><br>Para quem busca algo único, com design criado do zero, animações e estrutura personalizada.<br>Desenvolvemos sites e páginas exclusivas com total liberdade criativa.",
            options: [
                { text: "Quero um projeto exclusivo", value: "WHATSAPP_LINK_EXCLUSIVOS" },
                { text: "Voltar aos serviços", value: "SERVICOS" }
            ]
        },
        ETAPA1: {
            text: "Etapa 1️⃣ - Entendimento do Projeto<br>Conversamos para entender seu negócio, público e objetivos. Assim definimos a melhor estratégia visual e técnica.",
            options: [
                { text: "Próxima etapa", value: "ETAPA2" },
                { text: "Voltar ao menu principal", value: "GREETING" }
            ]
        },
        ETAPA2: {
            text: "Etapa 2️⃣ - Design e Desenvolvimento<br>Transformamos a estratégia em um layout moderno, responsivo e otimizado para SEO e conversão.",
            options: [
                { text: "Próxima etapa", value: "ETAPA3" },
                { text: "Voltar ao menu principal", value: "GREETING" }
            ]
        },
        ETAPA3: {
            text: "Etapa 3️⃣ - Publicação e Resultados<br>Publicamos seu site e acompanhamos o desempenho, garantindo resultados reais para o seu negócio.",
            options: [
                { text: "Quero iniciar meu projeto", value: "WHATSAPP_LINK" },
                { text: "Voltar ao menu principal", value: "GREETING" }
            ]
        },
        UNHANDLED: {
            text: "Desculpe, estou em processo de desenvolvimento 😅. Escolha uma das opções abaixo:",
            options: [
                { text: "Ver serviços", value: "SERVICOS" },
                { text: "Como funciona", value: "PROCESSO" },
                { text: "Falar com especialista", value: "ORCAMENTO" },
                { text: "Voltar ao início", value: "GREETING" }
            ]
        }
    };

    // ===================================
    // FUNÇÕES DE CHAT
    // ===================================

    function appendMessage(text, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('message', sender);

        const bubble = document.createElement('div');
        bubble.classList.add('message-bubble');
        bubble.innerHTML = text;

        messageDiv.appendChild(bubble);
        chatBody.appendChild(messageDiv);
        chatBody.scrollTop = chatBody.scrollHeight;
    }

    function renderOptions(options) {
        const oldOptions = chatBody.querySelectorAll('.options-container');
        oldOptions.forEach(opt => opt.remove());

        if (options && options.length > 0) {
            const optionsContainer = document.createElement('div');
            optionsContainer.classList.add('options-container');

            options.forEach(option => {
                const button = document.createElement('button');
                button.classList.add('option-button');
                button.textContent = option.text;
                button.dataset.value = option.value;
                button.addEventListener('click', handleOptionClick);
                optionsContainer.appendChild(button);
            });

            const messageDiv = document.createElement('div');
            messageDiv.classList.add('message', 'bot');
            messageDiv.appendChild(optionsContainer);
            chatBody.appendChild(messageDiv);
            chatBody.scrollTop = chatBody.scrollHeight;
        }
    }

    function handleBotResponse(key) {
        const response = CHAT_CONTENT[key] || CHAT_CONTENT.UNHANDLED;

        // LINKS DO WHATSAPP PERSONALIZADOS
        if (key.startsWith("WHATSAPP_LINK")) {
            let message = "Olá! 👋 Gostaria de saber mais sobre criação de sites e landing pages com a Modo Web.";
            if (key === "WHATSAPP_LINK_SITES") {
                message = "Olá! Tenho interesse em criar um site institucional com a Modo Web.";
            } else if (key === "WHATSAPP_LINK_LANDING") {
                message = "Olá! Gostaria de uma landing page personalizada para o meu negócio.";
            } else if (key === "WHATSAPP_LINK_EXCLUSIVOS") {
                message = "Olá! Gostaria de discutir um projeto exclusivo e personalizado com a Modo Web.";
            }

            const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
            window.open(whatsappUrl, '_blank');

            appendMessage("Você será redirecionado para o WhatsApp com a mensagem pré-preenchida 🚀", 'bot');
            setTimeout(() => handleBotResponse('GREETING'), 1000);
            return;
        }

        appendMessage(response.text, 'bot');
        renderOptions(response.options);
    }

    function handleOptionClick(event) {
        const value = event.target.dataset.value;
        const text = event.target.textContent;
        appendMessage(text, 'user');

        const oldOptions = chatBody.querySelectorAll('.options-container');
        oldOptions.forEach(opt => opt.remove());

        setTimeout(() => handleBotResponse(value), 500);
    }

    function handleUserInput() {
        const text = chatInput.value.trim();
        if (text === "") return;

        appendMessage(text, 'user');
        chatInput.value = '';

        const lowerText = text.toLowerCase();
        let nextKey = 'UNHANDLED';

        if (lowerText.includes('serviço')) nextKey = 'SERVICOS';
        else if (lowerText.includes('processo')) nextKey = 'PROCESSO';
        else if (lowerText.includes('orçamento') || lowerText.includes('whatsapp')) nextKey = 'ORCAMENTO';
        else if (lowerText.includes('faq') || lowerText.includes('dúvida')) nextKey = 'FAQ';
        else if (lowerText.includes('site')) nextKey = 'SITES';
        else if (lowerText.includes('landing')) nextKey = 'LANDING';
        else if (lowerText.includes('projeto')) nextKey = 'EXCLUSIVOS';
        else if (lowerText.includes('olá') || lowerText.includes('oi') || lowerText.includes('menu')) nextKey = 'GREETING';

        setTimeout(() => handleBotResponse(nextKey), 500);
    }

    // ===================================
    // EVENTOS
    // ===================================
    chatButton.addEventListener('click', () => {
        chatContainer.classList.toggle('open');
        if (chatContainer.classList.contains('open') && chatBody.children.length === 0) {
            handleBotResponse('GREETING');
        }
    });

    closeButton.addEventListener('click', () => {
        chatContainer.classList.remove('open');
    });

    sendButton.addEventListener('click', handleUserInput);
    chatInput.addEventListener('keypress', e => {
        if (e.key === 'Enter') handleUserInput();
    });

    // ===================================
    // ÍCONES (Bootstrap)
    // ===================================
    const linkIcon = document.createElement('link');
    linkIcon.rel = 'stylesheet';
    linkIcon.href = 'https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.1/font/bootstrap-icons.css';
    document.head.appendChild(linkIcon);
});
