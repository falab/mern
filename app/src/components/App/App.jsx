import React from 'react';

// COMPONENTS
import TestComponent from '../TestComponent/TestComponent';

export default class App extends React.Component {
    render() {
        return (
            <div>
                <TestComponent content="This is a test" />
                <TestComponent content="Of the emergency" />
                <TestComponent content="broadcast system." />
                <TestComponent content="If this had been" />
                <TestComponent content="An actual emergency" />
                <TestComponent content="you would have been instructed" />
            </div>
        );
    }
}
