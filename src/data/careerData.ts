export interface CareerPlayer {
  id: number;
  name: string;
  aliases: string[];
  age: number;
  goals: number;
  assists: number;
  cards: number;
  titles: number;
  clubs: string[];
  ballonDor: number;
}

export const careerPlayersData: CareerPlayer[] = [
  { id: 1, name: "Cristiano Ronaldo", aliases: ["cr7", "cristiano", "ronaldo"], age: 39, goals: 902, assists: 254, cards: 130, titles: 35, clubs: ["Sporting CP", "Manchester United", "Real Madrid", "Juventus", "Al Nassr"], ballonDor: 5 },
  { id: 2, name: "Lionel Messi", aliases: ["messi", "leo messi"], age: 36, goals: 838, assists: 374, cards: 90, titles: 44, clubs: ["Barcelona", "PSG", "Inter Miami"], ballonDor: 8 },
  { id: 3, name: "Neymar Jr", aliases: ["neymar", "njr"], age: 32, goals: 439, assists: 255, cards: 140, titles: 28, clubs: ["Santos", "Barcelona", "PSG", "Al Hilal"], ballonDor: 0 },
  { id: 4, name: "Ronaldinho Gaúcho", aliases: ["ronaldinho", "r10", "ronaldinho gaucho"], age: 44, goals: 313, assists: 192, cards: 80, titles: 15, clubs: ["Grêmio", "PSG", "Barcelona", "AC Milan", "Flamengo", "Atlético Mineiro", "Querétaro", "Fluminense"], ballonDor: 1 },
  { id: 5, name: "Ronaldo Fenômeno", aliases: ["ronaldo", "r9", "ronaldo fenomeno"], age: 47, goals: 414, assists: 104, cards: 40, titles: 18, clubs: ["Cruzeiro", "PSV", "Barcelona", "Inter Milan", "Real Madrid", "AC Milan", "Corinthians"], ballonDor: 2 },
  { id: 6, name: "Zlatan Ibrahimović", aliases: ["zlatan", "ibrahimovic", "ibra"], age: 42, goals: 573, assists: 227, cards: 150, titles: 34, clubs: ["Malmö FF", "Ajax", "Juventus", "Inter Milan", "Barcelona", "AC Milan", "PSG", "Manchester United", "LA Galaxy"], ballonDor: 0 },
  { id: 7, name: "Kevin De Bruyne", aliases: ["de bruyne", "kdb"], age: 32, goals: 150, assists: 280, cards: 60, titles: 22, clubs: ["Genk", "Chelsea", "Werder Bremen", "Wolfsburg", "Manchester City"], ballonDor: 0 },
  { id: 8, name: "Robert Lewandowski", aliases: ["lewandowski", "lewa"], age: 35, goals: 645, assists: 150, cards: 85, titles: 28, clubs: ["Znicz Pruszków", "Lech Poznań", "Borussia Dortmund", "Bayern Munich", "Barcelona"], ballonDor: 0 },
  { id: 9, name: "Kylian Mbappé", aliases: ["mbappe", "mbappé"], age: 25, goals: 330, assists: 130, cards: 45, titles: 17, clubs: ["Monaco", "PSG", "Real Madrid"], ballonDor: 0 },
  { id: 10, name: "Luka Modrić", aliases: ["modric", "luka modric"], age: 38, goals: 120, assists: 160, cards: 95, titles: 30, clubs: ["Dinamo Zagreb", "Zrinjski Mostar", "Inter Zaprešić", "Tottenham Hotspur", "Real Madrid"], ballonDor: 1 },
  { id: 11, name: "Gabriel Barbosa", aliases: ["gabigol", "gabriel barbosa", "gabriel"], age: 27, goals: 250, assists: 60, cards: 110, titles: 15, clubs: ["Santos", "Inter Milan", "Benfica", "Flamengo"], ballonDor: 0 },
  { id: 12, name: "Gabriel Jesus", aliases: ["gabriel jesus", "jesus", "gabriel"], age: 27, goals: 140, assists: 70, cards: 40, titles: 14, clubs: ["Palmeiras", "Manchester City", "Arsenal"], ballonDor: 0 },
  { id: 13, name: "Matheus Cunha", aliases: ["matheus cunha", "cunha", "matheus"], age: 24, goals: 60, assists: 30, cards: 35, titles: 2, clubs: ["Sion", "RB Leipzig", "Hertha BSC", "Atlético Madrid", "Wolverhampton"], ballonDor: 0 },
  { id: 14, name: "Matheus Pereira", aliases: ["matheus pereira", "matheus"], age: 27, goals: 70, assists: 80, cards: 45, titles: 3, clubs: ["Sporting CP", "Chaves", "Nürnberg", "West Bromwich", "Al Hilal", "Cruzeiro"], ballonDor: 0 },
  { id: 15, name: "Thiago Silva", aliases: ["thiago silva", "monstro", "thiago"], age: 39, goals: 45, assists: 20, cards: 90, titles: 33, clubs: ["RS Futebol", "Juventude", "Porto", "Dynamo Moscow", "Fluminense", "AC Milan", "PSG", "Chelsea"], ballonDor: 0 },
  { id: 16, name: "Marcelo", aliases: ["marcelo"], age: 35, goals: 50, assists: 110, cards: 100, titles: 30, clubs: ["Fluminense", "Real Madrid", "Olympiacos"], ballonDor: 0 },
  { id: 17, name: "Dani Alves", aliases: ["dani alves", "daniel alves"], age: 40, goals: 65, assists: 170, cards: 180, titles: 43, clubs: ["Bahia", "Sevilla", "Barcelona", "Juventus", "PSG", "São Paulo", "Pumas"], ballonDor: 0 },
  { id: 18, name: "Vinícius Júnior", aliases: ["vinicius junior", "vini jr", "vinicius"], age: 23, goals: 90, assists: 75, cards: 50, titles: 12, clubs: ["Flamengo", "Real Madrid"], ballonDor: 0 },
  { id: 19, name: "Jude Bellingham", aliases: ["bellingham", "jude"], age: 20, goals: 50, assists: 40, cards: 30, titles: 4, clubs: ["Birmingham City", "Borussia Dortmund", "Real Madrid"], ballonDor: 0 },
  { id: 20, name: "Erling Haaland", aliases: ["haaland", "erling"], age: 23, goals: 250, assists: 50, cards: 25, titles: 8, clubs: ["Bryne", "Molde", "Salzburg", "Borussia Dortmund", "Manchester City"], ballonDor: 0 },
  { id: 21, name: "Pelé", aliases: ["pele", "edson arantes"], age: 82, goals: 1281, assists: 300, cards: 10, titles: 37, clubs: ["Santos", "New York Cosmos"], ballonDor: 7 },
  { id: 22, name: "Diego Maradona", aliases: ["maradona", "diego"], age: 60, goals: 345, assists: 240, cards: 50, titles: 12, clubs: ["Argentinos Juniors", "Boca Juniors", "Barcelona", "Napoli", "Sevilla", "Newell's Old Boys"], ballonDor: 2 },
  { id: 23, name: "Zinedine Zidane", aliases: ["zidane", "zizou"], age: 51, goals: 156, assists: 140, cards: 80, titles: 15, clubs: ["Cannes", "Bordeaux", "Juventus", "Real Madrid"], ballonDor: 1 },
  { id: 24, name: "Johan Cruyff", aliases: ["cruyff", "johan"], age: 68, goals: 433, assists: 200, cards: 30, titles: 22, clubs: ["Ajax", "Barcelona", "Los Angeles Aztecs", "Washington Diplomats", "Levante", "Feyenoord"], ballonDor: 3 },
  { id: 25, name: "Andrés Iniesta", aliases: ["iniesta", "andres iniesta"], age: 39, goals: 93, assists: 190, cards: 65, titles: 37, clubs: ["Barcelona", "Vissel Kobe", "Emirates Club"], ballonDor: 0 },
  { id: 26, name: "Xavi Hernandez", aliases: ["xavi", "xavi hernandez"], age: 44, goals: 109, assists: 240, cards: 85, titles: 33, clubs: ["Barcelona", "Al Sadd"], ballonDor: 0 },
  { id: 27, name: "Thierry Henry", aliases: ["henry", "thierry henry"], age: 46, goals: 411, assists: 190, cards: 50, titles: 21, clubs: ["Monaco", "Juventus", "Arsenal", "Barcelona", "New York Red Bulls"], ballonDor: 0 },
  { id: 28, name: "Wayne Rooney", aliases: ["rooney", "wayne rooney"], age: 38, goals: 366, assists: 188, cards: 120, titles: 17, clubs: ["Everton", "Manchester United", "DC United", "Derby County"], ballonDor: 0 },
  { id: 29, name: "Sergio Agüero", aliases: ["aguero", "kun aguero"], age: 35, goals: 426, assists: 118, cards: 70, titles: 21, clubs: ["Independiente", "Atlético Madrid", "Manchester City", "Barcelona"], ballonDor: 0 },
  { id: 30, name: "Luis Suárez", aliases: ["suarez", "luis suarez"], age: 37, goals: 550, assists: 300, cards: 160, titles: 25, clubs: ["Nacional", "Groningen", "Ajax", "Liverpool", "Barcelona", "Atlético Madrid", "Grêmio", "Inter Miami"], ballonDor: 0 }
];
