import React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import { Translate, ICrudGetAction, ICrudDeleteAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { ICoquanphoihop } from 'app/shared/model/coquanphoihop.model';
import { IRootState } from 'app/shared/reducers';
import { getEntity, deleteEntity,updateEntity } from './coquanphoihop.reducer';

export interface ICoquanphoihopDeleteDialogProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class CoquanphoihopDeleteDialog extends React.Component<ICoquanphoihopDeleteDialogProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  confirmDelete = event => {
    const entity={
      id:this.props.coquanphoihopEntity.id,
      tencoquan:this.props.coquanphoihopEntity.tencoquan,
      macoquan:this.props.coquanphoihopEntity.macoquan,
      noidung:this.props.coquanphoihopEntity.noidung,
      tendaidien:this.props.coquanphoihopEntity.tendaidien,
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
    const { coquanphoihopEntity } = this.props;
    return (
      <Modal isOpen toggle={this.handleClose}>
        <ModalHeader toggle={this.handleClose}>
          <Translate contentKey="entity.delete.title">Confirm delete operation</Translate>
        </ModalHeader>
        <ModalBody id="nghienCuuKhoaHocApp.coquanphoihop.delete.question">
          <Translate contentKey="nghienCuuKhoaHocApp.coquanphoihop.delete.question" interpolate={{ id: coquanphoihopEntity.id }}>
            Are you sure you want to delete this Coquanphoihop?
          </Translate>
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={this.handleClose}>
            <FontAwesomeIcon icon="ban" />
            &nbsp;
            <Translate contentKey="entity.action.cancel">Cancel</Translate>
          </Button>
          <Button id="jhi-confirm-delete-coquanphoihop" color="danger" onClick={this.confirmDelete}>
            <FontAwesomeIcon icon="trash" />
            &nbsp;
            <Translate contentKey="entity.action.delete">Delete</Translate>
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}

const mapStateToProps = ({ coquanphoihop }: IRootState) => ({
  coquanphoihopEntity: coquanphoihop.entity
});

const mapDispatchToProps = { getEntity, deleteEntity,updateEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CoquanphoihopDeleteDialog);
