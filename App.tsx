
import React, { useState, useMemo, useEffect } from 'react';

// --- TYPES ---
export enum AppView {
  DISTRICT_DETAILS = 'DISTRICT_DETAILS'
}

export interface Member {
  id: number;
  values: string[]; // Store all column values as strings
}

export interface SheetData {
  headers: string[];
  members: Member[];
}

// --- CONSTANTS ---
export const DISTRICTS = [
  'АЕРОПОРТ',
  'КАСКАД',
  'ЦЕНТР',
  'ОБ\'ЇЗНА'
];

// Provided Google Sheet ID
export const GOOGLE_SHEET_ID = '1s_Wio5niYvq2HRoBYwH3bS9NEcbtsJsWXv5P7u5Zhw8'; 

export const MOCK_MEMBERS: Member[] = [
  { 
    id: 1, 
    values: [
      'Іваненко Петро Олексійович', 
      'АЕРОПОРТ',
      '+380 50 123 4567', 
      'Активний',
      '45',
      '12',
      'вул. Коновальця, 12', 
      'Хор',
      '90%',
      'Так',
      '12.05.2024'
    ]
  },
  { 
    id: 2, 
    values: [
      'Сидоренко Ганна Михайлівна', 
      'КАСКАД',
      '+380 67 987 6543', 
      'Опіка',
      '72',
      '30',
      'вул. Чорновола, 45', 
      'Молитовне',
      '50%',
      'Рідко',
      '01.06.2024'
    ]
  },
  { 
    id: 3, 
    values: [
      'Мельник Василь Ігорович', 
      'ЦЕНТР',
      '+380 93 456 7890', 
      'Активний',
      '33',
      '5',
      'вул. Незалежності, 8', 
      'Порядок',
      '100%',
      'Так',
      '10.06.2024'
    ]
  }
];

const TABLE_LABELS = [
  'ПІБ', 'Дати\nконтактів', 'ПРИМІТКИ', 'Дії_(для_адміністратора)', 'Опіка', 
  'Служіння', 'Відвідування', 'Присутність', 'Вік', 'Стать', 
  'Адрес', 'Телефон', 'Дата народж.', 'Ос-та', 'Хр. С.Д.', 
  'Сім. Стан', 'Соц. Стан', 'В.Х.', 'В_церкві_з', 'К-ть років в церкві'
];

interface ModalProps {
  member: Member | null;
  onClose: () => void;
}

