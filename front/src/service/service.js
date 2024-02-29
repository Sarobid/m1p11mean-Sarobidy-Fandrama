var serv = {
    getMois : ()=>{
        return ['janvier', 'février', 'mars', 'avril', 'mai', 'juin', 'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre'];
    },
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
        let rep = "";
        if(heuresFormat !== "00"){
            rep = rep + heuresFormat +" h "
        }
        if(minutesFormat !== "00"){
            rep = rep + minutesFormat +" min"
        }
        return rep;
    },
    heureInMillisecconde : (heure)=>{
        let h = heure.split(":");
        return (+h[0]) * 60 * 60 * 1000 + (+h[1]) * 60 * 1000;
    },
    formatPrice : (price)=> {
        return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    },
    showModal : (name)=>{
        $(name).modal('show');
    },
    hideModal : (name)=>{
        $(name).modal('hide');
    },
    reloadePage : ()=>{
        window.location.reload();
    },
    getAllService : (response,afficheError)=>{
        fetch(url() + "/service/getAll", {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        }).then(res => {
            if(res.ok){
                res.json().then(data => {
                    response(data);
                })
            }else{
                res.json().then(data => {
                    afficheError(data);
                })
            }
        })
    }
}