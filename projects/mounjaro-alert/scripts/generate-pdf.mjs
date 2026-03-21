import { PDFDocument, rgb, StandardFonts } from 'pdf-lib'
import { promises as fs } from 'fs'
import path from 'path'

// Page dimensions (A4)
const PAGE_WIDTH = 595.28
const PAGE_HEIGHT = 841.89

async function createMounjaroPDF() {
  const pdfDoc = await PDFDocument.create()
  pdfDoc.setTitle('Mounjaro Alert: 15 Coisas que Você Precisa Saber')
  pdfDoc.setSubject('Guia Essencial sobre Mounjaro')
  pdfDoc.setAuthor('SaldaCloud Factory')
  pdfDoc.setCreator('Mounjaro Alert Generator')

  // Embed fonts
  const helveticaBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold)
  const helvetica = await pdfDoc.embedFont(StandardFonts.Helvetica)
  const helveticaOblique = await pdfDoc.embedFont(StandardFonts.HelveticaOblique)

  // Colors
  const gold = rgb(1, 0.84, 0) // #FFD700
  const black = rgb(0, 0, 0)
  const darkGray = rgb(0.2, 0.2, 0.2)
  const red = rgb(1, 0.18, 0.18)

  // Helper: add a page with title and content
  function addPage(pdf, { title, content, isCover = false } = {}) {
    const page = pdf.addPage([PAGE_WIDTH, PAGE_HEIGHT])

    if (isCover) {
      // Cover page: centered title, gold accents
      page.drawRectangle({
        x: 0,
        y: PAGE_HEIGHT - 80,
        width: PAGE_WIDTH,
        height: 80,
        color: gold,
      })

      page.drawText('Mounjaro Alert', {
        x: PAGE_WIDTH / 2,
        y: PAGE_HEIGHT - 200,
        font: helveticaBold,
        size: 42,
        color: black,
        align: 'center',
      })

      page.drawText('15 Coisas que Você Precisa Saber', {
        x: PAGE_WIDTH / 2,
        y: PAGE_HEIGHT - 260,
        font: helvetica,
        size: 24,
        color: darkGray,
        align: 'center',
      })

      page.drawText('Antes de Usar o Mounjaro', {
        x: PAGE_WIDTH / 2,
        y: PAGE_HEIGHT - 300,
        font: helveticaOblique,
        size: 20,
        color: red,
        align: 'center',
      })

      page.drawText('Guia Completo em Português', {
        x: PAGE_WIDTH / 2,
        y: 150,
        font: helvetica,
        size: 16,
        color: darkGray,
        align: 'center',
      })

      // Footer
      page.drawText('© 2025 Mounjaro Alert. Todos os direitos reservados.', {
        x: PAGE_WIDTH / 2,
        y: 50,
        font: helvetica,
        size: 10,
        color: darkGray,
        align: 'center',
      })
    } else {
      // Content page: title
      page.drawLine({
        start: { x: 50, y: PAGE_HEIGHT - 80 },
        end: { x: PAGE_WIDTH - 50, y: PAGE_HEIGHT - 80 },
        color: gold,
        thickness: 3,
      })

      page.drawText(title, {
        x: 70,
        y: PAGE_HEIGHT - 110,
        font: helveticaBold,
        size: 24,
        color: black,
        maxWidth: PAGE_WIDTH - 140,
      })

      // Draw wrapped text
      const lines = []
      const words = content.split(' ')
      let currentLine = ''
      for (const word of words) {
        const testLine = currentLine + (currentLine ? ' ' : '') + word
        const textWidth = helvetica.widthOfTextAtSize(testLine, 12)
        if (textWidth > PAGE_WIDTH - 140) {
          lines.push(currentLine)
          currentLine = word
        } else {
          currentLine = testLine
        }
      }
      if (currentLine) lines.push(currentLine)

      let y = PAGE_HEIGHT - 160
      for (const line of lines) {
        page.drawText(line, {
          x: 70,
          y,
          font: helvetica,
          size: 12,
          color: darkGray,
          maxWidth: PAGE_WIDTH - 140,
        })
        y -= 18
        if (y < 100) break // Prevent overflow, could add more pages
      }
    }

    return page
  }

  // Cover
  addPage(pdfDoc, { isCover: true })

  // Introduction
  addPage(pdfDoc, {
    title: 'Introdução',
    content: 'Este guia reúne as 15 informações essenciais que você precisa saber antes de iniciar o uso do Mounjaro. Compilamos dados sobre efeitos colaterais, dosagem, nutrição, exercícios, monitoramento de saúde e muito mais. Nossa intenção é que você tenha uma base sólida para tomar uma decisão informada e, se decidir prosseguir, fazê-lo com segurança.'
  })

  // The 15 things content (from landing page)
  const benefits = [
    {
      title: '1. Como o Mounjaro age no organismo',
      description: 'Entenda o mecanismo de ação do tirzepatida e por que ele é mais eficaz que outros GLP-1s. O Mounjaro é um agonista duplo de receptores GIP e GLP-1, o que potencializa a perda de peso e o controle glicêmico.'
    },
    {
      title: '2. Efeitos colaterais reais (e como mitigá-los)',
      description: 'Náuseas, diarreia, vômitos: o que esperar e como aliviar os sintomas com estratégias práticas, como ajuste de dieta, hidratação e pacing da dose.'
    },
    {
      title: '3. Dosagem ideal para cada fase',
      description: 'Esquema de aumento gradual de dose: quando aumentar, quanto esperar, e sinais de que está pronto. O protocolo padrão começa em 2.5mg e aumenta a cada 4 semanas até a dose manutenção (10-15mg).'
    },
    {
      title: '4. O que NÃO te contam sobre a Green Signal',
      description: 'A história oculta por trás da distribuição no Brasil e alternativas legais disponíveis. Compreenda as opções de acesso sem comprometer sua segurança.'
    },
    {
      title: '5. Comparativo definitivo: Mounjaro vs Ozempic vs Wegovy',
      description: 'Eficácia, custo, disponibilidade e perfil de segurança lado a lado. Saiba qual pode ser a melhor opção para seu perfil.'
    },
    {
      title: '6. Nutrição inteligente durante o tratamento',
      description: 'O que comer, quando comer e como ajustar sua dieta para maximizar resultados e minimizar efeitos colaterais. Foco em proteínas, fibras e hidratação.'
    },
    {
      title: '7. Exercícios que POTENCIALIZAM o efeito',
      description: 'Treinos curtos e eficientes que aceleram a queima de gordura e preservam massa muscular. Combine cardio leve com resistido.'
    },
    {
      title: '8. Suplementação permitida e proibida',
      description: 'Lista completa de vitaminas, minerais e suplementos que podem ajudar ou atrapalhar seu tratamento com Mounjaro.'
    },
    {
      title: '9. Como monitorar sua saúde (exames essenciais)',
      description: 'Hemograma, lipidograma, função renal e hepática: quais exames fazer e quando. Acompanhamento médico é indispensável.'
    },
    {
      title: '10. Psicologia do emagrecimento: lidando com a mente',
      description: 'Como a terapia cognitivo-comportamental pode aumentar suas chances de sucesso a longo prazo. A mente é sua maior aliada ou inimiga.'
    },
    {
      title: '11. O ciclo de adaptação hormonal',
      description: 'Por que o corpo se acostuma e o que fazer para manter a perda de peso a longo prazo. Estratégias de cycling e pausa.'
    },
    {
      title: '12. Custo-benefício: Vale a pena financeiramente?',
      description: 'Análise real de custos mensais vs ganhos em saúde e autoestima. Compare com outros métodos e calcule seu ROI pessoal.'
    },
    {
      title: '13. Histórias de sucesso (e fracassos) reais',
      description: 'Depoimentos honestos de quem já usou, com antes/depois e lições aprendidas. Evite os mesmos erros.'
    },
    {
      title: '14. O plano de contingência (quando algo der errado)',
      description: 'O que fazer se engordar depois de parar, se houver reação alérgica, ou se o estoque acabar. Tenha um plano B.'
    },
    {
      title: '15. Acesso a protocolos VIP sem pagar caro',
      description: 'Como obter o mesmo conhecimento de clínicas premium por uma fração do preço. Informação é poder.'
    }
  ]

  for (const benefit of benefits) {
    addPage(pdfDoc, {
      title: benefit.title,
      content: benefit.description
    })
  }

  // Final page: Call to Action
  const finalPage = pdfDoc.addPage([PAGE_WIDTH, PAGE_HEIGHT])
  finalPage.drawRectangle({
    x: 0,
    y: PAGE_HEIGHT - 120,
    width: PAGE_WIDTH,
    height: 120,
    color: gold,
  })
  finalPage.drawText('Conclusão', {
    x: PAGE_WIDTH / 2,
    y: PAGE_HEIGHT - 200,
    font: helveticaBold,
    size: 32,
    color: black,
    align: 'center',
  })
  finalPage.drawText('Agora você está preparada para tomar a melhor decisão.', {
    x: PAGE_WIDTH / 2,
    y: PAGE_HEIGHT - 260,
    font: helvetica,
    size: 16,
    color: darkGray,
    align: 'center',
  })
  finalPage.drawText('Boa sorte na sua jornada!', {
    x: PAGE_WIDTH / 2,
    y: PAGE_HEIGHT - 300,
    font: helveticaOblique,
    size: 18,
    color: red,
    align: 'center',
  })
  finalPage.drawText('Mounjaro Alert • SaldaCloud Factory', {
    x: PAGE_WIDTH / 2,
    y: 80,
    font: helvetica,
    size: 12,
    color: darkGray,
    align: 'center',
  })

  // Serialize to PDF bytes
  const pdfBytes = await pdfDoc.save()

  // Ensure downloads directory exists
  const downloadsDir = path.join(process.cwd(), 'public', 'downloads')
  try {
    await fs.mkdir(downloadsDir, { recursive: true })
  } catch (e) {
    // Might exist already
  }

  const outputPath = path.join(downloadsDir, 'mounjaro-alert.pdf')
  await fs.writeFile(outputPath, pdfBytes)

  console.log(`✅ PDF generated successfully: ${outputPath}`)
}

createMounjaroPDF().catch(console.error)
