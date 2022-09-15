import React from "react";
import DayListItem from "components/DayListItem";

export default function DayList(props) {
   const days = props.days.map(day => {
    return (
      <DayListItem
        key={day.id}
        name={day.name}
        spots={day.spots}

      />
    )
   });
  return (
    <ul>
      {days}
    </ul>
      
  );
}