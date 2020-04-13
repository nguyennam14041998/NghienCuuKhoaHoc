import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IDetai } from 'app/shared/model/detai.model';
import { getEntities as getDetais } from 'app/entities/detai/detai.reducer';
import { getEntity, updateEntity, createEntity, reset } from './tiendo.reducer';
import { ITiendo } from 'app/shared/model/tiendo.model';
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface ITiendoUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface ITiendoUpdateState {
  isNew: boolean;
  detaiId: string;
}

export class TiendoUpdate extends React.Component<ITiendoUpdateProps, ITiendoUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      detaiId: '0',
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

    this.props.getDetais();
  }

  saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const { tiendoEntity } = this.props;
      const entity = {
        ...tiendoEntity,
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
    this.props.history.push('/tiendo');
  };

  render() {
    const { tiendoEntity, detais, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="nghienCuuKhoaHocApp.tiendo.home.createOrEditLabel">
              <Translate contentKey="nghienCuuKhoaHocApp.tiendo.home.createOrEditLabel">Create or edit a Tiendo</Translate>
            </h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : tiendoEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="tiendo-id">
                      <Translate contentKey="global.field.id">ID</Translate>
                    </Label>
                    <AvInput id="tiendo-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="matiendoLabel" for="tiendo-matiendo">
                    <Translate contentKey="nghienCuuKhoaHocApp.tiendo.matiendo">Matiendo</Translate>
                  </Label>
                  <AvField id="tiendo-matiendo" type="text" name="matiendo" />
                </AvGroup>
                <AvGroup>
                  <Label id="kybaocaoLabel" for="tiendo-kybaocao">
                    <Translate contentKey="nghienCuuKhoaHocApp.tiendo.kybaocao">Kybaocao</Translate>
                  </Label>
                  <AvField id="tiendo-kybaocao" type="text" name="kybaocao" />
                </AvGroup>
                <AvGroup>
                  <Label id="noidungLabel" for="tiendo-noidung">
                    <Translate contentKey="nghienCuuKhoaHocApp.tiendo.noidung">Noidung</Translate>
                  </Label>
                  <AvField id="tiendo-noidung" type="text" name="noidung" />
                </AvGroup>
                <AvGroup>
                  <Label id="thoigianbatdauLabel" for="tiendo-thoigianbatdau">
                    <Translate contentKey="nghienCuuKhoaHocApp.tiendo.thoigianbatdau">Thoigianbatdau</Translate>
                  </Label>
                  <AvField id="tiendo-thoigianbatdau" type="date" className="form-control" name="thoigianbatdau" />
                </AvGroup>
                <AvGroup>
                  <Label id="thoigianketthucLabel" for="tiendo-thoigianketthuc">
                    <Translate contentKey="nghienCuuKhoaHocApp.tiendo.thoigianketthuc">Thoigianketthuc</Translate>
                  </Label>
                  <AvField id="tiendo-thoigianketthuc" type="date" className="form-control" name="thoigianketthuc" />
                </AvGroup>
                <AvGroup>
                  <Label id="khoiluonghoanthanhLabel" for="tiendo-khoiluonghoanthanh">
                    <Translate contentKey="nghienCuuKhoaHocApp.tiendo.khoiluonghoanthanh">Khoiluonghoanthanh</Translate>
                  </Label>
                  <AvField id="tiendo-khoiluonghoanthanh" type="string" className="form-control" name="khoiluonghoanthanh" />
                </AvGroup>
                <AvGroup>
                  <Label id="ghichuLabel" for="tiendo-ghichu">
                    <Translate contentKey="nghienCuuKhoaHocApp.tiendo.ghichu">Ghichu</Translate>
                  </Label>
                  <AvField id="tiendo-ghichu" type="text" name="ghichu" />
                </AvGroup>
                <AvGroup>
                  <Label id="sudungLabel" for="tiendo-sudung">
                    <Translate contentKey="nghienCuuKhoaHocApp.tiendo.sudung">Sudung</Translate>
                  </Label>
                  <AvField id="tiendo-sudung" type="string" className="form-control" name="sudung" />
                </AvGroup>
                <AvGroup>
                  <Label for="tiendo-detai">
                    <Translate contentKey="nghienCuuKhoaHocApp.tiendo.detai">Detai</Translate>
                  </Label>
                  <AvInput id="tiendo-detai" type="select" className="form-control" name="detaiId">
                    <option value="" key="0" />
                    {detais
                      ? detais.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.id}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/tiendo" replace color="info">
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
  detais: storeState.detai.entities,
  tiendoEntity: storeState.tiendo.entity,
  loading: storeState.tiendo.loading,
  updating: storeState.tiendo.updating,
  updateSuccess: storeState.tiendo.updateSuccess
});

const mapDispatchToProps = {
  getDetais,
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
)(TiendoUpdate);
