module.exports = {
    "extends": "standard",
    "plugins": [
        "standard",
        "promise"
    ],
    "rules": {
        "one-var": ["error", "always"],
        "indent": "off",
        "semi": "off",
        "spaced-comment": "off",
        "space-before-function-paren": "off",
        "no-trailing-spaces": ["warn"],
        "curly": "warn",
        "no-tabs": "off",
        "eol-last": "off"
    },
    "globals": {
        "Ext": false,
        "Loader": false,
        "_i18n": false,
        "SitcomSales": false,
        "Sch": false,
        "angular": false,
        "localStorage": false,
        "moment": false,
        "APIURL": false,
        "_": false,
        "AmCharts": false
    }
};