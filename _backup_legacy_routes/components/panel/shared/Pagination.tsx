'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  return (
    <div className="flex items-center justify-between px-6 py-3 border-t border-border bg-panel-bg/30">
      <p className="text-xs text-txt-muted">Page {currentPage} of {totalPages}</p>
      <div className="flex items-center gap-1">
        <button onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1} className="p-1.5 rounded-md hover:bg-panel-elevated text-txt-muted disabled:opacity-30 transition-all" aria-label="Previous Page">
          <ChevronLeft className="w-4 h-4" />
        </button>
        {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
          <button key={page} onClick={() => onPageChange(page)} className={`w-8 h-8 rounded-md text-xs font-medium transition-all ${page === currentPage ? 'bg-brand text-white' : 'text-txt-muted hover:bg-panel-elevated hover:text-txt-body'}`}>
            {page}
          </button>
        ))}
        <button onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === totalPages} className="p-1.5 rounded-md hover:bg-panel-elevated text-txt-muted disabled:opacity-30 transition-all" aria-label="Next Page">
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
