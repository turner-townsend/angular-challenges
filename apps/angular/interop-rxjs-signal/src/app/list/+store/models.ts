import { Photo } from '../../photo.model';

export type PhotoState = {
  photos: Photo[];
  search: string;
  page: number;
  pages: number;
  loading: boolean;
  error: unknown;
};
