// Mobile Menu Toggle with animation
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const navMenu = document.querySelector('.nav-menu');
const navbar = document.querySelector('.navbar');

mobileMenuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    mobileMenuToggle.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        mobileMenuToggle.classList.remove('active');
    });
});

// Navbar scroll effect
let lastScroll = 0;
window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 50) {
        navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.1)';
    }

    lastScroll = currentScroll;
});

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const navHeight = navbar.offsetHeight;
            const targetPosition = target.offsetTop - navHeight;
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Form Submission with better UX
const contactForm = document.querySelector('.contact-form');
const submitButton = contactForm.querySelector('.btn-primary');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Store original button text
    const originalText = submitButton.textContent;

    // Show loading state
    submitButton.textContent = 'Sending...';
    submitButton.style.opacity = '0.7';
    submitButton.style.pointerEvents = 'none';

    // Simulate form submission (replace with actual API call)
    setTimeout(() => {
        // Success state
        submitButton.textContent = 'Message Sent!';
        submitButton.style.opacity = '1';

        // Show success notification
        showNotification('Thank you! We\'ll be in touch soon.', 'success');

        // Reset form
        contactForm.reset();

        // Reset button after delay
        setTimeout(() => {
            submitButton.textContent = originalText;
            submitButton.style.pointerEvents = 'auto';
        }, 2000);
    }, 1500);
});

// Notification system
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? 'linear-gradient(135deg, #6366f1, #8b5cf6)' : '#ef4444'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 12px;
        box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
        z-index: 10000;
        animation: slideIn 0.3s ease;
        font-weight: 500;
    `;

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Add animation keyframes
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const fadeInObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            fadeInObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all service cards with staggered animation
document.querySelectorAll('.service-card').forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
    fadeInObserver.observe(card);
});

// Observe process steps
document.querySelectorAll('.process-step').forEach((step, index) => {
    step.style.opacity = '0';
    step.style.transform = 'translateY(20px)';
    step.style.transition = `opacity 0.5s ease ${index * 0.15}s, transform 0.5s ease ${index * 0.15}s`;
    fadeInObserver.observe(step);
});

// Add fade-in class styles
const fadeInStyle = document.createElement('style');
fadeInStyle.textContent = `
    .fade-in {
        opacity: 1 !important;
        transform: translateY(0) !important;
    }
`;
document.head.appendChild(fadeInStyle);

// Active navigation link based on scroll position
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop - navbar.offsetHeight - 100;
        const sectionHeight = section.clientHeight;

        if (window.pageYOffset >= sectionTop && window.pageYOffset < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Parallax effect for hero orbs
const orbs = document.querySelectorAll('.gradient-orb');
window.addEventListener('mousemove', (e) => {
    const mouseX = e.clientX / window.innerWidth;
    const mouseY = e.clientY / window.innerHeight;

    orbs.forEach((orb, index) => {
        const speed = (index + 1) * 20;
        const x = (mouseX - 0.5) * speed;
        const y = (mouseY - 0.5) * speed;
        orb.style.transform = `translate(${x}px, ${y}px)`;
    });
});

// Add hover effect to service cards for glow
document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const glow = card.querySelector('.card-glow');
        if (glow) {
            glow.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(99, 102, 241, 0.15) 0%, transparent 50%)`;
        }
    });
});

// Stats counter animation
const stats = document.querySelectorAll('.stat-number');
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const target = entry.target;
            const text = target.textContent;
            const hasPercent = text.includes('%');
            const hasPlus = text.includes('+');
            const number = parseFloat(text.replace(/[^0-9.]/g, ''));

            let current = 0;
            const increment = number / 50;
            const timer = setInterval(() => {
                current += increment;
                if (current >= number) {
                    current = number;
                    clearInterval(timer);
                }

                let displayValue = current.toFixed(1);
                if (number % 1 === 0) displayValue = Math.round(current);

                target.textContent = displayValue + (hasPercent ? '%' : '') + (hasPlus ? '+' : '');
            }, 30);

            statsObserver.unobserve(target);
        }
    });
}, { threshold: 0.5 });

stats.forEach(stat => statsObserver.observe(stat));

// Interactive Tabs for Use Cases
const tabButtons = document.querySelectorAll('.tab-button');
const tabContents = document.querySelectorAll('.tab-content');

tabButtons.forEach(button => {
    button.addEventListener('click', () => {
        const targetTab = button.getAttribute('data-tab');

        // Remove active class from all buttons and contents
        tabButtons.forEach(btn => btn.classList.remove('active'));
        tabContents.forEach(content => content.classList.remove('active'));

        // Add active class to clicked button and corresponding content
        button.classList.add('active');
        const targetContent = document.querySelector(`[data-content="${targetTab}"]`);
        if (targetContent) {
            targetContent.classList.add('active');
        }
    });
});

