import React, { Component } from 'react';
import * as PropTypes from 'prop-types';
import {
  assoc,
  compose,
  dissoc,
  head,
  last,
  map,
  pipe,
  propOr,
  toPairs,
} from 'ramda';
import { withRouter } from 'react-router-dom';
import { QueryRenderer } from '../../../relay/environment';
import {
  buildViewParamsFromUrlAndStorage,
  saveViewParameters,
} from '../../../utils/ListParameters';
import inject18n from '../../../components/i18n';
import ListLines from '../../../components/list_lines/ListLines';
import CoursesOfActionLines, {
  coursesOfActionLinesQuery,
} from './courses_of_action/CoursesOfActionLines';
import CourseOfActionCreation from './courses_of_action/CourseOfActionCreation';
import Security, { KNOWLEDGE_KNUPDATE } from '../../../utils/Security';

class CoursesOfAction extends Component {
  constructor(props) {
    super(props);
    const params = buildViewParamsFromUrlAndStorage(
      props.history,
      props.location,
      'CoursesOfAction-view',
    );
    this.state = {
      sortBy: propOr('name', 'sortBy', params),
      orderAsc: propOr(true, 'orderAsc', params),
      searchTerm: propOr('', 'searchTerm', params),
      view: propOr('lines', 'view', params),
      filters: {},
      openExports: false,
      numberOfElements: { number: 0, symbol: '' },
    };
  }

  saveView() {
    saveViewParameters(
      this.props.history,
      this.props.location,
      'CoursesOfAction-view',
      dissoc('filters', this.state),
    );
  }

  handleSearch(value) {
    this.setState({ searchTerm: value }, () => this.saveView());
  }

  handleSort(field, orderAsc) {
    this.setState({ sortBy: field, orderAsc }, () => this.saveView());
  }

  handleToggleExports() {
    this.setState({ openExports: !this.state.openExports });
  }

  handleAddFilter(key, id, value, event) {
    event.stopPropagation();
    event.preventDefault();
    this.setState({
      filters: assoc(key, [{ id, value }], this.state.filters),
    });
  }

  handleRemoveFilter(key) {
    this.setState({ filters: dissoc(key, this.state.filters) });
  }

  setNumberOfElements(numberOfElements) {
    this.setState({ numberOfElements });
  }

  renderLines(paginationOptions) {
    const {
      sortBy,
      orderAsc,
      searchTerm,
      filters,
      openExports,
      numberOfElements,
    } = this.state;
    const dataColumns = {
      name: {
        label: 'Name',
        width: '35%',
        isSortable: true,
      },
      tags: {
        label: 'Tags',
        width: '25%',
        isSortable: true,
      },
      created: {
        label: 'Creation date',
        width: '15%',
        isSortable: true,
      },
      modified: {
        label: 'Modification date',
        width: '15%',
        isSortable: true,
      },
    };
    return (
      <ListLines
        sortBy={sortBy}
        orderAsc={orderAsc}
        dataColumns={dataColumns}
        handleSort={this.handleSort.bind(this)}
        handleSearch={this.handleSearch.bind(this)}
        handleRemoveFilter={this.handleRemoveFilter.bind(this)}
        handleToggleExports={this.handleToggleExports.bind(this)}
        openExports={openExports}
        exportEntityType="Course-Of-Action"
        keyword={searchTerm}
        filters={filters}
        paginationOptions={paginationOptions}
        numberOfElements={numberOfElements}
      >
        <QueryRenderer
          query={coursesOfActionLinesQuery}
          variables={{ count: 25, ...paginationOptions }}
          render={({ props }) => (
            <CoursesOfActionLines
              data={props}
              paginationOptions={paginationOptions}
              dataColumns={dataColumns}
              initialLoading={props === null}
              onTagClick={this.handleAddFilter.bind(this)}
              setNumberOfElements={this.setNumberOfElements.bind(this)}
            />
          )}
        />
      </ListLines>
    );
  }

  render() {
    const {
      view, sortBy, orderAsc, searchTerm, filters,
    } = this.state;
    const buildQueryFilters = pipe(
      toPairs,
      map((pair) => {
        const values = last(pair);
        const valIds = map((v) => v.id, values);
        return { key: head(pair), values: valIds };
      }),
    )(filters);
    const paginationOptions = {
      search: searchTerm,
      orderBy: sortBy,
      orderMode: orderAsc ? 'asc' : 'desc',
      filters: buildQueryFilters,
    };
    return (
      <div>
        {view === 'lines' ? this.renderLines(paginationOptions) : ''}
        <Security needs={[KNOWLEDGE_KNUPDATE]}>
          <CourseOfActionCreation paginationOptions={paginationOptions} />
        </Security>
      </div>
    );
  }
}

CoursesOfAction.propTypes = {
  t: PropTypes.func,
  history: PropTypes.object,
  location: PropTypes.object,
};

export default compose(inject18n, withRouter)(CoursesOfAction);
