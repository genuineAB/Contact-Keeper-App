import React from 'react';
import PropTypes from 'prop-types'

export const ContactsItem = ({contact}) => {
    const {id, name, email, phone, type} = contact;
  return (
    <div className='card bg-light'> 
        <h3 className='text-primary text-left'>
            {name}{' '} <span style={{float: 'right'}} className={'badge ' + (type === 'Professional' ? 'badge-success' : 'badge-primary')}>{type}</span>
        </h3>
        <ul className='list'>
            {email && (<li>
                <i className='fas fa-envelope-open'></i>{email}
            </li>

            )}
            {phone && (<li>
                <i className='fas fa-phone'></i>{phone}
            </li>

            )}
        </ul>
        <p>
            <button className='btn btn-success btn-sm'>Edit</button>
            <button className='btn btn-danger btn-sm'>Danger</button>
        </p>
    </div>
  )
}

ContactsItem.propTypes = {
    contact: PropTypes.object.isRequired
}
