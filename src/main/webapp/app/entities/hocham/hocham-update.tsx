import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { getEntity, updateEntity, createEntity, reset } from './hocham.reducer';
import { IHocham } from 'app/shared/model/hocham.model';
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IHochamUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface IHochamUpdateState {
  isNew: boolean;
}

export class HochamUpdate extends React.Component<IHochamUpdateProps, IHochamUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
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
  }

  saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const { hochamEntity } = this.props;
      const entity = {
        ...hochamEntity,
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
    this.props.history.push('/hocham');
  };

  render() {
    const { hochamEntity, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="nghienCuuKhoaHocApp.hocham.home.createOrEditLabel">
              <Translate contentKey="nghienCuuKhoaHocApp.hocham.home.createOrEditLabel">Create or edit a Hocham</Translate>
            </h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : hochamEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="hocham-id">
                      <Translate contentKey="global.field.id">ID</Translate>
                    </Label>
                    <AvInput id="hocham-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="mahochamLabel" for="hocham-mahocham">
                    <Translate contentKey="nghienCuuKhoaHocApp.hocham.mahocham">Mahocham</Translate>
                  </Label>
                  <AvField id="hocham-mahocham" type="text" name="mahocham" />
                </AvGroup>
                <AvGroup>
                  <Label id="tenhochamLabel" for="hocham-tenhocham">
                    <Translate contentKey="nghienCuuKhoaHocApp.hocham.tenhocham">Tenhocham</Translate>
                  </Label>
                  <AvField id="hocham-tenhocham" type="text" name="tenhocham" />
                </AvGroup>
                <AvGroup>
                  <Label id="sudungLabel" for="hocham-sudung">
                    <Translate contentKey="nghienCuuKhoaHocApp.hocham.sudung">Sudung</Translate>
                  </Label>
                  <AvField id="hocham-sudung" type="string" className="form-control" name="sudung" />
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/hocham" replace color="info">
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
  hochamEntity: storeState.hocham.entity,
  loading: storeState.hocham.loading,
  updating: storeState.hocham.updating,
  updateSuccess: storeState.hocham.updateSuccess
});

const mapDispatchToProps = {
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
)(HochamUpdate);
