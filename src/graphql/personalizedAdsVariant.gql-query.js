import {gql} from "@apollo/client";
import {CORE_NODE_FIELDS} from "./fragments"

export const queryPersonalizedAdsVariant = gql`
    ${CORE_NODE_FIELDS}
    query getPersonalizedAdsVariant($workspace: Workspace!, $id: String!,$language:String!,$profileId: String,$sessionId: String) {
        jcr(workspace: $workspace) {
            workspace
            nodeById(uuid: $id) {
                ...CoreNodeFields
                jExperience: asExperience{
                    resolve(profileId: $profileId, sessionId: $sessionId) {
                        variant{
                            ...CoreNodeFields
                            image: property(name:"dash4:image"){ refNode { ...CoreNodeFields } }
                            teaser: property(name:"dash4:teaser",language:$language){ value }
                        }
                    }
                }
            }
        }
    }`
