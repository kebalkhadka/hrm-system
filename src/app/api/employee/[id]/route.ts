// app/api/employee/[id]/route.ts
import User from '@/app/models/User';
import { NextResponse } from 'next/server';


export async function GET(request: Request, { params }: { params: { id: string } }) {
  const { id } = params;

  try {
    const employee = await User.findById(id).select('name email department role');
    if (!employee) {
      return NextResponse.json({ message: 'Employee not found' }, { status: 404 });
    }

    return NextResponse.json(employee);
  } catch (error) {
    return NextResponse.json({ message: 'Error fetching employee data' }, { status: 500 });
  }
}
