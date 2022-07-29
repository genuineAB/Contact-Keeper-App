import React, {useReducer} from "react";
import {v4 as uuid} from 'uuid';
import axios from 'axios';
import ContactReducer from './contactReducer';
import ContactContext from "./contactContext";
import {
    ADD_CONTACT,
    GET_CONTACTS,
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
        contacts: null,
        current: null,
        filter: null,
        loading: false
    };

    const [state, dispatch] = useReducer(ContactReducer, initialState);
    // console.log(state);

    // Add Contact
    const addContact = async contact => {
        // contact.id = uuid();

        // dispatch({type: ADD_CONTACT, payload: contact});
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
 
        try {
            const res = await axios.post('api/contacts', contact, config);
            dispatch({
                type: ADD_CONTACT,
                payload: res.data
            });
            // console.log(res.data);
        } catch (error) {
            dispatch({
                type: CONTACT_ERROR,
                payload: error.response.msg
            })
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

    //Get Contacts
    const getContact = async () => {
        try {
            const res = await axios.get('api/contacts');
            dispatch({
                type: GET_CONTACTS,
                payload: res.data
            });
        } catch (error) {
            dispatch({
                type: CONTACT_ERROR,
                payload: error.response.msg
            })
        }
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
            clearFilter,
            getContact

         }}>
            {props.children}
        </ContactContext.Provider>
    )
}

export default ContactState;