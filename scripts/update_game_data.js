import fs from 'fs';

const gameDataPath = 'src/data/gameData.ts';
let gameData = fs.readFileSync(gameDataPath, 'utf8');

const newPlayersData = `
  { id: 21, name: "Gabriel Barbosa", aliases: ["gabigol", "gabriel barbosa"], clubs: ["Santos", "Inter Milan", "Benfica", "Flamengo"] },
  { id: 22, name: "Gabriel Jesus", aliases: ["gabriel jesus", "jesus"], clubs: ["Palmeiras", "Manchester City", "Arsenal"] },
  { id: 23, name: "Gabriel Martinelli", aliases: ["martinelli", "gabriel martinelli"], clubs: ["Ituano", "Arsenal"] },
  { id: 24, name: "Matheus Cunha", aliases: ["matheus cunha", "cunha"], clubs: ["Sion", "RB Leipzig", "Hertha BSC", "Atlético Madrid", "Wolverhampton"] },
  { id: 25, name: "Matheus Pereira", aliases: ["matheus pereira"], clubs: ["Sporting CP", "Chaves", "Nürnberg", "West Bromwich", "Al Hilal", "Cruzeiro"] },
  { id: 26, name: "Matheus Nunes", aliases: ["matheus nunes", "nunes"], clubs: ["Estoril", "Sporting CP", "Wolverhampton", "Manchester City"] },
  { id: 27, name: "Gabriel Magalhães", aliases: ["gabriel magalhaes", "gabriel magalhães"], clubs: ["Avaí", "Lille", "Troyes", "Dinamo Zagreb", "Arsenal"] },
  { id: 28, name: "Thiago Silva", aliases: ["thiago silva", "monstro"], clubs: ["RS Futebol", "Juventude", "Porto", "Dynamo Moscow", "Fluminense", "AC Milan", "PSG", "Chelsea", "Fluminense"] },
  { id: 29, name: "Marcelo", aliases: ["marcelo"], clubs: ["Fluminense", "Real Madrid", "Olympiacos", "Fluminense"] },
  { id: 30, name: "Dani Alves", aliases: ["dani alves", "daniel alves"], clubs: ["Bahia", "Sevilla", "Barcelona", "Juventus", "PSG", "São Paulo", "Pumas"] }
`;

gameData = gameData.replace(/];\\n\\nexport const allPlayersList/, ',' + newPlayersData + '];\n\nexport const allPlayersList');

const newNames = [
  "Gabriel Barbosa", "Gabriel Jesus", "Gabriel Martinelli", "Gabriel Magalhães", "Gabriel Menino", "Gabriel Veron",
  "Gabriel Pec", "Gabriel Sara", "Gabriel Paulista", "Gabriel Moscardo", "Gabriel Pires", "Gabriel",
  "Matheus Cunha", "Matheus Pereira", "Matheus Nunes", "Matheus Henrique", "Matheus França", "Matheus Babi",
  "Matheus Fernandes", "Matheus Martins", "Matheus Donelli", "Matheus Cavichioli", "Matheus",
  "João Félix", "João Cancelo", "João Palhinha", "João Moutinho", "João Mário", "João Pedro", "João Gomes",
  "Pedro", "Pedro Guilherme", "Pedro Henrique", "Pedro Raul", "Pedro Rocha",
  "Lucas Moura", "Lucas Paquetá", "Lucas Veríssimo", "Lucas Piazon", "Lucas Silva", "Lucas",
  "Felipe Melo", "Felipe Anderson", "Felipe", "Felipe Augusto",
  "Diego Ribas", "Diego Alves", "Diego Costa", "Diego Tardelli", "Diego Souza", "Diego",
  "Thiago Silva", "Thiago Alcântara", "Thiago Maia", "Thiago Galhardo", "Thiago",
  "Bruno Henrique", "Bruno Guimarães", "Bruno Fernandes", "Bruno Peres", "Bruno",
  "Rodrigo Caio", "Rodrigo Dourado", "Rodrigo", "Rodrygo",
  "Vinícius Júnior", "Vinícius", "Vini Jr"
];

const newNamesStr = newNames.map(n => '"' + n + '"').join(', ');
gameData = gameData.replace(/];\\n\\nexport const rouletteData/, ', ' + newNamesStr + '];\n\nexport const rouletteData');

fs.writeFileSync(gameDataPath, gameData);
console.log('gameData.ts updated');
