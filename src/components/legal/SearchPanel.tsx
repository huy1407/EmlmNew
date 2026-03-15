import React from 'react';

interface SearchPanelProps {
  visible: boolean;
  onSearch: (query: string) => void;
  onClose: () => void;
  onSelectResult: (index: number) => void;
  results: Array<{
    index: number;
    title: string;
    preview: string;
  }>;
}

export default function SearchPanel({
  visible,
  onSearch,
  onClose,
  onSelectResult,
  results,
}: SearchPanelProps) {
  const [query, setQuery] = React.useState('');

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    onSearch(value);
  };

  const handleClear = () => {
    setQuery('');
    onSearch('');
  };

  if (!visible) return null;

  return (
    <div className="fixed inset-x-0 top-0 z-40 bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-4xl mx-auto p-4">
        {/* Search Input */}
        <div className="flex gap-2 mb-4">
          <input
            type="text"
            value={query}
            onChange={handleSearchChange}
            placeholder="Tìm kiếm nội dung..."
            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            autoFocus
          />
          {query && (
            <button
              onClick={handleClear}
              className="px-3 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
            >
              Xóa
            </button>
          )}
          <button
            onClick={onClose}
            className="px-3 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
          >
            Đóng
          </button>
        </div>

        {/* Search Results */}
        {query && results.length > 0 && (
          <div className="space-y-2 max-h-64 overflow-y-auto">
            <p className="text-sm text-gray-600">
              Tìm thấy {results.length} kết quả
            </p>
            {results.map((result, idx) => (
              <button
                key={idx}
                onClick={() => {
                  onSelectResult(result.index);
                  onClose();
                }}
                className="w-full text-left p-3 bg-gray-50 hover:bg-blue-50 rounded-lg border border-gray-200 hover:border-blue-300 transition-colors"
              >
                <div className="font-semibold text-sm text-gray-800">
                  {result.title}
                </div>
                <div className="text-xs text-gray-600 mt-1">
                  {result.preview}
                </div>
              </button>
            ))}
          </div>
        )}

        {query && results.length === 0 && (
          <div className="text-center text-gray-500 text-sm py-4">
            Không tìm thấy kết quả phù hợp
          </div>
        )}
      </div>
    </div>
  );
}
