import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './danhsachbaibao.reducer';
import { IDanhsachbaibao } from 'app/shared/model/danhsachbaibao.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IDanhsachbaibaoDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class DanhsachbaibaoDetail extends React.Component<IDanhsachbaibaoDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { danhsachbaibaoEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="nghienCuuKhoaHocApp.danhsachbaibao.detail.title">Danhsachbaibao</Translate> [
            <b>{danhsachbaibaoEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="tenbaibao">
                <Translate contentKey="nghienCuuKhoaHocApp.danhsachbaibao.tenbaibao">Tenbaibao</Translate>
              </span>
            </dt>
            <dd>{danhsachbaibaoEntity.tenbaibao}</dd>
            <dt>
              <span id="phanloai">
                <Translate contentKey="nghienCuuKhoaHocApp.danhsachbaibao.phanloai">Phanloai</Translate>
              </span>
            </dt>
            <dd>{danhsachbaibaoEntity.phanloai}</dd>
            <dt>
              <span id="tenhoithao">
                <Translate contentKey="nghienCuuKhoaHocApp.danhsachbaibao.tenhoithao">Tenhoithao</Translate>
              </span>
            </dt>
            <dd>{danhsachbaibaoEntity.tenhoithao}</dd>
            <dt>
              <span id="namxuatban">
                <Translate contentKey="nghienCuuKhoaHocApp.danhsachbaibao.namxuatban">Namxuatban</Translate>
              </span>
            </dt>
            <dd>{danhsachbaibaoEntity.namxuatban}</dd>
            <dt>
              <span id="thangxuatban">
                <Translate contentKey="nghienCuuKhoaHocApp.danhsachbaibao.thangxuatban">Thangxuatban</Translate>
              </span>
            </dt>
            <dd>{danhsachbaibaoEntity.thangxuatban}</dd>
            <dt>
              <span id="danhmuc">
                <Translate contentKey="nghienCuuKhoaHocApp.danhsachbaibao.danhmuc">Danhmuc</Translate>
              </span>
            </dt>
            <dd>{danhsachbaibaoEntity.danhmuc}</dd>
            <dt>
              <span id="iffff">
                <Translate contentKey="nghienCuuKhoaHocApp.danhsachbaibao.iffff">Iffff</Translate>
              </span>
            </dt>
            <dd>{danhsachbaibaoEntity.iffff}</dd>
            <dt>
              <span id="hindex">
                <Translate contentKey="nghienCuuKhoaHocApp.danhsachbaibao.hindex">Hindex</Translate>
              </span>
            </dt>
            <dd>{danhsachbaibaoEntity.hindex}</dd>
            <dt>
              <span id="xeploai">
                <Translate contentKey="nghienCuuKhoaHocApp.danhsachbaibao.xeploai">Xeploai</Translate>
              </span>
            </dt>
            <dd>{danhsachbaibaoEntity.xeploai}</dd>
            <dt>
              <span id="rankbaibao">
                <Translate contentKey="nghienCuuKhoaHocApp.danhsachbaibao.rankbaibao">Rankbaibao</Translate>
              </span>
            </dt>
            <dd>{danhsachbaibaoEntity.rankbaibao}</dd>
            <dt>
              <span id="volbaibao">
                <Translate contentKey="nghienCuuKhoaHocApp.danhsachbaibao.volbaibao">Volbaibao</Translate>
              </span>
            </dt>
            <dd>{danhsachbaibaoEntity.volbaibao}</dd>
            <dt>
              <span id="sobaibao">
                <Translate contentKey="nghienCuuKhoaHocApp.danhsachbaibao.sobaibao">Sobaibao</Translate>
              </span>
            </dt>
            <dd>{danhsachbaibaoEntity.sobaibao}</dd>
            <dt>
              <span id="ppbaibao">
                <Translate contentKey="nghienCuuKhoaHocApp.danhsachbaibao.ppbaibao">Ppbaibao</Translate>
              </span>
            </dt>
            <dd>{danhsachbaibaoEntity.ppbaibao}</dd>
            <dt>
              <span id="link">
                <Translate contentKey="nghienCuuKhoaHocApp.danhsachbaibao.link">Link</Translate>
              </span>
            </dt>
            <dd>{danhsachbaibaoEntity.link}</dd>
            <dt>
              <span id="ghichu">
                <Translate contentKey="nghienCuuKhoaHocApp.danhsachbaibao.ghichu">Ghichu</Translate>
              </span>
            </dt>
            <dd>{danhsachbaibaoEntity.ghichu}</dd>
            <dt>
              <span id="tacgiachinh">
                <Translate contentKey="nghienCuuKhoaHocApp.danhsachbaibao.tacgiachinh">Tacgiachinh</Translate>
              </span>
            </dt>
            <dd>{danhsachbaibaoEntity.tacgiachinh}</dd>
            <dt>
              <span id="tacgiakhac">
                <Translate contentKey="nghienCuuKhoaHocApp.danhsachbaibao.tacgiakhac">Tacgiakhac</Translate>
              </span>
            </dt>
            <dd>{danhsachbaibaoEntity.tacgiakhac}</dd>
          </dl>
          <Button tag={Link} to="/danhsachbaibao" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>
          &nbsp;
          <Button tag={Link} to={`/danhsachbaibao/${danhsachbaibaoEntity.id}/edit`} replace color="primary">
            <FontAwesomeIcon icon="pencil-alt" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.edit">Edit</Translate>
            </span>
          </Button>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = ({ danhsachbaibao }: IRootState) => ({
  danhsachbaibaoEntity: danhsachbaibao.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DanhsachbaibaoDetail);
