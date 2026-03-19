       lucide.createIcons();
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) entry.target.classList.add('active');
            });
        }, { threshold: 0.1 });
        document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

        let currentPDF = 1;
        const totalPDFs = 3;

        function changePDF(direction) {
            // 1. Update the current index
            currentPDF += direction;
            
            // 2. Handle Looping
            if (currentPDF > totalPDFs) currentPDF = 1;
            if (currentPDF < 1) currentPDF = totalPDFs;

            // 3. Define the new file path (FIXED: Added folder directory here)
            const filePath = `./assets/pdf/Aurora Shade Report ${currentPDF}.pdf`;
            
            // 4. Update the PDF Viewer (Object)
            const viewer = document.getElementById('pdf-viewer');
            if (viewer) {
                // Re-cloning the object is often necessary to force browsers to reload the PDF
                const container = viewer.parentElement;
                const newViewer = viewer.cloneNode(true);
                newViewer.setAttribute('data', filePath);
                container.replaceChild(newViewer, viewer);
            }

            // 5. Update the Counter
            const counter = document.getElementById('pdf-counter');
            if (counter) {
                counter.innerText = `${currentPDF} / ${totalPDFs}`;
            }

            // 6. Update the Title
            const title = document.getElementById('pdf-title');
            if (title) {
                title.innerText = `Aurora Shade Report ${currentPDF}`;
            }

            // 7. Update the Links (Fallback and Full Screen)
            const fallback = document.getElementById('pdf-fallback');
            const fullLink = document.getElementById('pdf-link');
            if (fallback) fallback.setAttribute('href', filePath);
            if (fullLink) fullLink.setAttribute('href', filePath);

            // 8. Refresh Lucide Icons
            if (window.lucide) {
                lucide.createIcons();
            }
        }