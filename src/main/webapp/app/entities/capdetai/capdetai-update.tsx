import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { getEntity, updateEntity, createEntity, reset } from './capdetai.reducer';
import { ICapdetai } from 'app/shared/model/capdetai.model';
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface ICapdetaiUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface ICapdetaiUpdateState {
  isNew: boolean;
}

export class CapdetaiUpdate extends React.Component<ICapdetaiUpdateProps, ICapdetaiUpdateState> {
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
      const { capdetaiEntity } = this.props;
      const entity = {
        ...capdetaiEntity,
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
    this.props.history.push('/capdetai');
  };

  render() {
    const { capdetaiEntity, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="nghienCuuKhoaHocApp.capdetai.home.createOrEditLabel">
              <Translate contentKey="nghienCuuKhoaHocApp.capdetai.home.createOrEditLabel">Create or edit a Capdetai</Translate>
            </h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : capdetaiEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="capdetai-id">
                      <Translate contentKey="global.field.id">ID</Translate>
                    </Label>
                    <AvInput id="capdetai-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="macapdetaiLabel" for="capdetai-macapdetai">
                    <Translate contentKey="nghienCuuKhoaHocApp.capdetai.macapdetai">Macapdetai</Translate>
                  </Label>
                  <AvField id="capdetai-macapdetai" type="text" name="macapdetai" />
                </AvGroup>
                <AvGroup>
                  <Label id="tencapdetaiLabel" for="capdetai-tencapdetai">
                    <Translate contentKey="nghienCuuKhoaHocApp.capdetai.tencapdetai">Tencapdetai</Translate>
                  </Label>
                  <AvField id="capdetai-tencapdetai" type="text" name="tencapdetai" />
                </AvGroup>
                <AvGroup>
                  <Label id="sudungLabel" for="capdetai-sudung">
                    <Translate contentKey="nghienCuuKhoaHocApp.capdetai.sudung">Sudung</Translate>
                  </Label>
                  <AvField id="capdetai-sudung" type="string" className="form-control" name="sudung" />
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/capdetai" replace color="info">
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
  capdetaiEntity: storeState.capdetai.entity,
  loading: storeState.capdetai.loading,
  updating: storeState.capdetai.updating,
  updateSuccess: storeState.capdetai.updateSuccess
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
)(CapdetaiUpdate);
