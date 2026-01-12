import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteTasks, getTasks, sortTasks, storeTasks, updateTasks } from "@/app/api/task";
import { Task } from "@/components/TaskCard";

export function useTasks(token: string) {
  return useQuery({
    queryKey: ["tasks"],
    queryFn: () => getTasks(token),
    enabled: !!token, // トークンがある時だけ実行
  });
}

export function useSortTasks() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => sortTasks(id),
    onSuccess: () => {
      // 成功したら tasks をリフレッシュ
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });
}

export function useStoreTasks() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (task: Task) => storeTasks(task),
    onSuccess: () => {
      // 成功したら tasks をリフレッシュ
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });
}

export function useUpdateTasks() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (task: Task) => updateTasks(task),
    onSuccess: () => {
      // 成功したら tasks をリフレッシュ
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });
}

export function useDeleteTasks() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteTasks(id),
    // mutationFn: (task: Task) => deleteTasks(task),
    onSuccess: () => {
      // 成功したら tasks をリフレッシュ
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });
}
