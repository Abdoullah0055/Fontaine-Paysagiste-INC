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

    // Slider avant/après pour la galerie
    document.querySelectorAll('.before-after-wrapper').forEach(wrapper => {
        const slider = wrapper.querySelector('.slider');
        const afterImg = wrapper.querySelector('.after-image');

        slider.addEventListener('input', function () {
            afterImg.style.width = `${this.value}%`;
        });
    });



});