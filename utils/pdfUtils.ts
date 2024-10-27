// utils/pdfUtils.ts
import { getDocument, GlobalWorkerOptions, version } from 'pdfjs-dist';

// Set up worker
GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${version}/build/pdf.worker.min.js`;

export const extractTextFromPDF = async (file: File): Promise<string> => {
	try {
		// Convert file to array buffer
		const arrayBuffer = await file.arrayBuffer();

		// Load the PDF document
		const loadingTask = getDocument(arrayBuffer);
		const pdf = await loadingTask.promise;

		let fullText = '';

		// Iterate through each page
		for (let i = 1; i <= pdf.numPages; i++) {
			const page = await pdf.getPage(i);
			const textContent = await page.getTextContent();
			const pageText = textContent.items.map((item: any) => item.str).join(' ');
			fullText += pageText + '\n';
		}

		return fullText;
	} catch (error) {
		console.error('Error extracting text from PDF:', error);
		throw error;
	}
};
