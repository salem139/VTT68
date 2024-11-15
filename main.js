
var mymap = L.map('map', {
    center: [47.83, 7.13], // Les coordonnées appliqués à la vue lors de l'ouverture de la page
    zoom: 14, // Le niveau de zoom associé
    minZoom: 6, // Le niveau min de zoom que l'on modifier sur la carte
    maxZoom: 18, // Même chose avec le niveau maximum
    zoomControl: false // Le zoom de base est désactivé, nous le définissons par la suite
});

var baselayers = {
    CLAIR: L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', { attribution: 'Open Street Map', maxZoom: 20}),
    SOMBRE: L.tileLayer('https://tile.jawg.io/jawg-dark/{z}/{x}/{y}{r}.png?access-token=OFCl0kpcDyvePBetMgGBXyAYT2B8U7iQmzPMLToEsUT9W1i6Q7WdkHJ3CGUE0o9e', { attribution: 'Esri', minZoom: 10}),
    TERRAIN: L.tileLayer('https://tile.jawg.io/jawg-terrain/{z}/{x}/{y}{r}.png?access-token=OFCl0kpcDyvePBetMgGBXyAYT2B8U7iQmzPMLToEsUT9W1i6Q7WdkHJ3CGUE0o9e', { attribution: 'Esri', minZoom: 10}),
    SATELLITE: L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', { attribution: 'Esri', minZoom: 10})
};

baselayers.CLAIR.addTo(mymap);
L.control.layers(baselayers, null, { position: 'topright' }, { collapsed: false }).addTo(mymap);

L.control.zoom({
    position: 'topright' // La position sur la page
}).addTo(mymap);

L.control.scale({
    position: 'bottomright'
}).addTo(mymap);

var tabCarte = document.getElementById('tabCarte');
var tabTutoriel = document.getElementById('tabTutoriel');
var tabref = document.getElementById("tabref");


var tutorialSteps = [
    {
        title: "Tutoriel de l'interface",
        content: "Cette interface donne à l'utilisateur à la fois la possibilité de visualiser des circuits VTT, et de voir leurs difficultés "
    },
    {
        title: "Prise en main",
        content: "Il est possible de se déplacer sur la carte, de modifier le zoom, ou encore de changer le fond de la carte."
    },
    {
        title: "Visualisation des données",
        content: "En cliquant à travers les boutons présents, il est possible d'obtenir des informations variées en fonction du cas souhaité"
    },
    {
        title: "Visualisation de données avancées",
        content: "En déplacement le slider, il vous est possible de visualiser les différents circuits trier par dates"
    },  
    {
        title: "Fluidité de la page",
        content: "Les données étant assez importantes, il est conseillé pour la réactivité du slider de zoomer sur la page (zoomer sur une zone en particulier), mais cela n'est pas obligatoire."
    }
];


tabTutoriel.addEventListener('click', function () {
    var stepIndex = 0;

    // Cette fonction permet de gérer l'intéractivité de chaque étape du tutoriel
    function showNextStep() {
        Swal.fire({
            title: tutorialSteps[stepIndex].title, // Affichage du titre
            html: tutorialSteps[stepIndex].content, // Affichage du contenu
            confirmButtonText: 'Étape suivante &rarr;', // Affichage du bouton passage à l'étape suivante
            showCancelButton: true, // Ajout du bouton ou l'on peut quitter le menu tutoriel
            progressSteps: [String(stepIndex + 1)], // Définition des étapes avec un index pour passer à l'étape suivante
            reverseButtons: true, // On peut revenir à l'étape précédente
            cancelButtonText: "Quitter", // Le titre du bouton quitter
            onBeforeOpen: () => { // Modification des éléments d'affichage avant son ouverture
                $('.swal2-confirm').removeClass('swal2-confirm');
            }
        }).then((result) => { // Exécution des étapes fléchées
            if (result.value) { // Contrôle si les flèches ont été activées
                stepIndex++; // Si oui, on ingrémente la variable step index sur le nombre d'étape enregistrer
                if (stepIndex < tutorialSteps.length) {
                    showNextStep(); // On passe à l'étape suivante
                } else { // Condition si il n'y a pas d'étape suivante (cad la fin)
                    Swal.fire({ // On ajoute un dernier onglet avec ; 
                        title: 'Informations complémentaires', // Le titre
                        html: "Pour plus de renseignements, veuillez vous référer à la section '<u>À propos</u>'.", // Le texte lien l'onglet A propos
                        confirmButtonText: "C'est parti !" // Un bouton de confirmation de fin de tutoriel permettant de revenir à la vue carte
                    });
                }
            }
        });
    }

    showNextStep(); 
});

var referenceSteps = [
    {
        title: "Réalisation",
        content: "Guillot Romain - Septembre 2024"
    },
    {
        title: "Données",
        content: "Fond de carte : Esri, BD Carto, Open Street Map <br> Circuits : GPX personnels"
    }
];


tabref.addEventListener('click', function () {
    var stepIndex = 0;

    function showNextStep() {
        var buttons = ["Quitter"];
        if (stepIndex === 0) {
            buttons.unshift('Étape suivante &rarr;');
        }

        Swal.fire({
            title: referenceSteps[stepIndex].title,
            html: referenceSteps[stepIndex].content,
            showCancelButton: true,
            confirmButtonText: buttons[0],
            showConfirmButton: buttons.length > 1,
            progressSteps: [String(stepIndex + 1)],
            reverseButtons: true,
            cancelButtonText: "Quitter",
            onBeforeOpen: () => {
                $('.swal2-confirm').removeClass('swal2-confirm');
            }
        }).then((result) => {
            if (result.value) {
                stepIndex++;
                if (stepIndex < referenceSteps.length) {
                    showNextStep();
                }
            }
        });
    }

    showNextStep();
});


// Créez des icônes personnalisées avec une taille définie
var startIcon = L.icon({
    iconUrl: 'https://raw.githubusercontent.com/salem139/VTT/main/jouer.png',
    iconSize: [20, 20],
    iconAnchor: [10, 20],
    popupAnchor: [0, -20]
});

var endIcon = L.icon({
    iconUrl: 'https://raw.githubusercontent.com/salem139/VTT/main/objectif.png',
    iconSize: [20, 20],
    iconAnchor: [10, 20],
    popupAnchor: [0, -20]
});
