import { generateGammaDocument } from './generate-gamma-ebook.mjs';

const title = "Mounjaro Alert: Guia Definitivo";
const chapters = [
  { title: "O que é Mounjaro?", prompt: "Explique o que é o medicamento Mounjaro (tirzepatida), seu mecanismo de ação dual GLP-1 e GIP, e suas indicações principais para diabetes tipo 2 e emagrecimento." },
  { title: "Mecanismo de Ação", prompt: "Descreva como o Mounjaro age no organismo: estimula a insulina, inibe o glucagon, reduz o apetite e retarda o esvaziamento gástrico." },
  { title: "Efeitos Colaterais", prompt: "Liste os efeitos colaterais mais comuns (náusea, diarreia, vômito, constipação, dor abdominal) e como mitigá-los com ajustes de dosagem, dieta e hidratação. Inclua raros mas graves (pancreatite, problemas thyroidianos)." },
  { title: "Contraindicações", prompt: "Apresente contraindicações absolutas e relativas: histórico de meduloblastoma, carcinoma medular da tireoide, pancreatite, gravidez, lactação, doenças thyroidias." },
  { title: "Alternativas Naturais", prompt: "Explore alternativas naturais e suplementos que podem ajudar no controle de apetite e glicemia: fibras (psyllium), canela, berberina, gymnia sylvestre, mudanças alimentares (low-carb, jejum intermitente). Compare eficácia e segurança com Mounjaro." },
  { title: "Perguntas Frequentes (FAQs)", prompt: "Responda a perguntas frequentes: preço médio no Brasil, onde comprar com segurança (farmácias, online), necessidade de receita médica, duração do tratamento, armazenamento, interações medicamentosas, e o que fazer se atrasar uma dose." }
];

try {
  const path = await generateGammaDocument(title, chapters);
  console.log('✅ PDF gerado em:', path);
} catch (e) {
  console.error('❌ Erro ao gerar PDF:', e);
  process.exit(1);
}
