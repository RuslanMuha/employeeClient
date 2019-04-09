(
function () {
    let App = window.App || {};
    
    function Webclient(url,addEmployee,removeEmployee) {
        
        const socket = new WebSocket(url);
        socket.onmessage = function (message) {
            const incommingMessage = JSON.parse(message.data);
            const {companyName,id,emailAddress} = incommingMessage;
            console.log(incommingMessage);
            if(emailAddress){
                addEmployee(incommingMessage)
            }else {
                removeEmployee(id,companyName)
            }
        }
    }
    
    
    App.Webclient = Webclient;
    window.App = App;
}    
)();
