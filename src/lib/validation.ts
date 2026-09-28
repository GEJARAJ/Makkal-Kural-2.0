import { z } from 'zod';

export const complaintStepCategorySchema = z.object({
  category: z.string().min(1, 'Please select a grievance sector'),
  subcategory: z.string().min(1, 'Please select a subcategory'),
});

export const complaintStepLocationSchema = z.object({
  state: z.string().min(1, 'Please select your State or Union Territory'),
  district: z.string().min(1, 'Please select your district'),
  city: z.string().min(2, 'City / Town name is required'),
  constituency: z.string().optional(),
  locality: z.string().min(2, 'Area / Locality / Landmark is required'),
  latitude: z.number().optional(),
  longitude: z.number().optional(),
});

export const complaintStepDetailsSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters').max(200, 'Title cannot exceed 200 characters'),
  description: z.string().min(5, 'Please provide a detailed grievance description'),
  dateStarted: z.string().optional().default(() => new Date().toISOString().split('T')[0]),
  isOngoing: z.boolean().optional().default(true),
  severity: z.enum(['LOW', 'MEDIUM', 'HIGH', 'URGENT']).default('MEDIUM'),
  originalLanguage: z.enum(['en', 'ta', 'hi']).default('en'),
});

export const complaintStepContactSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Please enter a valid email address').optional().or(z.literal('')),
  phone: z.string().optional(),
  preferredLanguage: z.enum(['en', 'ta', 'hi']).default('en'),
  isAnonymous: z.boolean().default(false),
  legalConfirmed: z.boolean().default(true),
});

export const fullComplaintSubmissionSchema = z.object({
  category: z.string().min(1, 'Category is required'),
  subcategory: z.string().optional().default('General Infrastructure'),
  ministry: z.string().optional(),
  state: z.string().min(1, 'State is required'),
  district: z.string().min(1, 'District is required'),
  city: z.string().optional().default(''),
  constituency: z.string().optional(),
  parliamentaryConstituency: z.string().optional(),
  locality: z.string().optional().default(''),
  latitude: z.number().optional(),
  longitude: z.number().optional(),
  title: z.string().min(3, 'Title is too short'),
  description: z.string().min(5, 'Description is too short'),
  aiImprovedTitle: z.string().optional(),
  aiImprovedDescription: z.string().optional(),
  translatedDescription: z.string().optional(),
  dateStarted: z.string().optional().default(() => new Date().toISOString().split('T')[0]),
  isOngoing: z.boolean().optional().default(true),
  severity: z.enum(['LOW', 'MEDIUM', 'HIGH', 'URGENT']).optional().default('MEDIUM'),
  originalLanguage: z.enum(['en', 'ta', 'hi']).default('en'),
  assignedRepresentativeId: z.string().optional(),
  submitterName: z.string().optional().default('Citizen'),
  submitterEmail: z.string().optional().default(''),
  submitterPhone: z.string().optional().default(''),
  submitterLanguage: z.enum(['en', 'ta', 'hi']).default('en'),
  isAnonymous: z.boolean().optional().default(false),
  attachments: z.array(z.object({
    fileName: z.string(),
    fileUrl: z.string(),
    mimeType: z.string(),
    fileSize: z.number(),
  })).optional(),
});
