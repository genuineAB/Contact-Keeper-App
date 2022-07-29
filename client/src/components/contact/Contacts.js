import React, {Fragment, useContext, useEffect} from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import ContactsItem  from './ContactsItem';
import ContactContext from '../../context/contact/contactContext';
import Spinner from '../layout/Spinner';

const Contacts = () => {
    const contactContext = useContext(ContactContext);

    const {contacts, filtered, getContact, loading} = contactContext;

    useEffect(() => {
        getContact();
        //eslint-disable-next-line
    },[]);

    if(contacts !== null){
        return <h4>Please add a contact</h4>
    }
    return (
    <Fragment>
        {(contacts !== null && !loading) ? (
            <TransitionGroup>
             {filtered != null ? filtered.map(contact => (
                 <CSSTransition key={contact._id} timeout={1000} classNames='item'>
                     <ContactsItem  contact={contact} />
                 </CSSTransition>   
             )) : contacts.map(contact => (
                 <CSSTransition  timeout={1000} classNames='item' key={contact._id}>
                     <ContactsItem contact={contact} />
                 </CSSTransition>
                 
             ))}
             {/* {contacts.map(contact => (
                 <ContactsItem key={contact.id} contact={contact} />
             ))} */}
            </TransitionGroup>
        ) : <Spinner />}
       
        
    </Fragment>
)
}

export default Contacts;