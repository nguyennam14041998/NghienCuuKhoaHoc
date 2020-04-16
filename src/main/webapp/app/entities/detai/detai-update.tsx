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
import { IDanhgia } from 'app/shared/model/danhgia.model';
import { getEntities as getDanhgias } from 'app/entities/danhgia/danhgia.reducer';
import { IDanhsachbaibao } from 'app/shared/model/danhsachbaibao.model';
import { getEntities as getDanhsachbaibaos } from 'app/entities/danhsachbaibao/danhsachbaibao.reducer';
import { ILinhvuc } from 'app/shared/model/linhvuc.model';
import { getEntities as getLinhvucs } from 'app/entities/linhvuc/linhvuc.reducer';
import { ICapdetai } from 'app/shared/model/capdetai.model';
import { getEntities as getCapdetais } from 'app/entities/capdetai/capdetai.reducer';
import { IHoidongdanhgia } from 'app/shared/model/hoidongdanhgia.model';
import { getEntities as getHoidongdanhgias } from 'app/entities/hoidongdanhgia/hoidongdanhgia.reducer';
import { IChunhiem } from 'app/shared/model/chunhiem.model';
import { getEntities as getChunhiems } from 'app/entities/chunhiem/chunhiem.reducer';
import { getEntity, updateEntity, createEntity, reset } from './detai.reducer';
import { IDetai } from 'app/shared/model/detai.model';
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IDetaiUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface IDetaiUpdateState {
  isNew: boolean;
  dutoanKPId: string;
  danhgiaId: string;
  danhsachbaibaoId: string;
  linhvucId: string;
  capdetaiId: string;
  hoidongdanhgiaId: string;
  chunhiemId: string;
}

