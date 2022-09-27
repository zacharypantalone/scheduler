import React, { useState } from "react";
import Button from "components/Button";
import InterviewerList from "components/InterviewerList";
import { action } from "@storybook/addon-actions";

export default function Form(props) {
  const [student, setStudent] = useState(props.student || "");
  const [interviewer, setInterviewer] = useState(props.interviewer || null);

  function save() {
    props.onSave(student, interviewer)
  }

  function reset() {
    setStudent("");
    setInterviewer(null);
  }

  function cancel() {
    reset();
    props.onCancel();
  }
  console.log(props.interviewers)
  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off" onSubmit={(event) => event.preventDefault()}>
          <input
            value={student}
            onChange={(event) => setStudent(event.target.value)}
            className="appointment__create-input text--semi-bold"
            name="name"
            type="text"
            placeholder="Enter Student Name"
          />
        </form>
        <h4>interviewer</h4>
        <InterviewerList
          value={interviewer}
          onChange={setInterviewer}
          interviewers={props.interviewers}
        />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button onClick={cancel} danger>
            Cancel
          </Button>
          <Button onClick={save} confirm>
            Save
          </Button>
        </section>
      </section>
    </main>
  );
}
