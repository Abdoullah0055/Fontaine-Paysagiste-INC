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
