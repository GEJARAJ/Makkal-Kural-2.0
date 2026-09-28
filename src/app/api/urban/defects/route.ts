import { NextRequest, NextResponse } from 'next/server';
import { urbanEngine } from '@/lib/urban-intelligence/simulation-engine';
import { convertDefectToMakkalKuralGrievance } from '@/lib/urban-intelligence/fusion-service';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const type = searchParams.get('type');
    const severity = searchParams.get('severity');

    let list = urbanEngine.getDefects();

    if (type && type !== 'all') {
      list = list.filter((d) => d.defectType === type);
    }
    if (severity && severity !== 'all') {
      list = list.filter((d) => d.severity === severity);
    }

    return NextResponse.json({
      success: true,
      count: list.length,
      data: list,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { defectId } = body;

    if (!defectId) {
      return NextResponse.json({ error: 'defectId is required' }, { status: 400 });
    }

    const result = await convertDefectToMakkalKuralGrievance(defectId);
    if (!result.success) {
      return NextResponse.json({ error: result.error }, { status: 400 });
    }

    return NextResponse.json({
      success: true,
      referenceNumber: result.referenceNumber,
      message: 'AI road defect successfully escalated and registered as an official Makkal Kural grievance.',
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
