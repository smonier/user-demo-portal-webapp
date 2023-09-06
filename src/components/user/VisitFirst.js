import { Avatar, Card, CardContent, Grid, Typography } from '@mui/material';
import PermContactCalendarIcon from '@mui/icons-material/PermContactCalendar';
import Moment from "react-moment";
import React, {useContext} from "react";
import {StoreCtx} from "../../context";

export const VisitFirst = (props) => {
    const { state } = useContext(StoreCtx);
    const {userData} = state;
    const firstVisit = userData?.profileProperties?.firstVisit || "-";

    return(

        <Card
            sx={{ height: '100%' }}
            {...props}
        >
            <CardContent>
                <Grid
                    container
                    spacing={3}
                    sx={{ justifyContent: 'space-between' }}
                >
                    <Grid item>
                        <Typography
                            color="textSecondary"
                            gutterBottom
                            variant="overline"
                        >
                            First visit
                        </Typography>
                        <Typography
                            color="textPrimary"
                            variant="h4"
                        >
                            {firstVisit!=="-" &&
                                <Moment format="ll" date={firstVisit}/>
                            }
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Avatar
                            sx={{
                                backgroundColor: 'error.main',
                                height: 56,
                                width: 56
                            }}
                        >
                            <PermContactCalendarIcon />
                        </Avatar>
                    </Grid>
                </Grid>
                {/*<Box*/}
                {/*    sx={{*/}
                {/*        pt: 2,*/}
                {/*        display: 'flex',*/}
                {/*        alignItems: 'center'*/}
                {/*    }}*/}
                {/*>*/}
                {/*    <ArrowDownwardIcon color="error" />*/}
                {/*    <Typography*/}
                {/*        color="error"*/}
                {/*        sx={{*/}
                {/*            mr: 1*/}
                {/*        }}*/}
                {/*        variant="body2"*/}
                {/*    >*/}
                {/*        12%*/}
                {/*    </Typography>*/}
                {/*    <Typography*/}
                {/*        color="textSecondary"*/}
                {/*        variant="caption"*/}
                {/*    >*/}
                {/*        Since last month*/}
                {/*    </Typography>*/}
                {/*</Box>*/}
            </CardContent>
        </Card>
    );
}
