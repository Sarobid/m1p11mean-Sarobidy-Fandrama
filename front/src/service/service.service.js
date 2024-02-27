var serviceService = {
    getAll : (setData)=>{
        fetch(url() + "/service/getAll", {
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
    nouveauService : (data,response,afficheError)=>{
        fetch(url() + "/service/insert", {
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
    update : (data,response,afficheError)=>{
        fetch(url() + "/service/update", {
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
    delete : (data,response,afficheError)=>{
        fetch(url() + "/service/delete", {
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
    active : (data,response,afficheError)=>{
        fetch(url() + "/service/active", {
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
}
