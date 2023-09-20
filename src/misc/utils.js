export const getRandomString = (length, format) => {
    let mask = "";
    if (format.indexOf("a") > -1) mask += "abcdefghijklmnopqrstuvwxyz";
    if (format.indexOf("A") > -1) mask += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (format.indexOf("#") > -1) mask += "0123456789";
    if (format.indexOf("!") > -1) mask += "~`!@#$%^&*()_+-={}[]:\";'<>?,./|\\";
    let result = "";
    for (let i = length; i > 0; --i) result += mask[Math.floor(Math.random() * mask.length)];
    return result;
};

export const resolveJahiaMediaURL = ({host,path, workspace}) => {
    const jahiaFilePath = `/files/${workspace === 'EDIT' ? 'default' : 'live'}`;
    if (!path) {
        return '';
    }
    return `${host}${jahiaFilePath}${encodeURI(path)}`;
};

export const resolveJahiaEmbeddedURL = ({host,path, isPreview,isEdit,locale}) => {
    if (!path) {
        return '';
    }

    const paths = {
        preview: '/cms/render/default',
        edit: '/cms/editframe/default'
    }

    let pagePath;
    switch (true){
        case (isPreview && isEdit) :
            pagePath = `${host}${paths.edit}/${locale}${path}`;
            break;
        case isPreview :
            pagePath = `${host}${paths.preview}/${locale}${path}`;
            break;
        default :
            pagePath = `${host}/${locale}${path}`;
            break;
    }

    return pagePath;
};

export const getTypes = jcrProps => {
    if(!jcrProps)
        return [];

    const superTypes = jcrProps.primaryNodeType.supertypes?.map(({name}) => name) || [];
    const mixinTypes = jcrProps.mixinTypes.map(({name}) => name) || [];
    const primaryNodeType = jcrProps.primaryNodeType?.name;
    return [primaryNodeType,...superTypes,...mixinTypes];
}