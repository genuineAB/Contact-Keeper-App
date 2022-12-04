import React, {useReducer} from "react";
import axios from 'axios';
import ContactReducer from './contactReducer';
import ContactContext from "./contactContext";
import { baseURL } from "../../utils/constant";

import {
    ADD_CONTACT,
    GET_CONTACTS,
    CONTACT_ERROR,
    CLEAR_CONTACT,
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
        filtered: null,
        error: null
    };

    const [state, dispatch] = useReducer(ContactReducer, initialState);
    // console.log(state);

    // Add Contact
    const addContact = async contact => {

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
 
        try {
            const res = await axios.post(baseURL+'api/contacts', contact, config);
            dispatch({
                type: ADD_CONTACT,
                payload: res.data
            });

        } catch (error) {
            dispatch({
                type: CONTACT_ERROR,
                payload: error.response.msg
            })
        }
    }

    //Get Contacts
    const getContact = async () => {
        try {
            const res = await axios.get(baseURL+'api/contacts');
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


    //Delete Contact
    const deleteContact = async _id => {
        try {
            await axios.delete(baseURL+`api/contacts/${_id}`);
            dispatch({type: DELETE_CONTACT, payload: _id});
            
        } catch (error) {
            dispatch({
                type: CONTACT_ERROR,
                payload: error.response.msg
            })
        }
        
    }

    
    

    //Update Contact
    const updateContact = async contact => {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
 
        try {
            const res = await axios.patch(baseURL+`api/contacts/${contact._id}`, contact, config);
            dispatch({type: UPDATE_CONTACT, payload: res.data});
            // console.log(res.data);
            
        } catch (error) {
            dispatch({
                type: CONTACT_ERROR,
                payload: error.response.msg
            })
        }
        
    }

    //Set Current Contact
    const setCurrent = contact => {
        dispatch({type: SET_CURRENT, payload: contact});
    }

    //Clear Current Contact
    const clearCurrent = () => {
        dispatch({type: CLEAR_CURRENT});
    }
    //Filter Contacts
    const filterContacts = text => {
        dispatch({type: FILTER_CONTACTS, payload: text})
    }

    //Clear Filter
    const clearFilter = () => {
        dispatch({type: CLEAR_FILTER})
    }

    //Clear Contacts
    const clearContacts = () =>{
        dispatch({type: CLEAR_CONTACT})
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
            clearFilter,
            getContact,
            clearContacts

         }}>
            {props.children}
        </ContactContext.Provider>
    )
}

export default ContactState;