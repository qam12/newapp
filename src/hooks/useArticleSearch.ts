import { useCallback, useRef } from 'react';
import { useAppDispatch } from '../store/hooks';
import { searchArticles } from '../store/slices/articleSlice';

export const useArticleSearch = () => {
  const dispatch = useAppDispatch();
  const debounceRef = useRef<NodeJS.Timeout | null>(null);

  const handleSearch = useCallback((value: string) => {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    debounceRef.current = setTimeout(() => {
      const searchTerm = value.trim().toLowerCase();
      if (searchTerm.length >= 3 || searchTerm.length === 0) {
        dispatch(searchArticles(searchTerm));
      }
    }, 500);
  }, [dispatch]);

  return { handleSearch };
};
