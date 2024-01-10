import { createContext, useReducer } from "react";

export const RunContext = createContext();

export const RunContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(runReducer, {
    runs: null,
    stats: {
      cumulativeMileage: 0,
      movingMileage: 0,
      movingPace: { minutes: 0, seconds: 0 },
      averagePace: { minutes: 0, seconds: 0 },
    },
  });
  // dispatch an action comprising type and payload

  return (
    <RunContext.Provider value={{ ...state, dispatch }}>
      {children}
    </RunContext.Provider>
  );
};

const runReducer = (state, action) => {
  switch (action.type) {
    case "SET_RUNS":
      return {
        ...state,
        runs: action.payload,
      };

    case "ADD_RUN":
      return {
        ...state,
        runs: [action.payload, ...state.runs],
      };

    case "DELETE_RUN":
      return {
        ...state,
        runs: state.runs.filter((run) => run._id !== action.payload._id),
      };

    case "UPDATE_RUN":
      const index = state.runs.findIndex(
        (run) => run._id === action.payload._id
      );
      state.runs[index] = action.payload;

      return state;

    case "COMPUTE_STATS":
      if (state.runs.length === 0) {
        return {
          ...state,
          stats: {
            cumulativeMileage: 0,
            movingMileage: 0,
            movingPace: { minutes: 0, seconds: 0 },
            averagePace: { minutes: 0, seconds: 0 },
          },
        };
      } else {
        const runs = state.runs;
        const date = new Date();

        // average stats

        let mileage = runs
          .map((run) => run.distance)
          .reduce((acc, val) => acc + val, 0);

        let duration = runs
          .map((run) => run.duration.minutes * 60 + run.duration.seconds)
          .reduce((acc, val) => acc + val, 0);

        let averageDuration = duration / mileage;

        // const averageMileage = mileage / runs.length;

        const averagePace = {
          minutes: Math.floor(averageDuration / 60),
          seconds: averageDuration - Math.floor(averageDuration / 60) * 60,
        };

        // moving stats

        let movingRuns = runs.filter((run) => {
          const runDate = new Date(run.createdAt);
          const days =
            Math.abs(runDate.getTime() - date.getTime()) /
            (24 * 60 * 60 * 1000);

          return days < 30;
        });

        if (movingRuns.length === 0) {
          return {
            ...state,
            stats: {
              cumulativeMileage: 0,
              movingMileage: 0,
              movingPace: { minutes: 0, seconds: 0 },
              averagePace,
            },
          };
        } else {
          mileage = movingRuns
            .map((run) => run.distance)
            .reduce((acc, val) => acc + val, 0);

          duration = movingRuns
            .map((run) => run.duration.minutes * 60 + run.duration.seconds)
            .reduce((acc, val) => acc + val, 0);

          averageDuration = duration / mileage;

          const cumulativeMileage = mileage;

          const movingMileage = mileage / movingRuns.length;

          const movingPace = {
            minutes: Math.floor(averageDuration / 60),
            seconds: averageDuration - Math.floor(averageDuration / 60) * 60,
          };

          return {
            ...state,
            stats: {
              cumulativeMileage,
              movingMileage,
              movingPace,
              averagePace,
            },
          };
        }
      }

    default:
      return state;
  }
};
