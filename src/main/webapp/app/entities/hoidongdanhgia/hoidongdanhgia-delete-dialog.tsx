import React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import { Translate, ICrudGetAction, ICrudDeleteAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IHoidongdanhgia } from 'app/shared/model/hoidongdanhgia.model';
import { IRootState } from 'app/shared/reducers';
import { getEntity, deleteEntity,updateEntity } from './hoidongdanhgia.reducer';

export interface IHoidongdanhgiaDeleteDialogProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class HoidongdanhgiaDeleteDialog extends React.Component<IHoidongdanhgiaDeleteDialogProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  confirmDelete = event => {
    const entity={
      id:this.props.hoidongdanhgiaEntity.id,
      tenlv:this.props.hoidongdanhgiaEntity.tenhoidong,
      malv:this.props.hoidongdanhgiaEntity.mahoidong,
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
    const { hoidongdanhgiaEntity } = this.props;
    return (
      <Modal isOpen toggle={this.handleClose}>
        <ModalHeader toggle={this.handleClose}>
          <Translate contentKey="entity.delete.title">Confirm delete operation</Translate>
        </ModalHeader>
        <ModalBody id="doAnTotNghiepApp.hoidongdanhgia.delete.question">
          <Translate contentKey="doAnTotNghiepApp.hoidongdanhgia.delete.question" interpolate={{ id: hoidongdanhgiaEntity.id }}>
            Are you sure you want to delete this Hoidongdanhgia?
          </Translate>
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={this.handleClose}>
            <FontAwesomeIcon icon="ban" />
            &nbsp;
            <Translate contentKey="entity.action.cancel">Cancel</Translate>
          </Button>
          <Button id="jhi-confirm-delete-hoidongdanhgia" color="danger" onClick={this.confirmDelete}>
            <FontAwesomeIcon icon="trash" />
            &nbsp;
            <Translate contentKey="entity.action.delete">Delete</Translate>
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}

const mapStateToProps = ({ hoidongdanhgia }: IRootState) => ({
  hoidongdanhgiaEntity: hoidongdanhgia.entity
});

const mapDispatchToProps = { getEntity, deleteEntity,updateEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HoidongdanhgiaDeleteDialog);
