import * as z from 'zod';

import { FORM_ERROR_MESSAGES } from '../constants';

export const validatedFormSchema = z.object({
  id: z.string().min(1, FORM_ERROR_MESSAGES.name.required),
  name: z
    .string()
    .min(1, FORM_ERROR_MESSAGES.name.required)
    .regex(/^[A-Z][a-zA-Z]/, FORM_ERROR_MESSAGES.name.pattern),
  gender: z.enum(['Male', 'Female', 'Unknown']),
  status: z.enum(['Alive', 'Dead', 'Unknown']),

  species: z.string().min(1, FORM_ERROR_MESSAGES.name.required),
  location: z.string().min(1, FORM_ERROR_MESSAGES.name.required),
  lastLocation: z.string().min(1, FORM_ERROR_MESSAGES.name.required),
  file: z
    .string()
    .refine((val) => val.length > 0, FORM_ERROR_MESSAGES.file.required)
    .refine(
      (val) => /image\/(png|jpeg)/.test(val.split(',')[0]),
      FORM_ERROR_MESSAGES.file.type
    ),
});
