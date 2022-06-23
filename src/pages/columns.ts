import { Column } from "../types";

export const columns: readonly Column[] = [
  {
    id: "flag",
    label: "Flag",
    numeric: false,
    minWidth: 170,
    align: "center",
  },
  { id: "name", label: "Name", minWidth: 170 },
  { id: "region", label: "Region", minWidth: 100 },
  {
    id: "population",
    label: "Population",
    numeric: true,
    minWidth: 170,
    align: "right",
    format: (value: number) => value.toLocaleString("en-US"),
  },
  {
    id: "languages",
    label: "Languages",
    numeric: false,
    minWidth: 170,
    align: "right",
  },
  {
    id: "capital",
    label: "capital",
    numeric: false,
    minWidth: 170,
    align: "right",
  },
];