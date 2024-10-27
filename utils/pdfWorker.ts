// utils/pdfWorker.ts
import { GlobalWorkerOptions } from 'pdfjs-dist/legacy/build/pdf';
import PDFWorker from 'pdfjs-dist/legacy/build/pdf.worker.entry';

GlobalWorkerOptions.workerSrc = PDFWorker;
