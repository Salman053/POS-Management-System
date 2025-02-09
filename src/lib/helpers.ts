  // Helper function to clean prices
 export  const cleanPrice = (price: any) => {
    if (!price) return 0; // Default value if undefined/null
    return Number(price.toString().replace(/Rs\.\s*/i, "").trim()) || 0;
};


interface ExportConfig {
  fileName?: string;
  headers?: string[];
  excludeFields?: string[];
}

export const exportToCSV = <T extends Record<string, any>>(
  data: T[],
  config?: ExportConfig
) => {
  try {
    if (!data.length) throw new Error('No data to export');

    // Get headers from first item if not provided
    const headers = config?.headers || Object.keys(data[0])
      .filter(key => !config?.excludeFields?.includes(key));

    // Create CSV content
    const csvContent = [
      headers.join(','), // Header row
      ...data.map(item => 
        headers.map(header => 
          JSON.stringify(item[header] ?? '')
        ).join(',')
      )
    ].join('\n');

    // Create and trigger download
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    
    link.setAttribute('href', url);
    link.setAttribute('download', `${config?.fileName || 'export'}_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } catch (error) {
    console.error('Export failed:', error);
    throw new Error('Failed to export data');
  }
};