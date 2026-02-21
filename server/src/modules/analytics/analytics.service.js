import pool from "../../config/db.js";
import * as queries from "./analytics.queries.js";

export async function getFullAnalyticsService(userId) {
  const client = await pool.connect();

  try {

    // 📈 Performance Trend
    const trendRes = await client.query(
      queries.getPerformanceTrendQuery,
      [userId]
    );

    // 📉 Weakest Dimension
    const dimensionRes = await client.query(
      queries.getDimensionAveragesQuery,
      [userId]
    );

    const dimensions = dimensionRes.rows[0];

    // detect weakest
    const weakestDimension = Object.entries(dimensions)
      .sort((a, b) => a[1] - b[1])[0]?.[0] || null;

    // 🏆 Best Session
    const bestRes = await client.query(
      queries.getBestSessionQuery,
      [userId]
    );

    // ⚠ Risk Heatmap
    const heatmapRes = await client.query(
      queries.getRiskHeatmapQuery,
      [userId]
    );

    // 🧠 Behavioral Risk
    const riskRes = await client.query(
      queries.getBehavioralRiskQuery,
      [userId]
    );

    const risk = riskRes.rows[0];

    return {
      performanceTrend: trendRes.rows,

      dimensionAverages: dimensions,
      weakestDimension,

      bestSession: bestRes.rows[0] || null,

      riskHeatmap: heatmapRes.rows,

      behavioralRisk: {
        avgRiskScore: risk.avg_risk_score,
        highRiskSessions: Number(risk.high_risk_sessions),
        totalSessions: Number(risk.total_sessions)
      }
    };

  } finally {
    client.release();
  }
}

