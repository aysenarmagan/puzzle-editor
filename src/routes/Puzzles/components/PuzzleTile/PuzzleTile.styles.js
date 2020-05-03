export default (theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    height: "200px",
    width: "300px",
    margin: theme.spacing(0.5),
    padding: theme.spacing(1.3),
  },
  top: {
    display: "flex",
    justifyContent: "flex-end",
    width: "100%",
  },
  center: {
    display: "flex",
    height: "300px",
    justifyContent: "center",
    alignItems: "center",
  },
  name: {
    fontSize: "1.5rem",
    cursor: "pointer",
    textDecoration: "none",
    transition: "all 800ms cubic-bezier(0.25,0.1,0.25,1) 0ms",
    textOverflow: "ellipsis",
    overflow: "hidden",
    whiteSpace: "nowrap",
    marginBottom: "50px",

    "&:hover": {
      color: "grey",
    },
    "&:visited": {
      textDecoration: "none",
      color: "purple",
    },
  },
});
