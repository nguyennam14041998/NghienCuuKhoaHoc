import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './nhansuthamgia.reducer';
import { INhansuthamgia } from 'app/shared/model/nhansuthamgia.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface INhansuthamgiaDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class NhansuthamgiaDetail extends React.Component<INhansuthamgiaDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { nhansuthamgiaEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="nghienCuuKhoaHocApp.nhansuthamgia.detail.title">Nhansuthamgia</Translate> [
            <b>{nhansuthamgiaEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="sudung">
                <Translate contentKey="nghienCuuKhoaHocApp.nhansuthamgia.sudung">Sudung</Translate>
              </span>
            </dt>
            <dd>{nhansuthamgiaEntity.sudung}</dd>
            <dt>
              <Translate contentKey="nghienCuuKhoaHocApp.nhansuthamgia.nhansu">Nhansu</Translate>
            </dt>
            <dd>{nhansuthamgiaEntity.nhansuId ? nhansuthamgiaEntity.nhansuId : ''}</dd>
            <dt>
              <Translate contentKey="nghienCuuKhoaHocApp.nhansuthamgia.detai">Detai</Translate>
            </dt>
            <dd>{nhansuthamgiaEntity.detaiId ? nhansuthamgiaEntity.detaiId : ''}</dd>
          </dl>
          <Button tag={Link} to="/nhansuthamgia" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>
          &nbsp;
          <Button tag={Link} to={`/nhansuthamgia/${nhansuthamgiaEntity.id}/edit`} replace color="primary">
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

const mapStateToProps = ({ nhansuthamgia }: IRootState) => ({
  nhansuthamgiaEntity: nhansuthamgia.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NhansuthamgiaDetail);
