import React from "react";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";
import Paper from "@material-ui/core/Paper";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import DeleteIcon from "@material-ui/icons/Delete";
import { makeStyles } from "@material-ui/core/styles";
import { useFirebase } from "react-redux-firebase";
import { LIST_PATH } from "constants/paths";
import styles from "./PuzzleTile.styles";
import useNotifications from "modules/notification/components/useNotifications";

const useStyles = makeStyles(styles);

function PuzzleTile({ name, puzzleId, showDelete }) {
  const classes = useStyles();
  const history = useHistory();
  const firebase = useFirebase();
  const { showError, showSuccess } = useNotifications();

  function goToPuzzle() {
    return history.push(`${LIST_PATH}/${puzzleId}`);
  }

  function deletePuzzle() {
    return firebase
      .remove(`puzzles/${puzzleId}`)
      .then(() => showSuccess("Puzzle deleted successfully"))
      .catch((err) => {
        console.error("Error:", err); // eslint-disable-line no-console
        showError(err.message || "Could not delete puzzle");
        return Promise.reject(err);
      });
  }

  return (
    <Paper className={classes.root}>
      <div className={classes.top}>
        {showDelete ? (
          <Tooltip title="delete">
            <IconButton onClick={deletePuzzle}>
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        ) : null}
      </div>
      <div className={classes.center}>
        <span className={classes.name} onClick={goToPuzzle}>
          {name || "No Name"}
        </span>
      </div>
    </Paper>
  );
}

PuzzleTile.propTypes = {
  name: PropTypes.string,
};

PuzzleTile.defaultProps = {
  showDelete: true,
};

export default PuzzleTile;
