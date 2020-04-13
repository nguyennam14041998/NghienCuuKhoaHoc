import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './hoidongdanhgia.reducer';
import { IHoidongdanhgia } from 'app/shared/model/hoidongdanhgia.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IHoidongdanhgiaDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class HoidongdanhgiaDetail extends React.Component<IHoidongdanhgiaDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { hoidongdanhgiaEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="nghienCuuKhoaHocApp.hoidongdanhgia.detail.title">Hoidongdanhgia</Translate> [
            <b>{hoidongdanhgiaEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="mahoidong">
                <Translate contentKey="nghienCuuKhoaHocApp.hoidongdanhgia.mahoidong">Mahoidong</Translate>
              </span>
            </dt>
            <dd>{hoidongdanhgiaEntity.mahoidong}</dd>
            <dt>
              <span id="tenhoidong">
                <Translate contentKey="nghienCuuKhoaHocApp.hoidongdanhgia.tenhoidong">Tenhoidong</Translate>
              </span>
            </dt>
            <dd>{hoidongdanhgiaEntity.tenhoidong}</dd>
            <dt>
              <span id="sudung">
                <Translate contentKey="nghienCuuKhoaHocApp.hoidongdanhgia.sudung">Sudung</Translate>
              </span>
            </dt>
            <dd>{hoidongdanhgiaEntity.sudung}</dd>
          </dl>
          <Button tag={Link} to="/hoidongdanhgia" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>
          &nbsp;
          <Button tag={Link} to={`/hoidongdanhgia/${hoidongdanhgiaEntity.id}/edit`} replace color="primary">
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

const mapStateToProps = ({ hoidongdanhgia }: IRootState) => ({
  hoidongdanhgiaEntity: hoidongdanhgia.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HoidongdanhgiaDetail);
