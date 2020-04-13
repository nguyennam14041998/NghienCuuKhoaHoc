import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './thanhvien-hd.reducer';
import { IThanhvienHD } from 'app/shared/model/thanhvien-hd.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IThanhvienHDDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class ThanhvienHDDetail extends React.Component<IThanhvienHDDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { thanhvienHDEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="nghienCuuKhoaHocApp.thanhvienHD.detail.title">ThanhvienHD</Translate> [<b>{thanhvienHDEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="ten">
                <Translate contentKey="nghienCuuKhoaHocApp.thanhvienHD.ten">Ten</Translate>
              </span>
            </dt>
            <dd>{thanhvienHDEntity.ten}</dd>
            <dt>
              <span id="donvi">
                <Translate contentKey="nghienCuuKhoaHocApp.thanhvienHD.donvi">Donvi</Translate>
              </span>
            </dt>
            <dd>{thanhvienHDEntity.donvi}</dd>
            <dt>
              <span id="trachnhiem">
                <Translate contentKey="nghienCuuKhoaHocApp.thanhvienHD.trachnhiem">Trachnhiem</Translate>
              </span>
            </dt>
            <dd>{thanhvienHDEntity.trachnhiem}</dd>
            <dt>
              <span id="sudung">
                <Translate contentKey="nghienCuuKhoaHocApp.thanhvienHD.sudung">Sudung</Translate>
              </span>
            </dt>
            <dd>{thanhvienHDEntity.sudung}</dd>
            <dt>
              <Translate contentKey="nghienCuuKhoaHocApp.thanhvienHD.hoidongdanhgia">Hoidongdanhgia</Translate>
            </dt>
            <dd>{thanhvienHDEntity.hoidongdanhgiaId ? thanhvienHDEntity.hoidongdanhgiaId : ''}</dd>
          </dl>
          <Button tag={Link} to="/thanhvien-hd" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>
          &nbsp;
          <Button tag={Link} to={`/thanhvien-hd/${thanhvienHDEntity.id}/edit`} replace color="primary">
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

const mapStateToProps = ({ thanhvienHD }: IRootState) => ({
  thanhvienHDEntity: thanhvienHD.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ThanhvienHDDetail);
