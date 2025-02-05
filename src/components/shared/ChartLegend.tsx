
const ChartLegend = () => {
  const legends = [
    { color: '#2563EB', label: 'Revenue' },
    { color: '#16A34A', label: 'Profit' },
    { color: '#DC2626', label: 'Expense' },
  ];

  return (
    <div className="flex items-center gap-3 ">
      {legends.map((legend, index) => (
        <div key={index} className="flex items-center gap-1">
          <div style={{ backgroundColor: legend.color }} className="md:w-4 md:h-4 w-3 h-3 rounded-full"></div>
          <span className="md:text-sm text-xs text-gray-700 dark:text-white">{legend.label}</span>
        </div>
      ))}
    </div>
  );
};

export default ChartLegend;