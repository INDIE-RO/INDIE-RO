import metaDataHandlers from './metaDataHandlers';
import policyHandlers from './policyHandlers';
import surveyHandlers from './surveyHandlers';
import wordCloudHandlers from './wordCloudHandlers';

export default [...wordCloudHandlers, ...surveyHandlers, ...policyHandlers, ...metaDataHandlers];
