import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, setFileData, openFile, byteSize, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IDetai } from 'app/shared/model/detai.model';
import { getEntities as getDetais } from 'app/entities/detai/detai.reducer';
import { ITiendo } from 'app/shared/model/tiendo.model';
import { getEntities as getTiendos } from 'app/entities/tiendo/tiendo.reducer';
import { getEntity, updateEntity, createEntity, setBlob, reset } from './upfile.reducer';
import { IUpfile } from 'app/shared/model/upfile.model';
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IUpfileUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface IUpfileUpdateState {
  isNew: boolean;
  detaiId: string;
  tiendoId: string;
}

export class UpfileUpdate extends React.Component<IUpfileUpdateProps, IUpfileUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      detaiId: '0',
      tiendoId: '0',
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
    this.props.getTiendos();
  }

  onBlobChange = (isAnImage, name) => event => {
    setFileData(event, (contentType, data) => this.props.setBlob(name, data, contentType), isAnImage);
  };

  clearBlob = name => () => {
    this.props.setBlob(name, undefined, undefined);
  };

  saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const { upfileEntity } = this.props;
      const entity = {
        ...upfileEntity,
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
    this.props.history.push('/upfile');
  };

  render() {
    const { upfileEntity, detais, tiendos, loading, updating } = this.props;
    const { isNew } = this.state;

    const { noidung, noidungContentType } = upfileEntity;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="nghienCuuKhoaHocApp.upfile.home.createOrEditLabel">
              <Translate contentKey="nghienCuuKhoaHocApp.upfile.home.createOrEditLabel">Create or edit a Upfile</Translate>
            </h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : upfileEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="upfile-id">
                      <Translate contentKey="global.field.id">ID</Translate>
                    </Label>
                    <AvInput id="upfile-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="motaLabel" for="upfile-mota">
                    <Translate contentKey="nghienCuuKhoaHocApp.upfile.mota">Mota</Translate>
                  </Label>
                  <AvField id="upfile-mota" type="text" name="mota" />
                </AvGroup>
                <AvGroup>
                  <AvGroup>
                    <Label id="noidungLabel" for="noidung">
                      <Translate contentKey="nghienCuuKhoaHocApp.upfile.noidung">Noidung</Translate>
                    </Label>
                    <br />
                    {noidung ? (
                      <div>
                        <a onClick={openFile(noidungContentType, noidung)}>
                          <Translate contentKey="entity.action.open">Open</Translate>
                        </a>
                        <br />
                        <Row>
                          <Col md="11">
                            <span>
                              {noidungContentType}, {byteSize(noidung)}
                            </span>
                          </Col>
                          <Col md="1">
                            <Button color="danger" onClick={this.clearBlob('noidung')}>
                              <FontAwesomeIcon icon="times-circle" />
                            </Button>
                          </Col>
                        </Row>
                      </div>
                    ) : null}
                    <input id="file_noidung" type="file" onChange={this.onBlobChange(false, 'noidung')} />
                    <AvInput type="hidden" name="noidung" value={noidung} />
                  </AvGroup>
                </AvGroup>
                <AvGroup>
                  <Label id="thoigianLabel" for="upfile-thoigian">
                    <Translate contentKey="nghienCuuKhoaHocApp.upfile.thoigian">Thoigian</Translate>
                  </Label>
                  <AvField id="upfile-thoigian" type="date" className="form-control" name="thoigian" />
                </AvGroup>
                <AvGroup>
                  <Label for="upfile-detai">
                    <Translate contentKey="nghienCuuKhoaHocApp.upfile.detai">Detai</Translate>
                  </Label>
                  <AvInput id="upfile-detai" type="select" className="form-control" name="detaiId">
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
                <AvGroup>
                  <Label for="upfile-tiendo">
                    <Translate contentKey="nghienCuuKhoaHocApp.upfile.tiendo">Tiendo</Translate>
                  </Label>
                  <AvInput id="upfile-tiendo" type="select" className="form-control" name="tiendoId">
                    <option value="" key="0" />
                    {tiendos
                      ? tiendos.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.id}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/upfile" replace color="info">
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
  tiendos: storeState.tiendo.entities,
  upfileEntity: storeState.upfile.entity,
  loading: storeState.upfile.loading,
  updating: storeState.upfile.updating,
  updateSuccess: storeState.upfile.updateSuccess
});

const mapDispatchToProps = {
  getDetais,
  getTiendos,
  getEntity,
  updateEntity,
  setBlob,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UpfileUpdate);
