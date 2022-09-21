
export interface ListExperimentsParam {
  page: number;
  orderBy?: string | null;
  ordering: 'ASC' | 'DESC';
  limit: number;
  finished: boolean;
  userId: string
}
