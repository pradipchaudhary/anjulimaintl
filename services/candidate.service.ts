// services/candidate.service.ts
import { CandidateDTO } from "@/types/candidate";
import api from "./apiClient";

export const candidateService = {
    list: () => api.get("/candidates"),
    get: (id: string) => api.get(`/candidates/${id}`),
    create: (payload: CandidateDTO) => api.post("/candidates", payload),
    update: (id: string, payload: Partial<CandidateDTO>) => api.put(`/candidates/${id}`, payload),
    remove: (id: string) => api.delete(`/candidates/${id}`)
};