import { gql } from 'apollo-boost';

const addUserMutation = gql`
    mutation ($email: String!, $password: String!, $gender: String!, $country: String!, $state: String!, $city: String!, $skills: String!, $contactNumber: String! ){
        addUser(email: $email, password: $password, gender: $gender, country: $country, state: $state, city: $city, skills: $skills, contactNumber: $contactNumber){
            email
        }
    }
`;

const getUserQuery = gql`
    query($email: String){
        book(email: $email){
            email
        }
    }
`;


export { addUserMutation, getUserQuery};