import React from "react";
import { Form, Button } from "semantic-ui-react";
import PropTypes from "prop-types";

import { ErrorInline, HintInline } from "@/components/common";

const EditAboutForm = ({
  formFields,
  fieldErrors,
  currentAbout,

  handleChange,
  toggleModal,
  handleSave
}) => (
  <Form>
    <Form.Field>
      {currentAbout ? (
        <Form.TextArea
          value={formFields.about}
          onChange={handleChange}
          name="about"
          fluid
          placeholder={`${currentAbout}`}
        />
      ) : (
        <Form.TextArea
          value={formFields.about}
          onChange={handleChange}
          name="about"
          fluid
          placeholder="about team"
        />
      )}
      {fieldErrors.text ? (
        <ErrorInline text={fieldErrors.text} />
      ) : (
        <HintInline text={"max characters: 128"} />
      )}
    </Form.Field>
    <Form.Group widths="equal">
      <Button type="button" primary onClick={handleSave} fluid>
        Save
      </Button>
      <Button type="button" fluid onClick={toggleModal}>
        Cancel
      </Button>
    </Form.Group>
  </Form>
);

EditAboutForm.propTypes = {
  formFields: PropTypes.object.isRequired,
  fieldErrors: PropTypes.object.isRequired,

  handleChange: PropTypes.func.isRequired,
  handleSave: PropTypes.func.isRequired
};

export default EditAboutForm;
