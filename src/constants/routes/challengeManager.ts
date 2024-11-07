const constantRoutesChallengeManager = {
  pages: {
    root: '/',
    challenges: {
      root: 'challenges',
      // Children
      details: 'details',
      create: 'create',
    },
    statistic: {
      root: 'statistic',
    },
    tasks: {
      root: 'tasks',
      // Children
      details: 'details',
    },
    solutions: {
      root: 'solutions',
      // Children
      details: 'details',
    },
    reports: {
      root: 'reports',
      // Children
      challenge: {
        root: 'challenges',
      },
      solution: {
        root: 'solutions',
      },
      task: {
        root: 'tasks',
      },
      details: 'details',
    },
  },
};

export default constantRoutesChallengeManager;
