import React, {useReducer} from "react";
import {v4 as uuidv4} from 'uuid';
import ContactReducer from './contactReducer';
import ContactContext from "./contactContext";
import {
    ADD_CONTACT,
    DELETE_CONTACT,
    CLEAR_CURRENT,
    SET_CURRENT,
    UPDATE_CONTACT,
    FILTER_CONTACTS,
    CLEAR_FILTER
} from '../types'

const ContactState = props => {
    const initialState = {
        contacts:[
            {
                id: 1,
                name: 'Bem Basil',
                email: 'b.Basil@gmail.com',
                phone: '22562346243',
                type: 'Personal'

            },
            {
                id: 2,
                name: 'Ezeobi Sochima',
                email: 'e.Sochima@gmail.com',
                phone: '2345365245',
                type: 'Professional'

            }
        ]
    };

    const [state, dispatch] = useReducer(ContactReducer, initialState);

    // Add Contact
    const addContact = contact => {
        contact.id = uuidv4();
        dispatch({type: ADD_CONTACT, payload: contact})
    }

    //Delete Contact

    //Set Current Contact

    //Clear Current Contact

    //Update Contact

    //Filter Contacts

    //Clear Filter

    return (
        <ContactContext.Provider
         value={{
            contacts:state.contacts,
            addContact
         }}>
            {props.children}
        </ContactContext.Provider>
    )
}

export default ContactState;