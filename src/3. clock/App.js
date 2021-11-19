import { Component } from 'react';

class ComponentClock extends Component {
    constructor(props) {
        super(props);
        this.state = { date: new Date() };
    }
    render() {
        return <div 
            className="text-center font-weight-bold text-primary mt-2">
                {this.state.date.toLocaleTimeString()}
            </div>
    }

    setInterval(delay) {
        this.intervalID = setInterval(() => {
            this.setState({date : new Date()});
        }, delay);
    }

    componentDidMount() {
        this.setInterval(1000);
    }
    
    componentWillUnmount() {
        clearInterval(this.intervalID);
    }
}
export default function Clock() {
    return <ComponentClock />;
}