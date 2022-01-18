import React, { Component } from 'react';
import styled from 'styled-components';
import { nanoid } from 'nanoid';
import { Form } from '../Form/Form';
import { Filter } from '../Filter/Filter';
import { ContactList } from '../ContactList/ContactList';

const Container = styled.div`
  text-align: center;
`;

export class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  componentDidMount() {
    const contacts = localStorage.getItem('contacts');
    const parseContacts = JSON.parse(contacts);

    if (parseContacts) {
      this.setState({ contacts: parseContacts });
    }
  }

  componentDidUpdate(prevState) {
    const nextContacts = this.state.contacts;
    const prevContacts = prevState.contacts;
    if (nextContacts !== prevContacts) {
      localStorage.setItem('contacts', JSON.stringify(nextContacts));
    }
  }

  generateId = () => nanoid();

  changeFilter = e => {
    this.setState({ filter: e.currentTarget.value });
  };

  getVisibleContacts = () => {
    const { filter, contacts } = this.state;
    const normalizedFilter = filter.toLowerCase();

    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter),
    );
  };

  addContact = (name, number, value) => {
    const dataContact = {
      id: this.generateId(),
      name,
      number,
    };

    const searchSameContact = this.state.contacts.find(
      contact => contact.name.toLowerCase() === value.toLowerCase(),
    );

    if (searchSameContact) {
      alert(`Ну шо не видно, что ${name} таки есть уже?????!!!`);
      console.log(searchSameContact);
      return;
    }

    this.setState(({ contacts }) => ({ contacts: [dataContact, ...contacts] }));
    console.log(this.state.contacts);
  };

  deleteContact = contactId => {
    this.setState(({ contacts }) => ({
      contacts: contacts.filter(({ id }) => id !== contactId),
    }));
  };

  render() {
    const { filter } = this.state;
    const visibleContacts = this.getVisibleContacts();
    return (
      <Container>
        <h1>Phonebook</h1>
        <Form onSubmit={this.addContact} />
        <h2>Contacts</h2>
        <Filter value={filter} onChange={this.changeFilter} />
        <ContactList
          contacts={visibleContacts}
          onDeleteContact={this.deleteContact}
        />
      </Container>
    );
  }
}
