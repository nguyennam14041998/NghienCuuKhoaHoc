import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './linhvuc.reducer';
import { ILinhvuc } from 'app/shared/model/linhvuc.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ILinhvucDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class LinhvucDetail extends React.Component<ILinhvucDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { linhvucEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="nghienCuuKhoaHocApp.linhvuc.detail.title">Linhvuc</Translate> [<b>{linhvucEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="malv">
                <Translate contentKey="nghienCuuKhoaHocApp.linhvuc.malv">Malv</Translate>
              </span>
            </dt>
            <dd>{linhvucEntity.malv}</dd>
            <dt>
              <span id="tenlv">
                <Translate contentKey="nghienCuuKhoaHocApp.linhvuc.tenlv">Tenlv</Translate>
              </span>
            </dt>
            <dd>{linhvucEntity.tenlv}</dd>
            <dt>
              <span id="sudung">
                <Translate contentKey="nghienCuuKhoaHocApp.linhvuc.sudung">Sudung</Translate>
              </span>
            </dt>
            <dd>{linhvucEntity.sudung}</dd>
          </dl>
          <Button tag={Link} to="/linhvuc" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>
          &nbsp;
          <Button tag={Link} to={`/linhvuc/${linhvucEntity.id}/edit`} replace color="primary">
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

const mapStateToProps = ({ linhvuc }: IRootState) => ({
  linhvucEntity: linhvuc.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LinhvucDetail);
