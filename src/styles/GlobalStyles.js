import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

const GlobalStyles = createGlobalStyle`
  ${reset}
  * {
    box-sizing: border-box;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  li {
    list-style: none;
  }
  
  button{
    padding: 0;
    background: none;
    border: none;
    outline: inherit;
    font: inherit;
    cursor: pointer;
  }
`;

export default GlobalStyles;
