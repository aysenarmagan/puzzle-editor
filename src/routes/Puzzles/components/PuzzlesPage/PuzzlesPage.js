import React, { useState } from "react";
import PropTypes from "prop-types";
import { isEmpty, isLoaded } from "react-redux-firebase";
import { Route, Switch } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { useSelector } from "react-redux";
import { useFirebase, useFirebaseConnect } from "react-redux-firebase";
import PuzzleRoute from "routes/Puzzles/routes/Puzzle";
import { useNotifications } from "modules/notification";
import { renderChildren } from "utils/router";
import LoadingSpinner from "components/LoadingSpinner";
import PuzzleTile from "../PuzzleTile";
import NewPuzzleTile from "../NewPuzzleTile";
import NewPuzzleDialog from "../NewPuzzleDialog";
import styles from "./PuzzlesPage.styles";

const useStyles = makeStyles(styles);

function usePuzzles() {
  const { showSuccess, showError } = useNotifications();
  const firebase = useFirebase();
  // Get auth from redux state
  const auth = useSelector((state) => state.firebase.auth);

  // Attach todos listener
  useFirebaseConnect(() => [
    {
      path: "puzzles",
      queryParams: ["limitToLast=10"],
      // queryParams: ['orderByChild=createdBy', `equalTo=${auth.uid}`]
    },
  ]);

  // Get puzzles from redux state
  const puzzles = useSelector((state) => state.firebase.ordered.puzzles);

  // New dialog
  const [newDialogOpen, changeDialogState] = useState(false);
  const toggleDialog = () => changeDialogState(!newDialogOpen);

  function addPuzzle(newInstance) {
    if (!auth.uid) {
      return showError("You must be logged in to create a puzzle");
    }
    return firebase
      .push("puzzles", {
        ...newInstance,
        createdBy: auth.uid,
        createdAt: firebase.database.ServerValue.TIMESTAMP,
      })
      .then(() => {
        toggleDialog();
        showSuccess("Puzzle added successfully");
      })
      .catch((err) => {
        console.error("Error:", err); // eslint-disable-line no-console
        showError(err.message || "Could not add puzzle");
        return Promise.reject(err);
      });
  }

  return { auth, puzzles, addPuzzle, newDialogOpen, toggleDialog };
}

function PuzzlesPage({ match }) {
  const classes = useStyles();
  const {
    auth,
    puzzles,
    addPuzzle,
    newDialogOpen,
    toggleDialog,
  } = usePuzzles();

  // Show spinner while puzzles are loading
  if (!isLoaded(puzzles)) {
    return <LoadingSpinner />;
  }

  return (
    <Switch>
      {/* Child routes */}
      {renderChildren([PuzzleRoute], match, { auth })}
      {/* Main Route */}
      <Route
        exact
        path={match.path}
        render={() => (
          <div className={classes.root}>
            <NewPuzzleDialog
              onSubmit={addPuzzle}
              open={newDialogOpen}
              onRequestClose={toggleDialog}
            />
            <div className={classes.tiles}>
              <NewPuzzleTile onClick={toggleDialog} />
              {!isEmpty(puzzles) &&
                puzzles.map((puzzle, ind) => {
                  return (
                    <PuzzleTile
                      key={`Puzzle-${puzzle.key}-${ind}`}
                      name={puzzle.value.name}
                      puzzleId={puzzle.key}
                    />
                  );
                })}
            </div>
          </div>
        )}
      />
    </Switch>
  );
}

PuzzlesPage.propTypes = {
  match: PropTypes.object.isRequired, // from enhancer (withRouter)
};

export default PuzzlesPage;
