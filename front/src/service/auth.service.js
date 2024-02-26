var authServ = {
    enregistrementToken : (token)=>{
        localStorage.setItem("token",token);
    },
    getToken : ()=>{
        return localStorage.getItem("token");
    },
    isAuthorize : (roles,response,afficheError)=>{
        let data = {role:roles};
        fetch(url() + "/authorize", {
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