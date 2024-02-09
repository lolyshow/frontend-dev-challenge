export interface SelectType {
  id: string;
  name: string;
}


export interface MultiSelectProps {
  options: SelectType[];
  setSelected: (selected: SelectType) => void;
  selected: SelectType|undefined;
}