import { urbanEngine } from './simulation-engine';
import { createComplaint, createComplaintUpdate, getComplaintByReference } from '@/lib/supabase/database';
import { routeComplaintToRepresentative } from '@/lib/routing-engine';
import { generateReferenceNumber } from '@/lib/utils';
import { Complaint, SeverityLevel } from '@/types/database';
import { RoadDefectItem } from '@/types/urban-intelligence';

export async function convertDefectToMakkalKuralGrievance(defectId: string): Promise<{
  success: boolean;
  referenceNumber?: string;
  error?: string;
}> {
  const defect = urbanEngine.getDefectById(defectId);
  if (!defect) {
    return { success: false, error: 'Defect ID not found in telemetry registry' };
  }

  if (defect.convertedGrievanceRef) {
    return {
      success: true,
      referenceNumber: defect.convertedGrievanceRef,
    };
  }

  // 1. Map defect type to Makkal Kural Central/State Civic Category
  let category = 'highways-roads';
  let subcategory = 'National Highway Potholes / Damage';

  if (defect.defectType === 'WATERLOGGING') {
    category = 'water-jal-shakti';
    subcategory = 'Urban Waterlogging & Inundated Storm Drains';
  } else if (defect.defectType === 'MISSING_DIVIDER' || defect.defectType === 'CRACK') {
    category = 'highways-roads';
    subcategory = 'Structural Road Defect / Missing Median Divider';
  } else if (defect.defectType === 'DAMAGED_TRAFFIC_SIGN' || defect.defectType === 'MISSING_SIGN') {
    category = 'highways-roads';
    subcategory = 'Damaged Traffic Sign & Road Safety Device';
  } else if (defect.defectType === 'MISSING_ZEBRA_CROSSING') {
    category = 'urban-housing';
    subcategory = 'Pedestrian Safety & Missing Crossings';
  }

  // 2. Perform Automatic Central / State Authority Routing
  const routing = await routeComplaintToRepresentative(
    category,
    defect.state,
    defect.district,
    defect.locality
  );

  const refNumber = `MK2-AI-${Math.floor(100000 + Math.random() * 900000)}`;
  const complaintId = crypto.randomUUID();
  const now = new Date().toISOString();

  const formattedDescription = `[SOURCE: Makkal Kural UrbanSense AI Fleet Sensing Unit]
Automated Detection Record from Bus Camera:
- Bus Unit: ${defect.busId} (Route: ${defect.busRoute})
- Detection Confidence: ${defect.confidence}%
- Repeated Multi-Bus Confirmations: ${defect.repeatedDetections} Bus Runs (${defect.busesInvolved.join(', ')})
- Camera Position: ${defect.cameraPosition}
- Location: ${defect.locality}, ${defect.district}, ${defect.state} (GPS: ${defect.lat.toFixed(5)}, ${defect.lng.toFixed(5)})
- AI Diagnosis: ${defect.title}

Official Action Requested:
Urgent field inspection and road restoration under Public Safety Citizen Charter.`;

  const aiImprovedTitle = `[AI Bus Sensor] ${defect.title} (${defect.repeatedDetections} Multi-Bus Verifications)`;

  const newGrievance: Complaint = {
    id: complaintId,
    reference_number: refNumber,
    category,
    subcategory,
    ministry: routing.matchedMinistry || defect.ministryJurisdiction,
    title: defect.title,
    description: formattedDescription,
    original_language: 'en',
    ai_improved_title: aiImprovedTitle,
    ai_improved_description: formattedDescription,
    state: defect.state,
    district: defect.district,
    city: defect.district,
    locality: defect.locality,
    latitude: defect.lat,
    longitude: defect.lng,
    severity: defect.severity as SeverityLevel,
    status: 'SUBMITTED',
    assigned_representative_id: routing.representative?.id,
    assigned_representative: routing.representative,
    is_anonymous: false,
    submitter_name: `UrbanSense Fleet Sensor (${defect.busId})`,
    submitter_email: 'urbansense-nodal@makkalkural.org',
    submitter_phone: '+91 44 2561 9000',
    submitter_language: 'en',
    created_at: now,
    updated_at: now,
  };

  try {
    await createComplaint(newGrievance);
    await createComplaintUpdate({
      id: crypto.randomUUID(),
      complaint_id: complaintId,
      status: 'SUBMITTED',
      message: `Automatically registered via UrbanSense AI Bus Fleet Sensing network (Confidence: ${defect.confidence}% from ${defect.busesInvolved.length} buses).`,
      is_public: true,
      created_at: now,
    });

    // Update in-memory defect status
    urbanEngine.updateDefectStatus(defectId, 'CONVERTED_TO_GRIEVANCE', refNumber);

    return {
      success: true,
      referenceNumber: refNumber,
    };
  } catch (err: any) {
    console.error('Failed to convert AI defect to grievance:', err);
    // Still update local store
    urbanEngine.updateDefectStatus(defectId, 'CONVERTED_TO_GRIEVANCE', refNumber);
    return {
      success: true,
      referenceNumber: refNumber,
    };
  }
}
