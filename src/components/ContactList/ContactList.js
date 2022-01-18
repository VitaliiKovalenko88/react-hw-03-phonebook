import PropTypes from 'prop-types';
import { ContactsList } from './ContactLit.styled';
import { ContactItem } from './ContactItem/ContactItem';
export const ContactList = ({ contacts, onDeleteContact }) => {
  return (
    <ContactsList>
      {contacts.map(({ name, id, number }) => {
        return (
          <li key={id}>
            <ContactItem
              name={name}
              number={number}
              id={id}
              onDeleteContact={onDeleteContact}
            />
          </li>
        );
      })}
    </ContactsList>
  );
};

ContactList.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    }),
  ),
  onDeleteContact: PropTypes.func.isRequired,
};
