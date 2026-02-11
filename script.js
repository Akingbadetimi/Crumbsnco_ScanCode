document.addEventListener('DOMContentLoaded', () => {
    const categoryList = document.getElementById('category-list');
    const menuContent = document.getElementById('menu-content');

    // Render Categories
    menuData.forEach((section, index) => {
        const li = document.createElement('li');
        li.className = 'category-item';

        const link = document.createElement('a');
        link.className = 'category-link';
        link.textContent = section.category;

        // Handle click to scroll
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetSection = document.getElementById(`section-${index}`);
            if (targetSection) {
                targetSection.scrollIntoView({ behavior: 'smooth' });

                // Update active state
                document.querySelectorAll('.category-link').forEach(l => l.classList.remove('active'));
                link.classList.add('active');
            }
        });

        li.appendChild(link);
        categoryList.appendChild(li);
    });

    // Render Menu Sections
    menuData.forEach((section, index) => {
        const sectionDiv = document.createElement('div');
        sectionDiv.className = 'menu-section';
        sectionDiv.id = `section-${index}`;

        const title = document.createElement('h2');
        title.className = 'section-title';
        title.textContent = section.category;
        sectionDiv.appendChild(title);

        const grid = document.createElement('div');
        grid.className = 'menu-items-grid';

        section.items.forEach(item => {
            const itemDiv = document.createElement('div');
            itemDiv.className = 'menu-item';

            const infoDiv = document.createElement('div');
            infoDiv.className = 'item-info';

            const name = document.createElement('h3');
            name.className = 'item-name';
            name.textContent = item.name;
            infoDiv.appendChild(name);

            const priceDiv = document.createElement('div');
            priceDiv.className = 'item-price';
            // Format price with Naira symbol and commas
            priceDiv.textContent = '₦' + item.price.toLocaleString();

            itemDiv.appendChild(infoDiv);
            itemDiv.appendChild(priceDiv);
            grid.appendChild(itemDiv);
        });

        sectionDiv.appendChild(grid);
        menuContent.appendChild(sectionDiv);
    });

    // Intersection Observer for active navigation state on scroll
    const observerOptions = {
        root: null,
        rootMargin: '-20% 0px -60% 0px', // Trigger when section is near top
        threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const sectionId = entry.target.id;
                const index = sectionId.split('-')[1];

                // Update active link
                document.querySelectorAll('.category-link').forEach(link => {
                    link.classList.remove('active');
                    if (link.textContent === menuData[index].category) {
                        link.classList.add('active');

                        // Scroll nav if needed (for horizontal scrolling)
                        const navItem = link.parentElement;
                        navItem.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
                    }
                });
            }
        });
    }, observerOptions);

    document.querySelectorAll('.menu-section').forEach(section => {
        observer.observe(section);
    });

    // Generate QR Code
    const qrContainer = document.getElementById('qrcode-container');
    if (qrContainer) {
        // Clear previous content
        qrContainer.innerHTML = '';

        const qrCode = new QRCode(qrContainer, {
            text: window.location.href,
            width: 128,
            height: 128,
            colorDark: "#d4af37", // Gold
            colorLight: "#121212", // Dark Background
            correctLevel: QRCode.CorrectLevel.H
        });

        // Add a label
        const label = document.createElement('p');
        label.textContent = "Scan to view menu on your phone";
        label.style.marginTop = "10px";
        label.style.color = "#a0a0a0";
        qrContainer.appendChild(label);
    }
});
