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
import { getEntity, updateEntity, createEntity, reset } from './chunhiem.reducer';
import { IChunhiem } from 'app/shared/model/chunhiem.model';
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IChunhiemUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface IChunhiemUpdateState {
  isNew: boolean;
  nhansuId: string;
}

export class ChunhiemUpdate extends React.Component<IChunhiemUpdateProps, IChunhiemUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      nhansuId: '0',
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
  }

  saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const { chunhiemEntity } = this.props;
      const entity = {
        ...chunhiemEntity,
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
    this.props.history.push('/chunhiem');
  };

  render() {
    const { chunhiemEntity, nhansus, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="nghienCuuKhoaHocApp.chunhiem.home.createOrEditLabel">
              <Translate contentKey="nghienCuuKhoaHocApp.chunhiem.home.createOrEditLabel">Create or edit a Chunhiem</Translate>
            </h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : chunhiemEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="chunhiem-id">
                      <Translate contentKey="global.field.id">ID</Translate>
                    </Label>
                    <AvInput id="chunhiem-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="sudungLabel" for="chunhiem-sudung">
                    <Translate contentKey="nghienCuuKhoaHocApp.chunhiem.sudung">Sudung</Translate>
                  </Label>
                  <AvField id="chunhiem-sudung" type="string" className="form-control" name="sudung" />
                </AvGroup>
                <AvGroup>
                  <Label for="chunhiem-nhansu">
                    <Translate contentKey="nghienCuuKhoaHocApp.chunhiem.nhansu">Nhansu</Translate>
                  </Label>
                  <AvInput id="chunhiem-nhansu" type="select" className="form-control" name="nhansuId">
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
                <Button tag={Link} id="cancel-save" to="/chunhiem" replace color="info">
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
  chunhiemEntity: storeState.chunhiem.entity,
  loading: storeState.chunhiem.loading,
  updating: storeState.chunhiem.updating,
  updateSuccess: storeState.chunhiem.updateSuccess
});

const mapDispatchToProps = {
  getNhansus,
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
)(ChunhiemUpdate);
