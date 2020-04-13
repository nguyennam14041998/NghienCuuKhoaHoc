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
import { getEntity, updateEntity, createEntity, reset } from './dutoan-kp.reducer';
import { IDutoanKP } from 'app/shared/model/dutoan-kp.model';
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IDutoanKPUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface IDutoanKPUpdateState {
  isNew: boolean;
  detaiId: string;
}

export class DutoanKPUpdate extends React.Component<IDutoanKPUpdateProps, IDutoanKPUpdateState> {
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
      const { dutoanKPEntity } = this.props;
      const entity = {
        ...dutoanKPEntity,
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
    this.props.history.push('/dutoan-kp');
  };

  render() {
    const { dutoanKPEntity, detais, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="nghienCuuKhoaHocApp.dutoanKP.home.createOrEditLabel">
              <Translate contentKey="nghienCuuKhoaHocApp.dutoanKP.home.createOrEditLabel">Create or edit a DutoanKP</Translate>
            </h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : dutoanKPEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="dutoan-kp-id">
                      <Translate contentKey="global.field.id">ID</Translate>
                    </Label>
                    <AvInput id="dutoan-kp-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="madutoanLabel" for="dutoan-kp-madutoan">
                    <Translate contentKey="nghienCuuKhoaHocApp.dutoanKP.madutoan">Madutoan</Translate>
                  </Label>
                  <AvField id="dutoan-kp-madutoan" type="text" name="madutoan" />
                </AvGroup>
                <AvGroup>
                  <Label id="tendutoanLabel" for="dutoan-kp-tendutoan">
                    <Translate contentKey="nghienCuuKhoaHocApp.dutoanKP.tendutoan">Tendutoan</Translate>
                  </Label>
                  <AvField id="dutoan-kp-tendutoan" type="text" name="tendutoan" />
                </AvGroup>
                <AvGroup>
                  <Label id="noidungLabel" for="dutoan-kp-noidung">
                    <Translate contentKey="nghienCuuKhoaHocApp.dutoanKP.noidung">Noidung</Translate>
                  </Label>
                  <AvField id="dutoan-kp-noidung" type="text" name="noidung" />
                </AvGroup>
                <AvGroup>
                  <Label id="sudungLabel" for="dutoan-kp-sudung">
                    <Translate contentKey="nghienCuuKhoaHocApp.dutoanKP.sudung">Sudung</Translate>
                  </Label>
                  <AvField id="dutoan-kp-sudung" type="string" className="form-control" name="sudung" />
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/dutoan-kp" replace color="info">
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
  dutoanKPEntity: storeState.dutoanKP.entity,
  loading: storeState.dutoanKP.loading,
  updating: storeState.dutoanKP.updating,
  updateSuccess: storeState.dutoanKP.updateSuccess
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
)(DutoanKPUpdate);
