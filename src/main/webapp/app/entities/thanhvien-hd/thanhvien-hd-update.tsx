import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IHoidongdanhgia } from 'app/shared/model/hoidongdanhgia.model';
import { getEntities as getHoidongdanhgias } from 'app/entities/hoidongdanhgia/hoidongdanhgia.reducer';
import { getEntity, updateEntity, createEntity, reset } from './thanhvien-hd.reducer';
import { IThanhvienHD } from 'app/shared/model/thanhvien-hd.model';
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IThanhvienHDUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface IThanhvienHDUpdateState {
  isNew: boolean;
  hoidongdanhgiaId: string;
}

export class ThanhvienHDUpdate extends React.Component<IThanhvienHDUpdateProps, IThanhvienHDUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      hoidongdanhgiaId: '0',
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

    this.props.getHoidongdanhgias();
  }

  saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const { thanhvienHDEntity } = this.props;
      const entity = {
        ...thanhvienHDEntity,
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
    this.props.history.push('/thanhvien-hd');
  };

  render() {
    const { thanhvienHDEntity, hoidongdanhgias, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="nghienCuuKhoaHocApp.thanhvienHD.home.createOrEditLabel">
              <Translate contentKey="nghienCuuKhoaHocApp.thanhvienHD.home.createOrEditLabel">Create or edit a ThanhvienHD</Translate>
            </h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : thanhvienHDEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="thanhvien-hd-id">
                      <Translate contentKey="global.field.id">ID</Translate>
                    </Label>
                    <AvInput id="thanhvien-hd-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="tenLabel" for="thanhvien-hd-ten">
                    <Translate contentKey="nghienCuuKhoaHocApp.thanhvienHD.ten">Ten</Translate>
                  </Label>
                  <AvField id="thanhvien-hd-ten" type="text" name="ten" />
                </AvGroup>
                <AvGroup>
                  <Label id="donviLabel" for="thanhvien-hd-donvi">
                    <Translate contentKey="nghienCuuKhoaHocApp.thanhvienHD.donvi">Donvi</Translate>
                  </Label>
                  <AvField id="thanhvien-hd-donvi" type="text" name="donvi" />
                </AvGroup>
                <AvGroup>
                  <Label id="trachnhiemLabel" for="thanhvien-hd-trachnhiem">
                    <Translate contentKey="nghienCuuKhoaHocApp.thanhvienHD.trachnhiem">Trachnhiem</Translate>
                  </Label>
                  <AvField id="thanhvien-hd-trachnhiem" type="string" className="form-control" name="trachnhiem" />
                </AvGroup>
                <AvGroup>
                  <Label id="sudungLabel" for="thanhvien-hd-sudung">
                    <Translate contentKey="nghienCuuKhoaHocApp.thanhvienHD.sudung">Sudung</Translate>
                  </Label>
                  <AvField id="thanhvien-hd-sudung" type="string" className="form-control" name="sudung" />
                </AvGroup>
                <AvGroup>
                  <Label for="thanhvien-hd-hoidongdanhgia">
                    <Translate contentKey="nghienCuuKhoaHocApp.thanhvienHD.hoidongdanhgia">Hoidongdanhgia</Translate>
                  </Label>
                  <AvInput id="thanhvien-hd-hoidongdanhgia" type="select" className="form-control" name="hoidongdanhgiaId">
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
                <Button tag={Link} id="cancel-save" to="/thanhvien-hd" replace color="info">
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
  hoidongdanhgias: storeState.hoidongdanhgia.entities,
  thanhvienHDEntity: storeState.thanhvienHD.entity,
  loading: storeState.thanhvienHD.loading,
  updating: storeState.thanhvienHD.updating,
  updateSuccess: storeState.thanhvienHD.updateSuccess
});

const mapDispatchToProps = {
  getHoidongdanhgias,
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
)(ThanhvienHDUpdate);
