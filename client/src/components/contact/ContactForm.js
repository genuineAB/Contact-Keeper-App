import React, {useState, useContext, useEffect} from 'react';
import ContactContext from '../../context/contact/contactContext';
import AlertContext from '../../context/alert/alertContext';


export const ContactForm = () => {
    const contactContext = useContext(ContactContext);
    const alertContext = useContext(AlertContext);


    const {addContact, current, clearCurrent, updateContact} = contactContext;
    const {setAlert} = alertContext;

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
    

    const onSubmit = e => {
        e.preventDefault();
        function validatePhoneNumber(input_str) {
            var re = /^\+?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
          
            return re.test(input_str);
          }

        function validateEmail(email) {
        const res = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return res.test(String(email).toLowerCase());
        }
        if((name.trim().length === 0)){
            setAlert("Please Enter Contact's Name", "danger");
        }
        else if((phone.trim().length===0)){
            setAlert("Please Enter Contact's Phone Number", "danger");
        }
        else if(isNaN(Number(phone)) && !validatePhoneNumber(Number(phone))){
            setAlert("Please Enter Valid Phone Number Format", "danger");
        }
        else if(!validateEmail(email)){
            setAlert("Please Enter a Valid Email Format", "danger");
        }

        else{
            if(!current){
                addContact(contact);
            }
            else{
                updateContact(contact);
                window.location.reload();
    
            }
        }
        
        
        setContact({
            name: '',
            phone: '',
            email: '',
            type: 'Personal'
        });
        clearCurrent();
    }

  return (
    <form onSubmit={onSubmit}>
        <h2 className='text-primary'>{(current !== null) ? 'Edit Contact' : 'Add Contact'}</h2>
        <input type='text' placeholder='Name' name='name' value={name} onChange={onChange} />
        <input type='text' placeholder='Phone' name='phone' value={phone} onChange={onChange} />
        <input type='text' placeholder='Email' name='email' value={email} onChange={onChange} />
        <h5>Contact Type</h5>
        <input type='radio' name='type' value='Personal' checked={type === 'Personal'} onChange={onChange}/> {' '} Personal{' '} 
        <input type='radio' name='type' value='Professional' checked={type === 'Professional'} onChange={onChange}/> {''} Professional 
        <div>
            <input type='submit' value={(current !== null) ? 'Update Contact' : 'Add Contact'} className='btn btn-primary btn-block' />
        </div>
        

    </form>
  )
}
