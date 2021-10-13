import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }
    :root {
        --white: #fff;
        --gray-50: #f7f8fa;
        --gray-100: #e6e8eb;
        --gray-200: #afb2b1;
        --gray-500: #808080;
        --gray-800: #494d4b;
        --primary: #4299e1;
        --primary-500: #2b6cb0;
        --danger: #D9534F;
        --danger-500: #be4844;
    }

    body {
        background: var(--gray-50);
        min-height: 100vh;
        max-width: 100vw;
        margin: 1.5rem 2rem;
    }

    body,
    input,
    textarea,
    button {
    font: 500 1rem Inter, sans-serif;
    color: var(--gray-800);
    }

    input, textarea {
        padding: 0.25rem 0.5rem;
        line-height: 1rem;
    }

    textarea {
        padding: 0.75rem;
        min-height: 100px;
        width: max(300px, 90%);
    }

    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
    font-weight: 600;
    font-family: Lexend, sans-serif;
    color: var(--gray-800);
    }

    h1 {
    font-size: 2rem;
    }

    h2 {
    font-size: 1.5rem;
    }

    select {
        border: 1px solid var(--gray-200);
        background: var(--gray-50);
        width: max(50%, 150px);
        padding: .75rem;
    }


    button {
        padding: 0.5rem 1rem;
        border-radius:0.25rem;
        margin: 0.25rem;
        border: 1px solid var(--gray-100);
        background-color: var(--white);
        &:hover {
            background: var(--gray-50);
        }
        cursor: pointer;

        &.primary {
            background: var(--primary);
            color: var(--white);
            border: none;
            &:hover {
                background: var(--primary-500);
            }
        }

        &.danger {
            background: var(--danger);
            color: var(--white);
            border: none;
            &:hover {
                background: var(--danger-500);
            }
        }
    }

`;

export default GlobalStyle;
