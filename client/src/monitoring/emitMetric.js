export const emitMetric = async (metric) => {
  try {
    console.log(metric)
    // await fetch("http://localhost:5000/api/proctoring/session/14277ce0-debc-4e93-99ff-40f42f7e4853/violation", {
    //   method: "POST",
    //   body: JSON.stringify(metric),
    // });
  } catch (err) {
    console.error("Metric send failed:", err);
  }
};
