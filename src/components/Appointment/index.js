import React from "react";
import "components/Appointment/styles.scss";
import Header from "components/Appointment/Header.js";
import Show from "components/Appointment/Show.js";
import Empty from "components/Appointment/Empty.js";
import useVisualMode from "hooks/useVisualMode";
import Form from "components/Appointment/Form";
import Status from "./Status";



  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const EDIT = "EDIT";
  const SAVING = "SAVING";

export default function Appointment(props) {
  

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };

    transition(SAVING);

    props.bookInterview(props.id, interview)
    .then(() => transition(SHOW));
    
  }

  return (
    <article className="appointment">
      <Header time={props.time}  />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onEdit={() => transition(EDIT)}
          
        />
      )}
      {mode === CREATE && (
        <Form
        onCancel={back}
        interviewers={props.interviewers}
        onSave={save}
        />
      )}

      {mode === EDIT && (
        <Form
        onCancel={back}
        interviewers={props.interviewers}
        onSave={save}
        student={props.interview.student}
        interviewer={props.interview.interviewer}
        />
      )}

      {mode === SAVING && (
        <Status
        message="Saving..."
        
        />

      )}


        

    </article>
  );
}
