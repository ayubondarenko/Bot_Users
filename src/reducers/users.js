/**
 * Created by alexander on 23.01.18.
 */

export default function users(state = {data: []}, action) {

    if (action.type === 'REMOVE_USER_FILTER') {
        const newColumns = state.columns.map((col) => {
            return {...col, searchTerm: ''};
        });
        return {...state, columns: newColumns};
    }


    if (action.type === 'FILTER_USER_COL') {
        const newColumns = state.columns.map((col) => {
            if (col.name === action.payload.col.name) {
                const newCol = {...col, searchTerm: action.payload.searchTerm};
                return newCol;
            } else return col;
        });
        return {...state, columns: newColumns};
    }


    if (action.type === 'SET_USERS_COL') {
        const newColumns = state.columns.map((col) => {
            if (col.name === action.payload.col.name) {
                col.width = action.payload.width;
                const newCol = {...col, width: col.width};
                return newCol;
            } else return col;
        });
        return {...state, columns: newColumns};
    }

    if (action.type === 'MOVE_USERS_COL') {
        const newColumns = state.columns.map((col) => {
            if (col.name === action.payload.col.name) {
                col.width = col.width + action.payload.xDiff;
                if (col.width < action.payload.widthMin)
                    col.width = action.payload.widthMin;
                const newCol = {...col, width: col.width};
                return newCol;
            } else return col;
        });
        return {...state, columns: newColumns};
    }

    if (action.type === 'CHANGE_SEARCH_TERM') {
        if(action.payload) {
            const newColumns = state.columns.map((col) => {
                if (col.name === action.payload.col.name) {
                    return {...col, searchTerm: action.payload.searchTerm};
                } else return col;
            });
            return {...state, columns: newColumns};
        }
        return state;
    }

    if (action.type === 'SEARCH_USERS_SUCCESS') {
        if (!state.columns)
            return {
                ...action.payload,
                columns: [
                    {
                        num: 1,
                        name: "id",
                        title: "№",
                        type: "number",
                        width: 40
                    },
                    {
                        num: 2,
                        name: "avatarUrl",
                        title: "User avatar",
                        type: "avatar",
                        editable: true,
                        width: 100
                    },
                    {
                        num: 3,
                        name: "name",
                        title: "User name",
                        type: "string",
                        width: 100
                    }
                ]
            };
        else {
            return {...state, ...action.payload};
        }
    }

    return state

}
