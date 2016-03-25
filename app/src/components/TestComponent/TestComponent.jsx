import React from 'react';

export default class App extends React.Component {
    render() {
        return (
            <div className="test-component">
                {this.props.content}
            </div>
        );
    }
}
