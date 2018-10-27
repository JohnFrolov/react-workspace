export class FakeServer {
    constructor (data = {}) {
        // user data.
        this.data = data;
    }


    /**
        isOnLine - internet on if true, internet off otherwise
        timeout - latency to get data 
    */
    fetch (isOnLine = true, timeout = 5000) {
        const {data} = this;

        const successfulRequest = {
            statusCode: 200,
            data,
            error: null 
        };

        const failureRequest = {
            statusCode: 408,
            data: null,
            error: new Error("Request Timeout")
        };

        return isOnLine ?
            new Promise(
                (resolve) => {
                    setTimeout(() => resolve(successfulRequest), timeout);
                }
            ) :
            new Promise(
                (_, reject) => {
                    setTimeout(() => reject(failureRequest), timeout);
                }
            );
    }
}