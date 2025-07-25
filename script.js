// MYLO Website JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Inicialização
    initNavigation();
    initMobileMenu();
    initProductFilters();
    initContactForm();
    initScrollAnimations();
    initSmoothScrolling();
});

// Navegação e Menu
function initNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section[id]');
    
    // Highlight da seção ativa
    function highlightActiveSection() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 200;
            const sectionHeight = section.offsetHeight;
            
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }
    
    window.addEventListener('scroll', highlightActiveSection);
}

// Menu Mobile
function initMobileMenu() {
    const mobileToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    if (mobileToggle && navMenu) {
        mobileToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            mobileToggle.classList.toggle('active');
        });
        
        // Fechar menu ao clicar em um link
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
                mobileToggle.classList.remove('active');
            });
        });
        
        // Fechar menu ao clicar fora
        document.addEventListener('click', function(e) {
            if (!mobileToggle.contains(e.target) && !navMenu.contains(e.target)) {
                navMenu.classList.remove('active');
                mobileToggle.classList.remove('active');
            }
        });
    }
}

// Filtros de Produtos
function initProductFilters() {
    const estampaFilter = document.getElementById('estampa-filter');
    const corFilter = document.getElementById('cor-filter');
    const modelagemFilter = document.getElementById('modelagem-filter');
    
    // Dados dos produtos (simulado)
    const produtos = [
        {
            id: 1,
            nome: 'Camiseta MYLO Attitude',
            descricao: 'Estampa expressiva para quem não passa despercebido',
            preco: 89.90,
            parcelas: 3,
            estampa: 'expressiva',
            cor: 'preto',
            modelagem: 'regular',
            imagem: 'assets/images/produto-1.jpg'
        },
        {
            id: 2,
            nome: 'Camiseta MYLO Minimal',
            descricao: 'Design clean e minimalista para o dia a dia',
            preco: 79.90,
            parcelas: 3,
            estampa: 'minimalista',
            cor: 'branco',
            modelagem: 'slim',
            imagem: 'assets/images/produto-2.jpg'
        },
        {
            id: 3,
            nome: 'Camiseta MYLO Urban',
            descricao: 'Estilo urbano com atitude e personalidade',
            preco: 94.90,
            parcelas: 3,
            estampa: 'urbana',
            cor: 'azul',
            modelagem: 'oversized',
            imagem: 'assets/images/produto-3.jpg'
        },
        {
            id: 4,
            nome: 'Camiseta MYLO Force',
            descricao: 'Para quem treina com intensidade e determinação',
            preco: 89.90,
            parcelas: 3,
            estampa: 'expressiva',
            cor: 'cinza',
            modelagem: 'regular',
            imagem: 'assets/images/produto-4.jpg'
        }
    ];
    
    function renderProducts(produtosFiltrados = produtos) {
        const grid = document.querySelector('.products-grid');
        
        if (!grid) return;
        
        grid.innerHTML = produtosFiltrados.map(produto => `
            <div class="product-card" data-estampa="${produto.estampa}" data-cor="${produto.cor}" data-modelagem="${produto.modelagem}">
                <div class="product-image">
                    <img src="${produto.imagem}" alt="${produto.nome}" onerror="this.src='assets/images/produto-placeholder.jpg'">
                </div>
                <div class="product-info">
                    <h3 class="product-name">${produto.nome}</h3>
                    <p class="product-description">${produto.descricao}</p>
                    <div class="product-price">
                        <span class="price">R$ ${produto.preco.toFixed(2).replace('.', ',')}</span>
                        <span class="installments">ou ${produto.parcelas}x de R$ ${(produto.preco / produto.parcelas).toFixed(2).replace('.', ',')}</span>
                    </div>
                    <div class="product-actions">
                        <button class="btn btn-secondary" onclick="comprarProduto(${produto.id})">Comprar Agora</button>
                        <span class="free-shipping">Frete Grátis</span>
                    </div>
                </div>
            </div>
        `).join('');
        
        // Animar entrada dos produtos
        const cards = grid.querySelectorAll('.product-card');
        cards.forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px)';
            
            setTimeout(() => {
                card.style.transition = 'all 0.5s ease';
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, index * 100);
        });
    }
    
    function filterProducts() {
        const estampaSelecionada = estampaFilter?.value || '';
        const corSelecionada = corFilter?.value || '';
        const modelagemSelecionada = modelagemFilter?.value || '';
        
        const produtosFiltrados = produtos.filter(produto => {
            return (!estampaSelecionada || produto.estampa === estampaSelecionada) &&
                   (!corSelecionada || produto.cor === corSelecionada) &&
                   (!modelagemSelecionada || produto.modelagem === modelagemSelecionada);
        });
        
        renderProducts(produtosFiltrados);
    }
    
    // Event listeners para filtros
    [estampaFilter, corFilter, modelagemFilter].forEach(filter => {
        if (filter) {
            filter.addEventListener('change', filterProducts);
        }
    });
    
    // Renderizar produtos iniciais
    renderProducts();
}

