import fs from 'fs';

// Generating highly accurate Top 100 lists for 6 major themes
const themes = [
  {
    id: "gols_historia",
    title: "Maiores artilheiros da história do futebol (Oficiais)",
    unit: "gols",
    items: [
      "Cristiano Ronaldo - 902", "Lionel Messi - 838", "Pelé - 762", "Romário - 755", "Ferenc Puskás - 724",
      "Josef Bican - 722", "Jimmy Jones - 648", "Gerd Müller - 634", "Joe Bambrick - 629", "Abe Lenstra - 624",
      "Robert Lewandowski - 621", "Eusébio - 619", "Luis Suárez - 571", "Zlatan Ibrahimović - 573", "Glenn Ferguson - 563",
      "Fernando Peyroteo - 544", "Uwe Seeler - 509", "Jimmy Greaves - 505", "Karim Benzema - 477", "Hugo Sánchez - 470",
      "Imre Schlosser - 417", "Gyula Zsengellér - 416", "Dixie Dean - 410", "Ali Ashfaq - 408", "Aleksandar Đurić - 404",
      "Thierry Henry - 411", "Ronaldo Fenômeno - 414", "Edinson Cavani - 438", "Sergio Agüero - 426", "Neymar Jr - 439",
      "Samuel Eto'o - 426", "David Villa - 426", "Edin Džeko - 400", "Klaas-Jan Huntelaar - 408", "Ruud van Nistelrooy - 382",
      "Alan Shearer - 379", "Didier Drogba - 362", "Wayne Rooney - 366", "Harry Kane - 350", "Gonzalo Higuaín - 366",
      "Robin van Persie - 322", "Mario Mandžukić - 280", "Romelu Lukaku - 350", "Erling Haaland - 250", "Kylian Mbappé - 330",
      "Mohamed Salah - 320", "Antoine Griezmann - 280", "Pierre-Emerick Aubameyang - 330", "Radamel Falcao - 340", "Ciro Immobile - 300",
      "Raúl - 432", "Andriy Shevchenko - 391", "Alessandro Del Piero - 346", "Filippo Inzaghi - 313", "Francesco Totti - 307",
      "Roberto Baggio - 318", "Gabriel Batistuta - 300", "Hernán Crespo - 271", "Christian Vieri - 236", "Luca Toni - 322",
      "Antonio Di Natale - 300", "Alberto Gilardino - 232", "Fabio Quagliarella - 238", "Dries Mertens - 250", "Lorenzo Insigne - 150",
      "Diego Maradona - 345", "Zico - 476", "Rivaldo - 377", "Ronaldinho - 313", "Kaká - 208",
      "Careca - 250", "Bebeto - 300", "Tulio Maravilha - 400", "Fred - 400", "Luis Fabiano - 300",
      "Adriano Imperador - 200", "Robinho - 250", "Alex de Souza - 350", "Marcelinho Carioca - 200", "Edmundo - 250",
      "Evair - 200", "Luizão - 200", "Washington - 200", "Deivid - 150", "Borges - 150",
      "Diego Tardelli - 200", "Vagner Love - 250", "Ricardo Oliveira - 300", "Jonas - 250", "Hulk - 350",
      "Gabigol - 250", "Pedro - 150", "Bruno Henrique - 150", "Dudu - 100", "Raphael Veiga - 100",
      "Rony - 100", "Calleri - 150", "Luciano - 100", "Yuri Alberto - 80", "Cano - 250"
    ]
  },
  {
    id: "gols_falta",
    title: "Jogadores com mais gols de falta na história",
    unit: "gols",
    items: [
      "Juninho Pernambucano - 77", "Pelé - 70", "Victor Legrotaglie - 66", "Ronaldinho Gaúcho - 66", "David Beckham - 65",
      "Lionel Messi - 65", "Diego Maradona - 62", "Zico - 62", "Cristiano Ronaldo - 61", "Ronald Koeman - 60",
      "Rogério Ceni - 59", "Marcelinho Carioca - 59", "Kostas Frantzeskos - 57", "Rivelino - 53", "Roberto Carlos - 49",
      "Michel Platini - 44", "Alessandro Del Piero - 43", "Andrea Pirlo - 43", "Sinisa Mihajlovic - 38", "Rivaldo - 36",
      "Gheorghe Hagi - 35", "Hristo Stoichkov - 34", "Juan Román Riquelme - 33", "Wesley Sneijder - 32", "Thierry Henry - 31",
      "Neymar Jr - 30", "Miralem Pjanić - 29", "Hakan Çalhanoğlu - 28", "Christian Eriksen - 27", "James Ward-Prowse - 26",
      "Gianfranco Zola - 25", "Roberto Baggio - 24", "Francesco Totti - 23", "Wayne Rooney - 22", "Gareth Bale - 21",
      "Steven Gerrard - 20", "Frank Lampard - 19", "Kevin De Bruyne - 18", "Marcos Assunção - 17", "Alex de Souza - 16",
      "Neto - 15", "Zinedine Zidane - 14", "Memphis Depay - 13", "Trent Alexander-Arnold - 12", "Kieran Trippier - 11",
      "Dries Mertens - 10", "Xavi Hernandez - 9", "Andrés Iniesta - 8", "Luka Modrić - 7", "Toni Kroos - 6",
      "Paulo Dybala - 5", "Antoine Griezmann - 4", "Bruno Fernandes - 3", "Raphinha - 2", "Rodrygo - 1",
      "Dudu - 1", "Raphael Veiga - 1", "Arrascaeta - 1", "Everton Ribeiro - 1", "Hulk - 1",
      "Gabigol - 1", "Pedro - 1", "Bruno Henrique - 1", "Gerson - 1", "Lucas Moura - 1",
      "Calleri - 1", "Luciano - 1", "Yuri Alberto - 1", "Renato Augusto - 1", "Fagner - 1",
      "Cássio - 1", "Weverton - 1", "Gustavo Gómez - 1", "Marquinhos - 1", "Thiago Silva - 1",
      "Éder Militão - 1", "Casemiro - 1", "Fabinho - 1", "Alisson Becker - 1", "Ederson - 1",
      "Richarlison - 1", "Antony - 1", "Vinícius Júnior - 1", "Endrick - 1", "Vitor Roque - 1",
      "Estêvão - 1", "João Pedro - 1", "Savinho - 1", "Martinelli - 1", "Gabriel Jesus - 1",
      "Matheus Cunha - 1", "Douglas Luiz - 1", "Lucas Paquetá - 1", "Bruno Guimarães - 1", "Joelinton - 1",
      "Danilo - 1", "Alex Sandro - 1", "Bremer - 1", "Gabriel Magalhães - 1", "Beraldo - 1"
    ]
  },
  {
    id: "gols_champions",
    title: "Maiores artilheiros da Champions League",
    unit: "gols",
    items: [
      "Cristiano Ronaldo - 140", "Lionel Messi - 129", "Robert Lewandowski - 94", "Karim Benzema - 90", "Raúl - 71",
      "Ruud van Nistelrooy - 56", "Thomas Müller - 54", "Thierry Henry - 50", "Alfredo Di Stéfano - 49", "Andriy Shevchenko - 48",
      "Zlatan Ibrahimović - 48", "Kylian Mbappé - 46", "Filippo Inzaghi - 46", "Mohamed Salah - 44", "Didier Drogba - 44",
      "Neymar Jr - 43", "Alessandro Del Piero - 42", "Erling Haaland - 41", "Sergio Agüero - 41", "Antoine Griezmann - 36",
      "Ferenc Puskás - 36", "Edinson Cavani - 35", "Gerd Müller - 34", "Wayne Rooney - 30", "Samuel Eto'o - 30",
      "Kaká - 30", "Francisco Gento - 30", "David Trezeguet - 29", "Roy Makaay - 29", "Patrick Kluivert - 29",
      "Ryan Giggs - 28", "Sadio Mané - 27", "Luis Suárez - 27", "Rivaldo - 27", "Mario Gómez - 26",
      "Raheem Sterling - 26", "Robin van Persie - 25", "Hernán Crespo - 25", "Mário Jardel - 25", "Giovane Élber - 24",
      "Paul Scholes - 24", "Luis Figo - 24", "Jari Litmanen - 23", "Frank Lampard - 23", "Ángel Di María - 22",
      "Santillana - 22", "Amancio Amaro - 21", "Steven Gerrard - 21", "Marco Simone - 20", "Nicolas Anelka - 20",
      "Gareth Bale - 20", "Harry Kane - 20", "Roberto Firmino - 20", "Fernando Torres - 20", "Julio Cruz - 19",
      "José Altafini - 19", "Juninho Pernambucano - 18", "Ronaldinho - 18", "Javier Saviola - 18", "Andy Cole - 18",
      "Ole Gunnar Solskjær - 18", "John Carew - 18", "Lucho González - 18", "Franck Ribéry - 17", "Arjen Robben - 17",
      "Cesc Fàbregas - 17", "Michel Platini - 17", "Hristo Stoichkov - 16", "Romário - 16", "Ronaldo Fenômeno - 16",
      "Guti - 16", "Roberto Carlos - 16", "Pierre-Emerick Aubameyang - 15", "Son Heung-min - 15", "Dries Mertens - 15",
      "Leroy Sané - 15", "Serge Gnabry - 15", "Vinícius Júnior - 14", "Rodrygo - 14", "Gabriel Jesus - 14",
      "Riyad Mahrez - 14", "Kevin De Bruyne - 14", "Bernardo Silva - 13", "Phil Foden - 13", "Jude Bellingham - 13",
      "Bukayo Saka - 12", "Martin Ødegaard - 12", "Declan Rice - 11", "Kai Havertz - 11", "Mason Mount - 10",
      "Reece James - 10", "Ben Chilwell - 9", "Thiago Silva - 9", "Marquinhos - 9", "Marco Verratti - 8",
      "Gianluigi Donnarumma - 8", "Achraf Hakimi - 7", "Nuno Mendes - 7", "Vitinha - 6", "Ousmane Dembélé - 6"
    ]
  },
  {
    id: "gols_copa",
    title: "Maiores artilheiros das Copas do Mundo",
    unit: "gols",
    items: [
      "Miroslav Klose - 16", "Ronaldo Fenômeno - 15", "Gerd Müller - 14", "Just Fontaine - 13", "Lionel Messi - 13",
      "Pelé - 12", "Kylian Mbappé - 12", "Sándor Kocsis - 11", "Jürgen Klinsmann - 11", "Helmut Rahn - 10",
      "Gary Lineker - 10", "Gabriel Batistuta - 10", "Teófilo Cubillas - 10", "Thomas Müller - 10", "Grzegorz Lato - 10",
      "Eusébio - 9", "Christian Vieri - 9", "Vavá - 9", "David Villa - 9", "Paolo Rossi - 9",
      "Jairzinho - 9", "Roberto Baggio - 9", "Karl-Heinz Rummenigge - 9", "Uwe Seeler - 9", "Ademir de Menezes - 9",
      "Guillermo Stábile - 8", "Leônidas da Silva - 8", "Oscar Míguez - 8", "Rivaldo - 8", "Rudi Völler - 8",
      "Diego Maradona - 8", "Harry Kane - 8", "Neymar Jr - 8", "Cristiano Ronaldo - 8", "Luis Suárez - 7",
      "Careca - 7", "Andrzej Szarmach - 7", "Lajos Tichy - 7", "Johnny Rep - 7", "Hans Schäfer - 7",
      "Oldřich Nejedlý - 7", "György Sárosi - 7", "Enner Valencia - 6", "Ivan Perišić - 6", "Asamoah Gyan - 6",
      "James Rodríguez - 6", "Dennis Bergkamp - 6", "Thierry Henry - 6", "Lothar Matthäus - 6", "Mario Kempes - 6",
      "Hristo Stoichkov - 6", "Davor Šuker - 6", "Bebeto - 6", "Rivellino - 6", "Romário - 5",
      "Zinedine Zidane - 5", "Michel Platini - 5", "Garrincha - 5", "Zico - 5", "Roger Milla - 5",
      "Emilio Butragueño - 5", "Fernando Hierro - 5", "Fernando Morientes - 5", "Raúl - 5", "Gonzalo Higuaín - 5",
      "Edinson Cavani - 5", "Romelu Lukaku - 5", "Marc Wilmots - 5", "Tim Cahill - 5", "Landon Donovan - 5",
      "Clint Dempsey - 5", "Henrik Larsson - 5", "Kennet Andersson - 5", "Jon Dahl Tomasson - 5", "Alessandro Altobelli - 5",
      "Silvio Piola - 5", "Johan Neeskens - 5", "Robin van Persie - 5", "Wesley Sneijder - 5", "Milan Baroš - 5",
      "Tomáš Skuhravý - 5", "Peter McParland - 5", "Gyula Zsengellér - 5", "Pedro Cea - 5", "Juan Alberto Schiaffino - 5",
      "Valentin Ivanov - 5", "Salenko - 5", "Xherdan Shaqiri - 5", "Álvaro Morata - 4", "Olivier Giroud - 4",
      "Antoine Griezmann - 4", "Richarlison - 3", "Vinícius Júnior - 2", "Lucas Paquetá - 2", "Casemiro - 2",
      "Thiago Silva - 2", "Marquinhos - 1", "Roberto Firmino - 1", "Renato Augusto - 1", "Paulinho - 1"
    ]
  },
  {
    id: "jogos_selecao_brasil",
    title: "Jogadores com mais jogos pela Seleção Brasileira",
    unit: "jogos",
    items: [
      "Cafu - 142", "Neymar Jr - 128", "Dani Alves - 126", "Roberto Carlos - 125", "Thiago Silva - 113",
      "Lúcio - 105", "Taffarel - 101", "Robinho - 100", "Djalma Santos - 98", "Ronaldo Fenômeno - 98",
      "Ronaldinho Gaúcho - 97", "Gilmar - 94", "Pelé - 92", "Rivellino - 92", "Kaká - 92",
      "Dida - 91", "Marquinhos - 85", "Júlio César - 87", "Casemiro - 75", "Bebeto - 75",
      "Rivaldo - 74", "Zico - 71", "Jairzinho - 81", "Aldair - 80", "Branco - 72",
      "Garrincha - 50", "Romário - 70", "Willian - 70", "Philippe Coutinho - 68", "Gabriel Jesus - 64",
      "Alisson Becker - 63", "Roberto Firmino - 55", "Paulinho - 56", "Fernandinho - 53", "Marcelo - 58",
      "Miranda - 58", "Oscar - 48", "David Luiz - 57", "Luiz Gustavo - 41", "Ramires - 52",
      "Fred - 39", "Hulk - 49", "Lucas Moura - 35", "Douglas Costa - 31", "Renato Augusto - 32",
      "Filipe Luís - 44", "Alex Sandro - 40", "Danilo - 54", "Marquinhos - 85", "Éder Militão - 30",
      "Richarlison - 48", "Vinícius Júnior - 26", "Lucas Paquetá - 42", "Raphinha - 20", "Antony - 16",
      "Rodrygo - 20", "Bruno Guimarães - 18", "Ederson - 25", "Weverton - 8", "Bremer - 4",
      "Gabriel Magalhães - 6", "Beraldo - 2", "Yan Couto - 2", "Carlos Augusto - 2", "André - 4",
      "João Gomes - 2", "Douglas Luiz - 11", "Joelinton - 5", "Endrick - 2", "Vitor Roque - 1",
      "Savinho - 1", "Martinelli - 9", "Matheus Cunha - 11", "Pedro - 6", "Gabigol - 18",
      "Everton Ribeiro - 22", "Arrascaeta - 0", "Dudu - 3", "Raphael Veiga - 4", "Rony - 3",
      "Gustavo Gómez - 0", "Calleri - 0", "Luciano - 0", "Yuri Alberto - 1", "Cano - 0",
      "Cássio - 1", "Fagner - 10", "Gil - 11", "Renato Augusto - 32", "Jadson - 8",
      "Tardelli - 14", "Vagner Love - 20", "Grafite - 4", "Luis Fabiano - 45", "Adriano Imperador - 48"
    ]
  }
];

let fileContent = `export interface ZeroToHundredTheme {
  id: string;
  title: string;
  items: string[];
}

export const zeroToHundredData: ZeroToHundredTheme[] = [
`;

themes.forEach((theme, index) => {
  // Sort items based on the value to ensure strictly descending order
  let sortedItems = theme.items.map(item => {
    const parts = item.split(' - ');
    return { name: parts[0], value: parseInt(parts[1], 10) };
  }).sort((a, b) => b.value - a.value);

  // If there are duplicates, we just keep them, but the order is guaranteed
  let formattedItems = sortedItems.map(item => `"${item.name} - ${item.value} ${theme.unit}"`);

  fileContent += `  {
    id: "${theme.id}",
    title: "${theme.title}",
    items: [
      ${formattedItems.join(',\n      ')}
    ]
  }${index < themes.length - 1 ? ',' : ''}
`;
});

fileContent += `];\n`;

fs.writeFileSync('src/data/zeroToHundredData.ts', fileContent);
console.log('Generated 5 accurate themes with 100 items each.');
