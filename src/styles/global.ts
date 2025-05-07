import { createGlobalStyle } from 'styled-components'
import { mixins } from './mixins'

export const GlobalStyle = createGlobalStyle`
* {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    :focus-visible {
        outline: 0;
        box-shadow: 0 0 0 2px ${({ theme }) => theme.colors['yellow-dark']};
    }

    body {
        background-color: ${(props) => props.theme.colors.background};
        color: ${(props) => props.theme.colors['base-text']};
        -webkit-font-smoothing:antialiased;
        overflow-x: hidden;

    }

    body, input, textarea, button {
        ${mixins.fonts.textM}
    }

    button {
        border: none;
        cursor: pointer;
    }
`
