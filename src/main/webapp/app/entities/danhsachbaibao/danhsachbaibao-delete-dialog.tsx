import React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import { Translate, ICrudGetAction, ICrudDeleteAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IDanhsachbaibao } from 'app/shared/model/danhsachbaibao.model';
import { IRootState } from 'app/shared/reducers';
import { getEntity, deleteEntity } from './danhsachbaibao.reducer';

export interface IDanhsachbaibaoDeleteDialogProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class DanhsachbaibaoDeleteDialog extends React.Component<IDanhsachbaibaoDeleteDialogProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  confirmDelete = event => {
    this.props.deleteEntity(this.props.danhsachbaibaoEntity.id);
    this.handleClose(event);
  };

  handleClose = event => {
    event.stopPropagation();
    this.props.history.goBack();
  };

  render() {
    const { danhsachbaibaoEntity } = this.props;
    return (
      <Modal isOpen toggle={this.handleClose}>
        <ModalHeader toggle={this.handleClose}>
          <Translate contentKey="entity.delete.title">Confirm delete operation</Translate>
        </ModalHeader>
        <ModalBody id="nghienCuuKhoaHocApp.danhsachbaibao.delete.question">
          <Translate contentKey="nghienCuuKhoaHocApp.danhsachbaibao.delete.question" interpolate={{ id: danhsachbaibaoEntity.id }}>
            Are you sure you want to delete this Danhsachbaibao?
          </Translate>
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={this.handleClose}>
            <FontAwesomeIcon icon="ban" />
            &nbsp;
            <Translate contentKey="entity.action.cancel">Cancel</Translate>
          </Button>
          <Button id="jhi-confirm-delete-danhsachbaibao" color="danger" onClick={this.confirmDelete}>
            <FontAwesomeIcon icon="trash" />
            &nbsp;
            <Translate contentKey="entity.action.delete">Delete</Translate>
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}

const mapStateToProps = ({ danhsachbaibao }: IRootState) => ({
  danhsachbaibaoEntity: danhsachbaibao.entity
});

const mapDispatchToProps = { getEntity, deleteEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DanhsachbaibaoDeleteDialog);
