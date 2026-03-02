export function createBehaviorTracker({
  thresholdDuration = 4000,
  gracePeriod = 300,
  cooldownDuration = 3000,
}) {

  let violationStart = null;
  let lastTriggered = null;

  return function update(isActive) {
    const now = Date.now();

    if (isActive) {
      if (!violationStart) {
        violationStart = now;
      }

      const duration = now - violationStart;

      if (duration >= thresholdDuration) {

        if (
          !lastTriggered ||
          now - lastTriggered > cooldownDuration
        ) {
          lastTriggered = now;
          violationStart = null;

          return {
            triggered: true,
            duration,
          };
        }
      }
    } else {
      if (violationStart && now - violationStart < gracePeriod) {
        // Ignore short flicker
      }
      violationStart = null;
    }

    return { triggered: false };
  };
}
