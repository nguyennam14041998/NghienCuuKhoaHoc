import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { getEntity, updateEntity, createEntity, reset } from './donvi.reducer';
import { IDonvi } from 'app/shared/model/donvi.model';
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IDonviUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface IDonviUpdateState {
  isNew: boolean;
}

export class DonviUpdate extends React.Component<IDonviUpdateProps, IDonviUpdateState> {
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
      const { donviEntity } = this.props;
      const entity = {
        ...donviEntity,
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
    this.props.history.push('/donvi');
  };

  render() {
    const { donviEntity, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="nghienCuuKhoaHocApp.donvi.home.createOrEditLabel">
              <Translate contentKey="nghienCuuKhoaHocApp.donvi.home.createOrEditLabel">Create or edit a Donvi</Translate>
            </h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : donviEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="donvi-id">
                      <Translate contentKey="global.field.id">ID</Translate>
                    </Label>
                    <AvInput id="donvi-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="madvLabel" for="donvi-madv">
                    <Translate contentKey="nghienCuuKhoaHocApp.donvi.madv">Madv</Translate>
                  </Label>
                  <AvField id="donvi-madv" type="text" name="madv" />
                </AvGroup>
                <AvGroup>
                  <Label id="tendvLabel" for="donvi-tendv">
                    <Translate contentKey="nghienCuuKhoaHocApp.donvi.tendv">Tendv</Translate>
                  </Label>
                  <AvField id="donvi-tendv" type="text" name="tendv" />
                </AvGroup>
                <AvGroup>
                  <Label id="dienthoaiLabel" for="donvi-dienthoai">
                    <Translate contentKey="nghienCuuKhoaHocApp.donvi.dienthoai">Dienthoai</Translate>
                  </Label>
                  <AvField id="donvi-dienthoai" type="string" className="form-control" name="dienthoai" />
                </AvGroup>
                <AvGroup>
                  <Label id="faxLabel" for="donvi-fax">
                    <Translate contentKey="nghienCuuKhoaHocApp.donvi.fax">Fax</Translate>
                  </Label>
                  <AvField id="donvi-fax" type="string" className="form-control" name="fax" />
                </AvGroup>
                <AvGroup>
                  <Label id="emailLabel" for="donvi-email">
                    <Translate contentKey="nghienCuuKhoaHocApp.donvi.email">Email</Translate>
                  </Label>
                  <AvField id="donvi-email" type="text" name="email" />
                </AvGroup>
                <AvGroup>
                  <Label id="sudungLabel" for="donvi-sudung">
                    <Translate contentKey="nghienCuuKhoaHocApp.donvi.sudung">Sudung</Translate>
                  </Label>
                  <AvField id="donvi-sudung" type="string" className="form-control" name="sudung" />
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/donvi" replace color="info">
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
  donviEntity: storeState.donvi.entity,
  loading: storeState.donvi.loading,
  updating: storeState.donvi.updating,
  updateSuccess: storeState.donvi.updateSuccess
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
)(DonviUpdate);
