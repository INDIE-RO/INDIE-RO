import { CategoryVariant } from '@/types/common';

export interface Tab<T = string> {
  value: T;
  label: string;
}

export type DetailPolicyTabVariant = 'description' | 'qualification' | 'otherInfo';

export type TabVariant = CategoryVariant | DetailPolicyTabVariant;
