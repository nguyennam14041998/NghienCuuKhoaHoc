import React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import { Translate, ICrudGetAction, ICrudDeleteAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { INoidungdanhgia } from 'app/shared/model/noidungdanhgia.model';
import { IRootState } from 'app/shared/reducers';
import { getEntity, deleteEntity,updateEntity } from './noidungdanhgia.reducer';

export interface INoidungdanhgiaDeleteDialogProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class NoidungdanhgiaDeleteDialog extends React.Component<INoidungdanhgiaDeleteDialogProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  confirmDelete = event => {
    const entity={
      id:this.props.noidungdanhgiaEntity.id,
      noidung:this.props.noidungdanhgiaEntity.noidung,
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
    const { noidungdanhgiaEntity } = this.props;
    return (
      <Modal isOpen toggle={this.handleClose}>
        <ModalHeader toggle={this.handleClose}>
          <Translate contentKey="entity.delete.title">Confirm delete operation</Translate>
        </ModalHeader>
        <ModalBody id="nghienCuuKhoaHocApp.noidungdanhgia.delete.question">
          <Translate contentKey="nghienCuuKhoaHocApp.noidungdanhgia.delete.question" interpolate={{ id: noidungdanhgiaEntity.id }}>
            Are you sure you want to delete this Noidungdanhgia?
          </Translate>
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={this.handleClose}>
            <FontAwesomeIcon icon="ban" />
            &nbsp;
            <Translate contentKey="entity.action.cancel">Cancel</Translate>
          </Button>
          <Button id="jhi-confirm-delete-noidungdanhgia" color="danger" onClick={this.confirmDelete}>
            <FontAwesomeIcon icon="trash" />
            &nbsp;
            <Translate contentKey="entity.action.delete">Delete</Translate>
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}

const mapStateToProps = ({ noidungdanhgia }: IRootState) => ({
  noidungdanhgiaEntity: noidungdanhgia.entity
});

const mapDispatchToProps = { getEntity, deleteEntity,updateEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NoidungdanhgiaDeleteDialog);
