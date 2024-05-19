import './style.css';
const Input = ({ type, place, value, onchange, id }) => {
  return (
    <div className="group">
      <input
        id={id}
        type={type}
        value={value}
        placeholder={place}
        onChange={onchange}
      />
    </div>
  );
};
export default Input;