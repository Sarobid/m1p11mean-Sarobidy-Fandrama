var utilSocket = {
    listeEmploye: () => {
        let socket = null;
        return {
            connect: (setData) => {
                if(socket == null){
                    socket = new WebSocket(socketUrl() + "/liste-employe");
                }
                socket.onmessage = function (event) {
                    setData();
                };
                socket.onclose = (event) =>{
                    socket = null;
                };
            },
            signale: (message)=>{
                if(socket === null){
                    socket = new WebSocket(socketUrl() + "/liste-employe");
                    socket.onmessage = function (event) {
                        setData();
                    };
                    socket.onclose = (event) =>{
                        socket = null;
                    };
                    
                }
                socket.send(message);
            }
        }

    }
}