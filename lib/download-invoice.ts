import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

export async function downloadInvoicePDF(elementId: string, filename: string) {
    const element = document.getElementById(elementId);

    if (!element) return;

    try {
        const canvas = await html2canvas(element, {
            scale: 2,
            useCORS: true,
            logging: false,
        });

        const imgData = canvas.toDataURL('image/png');

        const pdf = new jsPDF('p', 'mm', 'a4');
        const imgWidth = 210;
        const pageHeight = 297;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
        const finalImgHeight = imgHeight > pageHeight ? pageHeight : imgHeight;

        pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, finalImgHeight);

        pdf.save(`${filename}.pdf`);
    } catch (error) {
        console.error('Error generating PDF:', error);
    }
}
