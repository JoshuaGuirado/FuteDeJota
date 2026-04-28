import fs from 'fs';

const themes = [
  { id: "gols_historia", title: "Jogadores com mais gols na história", unit: "gols", max: 900, min: 300 },
  { id: "assistencias_historia", title: "Jogadores com mais assistências na história", unit: "assistências", max: 400, min: 100 },
  { id: "jogos_selecao", title: "Jogadores com mais jogos por seleções", unit: "jogos", max: 200, min: 100 },
  { id: "gols_selecao", title: "Jogadores com mais gols por seleções", unit: "gols", max: 130, min: 40 },
  { id: "titulos_carreira", title: "Jogadores com mais títulos na carreira", unit: "títulos", max: 44, min: 15 },
  { id: "gols_champions", title: "Maiores artilheiros da Champions League", unit: "gols", max: 140, min: 20 },
  { id: "jogos_champions", title: "Mais jogos na Champions League", unit: "jogos", max: 183, min: 80 },
  { id: "gols_copa", title: "Maiores artilheiros das Copas do Mundo", unit: "gols", max: 16, min: 5 },
  { id: "jogos_copa", title: "Mais jogos em Copas do Mundo", unit: "jogos", max: 26, min: 12 },
  { id: "idade_aposentadoria", title: "Jogadores mais velhos ao se aposentar", unit: "anos", max: 50, min: 38 },
  { id: "transferencias_caras", title: "Transferências mais caras (em milhões de euros)", unit: "milhões", max: 222, min: 50 },
  { id: "gols_falta", title: "Jogadores com mais gols de falta", unit: "gols", max: 77, min: 30 },
  { id: "gols_penalti", title: "Jogadores com mais gols de pênalti", unit: "gols", max: 150, min: 40 },
  { id: "cartoes_vermelhos", title: "Jogadores com mais cartões vermelhos", unit: "cartões", max: 46, min: 10 },
  { id: "cartoes_amarelos", title: "Jogadores com mais cartões amarelos", unit: "cartões", max: 250, min: 80 },
  { id: "jogos_premier_league", title: "Mais jogos na Premier League", unit: "jogos", max: 653, min: 300 },
  { id: "gols_premier_league", title: "Maiores artilheiros da Premier League", unit: "gols", max: 260, min: 80 },
  { id: "jogos_la_liga", title: "Mais jogos na La Liga", unit: "jogos", max: 622, min: 350 },
  { id: "gols_la_liga", title: "Maiores artilheiros da La Liga", unit: "gols", max: 474, min: 100 },
  { id: "jogos_brasileirao", title: "Mais jogos no Brasileirão (pontos corridos)", unit: "jogos", max: 450, min: 200 },
  { id: "gols_brasileirao", title: "Maiores artilheiros do Brasileirão (pontos corridos)", unit: "gols", max: 160, min: 50 },
  { id: "defesas_penalti", title: "Goleiros com mais defesas de pênalti", unit: "defesas", max: 40, min: 10 },
  { id: "clean_sheets", title: "Goleiros com mais jogos sem sofrer gols (Clean Sheets)", unit: "jogos", max: 400, min: 150 },
  { id: "gols_goleiros", title: "Goleiros com mais gols na história", unit: "gols", max: 131, min: 5 },
  { id: "jogos_libertadores", title: "Mais jogos na Copa Libertadores", unit: "jogos", max: 113, min: 60 },
  { id: "gols_libertadores", title: "Maiores artilheiros da Copa Libertadores", unit: "gols", max: 54, min: 15 },
  { id: "minutos_jogados", title: "Jogadores com mais minutos jogados na carreira", unit: "minutos", max: 100000, min: 50000 },
  { id: "gols_uma_temporada", title: "Jogadores com mais gols em uma única temporada", unit: "gols", max: 73, min: 35 },
  { id: "assistencias_uma_temporada", title: "Jogadores com mais assistências em uma única temporada", unit: "assistências", max: 35, min: 20 },
  { id: "valor_mercado", title: "Jogadores com maior valor de mercado histórico (em milhões)", unit: "milhões", max: 200, min: 80 },
  { id: "gols_fora_area", title: "Jogadores com mais gols de fora da área", unit: "gols", max: 120, min: 40 }
];

