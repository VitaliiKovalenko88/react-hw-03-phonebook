import PropTypes from 'prop-types';
import { Component } from 'react';
import { FormAddContact } from './Form.styled';

const INITIAL_STATE = { name: '', number: '' };

export class Form extends Component {
  state = {
    ...INITIAL_STATE,
  };

  handleChange = e => {
    const { name, value } = e.currentTarget;
    this.setState({ [name]: value });
  };

  handleSubmite = e => {
    e.preventDefault();
    const { value } = e.target.elements.name;
    const { name, number } = this.state;
    this.props.onSubmit(name, number, value);

    this.reset();
    e.currentTarget.reset();
  };

  reset = () => {
    this.setState({ name: '', number: '' });
  };

  render() {
    return (
      <FormAddContact onSubmit={this.handleSubmite}>
        <label>Name</label>
        <input
          type="text"
          name="name"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
          onChange={this.handleChange}
        />
        <label>Number</label>
        <input
          type="tel"
          name="number"
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
          onChange={this.handleChange}
        />

        <button type="submit">Add contact</button>
      </FormAddContact>
    );
  }
}

Form.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
