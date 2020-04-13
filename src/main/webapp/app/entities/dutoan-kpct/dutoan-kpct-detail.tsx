import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './dutoan-kpct.reducer';
import { IDutoanKPCT } from 'app/shared/model/dutoan-kpct.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IDutoanKPCTDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class DutoanKPCTDetail extends React.Component<IDutoanKPCTDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { dutoanKPCTEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="nghienCuuKhoaHocApp.dutoanKPCT.detail.title">DutoanKPCT</Translate> [<b>{dutoanKPCTEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="soluong">
                <Translate contentKey="nghienCuuKhoaHocApp.dutoanKPCT.soluong">Soluong</Translate>
              </span>
            </dt>
            <dd>{dutoanKPCTEntity.soluong}</dd>
            <dt>
              <span id="mucchi">
                <Translate contentKey="nghienCuuKhoaHocApp.dutoanKPCT.mucchi">Mucchi</Translate>
              </span>
            </dt>
            <dd>{dutoanKPCTEntity.mucchi}</dd>
            <dt>
              <span id="tong">
                <Translate contentKey="nghienCuuKhoaHocApp.dutoanKPCT.tong">Tong</Translate>
              </span>
            </dt>
            <dd>{dutoanKPCTEntity.tong}</dd>
            <dt>
              <span id="sudung">
                <Translate contentKey="nghienCuuKhoaHocApp.dutoanKPCT.sudung">Sudung</Translate>
              </span>
            </dt>
            <dd>{dutoanKPCTEntity.sudung}</dd>
            <dt>
              <Translate contentKey="nghienCuuKhoaHocApp.dutoanKPCT.dutoanKP">Dutoan KP</Translate>
            </dt>
            <dd>{dutoanKPCTEntity.dutoanKPId ? dutoanKPCTEntity.dutoanKPId : ''}</dd>
            <dt>
              <Translate contentKey="nghienCuuKhoaHocApp.dutoanKPCT.noidungDT">Noidung DT</Translate>
            </dt>
            <dd>{dutoanKPCTEntity.noidungDTId ? dutoanKPCTEntity.noidungDTId : ''}</dd>
          </dl>
          <Button tag={Link} to="/dutoan-kpct" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>
          &nbsp;
          <Button tag={Link} to={`/dutoan-kpct/${dutoanKPCTEntity.id}/edit`} replace color="primary">
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

const mapStateToProps = ({ dutoanKPCT }: IRootState) => ({
  dutoanKPCTEntity: dutoanKPCT.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DutoanKPCTDetail);
