document.addEventListener('DOMContentLoaded', function() {
    
    // 1. Initialize AOS Animation Library
    AOS.init({
        duration: 800,   
        once: true,      
        mirror: false,   
        offset: 100      
    });

    // 2. Lightbox Functionality
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxVideo = document.getElementById('lightbox-video');
    const closeBtn = document.querySelector('.close-btn');
    
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    const videoItems = document.querySelectorAll('.video-item');

    // Handle Image Gallery
    portfolioItems.forEach(item => {
        item.addEventListener('click', () => {
            const fullSrc = item.querySelector('img').getAttribute('data-full-src');
            const src = fullSrc || item.querySelector('img').getAttribute('src');
            
            lightboxImg.setAttribute('src', src);
            lightboxImg.style.display = 'block';
            lightboxVideo.style.display = 'none';
            lightbox.classList.add('active');
        });
    });

    // Handle Video Popup
    videoItems.forEach(item => {
        item.addEventListener('click', () => {
            const videoSrc = item.getAttribute('data-video-src');
            
            lightboxVideo.setAttribute('src', videoSrc);
            lightboxVideo.style.display = 'block';
            lightboxImg.style.display = 'none';
            lightbox.classList.add('active');
            
            // Force the video to load and play immediately
            lightboxVideo.load();
            lightboxVideo.play().catch(error => {
                console.log("Browser blocked autoplay:", error);
            });
        });
    });

    // Close Lightbox Function (Stops video and clears sources)
    function closeLightbox() {
        lightbox.classList.remove('active');
        setTimeout(() => {
            // Clear image
            lightboxImg.setAttribute('src', ''); 
            lightboxImg.style.display = 'none';
            
            // Clear and pause video
            lightboxVideo.pause();
            lightboxVideo.removeAttribute('src');
            lightboxVideo.style.display = 'none';
        }, 200);
    }

    // Close on button click
    closeBtn.addEventListener('click', closeLightbox);
    
    // Close when clicking outside the media
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });

    // 3. Automatically Update Footer Year
    const currentYearSpan = document.getElementById('current-year');
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }
});
