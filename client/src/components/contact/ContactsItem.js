import React, {useContext, useState} from 'react';
import PropTypes from 'prop-types';
import ContactContext from '../../context/contact/contactContext';
import Modal from '../modal/Modal';


const ContactsItem = ({contact}) => {
    const contactContext = useContext(ContactContext);
    const {deleteContact, setCurrent, clearCurrent} = contactContext;


    const [openModal, setOpenModal] = useState(false);

    const { _id, name, email, phone, type} = contact;
    
    const onDelete = () => {
        deleteContact(_id);
        clearCurrent();
    }

    //To set the current contact for updating
    const onSetCurrent = () => {
        setCurrent(contact);

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
            <button className='btn btn-danger btn-sm' onClick={() => {
                setOpenModal(true);
            }}>Delete</button>
        </p>
        {openModal && <Modal closeModal={setOpenModal} deleteModal={onDelete}/>}
    </div>
  )
}

ContactsItem.propTypes = {
    contact: PropTypes.object.isRequired
}

export default ContactsItem