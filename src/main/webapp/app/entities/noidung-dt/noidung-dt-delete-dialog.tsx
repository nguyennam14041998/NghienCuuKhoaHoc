import React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import { Translate, ICrudGetAction, ICrudDeleteAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { INoidungDT } from 'app/shared/model/noidung-dt.model';
import { IRootState } from 'app/shared/reducers';
import { getEntity, deleteEntity,updateEntity } from './noidung-dt.reducer';

export interface INoidungDTDeleteDialogProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class NoidungDTDeleteDialog extends React.Component<INoidungDTDeleteDialogProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  confirmDelete = event => {
    const entity={
      id:this.props.noidungDTEntity.id,
      tennoidung:this.props.noidungDTEntity.tennoidung,
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
    const { noidungDTEntity } = this.props;
    return (
      <Modal isOpen toggle={this.handleClose}>
        <ModalHeader toggle={this.handleClose}>
          <Translate contentKey="entity.delete.title">Confirm delete operation</Translate>
        </ModalHeader>
        <ModalBody id="nghienCuuKhoaHocApp.noidungDT.delete.question">
          <Translate contentKey="nghienCuuKhoaHocApp.noidungDT.delete.question" interpolate={{ id: noidungDTEntity.id }}>
            Are you sure you want to delete this NoidungDT?
          </Translate>
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={this.handleClose}>
            <FontAwesomeIcon icon="ban" />
            &nbsp;
            <Translate contentKey="entity.action.cancel">Cancel</Translate>
          </Button>
          <Button id="jhi-confirm-delete-noidungDT" color="danger" onClick={this.confirmDelete}>
            <FontAwesomeIcon icon="trash" />
            &nbsp;
            <Translate contentKey="entity.action.delete">Delete</Translate>
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}

const mapStateToProps = ({ noidungDT }: IRootState) => ({
  noidungDTEntity: noidungDT.entity
});

const mapDispatchToProps = { getEntity, deleteEntity,updateEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NoidungDTDeleteDialog);
