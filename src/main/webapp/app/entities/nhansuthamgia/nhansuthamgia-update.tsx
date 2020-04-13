import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { INhansu } from 'app/shared/model/nhansu.model';
import { getEntities as getNhansus } from 'app/entities/nhansu/nhansu.reducer';
import { IDetai } from 'app/shared/model/detai.model';
import { getEntities as getDetais } from 'app/entities/detai/detai.reducer';
import { getEntity, updateEntity, createEntity, reset } from './nhansuthamgia.reducer';
import { INhansuthamgia } from 'app/shared/model/nhansuthamgia.model';
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface INhansuthamgiaUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface INhansuthamgiaUpdateState {
  isNew: boolean;
  nhansuId: string;
  detaiId: string;
}

export class NhansuthamgiaUpdate extends React.Component<INhansuthamgiaUpdateProps, INhansuthamgiaUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      nhansuId: '0',
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

    this.props.getNhansus();
    this.props.getDetais();
  }

  saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const { nhansuthamgiaEntity } = this.props;
      const entity = {
        ...nhansuthamgiaEntity,
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
    this.props.history.push('/nhansuthamgia');
  };

  render() {
    const { nhansuthamgiaEntity, nhansus, detais, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="nghienCuuKhoaHocApp.nhansuthamgia.home.createOrEditLabel">
              <Translate contentKey="nghienCuuKhoaHocApp.nhansuthamgia.home.createOrEditLabel">Create or edit a Nhansuthamgia</Translate>
            </h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : nhansuthamgiaEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="nhansuthamgia-id">
                      <Translate contentKey="global.field.id">ID</Translate>
                    </Label>
                    <AvInput id="nhansuthamgia-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="sudungLabel" for="nhansuthamgia-sudung">
                    <Translate contentKey="nghienCuuKhoaHocApp.nhansuthamgia.sudung">Sudung</Translate>
                  </Label>
                  <AvField id="nhansuthamgia-sudung" type="string" className="form-control" name="sudung" />
                </AvGroup>
                <AvGroup>
                  <Label for="nhansuthamgia-nhansu">
                    <Translate contentKey="nghienCuuKhoaHocApp.nhansuthamgia.nhansu">Nhansu</Translate>
                  </Label>
                  <AvInput id="nhansuthamgia-nhansu" type="select" className="form-control" name="nhansuId">
                    <option value="" key="0" />
                    {nhansus
                      ? nhansus.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.id}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label for="nhansuthamgia-detai">
                    <Translate contentKey="nghienCuuKhoaHocApp.nhansuthamgia.detai">Detai</Translate>
                  </Label>
                  <AvInput id="nhansuthamgia-detai" type="select" className="form-control" name="detaiId">
                    <option value="" key="0" />
                    {detais
                      ? detais.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.id}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/nhansuthamgia" replace color="info">
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
  nhansus: storeState.nhansu.entities,
  detais: storeState.detai.entities,
  nhansuthamgiaEntity: storeState.nhansuthamgia.entity,
  loading: storeState.nhansuthamgia.loading,
  updating: storeState.nhansuthamgia.updating,
  updateSuccess: storeState.nhansuthamgia.updateSuccess
});

const mapDispatchToProps = {
  getNhansus,
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
)(NhansuthamgiaUpdate);
