import { NextResponse } from 'next/server';

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/project/${id}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      const error = await response.json();
      return NextResponse.json(
        { error: error.detail || 'Failed to delete project' },
        { status: response.status }
      );
    }

    return NextResponse.json(await response.json());
  } catch (error) {
    console.error('Delete project error:', error);
    return NextResponse.json(
      { error: 'Internal server error' }, 
      { status: 500 }
    );
  }
}