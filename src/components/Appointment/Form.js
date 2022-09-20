import React, { useState } from "react";
import Button from "components/Button";
import InterviewerList from "components/InterviewerList";

export default function Form(props) {
  const [student, setStudent] = useState(props.student || "");
  const [interviewer, setInterviewer] = useState(props.interviewer || null);

  return (
    <main className="appointment__card appointment__card--create">
  <section className="appointment__card-left">
    <form autoComplete="off">
      <input
        value={student}
        onChange={(event) => setStudent(event.target.value)}
        className="appointment__create-input text--semi-bold"
        name="name"
        type="text"
        placeholder="Enter Student Name"
       
      />
    </form>
    <InterviewerList
      value={interviewer}
      onChange={setInterviewer}
      interviewers={props.interviewers}
    />
  </section>
  <section className="appointment__card-right">
    <section className="appointment__actions">
      <Button onClick={props.onCancel} danger>Cancel</Button>
      <Button onClick={props.onSave} confirm>Save</Button>
    </section>
  </section>
</main>

  );

}