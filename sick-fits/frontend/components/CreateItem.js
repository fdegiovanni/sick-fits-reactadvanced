import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import Form from './styles/Form';
import gql from 'graphql-tag';
import formatMoney from '../lib/formatMoney';
import Error from './ErrorMessage';
import Router from 'next/router';

const CREATE_ITEM_MUTATION = gql`
    mutation ALL_ITEMS_QUERY(
        $title: String!
        $description: String!
        $price: Int!
        $image: String
        $largeImage: String
    ){
        createItem(
            title: $title
            description: $description
            price: $price
            image: $image
            largeImage: $largeImage
        ){
            id
        }
    }
`;

class CreateItem extends Component {
    state = {
        title: 'Cool shoes',
        description: 'I love those context',
        image: 'dog.jpg',
        largeImage: 'large-dog.jpg',
        price: 1000
    };

    handleChange = e => {
        //console.log(e.target.value);
        const { name, type, value } = e.target;
        console.log({ name, type, value });
        const val = type === 'number' ? parseFloat(value) : value;
        this.setState({[name]: val});
    }

     uploadFile = async (e) => {
        console.log(e);
        const files = e.target.files;

        const data = new FormData();
        data.append('file', files[0]);
        data.append('upload_preset', 'sickfits');

        const res = await fetch(
            'https://api.cloudinary.com/v1_1/fdegiovanni/image/upload',
            {
                method: 'POST',
                body: data
            }
        );

        const file = await res.json();
        console.log(file);
        this.setState({
            image: file.secure_url,
            largeImage: file.eager[0].secure_url
        });
    }
 
    render() {
        return (
            <Mutation mutation={CREATE_ITEM_MUTATION} variables={this.state} >
                {(createItem, { loading, error }  ) => (
                    
                    <Form onSubmit={async (e) => {
                        //stop the form from submitting
                        e.preventDefault();
                        console.log(this.state);
                        //call the mutation
                        const res = await createItem();
                        //change them to the single item page
                        console.log(res);
                        Router.push({
                            pathname: '/items',
                            query: { id: res.data.createItem.id }
                        });
                    }}>

                    <Error error={error} />

                        <fieldset disabled={loading} aria-busy={loading}>
                            <label htmlFor="file">
                                Image
                                <input type="file" id="file" name="file" placeholder="Upload an Image" required onChange={this.uploadFile}/>
                                {this.state.image && <img src={this.state.image} width="200" alt="Upload image"/>}
                            </label>

                            <label htmlFor="title">
                                Title
                                <input type="text" id="title" name="title" placeholder="Title" required value={this.state.title} onChange={this.handleChange}/>
                            </label>
        
                            <label htmlFor="price">
                                Price
                                <input type="text" id="price" name="price" placeholder="Price" required value={this.state.price} onChange={this.handleChange}/>
                            </label>
                            <label htmlFor="description">
                                Description
                                <textarea type="text" id="description" name="description" placeholder="Enter a Description" required value={this.state.description} onChange={this.handleChange}/>
                            </label>
                            <button type="submit" >Submit</button>
                        </fieldset>
                    </Form>
                )}
            </Mutation>

        );
    }
}

export default CreateItem; 
export { CREATE_ITEM_MUTATION };