// Service Card Expand/Collapse
document.querySelectorAll('.service-card').forEach(card => {
    const features = card.querySelector('.service-features');
    if (features && features.children.length > 3) {
        // Store original height
        const fullHeight = features.scrollHeight;

        // Initially show only 3 items
        features.style.maxHeight = '150px';
        features.style.overflow = 'hidden';
        features.style.transition = 'max-height 0.4s ease';

        // Create expand button
        const expandBtn = document.createElement('button');
        expandBtn.className = 'expand-btn';
        expandBtn.innerHTML = `
            <span class="expand-text">Show More</span>
            <svg class="expand-icon" width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M4 6L8 10L12 6" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
            </svg>
        `;
        expandBtn.style.cssText = `
            display: flex;
            align-items: center;
            gap: 0.5rem;
            background: none;
            border: none;
            color: var(--primary);
            font-weight: 600;
            font-size: 0.9rem;
            margin-top: 1rem;
            cursor: pointer;
            padding: 0;
            transition: all 0.3s ease;
        `;

        let isExpanded = false;
        expandBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            isExpanded = !isExpanded;

            if (isExpanded) {
                features.style.maxHeight = fullHeight + 'px';
                expandBtn.querySelector('.expand-text').textContent = 'Show Less';
                expandBtn.querySelector('.expand-icon').style.transform = 'rotate(180deg)';
            } else {
                features.style.maxHeight = '150px';
                expandBtn.querySelector('.expand-text').textContent = 'Show More';
                expandBtn.querySelector('.expand-icon').style.transform = 'rotate(0deg)';
            }
        });

        card.appendChild(expandBtn);
    }
});

// Add expand button styles
const expandBtnStyle = document.createElement('style');
expandBtnStyle.textContent = `
    .expand-btn:hover {
        opacity: 0.8;
    }
    .expand-icon {
        transition: transform 0.3s ease;
    }
`;
document.head.appendChild(expandBtnStyle);

// Interactive pricing calculator (tooltip on hover)
const createTooltip = (element, text) => {
    const tooltip = document.createElement('div');
    tooltip.className = 'custom-tooltip';
    tooltip.textContent = text;
    tooltip.style.cssText = `
        position: absolute;
        background: rgba(15, 23, 42, 0.95);
        color: white;
        padding: 0.75rem 1rem;
        border-radius: 8px;
        font-size: 0.875rem;
        pointer-events: none;
        opacity: 0;
        transition: opacity 0.3s ease;
        z-index: 1000;
        white-space: nowrap;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
    `;
    document.body.appendChild(tooltip);

    element.addEventListener('mouseenter', (e) => {
        const rect = element.getBoundingClientRect();
        tooltip.style.top = rect.bottom + 10 + window.scrollY + 'px';
        tooltip.style.left = rect.left + (rect.width / 2) - (tooltip.offsetWidth / 2) + 'px';
        tooltip.style.opacity = '1';
    });

    element.addEventListener('mouseleave', () => {
        tooltip.style.opacity = '0';
    });
};

// Add tooltips to metric items
document.querySelectorAll('.metric-item').forEach(item => {
    const label = item.querySelector('.metric-label').textContent;
    const value = item.querySelector('.metric-value').textContent;
    createTooltip(item, `${label}: ${value} on average`);
});

// Smooth scroll progress indicator
const progressBar = document.createElement('div');
progressBar.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    height: 3px;
    background: var(--gradient-primary);
    width: 0%;
    z-index: 9999;
    transition: width 0.1s ease;
