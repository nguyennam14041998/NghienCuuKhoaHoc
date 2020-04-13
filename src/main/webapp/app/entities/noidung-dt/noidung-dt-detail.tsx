import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './noidung-dt.reducer';
import { INoidungDT } from 'app/shared/model/noidung-dt.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface INoidungDTDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class NoidungDTDetail extends React.Component<INoidungDTDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { noidungDTEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="nghienCuuKhoaHocApp.noidungDT.detail.title">NoidungDT</Translate> [<b>{noidungDTEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="tennoidung">
                <Translate contentKey="nghienCuuKhoaHocApp.noidungDT.tennoidung">Tennoidung</Translate>
              </span>
            </dt>
            <dd>{noidungDTEntity.tennoidung}</dd>
            <dt>
              <span id="sudung">
                <Translate contentKey="nghienCuuKhoaHocApp.noidungDT.sudung">Sudung</Translate>
              </span>
            </dt>
            <dd>{noidungDTEntity.sudung}</dd>
          </dl>
          <Button tag={Link} to="/noidung-dt" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>
          &nbsp;
          <Button tag={Link} to={`/noidung-dt/${noidungDTEntity.id}/edit`} replace color="primary">
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

const mapStateToProps = ({ noidungDT }: IRootState) => ({
  noidungDTEntity: noidungDT.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NoidungDTDetail);
