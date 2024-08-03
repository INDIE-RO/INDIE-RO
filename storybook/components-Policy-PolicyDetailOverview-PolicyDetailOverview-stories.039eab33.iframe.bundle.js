"use strict";(self.webpackChunkFrontend=self.webpackChunkFrontend||[]).push([[960],{"./src/components/Policy/PolicyDetailOverview/PolicyDetailOverview.stories.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Basic:()=>Basic,__namedExportsOrder:()=>__namedExportsOrder,default:()=>PolicyDetailOverview_stories});var jsx_runtime=__webpack_require__("./node_modules/.pnpm/react@18.3.1/node_modules/react/jsx-runtime.js"),react=__webpack_require__("./node_modules/.pnpm/react@18.3.1/node_modules/react/index.js"),emotion_styled_browser_esm=__webpack_require__("./node_modules/.pnpm/@emotion+styled@11.11.5_@emotion+react@11.11.4_@types+react@18.3.3_react@18.3.1__@types+react@18.3.3_react@18.3.1/node_modules/@emotion/styled/dist/emotion-styled.browser.esm.js"),_common=__webpack_require__("./src/components/@common/index.ts"),common=__webpack_require__("./src/constants/common.ts"),theme=__webpack_require__("./src/styles/theme.ts");function _tagged_template_literal(strings,raw){return raw||(raw=strings.slice(0)),Object.freeze(Object.defineProperties(strings,{raw:{value:Object.freeze(raw)}}))}function _templateObject(){var data=_tagged_template_literal(["\n  display: flex;\n  gap: 0.4rem;\n\n  width: 100%;\n  margin-bottom: 0.8rem;\n"]);return _templateObject=function _templateObject(){return data},data}function _templateObject1(){var data=_tagged_template_literal(["\n  font-size: ",";\n  font-weight: ",";\n"]);return _templateObject1=function _templateObject(){return data},data}function _templateObject2(){var data=_tagged_template_literal(["\n  width: 100%;\n\n  text-align: right;\n  line-height: 1.8rem;\n  font-size: ",";\n  font-weight: ",";\n"]);return _templateObject2=function _templateObject(){return data},data}function PolicyDetailOverview(param){var policyInfo=param.policyInfo,title=policyInfo.title,period=policyInfo.period,tags=policyInfo.tags;return(0,jsx_runtime.jsxs)("div",{children:[(0,jsx_runtime.jsx)(TagContainer,{children:tags.map((function(tag){return"디데이"===tag.type&&Number(tag.name.slice(2))<0?(0,jsx_runtime.jsx)(react.Fragment,{},tag.id):(0,jsx_runtime.jsx)(_common.vw,{size:"sm",color:4!==tag.id?"default":"white",backgroundColor:theme.A.tagColors[common.fO[tag.id]],children:tag.name},tag.id)}))}),(0,jsx_runtime.jsx)("div",{style:{height:"10px"}}),(0,jsx_runtime.jsx)(Title,{children:title}),(0,jsx_runtime.jsx)("div",{style:{height:"20px"}}),(0,jsx_runtime.jsx)(Period,{children:period})]})}const PolicyDetailOverview_PolicyDetailOverview=PolicyDetailOverview;var TagContainer=emotion_styled_browser_esm.A.ul(_templateObject()),Title=emotion_styled_browser_esm.A.h1(_templateObject1(),theme.A.fontSizes.lg,theme.A.fontWeights.semiBold),Period=emotion_styled_browser_esm.A.p(_templateObject2(),theme.A.fontSizes.xs,theme.A.fontWeights.medium);PolicyDetailOverview.__docgenInfo={description:"",methods:[],displayName:"PolicyDetailOverview",props:{policyInfo:{required:!0,tsType:{name:"Policy"},description:""}}};const PolicyDetailOverview_stories={title:"Policy/PolicyDetailOverview",component:PolicyDetailOverview_PolicyDetailOverview};var Basic={args:{policyInfo:{id:1,title:"[행정안전부] 청년을 위한 취업 역량 개발지원",period:"2024-04-20 ~ 2024-05-20",tags:[{id:1,type:"분야",name:"일자리"},{id:2,type:"지역",name:"서울"},{id:3,type:"모집현황",name:"모집중"},{id:4,type:"디데이",name:"D-23"}]}}};Basic.parameters={...Basic.parameters,docs:{...Basic.parameters?.docs,source:{originalSource:"{\n  args: {\n    policyInfo: {\n      id: 1,\n      title: '[행정안전부] 청년을 위한 취업 역량 개발지원',\n      period: '2024-04-20 ~ 2024-05-20',\n      tags: [{\n        id: 1,\n        type: '분야',\n        name: '일자리'\n      }, {\n        id: 2,\n        type: '지역',\n        name: '서울'\n      }, {\n        id: 3,\n        type: '모집현황',\n        name: '모집중'\n      }, {\n        id: 4,\n        type: '디데이',\n        name: 'D-23'\n      }]\n    }\n  }\n}",...Basic.parameters?.docs?.source}}};const __namedExportsOrder=["Basic"]}}]);