const PersonalCardModal: React.FC<ModalProps> = ({ member, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    if (member) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [member, onClose]);

  if (!member) return null;

  const getData = (idx: number) => member.values[idx] || '';

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black bg-opacity-70 p-4" onClick={onClose}>
      <div 
        className="bg-[#2e5591] w-full max-w-[500px] p-6 rounded shadow-2xl relative border-2 border-white overflow-y-auto max-h-[95vh] custom-scrollbar"
        onClick={(e) => e.stopPropagation()}
      >
        <button 
          onClick={onClose}
          className="absolute top-2 right-4 text-white text-3xl font-bold hover:text-yellow-400"
        >
          &times;
        </button>

        <h2 className="text-white text-xl font-bold mb-6 text-center underline uppercase tracking-widest">
          ОСОБОВА КАРТКА
        </h2>

        <div className="space-y-4">
          <div>
            <label className="text-[#ffff00] font-bold block text-sm mb-1 uppercase">ПІБ</label>
            <div className="bg-white border-2 border-black w-full px-3 py-2 text-black font-bold min-h-[40px]">
              {getData(2)}
            </div>
          </div>

          <div>
            <label className="text-[#ffff00] font-bold block text-sm mb-1 uppercase">№ тел.</label>
            <div className="bg-white border-2 border-black w-full px-3 py-2 text-black font-bold min-h-[40px]">
              {getData(14)}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-[#ffff00] font-bold block text-sm mb-1 uppercase">Район</label>
              <div className="bg-white border-2 border-black w-full px-3 py-2 text-black font-bold min-h-[40px]">
                {getData(1)}
              </div>
            </div>
            <div>
              <label className="text-[#ffff00] font-bold block text-sm mb-1 uppercase">Опіка</label>
              <div className="bg-white border-2 border-black w-full px-3 py-2 text-black font-bold min-h-[40px]">
                {getData(6)}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-[#ffff00] font-bold block text-sm mb-1 uppercase">Вік</label>
              <div className="bg-white border-2 border-black w-full px-3 py-2 text-black font-bold min-h-[40px]">
                {getData(10)}
              </div>
            </div>
            <div>
              <label className="text-[#ffff00] font-bold block text-sm mb-1 uppercase">Років в церкві</label>
              <div className="bg-white border-2 border-black w-full px-3 py-2 text-black font-bold min-h-[40px]">
                {getData(22)}
              </div>
            </div>
          </div>

          <div>
            <label className="text-[#ffff00] font-bold block text-sm mb-1 uppercase">Адрес</label>
            <div className="bg-white border-2 border-black w-full px-3 py-2 text-black font-bold min-h-[80px] break-words">
              {getData(13)}
            </div>
          </div>

          <div>
            <label className="text-[#ffff00] font-bold block text-sm mb-1 uppercase">Служіння</label>
            <div className="bg-white border-2 border-black w-full px-3 py-2 text-black font-bold min-h-[80px] break-words">
              {getData(7)}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-[#ffff00] font-bold block text-sm mb-1 uppercase">Відвідування</label>
              <div className="bg-white border-2 border-black w-full px-3 py-2 text-black font-bold min-h-[40px]">
                {getData(8)}
              </div>
            </div>
            <div>
              <label className="text-[#ffff00] font-bold block text-sm mb-1 uppercase">Присутність</label>
              <div className="bg-white border-2 border-black w-full px-3 py-2 text-black font-bold min-h-[40px]">
                {getData(9)}
              </div>
            </div>
          </div>

          <div className="pt-2">
            <label className="text-[#ffff00] font-bold block text-xs mb-1 text-center uppercase">Крайня дата контакту з пресвітером.</label>
            <div className="bg-white border-2 border-black w-full px-3 py-2 text-black font-bold min-h-[40px] text-center">
              {getData(3)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const App: React.FC = () => {
  const [selectedDistrict, setSelectedDistrict] = useState<string>('ВСІ');
  const [activeMember, setActiveMember] = useState<Member | null>(null);
  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [lastUpdated, setLastUpdated] = useState<string>('');

  const today = useMemo(() => new Date(), [loading]);

  const EXCLUDED_INDICES = [0, 1, 11];

  const stripHtml = (html: string) => {
    return (html || '').replace(/<[^>]*>?/gm, '').trim();
  };

  const parseDate = (dateStr: string): Date | null => {
    const clean = (dateStr || '').trim().replace(/[^\d.]/g, '');
    const parts = clean.split('.');
    if (parts.length < 3) return null;
    
    let day = parseInt(parts[0], 10);
    let month = parseInt(parts[1], 10) - 1;
    let year = parseInt(parts[2], 10);
    
    if (isNaN(day) || isNaN(month) || isNaN(year)) return null;
    if (year < 100) year += 2000;
    
    const d = new Date(year, month, day);
    return isNaN(d.getTime()) ? null : d;
  };

  const processContactDate = (val: string) => {
    const SALAD_COLOR = '#CCFFCC';
    const LEMON_COLOR = '#FFF9C4';
    const RED_COLOR = '#FFCCCC';

    const rawText = stripHtml(val || '');
    const dateMatches = rawText.match(/\d{1,2}\.\d{1,2}\.\d{2,4}/g) || [];

    if (dateMatches.length === 0) {
      return { 
        display: <span className="opacity-50">-</span>, 
        style: { backgroundColor: RED_COLOR }, 
        tooltip: rawText || 'Немає даних' 
      };
    }

    const parsedResults = dateMatches.map(dStr => ({
      raw: dStr,
      obj: parseDate(dStr)
    }));

    const validResults = parsedResults.filter(r => r.obj !== null);
    
    if (validResults.length === 0) {
      return { 
        display: <span>{rawText}</span>, 
        style: { backgroundColor: RED_COLOR }, 
        tooltip: rawText 
      };
    }

    const lastValid = validResults[validResults.length - 1];
    const d = lastValid.obj!;
    const year = d.getFullYear();
    const month = d.getMonth();

    let bgColor = RED_COLOR;
    if (year > 2025 || (year === 2025 && month >= 11)) {
      bgColor = SALAD_COLOR;
    } else if (year === 2025 && month === 10) {
      bgColor = LEMON_COLOR;
    } else {
      bgColor = RED_COLOR;
    }

    const displayElement = (
      <div className="flex flex-wrap justify-center items-center gap-1 leading-tight w-full overflow-hidden">
        {parsedResults.map((pr, i) => (
          <span key={i} className={i === parsedResults.length - 1 ? "font-black text-[12px]" : "opacity-60 text-[10px]"}>
            {pr.raw}{i < parsedResults.length - 1 ? ' / ' : ''}
          </span>
        ))}
      </div>
    );

    return { 
      display: displayElement, 
      style: { backgroundColor: bgColor }, 
      tooltip: dateMatches.join(' / ')
    };
  };

  const parseCSV = (text: string): string[][] => {
    const results: string[][] = [];
    let row: string[] = [];
    let field = "";
    let inQuotes = false;
    for (let i = 0; i < text.length; i++) {
      const char = text[i];
      const nextChar = text[i + 1];
      if (char === '"' && inQuotes && nextChar === '"') {
        field += '"'; i++;
      } else if (char === '"') {
        inQuotes = !inQuotes;
      } else if (char === ',' && !inQuotes) {
        row.push(field.trim()); field = "";
      } else if ((char === '\r' || char === '\n') && !inQuotes) {
        if (field || row.length > 0) {
          row.push(field.trim()); results.push(row); row = []; field = "";
        }
        if (char === '\r' && nextChar === '\n') i++;
      } else {
        field += char;
      }
    }
    if (field || row.length > 0) {
      row.push(field.trim()); results.push(row);
    }
    return results;
  };
  
  const fetchSheetData = async () => {
    setLoading(true);
    try {
      const sheetName = encodeURIComponent('СПИСОК');
      const url = `https://docs.google.com/spreadsheets/d/${GOOGLE_SHEET_ID}/gviz/tq?tqx=out:csv&sheet=${sheetName}&cachebust=${Date.now()}`;
      const response = await fetch(url);
      const csvText = await response.text();
      const rows = parseCSV(csvText);
      const parsedMembers: Member[] = [];

      for (let i = 0; i < rows.length; i++) {
        const columns = rows[i];
        if (columns.length < 3) continue;
        const nameValue = columns[2] || '';
        const lowerName = nameValue.toLowerCase();
        const isHeader = i === 0 || lowerName === 'піб' || lowerName.includes('фото') || nameValue.trim() === '';
        if (!isHeader && nameValue.length > 3) {
          parsedMembers.push({ id: i, values: columns });
        }
      }
      setMembers(parsedMembers);
      setLastUpdated(new Date().toLocaleTimeString());
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchSheetData(); }, []);

  const filteredMembers = useMemo(() => {
    if (selectedDistrict === 'ВСІ') return members;
    const searchVal = selectedDistrict.toUpperCase().trim();
    return members.filter(m => (m.values[1] || '').toUpperCase().trim() === searchVal);
  }, [members, selectedDistrict]);

  const presbyterName = useMemo(() => {
    return 'Припхан Василь Степанович';
  }, []);

  const handleExit = () => {
    if (confirm('Ви впевнені, що хочете закрити вкладку?')) {
      window.close();
      setTimeout(() => {
        alert('Неможливо закрити вкладку автоматично. Будь ласка, закрийте її вручну.');
      }, 300);
    }
  };

  return (
    <div className="min-h-screen bg-[#244155] border-l-[30px] border-[#00bfff] flex flex-col relative overflow-hidden">
      <div className="w-full text-center py-6 shrink-0">
        <h1 className="text-white text-2xl font-bold tracking-widest leading-tight px-4 uppercase">
          УКРАЇНСЬКА ЦЕРКВА ХРИСТИЯН ВІРИ ЄВАНГЕЛЬСЬКОЇ<br />
          М. ІВАНО-ФРАНКІВСЬКА
        </h1>
      </div>

      <div className="flex flex-wrap items-end px-10 py-4 w-full gap-x-10 gap-y-6 shrink-0">
        <div className="flex flex-col items-start min-w-[140px]">
          <span className="text-white text-[10px] mb-1 italic opacity-80 uppercase font-bold">база даних</span>
          <button 
            onClick={fetchSheetData}
            disabled={loading}
            className={`py-1.5 px-3 text-[10px] font-bold rounded uppercase shadow-md transition-all active:scale-95 border border-gray-500 min-w-[110px] mb-1 ${loading ? 'bg-gray-500 cursor-not-allowed text-gray-300' : 'bg-[#4db6ac] hover:bg-[#39968d] text-black'}`}
          >
            {loading ? 'ОБРОБКА...' : 'ОНОВИТИ ДАНІ'}
          </button>
          <div className="text-left text-white opacity-60 text-[9px] flex flex-col font-bold uppercase italic leading-tight space-y-0.5">
            <span>Сьогодні: {today.toLocaleDateString()}</span>
            <span>Оновлено: {lastUpdated || '...'}</span>
          </div>
        </div>

        <div className="flex flex-col items-center">
          <span className="text-white text-[10px] mb-1 italic opacity-80 uppercase font-bold">вибрати район</span>
          <div className="relative">
            <select 
              value={selectedDistrict}
              onChange={(e) => setSelectedDistrict(e.target.value)}
              className="bg-[#9ca3af] text-black py-2 pl-4 pr-10 text-xl font-bold rounded uppercase w-[220px] text-center shadow-md border border-gray-400 appearance-none cursor-pointer focus:outline-none hover:bg-gray-300 transition-colors"
            >
              {DISTRICTS.map(d => <option key={d} value={d}>{d}</option>)}
              <option value="ВСІ">ВСІ</option>
            </select>
          </div>
        </div>

        <div className="flex flex-col items-center">
          <span className="text-white text-[10px] mb-1 italic uppercase font-bold">к-ть членів</span>
          <div className="bg-[#9ca3af] text-black py-2 px-6 text-xl font-bold rounded min-w-[80px] text-center shadow-md border border-gray-400">
            {filteredMembers.length}
          </div>
        </div>

        <div className="flex flex-col items-center">
          <span className="text-white text-[10px] mb-1 italic uppercase font-bold">пресвітер</span>
          <div className="bg-[#9ca3af] text-black py-2 px-8 text-lg font-bold rounded min-w-[280px] text-center shadow-md border border-gray-400 whitespace-nowrap overflow-hidden text-ellipsis">
            {selectedDistrict === 'ВСІ' ? 'Районні пресвітери' : presbyterName}
          </div>
        </div>
      </div>

      <div className="flex flex-col px-10 py-4 gap-4 flex-1 overflow-hidden">
        <div className="flex flex-row gap-4 w-full justify-start items-center shrink-0">
          <button className="bg-[#4db6ac] min-w-[120px] text-black py-2 px-4 text-xs font-bold rounded uppercase hover:bg-[#39968d] shadow-lg transition-colors">СПИСОК</button>
          <button className="bg-[#4db6ac] min-w-[120px] text-black py-2 px-4 text-xs font-bold rounded uppercase hover:bg-[#39968d] shadow-lg transition-colors">ОПІКА</button>
          <button className="bg-[#4db6ac] min-w-[120px] text-black py-2 px-4 text-xs font-bold rounded uppercase hover:bg-[#39968d] shadow-lg transition-colors">СТАТ-КА</button>
        </div>

        <div className="bg-[#b2cfb6] rounded border-2 border-black shadow-2xl flex flex-col h-[500px] shrink-0">
          <div className="flex-1 overflow-auto custom-scrollbar relative">
            <table className="w-full text-left text-black ui-font text-[11px] border-collapse">
              <thead className="sticky top-0 z-50">
                <tr className="bg-[#a4c2a8] border-b-2 border-black">
                  <th className="py-3 px-2 border-r border-black w-10 min-w-[40px] text-center sticky left-0 bg-[#a4c2a8] z-[60] font-black">№</th>
                  
                  {TABLE_LABELS.map((label, idx) => {
                    const isNameColumn = idx === 0;
                    const isDatesColumn = idx === 1;
                    const isNotesColumn = idx === 2;
                    const isActionsColumn = idx === 3;
                    const isCareColumn = idx === 4;
                    const isServiceColumn = idx === 5;
                    const isVisitationColumn = idx === 6;
                    const isPresenceColumn = idx === 7;
                    const isAgeColumn = idx === 8;

                    let widthClass = 'min-w-[160px]';
                    if (isNameColumn) widthClass = 'min-w-max sticky left-[40px] z-[60] bg-[#a4c2a8]';
                    if (isDatesColumn) widthClass = 'min-w-[100px] text-center';
                    if (isNotesColumn) widthClass = 'min-w-[180px] max-w-[180px]';
                    if (isActionsColumn || isCareColumn || isVisitationColumn || isPresenceColumn) widthClass = 'min-w-max';
                    if (isAgeColumn) widthClass = 'min-w-[45px] text-center';
                    
                    return (
                      <th 
                        key={idx} 
                        className={`py-3 px-2 border-r border-black font-black uppercase text-slate-900 whitespace-nowrap ${widthClass}`}
                      >
                        {label}
                      </th>
                    );
                  })}
                </tr>
              </thead>
              <tbody className="relative z-10">
                {filteredMembers.map((m, idx) => (
                  <tr key={idx} className="border-b border-black hover:bg-[#9dbb9f] cursor-pointer group transition-colors" onDoubleClick={() => setActiveMember(m)}>
                    <td className="py-1 px-2 border-r border-black text-center sticky left-0 z-20 bg-[#b2cfb6] group-hover:bg-[#9dbb9f] font-bold">
                      {idx + 1}
                    </td>
                    
                    {m.values.filter((_, i) => !EXCLUDED_INDICES.includes(i)).map((val, cellIdx) => {
                      const isNameCell = cellIdx === 0;
                      const isDatesCell = cellIdx === 1;
                      const isNotesCell = cellIdx === 2;
                      const isServiceCell = cellIdx === 5;
                      const isAgeCell = cellIdx === 8;
                      
                      const stripped = stripHtml(val);
                      
                      if (isDatesCell) {
                        const { display, style, tooltip } = processContactDate(val);
                        return (
                          <td key={cellIdx} title={tooltip} style={{...style, borderColor: 'black'}} className="py-2 px-2 border-r border-black text-center min-w-[100px]">
                            {display}
                          </td>
                        );
                      }

                      if (isNotesCell) {
                        const displayNotes = stripped.length > 25 ? stripped.substring(0, 25) + '...' : stripped;
                        return (
                          <td key={cellIdx} title={stripped} className="py-1 px-2 border-r border-black whitespace-nowrap min-w-[180px] max-w-[180px] overflow-hidden text-ellipsis">
                            {displayNotes || '-'}
                          </td>
                        );
                      }

                      if (isServiceCell) {
                        const words = stripped.split(/\s+/).filter(w => w.length > 0);
                        const displayService = words.length > 2 ? words.slice(0, 2).join(' ') + '...' : stripped;
                        return (
                          <td key={cellIdx} title={stripped} className="py-1 px-2 border-r border-black whitespace-nowrap min-w-max">
                            {displayService || '-'}
                          </td>
                        );
                      }

                      if (isAgeCell) {
                        return (
                          <td key={cellIdx} className="py-1 px-2 border-r border-black text-center min-w-[45px]">
                            {stripped || '-'}
                          </td>
                        );
                      }
                      
                      const isLongestRecordCell = [0, 3, 4, 6, 7].includes(cellIdx);
                      const widthStyle = isLongestRecordCell ? 'min-w-max' : 'min-w-[160px]';

                      return (
                        <td 
                          key={cellIdx} 
                          className={`py-1 px-2 border-r border-black whitespace-nowrap ${widthStyle}
                            ${isNameCell ? 'sticky left-[40px] z-20 bg-[#b2cfb6] group-hover:bg-[#9dbb9f] font-bold text-[#0c2d48]' : ''}
                          `}
                        >
                          {stripped || '-'}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="bg-[#a4c2a8] px-4 py-1 text-[9px] text-gray-700 font-bold uppercase italic border-t border-black flex justify-between">
             <span>* Подвійний клік на ПІБ — відкрити картку</span>
             <span>Всього: {filteredMembers.length}</span>
          </div>
        </div>
      </div>

      <div className="px-10 py-6 shrink-0 flex items-center">
        <button 
          onClick={handleExit}
          className="bg-[#fde2e4] text-[#721c24] py-2 px-10 text-xl font-bold rounded hover:bg-[#fad0d4] shadow-md uppercase active:scale-95 transition-all"
        >
          ВИХІД
        </button>
      </div>

      <PersonalCardModal member={activeMember} onClose={() => setActiveMember(null)} />
    </div>
  );
};

export default App;
