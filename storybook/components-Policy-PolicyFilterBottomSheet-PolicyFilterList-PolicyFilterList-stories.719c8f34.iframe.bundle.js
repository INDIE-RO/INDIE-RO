"use strict";(self.webpackChunkFrontend=self.webpackChunkFrontend||[]).push([[969],{"./src/components/Policy/PolicyFilterBottomSheet/PolicyFilterList/PolicyFilterList.stories.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Basic:()=>Basic,__namedExportsOrder:()=>__namedExportsOrder,default:()=>__WEBPACK_DEFAULT_EXPORT__});const __WEBPACK_DEFAULT_EXPORT__={title:"Policy/PolicyFilterBottomSheet/PolicyFilterList",component:__webpack_require__("./src/components/Policy/PolicyFilterBottomSheet/PolicyFilterList/PolicyFilterList.tsx").A};var Basic={args:{metaDataList:[{id:1,name:"상시모집"},{id:2,name:"모집중"},{id:3,name:"모집예정"},{id:4,name:"마감"}],labelText:"모집현황",containerRole:"radiogroup",role:"radio",checked:function(){return!0}}};Basic.parameters={...Basic.parameters,docs:{...Basic.parameters?.docs,source:{originalSource:"{\n  args: {\n    metaDataList: [{\n      id: 1,\n      name: '상시모집'\n    }, {\n      id: 2,\n      name: '모집중'\n    }, {\n      id: 3,\n      name: '모집예정'\n    }, {\n      id: 4,\n      name: '마감'\n    }],\n    labelText: '모집현황',\n    containerRole: 'radiogroup',\n    role: 'radio',\n    checked: () => true\n  }\n}",...Basic.parameters?.docs?.source}}};const __namedExportsOrder=["Basic"]},"./src/components/Policy/PolicyFilterBottomSheet/PolicyFilterList/PolicyFilterList.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{A:()=>__WEBPACK_DEFAULT_EXPORT__});var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/.pnpm/react@18.3.1/node_modules/react/jsx-runtime.js"),_emotion_styled__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/.pnpm/@emotion+styled@11.11.5_@emotion+react@11.11.4_@types+react@18.3.3_react@18.3.1__@types+react@18.3.3_react@18.3.1/node_modules/@emotion/styled/dist/emotion-styled.browser.esm.js"),_components_common__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./src/components/@common/index.ts"),_styles_theme__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./src/styles/theme.ts");function _tagged_template_literal(strings,raw){return raw||(raw=strings.slice(0)),Object.freeze(Object.defineProperties(strings,{raw:{value:Object.freeze(raw)}}))}function _templateObject(){var data=_tagged_template_literal(["\n  margin-bottom: 1.2rem;\n\n  color: ",";\n  font-size: ",";\n  font-weight: ",";\n  line-height: 2.4rem;\n  text-align: left;\n"]);return _templateObject=function _templateObject(){return data},data}function _templateObject1(){var data=_tagged_template_literal(["\n  display: grid;\n  grid-gap: 0.8rem;\n  grid-template-columns: repeat(3, 1fr);\n  align-items: stretch;\n  justify-items: stretch;\n"]);return _templateObject1=function _templateObject(){return data},data}var checkedStyle={color:_styles_theme__WEBPACK_IMPORTED_MODULE_3__.A.textColors.default,backgroundColor:_styles_theme__WEBPACK_IMPORTED_MODULE_3__.A.colors.primary},uncheckedStyle={color:_styles_theme__WEBPACK_IMPORTED_MODULE_3__.A.textColors.light,backgroundColor:_styles_theme__WEBPACK_IMPORTED_MODULE_3__.A.colors.white};function PolicyFilterList(policyFilterListProps){var metaDataList=policyFilterListProps.metaDataList,_policyFilterListProps_checked=policyFilterListProps.checked,checked=void 0===_policyFilterListProps_checked?function(){return!1}:_policyFilterListProps_checked,_policyFilterListProps_onClick=policyFilterListProps.onClick,onClick=void 0===_policyFilterListProps_onClick?function(){}:_policyFilterListProps_onClick,labelText=policyFilterListProps.labelText,containerRole=policyFilterListProps.containerRole,role=policyFilterListProps.role;return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div",{children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(LabelText,{children:labelText}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(FilterContainer,{role:containerRole,children:metaDataList.map((function(param){var id=param.id,name=param.name;return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("li",{children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_common__WEBPACK_IMPORTED_MODULE_2__.z2,{type:"button",role,size:"sm",width:"100%",fontWeight:_styles_theme__WEBPACK_IMPORTED_MODULE_3__.A.fontWeights.semiBold,color:checked(id)?checkedStyle.color:uncheckedStyle.color,backgroundColor:checked(id)?checkedStyle.backgroundColor:uncheckedStyle.backgroundColor,onClick:function(){return onClick(id)},children:name})},id)}))})]})}const __WEBPACK_DEFAULT_EXPORT__=PolicyFilterList;var LabelText=_emotion_styled__WEBPACK_IMPORTED_MODULE_1__.A.p(_templateObject(),_styles_theme__WEBPACK_IMPORTED_MODULE_3__.A.textColors.white,_styles_theme__WEBPACK_IMPORTED_MODULE_3__.A.fontSizes.lg,_styles_theme__WEBPACK_IMPORTED_MODULE_3__.A.fontWeights.semiBold),FilterContainer=_emotion_styled__WEBPACK_IMPORTED_MODULE_1__.A.ul(_templateObject1());PolicyFilterList.__docgenInfo={description:"",methods:[],displayName:"PolicyFilterList",props:{metaDataList:{required:!0,tsType:{name:"Array",elements:[{name:"MetaData"}],raw:"MetaData[]"},description:""},labelText:{required:!1,tsType:{name:"string"},description:""},containerRole:{required:!1,tsType:{name:"string"},description:""},role:{required:!1,tsType:{name:"string"},description:""},checked:{required:!1,tsType:{name:"signature",type:"function",raw:"(id: number) => boolean",signature:{arguments:[{type:{name:"number"},name:"id"}],return:{name:"boolean"}}},description:""},onClick:{required:!1,tsType:{name:"signature",type:"function",raw:"(id: number) => void",signature:{arguments:[{type:{name:"number"},name:"id"}],return:{name:"void"}}},description:""}}}}}]);