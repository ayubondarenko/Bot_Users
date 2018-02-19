/**
 * Created by alexander on 23.01.18.
 */
import React, {Component} from "react";
import {connect} from "react-redux";
import {StickyContainer, Sticky} from "react-sticky";
import TableBody from "../components/TableBody.jsx";


class BotUsers extends Component {

    filterStrByName = '';

    colByName = (name) => {
        return this.props.users.columns ?
            this.props.users.columns.filter(col => (col.name === name))[0]
            : {searchTerm: ''};
    };

    onSearchRemove = () => {
        this.props.onRemoveSearch();
        this.props.onSearchCol(this.colByName('name'), '');
    };

    onSearchByUserName = (evt) => {
        this.props.onSearchCol(this.colByName('name'), evt.target.value);
    };
    onPreviousPage = () => {
        this.props.goToPage(this.props.users.previousPageUrl);
    };

    onNextPage = () => {
        this.props.goToPage(this.props.users.nextPageUrl);
    };

    render() {
        this.filterStrByName = this.colByName('name').searchTerm;

        return (
            <StickyContainer>
                <Sticky>
                    {({style}) => (
                        <nav style={style}
                             class="navbar navbar-default bg-dark  navbarText d-flex">

                            <span class="glyphicon glyphicon-search"
                                  style={{paddingRight: '20px'}}></span>
                            <div class="navbar-form navbar-left">
                                <input
                                    type="text"
                                    onChange={this.onSearchByUserName}
                                    value={this.filterStrByName}
                                    class="form-control"
                                    placeholder="Search"/>
                            </div>
                            <button onClick={this.onSearchRemove}
                                  style={{marginLeft: '20px'}}
                                  data-toggle="tooltip" data-placement="bottom" title="clean"
                                  class="glyphicon glyphicon-remove bg-dark btn btn-secondary">
                            </button>
                            <button onClick={this.onPreviousPage}
                                    disabled={!this.props.users.previousPageUrl}
                                    style={{marginLeft: '20px'}}
                                    type="button"
                                    data-toggle="tooltip" data-placement="bottom" title="previous page"
                                    class="glyphicon glyphicon-chevron-left bg-dark btn btn-secondary">
                            </button>
                            <button onClick={this.onNextPage}
                                    disabled={!this.props.users.nextPageUrl}
                                    style={{marginLeft: '20px'}}
                                    type="button"
                                    data-toggle="tooltip" data-placement="bottom" title="next page"
                                    class="glyphicon glyphicon-chevron-right bg-dark btn btn-secondary">
                            </button>


                            <div class="ml-auto">
                                <h3>
                                <span class="glyphicon glyphicon-user"
                                      style={{paddingRight: '20px'}}></span>
                                    Bot's users
                                </h3>
                            </div>
                        </nav>
                    )}
                </Sticky>
                <TableBody
                    onColSearch={this.props.onSearchColumn}
                    onColMove={this.props.onColMove}
                    onColSet={this.props.onColSet}
                    sort={this.props.users.sort}
                    columns={this.props.users.columns}
                    data={this.props.users.result}
                    dataName={'USER'}
                />
            </StickyContainer>
        )
    }
}

export default connect(state => ({users: state.users}),
    dispatch => ({

        onColSet: (col, widthMin) => {
            dispatch({
                type: 'SET_USERS_COL', payload: {col: col, width: widthMin}
            });
        },

        onColMove: (col, xDiff, widthMin) => {
            dispatch({
                type: 'MOVE_USERS_COL', payload: {col: col, xDiff: xDiff, widthMin: widthMin}
            });
        },
        onSortColumn: (col) => {
            dispatch({
                type: 'SORT_USERS_COL', payload: col
            });
        },
        onSearchCol: (col, searchTerm) => {
            dispatch({
                type: 'SEARCH_DATA', payload: {
                    col: col,
                    searchTerm: searchTerm
                }
            });
        },
        onRemoveSearch: () => {
            dispatch({
                type: 'REMOVE_USER_FILTER', payload: {}
            });
        },
        goToPage: (url) => {
            dispatch({type: 'GET_USER_PAGE', payload: {url: url}});
        }


    })
)(BotUsers)
