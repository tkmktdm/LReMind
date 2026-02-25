import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  deleteCategories,
  getCategories,
  sortCategories,
  storeCategories,
  updateCategories,
} from "@/app/api/category";
import { Category } from "@/types/Category";

export function useCategories(token: string) {
  return useQuery({
    queryKey: ["categories"],
    queryFn: () => getCategories(token),
    enabled: !!token, // トークンがある時だけ実行
  });
}

export function useSortCategories() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => sortCategories(id),
    onSuccess: () => {
      // 成功したら categories をリフレッシュ
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
  });
}

export function useStoreCategories() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (task: Category) => storeCategories(task),
    onSuccess: () => {
      // 成功したら categories をリフレッシュ
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
  });
}

export function useUpdateCategories() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (task: Category) => updateCategories(task),
    onSuccess: () => {
      // 成功したら categories をリフレッシュ
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
  });
}

export function useDeleteCategories() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteCategories(id),
    // mutationFn: (task: Task) => deleteCategories(task),
    onSuccess: () => {
      // 成功したら categories をリフレッシュ
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
  });
}
