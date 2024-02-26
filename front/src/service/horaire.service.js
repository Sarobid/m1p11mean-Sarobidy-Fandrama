var horServ = {
    statistique : (response,afficheError)=>{
        fetch(url() + "/horaire/duree", {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'authorization': `Bearer ${authServ.getToken()}`
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
    insertion : (data,response,afficheError)=>{
        fetch(url() + "/horaire", {
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
    update : (id,data,response,afficheError)=>{
        fetch(url() + "/horaire/update/"+id, {
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
    getAll : (response,afficheError)=>{
        fetch(url() + "/horaires", {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'authorization': `Bearer ${authServ.getToken()}`
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