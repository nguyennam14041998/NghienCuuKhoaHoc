import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './coquanphoihop.reducer';
import { ICoquanphoihop } from 'app/shared/model/coquanphoihop.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ICoquanphoihopDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class CoquanphoihopDetail extends React.Component<ICoquanphoihopDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { coquanphoihopEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="nghienCuuKhoaHocApp.coquanphoihop.detail.title">Coquanphoihop</Translate> [
            <b>{coquanphoihopEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="macoquan">
                <Translate contentKey="nghienCuuKhoaHocApp.coquanphoihop.macoquan">Macoquan</Translate>
              </span>
            </dt>
            <dd>{coquanphoihopEntity.macoquan}</dd>
            <dt>
              <span id="tencoquan">
                <Translate contentKey="nghienCuuKhoaHocApp.coquanphoihop.tencoquan">Tencoquan</Translate>
              </span>
            </dt>
            <dd>{coquanphoihopEntity.tencoquan}</dd>
            <dt>
              <span id="noidung">
                <Translate contentKey="nghienCuuKhoaHocApp.coquanphoihop.noidung">Noidung</Translate>
              </span>
            </dt>
            <dd>{coquanphoihopEntity.noidung}</dd>
            <dt>
              <span id="tendaidien">
                <Translate contentKey="nghienCuuKhoaHocApp.coquanphoihop.tendaidien">Tendaidien</Translate>
              </span>
            </dt>
            <dd>{coquanphoihopEntity.tendaidien}</dd>
            <dt>
              <span id="sudung">
                <Translate contentKey="nghienCuuKhoaHocApp.coquanphoihop.sudung">Sudung</Translate>
              </span>
            </dt>
            <dd>{coquanphoihopEntity.sudung}</dd>
          </dl>
          <Button tag={Link} to="/coquanphoihop" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>
          &nbsp;
          <Button tag={Link} to={`/coquanphoihop/${coquanphoihopEntity.id}/edit`} replace color="primary">
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

const mapStateToProps = ({ coquanphoihop }: IRootState) => ({
  coquanphoihopEntity: coquanphoihop.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CoquanphoihopDetail);
