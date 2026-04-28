export type Category = 'players' | 'teams' | 'general' | 'europe' | 'national' | 'brazil' | 'worldCup' | 'libertadores' | 'championsLeague' | 'premierLeague' | 'legends' | 'curiosities';

export interface Question {
  id: number;
  text: string;
  options: string[];
  correctAnswer: string;
}

export const quizData: Record<Category, Question[]> = {
  players: [
    { id: 1, text: "Qual jogador é conhecido como 'El Ilusionista'?", options: ["Andrés Iniesta", "Zinedine Zidane", "Ronaldinho", "Juan Román Riquelme"], correctAnswer: "Andrés Iniesta" },
    { id: 2, text: "Quem foi o artilheiro da Europa na temporada 2015-16?", options: ["Cristiano Ronaldo", "Luis Suárez", "Lionel Messi", "Robert Lewandowski"], correctAnswer: "Luis Suárez" },
    { id: 3, text: "Qual jogador ganhou a Bola de Ouro em 2004?", options: ["Andriy Shevchenko", "Ronaldinho", "Thierry Henry", "Deco"], correctAnswer: "Andriy Shevchenko" },
    { id: 4, text: "Em qual clube Zlatan Ibrahimović iniciou sua carreira profissional?", options: ["Ajax", "Malmö FF", "Juventus", "Inter Milan"], correctAnswer: "Malmö FF" },
    { id: 5, text: "Quem é o maior artilheiro da história da seleção francesa?", options: ["Thierry Henry", "Olivier Giroud", "Michel Platini", "Kylian Mbappé"], correctAnswer: "Olivier Giroud" },
    { id: 6, text: "Qual jogador tem o apelido de 'El Fideo'?", options: ["Ángel Di María", "Javier Pastore", "Paulo Dybala", "Gonzalo Higuaín"], correctAnswer: "Ángel Di María" },
    { id: 7, text: "Quem foi o único goleiro a ganhar a Bola de Ouro?", options: ["Lev Yashin", "Gianluigi Buffon", "Oliver Kahn", "Dino Zoff"], correctAnswer: "Lev Yashin" },
    { id: 8, text: "Qual jogador marcou 5 gols em 9 minutos na Bundesliga?", options: ["Gerd Müller", "Robert Lewandowski", "Erling Haaland", "Claudio Pizarro"], correctAnswer: "Robert Lewandowski" },
    { id: 9, text: "Quem é o maior artilheiro da história do Real Madrid?", options: ["Raúl", "Karim Benzema", "Cristiano Ronaldo", "Alfredo Di Stéfano"], correctAnswer: "Cristiano Ronaldo" },
    { id: 10, text: "Qual jogador brasileiro ganhou a Bola de Ouro em 2007?", options: ["Ronaldinho", "Ronaldo", "Kaká", "Rivaldo"], correctAnswer: "Kaká" },
    { id: 11, text: "Quem é conhecido como 'O Fenômeno'?", options: ["Cristiano Ronaldo", "Ronaldo", "Adriano", "Romário"], correctAnswer: "Ronaldo" },
    { id: 12, text: "Qual jogador tem mais assistências na história da Premier League?", options: ["Cesc Fàbregas", "Ryan Giggs", "Kevin De Bruyne", "Wayne Rooney"], correctAnswer: "Ryan Giggs" }
  ],
  teams: [
    { id: 1, text: "Qual clube é conhecido como 'The Old Lady' (A Velha Senhora)?", options: ["AC Milan", "Juventus", "Inter Milan", "Roma"], correctAnswer: "Juventus" },
    { id: 2, text: "Qual time ganhou a Premier League invicto na temporada 2003-04?", options: ["Manchester United", "Chelsea", "Arsenal", "Liverpool"], correctAnswer: "Arsenal" },
    { id: 3, text: "Qual clube tem mais títulos da Copa Libertadores?", options: ["Boca Juniors", "Independiente", "Peñarol", "River Plate"], correctAnswer: "Independiente" },
    { id: 4, text: "Qual time francês dominou a Ligue 1 ganhando 7 títulos seguidos entre 2002 e 2008?", options: ["PSG", "Marseille", "Lyon", "Monaco"], correctAnswer: "Lyon" },
    { id: 5, text: "Qual clube escocês venceu a Taça dos Campeões Europeus em 1967 com um time formado apenas por jogadores locais?", options: ["Rangers", "Celtic", "Aberdeen", "Hearts"], correctAnswer: "Celtic" },
    { id: 6, text: "Qual time espanhol é conhecido como 'Los Colchoneros'?", options: ["Real Madrid", "Barcelona", "Atlético Madrid", "Sevilla"], correctAnswer: "Atlético Madrid" },
    { id: 7, text: "Qual clube alemão tem o estádio Signal Iduna Park?", options: ["Bayern Munich", "Borussia Dortmund", "Schalke 04", "Bayer Leverkusen"], correctAnswer: "Borussia Dortmund" },
    { id: 8, text: "Qual time italiano manda seus jogos no estádio San Siro?", options: ["Juventus", "Roma", "AC Milan e Inter Milan", "Napoli"], correctAnswer: "AC Milan e Inter Milan" },
    { id: 9, text: "Qual clube inglês é conhecido como 'The Toffees'?", options: ["Liverpool", "Everton", "Aston Villa", "Newcastle"], correctAnswer: "Everton" },
    { id: 10, text: "Qual time argentino joga no estádio La Bombonera?", options: ["River Plate", "Boca Juniors", "Independiente", "Racing"], correctAnswer: "Boca Juniors" },
    { id: 11, text: "Qual clube português é conhecido como 'Os Encarnados'?", options: ["Porto", "Sporting", "Benfica", "Braga"], correctAnswer: "Benfica" },
    { id: 12, text: "Qual time holandês revelou Johan Cruyff?", options: ["PSV", "Feyenoord", "Ajax", "AZ Alkmaar"], correctAnswer: "Ajax" }
  ],
  general: [
    { id: 1, text: "O que significa a sigla FIFA?", options: ["Federação Internacional de Futebol Associação", "Federação Internacional de Futebol Amador", "Fundação Internacional de Futebol Associação", "Federação Independente de Futebol Associação"], correctAnswer: "Federação Internacional de Futebol Associação" },
    { id: 2, text: "Qual é a distância oficial da marca do pênalti até a linha do gol?", options: ["10 metros", "11 metros", "12 metros", "9.15 metros"], correctAnswer: "11 metros" },
    { id: 3, text: "Em que ano foi introduzido o cartão amarelo e vermelho nas Copas do Mundo?", options: ["1966", "1970", "1974", "1978"], correctAnswer: "1970" },
    { id: 4, text: "Qual é o diâmetro do círculo central do campo de futebol?", options: ["9.15 metros", "10 metros", "11 metros", "12 metros"], correctAnswer: "9.15 metros" },
    { id: 5, text: "Quantas substituições eram permitidas em um jogo oficial antes da pandemia de COVID-19?", options: ["2", "3", "4", "5"], correctAnswer: "3" },
    { id: 6, text: "Qual é a duração do intervalo em uma partida oficial de futebol?", options: ["10 minutos", "12 minutos", "15 minutos", "20 minutos"], correctAnswer: "15 minutos" },
    { id: 7, text: "O que é o 'impedimento' no futebol?", options: ["Tocar a bola com a mão", "Estar mais próximo da linha de gol adversária do que a bola e o penúltimo adversário", "Fazer uma falta dura", "Reclamar com o árbitro"], correctAnswer: "Estar mais próximo da linha de gol adversária do que a bola e o penúltimo adversário" },
    { id: 8, text: "Qual é o peso oficial de uma bola de futebol?", options: ["350-400g", "410-450g", "460-500g", "510-550g"], correctAnswer: "410-450g" },
    { id: 9, text: "Quantos jogadores compõem um time de futebol em campo?", options: ["9", "10", "11", "12"], correctAnswer: "11" },
    { id: 10, text: "O que acontece se um jogador receber dois cartões amarelos no mesmo jogo?", options: ["É advertido verbalmente", "Recebe um cartão vermelho e é expulso", "Fica suspenso por 5 minutos", "O time adversário ganha um pênalti"], correctAnswer: "Recebe um cartão vermelho e é expulso" },
    { id: 11, text: "Qual é a altura oficial da trave de futebol?", options: ["2.30 metros", "2.44 metros", "2.50 metros", "2.60 metros"], correctAnswer: "2.44 metros" },
    { id: 12, text: "Qual é a largura oficial do gol de futebol?", options: ["7.00 metros", "7.32 metros", "7.50 metros", "7.80 metros"], correctAnswer: "7.32 metros" }
  ],
  europe: [
    { id: 1, text: "Qual clube venceu a primeira edição da Taça dos Campeões Europeus (atual Champions League)?", options: ["Real Madrid", "AC Milan", "Benfica", "Stade de Reims"], correctAnswer: "Real Madrid" },
    { id: 2, text: "Quem é o maior artilheiro da história da Eurocopa?", options: ["Michel Platini", "Cristiano Ronaldo", "Alan Shearer", "Antoine Griezmann"], correctAnswer: "Cristiano Ronaldo" },
    { id: 3, text: "Qual país sediou a Eurocopa de 2004?", options: ["Espanha", "Portugal", "Itália", "Grécia"], correctAnswer: "Portugal" },
    { id: 4, text: "Qual clube tem mais títulos da Europa League (incluindo a antiga Copa da UEFA)?", options: ["Juventus", "Inter Milan", "Liverpool", "Sevilla"], correctAnswer: "Sevilla" },
    { id: 5, text: "Qual jogador marcou o gol do título de Portugal na Euro 2016?", options: ["Cristiano Ronaldo", "Nani", "Éder", "Ricardo Quaresma"], correctAnswer: "Éder" },
    { id: 6, text: "Qual seleção venceu a Eurocopa de 1992 de forma surpreendente?", options: ["Dinamarca", "Grécia", "República Tcheca", "Suécia"], correctAnswer: "Dinamarca" },
    { id: 7, text: "Qual clube inglês venceu a Champions League em 1999 com uma virada histórica nos acréscimos?", options: ["Liverpool", "Arsenal", "Chelsea", "Manchester United"], correctAnswer: "Manchester United" },
    { id: 8, text: "Qual jogador holandês marcou um gol antológico de voleio na final da Euro 1988?", options: ["Ruud Gullit", "Marco van Basten", "Frank Rijkaard", "Ronald Koeman"], correctAnswer: "Marco van Basten" },
    { id: 9, text: "Qual clube italiano venceu a Champions League em 2010 sob o comando de José Mourinho?", options: ["AC Milan", "Juventus", "Inter Milan", "Roma"], correctAnswer: "Inter Milan" },
    { id: 10, text: "Qual seleção venceu a primeira edição da Nations League da UEFA?", options: ["Espanha", "França", "Holanda", "Portugal"], correctAnswer: "Portugal" },
    { id: 11, text: "Qual jogador espanhol marcou o gol do título na final da Euro 2008?", options: ["David Villa", "Fernando Torres", "Xavi", "Andrés Iniesta"], correctAnswer: "Fernando Torres" },
    { id: 12, text: "Qual clube francês foi o primeiro (e único até hoje) a vencer a Champions League?", options: ["PSG", "Marseille", "Lyon", "Monaco"], correctAnswer: "Marseille" }
  ],
  national: [
    { id: 1, text: "Qual seleção é conhecida como 'La Celeste'?", options: ["Argentina", "Uruguai", "Itália", "Espanha"], correctAnswer: "Uruguai" },
    { id: 2, text: "Qual país tem mais títulos da Copa da Ásia?", options: ["Coreia do Sul", "Irã", "Arábia Saudita", "Japão"], correctAnswer: "Japão" },
    { id: 3, text: "Qual seleção africana foi a primeira a chegar às quartas de final de uma Copa do Mundo?", options: ["Nigéria", "Senegal", "Camarões", "Gana"], correctAnswer: "Camarões" },
    { id: 4, text: "Qual seleção venceu a Copa América de 2015 e 2016?", options: ["Argentina", "Brasil", "Uruguai", "Chile"], correctAnswer: "Chile" },
    { id: 5, text: "Qual país é conhecido como 'Os Leões Indomáveis'?", options: ["Senegal", "Costa do Marfim", "Camarões", "Nigéria"], correctAnswer: "Camarões" },
    { id: 6, text: "Qual seleção tem mais títulos da Copa Ouro da CONCACAF?", options: ["EUA", "México", "Costa Rica", "Canadá"], correctAnswer: "México" },
    { id: 7, text: "Qual seleção europeia é conhecida como 'A Laranja Mecânica'?", options: ["Bélgica", "Holanda", "Espanha", "Alemanha"], correctAnswer: "Holanda" },
    { id: 8, text: "Qual seleção sul-americana nunca se classificou para uma Copa do Mundo?", options: ["Bolívia", "Venezuela", "Equador", "Peru"], correctAnswer: "Venezuela" },
    { id: 9, text: "Qual país venceu a primeira Copa das Nações Africanas?", options: ["Egito", "Etiópia", "Sudão", "Gana"], correctAnswer: "Egito" },
    { id: 10, text: "Qual seleção é conhecida como 'Os Socceroos'?", options: ["Nova Zelândia", "Austrália", "África do Sul", "Irlanda"], correctAnswer: "Austrália" },
    { id: 11, text: "Qual seleção asiática chegou às semifinais da Copa do Mundo de 2002?", options: ["Japão", "Coreia do Sul", "Arábia Saudita", "Irã"], correctAnswer: "Coreia do Sul" },
    { id: 12, text: "Qual seleção venceu a Copa das Confederações de 2017?", options: ["Brasil", "Alemanha", "Chile", "Portugal"], correctAnswer: "Alemanha" }
  ],
  brazil: [
    { id: 1, text: "Qual clube brasileiro tem mais títulos do Campeonato Brasileiro?", options: ["Flamengo", "Corinthians", "São Paulo", "Palmeiras"], correctAnswer: "Palmeiras" },
    { id: 2, text: "Quem é o maior artilheiro da história do Campeonato Brasileiro?", options: ["Fred", "Romário", "Roberto Dinamite", "Pelé"], correctAnswer: "Roberto Dinamite" },
    { id: 3, text: "Qual clube foi o primeiro campeão da Copa do Brasil em 1989?", options: ["Grêmio", "Flamengo", "Cruzeiro", "Criciúma"], correctAnswer: "Grêmio" },
    { id: 4, text: "Qual estádio é conhecido como 'O Gigante da Pampulha'?", options: ["Maracanã", "Morumbi", "Mineirão", "Beira-Rio"], correctAnswer: "Mineirão" },
    { id: 5, text: "Qual técnico comandou o São Paulo nos títulos mundiais de 1992 e 1993?", options: ["Muricy Ramalho", "Telê Santana", "Vanderlei Luxemburgo", "Luiz Felipe Scolari"], correctAnswer: "Telê Santana" },
    { id: 6, text: "Qual clube brasileiro venceu a Libertadores de forma invicta em 2012?", options: ["Santos", "Corinthians", "Atlético Mineiro", "Flamengo"], correctAnswer: "Corinthians" },
    { id: 7, text: "Quem marcou o milésimo gol de Pelé?", options: ["Andrada", "Leão", "Félix", "Castilho"], correctAnswer: "Andrada" },
    { id: 8, text: "Qual clube é conhecido como 'O Mais Querido'?", options: ["Corinthians", "Flamengo", "São Paulo", "Vasco"], correctAnswer: "Flamengo" },
    { id: 9, text: "Qual jogador é o maior artilheiro da história do Flamengo?", options: ["Zico", "Gabigol", "Romário", "Adriano"], correctAnswer: "Zico" },
    { id: 10, text: "Qual clube brasileiro revelou Neymar?", options: ["São Paulo", "Palmeiras", "Santos", "Corinthians"], correctAnswer: "Santos" },
    { id: 11, text: "Qual estádio sediou a final da Copa do Mundo de 1950?", options: ["Pacaembu", "Maracanã", "Mineirão", "São Januário"], correctAnswer: "Maracanã" },
    { id: 12, text: "Qual clube brasileiro venceu o Mundial de Clubes da FIFA em 2005?", options: ["São Paulo", "Internacional", "Corinthians", "Vasco"], correctAnswer: "São Paulo" }
  ],
  worldCup: [
    { id: 1, text: "Quem foi o artilheiro da Copa do Mundo de 2002?", options: ["Rivaldo", "Miroslav Klose", "Ronaldo", "Christian Vieri"], correctAnswer: "Ronaldo" },
    { id: 2, text: "Qual país sediou a Copa do Mundo de 1994?", options: ["Itália", "França", "Estados Unidos", "México"], correctAnswer: "Estados Unidos" },
    { id: 3, text: "Qual jogador marcou o famoso gol da 'Mão de Deus'?", options: ["Pelé", "Diego Maradona", "Lionel Messi", "Zico"], correctAnswer: "Diego Maradona" },
    { id: 4, text: "Qual seleção foi a primeira a vencer a Copa do Mundo três vezes?", options: ["Itália", "Alemanha", "Brasil", "Uruguai"], correctAnswer: "Brasil" },
    { id: 5, text: "Quem é o maior artilheiro da história das Copas do Mundo?", options: ["Ronaldo", "Gerd Müller", "Miroslav Klose", "Just Fontaine"], correctAnswer: "Miroslav Klose" },
    { id: 6, text: "Em que ano a Copa do Mundo foi realizada no continente africano pela primeira vez?", options: ["2006", "2010", "2014", "2018"], correctAnswer: "2010" },
    { id: 7, text: "Qual jogador francês foi expulso na final da Copa do Mundo de 2006?", options: ["Thierry Henry", "Patrick Vieira", "Zinedine Zidane", "Franck Ribéry"], correctAnswer: "Zinedine Zidane" },
    { id: 8, text: "Qual seleção perdeu três finais de Copa do Mundo sem nunca ter vencido?", options: ["Hungria", "Tchecoslováquia", "Holanda", "Suécia"], correctAnswer: "Holanda" },
    { id: 9, text: "Qual jogador marcou o gol do título da Alemanha na Copa do Mundo de 2014?", options: ["Thomas Müller", "Toni Kroos", "Mario Götze", "André Schürrle"], correctAnswer: "Mario Götze" },
    { id: 10, text: "Qual país sediou a primeira Copa do Mundo em 1930?", options: ["Brasil", "Itália", "França", "Uruguai"], correctAnswer: "Uruguai" },
    { id: 11, text: "Qual jogador brasileiro foi eleito o melhor da Copa do Mundo de 1994?", options: ["Romário", "Bebeto", "Dunga", "Taffarel"], correctAnswer: "Romário" },
    { id: 12, text: "Qual seleção venceu a Copa do Mundo de 1966?", options: ["Alemanha Ocidental", "Inglaterra", "Brasil", "Portugal"], correctAnswer: "Inglaterra" }
  ],
  libertadores: [
    { id: 1, text: "Qual clube tem mais títulos da Libertadores?", options: ["Boca Juniors", "Independiente", "Peñarol", "River Plate"], correctAnswer: "Independiente" },
    { id: 2, text: "Qual foi o primeiro clube brasileiro a vencer a Libertadores?", options: ["Santos", "Cruzeiro", "Flamengo", "São Paulo"], correctAnswer: "Santos" },
    { id: 3, text: "Quem é o maior artilheiro da história da Libertadores?", options: ["Pelé", "Alberto Spencer", "Fernando Morena", "Pedro Rocha"], correctAnswer: "Alberto Spencer" },
    { id: 4, text: "Qual clube venceu a Libertadores de 2019 com dois gols nos acréscimos?", options: ["River Plate", "Flamengo", "Palmeiras", "Boca Juniors"], correctAnswer: "Flamengo" },
    { id: 5, text: "Qual técnico venceu a Libertadores por três clubes diferentes?", options: ["Carlos Bianchi", "Luiz Felipe Scolari", "Marcelo Gallardo", "Telê Santana"], correctAnswer: "Carlos Bianchi" },
    { id: 6, text: "Qual clube colombiano venceu a Libertadores em 2016?", options: ["América de Cali", "Deportivo Cali", "Atlético Nacional", "Millonarios"], correctAnswer: "Atlético Nacional" },
    { id: 7, text: "Qual jogador marcou o gol do título do Palmeiras na Libertadores de 2020?", options: ["Rony", "Luiz Adriano", "Breno Lopes", "Raphael Veiga"], correctAnswer: "Breno Lopes" },
    { id: 8, text: "Qual clube equatoriano venceu a Libertadores em 2008?", options: ["Barcelona SC", "Emelec", "LDU Quito", "Independiente del Valle"], correctAnswer: "LDU Quito" },
    { id: 9, text: "Qual clube brasileiro perdeu a final da Libertadores de 2008 no Maracanã?", options: ["Flamengo", "Vasco", "Fluminense", "Botafogo"], correctAnswer: "Fluminense" },
    { id: 10, text: "Qual jogador brasileiro é o maior artilheiro do país na história da Libertadores?", options: ["Pelé", "Zico", "Gabigol", "Luizão"], correctAnswer: "Gabigol" }
  ],
  championsLeague: [
    { id: 1, text: "Qual clube venceu a Champions League em 2005 no 'Milagre de Istambul'?", options: ["AC Milan", "Liverpool", "Juventus", "Chelsea"], correctAnswer: "Liverpool" },
    { id: 2, text: "Quem é o maior artilheiro da história da Champions League?", options: ["Lionel Messi", "Robert Lewandowski", "Cristiano Ronaldo", "Karim Benzema"], correctAnswer: "Cristiano Ronaldo" },
    { id: 3, text: "Qual jogador marcou o gol do título do Real Madrid na final de 2002?", options: ["Raúl", "Roberto Carlos", "Zinedine Zidane", "Luís Figo"], correctAnswer: "Zinedine Zidane" },
    { id: 4, text: "Qual clube inglês venceu a Champions League pela primeira vez em 2012?", options: ["Arsenal", "Manchester City", "Tottenham", "Chelsea"], correctAnswer: "Chelsea" },
    { id: 5, text: "Qual técnico venceu a Champions League com Porto e Inter de Milão?", options: ["Carlo Ancelotti", "Pep Guardiola", "José Mourinho", "Jürgen Klopp"], correctAnswer: "José Mourinho" },
    { id: 6, text: "Qual jogador marcou na final da Champions League por dois clubes diferentes?", options: ["Cristiano Ronaldo", "Samuel Eto'o", "Mario Mandžukić", "Todos os anteriores"], correctAnswer: "Todos os anteriores" },
    { id: 7, text: "Qual clube alemão perdeu a final da Champions League em casa em 2012?", options: ["Borussia Dortmund", "Bayern Munich", "Bayer Leverkusen", "Schalke 04"], correctAnswer: "Bayern Munich" },
    { id: 8, text: "Qual jogador marcou 17 gols em uma única edição da Champions League?", options: ["Lionel Messi", "Cristiano Ronaldo", "Robert Lewandowski", "Erling Haaland"], correctAnswer: "Cristiano Ronaldo" },
    { id: 9, text: "Qual clube venceu a Champions League três vezes consecutivas entre 2016 e 2018?", options: ["Barcelona", "Bayern Munich", "Real Madrid", "Liverpool"], correctAnswer: "Real Madrid" },
    { id: 10, text: "Qual jogador holandês venceu a Champions League com Ajax, Real Madrid, AC Milan e Inter Milan?", options: ["Clarence Seedorf", "Edgar Davids", "Wesley Sneijder", "Arjen Robben"], correctAnswer: "Clarence Seedorf" }
  ],
  premierLeague: [
    { id: 1, text: "Qual clube venceu a primeira edição da Premier League (1992-93)?", options: ["Blackburn Rovers", "Manchester United", "Arsenal", "Aston Villa"], correctAnswer: "Manchester United" },
    { id: 2, text: "Quem é o maior artilheiro da história da Premier League?", options: ["Wayne Rooney", "Harry Kane", "Alan Shearer", "Thierry Henry"], correctAnswer: "Alan Shearer" },
    { id: 3, text: "Qual jogador detém o recorde de mais assistências na história da Premier League?", options: ["Cesc Fàbregas", "Kevin De Bruyne", "Ryan Giggs", "Frank Lampard"], correctAnswer: "Ryan Giggs" },
    { id: 4, text: "Qual clube venceu a Premier League de forma invicta na temporada 2003-04?", options: ["Chelsea", "Manchester United", "Arsenal", "Liverpool"], correctAnswer: "Arsenal" },
    { id: 5, text: "Qual jogador marcou o famoso gol 'Aguerooooo' aos 93:20 para dar o título ao Man City em 2012?", options: ["Edin Džeko", "Mario Balotelli", "Sergio Agüero", "David Silva"], correctAnswer: "Sergio Agüero" },
    { id: 6, text: "Qual técnico comandou o Manchester United por 26 anos?", options: ["Matt Busby", "Alex Ferguson", "Arsène Wenger", "José Mourinho"], correctAnswer: "Alex Ferguson" },
    { id: 7, text: "Qual clube surpreendeu o mundo ao vencer a Premier League na temporada 2015-16?", options: ["Leicester City", "West Ham", "Southampton", "Everton"], correctAnswer: "Leicester City" },
    { id: 8, text: "Qual jogador marcou o gol mais rápido da história da Premier League (7.69 segundos)?", options: ["Ledley King", "Shane Long", "Christian Eriksen", "Alan Shearer"], correctAnswer: "Shane Long" },
    { id: 9, text: "Qual goleiro tem o maior número de 'clean sheets' (jogos sem sofrer gols) na Premier League?", options: ["David Seaman", "David de Gea", "Petr Čech", "Peter Schmeichel"], correctAnswer: "Petr Čech" },
    { id: 10, text: "Qual jogador detém o recorde de mais gols em uma única temporada de 38 jogos da Premier League?", options: ["Mohamed Salah", "Alan Shearer", "Erling Haaland", "Cristiano Ronaldo"], correctAnswer: "Erling Haaland" }
  ],
  legends: [
    { id: 1, text: "Qual lenda do futebol é conhecida como 'O Rei'?", options: ["Diego Maradona", "Pelé", "Johan Cruyff", "Alfredo Di Stéfano"], correctAnswer: "Pelé" },
    { id: 2, text: "Qual jogador argentino é famoso pelo gol da 'Mão de Deus' e pelo 'Gol do Século'?", options: ["Lionel Messi", "Mario Kempes", "Diego Maradona", "Gabriel Batistuta"], correctAnswer: "Diego Maradona" },
    { id: 3, text: "Qual lenda holandesa foi a figura central do 'Futebol Total'?", options: ["Marco van Basten", "Ruud Gullit", "Johan Cruyff", "Dennis Bergkamp"], correctAnswer: "Johan Cruyff" },
    { id: 4, text: "Qual lenda do Real Madrid marcou gols em cinco finais consecutivas da Taça dos Campeões Europeus?", options: ["Ferenc Puskás", "Alfredo Di Stéfano", "Paco Gento", "Raúl"], correctAnswer: "Alfredo Di Stéfano" },
    { id: 5, text: "Qual lenda alemã é conhecida como 'Der Kaiser' (O Imperador)?", options: ["Gerd Müller", "Lothar Matthäus", "Franz Beckenbauer", "Karl-Heinz Rummenigge"], correctAnswer: "Franz Beckenbauer" },
    { id: 6, text: "Qual lenda francesa venceu a Bola de Ouro três vezes consecutivas nos anos 80?", options: ["Zinedine Zidane", "Michel Platini", "Raymond Kopa", "Just Fontaine"], correctAnswer: "Michel Platini" },
    { id: 7, text: "Qual lenda do Manchester United sobreviveu ao desastre aéreo de Munique e levou o clube à glória europeia?", options: ["George Best", "Denis Law", "Bobby Charlton", "Duncan Edwards"], correctAnswer: "Bobby Charlton" },
    { id: 8, text: "Qual lenda italiana passou toda a sua carreira de 25 anos no AC Milan?", options: ["Franco Baresi", "Paolo Maldini", "Gianni Rivera", "Alessandro Del Piero"], correctAnswer: "Paolo Maldini" },
    { id: 9, text: "Qual lenda húngara dá nome ao prêmio da FIFA para o gol mais bonito do ano?", options: ["Sándor Kocsis", "Nándor Hidegkuti", "Zoltán Czibor", "Ferenc Puskás"], correctAnswer: "Ferenc Puskás" },
    { id: 10, text: "Qual lenda soviética é o único goleiro a ter vencido a Bola de Ouro?", options: ["Rinat Dasayev", "Lev Yashin", "Igor Akinfeev", "Vladimír Beara"], correctAnswer: "Lev Yashin" }
  ],
  curiosities: [
    { id: 1, text: "Qual jogador foi contratado pelo Manchester United após um amistoso contra o Sporting CP em 2003?", options: ["Nani", "Cristiano Ronaldo", "Bruno Fernandes", "Anderson"], correctAnswer: "Cristiano Ronaldo" },
    { id: 2, text: "Qual seleção usou camisas emprestadas de um clube local em uma partida da Copa do Mundo de 1978?", options: ["França", "Hungria", "México", "Tunísia"], correctAnswer: "França" },
    { id: 3, text: "Qual jogador marcou um hat-trick na final da Copa do Mundo de 1966?", options: ["Bobby Charlton", "Geoff Hurst", "Martin Peters", "Pelé"], correctAnswer: "Geoff Hurst" },
    { id: 4, text: "Qual clube inglês tem o apelido de 'The Pompey'?", options: ["Southampton", "Plymouth Argyle", "Portsmouth", "Bournemouth"], correctAnswer: "Portsmouth" },
    { id: 5, text: "Qual jogador famoso foi rejeitado pelo Flamengo nas categorias de base e acabou se tornando ídolo do Vasco?", options: ["Romário", "Edmundo", "Roberto Dinamite", "Juninho Pernambucano"], correctAnswer: "Roberto Dinamite" },
    { id: 6, text: "Qual país é o único a ter participado de todas as edições da Copa do Mundo?", options: ["Alemanha", "Itália", "Brasil", "Argentina"], correctAnswer: "Brasil" },
    { id: 7, text: "Qual jogador marcou um gol com a mão que validou a classificação da França para a Copa de 2010?", options: ["Karim Benzema", "Franck Ribéry", "Thierry Henry", "Nicolas Anelka"], correctAnswer: "Thierry Henry" },
    { id: 8, text: "Qual clube brasileiro tem um mascote chamado 'Galo'?", options: ["Cruzeiro", "Atlético Mineiro", "Corinthians", "Sport"], correctAnswer: "Atlético Mineiro" },
    { id: 9, text: "Qual jogador famoso perdeu um pênalti na final da Copa do Mundo de 1994?", options: ["Franco Baresi", "Daniele Massaro", "Roberto Baggio", "Todos os anteriores"], correctAnswer: "Todos os anteriores" },
    { id: 10, text: "Qual estádio é conhecido como 'O Teatro dos Sonhos'?", options: ["Anfield", "Stamford Bridge", "Old Trafford", "Emirates Stadium"], correctAnswer: "Old Trafford" }
  ]
};
