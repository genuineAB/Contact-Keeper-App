import {
    ADD_CONTACT,
    CONTACT_ERROR,
    DELETE_CONTACT,
    CLEAR_CURRENT,
    SET_CURRENT,
    UPDATE_CONTACT,
    FILTER_CONTACTS,
    CLEAR_FILTER,
    GET_CONTACTS,
    CLEAR_CONTACT
} from '../types'

const contactReducer = (state, action) => {
    switch(action.type) {
        case GET_CONTACTS:

            return {
                ...state,
                contacts: action.payload.contacts,
                loading: false
            }
        case ADD_CONTACT:

            return {
                ...state,
                contacts: [ action.payload.contact, ...state.contacts],
                loading: false
            };
        
        case DELETE_CONTACT:
            return {
                ...state,
                contacts: state.contacts.filter(contact => contact._id !== action.payload),
                loading: false
            };
        
        case SET_CURRENT:
            return {
                ...state,
                current: action.payload
            };  

        case CLEAR_CURRENT:
            return {
                ...state,
                current: null
            }; 
        case CLEAR_CONTACT:
            return {
                ...state,
                contacts: null,
                current: null,
                filtered: null,
                error: null
            }

        case UPDATE_CONTACT:
            
            return {
                ...state,
                contacts: state.contacts.filter(contact => (contact._id === action.payload._id) ? action.payload : contact),
                loading: false
            }
        
        case FILTER_CONTACTS:
            return {
                ...state,
                filtered: state.contacts.filter(contact => {
                    const regex = new RegExp(`${action.payload}`, 'gi');
                    return contact.name.match(regex) || contact.email.match(regex) || contact.phone.match(regex);
                })
            }
            
        case CLEAR_FILTER:
            return {
                ...state,
                filtered: null
            }
        
        case CONTACT_ERROR:
            return {
                ...state,
                error: action.payload
            }
        default:
            return state;
        }
}

export default contactReducer;

