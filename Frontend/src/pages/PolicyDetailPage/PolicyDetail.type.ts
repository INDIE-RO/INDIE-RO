import { Policy } from '@/types/common';

export interface PolicyDetail extends Policy {
  url: string;
  description: Description[];
  qualification: Qualification[];
  otherInfo: OtherInfo[];
}

interface Description {
  info: string;
  detail: string;
}

interface Qualification {
  age: string;
  residenceIncome: string;
  restriction: string;
  additionalInfo: string;
  education: string;
  major: string;
  jobStatus: string;
}

interface OtherInfo {
  documents: string;
  contacts: string;
}
