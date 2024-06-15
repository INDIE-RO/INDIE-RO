import metaDataHandlers from './metaDataHandlers';
import policyHandlers from './policyHandlers';
import surveyHandlers from './surveyHandlers';

export default [...surveyHandlers, ...policyHandlers, ...metaDataHandlers];
