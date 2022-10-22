import React, { useState } from "react";

import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import OutlinedInput from "@mui/material/OutlinedInput";
import ListItemText from "@mui/material/ListItemText";
import Checkbox from "@mui/material/Checkbox";
import { makeStyles } from "@material-ui/core/styles";
import ListItemIcon from "@material-ui/core/ListItemIcon";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
  getContentAnchorEl: null,
  anchorOrigin: {
    vertical: "bottom",
    horizontal: "center",
  },
  transformOrigin: {
    vertical: "top",
    horizontal: "center",
  },
  variant: "menu",
};

const salaries = [
  "Oliver Hansen",
  "Van Henry",
  "April Tucker",
  "Ralph Hubbard",
  "Omar Alexander",
  "Carlos Abbott",
  "Miriam Wagner",
  "Bradley Wilkerson",
  "Virginia Andrews",
  "Kelly Snyder",
];
const useTagStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    width: 300,
  },
  indeterminateColor: {
    color: "#f50057",
  },
  selectAllText: {
    fontWeight: 500,
  },
  selectedAll: {
    backgroundColor: "rgba(0, 0, 0, 0.08)",
    "&:hover": {
      backgroundColor: "rgba(0, 0, 0, 0.08)",
    },
  },
}));
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));
const useOutlinedInputStyles = makeStyles((theme) => ({
  root: {
    "& $notchedOutline": {
      borderColor: "#A3C3E2",
    },
    "&:hover $notchedOutline": {
      borderColor: "#A3C3E2",
    },
    "&$focused $notchedOutline": {
      borderColor: "#A3C3E2",
    },
  },
  focused: {},
  notchedOutline: {},
}));

function App() {
  const classes = useStyles();
  const outlinedInputClasses = useOutlinedInputStyles();
  const tagStyles = useTagStyles();
  const inputLabel = React.useRef(null);

  const [city, setCity] = React.useState("");
  const [selected, setSelected] = useState([]);
  const isAllSelected =
    salaries.length > 0 && selected.length === salaries.length;
  const [labelWidth, setLabelWidth] = React.useState(0);
  React.useEffect(() => {
    setLabelWidth(inputLabel.current.offsetWidth);
  }, []);

  function handleChangeCity(event) {
    setCity((oldValues) => ({
      ...oldValues,
      [event.target.name]: event.target.value,
    }));
  }
  const handleChangeSalary = (event) => {
    const value = event.target.value;
    if (value[value.length - 1] === "all") {
      setSelected(selected.length === salaries.length ? [] : salaries);
      return;
    }
    setSelected(value);
  };

  return (
    <form className={classes.root} autoComplete="off">
      <FormControl
        sx={{ mt: 12, ml: 5, minWidth: 400 }}
        variant="outlined"
        className={classes.formControl}
      >
        <InputLabel
          ref={inputLabel}
          htmlFor="outlined-age-simple"
          id="demo-simple-select-helper-label"
        >
          Grad
        </InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          label="Drzava"
          value={city.age}
          onChange={handleChangeCity}
          input={
            <OutlinedInput
              labelWidth={labelWidth}
              name="age"
              id="outlined-age-simple"
              classes={outlinedInputClasses}
            />
          }
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={10}>Beograd</MenuItem>
          <MenuItem value={20}>Novi Sad</MenuItem>
          <MenuItem value={30}>Nis</MenuItem>
        </Select>
      </FormControl>

      <FormControl
        sx={{ mt: 20, ml: 5, minWidth: 400 }}
        className={tagStyles.formControl}
      >
        <InputLabel id="mutiple-select-label">Visina Plate</InputLabel>
        <Select
          labelId="mutiple-select-label"
          multiple
          value={selected}
          onChange={handleChangeSalary}
          input={
            <OutlinedInput
              labelWidth={labelWidth}
              name="age"
              id="outlined-age-simple"
              classes={outlinedInputClasses}
            />
          }
          renderValue={(selected) => selected.join(", ")}
          MenuProps={MenuProps}
        >
          <MenuItem
            value="all"
            classes={{
              root: isAllSelected ? classes.selectedAll : "",
            }}
          >
            <ListItemIcon>
              <Checkbox
                classes={{ indeterminate: classes.indeterminateColor }}
                checked={isAllSelected}
                indeterminate={
                  selected.length > 0 && selected.length < salaries.length
                }
              />
            </ListItemIcon>
            <ListItemText
              classes={{ primary: classes.selectAllText }}
              primary="Select All"
            />
          </MenuItem>
          {salaries.map((option) => (
            <MenuItem key={option} value={option}>
              <ListItemIcon>
                <Checkbox checked={selected.indexOf(option) > -1} />
              </ListItemIcon>
              <ListItemText primary={option} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </form>
  );
}

export default App;