`;
document.body.appendChild(progressBar);

window.addEventListener('scroll', () => {
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollPercent = (scrollTop / (documentHeight - windowHeight)) * 100;
    progressBar.style.width = scrollPercent + '%';
});

// Copy email on click
document.querySelectorAll('.method-value').forEach(el => {
    if (el.textContent.includes('@') || el.textContent.includes('+1')) {
        el.style.cursor = 'pointer';
        el.addEventListener('click', () => {
            navigator.clipboard.writeText(el.textContent).then(() => {
                showNotification('Copied to clipboard!', 'success');
            });
        });
    }
});

// Vapi Voice AI Demo Integration
(function() {
    // Vapi credentials
    const VAPI_PUBLIC_KEY = '202c7d34-da32-40ef-b6fb-374e7e3d82ac';
    const ASSISTANT_ID = '8e7ee821-e5b9-4ad6-bc32-c9182adefecb';

    let vapiInstance = null;
    let isCallActive = false;

    const demoBtn = document.getElementById('vapi-demo-btn');
    const btnText = document.getElementById('demo-btn-text');

    if (!demoBtn) return;

    // Initialize Vapi
    function initVapi() {
        if (typeof window.vapiSDK === 'undefined') {
            console.error('Vapi SDK not loaded');
            showNotification('Voice AI not available. Please refresh the page.', 'error');
            return null;
        }

        try {
            vapiInstance = window.vapiSDK.run({
                apiKey: VAPI_PUBLIC_KEY,
                assistant: ASSISTANT_ID
            });

            // Event listeners
            vapiInstance.on('call-start', () => {
                console.log('Call started');
                isCallActive = true;
                updateButtonState('active');
                showNotification('Connected! Start speaking...', 'success');
            });

            vapiInstance.on('call-end', () => {
                console.log('Call ended');
                isCallActive = false;
                updateButtonState('idle');
                showNotification('Call ended. Click to try again!', 'success');
            });

            vapiInstance.on('speech-start', () => {
                console.log('User started speaking');
            });

            vapiInstance.on('speech-end', () => {
                console.log('User stopped speaking');
            });

            vapiInstance.on('message', (message) => {
                console.log('Message:', message);
            });

            vapiInstance.on('error', (error) => {
                console.error('Vapi error:', error);
                isCallActive = false;
                updateButtonState('idle');
                showNotification('Connection error. Please try again.', 'error');
            });

            return vapiInstance;
        } catch (error) {
            console.error('Failed to initialize Vapi:', error);
            showNotification('Failed to initialize voice AI', 'error');
            return null;
        }
    }

    // Update button appearance based on state
    function updateButtonState(state) {
        const btn = demoBtn;
        const text = btnText;
        const subText = document.querySelector('.demo-sub-text');

        switch(state) {
            case 'idle':
                btn.classList.remove('btn-calling', 'btn-connecting');
                text.textContent = 'Talk to Our AI Now';
                if (subText) subText.textContent = 'Click to speak with AI receptionist in your browser';
                break;
            case 'connecting':
                btn.classList.add('btn-connecting');
                text.textContent = 'Connecting...';
                if (subText) subText.textContent = 'Please allow microphone access';
                break;
            case 'active':
                btn.classList.remove('btn-connecting');
                btn.classList.add('btn-calling');
                text.textContent = 'End Call';
                if (subText) subText.textContent = 'Click to hang up';
                break;
        }
    }

    // Handle button click
    demoBtn.addEventListener('click', async () => {
        // Check if credentials are set
        if (VAPI_PUBLIC_KEY === 'YOUR_VAPI_PUBLIC_KEY_HERE' ||
            ASSISTANT_ID === 'YOUR_ASSISTANT_ID_HERE') {
            showNotification('Demo not configured. Please add your Vapi credentials.', 'error');
            console.error('Please configure VAPI_PUBLIC_KEY and ASSISTANT_ID in script.js');
            return;
        }

        if (isCallActive) {
            // End call
            if (vapiInstance) {
                vapiInstance.stop();
            }
            isCallActive = false;
            updateButtonState('idle');
        } else {
            // Start call
            updateButtonState('connecting');

            if (!vapiInstance) {
                vapiInstance = initVapi();
            }

            if (vapiInstance) {
                try {
                    await vapiInstance.start();
                } catch (error) {
                    console.error('Failed to start call:', error);
                    updateButtonState('idle');
                    showNotification('Failed to start call. Please try again.', 'error');
                }
            } else {
                updateButtonState('idle');
            }
        }
    });

    // Add pulse animation
    const pulseStyle = document.createElement('style');
    pulseStyle.textContent = `
        @keyframes pulse {
            0%, 100% {
                transform: scale(1);
                box-shadow: 0 20px 40px rgba(99, 102, 241, 0.4);
            }
            50% {
                transform: scale(1.05);
                box-shadow: 0 25px 50px rgba(99, 102, 241, 0.6);
            }
        }

        .btn-calling {
            background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%) !important;
        }

        .btn-connecting {
            opacity: 0.8;
        }

        .btn-demo svg {
            transition: transform 0.3s ease;
        }

        .btn-calling svg {
            animation: shake 0.5s infinite;
        }

        @keyframes shake {
            0%, 100% { transform: rotate(0deg); }
            25% { transform: rotate(-5deg); }
            75% { transform: rotate(5deg); }
        }
    `;
    document.head.appendChild(pulseStyle);
})();
