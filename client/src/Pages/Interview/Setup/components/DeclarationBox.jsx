const DeclarationBox = ({ checked, onChange }) => {
  return (
    <div className="flex items-start gap-3">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="mt-1"
      />
      <p className="text-sm text-gray-700">
        I have read and agree to the proctoring rules and understand that
        malpractice may lead to termination of the interview.
      </p>
    </div>
  );
};

export default DeclarationBox;