import jsPDF from 'jspdf';

export interface ComplaintExportData {
  reference_number: string;
  category: string;
  subcategory: string;
  ministry?: string;
  title: string;
  description: string;
  locality: string;
  district: string;
  state: string;
  constituency?: string;
  parliamentary_constituency?: string;
  severity: string;
  status: string;
  assigned_representative?: {
    name: string;
    role: string;
    organization: string;
    email: string;
  };
  submitter_name: string;
  submitter_email: string;
  submitter_phone?: string;
  created_at: string;
  updated_at: string;
}

export function exportComplaintPDF(data: ComplaintExportData) {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  const margin = 14;
  let y = 18;

  const checkPageBreak = (needed: number) => {
    if (y + needed > doc.internal.pageSize.getHeight() - margin) {
      doc.addPage();
      y = margin;
    }
  };

  // Government of India Civic Header
  doc.setFontSize(16);
  doc.setFont('helvetica', 'bold');
  doc.text('GOVERNMENT OF INDIA — PUBLIC GRIEVANCE PETITION', margin, y);
  y += 7;

  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(100);
  doc.text('Makkal Kural 2.0 National Grievance Redressal & Representative Routing Network', margin, y);
  doc.setTextColor(0);
  y += 6;

  doc.setDrawColor(0);
  doc.setLineWidth(0.5);
  doc.line(margin, y, pageWidth - margin, y);
  y += 8;

  const fields: { label: string; value: string }[] = [
    { label: 'Grievance Reference Number', value: data.reference_number },
    { label: 'Current Lifecycle Status', value: data.status },
    { label: 'Central Sector & Subcategory', value: `${data.category} > ${data.subcategory}` },
    { label: 'Union Ministry / Department', value: data.ministry || 'Ministry of Personnel, Public Grievances (DARPG)' },
    { label: 'Severity / Priority Level', value: `${data.severity} URGENCY` },
    { 
      label: 'Administrative Jurisdiction', 
      value: `${data.locality}, ${data.district}, ${data.state}${data.parliamentary_constituency || data.constituency ? ` (Parliamentary Constituency: ${data.parliamentary_constituency || data.constituency})` : ''}` 
    },
    {
      label: 'Target Authority / Representative',
      value: data.assigned_representative
        ? `${data.assigned_representative.name} (${data.assigned_representative.role}) | ${data.assigned_representative.organization} <${data.assigned_representative.email}>`
        : 'Central Public Grievance Nodal Cell (CPGRAMS / DARPG)',
    },
    { 
      label: 'Petitioner / Citizen Details', 
      value: `${data.submitter_name} | ${data.submitter_email}${data.submitter_phone ? ` | ${data.submitter_phone}` : ''}` 
    },
    { label: 'Date of Submission', value: new Date(data.created_at).toLocaleString() },
    { label: 'Last System Update', value: new Date(data.updated_at).toLocaleString() },
  ];

  doc.setFontSize(10);
  fields.forEach((field) => {
    checkPageBreak(14);
    doc.setFont('helvetica', 'bold');
    doc.text(field.label + ':', margin, y);
    doc.setFont('helvetica', 'normal');
    const valueLines = doc.splitTextToSize(field.value, pageWidth - margin * 2 - 60);
    doc.text(valueLines, margin + 60, y);
    y += Math.max(6, valueLines.length * 5) + 3;
  });

  y += 4;
  checkPageBreak(14);
  doc.setDrawColor(0);
  doc.line(margin, y, pageWidth - margin, y);
  y += 8;

  doc.setFont('helvetica', 'bold');
  doc.text('Petition Subject / Summary:', margin, y);
  y += 6;
  doc.setFont('helvetica', 'normal');
  const titleLines = doc.splitTextToSize(data.title, pageWidth - margin * 2);
  doc.text(titleLines, margin, y);
  y += titleLines.length * 5 + 6;

  checkPageBreak(14);
  doc.setFont('helvetica', 'bold');
  doc.text('Detailed Grievance Description:', margin, y);
  y += 6;
  doc.setFont('helvetica', 'normal');
  const descLines = doc.splitTextToSize(data.description, pageWidth - margin * 2);
  doc.text(descLines, margin, y);
  y += descLines.length * 5 + 8;

  checkPageBreak(14);
  doc.setFontSize(8);
  doc.setTextColor(120);
  doc.text(`Official petition document generated on ${new Date().toLocaleString()} via Makkal Kural 2.0 (National Civic Redressal).`, margin, y);

  doc.save(`grievance-petition-${data.reference_number}.pdf`);
}

export function exportComplaintsCSV(complaints: ComplaintExportData[]) {
  if (!complaints.length) return;
  const headers = [
    'Reference Number',
    'Status',
    'Category',
    'Subcategory',
    'Ministry',
    'Severity',
    'Title',
    'Description',
    'Locality',
    'District',
    'State',
    'Parliamentary Constituency',
    'Submitter Name',
    'Submitter Email',
    'Submitter Phone',
    'Created At',
    'Updated At',
  ];

  const escape = (val: string) => `"${val.replace(/"/g, '""')}"`;
  const rows = complaints.map((c) =>
    [
      c.reference_number,
      c.status,
      c.category,
      c.subcategory,
      c.ministry || '',
      c.severity,
      c.title,
      c.description,
      c.locality,
      c.district,
      c.state,
      c.parliamentary_constituency || c.constituency || '',
      c.submitter_name,
      c.submitter_email,
      c.submitter_phone || '',
      c.created_at,
      c.updated_at,
    ]
      .map(escape)
      .join(',')
  );

  const csv = [headers.join(','), ...rows].join('\n');
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `national-grievances-${new Date().toISOString().slice(0, 10)}.csv`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
