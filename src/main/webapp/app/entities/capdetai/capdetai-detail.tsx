import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './capdetai.reducer';
import { ICapdetai } from 'app/shared/model/capdetai.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ICapdetaiDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class CapdetaiDetail extends React.Component<ICapdetaiDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { capdetaiEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="nghienCuuKhoaHocApp.capdetai.detail.title">Capdetai</Translate> [<b>{capdetaiEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="macapdetai">
                <Translate contentKey="nghienCuuKhoaHocApp.capdetai.macapdetai">Macapdetai</Translate>
              </span>
            </dt>
            <dd>{capdetaiEntity.macapdetai}</dd>
            <dt>
              <span id="tencapdetai">
                <Translate contentKey="nghienCuuKhoaHocApp.capdetai.tencapdetai">Tencapdetai</Translate>
              </span>
            </dt>
            <dd>{capdetaiEntity.tencapdetai}</dd>
            <dt>
              <span id="sudung">
                <Translate contentKey="nghienCuuKhoaHocApp.capdetai.sudung">Sudung</Translate>
              </span>
            </dt>
            <dd>{capdetaiEntity.sudung}</dd>
          </dl>
          <Button tag={Link} to="/capdetai" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>
          &nbsp;
          <Button tag={Link} to={`/capdetai/${capdetaiEntity.id}/edit`} replace color="primary">
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

const mapStateToProps = ({ capdetai }: IRootState) => ({
  capdetaiEntity: capdetai.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CapdetaiDetail);
