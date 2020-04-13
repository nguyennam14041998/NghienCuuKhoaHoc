import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './chunhiem.reducer';
import { IChunhiem } from 'app/shared/model/chunhiem.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IChunhiemDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class ChunhiemDetail extends React.Component<IChunhiemDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { chunhiemEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="nghienCuuKhoaHocApp.chunhiem.detail.title">Chunhiem</Translate> [<b>{chunhiemEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="sudung">
                <Translate contentKey="nghienCuuKhoaHocApp.chunhiem.sudung">Sudung</Translate>
              </span>
            </dt>
            <dd>{chunhiemEntity.sudung}</dd>
            <dt>
              <Translate contentKey="nghienCuuKhoaHocApp.chunhiem.nhansu">Nhansu</Translate>
            </dt>
            <dd>{chunhiemEntity.nhansuId ? chunhiemEntity.nhansuId : ''}</dd>
          </dl>
          <Button tag={Link} to="/chunhiem" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>
          &nbsp;
          <Button tag={Link} to={`/chunhiem/${chunhiemEntity.id}/edit`} replace color="primary">
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

const mapStateToProps = ({ chunhiem }: IRootState) => ({
  chunhiemEntity: chunhiem.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChunhiemDetail);
