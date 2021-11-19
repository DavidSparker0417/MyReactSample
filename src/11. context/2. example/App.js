import React from 'react';
import { ThemeContext, themes } from './theme-context';
import ThemedButton from './themed-button';
import ThemeTogglerButton from './thtme-toggler-button';

function ToolBar(props) {
    return(
        <ThemedButton onClick={props.changeTheme}>
            Change Theme
        </ThemedButton>
    );
}


function Content() {
    return(
        <div>
            <ThemeTogglerButton />
        </div>
    )
}

class App extends React.Component {
    constructor (props) {
        super(props);

        this.toggleTheme = () => {
            this.setState(state => ({
                theme: state.theme === themes.dark ?
                    themes.light : themes.dark,
            }));
        }

        this.state = {
            theme: themes.light,
            toggleTheme: this.toggleTheme,
        };
    }
    
    render () {
        return(
            <ThemeContext.Provider value={this.state}>
                <Content />
            </ThemeContext.Provider>
        )
    }
}

export default App;