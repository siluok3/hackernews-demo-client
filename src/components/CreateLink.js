import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import gqlTag from 'graphql-tag';

class CreateLink extends Component {
    //The component's state will be stored here so it can be used in the _createLink for the mutation
    state = {
        description: '',
        url: '',
    };

    render() {
        return(
            <div>
                <div className = "flex flex-column mt3">
                    <input
                        className = "mb2"
                        value = {this.state.description}
                        onChange = {e => this.setState({ description: e.target.value })}
                        type = "text"
                        placeholder = "A description for the link"
                    />
                    <input
                        className = "mb2"
                        value = {this.state.url}
                        onChange = {e => this.setState({ url: e.target.value })}
                        type = "text"
                        placeholder = "The URL for the link"
                    />
                </div>
                <button onClick={() => this._createLink()}>Submit</button>
            </div>
        )
    }

    _createLink = async () => {
        const { description, url } = this.state;
        await this.props.postMutation({
            variables: {
                description,
                url
            }
        })
    }
}

const POST_MUTATION = gqlTag`
    mutation PostMutation($description: String!, $url: String!) {
        post(description: $description, url: $url) {
            url
            description
        }    
    }
`;

export default graphql(POST_MUTATION, {name: 'postMutation'})(CreateLink)