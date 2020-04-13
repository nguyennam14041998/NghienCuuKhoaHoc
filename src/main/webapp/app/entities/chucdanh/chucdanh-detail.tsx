import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './chucdanh.reducer';
import { IChucdanh } from 'app/shared/model/chucdanh.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IChucdanhDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class ChucdanhDetail extends React.Component<IChucdanhDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { chucdanhEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="nghienCuuKhoaHocApp.chucdanh.detail.title">Chucdanh</Translate> [<b>{chucdanhEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="machucdanh">
                <Translate contentKey="nghienCuuKhoaHocApp.chucdanh.machucdanh">Machucdanh</Translate>
              </span>
            </dt>
            <dd>{chucdanhEntity.machucdanh}</dd>
            <dt>
              <span id="tenchucdanh">
                <Translate contentKey="nghienCuuKhoaHocApp.chucdanh.tenchucdanh">Tenchucdanh</Translate>
              </span>
            </dt>
            <dd>{chucdanhEntity.tenchucdanh}</dd>
            <dt>
              <span id="sudung">
                <Translate contentKey="nghienCuuKhoaHocApp.chucdanh.sudung">Sudung</Translate>
              </span>
            </dt>
            <dd>{chucdanhEntity.sudung}</dd>
          </dl>
          <Button tag={Link} to="/chucdanh" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>
          &nbsp;
          <Button tag={Link} to={`/chucdanh/${chucdanhEntity.id}/edit`} replace color="primary">
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

const mapStateToProps = ({ chucdanh }: IRootState) => ({
  chucdanhEntity: chucdanh.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChucdanhDetail);
