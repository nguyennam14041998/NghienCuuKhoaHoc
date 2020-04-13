import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IDutoanKP } from 'app/shared/model/dutoan-kp.model';
import { getEntities as getDutoanKps } from 'app/entities/dutoan-kp/dutoan-kp.reducer';
import { INoidungDT } from 'app/shared/model/noidung-dt.model';
import { getEntities as getNoidungDts } from 'app/entities/noidung-dt/noidung-dt.reducer';
import { getEntity, updateEntity, createEntity, reset } from './dutoan-kpct.reducer';
import { IDutoanKPCT } from 'app/shared/model/dutoan-kpct.model';
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IDutoanKPCTUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface IDutoanKPCTUpdateState {
  isNew: boolean;
  dutoanKPId: string;
  noidungDTId: string;
}

export class DutoanKPCTUpdate extends React.Component<IDutoanKPCTUpdateProps, IDutoanKPCTUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      dutoanKPId: '0',
      noidungDTId: '0',
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

    this.props.getDutoanKps();
    this.props.getNoidungDts();
  }

  saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const { dutoanKPCTEntity } = this.props;
      const entity = {
        ...dutoanKPCTEntity,
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
    this.props.history.push('/dutoan-kpct');
  };

  render() {
    const { dutoanKPCTEntity, dutoanKPS, noidungDTS, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="nghienCuuKhoaHocApp.dutoanKPCT.home.createOrEditLabel">
              <Translate contentKey="nghienCuuKhoaHocApp.dutoanKPCT.home.createOrEditLabel">Create or edit a DutoanKPCT</Translate>
            </h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : dutoanKPCTEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="dutoan-kpct-id">
                      <Translate contentKey="global.field.id">ID</Translate>
                    </Label>
                    <AvInput id="dutoan-kpct-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="soluongLabel" for="dutoan-kpct-soluong">
                    <Translate contentKey="nghienCuuKhoaHocApp.dutoanKPCT.soluong">Soluong</Translate>
                  </Label>
                  <AvField id="dutoan-kpct-soluong" type="string" className="form-control" name="soluong" />
                </AvGroup>
                <AvGroup>
                  <Label id="mucchiLabel" for="dutoan-kpct-mucchi">
                    <Translate contentKey="nghienCuuKhoaHocApp.dutoanKPCT.mucchi">Mucchi</Translate>
                  </Label>
                  <AvField id="dutoan-kpct-mucchi" type="string" className="form-control" name="mucchi" />
                </AvGroup>
                <AvGroup>
                  <Label id="tongLabel" for="dutoan-kpct-tong">
                    <Translate contentKey="nghienCuuKhoaHocApp.dutoanKPCT.tong">Tong</Translate>
                  </Label>
                  <AvField id="dutoan-kpct-tong" type="string" className="form-control" name="tong" />
                </AvGroup>
                <AvGroup>
                  <Label id="sudungLabel" for="dutoan-kpct-sudung">
                    <Translate contentKey="nghienCuuKhoaHocApp.dutoanKPCT.sudung">Sudung</Translate>
                  </Label>
                  <AvField id="dutoan-kpct-sudung" type="string" className="form-control" name="sudung" />
                </AvGroup>
                <AvGroup>
                  <Label for="dutoan-kpct-dutoanKP">
                    <Translate contentKey="nghienCuuKhoaHocApp.dutoanKPCT.dutoanKP">Dutoan KP</Translate>
                  </Label>
                  <AvInput id="dutoan-kpct-dutoanKP" type="select" className="form-control" name="dutoanKPId">
                    <option value="" key="0" />
                    {dutoanKPS
                      ? dutoanKPS.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.id}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label for="dutoan-kpct-noidungDT">
                    <Translate contentKey="nghienCuuKhoaHocApp.dutoanKPCT.noidungDT">Noidung DT</Translate>
                  </Label>
                  <AvInput id="dutoan-kpct-noidungDT" type="select" className="form-control" name="noidungDTId">
                    <option value="" key="0" />
                    {noidungDTS
                      ? noidungDTS.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.id}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/dutoan-kpct" replace color="info">
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
  dutoanKPS: storeState.dutoanKP.entities,
  noidungDTS: storeState.noidungDT.entities,
  dutoanKPCTEntity: storeState.dutoanKPCT.entity,
  loading: storeState.dutoanKPCT.loading,
  updating: storeState.dutoanKPCT.updating,
  updateSuccess: storeState.dutoanKPCT.updateSuccess
});

const mapDispatchToProps = {
  getDutoanKps,
  getNoidungDts,
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
)(DutoanKPCTUpdate);
