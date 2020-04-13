import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './danhgia-ct.reducer';
import { IDanhgiaCT } from 'app/shared/model/danhgia-ct.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IDanhgiaCTDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class DanhgiaCTDetail extends React.Component<IDanhgiaCTDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { danhgiaCTEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="nghienCuuKhoaHocApp.danhgiaCT.detail.title">DanhgiaCT</Translate> [<b>{danhgiaCTEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="diem">
                <Translate contentKey="nghienCuuKhoaHocApp.danhgiaCT.diem">Diem</Translate>
              </span>
            </dt>
            <dd>{danhgiaCTEntity.diem}</dd>
            <dt>
              <span id="sudung">
                <Translate contentKey="nghienCuuKhoaHocApp.danhgiaCT.sudung">Sudung</Translate>
              </span>
            </dt>
            <dd>{danhgiaCTEntity.sudung}</dd>
            <dt>
              <Translate contentKey="nghienCuuKhoaHocApp.danhgiaCT.danhgia">Danhgia</Translate>
            </dt>
            <dd>{danhgiaCTEntity.danhgiaId ? danhgiaCTEntity.danhgiaId : ''}</dd>
            <dt>
              <Translate contentKey="nghienCuuKhoaHocApp.danhgiaCT.noidungdanhgia">Noidungdanhgia</Translate>
            </dt>
            <dd>{danhgiaCTEntity.noidungdanhgiaId ? danhgiaCTEntity.noidungdanhgiaId : ''}</dd>
          </dl>
          <Button tag={Link} to="/danhgia-ct" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>
          &nbsp;
          <Button tag={Link} to={`/danhgia-ct/${danhgiaCTEntity.id}/edit`} replace color="primary">
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

const mapStateToProps = ({ danhgiaCT }: IRootState) => ({
  danhgiaCTEntity: danhgiaCT.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DanhgiaCTDetail);
