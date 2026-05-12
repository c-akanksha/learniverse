import apis from "./apis";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useHealth = () => {
  return useQuery({
    queryFn: async () => {
      const response = await apis.health();
      return response.data;
    },
  });
};

export const useRegister = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data) => {
      const response = await apis.createLearner(data);
      return response.data;
    },
  });
};

export const useLogin = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data) => {
      const response = await apis.loginLearner(data);
      return response.data;
    },
  });
};

export const useGenerateCourse = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data) => {
      const response = await apis.generateCourse(data);
      return response.data;
    },

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["courses", variables.learner_id],
      });
    },
  });
};

export const useFetchAllCourses = (learnerId) => {
  return useQuery({
    queryKey: ["courses", learnerId],
    queryFn: async () => {
      const response = await apis.fetchAllCourses(learnerId);
      return response.data;
    },
    enabled: !!learnerId,
    select: (data) => data.success ? data.data : []
  });
};

export const useFetchCourse = (learnerId, courseId) => {
  return useQuery({
    queryKey: ["course", learnerId, courseId],
    queryFn: async () => {
      const response = await apis.fetchCourse(learnerId, courseId);
      return response.data;
    },
    enabled: !!learnerId,
    select: (data) => data.success ? data.data : []
  });
};

export const useGenerateQuiz = () => {
  return useMutation({
    mutationFn: async (data) => {
      const response = await apis.generateQuiz(data);
      return response.data;
    },
  });
};

export const useGenerateFeedback = () => {
  return useMutation({
    mutationFn: async (data) => {
      const response = await apis.generateFeedback(data);
      return response.data;
    },
  });
};

export const useProgress = (learnerId, courseId) => {
  return useQuery({
    queryKey: ["progress", learnerId, courseId],
    queryFn: async () => {
      const response = await apis.generateProgress(learnerId, courseId);
      return response.data;
    },
    enabled: !!learnerId,
    select: (data) => data.success ? data.data : []
  });
};
