import { useState, useEffect } from "react";
import axios from "axios";

// Base API configuration
const API_BASE_URL = "http://localhost:8000/api";

// Create axios instance with default config
const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add token to requests if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("anonToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Updated types for trending data based on actual API response
export interface TrendingItem {
  id: string;
  name: string;
  type: "PROFESSOR" | "COURSE" | "COLLEGE";
  score: number;
  reviewCount: number;
  reactionCount: number;
  averageRating?: number;
  collegeId?: string;
  collegeName?: string;
  logoUrl?: string;
  discussionCount?: number;
}

export interface TrendingResponse {
  success: boolean;
  data: {
    professors: TrendingItem[];
    courses: TrendingItem[];
    colleges: TrendingItem[];
  };
}

// Hook for fetching home page trending data
export const useHomeTrending = () => {
  const [data, setData] = useState<TrendingResponse["data"] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchTrending = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.get<TrendingResponse>("/trending/home");
      setData(response.data.data);
      return response.data.data;
    } catch (err) {
      setError(
        err instanceof Error ? err : new Error("Failed to fetch trending data")
      );
      return null;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTrending();
  }, []);

  return {
    trendingData: data,
    loading,
    error,
    refetch: fetchTrending,
  };
};

// Hook for fetching trending professors
export const useTrendingProfessors = () => {
  const [professors, setProfessors] = useState<TrendingItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchTrendingProfessors = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.get<TrendingResponse>("/trending/professors");
      setProfessors(response.data.data.professors);
      return response.data.data.professors;
    } catch (err) {
      setError(
        err instanceof Error
          ? err
          : new Error("Failed to fetch trending professors")
      );
      return [];
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTrendingProfessors();
  }, []);

  return {
    professors,
    loading,
    error,
    refetch: fetchTrendingProfessors,
  };
};

// Hook for fetching trending courses
export const useTrendingCourses = () => {
  const [courses, setCourses] = useState<TrendingItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchTrendingCourses = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.get<TrendingResponse>("/trending/courses");
      setCourses(response.data.data.courses);
      return response.data.data.courses;
    } catch (err) {
      setError(
        err instanceof Error
          ? err
          : new Error("Failed to fetch trending courses")
      );
      return [];
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTrendingCourses();
  }, []);

  return {
    courses,
    loading,
    error,
    refetch: fetchTrendingCourses,
  };
};

// Hook for fetching trending colleges
export const useTrendingColleges = () => {
  const [colleges, setColleges] = useState<TrendingItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchTrendingColleges = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.get<TrendingResponse>("/trending/colleges");
      setColleges(response.data.data.colleges);
      return response.data.data.colleges;
    } catch (err) {
      setError(
        err instanceof Error
          ? err
          : new Error("Failed to fetch trending colleges")
      );
      return [];
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTrendingColleges();
  }, []);

  return {
    colleges,
    loading,
    error,
    refetch: fetchTrendingColleges,
  };
};
