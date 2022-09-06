export interface IClaim {
  createDate: number;
  creatorId: number;
  creatorName: string;
  description: string;
  executorId?: number;
  executorName: string;
  factExecuteDate: number | null;
  id: number;
  planExecuteDate: number;
  status: string;
  title: string;
}
