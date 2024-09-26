export default function MenuItem({ title, index, onSelectedItem }) {
  return (
    <button
      onClick={() => onSelectedItem(index)}
      className="w-full text-left px-2 py-1 rounded-sm my-1 hover:text-stone-200 hover:bg-stone-800"
    >
      {title}
    </button>
  );
}
