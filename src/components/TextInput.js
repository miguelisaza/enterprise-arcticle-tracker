function TextInput({ type, id, placeholder, value, onChange, className }) {
  return (
    <input
      type={type}
      id={id}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={`block w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500 ${className}`}
    />
  );
}

export default TextInput;