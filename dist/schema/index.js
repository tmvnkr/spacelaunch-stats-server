"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;var _apolloServerExpress=require("apollo-server-express"),_user=_interopRequireDefault(require("./user")),_message=_interopRequireDefault(require("./message"));function _interopRequireDefault(a){return a&&a.__esModule?a:{default:a}}function _templateObject(){var a=_taggedTemplateLiteral(["\n  type Query {\n    _: Boolean\n  }\n\n  type Mutation {\n    _: Boolean\n  }\n\n  type Subscription {\n    _: Boolean\n  }\n"]);return _templateObject=function(){return a},a}function _taggedTemplateLiteral(a,b){return b||(b=a.slice(0)),Object.freeze(Object.defineProperties(a,{raw:{value:Object.freeze(b)}}))}var linkSchema=(0,_apolloServerExpress.gql)(_templateObject()),_default=[linkSchema,_user.default,_message.default];exports.default=_default;