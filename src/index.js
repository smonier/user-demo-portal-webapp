import React from 'react';
import ReactDOM from 'react-dom/client';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import App from './components/App';
// import reportWebVitals from './reportWebVitals';
import {CxsCtxProvider} from "./unomi/cxs";
import moment from 'moment/min/moment-with-locales';
import Moment from 'react-moment';
// import {StyledEngineProvider, unstable_ClassNameGenerator as ClassNameGenerator} from '@mui/material';
// import {getRandomString} from './misc/utils';
import {Store} from "./store";
import {JahiaCtxProvider} from "./context";

import { registerChartJs } from './utils/register-chart-js';
import {getClient} from "./graphql";
registerChartJs();

const render = (target,context) =>{

    Moment.globalMoment = moment;
    Moment.globalLocale = context.locale || 'en';

    // ClassNameGenerator.configure((componentName) => `${getRandomString(8, 'aA')}-${componentName}`);

    const root = ReactDOM.createRoot(document.getElementById(target));
    root.render(
        <React.StrictMode>
            <JahiaCtxProvider value={{
                workspace: context.workspace || 'LIVE',
                locale:context.locale || 'en',
                portalId:context.portalId,
            }}
            >
                <Store context={context}>
                {/*<StyledEngineProvider injectFirst>*/}
                <ApolloProvider client={getClient(context.gqlEndpoint)}>
                    <CxsCtxProvider>
                        <App />
                    </CxsCtxProvider>
                </ApolloProvider>
                {/*</StyledEngineProvider>*/}
                </Store>
            </JahiaCtxProvider>
        </React.StrictMode>
    )
};

window.userDashboardReact = render;
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
