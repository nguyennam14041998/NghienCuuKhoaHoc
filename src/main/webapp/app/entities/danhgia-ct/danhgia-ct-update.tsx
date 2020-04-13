import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IDanhgia } from 'app/shared/model/danhgia.model';
import { getEntities as getDanhgias } from 'app/entities/danhgia/danhgia.reducer';
import { INoidungdanhgia } from 'app/shared/model/noidungdanhgia.model';
import { getEntities as getNoidungdanhgias } from 'app/entities/noidungdanhgia/noidungdanhgia.reducer';
import { getEntity, updateEntity, createEntity, reset } from './danhgia-ct.reducer';
import { IDanhgiaCT } from 'app/shared/model/danhgia-ct.model';
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IDanhgiaCTUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface IDanhgiaCTUpdateState {
  isNew: boolean;
  danhgiaId: string;
  noidungdanhgiaId: string;
}

export class DanhgiaCTUpdate extends React.Component<IDanhgiaCTUpdateProps, IDanhgiaCTUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      danhgiaId: '0',
      noidungdanhgiaId: '0',
      isNew: !this.props.match.params || !this.props.match.params.id
    };
  }

  componentWillUpdate(nextProps, nextState) {
    if (nextProps.updateSuccess !== this.props.updateSuccess && nextProps.updateSuccess) {
      this.handleClose();
    }
  }

  componentDidMount() {
    if (this.state.isNew) {
      this.props.reset();
    } else {
      this.props.getEntity(this.props.match.params.id);
    }

    this.props.getDanhgias();
    this.props.getNoidungdanhgias();
  }

  saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const { danhgiaCTEntity } = this.props;
      const entity = {
        ...danhgiaCTEntity,
        ...values
      };

      if (this.state.isNew) {
        this.props.createEntity(entity);
      } else {
        this.props.updateEntity(entity);
      }
    }
  };

  handleClose = () => {
    this.props.history.push('/danhgia-ct');
  };

  render() {
    const { danhgiaCTEntity, danhgias, noidungdanhgias, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="nghienCuuKhoaHocApp.danhgiaCT.home.createOrEditLabel">
              <Translate contentKey="nghienCuuKhoaHocApp.danhgiaCT.home.createOrEditLabel">Create or edit a DanhgiaCT</Translate>
            </h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : danhgiaCTEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="danhgia-ct-id">
                      <Translate contentKey="global.field.id">ID</Translate>
                    </Label>
                    <AvInput id="danhgia-ct-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="diemLabel" for="danhgia-ct-diem">
                    <Translate contentKey="nghienCuuKhoaHocApp.danhgiaCT.diem">Diem</Translate>
                  </Label>
                  <AvField id="danhgia-ct-diem" type="string" className="form-control" name="diem" />
                </AvGroup>
                <AvGroup>
                  <Label id="sudungLabel" for="danhgia-ct-sudung">
                    <Translate contentKey="nghienCuuKhoaHocApp.danhgiaCT.sudung">Sudung</Translate>
                  </Label>
                  <AvField id="danhgia-ct-sudung" type="string" className="form-control" name="sudung" />
                </AvGroup>
                <AvGroup>
                  <Label for="danhgia-ct-danhgia">
                    <Translate contentKey="nghienCuuKhoaHocApp.danhgiaCT.danhgia">Danhgia</Translate>
                  </Label>
                  <AvInput id="danhgia-ct-danhgia" type="select" className="form-control" name="danhgiaId">
                    <option value="" key="0" />
                    {danhgias
                      ? danhgias.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.id}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label for="danhgia-ct-noidungdanhgia">
                    <Translate contentKey="nghienCuuKhoaHocApp.danhgiaCT.noidungdanhgia">Noidungdanhgia</Translate>
                  </Label>
                  <AvInput id="danhgia-ct-noidungdanhgia" type="select" className="form-control" name="noidungdanhgiaId">
                    <option value="" key="0" />
                    {noidungdanhgias
                      ? noidungdanhgias.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.id}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/danhgia-ct" replace color="info">
                  <FontAwesomeIcon icon="arrow-left" />
                  &nbsp;
                  <span className="d-none d-md-inline">
                    <Translate contentKey="entity.action.back">Back</Translate>
                  </span>
                </Button>
                &nbsp;
                <Button color="primary" id="save-entity" type="submit" disabled={updating}>
                  <FontAwesomeIcon icon="save" />
                  &nbsp;
                  <Translate contentKey="entity.action.save">Save</Translate>
                </Button>
              </AvForm>
            )}
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = (storeState: IRootState) => ({
  danhgias: storeState.danhgia.entities,
  noidungdanhgias: storeState.noidungdanhgia.entities,
  danhgiaCTEntity: storeState.danhgiaCT.entity,
  loading: storeState.danhgiaCT.loading,
  updating: storeState.danhgiaCT.updating,
  updateSuccess: storeState.danhgiaCT.updateSuccess
});

const mapDispatchToProps = {
  getDanhgias,
  getNoidungdanhgias,
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DanhgiaCTUpdate);
