import { useSectionStore } from '../stores/useSectionStore';
import { SectionField } from '../types/section';

export const useDownloadCSV = () => {
  const store = useSectionStore();

  const downloadCSV = () => {
    const file = parseCSV();

    const URI =
      'data:text/csv;charset=utf-8,' + '\uFEFF' + encodeURIComponent(file);

    let link = document.createElement('a');
    link.id = 'csv';
    link.download = 'sections.csv';
    link.href = URI;
    document.body.appendChild(link);
    link.style.visibility = 'hidden';
    link.click();

    setTimeout(() => {
      document.body.removeChild(link);
    });
  };

  const capitalize = (input: string): string =>
    input && input.charAt(0).toLocaleUpperCase() + input.slice(1);

  const parseCSV = () => {
    const data = store.sectionsWithoutID;

    if (data !== null) {
      const header = Object.keys(data[0])
        .map((x) => capitalize(x))
        .join(',')
        .concat('\n');
      let content = '';
      data.forEach((row) => {
        content += Object.keys(row)
          .map((val) => {
            return row[val as SectionField] ? row[val as SectionField] : 'N/A';
          })
          .join(',');
        content += '\n';
      });
      return header + content;
    }
    return '';
  };

  return {
    downloadCSV,
  };
};
