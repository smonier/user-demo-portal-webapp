import React, {useContext} from "react";
import {CxsCtx} from "../unomi/cxs";
import {JahiaCtx, StoreCtx} from "../context";
import {getUserContext} from "../data/context";

import {Box, Grid, Container, ThemeProvider,styled} from "@mui/material"

import {VisitFirst, VisitLast, AccountProfile, VisitNumber, ProductCard} from "./user";
import {Leads} from "./sfdc";
import {mergedTheme} from "../theme";
import {Chart} from "./misc";
import {Ads} from "./ads";
// import {QuizOverview} from "./quiz";

import {userProfile,products as mocksProducts} from "../__mocks__";
import {queryUserPortal} from "../graphql-app"
import {useQuery} from "@apollo/client";



const PortalLayoutRoot = styled('div')(({ theme }) => ({
  background: theme.palette.background.default,
}));


const App = () => {
  const cxs = useContext(CxsCtx);
  const { workspace,portalId } = useContext(JahiaCtx);
  const { state, dispatch } = useContext(StoreCtx);
  const { locale } = state;
// console.log("portalId",portalId)
  const {loading, error, data} = useQuery(queryUserPortal, {
    variables:{
      workspace,
      language:locale,
      id:portalId
    },
  });

  React.useEffect(() => {
    if(!cxs && (!process.env.NODE_ENV || process.env.NODE_ENV === 'development')){
      dispatch({
        type:"USER_DATA_READY",
        payload:{
          userData:userProfile
        }
      });
    }

    // console.log("[App] cxs : ",cxs);
    if(cxs)
      getUserContext(cxs,dispatch);

  }, [cxs]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;
  const portalData = data?.jcr?.nodeById;
  const userTheme = portalData?.userTheme?.value || {};

  let products = mocksProducts;
  const customProducts = portalData?.products?.value;
  if(typeof customProducts === 'string'){
    try{
      products = JSON.parse(customProducts);
    }catch(e){
      console.error("products property => \n"+customProducts+"\n => is not a json object : ",e);
    }
  };

  return (
    <ThemeProvider theme={mergedTheme(userTheme)}>
      <PortalLayoutRoot>
        <Box
          component="main"
          sx={{
            alignItems: 'center',
            display: 'flex',
            flexGrow: 1,
            minHeight: '100%'
          }}
        >
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>

              <Grid item xs={12} md={4}>
                <VisitLast />
              </Grid>
              <Grid item xs={12} md={4}>
                <VisitNumber />
              </Grid>
              <Grid item xs={12}  md={4}>
                <VisitFirst />
              </Grid>

              <Grid item xs={12} sm={4} md={3} >
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <AccountProfile portalData={portalData}/>
                  </Grid>
                  <Grid item xs={12}>
                    <Chart customChartData={portalData?.chart?.value} />
                  </Grid>
                </Grid>
              </Grid>

              <Grid item xs={12} sm={8} md={9} >
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <Leads />
                  </Grid>
                  <Grid item xs={12}>
                    <Box >
                      <Grid
                          container
                          spacing={3}
                      >
                        {products.map((product) => (
                            <Grid
                                item
                                key={product.id}
                                md={6}
                                xs={12}
                            >
                              <ProductCard product={product} />
                            </Grid>
                        ))}
                      </Grid>
                    </Box>
                  </Grid>
                </Grid>
              </Grid>

              <Grid item xs={12} >
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6}>
                    <Ads adsid={portalData?.personalizedAds?.refNode?.uuid}/>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Container>
        </Box>
      </PortalLayoutRoot>
    </ThemeProvider>
  );
}

export default App;
