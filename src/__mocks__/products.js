import {v4 as uuid} from "uuid";

export const products = [
    {
        id: uuid(),
        expiredAt: "2024-03-27T09:32:18Z",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        icon: "Bluetooth",
        title: "Blue Label",
    },
    {
        id: uuid(),
        expiredAt: "2024-05-31T09:32:18Z",
        description: "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        icon: "Handshake",
        title: "Green Label",
    },
    // {
    //     id: uuid(),
    //     createdAt: "03/04/2019",
    //     description: "Slack is a cloud-based set of team collaboration tools and services, founded by Stewart Butterfield.",
    //     media: "/static/images/products/product_3.png",
    //     title: "Slack",
    //     totalDownloads: "857"
    // }
]
