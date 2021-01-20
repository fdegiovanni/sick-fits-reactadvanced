import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Title from './styles/Title';
import ItemStyles from './styles/ItemStyles';
import PriceTag from './styles/PriceTag';
import Link from 'next/link';
import formatMoney from '../lib/formatMoney';
import DeleteItem from './DeleteItem';

export default class Item extends Component {
    static propTypes = {
        item: PropTypes.shape({
            title: PropTypes.string.isRequired
        }),

    }

    //like ternary if but in jsx
    //{item.image && <img src={item.image} alt={item.title}/>}

    render(){
        const{ item } = this.props;
        return <ItemStyles>
            
            {item.image && <img src={item.image} alt={item.title}/>}

            <Title>
                <Link href={{
                    pathname: '/item',
                    query: { id: item.id }
                }}>
                    <a>{item.title}</a>
                </Link>
            </Title>
            <PriceTag>{formatMoney(item.price)}</PriceTag>
            <p>{item.description}</p>

            <div className="buttonList">
                <Link href={{
                    pathname: "update",
                    query: {id: item.id}
                }}>
                    <a>Edit ✏ </a>
                </Link>
                <button>Add To Cart</button>
                <DeleteItem id={item.id} >Delete this item</DeleteItem>
            </div>
        </ItemStyles>
    }
}