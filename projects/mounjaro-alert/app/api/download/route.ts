import { NextResponse } from 'next/server'
import { readFile } from 'fs/promises'
import path from 'path'

export async function GET() {
  try {
    const pdfPath = path.join(process.cwd(), 'public', 'downloads', 'mounjaro-alert.pdf')
    const pdfBuffer = await readFile(pdfPath)

    return new NextResponse(pdfBuffer, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename="Mounjaro-Alert-Guia.pdf"',
      },
    })
  } catch (error) {
    console.error('PDF download error:', error)
    return NextResponse.json(
      { error: 'PDF não encontrado' },
      { status: 404 }
    )
  }
}
