export interface IWishes {
  createDate: number;
  creatorId: number;
  description: string;
  executorId?: number;
  factExecuteDate: number | null;
  id: number;
  patientId: number;
  planExecuteDate: number;
  status: string;
  title: string;
};
