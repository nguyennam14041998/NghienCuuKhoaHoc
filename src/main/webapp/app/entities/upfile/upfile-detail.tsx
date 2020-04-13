import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction, openFile, byteSize, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './upfile.reducer';
import { IUpfile } from 'app/shared/model/upfile.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IUpfileDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class UpfileDetail extends React.Component<IUpfileDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { upfileEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="nghienCuuKhoaHocApp.upfile.detail.title">Upfile</Translate> [<b>{upfileEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="mota">
                <Translate contentKey="nghienCuuKhoaHocApp.upfile.mota">Mota</Translate>
              </span>
            </dt>
            <dd>{upfileEntity.mota}</dd>
            <dt>
              <span id="noidung">
                <Translate contentKey="nghienCuuKhoaHocApp.upfile.noidung">Noidung</Translate>
              </span>
            </dt>
            <dd>
              {upfileEntity.noidung ? (
                <div>
                  <a onClick={openFile(upfileEntity.noidungContentType, upfileEntity.noidung)}>
                    <Translate contentKey="entity.action.open">Open</Translate>&nbsp;
                  </a>
                  <span>
                    {upfileEntity.noidungContentType}, {byteSize(upfileEntity.noidung)}
                  </span>
                </div>
              ) : null}
            </dd>
            <dt>
              <span id="thoigian">
                <Translate contentKey="nghienCuuKhoaHocApp.upfile.thoigian">Thoigian</Translate>
              </span>
            </dt>
            <dd>
              <TextFormat value={upfileEntity.thoigian} type="date" format={APP_LOCAL_DATE_FORMAT} />
            </dd>
            <dt>
              <Translate contentKey="nghienCuuKhoaHocApp.upfile.detai">Detai</Translate>
            </dt>
            <dd>{upfileEntity.detaiId ? upfileEntity.detaiId : ''}</dd>
            <dt>
              <Translate contentKey="nghienCuuKhoaHocApp.upfile.tiendo">Tiendo</Translate>
            </dt>
            <dd>{upfileEntity.tiendoId ? upfileEntity.tiendoId : ''}</dd>
          </dl>
          <Button tag={Link} to="/upfile" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>
          &nbsp;
          <Button tag={Link} to={`/upfile/${upfileEntity.id}/edit`} replace color="primary">
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

const mapStateToProps = ({ upfile }: IRootState) => ({
  upfileEntity: upfile.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UpfileDetail);
