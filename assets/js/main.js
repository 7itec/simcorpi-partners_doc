document.addEventListener('DOMContentLoaded', function () {
    // Active nav card highlighting
    const currentPath = window.location.pathname;
    document.querySelectorAll('.nav-card').forEach(function (card) {
        try {
            const cardPath = new URL(card.href).pathname;
            if (
                currentPath === cardPath ||
                (currentPath.endsWith('/') && cardPath.endsWith('index.html'))
            ) {
                card.classList.add('active');
            }
        } catch (e) {}
    });

    // Scroll to top button
    const scrollBtn = document.getElementById('scrollToTop');
    if (scrollBtn) {
        window.addEventListener('scroll', function () {
            scrollBtn.classList.toggle('visible', window.pageYOffset > 300);
        });
        scrollBtn.addEventListener('click', function () {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // Animate headings on scroll
    const observer = new IntersectionObserver(
        function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        },
        { threshold: 0.1 }
    );

    document.querySelectorAll('.content h2, .content h3').forEach(function (el) {
        el.style.opacity = '0';
        el.style.transform = 'translateY(16px)';
        el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(el);
    });

    // Copy-to-clipboard for code blocks
    document.querySelectorAll('.content pre').forEach(function (pre) {
        const btn = document.createElement('button');
        btn.className = 'copy-btn';
        btn.textContent = 'Copiar';
        btn.style.cssText =
            'position:absolute;top:.6rem;right:.6rem;padding:.25rem .6rem;' +
            'background:#334155;color:#cbd5e1;border:none;border-radius:4px;' +
            'font-size:.75rem;cursor:pointer;transition:background .2s;';
        pre.style.position = 'relative';
        pre.appendChild(btn);

        btn.addEventListener('click', function () {
            const code = pre.querySelector('code') ? pre.querySelector('code').innerText : pre.innerText;
            navigator.clipboard.writeText(code).then(function () {
                btn.textContent = 'Copiado!';
                btn.style.background = '#166534';
                btn.style.color = '#bbf7d0';
                setTimeout(function () {
                    btn.textContent = 'Copiar';
                    btn.style.background = '#334155';
                    btn.style.color = '#cbd5e1';
                }, 2000);
            });
        });
    });
});
