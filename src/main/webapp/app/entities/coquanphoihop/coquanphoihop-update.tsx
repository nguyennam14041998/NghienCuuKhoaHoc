import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { getEntity, updateEntity, createEntity, reset } from './coquanphoihop.reducer';
import { ICoquanphoihop } from 'app/shared/model/coquanphoihop.model';
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface ICoquanphoihopUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface ICoquanphoihopUpdateState {
  isNew: boolean;
}

export class CoquanphoihopUpdate extends React.Component<ICoquanphoihopUpdateProps, ICoquanphoihopUpdateState> {
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
      const { coquanphoihopEntity } = this.props;
      const entity = {
        ...coquanphoihopEntity,
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
    this.props.history.push('/coquanphoihop');
  };

  render() {
    const { coquanphoihopEntity, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="nghienCuuKhoaHocApp.coquanphoihop.home.createOrEditLabel">
              <Translate contentKey="nghienCuuKhoaHocApp.coquanphoihop.home.createOrEditLabel">Create or edit a Coquanphoihop</Translate>
            </h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : coquanphoihopEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="coquanphoihop-id">
                      <Translate contentKey="global.field.id">ID</Translate>
                    </Label>
                    <AvInput id="coquanphoihop-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="macoquanLabel" for="coquanphoihop-macoquan">
                    <Translate contentKey="nghienCuuKhoaHocApp.coquanphoihop.macoquan">Macoquan</Translate>
                  </Label>
                  <AvField id="coquanphoihop-macoquan" type="text" name="macoquan" />
                </AvGroup>
                <AvGroup>
                  <Label id="tencoquanLabel" for="coquanphoihop-tencoquan">
                    <Translate contentKey="nghienCuuKhoaHocApp.coquanphoihop.tencoquan">Tencoquan</Translate>
                  </Label>
                  <AvField id="coquanphoihop-tencoquan" type="text" name="tencoquan" />
                </AvGroup>
                <AvGroup>
                  <Label id="noidungLabel" for="coquanphoihop-noidung">
                    <Translate contentKey="nghienCuuKhoaHocApp.coquanphoihop.noidung">Noidung</Translate>
                  </Label>
                  <AvField id="coquanphoihop-noidung" type="text" name="noidung" />
                </AvGroup>
                <AvGroup>
                  <Label id="tendaidienLabel" for="coquanphoihop-tendaidien">
                    <Translate contentKey="nghienCuuKhoaHocApp.coquanphoihop.tendaidien">Tendaidien</Translate>
                  </Label>
                  <AvField id="coquanphoihop-tendaidien" type="text" name="tendaidien" />
                </AvGroup>
                <AvGroup>
                  <Label id="sudungLabel" for="coquanphoihop-sudung">
                    <Translate contentKey="nghienCuuKhoaHocApp.coquanphoihop.sudung">Sudung</Translate>
                  </Label>
                  <AvField id="coquanphoihop-sudung" type="string" className="form-control" name="sudung" />
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/coquanphoihop" replace color="info">
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
  coquanphoihopEntity: storeState.coquanphoihop.entity,
  loading: storeState.coquanphoihop.loading,
  updating: storeState.coquanphoihop.updating,
  updateSuccess: storeState.coquanphoihop.updateSuccess
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
)(CoquanphoihopUpdate);
