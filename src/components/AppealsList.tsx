import React from 'react';
import AppealsItem from "./AppealsItem";

interface AppealsListProps {
    appeals: {id: number, name: string, text: string, date_of_create: string}[];
}

const AppealsList = ({appeals}: AppealsListProps) => {


    return (
        <div className="appeals__list">
            {appeals.map((appeal) => (
                <AppealsItem
                    key={appeal.id}
                    id={appeal.id}
                    name={appeal.name}
                    text={appeal.text}
                    date_of_create={appeal.date_of_create}
                />
            ))}
        </div>
    );
};

export default AppealsList;