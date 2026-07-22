import { Status } from '../../../core/models/status.model';

export interface ReportHistory {
  id: string;

  reportId: string;

  statusId: number;

  note: string;

  createdAt: string;

  status: Status;
}
