import React from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { useFirebaseConnect, isLoaded } from "react-redux-firebase";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import LoadingSpinner from "components/LoadingSpinner";
import styles from "./PuzzlePage.styles";

const useStyles = makeStyles(styles);

function PuzzlePage() {
  const { puzzleId } = useParams();
  const classes = useStyles();

  // Create listener for puzzles
  useFirebaseConnect(() => [{ path: `puzzles/${puzzleId}` }]);

  // Get puzzles from redux state
  const puzzle = useSelector(({ firebase: { data } }) => {
    return data.puzzles && data.puzzles[puzzleId];
  });

  const createdDate = new Date(puzzle.createdAt).toString();

  // Show loading spinner while puzzle is loading
  if (!isLoaded(puzzle)) {
    return <LoadingSpinner />;
  }

  return (
    <div className={classes.root}>
      <Card className={classes.card}>
        <CardContent>
          <Typography className={classes.title} component="h2">
            {puzzle.name || "Puzzle"} {puzzleId}
          </Typography>
          <Typography variant="caption" display="block" gutterBottom>
            Created At: {createdDate}
          </Typography>
          <Typography variant="caption" display="block" gutterBottom>
            Created By: {puzzle.createdBy}
          </Typography>

          <div style={{ marginTop: "10rem" }}>
            <pre>{JSON.stringify(puzzle, null, 2)}</pre>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default PuzzlePage;