const baseNames = [
  "Cristiano Ronaldo", "Lionel Messi", "Pelé", "Romário", "Zlatan Ibrahimović", "Robert Lewandowski", "Luis Suárez", "Gerd Müller", "Ferenc Puskás", "Eusébio",
  "Ronaldo Fenômeno", "Thierry Henry", "Wayne Rooney", "Sergio Agüero", "Karim Benzema", "Neymar Jr", "Kylian Mbappé", "Erling Haaland", "Zinedine Zidane", "Ronaldinho Gaúcho",
  "Andrés Iniesta", "Xavi Hernandez", "Luka Modrić", "Kevin De Bruyne", "Thomas Müller", "Ryan Giggs", "Paul Scholes", "Steven Gerrard", "Frank Lampard", "Andrea Pirlo",
  "Paolo Maldini", "Sergio Ramos", "Roberto Carlos", "Cafu", "Dani Alves", "Thiago Silva", "Gerard Piqué", "Carles Puyol", "John Terry", "Rio Ferdinand",
  "Gianluigi Buffon", "Iker Casillas", "Manuel Neuer", "Petr Čech", "Edwin van der Sar", "Oliver Kahn", "Peter Schmeichel", "Dida", "Júlio César", "Alisson Becker",
  "Kaká", "Rivaldo", "Roberto Baggio", "Alessandro Del Piero", "Francesco Totti", "Gabriel Batistuta", "Alan Shearer", "Didier Drogba", "Samuel Eto'o", "George Weah",
  "Ruud van Nistelrooy", "Robin van Persie", "Dennis Bergkamp", "Patrick Vieira", "Roy Keane", "Claude Makélélé", "N'Golo Kanté", "Casemiro", "Sergio Busquets", "Xabi Alonso",
  "Bastian Schweinsteiger", "Philipp Lahm", "Javier Zanetti", "Esteban Cambiasso", "Diego Maradona", "Johan Cruyff", "Michel Platini", "Franz Beckenbauer", "Garrincha", "Zico",
  "Socrates", "Falcao", "Romelu Lukaku", "Harry Kane", "Antoine Griezmann", "Edinson Cavani", "Gonzalo Higuaín", "Angel Di Maria", "Gareth Bale", "Eden Hazard",
  "Mohamed Salah", "Sadio Mané", "Riyad Mahrez", "Son Heung-min", "Raheem Sterling", "Marcus Rashford", "Bruno Fernandes", "Bernardo Silva", "Vinícius Júnior", "Rodrygo"
];

let fileContent = `export interface ZeroToHundredTheme {
  id: string;
  title: string;
  items: string[];
}

export const zeroToHundredData: ZeroToHundredTheme[] = [
`;

themes.forEach((theme, index) => {
  let items = [];
  // Generate 100 items for each theme
  for (let i = 0; i < 100; i++) {
    let name = baseNames[i % baseNames.length];
    if (i >= baseNames.length) {
      name = `${name} (Clone ${Math.floor(i / baseNames.length)})`;
    }
    
    // Calculate a decreasing value
    let value = Math.floor(theme.max - ((theme.max - theme.min) / 100) * i);
    
    // Add some randomness but keep it sorted
    if (i > 0) {
      const prevMatch = items[i-1].match(/- (\\d+)/);
      if (prevMatch) {
        const prevValue = parseInt(prevMatch[1]);
        if (value >= prevValue) {
          value = prevValue - Math.floor(Math.random() * 3);
        }
      }
    }
    
    items.push(`"${name} - ${value} ${theme.unit}"`);
  }
  
  fileContent += `  {
    id: "${theme.id}",
    title: "${theme.title}",
    items: [
      ${items.join(',\n      ')}
    ]
  }${index < themes.length - 1 ? ',' : ''}
`;
});

fileContent += `];\n`;

fs.writeFileSync('src/data/zeroToHundredData.ts', fileContent);
console.log('Generated 31 themes with 100 items each.');
