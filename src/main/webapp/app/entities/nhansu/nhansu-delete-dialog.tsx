import React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import { Translate, ICrudGetAction, ICrudDeleteAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { INhansu } from 'app/shared/model/nhansu.model';
import { IRootState } from 'app/shared/reducers';
import { getEntity, deleteEntity,updateEntity } from './nhansu.reducer';

export interface INhansuDeleteDialogProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class NhansuDeleteDialog extends React.Component<INhansuDeleteDialogProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  confirmDelete = event => {
    const entity={
      id:this.props.nhansuEntity.id,
      tennhansu:this.props.nhansuEntity.tennhansu,
      manhansu:this.props.nhansuEntity.manhansu,
      ngaysinh:this.props.nhansuEntity.ngaysinh,
      sdt:this.props.nhansuEntity.sdt,
      email:this.props.nhansuEntity.email,
      diachi:this.props.nhansuEntity.diachi,
      sudung:0,
      donviId:this.props.nhansuEntity.donviId,
      chucdanhId:this.props.nhansuEntity.chucdanhId,
      hochamId:this.props.nhansuEntity.hochamId
    }
    this.props.updateEntity(entity);
    this.handleClose(event);
  };

  handleClose = event => {
    event.stopPropagation();
    this.props.history.goBack();
  };

  render() {
    const { nhansuEntity } = this.props;
    return (
      <Modal isOpen toggle={this.handleClose}>
        <ModalHeader toggle={this.handleClose}>
          <Translate contentKey="entity.delete.title">Confirm delete operation</Translate>
        </ModalHeader>
        <ModalBody id="doAnTotNghiepApp.nhansu.delete.question">
          <Translate contentKey="doAnTotNghiepApp.nhansu.delete.question" interpolate={{ id: nhansuEntity.id }}>
            Are you sure you want to delete this Nhansu?
          </Translate>
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={this.handleClose}>
            <FontAwesomeIcon icon="ban" />
            &nbsp;
            <Translate contentKey="entity.action.cancel">Cancel</Translate>
          </Button>
          <Button id="jhi-confirm-delete-nhansu" color="danger" onClick={this.confirmDelete}>
            <FontAwesomeIcon icon="trash" />
            &nbsp;
            <Translate contentKey="entity.action.delete">Delete</Translate>
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}

const mapStateToProps = ({ nhansu }: IRootState) => ({
  nhansuEntity: nhansu.entity
});

const mapDispatchToProps = { getEntity, deleteEntity,updateEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NhansuDeleteDialog);
