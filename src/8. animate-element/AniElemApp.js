import React from 'react';
import styled from 'styled-components'
var ReactCSSTransitionGroup = require('react-addons-css-transition-group');

const TitleStyle = styled.div `
h1 {
    text-align: center;
}
.title-appear {
    opacity: 0.04;
  }
  .title-appear.title-appear-active {
    opacity: 2;
    transition: opacity 10s ease-in;
  }
`
const ItemStyle = styled.div`
    .items-enter {
        opacity: 0.01;
    }
    
    .items-enter.items-enter-active {
        opacity: 1;
        transition: opacity 500ms ease-in;
    }
    
    .items-leave {
        opacity: 1;
    }
    
    .items-leave.items-leave-active {
        opacity: 0.01;
        transition: opacity 300ms ease-in;
    }

    .items-appear {
        margin-left: 100%;
    }

    .items-appear.items-appear-active {
        margin-left: 0%;
        transition: margin-left 5s ease-in;
    }
`
class AniElemApp extends React.Component {
    constructor (props) {
        super(props);
        this.state = {items: ['eponymous', 'endeavor', 'perplexing', 'depict', 'emphatically']};
        this.handleAdd = this.handleAdd.bind(this);
    }

    handleAdd() {
        const newItems = this.state.items.concat([
            prompt('Enter some text')
        ]);
        this.setState({items: newItems});
    }
    hadleRemove(i) {
        let newItems = this.state.items.slice();
        newItems.splice(i, 1);
        this.setState({items: newItems});
    }

    hadleRemoveByFilter(i) {
        let newItems = this.state.items.slice();
        this.setState({items: newItems.filter((v, idx) => idx !== i)})
    }

    render() {
        const items = this.state.items.map((name, i) => (
            <div key={i} onClick={() => this.hadleRemove(i)}>
                {name}
            </div>));
        return(
            <div>
            <TitleStyle>
                <ReactCSSTransitionGroup transitionName="title"
                    transitionAppear = {true}
                    transitionEnter = {false}
                    transitionLeave = {false}>
                    <h1>Animation Element</h1>
                </ReactCSSTransitionGroup>
            </TitleStyle>
            <button className = "btn btn-primary" onClick={this.handleAdd}>Add Item</button>
            <ItemStyle>
                <ReactCSSTransitionGroup 
                    transitionName="items"
                    transitionEnterTimeout = {500}
                    transitionLeaveTimeout = {300}
                    transitionAppear = {true}>
                    {items}
                </ReactCSSTransitionGroup>
            </ItemStyle>
            </div>
        )
    }
}

export default AniElemApp;