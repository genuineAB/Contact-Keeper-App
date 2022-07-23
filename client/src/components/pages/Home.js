import React from 'react';
import Contacts from '../contact/Contacts';
import { ContactForm } from '../contact/ContactForm';
import { ContactsFilter } from '../contact/ContactsFilter';

export const Home = () => {
  return (
    <div className='grid-2' >
        
        <div>
          <ContactForm />
        </div>
        <div>
          <ContactsFilter />
          <Contacts />
        </div>

    </div>
  )
}
