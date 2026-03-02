export const normalizeReport = (data) => {
  return {
    ...data,
    behavioralRisk: {
      ...data.behavioralRisk,
      avgRiskScore: Number(data.behavioralRisk?.avgRiskScore || 0),
      highRiskSessions: Number(data.behavioralRisk?.highRiskSessions || 0),
      totalSessions: Number(data.behavioralRisk?.totalSessions || 0),
    },
    bestSession: data.bestSession
      ? {
          ...data.bestSession,
          overall_score: Number(data.bestSession.overall_score),
        }
      : null,
  };
};