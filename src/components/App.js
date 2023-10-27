import React, {useContext} from "react";
import {CxsCtx} from "../unomi/cxs";
import {JahiaCtx, StoreCtx} from "../context";
import {getUserContext} from "../data/context";

import {Box, Grid, Container, ThemeProvider,styled} from "@mui/material"

import {VisitFirst, VisitLast, AccountProfile, VisitNumber, ProductCard} from "./user";
import {Leads} from "./sfdc";
import {mergedTheme} from "../theme";
import {Chart} from "./misc";
import {MultiChart} from "./misc";
import {Ads} from "./ads";
import {Orders} from "./e-shop";
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
  const customProducts = portalData?.products?.value || portalData?.mocks?.refNode?.products?.value;
  if(typeof customProducts === 'string'){
    try{
      products = JSON.parse(customProducts);
    }catch(e){
      console.error("products property => \n"+customProducts+"\n => is not a json object : ",e);
    }
  };

  const customMultiChartData = portalData?.salesChart?.value || portalData?.mocks?.refNode?.salesChart?.value;
  const customChartData = portalData?.chart?.value || portalData?.mocks?.refNode?.chart?.value;
  const customLeadsData = portalData?.leads?.value || portalData?.mocks?.refNode?.leads?.value;
  const customOrdersData = portalData?.orders?.value || portalData?.mocks?.refNode?.orders?.value;
  const show = customLeadsData ? "leads" : customOrdersData ? "orders" : "leads" ;
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
                    <Chart customChartData={customChartData} />
                  </Grid>
                </Grid>
              </Grid>

              <Grid item xs={12} sm={8} md={9} >
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    {show ==="leads" &&
                      <Leads customLeadsData={customLeadsData}/>
                    }
                    {show ==="orders" &&
                      <Orders customOrdersData={customOrdersData}/>
                    }
                  </Grid>
                  <Grid item xs={12}>
                    <Box >
                      <Grid
                          container
                          spacing={3}
                      >
                        {/*{products.map((product) => (*/}
                        {/*    <Grid*/}
                        {/*        item*/}
                        {/*        key={product.id}*/}
                        {/*        md={6}*/}
                        {/*        xs={12}*/}
                        {/*    >*/}
                        {/*      <ProductCard product={product} />*/}
                        {/*    </Grid>*/}
                        {/*))}*/}

                            <Grid
                                item
                                key={products[0].id}
                                md={6}
                                xs={12}
                            >
                              <ProductCard product={products[0]} />
                            </Grid>


                            <Grid
                                item
                                key={portalData?.personalizedAds?.uuid}
                                md={6}
                                xs={12}
                            >
                              <Ads adsid={portalData?.personalizedAds?.refNode?.uuid}/>
                            </Grid>

                      </Grid>
                    </Box>
                  </Grid>
                </Grid>
              </Grid>

              <Grid item xs={12}>
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <MultiChart customMultiChartData={customMultiChartData}/>
                  </Grid>
                </Grid>
              </Grid>
              {/*<Grid item xs={12} >*/}
              {/*  <Grid container spacing={3}>*/}
              {/*    <Grid item xs={12} sm={6}>*/}
              {/*      <Ads adsid={portalData?.personalizedAds?.refNode?.uuid}/>*/}
              {/*    </Grid>*/}
              {/*  </Grid>*/}
              {/*</Grid>*/}
            </Grid>
          </Container>
        </Box>
      </PortalLayoutRoot>
    </ThemeProvider>
  );
}

export default App;
