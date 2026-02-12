document.addEventListener('DOMContentLoaded', () => {

    // 1. Lightbox Functionality
    const lightbox = document.createElement('div');
    lightbox.className = 'lightbox';
    lightbox.innerHTML = `
        <span class="lightbox-close">&times;</span>
        <button class="lightbox-prev"><i class="fas fa-chevron-left"></i></button>
        <button class="lightbox-next"><i class="fas fa-chevron-right"></i></button>
        <div class="lightbox-content">
            <img src="" alt="Imagen ampliada">
        </div>
    `;
    document.body.appendChild(lightbox);

    const galleryItems = document.querySelectorAll('.gallery-item');
    const lightboxImg = lightbox.querySelector('img');
    const lightboxClose = lightbox.querySelector('.lightbox-close');
    const prevBtn = lightbox.querySelector('.lightbox-prev');
    const nextBtn = lightbox.querySelector('.lightbox-next');
    
    let currentIndex = 0;
    const images = [];

    // Collect all image sources
    galleryItems.forEach((item, index) => {
        const img = item.querySelector('img');
        if (img) {
            images.push({
                src: img.getAttribute('src'),
                alt: img.getAttribute('alt')
            });
            
            // Add click event to the container (handles overlay click too)
            item.addEventListener('click', () => {
                openLightbox(index);
            });
        }
    });

    const openLightbox = (index) => {
        currentIndex = index;
        updateLightboxImage();
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    };

    const updateLightboxImage = () => {
        const image = images[currentIndex];
        lightboxImg.src = image.src;
        lightboxImg.alt = image.alt;
    };

    const closeLightbox = () => {
        lightbox.classList.remove('active');
        document.body.style.overflow = 'auto';
    };

    const showNext = (e) => {
        if(e) e.stopPropagation();
        currentIndex = (currentIndex + 1) % images.length;
        updateLightboxImage();
    };

    const showPrev = (e) => {
        if(e) e.stopPropagation();
        currentIndex = (currentIndex - 1 + images.length) % images.length;
        updateLightboxImage();
    };

    // Event Listeners
    lightboxClose.addEventListener('click', closeLightbox);
    prevBtn.addEventListener('click', showPrev);
    nextBtn.addEventListener('click', showNext);

    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox || e.target.classList.contains('lightbox-content')) {
            closeLightbox();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (!lightbox.classList.contains('active')) return;
        
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowRight') showNext();
        if (e.key === 'ArrowLeft') showPrev();
    });


    // 2. Scroll Animations (Intersection Observer)
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('.feature-card, .about-text, .about-image, .section-title');
    animatedElements.forEach(el => observer.observe(el));


    // 3. Header Scroll Effect
    const header = document.querySelector('header');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 50) {
             if (currentScroll > lastScroll && currentScroll > 200) {
                 header.classList.add('hidden');
             } else {
                 header.classList.remove('hidden');
             }
        }
        lastScroll = currentScroll;
    });

    // 4. Smooth Scroll for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      
                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        });
    });

});
