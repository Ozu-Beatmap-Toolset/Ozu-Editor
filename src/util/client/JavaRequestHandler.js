export default class JavaRequestHandler {
    userFunction = () => {};

    send(path, dataToSend) {
        fetch(path, {
            method: 'POST',
            headers: {
                'Accept': '*/*',
                'Content-Type': 'application/json',
                'Connection': 'keep-alive',
                'Accept-Encoding': 'gzip, deflate, br'
            },
            body: dataToSend,
        }).then(data => data.text()).then(data => {
            this.userFunction(data);
        });
    }

    onReceive(someFunction) {
        this.userFunction = someFunction
    }
}