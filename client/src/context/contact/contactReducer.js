import {
    ADD_CONTACT,
    CONTACT_ERROR,
    DELETE_CONTACT,
    CLEAR_CURRENT,
    SET_CURRENT,
    UPDATE_CONTACT,
    FILTER_CONTACTS,
    CLEAR_FILTER,
    GET_CONTACTS
} from '../types'

const contactReducer = (state, action) => {
    switch(action.type) {
        case GET_CONTACTS:
            return {
                ...state,
                contacts: action.payload,
                loading: false
            }
        case ADD_CONTACT:
            console.log(state.contacts);
            return {
                ...state,
                contacts: [...state.contacts, action.payload],
                loading: false
            };
        
        case DELETE_CONTACT:
            return {
                ...state,
                contacts: state.contacts.filter(contact => contact.id !== action.payload),
                loading: false
            };
        
        case SET_CURRENT:
            return {
                ...state,
                current: action.payload,
                loading: false
            };  

        case CLEAR_CURRENT:
            return {
                ...state,
                current: null
            }; 

        case UPDATE_CONTACT:
            console.log(action.payload);
            return {
                ...state,
                contacts: state.contacts.filter(contact => (contact.id === action.payload.id) ? action.payload : contact)
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

