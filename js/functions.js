lucide.createIcons();

// Animation Observer
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('active');
    });
}, { threshold: 0.1 });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// PDF Navigation Logic
let currentPDF = 1;
const totalPDFs = 3;

function changePDF(direction) {
    currentPDF += direction;
    
    if (currentPDF > totalPDFs) currentPDF = 1;
    if (currentPDF < 1) currentPDF = totalPDFs;

    const filePath = `./assets/pdf/Aurora Shade Report ${currentPDF}.pdf`;
    
    // Update Viewer and force reload
    const viewer = document.getElementById('pdf-viewer');
    if (viewer) {
        const container = viewer.parentElement;
        const newViewer = viewer.cloneNode(true);
        newViewer.setAttribute('data', filePath);
        container.replaceChild(newViewer, viewer);
    }

    // Update UI Labels
    const counter = document.getElementById('pdf-counter');
    const title = document.getElementById('pdf-title');
    if (counter) counter.innerText = `${currentPDF} / ${totalPDFs}`;
    if (title) title.innerText = `Aurora Shade Report ${currentPDF}`;

    // Update Links
    const fallback = document.getElementById('pdf-fallback');
    const fullLink = document.getElementById('pdf-link');
    if (fallback) fallback.setAttribute('href', filePath);
    if (fullLink) fullLink.setAttribute('href', filePath);

    // Re-render icons for buttons
    if (window.lucide) lucide.createIcons();
}

// Initial Load Trigger (Fixes the "blank" preview on open)
document.addEventListener('DOMContentLoaded', () => {
    changePDF(0);
});
