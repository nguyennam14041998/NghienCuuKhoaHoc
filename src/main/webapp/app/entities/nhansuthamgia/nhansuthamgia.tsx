import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { Translate, ICrudGetAllAction, getSortState, IPaginationBaseState, JhiPagination, JhiItemCount } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './nhansuthamgia.reducer';
import { INhansuthamgia } from 'app/shared/model/nhansuthamgia.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { ITEMS_PER_PAGE } from 'app/shared/util/pagination.constants';

export interface INhansuthamgiaProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export type INhansuthamgiaState = IPaginationBaseState;

export class Nhansuthamgia extends React.Component<INhansuthamgiaProps, INhansuthamgiaState> {
  state: INhansuthamgiaState = {
    ...getSortState(this.props.location, ITEMS_PER_PAGE)
  };

  componentDidMount() {
    this.getEntities();
  }

  sort = prop => () => {
    this.setState(
      {
        order: this.state.order === 'asc' ? 'desc' : 'asc',
        sort: prop
      },
      () => this.sortEntities()
    );
  };

  sortEntities() {
    this.getEntities();
    this.props.history.push(`${this.props.location.pathname}?page=${this.state.activePage}&sort=${this.state.sort},${this.state.order}`);
  }

  handlePagination = activePage => this.setState({ activePage }, () => this.sortEntities());

  getEntities = () => {
    const { activePage, itemsPerPage, sort, order } = this.state;
    this.props.getEntities(activePage - 1, itemsPerPage, `${sort},${order}`);
  };

  render() {
    const { nhansuthamgiaList, match, totalItems } = this.props;
    return (
      <div>
        <h2 id="nhansuthamgia-heading">
          <Translate contentKey="nghienCuuKhoaHocApp.nhansuthamgia.home.title">Nhansuthamgias</Translate>
          <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="nghienCuuKhoaHocApp.nhansuthamgia.home.createLabel">Create a new Nhansuthamgia</Translate>
          </Link>
        </h2>
        <div className="table-responsive">
          {nhansuthamgiaList && nhansuthamgiaList.length > 0 ? (
            <Table responsive aria-describedby="nhansuthamgia-heading">
              <thead>
                <tr>
                  <th className="hand" onClick={this.sort('id')}>
                    <Translate contentKey="global.field.id">ID</Translate> <FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={this.sort('sudung')}>
                    <Translate contentKey="nghienCuuKhoaHocApp.nhansuthamgia.sudung">Sudung</Translate> <FontAwesomeIcon icon="sort" />
                  </th>
                  <th>
                    <Translate contentKey="nghienCuuKhoaHocApp.nhansuthamgia.nhansu">Nhansu</Translate> <FontAwesomeIcon icon="sort" />
                  </th>
                  <th>
                    <Translate contentKey="nghienCuuKhoaHocApp.nhansuthamgia.detai">Detai</Translate> <FontAwesomeIcon icon="sort" />
                  </th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {nhansuthamgiaList.map((nhansuthamgia, i) => (
                  <tr key={`entity-${i}`}>
                    <td>
                      <Button tag={Link} to={`${match.url}/${nhansuthamgia.id}`} color="link" size="sm">
                        {nhansuthamgia.id}
                      </Button>
                    </td>
                    <td>{nhansuthamgia.sudung}</td>
                    <td>{nhansuthamgia.nhansuId ? <Link to={`nhansu/${nhansuthamgia.nhansuId}`}>{nhansuthamgia.nhansuId}</Link> : ''}</td>
                    <td>{nhansuthamgia.detaiId ? <Link to={`detai/${nhansuthamgia.detaiId}`}>{nhansuthamgia.detaiId}</Link> : ''}</td>
                    <td className="text-right">
                      <div className="btn-group flex-btn-group-container">
                        <Button tag={Link} to={`${match.url}/${nhansuthamgia.id}`} color="info" size="sm">
                          <FontAwesomeIcon icon="eye" />{' '}
                          <span className="d-none d-md-inline">
                            <Translate contentKey="entity.action.view">View</Translate>
                          </span>
                        </Button>
                        <Button tag={Link} to={`${match.url}/${nhansuthamgia.id}/edit`} color="primary" size="sm">
                          <FontAwesomeIcon icon="pencil-alt" />{' '}
                          <span className="d-none d-md-inline">
                            <Translate contentKey="entity.action.edit">Edit</Translate>
                          </span>
                        </Button>
                        <Button tag={Link} to={`${match.url}/${nhansuthamgia.id}/delete`} color="danger" size="sm">
                          <FontAwesomeIcon icon="trash" />{' '}
                          <span className="d-none d-md-inline">
                            <Translate contentKey="entity.action.delete">Delete</Translate>
                          </span>
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          ) : (
            <div className="alert alert-warning">
              <Translate contentKey="nghienCuuKhoaHocApp.nhansuthamgia.home.notFound">No Nhansuthamgias found</Translate>
            </div>
          )}
        </div>
        <div className={nhansuthamgiaList && nhansuthamgiaList.length > 0 ? '' : 'd-none'}>
          <Row className="justify-content-center">
            <JhiItemCount page={this.state.activePage} total={totalItems} itemsPerPage={this.state.itemsPerPage} i18nEnabled />
          </Row>
          <Row className="justify-content-center">
            <JhiPagination
              activePage={this.state.activePage}
              onSelect={this.handlePagination}
              maxButtons={5}
              itemsPerPage={this.state.itemsPerPage}
              totalItems={this.props.totalItems}
            />
          </Row>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ nhansuthamgia }: IRootState) => ({
  nhansuthamgiaList: nhansuthamgia.entities,
  totalItems: nhansuthamgia.totalItems
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Nhansuthamgia);
