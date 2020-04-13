import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './noidungdanhgia.reducer';
import { INoidungdanhgia } from 'app/shared/model/noidungdanhgia.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface INoidungdanhgiaDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class NoidungdanhgiaDetail extends React.Component<INoidungdanhgiaDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { noidungdanhgiaEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="nghienCuuKhoaHocApp.noidungdanhgia.detail.title">Noidungdanhgia</Translate> [
            <b>{noidungdanhgiaEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="noidung">
                <Translate contentKey="nghienCuuKhoaHocApp.noidungdanhgia.noidung">Noidung</Translate>
              </span>
            </dt>
            <dd>{noidungdanhgiaEntity.noidung}</dd>
            <dt>
              <span id="sudung">
                <Translate contentKey="nghienCuuKhoaHocApp.noidungdanhgia.sudung">Sudung</Translate>
              </span>
            </dt>
            <dd>{noidungdanhgiaEntity.sudung}</dd>
          </dl>
          <Button tag={Link} to="/noidungdanhgia" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>
          &nbsp;
          <Button tag={Link} to={`/noidungdanhgia/${noidungdanhgiaEntity.id}/edit`} replace color="primary">
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

const mapStateToProps = ({ noidungdanhgia }: IRootState) => ({
  noidungdanhgiaEntity: noidungdanhgia.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NoidungdanhgiaDetail);
