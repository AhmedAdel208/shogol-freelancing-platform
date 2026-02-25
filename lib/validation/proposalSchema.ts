import { z } from "zod";

export const proposalSchema = z.object({
  jobRequestId: z.number(),
  description: z.string().min(20, "يجب أن يكون الوصف 20 حرفاً على الأقل"),
  proposedPrice: z
    .number({ message: "أدخل سعراً صحيحاً" })
    .min(1, "السعر يجب أن يكون أكبر من 0"),
  proposedDurationInDays: z
    .number({ message: "أدخل مدة صحيحة" })
    .min(1, "المدة يجب أن تكون أكبر من 0"),
});

export type ProposalFormData = z.infer<typeof proposalSchema>;
