var serv = {
    afficheDate: (date) => {
        let joursSemaine = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];
        let mois = ['janvier', 'février', 'mars', 'avril', 'mai', 'juin', 'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre'];
        let jourSemaine = joursSemaine[date.getDay()];
        let jour = date.getDate();
        let moisActuel = mois[date.getMonth()];
        let annee = date.getFullYear();
        let dateFormatee = jourSemaine + " " + (jour < 10 ? '0' : '') + jour + " " + moisActuel + " " + annee;
        return dateFormatee;
    },
    afficheDureMilliseconde: (dureeEnMs) => {
        let heures = Math.floor(dureeEnMs / (1000 * 60 * 60));
        let minutes = Math.floor((dureeEnMs % (1000 * 60 * 60)) / (1000 * 60));
        let heuresFormat = heures < 10 ? '0' + heures : heures;
        let minutesFormat = minutes < 10 ? '0' + minutes : minutes;
        return heuresFormat + ':' + minutesFormat;
    },
    heureInMillisecconde : (heure)=>{
        let h = heure.split(":");
        return (+h[0]) * 60 * 60 * 1000 + (+h[1]) * 60 * 1000;
    },
    formatPrice : (price)=> {
        return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    }
}