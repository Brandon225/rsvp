import React, { Component } from 'react';
import './App.css';
import GuestList from './GuestList';

class App extends Component {

    state = {
        // track guests
        isFiltered: false,
        pendingGuest: "",
        guests: [
            {
                name: 'Treasure',
                isConfirmed: false,
                isEditing: false
            },
            {
                name: 'Nick',
                isConfirmed: true,
                isEditing: false                
            },
            {
                name: 'Brandon',
                isConfirmed: false,
                isEditing: false                
            }
        ]
    }

    toggleGuestPropertyAt = (property, indexToChange) =>
        this.setState({
            guests: this.state.guests.map((guest, index) => 
            {
                // console.log(`propert ${property} curr value ${guest[property]} index ${index}`);
                if (index === indexToChange) {
                    return {
                        ...guest, // transfer all keys and values to the new guest
                        [property]: !guest[property] // update the value of confirmed
                    }
                }
                return guest;
            })
        });
    
    setGuestPropertyAt = (property, value, indexToChange) =>
        this.setState({
            guests: this.state.guests.map((guest, index) => {
                // console.log(`propert ${property} new value ${value} index ${index}`);
                if (index === indexToChange) {
                    return {
                        ...guest, // transfer all keys and values to the new guest
                        [property]: value // update the value of confirmed
                    }
                }
                return guest;
            })
        });

    toggleConfirmationAt = index =>
        this.toggleGuestPropertyAt('isConfirmed', index);
    
    removeGuestAt = index =>
       { 
           console.log(`removeGuestAt ${index}`);
           this.setState({
                guests: [
                    ...this.state.guests.slice(0, index),
                    ...this.state.guests.slice(index + 1)
                ]
            });
        }
    
    toggleEditingAt = index =>
        this.toggleGuestPropertyAt('isEditing', index);
    
    setNameAt = (text, index) => 
        this.setGuestPropertyAt('name', text, index);

    handleNameInput = e => 
        this.setState({pendingGuest: e.target.value});

    newGuestSubmitHandler = e => {
        e.preventDefault();
        this.setState({
            guests: [
                {
                    name: this.state.pendingGuest,
                    isConfirmed: false,
                    isEditing: false
                },
                ...this.state.guests
            ],
            pendingGuest: ""
        });
    }
    
    
    toggleFiltered = () => 
        this.setState({isFiltered: !this.state.isFiltered});
    
    getTotalInvited = () => this.state.guests.length;
    
    // getAttendingGuests = () =>
    // getUnconfirmedGuests = () =>
    
    render() {
        return (
            <div className="App">
                <header>
                    <h1>RSVP</h1>
                    <p>A Treehouse App</p>
                    <form onSubmit={this.newGuestSubmitHandler}>
                        <input 
                            type="text" 
                            value={this.state.pendingGuest} 
                            placeholder="Invite Someone"
                            onChange={this.handleNameInput}/>
                        <button 
                            type="submit" 
                            name="submit" 
                            value="submit">Submit</button>
                    </form>
                </header>
                <div className="main">
                    <div>
                        <h2>Invitees</h2>
                        <label>
                            <input 
                                type="checkbox" 
                                onChange={this.toggleFiltered} 
                                checked={this.state.isFiltered} /> Hide those who haven't responded
                        </label>
                    </div>
                    <table className="counter">
                        <tbody>
                            <tr>
                                <td>Attending:</td>
                                <td>2</td>
                            </tr>
                            <tr>
                                <td>Unconfirmed:</td>
                                <td>1</td>
                            </tr>
                            <tr>
                                <td>Total:</td>
                                <td>3</td>
                            </tr>
                        </tbody>
                    </table>
                    
                    <GuestList 
                        guests={this.state.guests}
                        toggleConfirmationAt={this.toggleConfirmationAt}
                        toggleEditingAt={this.toggleEditingAt} 
                        setNameAt={this.setNameAt}
                        isFiltered={this.state.isFiltered}
                        removeGuestAt={this.removeGuestAt}/>

                </div>
            </div>
        );
    }
}

export default App;
