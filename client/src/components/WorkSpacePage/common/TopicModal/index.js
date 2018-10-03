import React from "react";
import { connect } from "react-redux";
import { Form, Input, Button, Modal } from "semantic-ui-react";
import PropTypes from "prop-types";

import "./index.scss";
import { globalStateAction } from "@/actions";
import { globalStateSelector } from "@/reducers/selectors";

class TopicModal extends React.Component {
  state = {
    text: ""
  };

  toggleEdit = () => {
    const { toggleEditModal } = this.props;
    toggleEditModal();
  };

  handleClose = e => {
    e.preventDefault();
    this.setState({
      text: ""
    });
    this.toggleEdit();
  };

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  };

  handleEdit = () => {
    const { text } = this.state;
    console.log(`edit success: ${text}`);
    this.setState({
      text: ""
    });
  };

  render() {
    const { text } = this.state;
    const { topic, isEditModalOpen } = this.props;
    return (
      <React.Fragment>
        {isEditModalOpen && (
          <Modal size="small" open={isEditModalOpen} onClose={this.toggleEdit}>
            <Modal.Content>
              <Form>
                <Form.Field>
                  {topic ? (
                    <Form.TextArea
                      value={text}
                      onChange={this.handleChange}
                      name="text"
                      placeholder={`${topic}`}
                    />
                  ) : (
                    <Form.TextArea
                      value={text}
                      onChange={this.handleChange}
                      name="text"
                      placeholder="Add a topic"
                    />
                  )}
                </Form.Field>
                <Form.Group widths="equal">
                  <Button type="button" primary onClick={this.handleEdit} fluid>
                    Set Topic
                  </Button>
                  <Button type="button" fluid onClick={this.handleClose}>
                    Cancel
                  </Button>
                </Form.Group>
              </Form>
            </Modal.Content>
          </Modal>
        )}
        {!isEditModalOpen &&
          topic && (
            <React.Fragment>
              <span className="">
                {topic}{" "}
                <span onClick={this.toggleEdit} className="topic-edit-button">
                  <i className="fas fa-pencil-alt" />
                  edit
                </span>
              </span>
            </React.Fragment>
          )}
        {!isEditModalOpen &&
          !topic && (
            <span className="topic-edit-button" onClick={this.toggleEdit}>
              <i className="fas fa-pencil-alt" />
              add a topic
            </span>
          )}
      </React.Fragment>
    );
  }
}

TopicModal.propTypes = {
  topic: PropTypes.string,

  isEditModalOpen: PropTypes.bool.isRequired,

  toggleEditModal: PropTypes.func.isRequired
};

const stateToProps = state => ({
  isEditModalOpen: globalStateSelector.getIsEditModalOpen(state)
});

const dispatchToProps = dispatch => ({
  toggleEditModal: () => {
    dispatch(globalStateAction.toggleEditModal());
  }
});

export default connect(
  stateToProps,
  dispatchToProps
)(TopicModal);