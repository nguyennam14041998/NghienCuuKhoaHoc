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
import { getEntity, updateEntity, createEntity, reset } from './danhsachbaibao.reducer';
import { IDanhsachbaibao } from 'app/shared/model/danhsachbaibao.model';
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IDanhsachbaibaoUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface IDanhsachbaibaoUpdateState {
  isNew: boolean;
  detaiId: string;
}

export class DanhsachbaibaoUpdate extends React.Component<IDanhsachbaibaoUpdateProps, IDanhsachbaibaoUpdateState> {
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
      const { danhsachbaibaoEntity } = this.props;
      const entity = {
        ...danhsachbaibaoEntity,
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
    this.props.history.push('/danhsachbaibao');
  };

  render() {
    const { danhsachbaibaoEntity, detais, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="nghienCuuKhoaHocApp.danhsachbaibao.home.createOrEditLabel">
              <Translate contentKey="nghienCuuKhoaHocApp.danhsachbaibao.home.createOrEditLabel">Create or edit a Danhsachbaibao</Translate>
            </h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : danhsachbaibaoEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="danhsachbaibao-id">
                      <Translate contentKey="global.field.id">ID</Translate>
                    </Label>
                    <AvInput id="danhsachbaibao-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="tenbaibaoLabel" for="danhsachbaibao-tenbaibao">
                    <Translate contentKey="nghienCuuKhoaHocApp.danhsachbaibao.tenbaibao">Tenbaibao</Translate>
                  </Label>
                  <AvField id="danhsachbaibao-tenbaibao" type="text" name="tenbaibao" />
                </AvGroup>
                <AvGroup>
                  <Label id="phanloaiLabel" for="danhsachbaibao-phanloai">
                    <Translate contentKey="nghienCuuKhoaHocApp.danhsachbaibao.phanloai">Phanloai</Translate>
                  </Label>
                  <AvField id="danhsachbaibao-phanloai" type="string" className="form-control" name="phanloai" />
                </AvGroup>
                <AvGroup>
                  <Label id="tenhoithaoLabel" for="danhsachbaibao-tenhoithao">
                    <Translate contentKey="nghienCuuKhoaHocApp.danhsachbaibao.tenhoithao">Tenhoithao</Translate>
                  </Label>
                  <AvField id="danhsachbaibao-tenhoithao" type="text" name="tenhoithao" />
                </AvGroup>
                <AvGroup>
                  <Label id="namxuatbanLabel" for="danhsachbaibao-namxuatban">
                    <Translate contentKey="nghienCuuKhoaHocApp.danhsachbaibao.namxuatban">Namxuatban</Translate>
                  </Label>
                  <AvField id="danhsachbaibao-namxuatban" type="string" className="form-control" name="namxuatban" />
                </AvGroup>
                <AvGroup>
                  <Label id="thangxuatbanLabel" for="danhsachbaibao-thangxuatban">
                    <Translate contentKey="nghienCuuKhoaHocApp.danhsachbaibao.thangxuatban">Thangxuatban</Translate>
                  </Label>
                  <AvField id="danhsachbaibao-thangxuatban" type="string" className="form-control" name="thangxuatban" />
                </AvGroup>
                <AvGroup>
                  <Label id="danhmucLabel" for="danhsachbaibao-danhmuc">
                    <Translate contentKey="nghienCuuKhoaHocApp.danhsachbaibao.danhmuc">Danhmuc</Translate>
                  </Label>
                  <AvField id="danhsachbaibao-danhmuc" type="string" className="form-control" name="danhmuc" />
                </AvGroup>
                <AvGroup>
                  <Label id="iffffLabel" for="danhsachbaibao-iffff">
                    <Translate contentKey="nghienCuuKhoaHocApp.danhsachbaibao.iffff">Iffff</Translate>
                  </Label>
                  <AvField id="danhsachbaibao-iffff" type="text" name="iffff" />
                </AvGroup>
                <AvGroup>
                  <Label id="hindexLabel" for="danhsachbaibao-hindex">
                    <Translate contentKey="nghienCuuKhoaHocApp.danhsachbaibao.hindex">Hindex</Translate>
                  </Label>
                  <AvField id="danhsachbaibao-hindex" type="text" name="hindex" />
                </AvGroup>
                <AvGroup>
                  <Label id="xeploaiLabel" for="danhsachbaibao-xeploai">
                    <Translate contentKey="nghienCuuKhoaHocApp.danhsachbaibao.xeploai">Xeploai</Translate>
                  </Label>
                  <AvField id="danhsachbaibao-xeploai" type="string" className="form-control" name="xeploai" />
                </AvGroup>
                <AvGroup>
                  <Label id="rankbaibaoLabel" for="danhsachbaibao-rankbaibao">
                    <Translate contentKey="nghienCuuKhoaHocApp.danhsachbaibao.rankbaibao">Rankbaibao</Translate>
                  </Label>
                  <AvField id="danhsachbaibao-rankbaibao" type="string" className="form-control" name="rankbaibao" />
                </AvGroup>
                <AvGroup>
                  <Label id="volbaibaoLabel" for="danhsachbaibao-volbaibao">
                    <Translate contentKey="nghienCuuKhoaHocApp.danhsachbaibao.volbaibao">Volbaibao</Translate>
                  </Label>
                  <AvField id="danhsachbaibao-volbaibao" type="text" name="volbaibao" />
                </AvGroup>
                <AvGroup>
                  <Label id="sobaibaoLabel" for="danhsachbaibao-sobaibao">
                    <Translate contentKey="nghienCuuKhoaHocApp.danhsachbaibao.sobaibao">Sobaibao</Translate>
                  </Label>
                  <AvField id="danhsachbaibao-sobaibao" type="string" className="form-control" name="sobaibao" />
                </AvGroup>
                <AvGroup>
                  <Label id="ppbaibaoLabel" for="danhsachbaibao-ppbaibao">
                    <Translate contentKey="nghienCuuKhoaHocApp.danhsachbaibao.ppbaibao">Ppbaibao</Translate>
                  </Label>
                  <AvField id="danhsachbaibao-ppbaibao" type="text" name="ppbaibao" />
                </AvGroup>
                <AvGroup>
                  <Label id="linkLabel" for="danhsachbaibao-link">
                    <Translate contentKey="nghienCuuKhoaHocApp.danhsachbaibao.link">Link</Translate>
                  </Label>
                  <AvField id="danhsachbaibao-link" type="text" name="link" />
                </AvGroup>
                <AvGroup>
                  <Label id="ghichuLabel" for="danhsachbaibao-ghichu">
                    <Translate contentKey="nghienCuuKhoaHocApp.danhsachbaibao.ghichu">Ghichu</Translate>
                  </Label>
                  <AvField id="danhsachbaibao-ghichu" type="text" name="ghichu" />
                </AvGroup>
                <AvGroup>
                  <Label id="tacgiachinhLabel" for="danhsachbaibao-tacgiachinh">
                    <Translate contentKey="nghienCuuKhoaHocApp.danhsachbaibao.tacgiachinh">Tacgiachinh</Translate>
                  </Label>
                  <AvField id="danhsachbaibao-tacgiachinh" type="text" name="tacgiachinh" />
                </AvGroup>
                <AvGroup>
                  <Label id="tacgiakhacLabel" for="danhsachbaibao-tacgiakhac">
                    <Translate contentKey="nghienCuuKhoaHocApp.danhsachbaibao.tacgiakhac">Tacgiakhac</Translate>
                  </Label>
                  <AvField id="danhsachbaibao-tacgiakhac" type="text" name="tacgiakhac" />
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/danhsachbaibao" replace color="info">
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
  danhsachbaibaoEntity: storeState.danhsachbaibao.entity,
  loading: storeState.danhsachbaibao.loading,
  updating: storeState.danhsachbaibao.updating,
  updateSuccess: storeState.danhsachbaibao.updateSuccess
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
)(DanhsachbaibaoUpdate);
