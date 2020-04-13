import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { getEntity, updateEntity, createEntity, reset } from './hoidongdanhgia.reducer';
import { IHoidongdanhgia } from 'app/shared/model/hoidongdanhgia.model';
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IHoidongdanhgiaUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface IHoidongdanhgiaUpdateState {
  isNew: boolean;
}

export class HoidongdanhgiaUpdate extends React.Component<IHoidongdanhgiaUpdateProps, IHoidongdanhgiaUpdateState> {
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
      const { hoidongdanhgiaEntity } = this.props;
      const entity = {
        ...hoidongdanhgiaEntity,
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
    this.props.history.push('/hoidongdanhgia');
  };

  render() {
    const { hoidongdanhgiaEntity, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="nghienCuuKhoaHocApp.hoidongdanhgia.home.createOrEditLabel">
              <Translate contentKey="nghienCuuKhoaHocApp.hoidongdanhgia.home.createOrEditLabel">Create or edit a Hoidongdanhgia</Translate>
            </h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : hoidongdanhgiaEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="hoidongdanhgia-id">
                      <Translate contentKey="global.field.id">ID</Translate>
                    </Label>
                    <AvInput id="hoidongdanhgia-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="mahoidongLabel" for="hoidongdanhgia-mahoidong">
                    <Translate contentKey="nghienCuuKhoaHocApp.hoidongdanhgia.mahoidong">Mahoidong</Translate>
                  </Label>
                  <AvField id="hoidongdanhgia-mahoidong" type="text" name="mahoidong" />
                </AvGroup>
                <AvGroup>
                  <Label id="tenhoidongLabel" for="hoidongdanhgia-tenhoidong">
                    <Translate contentKey="nghienCuuKhoaHocApp.hoidongdanhgia.tenhoidong">Tenhoidong</Translate>
                  </Label>
                  <AvField id="hoidongdanhgia-tenhoidong" type="text" name="tenhoidong" />
                </AvGroup>
                <AvGroup>
                  <Label id="sudungLabel" for="hoidongdanhgia-sudung">
                    <Translate contentKey="nghienCuuKhoaHocApp.hoidongdanhgia.sudung">Sudung</Translate>
                  </Label>
                  <AvField id="hoidongdanhgia-sudung" type="string" className="form-control" name="sudung" />
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/hoidongdanhgia" replace color="info">
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
  hoidongdanhgiaEntity: storeState.hoidongdanhgia.entity,
  loading: storeState.hoidongdanhgia.loading,
  updating: storeState.hoidongdanhgia.updating,
  updateSuccess: storeState.hoidongdanhgia.updateSuccess
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
)(HoidongdanhgiaUpdate);
