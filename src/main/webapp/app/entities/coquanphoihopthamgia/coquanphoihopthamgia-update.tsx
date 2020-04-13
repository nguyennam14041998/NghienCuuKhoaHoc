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
import { ICoquanphoihop } from 'app/shared/model/coquanphoihop.model';
import { getEntities as getCoquanphoihops } from 'app/entities/coquanphoihop/coquanphoihop.reducer';
import { getEntity, updateEntity, createEntity, reset } from './coquanphoihopthamgia.reducer';
import { ICoquanphoihopthamgia } from 'app/shared/model/coquanphoihopthamgia.model';
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface ICoquanphoihopthamgiaUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface ICoquanphoihopthamgiaUpdateState {
  isNew: boolean;
  detaiId: string;
  coquanphoihopId: string;
}

export class CoquanphoihopthamgiaUpdate extends React.Component<ICoquanphoihopthamgiaUpdateProps, ICoquanphoihopthamgiaUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      detaiId: '0',
      coquanphoihopId: '0',
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
    this.props.getCoquanphoihops();
  }

  saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const { coquanphoihopthamgiaEntity } = this.props;
      const entity = {
        ...coquanphoihopthamgiaEntity,
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
    this.props.history.push('/coquanphoihopthamgia');
  };

  render() {
    const { coquanphoihopthamgiaEntity, detais, coquanphoihops, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="nghienCuuKhoaHocApp.coquanphoihopthamgia.home.createOrEditLabel">
              <Translate contentKey="nghienCuuKhoaHocApp.coquanphoihopthamgia.home.createOrEditLabel">
                Create or edit a Coquanphoihopthamgia
              </Translate>
            </h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : coquanphoihopthamgiaEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="coquanphoihopthamgia-id">
                      <Translate contentKey="global.field.id">ID</Translate>
                    </Label>
                    <AvInput id="coquanphoihopthamgia-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="sudungLabel" for="coquanphoihopthamgia-sudung">
                    <Translate contentKey="nghienCuuKhoaHocApp.coquanphoihopthamgia.sudung">Sudung</Translate>
                  </Label>
                  <AvField id="coquanphoihopthamgia-sudung" type="string" className="form-control" name="sudung" />
                </AvGroup>
                <AvGroup>
                  <Label for="coquanphoihopthamgia-detai">
                    <Translate contentKey="nghienCuuKhoaHocApp.coquanphoihopthamgia.detai">Detai</Translate>
                  </Label>
                  <AvInput id="coquanphoihopthamgia-detai" type="select" className="form-control" name="detaiId">
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
                <AvGroup>
                  <Label for="coquanphoihopthamgia-coquanphoihop">
                    <Translate contentKey="nghienCuuKhoaHocApp.coquanphoihopthamgia.coquanphoihop">Coquanphoihop</Translate>
                  </Label>
                  <AvInput id="coquanphoihopthamgia-coquanphoihop" type="select" className="form-control" name="coquanphoihopId">
                    <option value="" key="0" />
                    {coquanphoihops
                      ? coquanphoihops.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.id}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/coquanphoihopthamgia" replace color="info">
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
  coquanphoihops: storeState.coquanphoihop.entities,
  coquanphoihopthamgiaEntity: storeState.coquanphoihopthamgia.entity,
  loading: storeState.coquanphoihopthamgia.loading,
  updating: storeState.coquanphoihopthamgia.updating,
  updateSuccess: storeState.coquanphoihopthamgia.updateSuccess
});

const mapDispatchToProps = {
  getDetais,
  getCoquanphoihops,
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
)(CoquanphoihopthamgiaUpdate);
