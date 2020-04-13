import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './dutoan-kp.reducer';
import { IDutoanKP } from 'app/shared/model/dutoan-kp.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IDutoanKPDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class DutoanKPDetail extends React.Component<IDutoanKPDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { dutoanKPEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="nghienCuuKhoaHocApp.dutoanKP.detail.title">DutoanKP</Translate> [<b>{dutoanKPEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="madutoan">
                <Translate contentKey="nghienCuuKhoaHocApp.dutoanKP.madutoan">Madutoan</Translate>
              </span>
            </dt>
            <dd>{dutoanKPEntity.madutoan}</dd>
            <dt>
              <span id="tendutoan">
                <Translate contentKey="nghienCuuKhoaHocApp.dutoanKP.tendutoan">Tendutoan</Translate>
              </span>
            </dt>
            <dd>{dutoanKPEntity.tendutoan}</dd>
            <dt>
              <span id="noidung">
                <Translate contentKey="nghienCuuKhoaHocApp.dutoanKP.noidung">Noidung</Translate>
              </span>
            </dt>
            <dd>{dutoanKPEntity.noidung}</dd>
            <dt>
              <span id="sudung">
                <Translate contentKey="nghienCuuKhoaHocApp.dutoanKP.sudung">Sudung</Translate>
              </span>
            </dt>
            <dd>{dutoanKPEntity.sudung}</dd>
          </dl>
          <Button tag={Link} to="/dutoan-kp" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>
          &nbsp;
          <Button tag={Link} to={`/dutoan-kp/${dutoanKPEntity.id}/edit`} replace color="primary">
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

const mapStateToProps = ({ dutoanKP }: IRootState) => ({
  dutoanKPEntity: dutoanKP.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DutoanKPDetail);
