export default function InputSection(props: {
  value: string;
  text: string;
  type: string;
  placeholder: string;
  dataKey: string;
  onChange: any | undefined;
  pattern?: string;
}) {
  return (
    <div className="flex flex-col gap-1.5 py-3">
      <label className="text-[#a3a3a3] text-xs uppercase tracking-widest font-medium">
        {props.text}
      </label>
      <input
        className="bg-[#1a1a1a] border border-[#2a2a2a] focus:border-[#ff4d00] outline-none text-[#e5e5e5] rounded-lg px-4 py-2.5 text-sm transition-colors w-full"
        type={props.type}
        pattern={props.pattern}
        placeholder={props.placeholder}
        value={props.value}
        name={props.dataKey}
        data-key={props.dataKey}
        required
        onChange={props.onChange}
      />
    </div>
  );
}
