import React from "react";
import "components/Appointment/styles.scss";
import Header from "components/Appointment/Header.js";
import Show from "components/Appointment/Show.js";
import Empty from "components/Appointment/Empty.js";
import useVisualMode from "hooks/useVisualMode";
import Form from "components/Appointment/Form";
import Status from "./Status";
import Confirm from "./Confirm";
import Error from "./Error";



  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const EDIT = "EDIT";
  const SAVING = "SAVING";
  const CONFIRM = "CONFIRM";
  const DELETING = "DELETING";
  const ERROR_SAVE = "ERROR_SAVE"
  const ERROR_DELETE = "ERROR_DELETE"

export default function Appointment(props) {
  

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };

    transition(SAVING, true)

    props.bookInterview(props.id, interview)
    .then(() => transition(SHOW))
    .catch(() => transition(ERROR_SAVE, true))
  }

 

  function deleteInterview() {
    transition(DELETING, true)

    props.cancelInterview(props.id)
    .then(() => transition(EMPTY))
    .catch(() => transition(ERROR_DELETE, true))
  }

  return (
    <article className="appointment" data-testid="appointment">
      <Header time={props.time}  />

      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onEdit={() => transition(EDIT)}
          onDelete={() => transition(CONFIRM)}
          
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
        interviewer={props.interview.interviewer && props.interview.interviewer.id}
        
        />
      )}

      {mode === SAVING && (
        <Status
        message="Saving..."
        
        />

      )}
      
      {mode === DELETING && (
        <Status
        message="Deleting..."
        
        />

      )}

      {mode === CONFIRM && (
        <Confirm
        onCancel={back}
        onConfirm={deleteInterview}
        message="Are you sure you would like to delete?"
        
        />
      )}

      {mode === ERROR_SAVE && (
        <Error
        message="There was an error saving your appointment"
        onClose={back}
        />
      )}

      {mode === ERROR_DELETE && (
        <Error
        message="There was an error deleting your appointment"
        onClose={back}
        
        />
      )}

      


        

    </article>
  );
}
