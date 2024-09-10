import { request } from '@umijs/max';
import type { RuleListDataType } from './data'
export async function getRuleData(): Promise<{ data: RuleListDataType[] }> {
  return request('/rule');
}
