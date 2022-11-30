export default function Input({
    onChange,
    onBlur, // used to trigger onBlur for form validation
    value,
    id,
    name,
    type,
    placeholder,
    isInvalid, // used to change border color
    className // to override any styling
}){
  return(
    <div className="my-3">
      <input
        onChange={onChange}
        onBlur={onBlur}
        value={value}
        id={id}
        name={name}
        type={type}
        className={`rounded-lg h-[32px] appearance-none relative block w-full px-3 py-1 border placeholder-gray-300 text-gray-900 focus:outline-none focus:z-10 sm:text-sm ${isInvalid ? "border-rose-500" : "border-gray-300 focus:ring-emerald-400 hover:border-emerald-400 focus:border-emerald-400"} ${className}`}
        placeholder={placeholder}
      />
    </div>
  )
}