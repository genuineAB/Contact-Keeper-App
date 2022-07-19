import React, {Fragment, useContext} from 'react';
import { ContactsItem } from './ContactsItem';
import ContactContext from '../../context/contact/contactContext'

const Contacts = () => {
    const contactContext = useContext(ContactContext);

    const {contacts} = contactContext;
    return (
    <Fragment>
        {contacts.map(contact => (
            <ContactsItem key={contact.id} contact={contact} />
        ))}
    </Fragment>
)
}

export default Contacts;