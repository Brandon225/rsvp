import React, { Component } from 'react';
import './App.css';
import Header from './Header';
import MainContent from './MainContent';

class App extends Component {

    state = {
        // track guests
        isFiltered: false,
        pendingGuest: "",
        guests: []
    }

    lastGuestId = 0;
    newGuestId = () => {
        const id = this.lastGuestId;
        this.lastGuestId += 1;
        return id;
    };

    toggleGuestProperty = (property, id) =>
        this.setState({
            guests: this.state.guests.map((guest) => 
            {
                console.log(`propert ${property} curr value ${guest[property]} id ${id}`);
                if (id === guest.id) {
                    return {
                        ...guest, // transfer all keys and values to the new guest
                        [property]: !guest[property] // update the value of confirmed
                    }
                }
                return guest;
            })
        });
    
    setGuestProperty = (property, value, id) =>
        this.setState({
            guests: this.state.guests.map((guest) => {
                console.log(`propert ${property} new value ${value} id ${id}`);
                if (guest.id === id) {
                    return {
                        ...guest, // transfer all keys and values to the new guest
                        [property]: value // update the value of confirmed
                    }
                }
                return guest;
            })
        });

    toggleConfirmation = id =>
        this.toggleGuestProperty('isConfirmed', id);
    
    removeGuest = id =>
       { 
           console.log(`removeGuest ${id}`);
           this.setState({
                guests: this.state.guests.filter(guest => id !== guest.id) // only add guests without the remove id
            });
        }
    
    toggleEditing = id =>
        this.toggleGuestProperty('isEditing', id);
    
    setName = (text, id) => 
        this.setGuestProperty('name', text, id);

    handleNameInput = e => 
        this.setState({pendingGuest: e.target.value});


    newGuestSubmitHandler = e => {
        e.preventDefault();
        const id = this.newGuestId();
        this.setState({
            guests: [
                {
                    name: this.state.pendingGuest,
                    isConfirmed: false,
                    isEditing: false,
                    id
                },
                ...this.state.guests
            ],
            pendingGuest: ""
        });
    }
    
    
    toggleFiltered = () => 
        this.setState({isFiltered: !this.state.isFiltered});
    
    getTotalInvited = () => this.state.guests.length;
    
    getAttendingGuests = () => 
        this.state.guests.reduce(
            (total, guest) => guest.isConfirmed ? total + 1 : total, 
            0
    );
    
    render() {

        const totalInvited = this.getTotalInvited();
        const numberAttending = this.getAttendingGuests();
        const numberUnconfirmed = totalInvited - numberAttending;

        return (
            <div className="App">
                <Header 
                    newGuestSubmitHandler={this.newGuestSubmitHandler}
                    pendingGuest={this.state.pendingGuest}
                    handleNameInput={this.handleNameInput} />
               <MainContent 
                    toggleFiltered={this.toggleFiltered}
                    isFiltered={this.state.isFiltered}
                    totalInvited={totalInvited}
                    numberAttending={numberAttending}
                    numberUnconfirmed={numberUnconfirmed}
                    guests={this.state.guests}
                    toggleConfirmation={this.toggleConfirmation}
                    toggleEditing={this.toggleEditing}
                    setName={this.setName}
                    removeGuest={this.removeGuest}
                    pendingGuest={this.state.pendingGuest} />
            </div>
        );
    }
}

export default App;