export class DetaiUpdate extends React.Component<IDetaiUpdateProps, IDetaiUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      dutoanKPId: '0',
      danhgiaId: '0',
      danhsachbaibaoId: '0',
      linhvucId: '0',
      capdetaiId: '0',
      hoidongdanhgiaId: '0',
      chunhiemId: '0',
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
    this.props.getDanhgias();
    this.props.getDanhsachbaibaos();
    this.props.getLinhvucs();
    this.props.getCapdetais();
    this.props.getHoidongdanhgias();
    this.props.getChunhiems();
  }

  saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const { detaiEntity } = this.props;
      const entity = {
        ...detaiEntity,
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
    this.props.history.push('/detai');
  };

  render() {
    const {
      detaiEntity,
      dutoanKPS,
      danhgias,
      danhsachbaibaos,
      linhvucs,
      capdetais,
      hoidongdanhgias,
      chunhiems,
      loading,
      updating
    } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="nghienCuuKhoaHocApp.detai.home.createOrEditLabel">
              <Translate contentKey="nghienCuuKhoaHocApp.detai.home.createOrEditLabel">Create or edit a Detai</Translate>
            </h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : detaiEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="detai-id">
                      <Translate contentKey="global.field.id">ID</Translate>
                    </Label>
                    <AvInput id="detai-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="maLabel" for="detai-ma">
                    <Translate contentKey="nghienCuuKhoaHocApp.detai.ma">Ma</Translate>
                  </Label>
                  <AvField id="detai-ma" type="text" name="ma" />
                </AvGroup>
                <AvGroup>
                  <Label id="tenLabel" for="detai-ten">
                    <Translate contentKey="nghienCuuKhoaHocApp.detai.ten">Ten</Translate>
                  </Label>
                  <AvField id="detai-ten" type="text" name="ten" />
                </AvGroup>
                <AvGroup>
                  <Label id="thoigiantaoLabel" for="detai-thoigiantao">
                    <Translate contentKey="nghienCuuKhoaHocApp.detai.thoigiantao">Thoigiantao</Translate>
                  </Label>
                  <AvField id="detai-thoigiantao" type="date" className="form-control" name="thoigiantao" />
                </AvGroup>
                <AvGroup>
                  <Label id="thoigianbatdauLabel" for="detai-thoigianbatdau">
                    <Translate contentKey="nghienCuuKhoaHocApp.detai.thoigianbatdau">Thoigianbatdau</Translate>
                  </Label>
                  <AvField id="detai-thoigianbatdau" type="date" className="form-control" name="thoigianbatdau" />
                </AvGroup>
                <AvGroup>
                  <Label id="thoigianketthucLabel" for="detai-thoigianketthuc">
                    <Translate contentKey="nghienCuuKhoaHocApp.detai.thoigianketthuc">Thoigianketthuc</Translate>
                  </Label>
                  <AvField id="detai-thoigianketthuc" type="date" className="form-control" name="thoigianketthuc" />
                </AvGroup>
                <AvGroup>
                  <Label id="muctieuLabel" for="detai-muctieu">
                    <Translate contentKey="nghienCuuKhoaHocApp.detai.muctieu">Muctieu</Translate>
                  </Label>
                  <AvField id="detai-muctieu" type="text" name="muctieu" />
                </AvGroup>
                <AvGroup>
                  <Label id="noidungLabel" for="detai-noidung">
                    <Translate contentKey="nghienCuuKhoaHocApp.detai.noidung">Noidung</Translate>
                  </Label>
                  <AvField id="detai-noidung" type="text" name="noidung" />
                </AvGroup>
                <AvGroup>
                  <Label id="tinhcapthietLabel" for="detai-tinhcapthiet">
                    <Translate contentKey="nghienCuuKhoaHocApp.detai.tinhcapthiet">Tinhcapthiet</Translate>
                  </Label>
                  <AvField id="detai-tinhcapthiet" type="string" className="form-control" name="tinhcapthiet" />
                </AvGroup>
                <AvGroup>
                  <Label id="ketquaLabel" for="detai-ketqua">
                    <Translate contentKey="nghienCuuKhoaHocApp.detai.ketqua">Ketqua</Translate>
                  </Label>
                  <AvField id="detai-ketqua" type="text" name="ketqua" />
                </AvGroup>
                <AvGroup>
                  <Label id="xeploaiLabel" for="detai-xeploai">
                    <Translate contentKey="nghienCuuKhoaHocApp.detai.xeploai">Xeploai</Translate>
                  </Label>
                  <AvField id="detai-xeploai" type="string" className="form-control" name="xeploai" />
                </AvGroup>
                <AvGroup>
                  <Label id="trangthaiLabel" for="detai-trangthai">
                    <Translate contentKey="nghienCuuKhoaHocApp.detai.trangthai">Trangthai</Translate>
                  </Label>
                  <AvField id="detai-trangthai" type="string" className="form-control" name="trangthai" />
                </AvGroup>
                <AvGroup>
                  <Label id="sudungLabel" for="detai-sudung">
                    <Translate contentKey="nghienCuuKhoaHocApp.detai.sudung">Sudung</Translate>
                  </Label>
                  <AvField id="detai-sudung" type="string" className="form-control" name="sudung" />
                </AvGroup>
                <AvGroup>
                  <Label id="chunhiemdetaiLabel" for="detai-chunhiemdetai">
                    <Translate contentKey="nghienCuuKhoaHocApp.detai.chunhiemdetai">Chunhiemdetai</Translate>
                  </Label>
                  <AvField id="detai-chunhiemdetai" type="text" name="chunhiemdetai" />
                </AvGroup>
                <AvGroup>
                  <Label for="detai-dutoanKP">
                    <Translate contentKey="nghienCuuKhoaHocApp.detai.dutoanKP">Dutoan KP</Translate>
                  </Label>
                  <AvInput id="detai-dutoanKP" type="select" className="form-control" name="dutoanKPId">
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
                  <Label for="detai-danhgia">
                    <Translate contentKey="nghienCuuKhoaHocApp.detai.danhgia">Danhgia</Translate>
                  </Label>
                  <AvInput id="detai-danhgia" type="select" className="form-control" name="danhgiaId">
                    <option value="" key="0" />
                    {danhgias
                      ? danhgias.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.id}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label for="detai-danhsachbaibao">
                    <Translate contentKey="nghienCuuKhoaHocApp.detai.danhsachbaibao">Danhsachbaibao</Translate>
                  </Label>
                  <AvInput id="detai-danhsachbaibao" type="select" className="form-control" name="danhsachbaibaoId">
                    <option value="" key="0" />
                    {danhsachbaibaos
                      ? danhsachbaibaos.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.id}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label for="detai-linhvuc">
                    <Translate contentKey="nghienCuuKhoaHocApp.detai.linhvuc">Linhvuc</Translate>
                  </Label>
                  <AvInput id="detai-linhvuc" type="select" className="form-control" name="linhvucId">
                    <option value="" key="0" />
                    {linhvucs
                      ? linhvucs.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.id}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label for="detai-capdetai">
                    <Translate contentKey="nghienCuuKhoaHocApp.detai.capdetai">Capdetai</Translate>
                  </Label>
                  <AvInput id="detai-capdetai" type="select" className="form-control" name="capdetaiId">
                    <option value="" key="0" />
                    {capdetais
                      ? capdetais.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.id}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label for="detai-hoidongdanhgia">
                    <Translate contentKey="nghienCuuKhoaHocApp.detai.hoidongdanhgia">Hoidongdanhgia</Translate>
                  </Label>
                  <AvInput id="detai-hoidongdanhgia" type="select" className="form-control" name="hoidongdanhgiaId">
                    <option value="" key="0" />
                    {hoidongdanhgias
                      ? hoidongdanhgias.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.id}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label for="detai-chunhiem">
                    <Translate contentKey="nghienCuuKhoaHocApp.detai.chunhiem">Chunhiem</Translate>
                  </Label>
                  <AvInput id="detai-chunhiem" type="select" className="form-control" name="chunhiemId">
                    <option value="" key="0" />
                    {chunhiems
                      ? chunhiems.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.id}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/detai" replace color="info">
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
  danhgias: storeState.danhgia.entities,
  danhsachbaibaos: storeState.danhsachbaibao.entities,
  linhvucs: storeState.linhvuc.entities,
  capdetais: storeState.capdetai.entities,
  hoidongdanhgias: storeState.hoidongdanhgia.entities,
  chunhiems: storeState.chunhiem.entities,
  detaiEntity: storeState.detai.entity,
  loading: storeState.detai.loading,
  updating: storeState.detai.updating,
  updateSuccess: storeState.detai.updateSuccess
});

const mapDispatchToProps = {
  getDutoanKps,
  getDanhgias,
  getDanhsachbaibaos,
  getLinhvucs,
  getCapdetais,
  getHoidongdanhgias,
  getChunhiems,
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
)(DetaiUpdate);
