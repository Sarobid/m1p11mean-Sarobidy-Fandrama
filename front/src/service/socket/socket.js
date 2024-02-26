var socketService = {
    delai : 20000,
    fonction:(path)=>{
        let socket = null;
        return{
            connect: (setData) => {
                if(socket == null){
                    socket = new WebSocket(socketUrl() + path);
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
                    socket = new WebSocket(socketUrl() + path);
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