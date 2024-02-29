var chiffServ = {
    getChiffreParJour : (data,response,afficheError)=>{
        fetch(url() + "/chiffre-affaire/jour", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'authorization': `Bearer ${authServ.getToken()}`
            },
            body:JSON.stringify(data)
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
    },
    getChiffreParMois : (data,response,afficheError)=>{
        fetch(url() + "/chiffre-affaire/mois", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'authorization': `Bearer ${authServ.getToken()}`
            },
            body:JSON.stringify(data)
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