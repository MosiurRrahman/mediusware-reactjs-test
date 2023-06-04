import React, { useEffect, useReducer, useRef } from 'react';
import axios from 'axios';

const initialState = {
  allContacts: [],
  usContacts: [],
  modalAOpen: false,
  modalBOpen: false,
  modalCOpen: false,
  selectedContact: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_ALL_CONTACTS':
      return { ...state, allContacts: action.payload };
    case 'SET_US_CONTACTS':
      return { ...state, usContacts: action.payload };
    case 'OPEN_MODAL_A':
      return { ...state, modalAOpen: true, modalBOpen: false };
    case 'CLOSE_MODAL_A':
      return { ...state, modalAOpen: false };
    case 'OPEN_MODAL_B':
      return { ...state, modalAOpen: false, modalBOpen: true };
    case 'CLOSE_MODAL_B':
      return { ...state, modalBOpen: false };
    case 'OPEN_MODAL_C':
      return { ...state, modalCOpen: true };
    case 'CLOSE_MODAL_C':
      return { ...state, modalCOpen: false };
    case 'SET_SELECTED_CONTACT':
      return { ...state, selectedContact: action.payload };
    default:
      return state;
  }
};

const Problem2 = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const modalARef = useRef(null);
  const modalBRef = useRef(null);

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const response = await axios.get('https://contact.mediusware.com/api/contacts/?page_size=100');
        const contacts = response.data.results;
        const allContacts = contacts.map((contact) => contact.phone);
        console.log(allContacts);
        const usContacts = contacts.filter((contact) => contact.country.name === 'United States').map((contact) => contact.phone);
        dispatch({ type: 'SET_ALL_CONTACTS', payload: allContacts });
        dispatch({ type: 'SET_US_CONTACTS', payload: usContacts });
      } catch (error) {
        console.log('Error fetching contacts:', error);
      }
    };

    fetchContacts();
  }, []);

  const openModalA = () => {
    dispatch({ type: 'OPEN_MODAL_A' });
  };

  const closeModalA = () => {
    dispatch({ type: 'CLOSE_MODAL_A' });
  };

  const openModalB = () => {
    dispatch({ type: 'OPEN_MODAL_B' });
  };

  const closeModalB = () => {
    dispatch({ type: 'CLOSE_MODAL_B' });
  };

  const openModalC = (contact) => {
    dispatch({ type: 'SET_SELECTED_CONTACT', payload: contact });
    dispatch({ type: 'OPEN_MODAL_C' });
  };

  const closeModalC = () => {
    dispatch({ type: 'CLOSE_MODAL_C' });
  };

  return (
    <div className="container">
      <div className="row justify-content-center mt-5">
        <h4 className="text-center text-uppercase mb-5">Problem-2</h4>

        <div className="d-flex justify-content-center gap-3">
          <button className="btn btn-lg btn-outline-primary" type="button" onClick={openModalA}>
            All Contacts
          </button>
          <button className="btn btn-lg btn-outline-warning" type="button" onClick={openModalB}>
            US Contacts
          </button>
        </div>

{/* Modal A */}
{state.modalAOpen && (
  <div className="modal" ref={modalARef} onClick={closeModalA}>
    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
      <h4>Modal A</h4>
      <ul>
        {state.allContacts.map((contact) => (
          
          <li key={contact.id}>{contact}</li>
        ))}
      </ul>
      <div className="footer">
        <button className="btn btn-lg btn-outline-primary" type="button" onClick={closeModalA}>
          Close
        </button>
      </div>
    </div>
  </div>
)}

{/* Modal B */}
{state.modalBOpen && (
  <div className="modal" ref={modalBRef} onClick={closeModalB}>
    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
      <h4>Modal B</h4>
      <ul>
        {state.usContacts.map((contact) => (
          <li key={contact.id}>{contact}</li>
        ))}
      </ul>
      <div className="footer">
        <button className="btn btn-lg btn-outline-primary" type="button" onClick={closeModalB}>
          Close
        </button>
      </div>
    </div>
  </div>
)}



        {/* Modal C */}
        {state.modalCOpen && (
          <div className="modal" onClick={closeModalC}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <h4>Modal C</h4>
              {/* Contact details for Modal C */}
              <p>Name: {state.selectedContact.name}</p>
              <p>Email: {state.selectedContact.email}</p>
              <div className="footer">
                <button className="btn btn-lg btn-outline-primary" type="button" onClick={closeModalC}>
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Problem2;
