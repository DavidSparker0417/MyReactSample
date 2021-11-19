import React from 'react';
import styled from 'styled-components';
import Instructions from './Instructions';

const EmojiDiv = styled.div`
    .container {
        display : flex;
        flex-direction: column;
        align-items: center;
    }

    button {
        font-size: 2em;
        border : 0;
        padding: 0;
        background: none;
        cursor: pointer;
    }

    ul {
        display : flex;
        padding : 0;
    }

    li {
        margin : 0 20px;
        list-style: none;
        padding: 0;
    }
    .instructions {
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    .instructions img {
        width: 100px;
        height: 100px;
    }
`
const displayEmojiName = event => alert(event.target.id);

const emojis = [
    {
        emoji: '😀',
        name: "test grinning face"
    },
    {
        emoji: '🎉',
        name: "party propper"
    },
    {
        emoji: '💃',
        name: "woman dancing"
    }
];

function EmojiApp() {
    return (
        <EmojiDiv> <div className="container">
            <h1>Hello, World</h1>
            <Instructions />
            <ul>
            {
                emojis.map(emoji => (
                    <li key={emoji.name}>
                        <button onClick={displayEmojiName}>
                            <span role="img" aria-label={emoji.name} id={emoji.name}>{emoji.emoji}</span>
                        </button>
                    </li>
                ))
            }
            </ul>
        </div></EmojiDiv>
    );
}

export default EmojiApp;