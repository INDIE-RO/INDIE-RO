import filterHandlers from './filterHandlers';
import policyHandlers from './policyHandlers';
import surveyHandlers from './surveyHandlers';

export default [...surveyHandlers, ...policyHandlers, ...filterHandlers];
