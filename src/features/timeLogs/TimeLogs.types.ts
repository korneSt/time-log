export interface TimeLog {
  id: number;
  day: string;
  hours: number;
  time_from?: string;
  time_to?: string;
  project_name: string;
  subject?: string;
  staff_id: number;
}

export interface Staff {
  id: number;
  name: string;
}

export interface TimeLogWithStaff extends TimeLog {
  staffName?: string;
}
