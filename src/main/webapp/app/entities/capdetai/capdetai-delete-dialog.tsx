import React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import { Translate, ICrudGetAction, ICrudDeleteAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { ICapdetai } from 'app/shared/model/capdetai.model';
import { IRootState } from 'app/shared/reducers';
import { getEntity, deleteEntity,updateEntity } from './capdetai.reducer';

export interface ICapdetaiDeleteDialogProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class CapdetaiDeleteDialog extends React.Component<ICapdetaiDeleteDialogProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  confirmDelete = event => {
    const entity={
      id:this.props.capdetaiEntity.id,
      tencapdetai:this.props.capdetaiEntity.tencapdetai,
      macapdetai:this.props.capdetaiEntity.macapdetai,
      sudung:0
    }
    this.props.updateEntity(entity);
    this.handleClose(event);
  };

  handleClose = event => {
    event.stopPropagation();
    this.props.history.goBack();
  };

  render() {
    const { capdetaiEntity } = this.props;
    return (
      <Modal isOpen toggle={this.handleClose}>
        <ModalHeader toggle={this.handleClose}>
          <Translate contentKey="entity.delete.title">Confirm delete operation</Translate>
        </ModalHeader>
        <ModalBody id="doAnApp.capdetai.delete.question">
          <Translate contentKey="doAnApp.capdetai.delete.question" interpolate={{ id: capdetaiEntity.id }}>
            Are you sure you want to delete this Capdetai?
          </Translate>
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={this.handleClose}>
            <FontAwesomeIcon icon="ban" />
            &nbsp;
            <Translate contentKey="entity.action.cancel">Cancel</Translate>
          </Button>
          <Button id="jhi-confirm-delete-capdetai" color="danger" onClick={this.confirmDelete}>
            <FontAwesomeIcon icon="trash" />
            &nbsp;
            <Translate contentKey="entity.action.delete">Delete</Translate>
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}

const mapStateToProps = ({ capdetai }: IRootState) => ({
  capdetaiEntity: capdetai.entity
});

const mapDispatchToProps = { getEntity, deleteEntity,updateEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CapdetaiDeleteDialog);
