import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './danhgia.reducer';
import { IDanhgia } from 'app/shared/model/danhgia.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IDanhgiaDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class DanhgiaDetail extends React.Component<IDanhgiaDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { danhgiaEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="nghienCuuKhoaHocApp.danhgia.detail.title">Danhgia</Translate> [<b>{danhgiaEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="ma">
                <Translate contentKey="nghienCuuKhoaHocApp.danhgia.ma">Ma</Translate>
              </span>
            </dt>
            <dd>{danhgiaEntity.ma}</dd>
            <dt>
              <span id="ten">
                <Translate contentKey="nghienCuuKhoaHocApp.danhgia.ten">Ten</Translate>
              </span>
            </dt>
            <dd>{danhgiaEntity.ten}</dd>
            <dt>
              <span id="diem">
                <Translate contentKey="nghienCuuKhoaHocApp.danhgia.diem">Diem</Translate>
              </span>
            </dt>
            <dd>{danhgiaEntity.diem}</dd>
            <dt>
              <span id="noidung">
                <Translate contentKey="nghienCuuKhoaHocApp.danhgia.noidung">Noidung</Translate>
              </span>
            </dt>
            <dd>{danhgiaEntity.noidung}</dd>
            <dt>
              <span id="sudung">
                <Translate contentKey="nghienCuuKhoaHocApp.danhgia.sudung">Sudung</Translate>
              </span>
            </dt>
            <dd>{danhgiaEntity.sudung}</dd>
          </dl>
          <Button tag={Link} to="/danhgia" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>
          &nbsp;
          <Button tag={Link} to={`/danhgia/${danhgiaEntity.id}/edit`} replace color="primary">
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

const mapStateToProps = ({ danhgia }: IRootState) => ({
  danhgiaEntity: danhgia.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DanhgiaDetail);
