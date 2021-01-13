import Link from 'next/link';
import styled from 'styled-components';
import Nav from './Nav';
import Router from 'next/router';
import NProgress from 'nprogress';

Router.onRouteChangeStart = () => {
    NProgress.start();
}
Router.onRouteChangeComplete = () => {
    NProgress.done();
}
Router.onRouteChangeError = () => {
    NProgress.done();
}

const Logo = styled.h1`
    font-size: 4rem;
    margin-left: 2rem;
    position: relative;
    z-index: 2;
    transform: skew(-7deg);
    a {
        padding: 0.5rem 1rem;
        background: ${props => props.theme.red};
        color: white;
        text-transform: uppercase;
        text-decoration: none;
    }
    @media (max-width: ${props => props.theme.mediaWidth}){
        margin: 0;
        text-align: center;
    }
`;

const StyleHeader = styled.header`
    .bar {
        border-bottom: 10px solid ${props => props.theme.black};
        display: grid;
        grid-template-columns: auto 1fr;
        justify-content: space-between;
        align-items: stretch;
        @media (max-width: ${props => props.theme.mediaWidth}){
            grid-template-columns: 1fr;
            justify-content: center;
        }
    }

    .sub-bar {
        border-bottom: 1px solid ${props => props.theme.lightgrey};
        display: grid;
        grid-template-columns: 1fr;
        
    }
`;

const Header = () => (
    <StyleHeader>
        <div className="bar">
            <Logo>
                <Link href="/">
                    <a href="">Sick Fits</a>
                </Link>
            </Logo>
            <Nav />
        </div>
        <div className="sub-bar">
            <p>Search</p>
        </div>
        <div>Cart</div>
    </StyleHeader>
)

export default Header;