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
     	"spaced-comment":"off",
     	"space-before-function-paren":"off",
     	"no-trailing-spaces":["warn"],
     	"curly":"warn",
     	"no-tabs":"off"
    },
    "globals": {
        "Ext": false,
        "Loader": false,
        "_i18n": false,
        "SitcomSales":false,
        "Sch":false,
        "_Navigator":false
    }
};