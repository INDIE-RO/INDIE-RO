import { CategoryVariant, DetailPolicyTabVariant } from '@/types/common';

export interface Tab<T = string> {
  value: T;
  label: string;
}

export type TabVariant = CategoryVariant | DetailPolicyTabVariant;
