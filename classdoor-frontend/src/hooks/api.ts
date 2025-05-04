import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

// Base API configuration
const API_BASE_URL = 'http://localhost:8000/api';

// Create axios instance with default config
const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  }
});

// Add token to requests if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('anonToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Types for pagination and responses
interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    pages: number;
  };
}

// Authentication Hooks
export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [anonId, setAnonId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('anonToken');
    setIsAuthenticated(!!token);
    setAnonId(localStorage.getItem('anonId'));
    setLoading(false);
  }, []);

  const createAnonymousSession = async () => {
    setLoading(true);
    try {
      const response = await api.post('/auth/anonymous');
      const { anonId, token } = response.data;

      localStorage.setItem('anonToken', token);
      localStorage.setItem('anonId', anonId);

      setIsAuthenticated(true);
      setAnonId(anonId);
      return { anonId, token };
    } catch (error) {
      console.error('Auth error:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const refreshToken = async () => {
    setLoading(true);
    try {
      const response = await api.get('/auth/refresh');
      const { anonId, token } = response.data;

      localStorage.setItem('anonToken', token);
      localStorage.setItem('anonId', anonId);

      setIsAuthenticated(true);
      setAnonId(anonId);
      return { anonId, token };
    } catch (error) {
      // If refresh fails, create new session
      return createAnonymousSession();
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('anonToken');
    localStorage.removeItem('anonId');
    setIsAuthenticated(false);
    setAnonId(null);
  };

  return {
    isAuthenticated,
    anonId,
    loading,
    createAnonymousSession,
    refreshToken,
    logout
  };
};

// Professor Hooks
export const useProfessors = (initialParams = {}) => {
  const [professors, setProfessors] = useState<any[]>([]);
  const [pagination, setPagination] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchProfessors = useCallback(async (params = {}) => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.get('/professors', { params });
      setProfessors(response.data.data);
      setPagination(response.data.pagination);
      return response.data;
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to fetch professors');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProfessors(initialParams);
  }, [fetchProfessors]);

  return { professors, pagination, loading, error, fetchProfessors };
};

export const useProfessor = (professorId: string) => {
  const [professor, setProfessor] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchProfessor = useCallback(async () => {
    if (!professorId) return;

    setLoading(true);
    setError(null);
    try {
      const response = await api.get(`/professors/${professorId}`);
      setProfessor(response.data);
      return response.data;
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to fetch professor');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [professorId]);

  useEffect(() => {
    fetchProfessor();
  }, [fetchProfessor]);

  const createProfessor = async (data: any) => {
    setLoading(true);
    try {
      const response = await api.post('/professors', data);
      return response.data;
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to create professor');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updateProfessor = async (data: any) => {
    if (!professorId) return;

    setLoading(true);
    try {
      const response = await api.put(`/professors/${professorId}`, data);
      setProfessor(response.data);
      return response.data;
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to update professor');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const deleteProfessor = async () => {
    if (!professorId) return;

    setLoading(true);
    try {
      await api.delete(`/professors/${professorId}`);
      setProfessor(null);
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to delete professor');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    professor,
    loading,
    error,
    fetchProfessor,
    createProfessor,
    updateProfessor,
    deleteProfessor
  };
};

// Course Hooks
export const useCourses = (initialParams = {}) => {
  const [courses, setCourses] = useState<any[]>([]);
  const [pagination, setPagination] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchCourses = useCallback(async (params = {}) => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.get('/courses', { params });
      setCourses(response.data.data);
      setPagination(response.data.pagination);
      return response.data;
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to fetch courses');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCourses(initialParams);
  }, [fetchCourses]);

  return { courses, pagination, loading, error, fetchCourses };
};

export const useCourse = (courseId: string) => {
  const [course, setCourse] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchCourse = useCallback(async () => {
    if (!courseId) return;

    setLoading(true);
    setError(null);
    try {
      const response = await api.get(`/courses/${courseId}`);
      setCourse(response.data);
      return response.data;
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to fetch course');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [courseId]);

  useEffect(() => {
    fetchCourse();
  }, [fetchCourse]);

  const createCourse = async (data: any) => {
    setLoading(true);
    try {
      const response = await api.post('/courses', data);
      return response.data;
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to create course');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updateCourse = async (data: any) => {
    if (!courseId) return;

    setLoading(true);
    try {
      const response = await api.put(`/courses/${courseId}`, data);
      setCourse(response.data);
      return response.data;
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to update course');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const deleteCourse = async () => {
    if (!courseId) return;

    setLoading(true);
    try {
      await api.delete(`/courses/${courseId}`);
      setCourse(null);
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to delete course');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    course,
    loading,
    error,
    fetchCourse,
    createCourse,
    updateCourse,
    deleteCourse
  };
};

// Review Hooks
export const useReviews = (initialParams = {}) => {
  const [reviews, setReviews] = useState<any[]>([]);
  const [pagination, setPagination] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchReviews = useCallback(async (params = {}) => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.get('/reviews', { params });
      setReviews(response.data.data);
      setPagination(response.data.pagination);
      return response.data;
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to fetch reviews');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchReviews(initialParams);
  }, [fetchReviews]);

  const createReview = async (data: any) => {
    setLoading(true);
    try {
      const response = await api.post('/reviews', data);
      setReviews(prev => [response.data, ...prev]);
      return response.data;
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to create review');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { reviews, pagination, loading, error, fetchReviews, createReview };
};

export const useReview = (reviewId: string) => {
  const [review, setReview] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchReview = useCallback(async () => {
    if (!reviewId) return;

    setLoading(true);
    setError(null);
    try {
      const response = await api.get(`/reviews/${reviewId}`);
      setReview(response.data);
      return response.data;
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to fetch review');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [reviewId]);

  useEffect(() => {
    fetchReview();
  }, [fetchReview]);

  const updateReview = async (data: any) => {
    if (!reviewId) return;

    setLoading(true);
    try {
      const response = await api.put(`/reviews/${reviewId}`, data);
      setReview(response.data);
      return response.data;
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to update review');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const deleteReview = async () => {
    if (!reviewId) return;

    setLoading(true);
    try {
      await api.delete(`/reviews/${reviewId}`);
      setReview(null);
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to delete review');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const addReaction = async (type: string) => {
    if (!reviewId) return;

    setLoading(true);
    try {
      const response = await api.post(`/reviews/${reviewId}/reactions`, { type });
      return response.data;
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to add reaction');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const removeReaction = async (type: string) => {
    if (!reviewId) return;

    setLoading(true);
    try {
      await api.delete(`/reviews/${reviewId}/reactions/${type}`);
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to remove reaction');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    review,
    loading,
    error,
    fetchReview,
    updateReview,
    deleteReview,
    addReaction,
    removeReaction
  };
};

// College Hooks
export const useColleges = (initialParams = {}) => {
  const [colleges, setColleges] = useState<any[]>([]);
  const [pagination, setPagination] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchColleges = useCallback(async (params = {}) => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.get('/colleges', { params });
      setColleges(response.data.data);
      setPagination(response.data.pagination);
      return response.data;
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to fetch colleges');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchColleges(initialParams);
  }, [fetchColleges]);

  const createCollege = async (data: any) => {
    setLoading(true);
    try {
      const response = await api.post('/colleges', data);
      setColleges(prev => [response.data, ...prev]);
      return response.data;
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to create college');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { colleges, pagination, loading, error, fetchColleges, createCollege };
};

export const useCollege = (collegeId: string) => {
  const [college, setCollege] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchCollege = useCallback(async () => {
    if (!collegeId) return;

    setLoading(true);
    setError(null);
    try {
      const response = await api.get(`/colleges/${collegeId}`);
      setCollege(response.data);
      return response.data;
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to fetch college');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [collegeId]);

  useEffect(() => {
    fetchCollege();
  }, [fetchCollege]);

  const updateCollege = async (data: any) => {
    if (!collegeId) return;

    setLoading(true);
    try {
      const response = await api.put(`/colleges/${collegeId}`, data);
      setCollege(response.data);
      return response.data;
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to update college');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const deleteCollege = async () => {
    if (!collegeId) return;

    setLoading(true);
    try {
      await api.delete(`/colleges/${collegeId}`);
      setCollege(null);
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to delete college');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    college,
    loading,
    error,
    fetchCollege,
    updateCollege,
    deleteCollege
  };
};

// Discussion Hooks
export const useDiscussions = (initialParams = {}) => {
  const [discussions, setDiscussions] = useState<any[]>([]);
  const [pagination, setPagination] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchDiscussions = useCallback(async (params = {}) => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.get('/discussions', { params });
      setDiscussions(response.data.data);
      setPagination(response.data.pagination);
      return response.data;
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to fetch discussions');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchDiscussions(initialParams);
  }, [fetchDiscussions]);

  const createDiscussion = async (data: any) => {
    setLoading(true);
    try {
      const response = await api.post('/discussions', data);
      setDiscussions(prev => [response.data, ...prev]);
      return response.data;
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to create discussion');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { discussions, pagination, loading, error, fetchDiscussions, createDiscussion };
};

export const useDiscussion = (discussionId: string) => {
  const [discussion, setDiscussion] = useState<any>(null);
  const [comments, setComments] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchDiscussion = useCallback(async () => {
    if (!discussionId) return;

    setLoading(true);
    setError(null);
    try {
      const response = await api.get(`/discussions/${discussionId}`);
      setDiscussion(response.data);
      setComments(response.data.comments || []);
      return response.data;
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to fetch discussion');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [discussionId]);

  useEffect(() => {
    fetchDiscussion();
  }, [fetchDiscussion]);

  const updateDiscussion = async (data: any) => {
    if (!discussionId) return;

    setLoading(true);
    try {
      const response = await api.put(`/discussions/${discussionId}`, data);
      setDiscussion(response.data);
      return response.data;
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to update discussion');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const deleteDiscussion = async () => {
    if (!discussionId) return;

    setLoading(true);
    try {
      await api.delete(`/discussions/${discussionId}`);
      setDiscussion(null);
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to delete discussion');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const addComment = async (content: string, parentId?: string) => {
    if (!discussionId) return;

    setLoading(true);
    try {
      const response = await api.post(`/discussions/${discussionId}/comments`, {
        content,
        parentId
      });

      setComments(prev => [response.data, ...prev]);
      return response.data;
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to add comment');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const deleteComment = async (commentId: string) => {
    if (!discussionId || !commentId) return;

    setLoading(true);
    try {
      await api.delete(`/discussions/${discussionId}/comments/${commentId}`);
      setComments(prev => prev.filter(c => c.id !== commentId));
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to delete comment');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    discussion,
    comments,
    loading,
    error,
    fetchDiscussion,
    updateDiscussion,
    deleteDiscussion,
    addComment,
    deleteComment
  };
};

// Trending Hooks
export const useTrending = (collegeId: string) => {
  const [trendingData, setTrendingData] = useState({
    professors: [],
    courses: [],
    discussions: [],
    tags: []
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchTrendingProfessors = useCallback(async () => {
    if (!collegeId) return;

    setLoading(true);
    try {
      const response = await api.get(`/trending/professors?collegeId=${collegeId}`);
      setTrendingData(prev => ({ ...prev, professors: response.data }));
      return response.data;
    } catch (err) {
      console.error('Failed to fetch trending professors', err);
    } finally {
      setLoading(false);
    }
  }, [collegeId]);

  const fetchTrendingCourses = useCallback(async () => {
    if (!collegeId) return;

    setLoading(true);
    try {
      const response = await api.get(`/trending/courses?collegeId=${collegeId}`);
      setTrendingData(prev => ({ ...prev, courses: response.data }));
      return response.data;
    } catch (err) {
      console.error('Failed to fetch trending courses', err);
    } finally {
      setLoading(false);
    }
  }, [collegeId]);

  const fetchTrendingDiscussions = useCallback(async () => {
    if (!collegeId) return;

    setLoading(true);
    try {
      const response = await api.get(`/trending/discussions?collegeId=${collegeId}`);
      setTrendingData(prev => ({ ...prev, discussions: response.data }));
      return response.data;
    } catch (err) {
      console.error('Failed to fetch trending discussions', err);
    } finally {
      setLoading(false);
    }
  }, [collegeId]);

  const fetchTrendingTags = useCallback(async () => {
    if (!collegeId) return;

    setLoading(true);
    try {
      const response = await api.get(`/trending/tags?collegeId=${collegeId}`);
      setTrendingData(prev => ({ ...prev, tags: response.data }));
      return response.data;
    } catch (err) {
      console.error('Failed to fetch trending tags', err);
    } finally {
      setLoading(false);
    }
  }, [collegeId]);

  const fetchAllTrending = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      await Promise.all([
        fetchTrendingProfessors(),
        fetchTrendingCourses(),
        fetchTrendingDiscussions(),
        fetchTrendingTags()
      ]);
    } catch (err: any) {
      setError('Failed to fetch trending data');
    } finally {
      setLoading(false);
    }
  }, [fetchTrendingProfessors, fetchTrendingCourses, fetchTrendingDiscussions, fetchTrendingTags]);

  useEffect(() => {
    if (collegeId) {
      fetchAllTrending();
    }
  }, [collegeId, fetchAllTrending]);

  return {
    trendingData,
    loading,
    error,
    fetchAllTrending,
    fetchTrendingProfessors,
    fetchTrendingCourses,
    fetchTrendingDiscussions,
    fetchTrendingTags
  };
};

// Socket Hooks
export const useSocket = () => {
  const [socket, setSocket] = useState<any>(null);
  const [connected, setConnected] = useState(false);
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    // Load socket.io-client dynamically on client-side
    const loadSocket = async () => {
      if (!isAuthenticated) return;

      try {
        const io = (await import('socket.io-client')).io;

        const token = localStorage.getItem('anonToken');
        const newSocket = io('http://localhost:8000', {
          auth: { token },
          withCredentials: true
        });

        newSocket.on('connect', () => {
          console.log('Socket connected');
          setConnected(true);
        });

        newSocket.on('disconnect', () => {
          console.log('Socket disconnected');
          setConnected(false);
        });

        setSocket(newSocket);

        return () => {
          newSocket.disconnect();
        };
      } catch (err) {
        console.error('Socket connection failed:', err);
      }
    };

    loadSocket();
  }, [isAuthenticated]);

  const joinCollege = useCallback((collegeId: string) => {
    if (socket && connected) {
      socket.emit('join_college', collegeId);
    }
  }, [socket, connected]);

  const joinDiscussion = useCallback((discussionId: string) => {
    if (socket && connected) {
      socket.emit('join_discussion', discussionId);
    }
  }, [socket, connected]);

  const sendComment = useCallback((data: { content: string, discussionId: string, parentId?: string }) => {
    if (socket && connected) {
      socket.emit('comment', data);
    }
  }, [socket, connected]);

  const listenForComments = useCallback((callback: (comment: any) => void) => {
    if (socket) {
      socket.on('new_comment', callback);
      return () => socket.off('new_comment', callback);
    }
  }, [socket]);

  const listenForDiscussions = useCallback((callback: (discussion: any) => void) => {
    if (socket) {
      socket.on('new_discussion', callback);
      return () => socket.off('new_discussion', callback);
    }
  }, [socket]);

  return {
    socket,
    connected,
    joinCollege,
    joinDiscussion,
    sendComment,
    listenForComments,
    listenForDiscussions
  };
};

export default api;