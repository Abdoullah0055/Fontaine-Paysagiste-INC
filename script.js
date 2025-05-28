document.addEventListener("DOMContentLoaded", function () {

    function initMap() {
        const location = { lat: 45.670350, lng: -73.891370 }; // Coordonnées GPS exactes de l'adresse
        const map = new google.maps.Map(document.getElementById("map"), {
            zoom: 15,
            center: location,
        });
        const marker = new google.maps.Marker({
            position: location,
            map: map,
        });
    }

    function toggleDesc(button) {
        const card = button.closest('.service-card');
        card.classList.toggle('open');
        button.classList.toggle('rotate');
    }

    // Rendre accessible dans le HTML inline onclick
    window.toggleDesc = toggleDesc;


    // Bouton Scroll to Top
    window.addEventListener("scroll", function () {
        const scrollBtn = document.getElementById("scrollTopBtn");
        if (window.scrollY > 600) {
            scrollBtn.style.display = "block";
        } else {
            scrollBtn.style.display = "none";
        }
    });

    document.getElementById("scrollTopBtn").addEventListener("click", function () {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });



    //Ne pas aller dans le site formspree.io

    const form = document.getElementById("contact-form");
    const confirmationMessage = document.getElementById("confirmation-message");

    form.addEventListener("submit", function (e) {
        e.preventDefault(); // Empêche la soumission par défaut

        const formData = new FormData(form);

        fetch(form.action, {
            method: "POST",
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        })
            .then(response => {
                if (response.ok) {
                    form.reset(); // Réinitialise le formulaire
                    confirmationMessage.style.display = "block"; // Affiche le message de confirmation
                } else {
                    return response.json().then(data => {
                        throw new Error(data.error || "Une erreur est survenue lors de l'envoi du formulaire.");
                    });
                }
            })
            .catch(error => {
                alert(error.message);
            });
    });

    // Comparateur avant/après avec glissière verticale
    document.querySelectorAll('.before-after-container').forEach(container => {
        const afterImage = container.querySelector('.after');
        const slider = container.querySelector('.slider-bar');

        const moveSlider = (x) => {
            const rect = container.getBoundingClientRect();
            let pos = x - rect.left;
            pos = Math.max(0, Math.min(pos, rect.width));
            const percent = (pos / rect.width) * 100;

            slider.style.left = `${percent}%`;
            afterImage.style.clipPath = `inset(0 ${100 - percent}% 0 0)`;
        };

        let isDragging = false;

        slider.addEventListener('mousedown', (e) => {
            isDragging = true;
            moveSlider(e.clientX);
        });

        document.addEventListener('mousemove', (e) => {
            if (isDragging) moveSlider(e.clientX);
        });

        document.addEventListener('mouseup', () => {
            isDragging = false;
        });

        // Support tactile
        slider.addEventListener('touchstart', (e) => {
            isDragging = true;
            moveSlider(e.touches[0].clientX);
        });

        document.addEventListener('touchmove', (e) => {
            if (isDragging) moveSlider(e.touches[0].clientX);
        });

        document.addEventListener('touchend', () => {
            isDragging = false;
        });
    });



});