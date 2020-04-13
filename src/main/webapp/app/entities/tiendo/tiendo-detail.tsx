import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './tiendo.reducer';
import { ITiendo } from 'app/shared/model/tiendo.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ITiendoDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class TiendoDetail extends React.Component<ITiendoDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { tiendoEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="nghienCuuKhoaHocApp.tiendo.detail.title">Tiendo</Translate> [<b>{tiendoEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="matiendo">
                <Translate contentKey="nghienCuuKhoaHocApp.tiendo.matiendo">Matiendo</Translate>
              </span>
            </dt>
            <dd>{tiendoEntity.matiendo}</dd>
            <dt>
              <span id="kybaocao">
                <Translate contentKey="nghienCuuKhoaHocApp.tiendo.kybaocao">Kybaocao</Translate>
              </span>
            </dt>
            <dd>{tiendoEntity.kybaocao}</dd>
            <dt>
              <span id="noidung">
                <Translate contentKey="nghienCuuKhoaHocApp.tiendo.noidung">Noidung</Translate>
              </span>
            </dt>
            <dd>{tiendoEntity.noidung}</dd>
            <dt>
              <span id="thoigianbatdau">
                <Translate contentKey="nghienCuuKhoaHocApp.tiendo.thoigianbatdau">Thoigianbatdau</Translate>
              </span>
            </dt>
            <dd>
              <TextFormat value={tiendoEntity.thoigianbatdau} type="date" format={APP_LOCAL_DATE_FORMAT} />
            </dd>
            <dt>
              <span id="thoigianketthuc">
                <Translate contentKey="nghienCuuKhoaHocApp.tiendo.thoigianketthuc">Thoigianketthuc</Translate>
              </span>
            </dt>
            <dd>
              <TextFormat value={tiendoEntity.thoigianketthuc} type="date" format={APP_LOCAL_DATE_FORMAT} />
            </dd>
            <dt>
              <span id="khoiluonghoanthanh">
                <Translate contentKey="nghienCuuKhoaHocApp.tiendo.khoiluonghoanthanh">Khoiluonghoanthanh</Translate>
              </span>
            </dt>
            <dd>{tiendoEntity.khoiluonghoanthanh}</dd>
            <dt>
              <span id="ghichu">
                <Translate contentKey="nghienCuuKhoaHocApp.tiendo.ghichu">Ghichu</Translate>
              </span>
            </dt>
            <dd>{tiendoEntity.ghichu}</dd>
            <dt>
              <span id="sudung">
                <Translate contentKey="nghienCuuKhoaHocApp.tiendo.sudung">Sudung</Translate>
              </span>
            </dt>
            <dd>{tiendoEntity.sudung}</dd>
            <dt>
              <Translate contentKey="nghienCuuKhoaHocApp.tiendo.detai">Detai</Translate>
            </dt>
            <dd>{tiendoEntity.detaiId ? tiendoEntity.detaiId : ''}</dd>
          </dl>
          <Button tag={Link} to="/tiendo" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>
          &nbsp;
          <Button tag={Link} to={`/tiendo/${tiendoEntity.id}/edit`} replace color="primary">
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

const mapStateToProps = ({ tiendo }: IRootState) => ({
  tiendoEntity: tiendo.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TiendoDetail);
