import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { getEntity, updateEntity, createEntity, reset } from './chucdanh.reducer';
import { IChucdanh } from 'app/shared/model/chucdanh.model';
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IChucdanhUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface IChucdanhUpdateState {
  isNew: boolean;
}

export class ChucdanhUpdate extends React.Component<IChucdanhUpdateProps, IChucdanhUpdateState> {
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
      const { chucdanhEntity } = this.props;
      const entity = {
        ...chucdanhEntity,
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
    this.props.history.push('/chucdanh');
  };

  render() {
    const { chucdanhEntity, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="nghienCuuKhoaHocApp.chucdanh.home.createOrEditLabel">
              <Translate contentKey="nghienCuuKhoaHocApp.chucdanh.home.createOrEditLabel">Create or edit a Chucdanh</Translate>
            </h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : chucdanhEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="chucdanh-id">
                      <Translate contentKey="global.field.id">ID</Translate>
                    </Label>
                    <AvInput id="chucdanh-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="machucdanhLabel" for="chucdanh-machucdanh">
                    <Translate contentKey="nghienCuuKhoaHocApp.chucdanh.machucdanh">Machucdanh</Translate>
                  </Label>
                  <AvField id="chucdanh-machucdanh" type="text" name="machucdanh" />
                </AvGroup>
                <AvGroup>
                  <Label id="tenchucdanhLabel" for="chucdanh-tenchucdanh">
                    <Translate contentKey="nghienCuuKhoaHocApp.chucdanh.tenchucdanh">Tenchucdanh</Translate>
                  </Label>
                  <AvField id="chucdanh-tenchucdanh" type="text" name="tenchucdanh" />
                </AvGroup>
                <AvGroup>
                  <Label id="sudungLabel" for="chucdanh-sudung">
                    <Translate contentKey="nghienCuuKhoaHocApp.chucdanh.sudung">Sudung</Translate>
                  </Label>
                  <AvField id="chucdanh-sudung" type="string" className="form-control" name="sudung" />
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/chucdanh" replace color="info">
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
  chucdanhEntity: storeState.chucdanh.entity,
  loading: storeState.chucdanh.loading,
  updating: storeState.chucdanh.updating,
  updateSuccess: storeState.chucdanh.updateSuccess
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
)(ChucdanhUpdate);
