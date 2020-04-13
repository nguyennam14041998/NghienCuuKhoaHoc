import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './hocham.reducer';
import { IHocham } from 'app/shared/model/hocham.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IHochamDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class HochamDetail extends React.Component<IHochamDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { hochamEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="nghienCuuKhoaHocApp.hocham.detail.title">Hocham</Translate> [<b>{hochamEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="mahocham">
                <Translate contentKey="nghienCuuKhoaHocApp.hocham.mahocham">Mahocham</Translate>
              </span>
            </dt>
            <dd>{hochamEntity.mahocham}</dd>
            <dt>
              <span id="tenhocham">
                <Translate contentKey="nghienCuuKhoaHocApp.hocham.tenhocham">Tenhocham</Translate>
              </span>
            </dt>
            <dd>{hochamEntity.tenhocham}</dd>
            <dt>
              <span id="sudung">
                <Translate contentKey="nghienCuuKhoaHocApp.hocham.sudung">Sudung</Translate>
              </span>
            </dt>
            <dd>{hochamEntity.sudung}</dd>
          </dl>
          <Button tag={Link} to="/hocham" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>
          &nbsp;
          <Button tag={Link} to={`/hocham/${hochamEntity.id}/edit`} replace color="primary">
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

const mapStateToProps = ({ hocham }: IRootState) => ({
  hochamEntity: hocham.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HochamDetail);
