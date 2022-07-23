import React, {useReducer} from "react";
import {v4 as uuid} from 'uuid';
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
        ],
        current: null,
        filter: null
    };

    const [state, dispatch] = useReducer(ContactReducer, initialState);
    // console.log(state);

    // Add Contact
    const addContact = contact => {
        contact.id = uuid();
        dispatch({type: ADD_CONTACT, payload: contact});
    }

    //Delete Contact
    const deleteContact = id => {
        dispatch({type: DELETE_CONTACT, payload: id});
    }
    //Set Current Contact
    const setCurrent = contact => {
        dispatch({type: SET_CURRENT, payload: contact});
    }

    //Clear Current Contact
    const clearCurrent = () => {
        dispatch({type: CLEAR_CURRENT});
    }

    //Update Contact
    const updateContact = contact => {
        dispatch({type: UPDATE_CONTACT, payload: contact});
    }

    //Filter Contacts
    const filterContacts = text => {
        dispatch({type: FILTER_CONTACTS, payload: text})
    }
    //Clear Filter
    const clearFilter = () => {
        dispatch({type: CLEAR_FILTER})
    }

    return (
        <ContactContext.Provider
         value={{
            contacts:state.contacts,
            current: state.current,
            filtered: state.filtered,
            addContact,
            deleteContact,
            setCurrent,
            clearCurrent,
            updateContact,
            filterContacts,
            clearFilter

         }}>
            {props.children}
        </ContactContext.Provider>
    )
}

export default ContactState;