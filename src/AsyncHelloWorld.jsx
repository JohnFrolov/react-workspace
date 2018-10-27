import React from "react";
import {FakeServer} from './server';

const server = new FakeServer("Hello World");

export class AsyncHelloWorld extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            isLoading: false, 
            asyncData: {
                data: null,
                error: null,
                statusCode: null
            }
        };
    }

    componentDidMount () {
        this.setState({isLoading: true}, () => this.fetchData());
    }

    fetchData () {
        server.fetch()
            .then((response) => response && this.setState({
                isLoading: false,
                asyncData: {
                    data: response.data
                }
            })).catch((e) => this.setState({
                isLoading: false,
                asyncData: {
                    error: e.error.message,
                    statusCode: e.statusCode
                }
            }));
    }

    renderErrorState () {
        const {asyncData: {error, statusCode}} = this.state;

        return ( 
            <div className="error">
                <span>{statusCode}</span>
                <span>{error}</span>
            </div>
        );
    }

    renderInitialState () {
        return (
            <span className="initial">
                Preparing....
            </span>
        );
    }

    renderLoadingState () {
        return (
            <span className="downloading">
                Downloading.... 
            </span>
        );
    }

    renderSuccessfulState () {
        const {data} = this.state.asyncData;

        return (
             <span className="successful">
                {data}
            </span>
        );
    }

    render () {
        const {isLoading, asyncData:{data, error}} = this.state;
        const isInitialState = !data && !error;

        if (isLoading) {
            return this.renderLoadingState();
        }

        if (isInitialState) {
            return this.renderInitialState();
        }

        if (!!error) {
            return this.renderErrorState();
        }
        
        return (
            this.renderSuccessfulState()
        );
    }
}