export enum TrendingEntityType {
    PROFESSOR = 'PROFESSOR',
    COURSE = 'COURSE',
    COLLEGE = 'COLLEGE'
  }

  export enum TrendingPeriod {
    DAY = 'day',
    WEEK = 'week',
    MONTH = 'month'
  }

  export interface TrendingEntity {
    id: string;
    name: string;
    type: TrendingEntityType;
    score: number;
    reviewCount: number;
    reactionCount: number;
    averageRating?: number;
  }
