import { debounce } from "@mui/material";
import { BsSearch } from "react-icons/bs";

function Custominput({ handleChange, placeholder }) {
  return (
    <div className='search_input flex items-center'>
      <BsSearch size={16} />
      <input
        className='search_input_input'
        type='text'
        onChange={debounce(handleChange, 200)}
        placeholder={placeholder}
      />
    </div>
  );
}

export default Custominput;
