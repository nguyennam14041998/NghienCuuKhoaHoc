import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { getEntity, updateEntity, createEntity, reset } from './linhvuc.reducer';
import { ILinhvuc } from 'app/shared/model/linhvuc.model';
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface ILinhvucUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface ILinhvucUpdateState {
  isNew: boolean;
}

export class LinhvucUpdate extends React.Component<ILinhvucUpdateProps, ILinhvucUpdateState> {
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
      const { linhvucEntity } = this.props;
      const entity = {
        ...linhvucEntity,
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
    this.props.history.push('/linhvuc');
  };

  render() {
    const { linhvucEntity, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="nghienCuuKhoaHocApp.linhvuc.home.createOrEditLabel">
              <Translate contentKey="nghienCuuKhoaHocApp.linhvuc.home.createOrEditLabel">Create or edit a Linhvuc</Translate>
            </h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : linhvucEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="linhvuc-id">
                      <Translate contentKey="global.field.id">ID</Translate>
                    </Label>
                    <AvInput id="linhvuc-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="malvLabel" for="linhvuc-malv">
                    <Translate contentKey="nghienCuuKhoaHocApp.linhvuc.malv">Malv</Translate>
                  </Label>
                  <AvField id="linhvuc-malv" type="text" name="malv" />
                </AvGroup>
                <AvGroup>
                  <Label id="tenlvLabel" for="linhvuc-tenlv">
                    <Translate contentKey="nghienCuuKhoaHocApp.linhvuc.tenlv">Tenlv</Translate>
                  </Label>
                  <AvField id="linhvuc-tenlv" type="text" name="tenlv" />
                </AvGroup>
                <AvGroup>
                  <Label id="sudungLabel" for="linhvuc-sudung">
                    <Translate contentKey="nghienCuuKhoaHocApp.linhvuc.sudung">Sudung</Translate>
                  </Label>
                  <AvField id="linhvuc-sudung" type="string" className="form-control" name="sudung" />
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/linhvuc" replace color="info">
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
  linhvucEntity: storeState.linhvuc.entity,
  loading: storeState.linhvuc.loading,
  updating: storeState.linhvuc.updating,
  updateSuccess: storeState.linhvuc.updateSuccess
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
)(LinhvucUpdate);
