import React from 'react';

const Modal = ({closeModal, deleteModal}) => {
  return (
    <div className='modalBackground'>
        <div className='modalContainer'>
            <div className='modalTitle'><h5>Are You Sure You want to delete contact?</h5></div>
            <div className='modalFooter'>
                <button onClick={() => closeModal(false)} id='cancelBtn'>Cancel</button>
                <button onClick={() => {
                    deleteModal(true)
                }}>Yes, Delete</button>
            </div>
        </div>
    </div>
  )
}

export default Modal