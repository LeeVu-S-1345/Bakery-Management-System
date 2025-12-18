const InfoTable = ({ title, variant, data, editable = false, onValueChange }) => {
  const headerClass = {
    red: "table-header-red",
    green: "table-header-green",
    gray: "table-header-gray",
    blue: "table-header-blue",
  }[variant];

  return (
    <div className="border border-border rounded-lg overflow-hidden">
      <div className={`${headerClass} text-center py-2`}>{title}</div>
      <table className="w-full">
        <thead>
          <tr className="border-b border-border bg-muted/30">
            <th className="py-2 px-4 text-center text-sm font-medium">Information</th>
            <th className="py-2 px-4 text-center text-sm font-medium">Details</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr key={index} className="border-b border-border last:border-b-0">
              <td className="py-2 px-4 text-sm font-medium">{row.label}</td>
              <td className="py-2 px-4">
                {editable ? (
                  <input
                    type="text"
                    value={row.value}
                    onChange={(e) => onValueChange?.(index, e.target.value)}
                    className="w-full bg-transparent text-sm border-b border-transparent focus:border-primary focus:outline-none"
                  />
                ) : (
                  <span className="text-sm text-muted-foreground">{row.value}</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default InfoTable;
