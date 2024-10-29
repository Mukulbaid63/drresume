import { useState, useCallback } from 'react';

// Initialize pdf.js without worker
import * as pdfjsLib from 'pdfjs-dist/build/pdf';
import 'pdfjs-dist/build/pdf.worker.entry';

const usePdf = () => {
	const [text, setText] = useState('');
	const [metadata, setMetadata] = useState(null);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState('');
	const [pages, setPages] = useState(0);

	const extractText = useCallback(async (file) => {
		if (!file || file.type !== 'application/pdf') {
			setError('Please select a valid PDF file');
			return;
		}

		try {
			setLoading(true);
			setError('');
			setText('');
			setMetadata(null);

			const arrayBuffer = await file.arrayBuffer();
			const pdf = await pdfjsLib.getDocument({ data: arrayBuffer })
				.promise;

			setPages(pdf.numPages);

			// Get PDF metadata
			const metadata = await pdf.getMetadata();
			setMetadata({
				title: metadata?.info?.Title,
				author: metadata?.info?.Author,
				subject: metadata?.info?.Subject,
				keywords: metadata?.info?.Keywords,
				creator: metadata?.info?.Creator,
				producer: metadata?.info?.Producer,
				version: metadata?.info?.PDFFormatVersion,
				pageCount: pdf.numPages,
			});

			// Extract text from all pages
			let fullText = '';

			for (let i = 1; i <= pdf.numPages; i++) {
				const page = await pdf.getPage(i);
				const content = await page.getTextContent();
				const pageText = content.items
					.map((item) => item.str)
					.join(' ');
				fullText += `Page ${i}:\n${pageText}\n\n`;
			}

			setText(fullText.trim());
		} catch (err) {
			setError('Error reading PDF: ' + err.message);
		} finally {
			setLoading(false);
		}
	}, []);

	const reset = useCallback(() => {
		setText('');
		setMetadata(null);
		setError('');
		setLoading(false);
		setPages(0);
	}, []);

	return {
		text,
		metadata,
		loading,
		error,
		pages,
		extractText,
		reset,
	};
};

export default usePdf;
