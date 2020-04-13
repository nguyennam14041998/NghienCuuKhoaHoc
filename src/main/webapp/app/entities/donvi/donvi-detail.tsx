import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './donvi.reducer';
import { IDonvi } from 'app/shared/model/donvi.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IDonviDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class DonviDetail extends React.Component<IDonviDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { donviEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="nghienCuuKhoaHocApp.donvi.detail.title">Donvi</Translate> [<b>{donviEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="madv">
                <Translate contentKey="nghienCuuKhoaHocApp.donvi.madv">Madv</Translate>
              </span>
            </dt>
            <dd>{donviEntity.madv}</dd>
            <dt>
              <span id="tendv">
                <Translate contentKey="nghienCuuKhoaHocApp.donvi.tendv">Tendv</Translate>
              </span>
            </dt>
            <dd>{donviEntity.tendv}</dd>
            <dt>
              <span id="dienthoai">
                <Translate contentKey="nghienCuuKhoaHocApp.donvi.dienthoai">Dienthoai</Translate>
              </span>
            </dt>
            <dd>{donviEntity.dienthoai}</dd>
            <dt>
              <span id="fax">
                <Translate contentKey="nghienCuuKhoaHocApp.donvi.fax">Fax</Translate>
              </span>
            </dt>
            <dd>{donviEntity.fax}</dd>
            <dt>
              <span id="email">
                <Translate contentKey="nghienCuuKhoaHocApp.donvi.email">Email</Translate>
              </span>
            </dt>
            <dd>{donviEntity.email}</dd>
            <dt>
              <span id="sudung">
                <Translate contentKey="nghienCuuKhoaHocApp.donvi.sudung">Sudung</Translate>
              </span>
            </dt>
            <dd>{donviEntity.sudung}</dd>
          </dl>
          <Button tag={Link} to="/donvi" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>
          &nbsp;
          <Button tag={Link} to={`/donvi/${donviEntity.id}/edit`} replace color="primary">
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

const mapStateToProps = ({ donvi }: IRootState) => ({
  donviEntity: donvi.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DonviDetail);
