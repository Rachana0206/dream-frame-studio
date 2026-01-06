// Instagram Portfolio Loader
// This script loads Instagram images into the portfolio

async function loadInstagramImages() {
    try {
        // Fetch Instagram images from API
        const response = await fetch('/api/instagram');
        const data = await response.json();
        
        if (data.success && data.images && data.images.length > 0) {
            updatePortfolio(data.images);
        } else {
            // Fallback: Use Instagram embed or manual URLs
            loadManualInstagramImages();
        }
    } catch (error) {
        console.error('Error loading Instagram images:', error);
        // Keep existing portfolio images as fallback
    }
}

function loadManualInstagramImages() {
    // Manual Instagram image URLs
    // To get these URLs:
    // 1. Go to your Instagram post
    // 2. Right-click on the image > Copy image address
    // 3. Or use: https://www.instagram.com/p/POST_ID/media/?size=l
    
    const instagramImages = [
        // Add your Instagram image URLs here
        // Format: { url: 'image_url', category: 'wedding|portrait|event|commercial', title: 'Title', description: 'Description' }
        
        // Example (replace with your actual Instagram image URLs):
        // {
        //     url: 'https://instagram.com/p/ABC123/media/?size=l',
        //     category: 'wedding',
        //     title: 'Wedding Photo',
        //     description: 'Beautiful wedding ceremony'
        // }
    ];
    
    if (instagramImages.length > 0) {
        updatePortfolio(instagramImages);
    }
}

function updatePortfolio(images) {
    const portfolioGrid = document.querySelector('.portfolio-grid');
    if (!portfolioGrid) return;
    
    // Clear existing placeholder images
    portfolioGrid.innerHTML = '';
    
    // Add Instagram images
    images.forEach((image, index) => {
        const portfolioItem = document.createElement('div');
        portfolioItem.className = 'portfolio-item';
        portfolioItem.setAttribute('data-category', image.category || 'all');
        
        portfolioItem.innerHTML = `
            <div class="portfolio-image">
                <img src="${image.url}" alt="${image.title || 'Instagram Photo'}" loading="lazy" onerror="this.src='https://via.placeholder.com/800x600?text=Image+Loading'">
                <div class="portfolio-overlay">
                    <h3>${image.title || 'Our Work'}</h3>
                    <p>${image.description || ''}</p>
                </div>
            </div>
        `;
        
        portfolioGrid.appendChild(portfolioItem);
    });
    
    // Re-initialize portfolio filter
    if (typeof initializePortfolioFilter === 'function') {
        initializePortfolioFilter();
    }
}

// Load Instagram images when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadInstagramImages);
} else {
    loadInstagramImages();
}



