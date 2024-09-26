export default function Input({ label, invalid, ...props }) {
  let labelClass = "block mb-2 text-xs font-bold tracking-wide uppercase";
  let inputClass =
    "w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow";

  if (invalid) {
    labelClass += " text-red-400";
    inputClass += " bg-red-400";
  } else {
    labelClass += " text-stone-300";
    inputClass += " bg-stone-300";
  }
  return (
    <>
      <label className={labelClass}>{label}</label>
      <input className={inputClass} {...props} />
    </>
  );
}
