import { useId } from "react";
import cls from "./SearchInput.module.css";
import { SearchIcon } from "../icons";

const SearchInput = ({ value, onChange }) => {
  const inputId = useId();

  return (
    <div className={cls.inputContainer}>
      <label htmlFor={inputId}>
        <SearchIcon className={cls.searchIcon} />
      </label>
      <input className={cls.input} id={inputId} type="text" placeholder="search..." value={value} onChange={onChange} />
    </div>
  );
};

export default SearchInput;
