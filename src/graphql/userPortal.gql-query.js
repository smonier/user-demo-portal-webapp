import {gql} from "@apollo/client";
import {CORE_NODE_FIELDS} from "./fragments"

export const queryUserPortal = gql`query($workspace: Workspace!, $id: String!,$language:String!){
    jcr(workspace: $workspace) {
        workspace
        nodeById(uuid:$id) {
            ...CoreNodeFields
            category: property(name:"dash4:category"){ refNode { ...CoreNodeFields } }
            personalizedAds: property(name:"dash4:personalizedAds"){ refNode { ...CoreNodeFields } }
            userTheme: property(name:"dash4:webappTheme"){ value }
            products: property(name:"dash4:products"){ value }
            chart: property(name:"dash4:chart"){ value }
            btnEditPreference: property(language:$language, name:"dash4:btnEditPreference"){ value }
        }
    }
}
${CORE_NODE_FIELDS}`;
