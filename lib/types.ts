export type Project = {
  _id: string;
  title: string;
  slug: string;
  coverImage?: string;
  summary: string;
  description?: string;
  category?: string;
  location?: string;
  year?: number;
  area?: string;
  styleConcept?: string;
  materialsUsed?: string[];
  gallery?: string[];
  floorPlanImages?: string[];
  testimonial?: {
    quote: string;
    author?: string;
  };
  highlights?: string[];
  featured?: boolean;
};
