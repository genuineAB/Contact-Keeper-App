import React, {useContext} from 'react';
import PropTypes from 'prop-types';
import ContactContext from '../../context/contact/contactContext';


const ContactsItem = ({contact}) => {
    const contactContext = useContext(ContactContext);
    const {deleteContact, setCurrent, clearCurrent} = contactContext;

    const { id, name, email, phone, type} = contact;
    // console.log(contact.id);
    const onDelete = () => {
        deleteContact(id);
        clearCurrent();
    }

    //To set the current contact for updating
    const onSetCurrent = () => {
        setCurrent(contact)
    }
  return (
    <div className='card bg-light'> 
        <h3 className='text-primary text-left'>
            {name}{' '} <span style={{float: 'right'}} className={'badge ' + (type === 'Professional' ? 'badge-success' : 'badge-primary')}>{type}</span>
        </h3>
        <ul className='list'>
            {email && (<li>
                <i className='fas fa-envelope-open'></i> {email}
            </li>

            )}
            {phone && (<li>
                <i className='fas fa-phone'></i> {phone}
            </li>

            )}
        </ul>
        <p>
            <button className='btn btn-dark btn-sm' onClick={onSetCurrent}>Edit</button>
            <button className='btn btn-danger btn-sm' onClick={onDelete}>Delete</button>
        </p>
    </div>
  )
}

ContactsItem.propTypes = {
    contact: PropTypes.object.isRequired
}

export default ContactsItem