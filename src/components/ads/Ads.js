import React, {useContext} from "react";
import PropTypes from "prop-types";
import {useLazyQuery} from "@apollo/client";
import {queryPersonalizedAdsVariant} from "../../graphql";
import {CxsCtx} from "../../unomi/cxs";
import {JahiaCtx} from "../../context";
import {EmbeddedPathInHtmlResolver} from "../jahia";
import {Card, CardActions, CardContent, Typography} from '@mui/material';

export const Ads = (props) => {
    const {adsId} = props;
    const cxs = useContext(CxsCtx);
    const { workspace, locale } = useContext(JahiaCtx);
    const [loadVariant, variantQuery] = useLazyQuery(queryPersonalizedAdsVariant);

    React.useEffect(() => {
        if (adsId && cxs) {
            loadVariant({
                variables: {
                    workspace,
                    id:adsId,
                    language: locale,
                    profileId: cxs.profileId,
                    sessionId: cxs.sessionId,
                }
            })
        }
    },[loadVariant,workspace,locale, adsId, cxs])

    // const {data, error, loading} = useQuery(queryPersonalizedAdsVariant, {
    //     variables: {
    //         workspace,
    //         id:adsId,
    //         language: locale,
    //         profileId: cxs.profileId,
    //         sessionId: cxs.sessionId,
    //     }
    // });
    if (variantQuery.error) return <p>Error :(</p>;
    if (!variantQuery.data || variantQuery.loading) return <p>Loading...</p>;

    const {image,teaser} = variantQuery.data?.jcr?.nodeById?.jExperience?.resolve?.variant;
    return(
        <Card
            // sx={{ height: '100%' }}
            {...props}
        >
            <CardContent>
                <Typography component="div"
                    children={<EmbeddedPathInHtmlResolver htmlAsString={teaser.value} />}/>
            </CardContent>
        </Card>
    )
}

Ads.propTypes = {
    adsId: PropTypes.string.isRequired
};