import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { getEntity, updateEntity, createEntity, reset } from './noidung-dt.reducer';
import { INoidungDT } from 'app/shared/model/noidung-dt.model';
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface INoidungDTUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface INoidungDTUpdateState {
  isNew: boolean;
}

export class NoidungDTUpdate extends React.Component<INoidungDTUpdateProps, INoidungDTUpdateState> {
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
      const { noidungDTEntity } = this.props;
      const entity = {
        ...noidungDTEntity,
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
    this.props.history.push('/noidung-dt');
  };

  render() {
    const { noidungDTEntity, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="nghienCuuKhoaHocApp.noidungDT.home.createOrEditLabel">
              <Translate contentKey="nghienCuuKhoaHocApp.noidungDT.home.createOrEditLabel">Create or edit a NoidungDT</Translate>
            </h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : noidungDTEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="noidung-dt-id">
                      <Translate contentKey="global.field.id">ID</Translate>
                    </Label>
                    <AvInput id="noidung-dt-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="tennoidungLabel" for="noidung-dt-tennoidung">
                    <Translate contentKey="nghienCuuKhoaHocApp.noidungDT.tennoidung">Tennoidung</Translate>
                  </Label>
                  <AvField id="noidung-dt-tennoidung" type="text" name="tennoidung" />
                </AvGroup>
                <AvGroup>
                  <Label id="sudungLabel" for="noidung-dt-sudung">
                    <Translate contentKey="nghienCuuKhoaHocApp.noidungDT.sudung">Sudung</Translate>
                  </Label>
                  <AvField id="noidung-dt-sudung" type="string" className="form-control" name="sudung" />
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/noidung-dt" replace color="info">
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
  noidungDTEntity: storeState.noidungDT.entity,
  loading: storeState.noidungDT.loading,
  updating: storeState.noidungDT.updating,
  updateSuccess: storeState.noidungDT.updateSuccess
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
)(NoidungDTUpdate);
