import React from 'react';
import Contacts from '../contact/Contacts';
import { ContactForm } from '../contact/ContactForm';

export const Home = () => {
  return (
    <div className='grid-2' >
        
        <div>
          {/* ContactForm */}
          <ContactForm />
        </div>
        <div>
          <Contacts />
        </div>

    </div>
  )
}