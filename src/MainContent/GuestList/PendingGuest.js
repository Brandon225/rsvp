import React from "react";
import PropTypes from "prop-types";

const PendingGuest = props =>
{
    if (props.name) 
    {
        return (
            <li className="pending">
                <span
                    isEditing={props.isEditing}
                    handleNameEdits={e => props.setName(e.target.value)}>
                    {props.name}
                </span>
            </li>
        );
    
    }
    return null;
};

PendingGuest.propTypes = {
    name: PropTypes.string.isRequired
}

export default PendingGuest;