import { from } from "apollo-boost";
import React, { Component } from 'react';
import Header from './Header';
import Meta from './Meta';
import styled, { ThemeProvider, injectGlobal} from 'styled-components';

/* const MyButton = styled.button`
    background: red;
    font-size: ${props => (props.huge ? '100px' : '50px')};
    .poop {
        font: 100px;
    }
`;

<MyButton huge>
                    Click me
                    <span className="poop"> 💩  </span>
                </MyButton>
                <MyButton >
                    Click me
                    <span className="poop"> 💩  </span>
                </MyButton>
 */

 const theme = {
    red: '#FF0000',
    black: '#393939',
    grey: '#3A3A3A',
    lightgrey: '#E1E1E1',
    offWhite: '#EDEDED',
    maxWidth: '1000px',
    bs: '0 12px 24px 0 rgba(0, 0, 0, 0.09)',
    mediaWidth: '1300px'
 };

const StyledPage = styled.div`
    background: white;
    color: ${props => props.theme.black};
`;

const Inner = styled.div`
    max-width: ${props => props.theme.maxWidth};
    margin: 0 auto;
    padding: 2rem;
`;

injectGlobal`
    @font-face {
        font-family: 'radnika_next';
        src: url('/static/radnikanext-medium-webfont.woff2')
        format('woff2');
        font-weight: normal;
        font-style: normal;
    }
    html {
        box-sizing: border-box;
        font-size: 10px;
    }

    *, *:before, *:after {
        box-sizing: inherit;
    }

    body{
        padding: 0;
        margin: 0;
        font-size: 1.5rem;
        line-height: 2;
        font-family: 'radnika_next';
    }

    a {
        text-decoration: none;
        color: ${theme.black};
    }

`;

export default class Page extends Component {
    render(){
        return(
            <ThemeProvider theme={theme}>
                <StyledPage>
                    <Meta />
                    <Header />
                    
                    <Inner>
                        {this.props.children}
                    </Inner>
                    
                </StyledPage>
            </ThemeProvider>
        )
    }
}