import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './coquanphoihopthamgia.reducer';
import { ICoquanphoihopthamgia } from 'app/shared/model/coquanphoihopthamgia.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ICoquanphoihopthamgiaDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class CoquanphoihopthamgiaDetail extends React.Component<ICoquanphoihopthamgiaDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { coquanphoihopthamgiaEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="nghienCuuKhoaHocApp.coquanphoihopthamgia.detail.title">Coquanphoihopthamgia</Translate> [
            <b>{coquanphoihopthamgiaEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="sudung">
                <Translate contentKey="nghienCuuKhoaHocApp.coquanphoihopthamgia.sudung">Sudung</Translate>
              </span>
            </dt>
            <dd>{coquanphoihopthamgiaEntity.sudung}</dd>
            <dt>
              <Translate contentKey="nghienCuuKhoaHocApp.coquanphoihopthamgia.detai">Detai</Translate>
            </dt>
            <dd>{coquanphoihopthamgiaEntity.detaiId ? coquanphoihopthamgiaEntity.detaiId : ''}</dd>
            <dt>
              <Translate contentKey="nghienCuuKhoaHocApp.coquanphoihopthamgia.coquanphoihop">Coquanphoihop</Translate>
            </dt>
            <dd>{coquanphoihopthamgiaEntity.coquanphoihopId ? coquanphoihopthamgiaEntity.coquanphoihopId : ''}</dd>
          </dl>
          <Button tag={Link} to="/coquanphoihopthamgia" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>
          &nbsp;
          <Button tag={Link} to={`/coquanphoihopthamgia/${coquanphoihopthamgiaEntity.id}/edit`} replace color="primary">
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

const mapStateToProps = ({ coquanphoihopthamgia }: IRootState) => ({
  coquanphoihopthamgiaEntity: coquanphoihopthamgia.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CoquanphoihopthamgiaDetail);
