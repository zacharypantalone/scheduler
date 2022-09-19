import React from "react";
import InterviewerListItem from "components/InterviewerListItem";
import "components/InterviewerList.scss";




export default function interviewerList(props) {
  const { value, onChange, interviewers } = props

  const interviewerList = interviewers.map(interviewer => {
    return (
      <InterviewerListItem 
        key={interviewer.id}
        id={interviewer.id}
        name={interviewer.name}
        avatar={interviewer.avatar}
        selected = {interviewer.id === value}
        setInterviewer ={onChange}
        
      />
      )
    })

    return (
     <ul className="interviewers__list">
      {interviewerList}
     </ul>
  
  
    );
  }
    

    
    
    

        
  