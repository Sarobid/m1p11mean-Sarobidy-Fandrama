var utilSocket = {
    listeEmploye: () => {
        return socketService.fonction("/liste-employe");
    },
    horaire : ()=>{
        return socketService.fonction("/horaire");
    }
}