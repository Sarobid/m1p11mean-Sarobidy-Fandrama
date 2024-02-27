function isValidTimeFormat(input) {
    let timeRegex = /^(?:[01]\d|2[0-3]):(?:[0-5]\d)$/;

    if (!timeRegex.test(input)) {
        return false; 
    }

    let [hours, minutes] = input.split(':').map(Number);
    if (hours < 0 || hours > 23 || minutes < 0 || minutes > 59) {
        return false; 
    }
    return true;
}
exports.isValidTimeFormat = isValidTimeFormat;
function isTimeBefore(time1, time2) {
    let date1 = new Date('2024-01-01T' + time1 + ':00');
    let date2 = new Date('2024-01-01T' + time2 + ':00');
    return date1 < date2;
}
exports.isTimeBefore = isTimeBefore;
function calculateDuration(heureDebut, heureFin){
    let debutEnMs = heureInMillisecconde(heureDebut);
    let finEnMs = heureInMillisecconde(heureFin);
    let dureeEnMs =0;
    if (finEnMs >= debutEnMs) {
        dureeEnMs = finEnMs - debutEnMs;
    } else {
        dureeEnMs = (24 * 60 * 60 * 1000) - debutEnMs + finEnMs;
    }
    return dureeEnMs;
}
exports.calculateDuration = calculateDuration;
function heureInMillisecconde(heure){
    let h = heure.split(":");
    return (+h[0]) * 60 * 60 * 1000 + (+h[1]) * 60 * 1000;
}
exports.heureInMillisecconde = heureInMillisecconde;
function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}
exports.numberWithCommas = numberWithCommas;