// Formulário de Contato
function initContactForm() {
    const form = document.querySelector('.form');
    
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const nome = document.getElementById('nome').value;
            const whatsapp = document.getElementById('whatsapp').value;
            const mensagem = document.getElementById('mensagem').value;
            
            // Validação básica
            if (!nome || !whatsapp || !mensagem) {
                showNotification('Por favor, preencha todos os campos.', 'error');
                return;
            }
            
            // Simular envio
            const submitBtn = form.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            
            submitBtn.textContent = 'Enviando...';
            submitBtn.disabled = true;
            
            setTimeout(() => {
                showNotification('Mensagem enviada com sucesso! Entraremos em contato em breve.', 'success');
                form.reset();
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }, 2000);
        });
    }
}

// Animações de Scroll
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Elementos para animar
    const animateElements = document.querySelectorAll('.story-block, .product-card, .hero-content, .section-header');
    
    animateElements.forEach(el => {
        el.classList.add('animate-element');
        observer.observe(el);
    });
}

// Scroll Suave
function initSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Funções Utilitárias
function comprarProduto(produtoId) {
    // Simular redirecionamento para WhatsApp
    const whatsappNumber = '5511999999999';
    const message = `Olá! Tenho interesse no produto ID: ${produtoId} do site MYLO.`;
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    
    window.open(whatsappUrl, '_blank');
}

function showNotification(message, type = 'info') {
    // Criar elemento de notificação
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Estilos da notificação
    Object.assign(notification.style, {
        position: 'fixed',
        top: '20px',
        right: '20px',
        padding: '16px 24px',
        borderRadius: '8px',
        color: 'white',
        fontWeight: '500',
        zIndex: '10000',
        transform: 'translateX(100%)',
        transition: 'transform 0.3s ease',
        maxWidth: '300px',
        wordWrap: 'break-word'
    });
    
    // Cores baseadas no tipo
    const colors = {
        success: '#10B981',
        error: '#EF4444',
        info: '#3B82F6'
    };
    
    notification.style.backgroundColor = colors[type] || colors.info;
    
    // Adicionar ao DOM
    document.body.appendChild(notification);
    
    // Animar entrada
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remover após 5 segundos
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 5000);
}

// Header Scroll Effect
window.addEventListener('scroll', function() {
    const header = document.querySelector('.header');
    
    if (window.scrollY > 100) {
        header.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
        header.style.backdropFilter = 'blur(10px)';
    } else {
        header.style.backgroundColor = '#FFFFFF';
        header.style.backdropFilter = 'none';
    }
});

// CSS para animações
const animationStyles = `
    .animate-element {
        opacity: 0;
        transform: translateY(30px);
        transition: all 0.6s ease;
    }
    
    .animate-element.animate-in {
        opacity: 1;
        transform: translateY(0);
    }
    
    .mobile-menu-toggle.active span:nth-child(1) {
        transform: rotate(45deg) translate(5px, 5px);
    }
    
    .mobile-menu-toggle.active span:nth-child(2) {
        opacity: 0;
    }
    
    .mobile-menu-toggle.active span:nth-child(3) {
        transform: rotate(-45deg) translate(7px, -6px);
    }
`;

// Adicionar estilos de animação
const styleSheet = document.createElement('style');
styleSheet.textContent = animationStyles;
document.head.appendChild(styleSheet);



// Funcionalidades Avançadas de Interatividade

// Scroll Progress Indicator
function initScrollProgress() {
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-indicator';
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        
        progressBar.style.width = scrollPercent + '%';
    });
}

// Lazy Loading para Imagens
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Parallax Effect para Hero
function initParallax() {
    const heroImage = document.querySelector('.hero-img');
    
    if (heroImage) {
        window.addEventListener('scroll', function() {
            const scrolled = window.scrollY;
            const rate = scrolled * -0.5;
            
            if (scrolled < window.innerHeight) {
                heroImage.style.transform = `translateY(${rate}px)`;
            }
        });
    }
}

// Typewriter Effect para Hero Title
function initTypewriter() {
    const heroTitle = document.querySelector('.hero-title');
    
    if (heroTitle) {
        const text = heroTitle.textContent;
        heroTitle.textContent = '';
        heroTitle.style.borderRight = '2px solid var(--accent-blue)';
        
        let i = 0;
        const typeInterval = setInterval(() => {
            heroTitle.textContent += text.charAt(i);
            i++;
            
            if (i >= text.length) {
                clearInterval(typeInterval);
                setTimeout(() => {
                    heroTitle.style.borderRight = 'none';
                }, 1000);
            }
        }, 50);
    }
}

// Contador Animado para Preços
function animateCounters() {
    const prices = document.querySelectorAll('.price');
    
    prices.forEach(price => {
        const finalValue = parseFloat(price.textContent.replace('R$ ', '').replace(',', '.'));
        let currentValue = 0;
        const increment = finalValue / 50;
        
        const counter = setInterval(() => {
            currentValue += increment;
            
            if (currentValue >= finalValue) {
                currentValue = finalValue;
                clearInterval(counter);
            }
            
            price.textContent = `R$ ${currentValue.toFixed(2).replace('.', ',')}`;
        }, 30);
    });
}

