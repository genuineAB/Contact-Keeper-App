import React, {useReducer} from "react";
// import {v4 as uuid} from 'uuid';
import axios from "axios";
import ContactReducer from './contactReducer';
import ContactContext from "./contactContext";
import {
    ADD_CONTACT,
    CONTACT_ERROR,
    DELETE_CONTACT,
    CLEAR_CURRENT,
    SET_CURRENT,
    UPDATE_CONTACT,
    FILTER_CONTACTS,
    CLEAR_FILTER
} from '../types'

const ContactState = props => {
    const initialState = {
        contacts:[],
        current: null,
        filter: null,
        error: null
    };

    const [state, dispatch] = useReducer(ContactReducer, initialState);
    // console.log(state);

    // Add Contact
    const addContact = async contact => {
        // contact.id = uuid();
        const config = {
            headers:{
                'Content-Type': 'application/json'
            }
        }

        try {
            const res = await axios.post('/api/contacts', contact, config);
            dispatch({type: ADD_CONTACT, payload: res.data});
        } catch (error) {
            dispatch({type: CONTACT_ERROR, payload: error.response.msg})
        }
        
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
            error: state.error,
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