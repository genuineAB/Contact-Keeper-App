import React, {useState, useContext, useEffect} from 'react';
import ContactContext from '../../context/contact/contactContext';

export const ContactForm = () => {
    const contactContext = useContext(ContactContext);


    const {addContact, current, clearCurrent, updateContact} = contactContext;

    useEffect( () => {
        if(current !== null){
            setContact(current);
        }else{
            setContact({
                name: '',
                email: '',
                phone: '',
                type: 'Personal'
            })
        }
    }, [contactContext, current])

    const [contact, setContact] = useState({
        name: '',
        email: '',
        phone: '',
        type: 'Personal'
    });
 
    const {name, email, phone, type} = contact;

    const onChange = e => setContact({...contact, [e.target.name]:e.target.value});
    // const clearAll = e => clearCurrent();

    const onSubmit = e => {
        e.preventDefault();
        if(current === null){
            addContact(contact);
        }
        else{
            updateContact(contact);
            console.log(contact);
        }
        
        setContact({
            name: '',
            email: '',
            phone: '',
            type: 'Personal'
        });
        clearCurrent();
    }

  return (
    <form onSubmit={onSubmit}>
        <h2 className='text-primary'>{(current !== null) ? 'Edit Contact' : 'Add Contact'}</h2>
        <input type='text' placeholder='Name' name='name' value={name} onChange={onChange} required/>
        <input type='text' placeholder='Phone' name='phone' value={phone} onChange={onChange} required/>
        <input type='text' placeholder='Email' name='email' value={email} onChange={onChange} required/>
        <h5>Contact Type</h5>
        <input type='radio' name='type' value='Personal' checked={type === 'Personal'} onChange={onChange}/> {' '} Personal{' '} 
        <input type='radio' name='type' value='Professional' checked={type === 'Professional'} onChange={onChange}/> {''} Professional 
        <div>
            <input type='submit' value={(current !== null) ? 'Update Contact' : 'Add Contact'} className='btn btn-primary btn-block' />
        </div>
        {/* {current && <div>
            <button className='btn btn-light btn-block' onClick={clearAll}>Clear Contact</button>
            </div>} */}
        

    </form>
  )
}