// Shake Animation para Formulário com Erro
function shakeElement(element) {
    element.style.animation = 'shake 0.5s ease-in-out';
    
    setTimeout(() => {
        element.style.animation = '';
    }, 500);
}

// Adicionar CSS para shake animation
const shakeCSS = `
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
        20%, 40%, 60%, 80% { transform: translateX(5px); }
    }
`;

// Melhorar validação do formulário
function enhancedFormValidation() {
    const form = document.querySelector('.form');
    
    if (form) {
        const inputs = form.querySelectorAll('input, textarea');
        
        inputs.forEach(input => {
            input.addEventListener('blur', function() {
                validateField(this);
            });
            
            input.addEventListener('input', function() {
                if (this.classList.contains('error')) {
                    validateField(this);
                }
            });
        });
        
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            let isValid = true;
            
            inputs.forEach(input => {
                if (!validateField(input)) {
                    isValid = false;
                }
            });
            
            if (!isValid) {
                shakeElement(form);
                showNotification('Por favor, corrija os campos destacados.', 'error');
                return;
            }
            
            // Processar envio do formulário
            submitForm(form);
        });
    }
}

function validateField(field) {
    const value = field.value.trim();
    let isValid = true;
    let message = '';
    
    // Remover classes de erro anteriores
    field.classList.remove('error');
    
    // Validações específicas
    switch (field.type) {
        case 'text':
            if (value.length < 2) {
                isValid = false;
                message = 'Nome deve ter pelo menos 2 caracteres';
            }
            break;
            
        case 'tel':
            const phoneRegex = /^\(\d{2}\)\s\d{4,5}-\d{4}$/;
            if (!phoneRegex.test(value) && value.length > 0) {
                isValid = false;
                message = 'Formato: (11) 99999-9999';
            }
            break;
            
        case 'textarea':
            if (value.length < 10) {
                isValid = false;
                message = 'Mensagem deve ter pelo menos 10 caracteres';
            }
            break;
    }
    
    if (field.required && value === '') {
        isValid = false;
        message = 'Este campo é obrigatório';
    }
    
    // Aplicar estilos de erro
    if (!isValid) {
        field.classList.add('error');
        showFieldError(field, message);
    } else {
        hideFieldError(field);
    }
    
    return isValid;
}

function showFieldError(field, message) {
    let errorElement = field.parentNode.querySelector('.field-error');
    
    if (!errorElement) {
        errorElement = document.createElement('span');
        errorElement.className = 'field-error';
        field.parentNode.appendChild(errorElement);
    }
    
    errorElement.textContent = message;
}

function hideFieldError(field) {
    const errorElement = field.parentNode.querySelector('.field-error');
    if (errorElement) {
        errorElement.remove();
    }
}

// Máscara para telefone
function initPhoneMask() {
    const phoneInput = document.getElementById('whatsapp');
    
    if (phoneInput) {
        phoneInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            
            if (value.length <= 11) {
                value = value.replace(/(\d{2})(\d)/, '($1) $2');
                value = value.replace(/(\d{4,5})(\d{4})$/, '$1-$2');
            }
            
            e.target.value = value;
        });
    }
}

// Inicializar todas as funcionalidades avançadas
document.addEventListener('DOMContentLoaded', function() {
    initScrollProgress();
    initLazyLoading();
    initParallax();
    enhancedFormValidation();
    initPhoneMask();
    
    // Adicionar CSS para validação
    const validationCSS = `
        .form-group input.error,
        .form-group textarea.error {
            border-color: #EF4444;
            box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1);
        }
        
        .field-error {
            color: #EF4444;
            font-size: 0.875rem;
            margin-top: 4px;
            display: block;
        }
        
        .lazy {
            opacity: 0;
            transition: opacity 0.3s;
        }
        
        .lazy.loaded {
            opacity: 1;
        }
    `;
    
    const validationStyleSheet = document.createElement('style');
    validationStyleSheet.textContent = validationCSS + shakeCSS;
    document.head.appendChild(validationStyleSheet);
});

// Função melhorada para envio do formulário
function submitForm(form) {
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    
    // Estado de loading
    submitBtn.textContent = 'Enviando...';
    submitBtn.disabled = true;
    submitBtn.classList.add('loading');
    
    // Simular envio
    setTimeout(() => {
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);
        
        // Aqui você integraria com um serviço real de envio
        console.log('Dados do formulário:', data);
        
        showNotification('Mensagem enviada com sucesso! Entraremos em contato em breve.', 'success');
        form.reset();
        
        // Restaurar botão
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
        submitBtn.classList.remove('loading');
        
    }, 2000);
}

// Adicionar efeito de digitação ao carregar a página
window.addEventListener('load', function() {
    // Pequeno delay para garantir que tudo carregou
    setTimeout(() => {
        initTypewriter();
    }, 500);
});

