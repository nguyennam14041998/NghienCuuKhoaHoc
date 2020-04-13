import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IDetai } from 'app/shared/model/detai.model';
import { getEntities as getDetais } from 'app/entities/detai/detai.reducer';
import { getEntity, updateEntity, createEntity, reset } from './danhgia.reducer';
import { IDanhgia } from 'app/shared/model/danhgia.model';
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IDanhgiaUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface IDanhgiaUpdateState {
  isNew: boolean;
  detaiId: string;
}

export class DanhgiaUpdate extends React.Component<IDanhgiaUpdateProps, IDanhgiaUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      detaiId: '0',
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

    this.props.getDetais();
  }

  saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const { danhgiaEntity } = this.props;
      const entity = {
        ...danhgiaEntity,
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
    this.props.history.push('/danhgia');
  };

  render() {
    const { danhgiaEntity, detais, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="nghienCuuKhoaHocApp.danhgia.home.createOrEditLabel">
              <Translate contentKey="nghienCuuKhoaHocApp.danhgia.home.createOrEditLabel">Create or edit a Danhgia</Translate>
            </h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : danhgiaEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="danhgia-id">
                      <Translate contentKey="global.field.id">ID</Translate>
                    </Label>
                    <AvInput id="danhgia-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="maLabel" for="danhgia-ma">
                    <Translate contentKey="nghienCuuKhoaHocApp.danhgia.ma">Ma</Translate>
                  </Label>
                  <AvField id="danhgia-ma" type="text" name="ma" />
                </AvGroup>
                <AvGroup>
                  <Label id="tenLabel" for="danhgia-ten">
                    <Translate contentKey="nghienCuuKhoaHocApp.danhgia.ten">Ten</Translate>
                  </Label>
                  <AvField id="danhgia-ten" type="text" name="ten" />
                </AvGroup>
                <AvGroup>
                  <Label id="diemLabel" for="danhgia-diem">
                    <Translate contentKey="nghienCuuKhoaHocApp.danhgia.diem">Diem</Translate>
                  </Label>
                  <AvField id="danhgia-diem" type="string" className="form-control" name="diem" />
                </AvGroup>
                <AvGroup>
                  <Label id="noidungLabel" for="danhgia-noidung">
                    <Translate contentKey="nghienCuuKhoaHocApp.danhgia.noidung">Noidung</Translate>
                  </Label>
                  <AvField id="danhgia-noidung" type="text" name="noidung" />
                </AvGroup>
                <AvGroup>
                  <Label id="sudungLabel" for="danhgia-sudung">
                    <Translate contentKey="nghienCuuKhoaHocApp.danhgia.sudung">Sudung</Translate>
                  </Label>
                  <AvField id="danhgia-sudung" type="string" className="form-control" name="sudung" />
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/danhgia" replace color="info">
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
  detais: storeState.detai.entities,
  danhgiaEntity: storeState.danhgia.entity,
  loading: storeState.danhgia.loading,
  updating: storeState.danhgia.updating,
  updateSuccess: storeState.danhgia.updateSuccess
});

const mapDispatchToProps = {
  getDetais,
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
)(DanhgiaUpdate);
