export interface Key {
  id?: string;
  value: string;
  status: 'unassigned' | 'assigned';
  user: string;
  assign_date: string|number;
  creation_date: string|number;
}
