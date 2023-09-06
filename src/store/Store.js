import React from "react";
import {StoreCtxProvider} from "../context";

const init = context => {
    const {locale} = context
    return {
        locale,
        userData:{}
    }
}
const reducer = (state, action) => {
    const { payload } = action;
    switch (action.type) {
        case "USER_DATA_READY":{
            const {userData} = payload;
            return {
                ...state,
                userData
            }
        }
        default:
            throw new Error(`[STORE] action case '${action.type}' is unknown `);
    };
}

export const Store = ({context,children}) => {
    const [state, dispatch] = React.useReducer(
        reducer,
        context,
        init
    );
    return (
        <StoreCtxProvider value={{ state, dispatch }}>
            {children}
        </StoreCtxProvider>
    );
};
