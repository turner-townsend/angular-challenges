import { Photo } from '../../photo.model';

export const setLoading = (loading: boolean) => ({ loading });

export const setError = (error: unknown) => ({ error });

export const setSearch = (search: string) => ({ search, page: 1 });

export const setPage = (page: number) => ({ page });

export const setPhotos = (photos: Photo[], pages: number) => ({
  photos,
  pages,
});
