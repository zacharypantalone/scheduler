import React from "react";
import InterviewerListItem from "components/InterviewerListItem";
import "components/InterviewerList.scss";




export default function interviewerList(props) {
    

  const interviewers = props.interviewers.map(interviewer => {
    return (
      <InterviewerListItem 
        key={interviewer.id}
        avatar={interviewer.avatar}
        name={interviewer.name}
        selected = {interviewer.id === props.interviewer}
        setInterviewer = {() => props.setInterviewer(interviewer.id)}
        
      />
      )
    })

    return (
     <ul className="interviewers__list">
      {interviewers}
     </ul>
  
  
    );
  }
    

    
    
    

        
  