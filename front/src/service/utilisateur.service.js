var utilisateurService = {
    nouveauPersonnel : (data,response,afficheError)=>{
        data.url = baseUrl();
        fetch(url() + "/utilisateur/employe", {
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
    login : (data,response,afficheError)=>{
        fetch(url() + "/auth", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
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
    validationMotDePasse : (id,data,response,afficheError)=>{
        fetch(url() + "/utilisateur/update-mdp/"+id, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
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
    getvalidationEnterMdp : (id,response,afficheError)=>{
        fetch(url() + "/utilisateur/valid-mdp/"+id, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
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
    },
    getListeSexes : (setData)=>{
        fetch(url() + "/sexes", {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => res.json()) 
        .then(data => {
            setData(data);
        })
        .catch(error => {
            alert(error); 
        });
    },
    nouveauClient : (data,response,afficheError)=>{
        data.url = baseUrl();
        fetch(url() + "/utilisateur/client", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
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