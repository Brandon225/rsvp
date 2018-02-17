import React from "react";
import PropTypes from "prop-types";

import GuestList from './GuestList';
import Counter from './Counter';
import ConfirmedFilter from './ConfirmedFilter';

const MainContent = props =>
    <div className="main">
        <div>
            <h2>Invitees</h2>
            <ConfirmedFilter
                toggleFiltered={props.toggleFiltered}
                isFiltered={props.isFiltered} />
        </div>
        <Counter
            totalInvited={props.totalInvited}
            numberAttending={props.numberAttending}
            numberUnconfirmed={props.numberUnconfirmed}
        />

        <GuestList
            guests={props.guests}
            toggleConfirmationAt={props.toggleConfirmationAt}
            toggleEditingAt={props.toggleEditingAt}
            setNameAt={props.setNameAt}
            isFiltered={props.isFiltered}
            removeGuestAt={props.removeGuestAt}
            pendingGuest={props.pendingGuest} />

    </div>;

MainContent.propTypes = {
    toggleFiltered: PropTypes.func.isRequired,
    isFiltered: PropTypes.bool.isRequired,
    totalInvited: PropTypes.number.isRequired,
    numberAttending: PropTypes.number.isRequired,
    numberUnconfirmed: PropTypes.number.isRequired,
    guests: PropTypes.array.isRequired,
    toggleConfirmationAt: PropTypes.func.isRequired,
    toggleEditingAt: PropTypes.func.isRequired,
    setNameAt: PropTypes.func.isRequired,
    removeGuestAt: PropTypes.func.isRequired,
    pendingGuest: PropTypes.string.isRequired
}

export default MainContent;