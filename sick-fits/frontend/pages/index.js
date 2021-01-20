// import React from 'react';

// class Home extends React.Component {

//     render(){
//         return <p>Hey!</p>
//     }
// }
import Items from '../components/Items';

const Home = props => (
    <div>
        <Items page={parseFloat(props.query.page)}/>
    </div>
);

export default Home;