import { Loadable } from "utils/components";

export default {
  path: ":puzzleId",
  component: Loadable({
    loader: () =>
      import(/* webpackChunkName: 'Puzzle' */ "./components/PuzzlePage"),
  }),
};
