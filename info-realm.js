/* COUNTER Realm Guide. Page-only presentation; no game settings or API changes.
 * Proposed numeric values remain in the readable HTML. Language and controls
 * enhance it without making basic content depend on JavaScript.
 */
(() => {
  'use strict';
  const root=document.querySelector('main.realm-guide');
  if(!root || root.dataset.ready) return;
  root.dataset.ready='true';
  const english=Object.fromEntries([...root.querySelectorAll('[data-rg]')].map(e=>[e.dataset.rg,e.textContent]));
  const copy={"el":{"edition":"ΟΔΗΓΟΣ ΤΟΥ REALM","heroTag":"ΠΕΡΑ ΑΠΟ ΤΗΝ ΚΑΤΑΙΓΙΔΑ","heroLine1":"Το επόμενο κεφάλαιο.","heroLine2":"Ο δικός σου θρύλος.","heroBody":"Γνώρισε τον κόσμο του COUNTER πριν μπεις στο παιχνίδι. Εξέλιξη, εξοπλισμός, χρήσιμα commands και μάχες που μας φέρνουν όλους μαζί.","explore":"ΓΝΩΡΙΣΕ ΤΟΝ SERVER","install":"Οδηγός εγκατάστασης","heroFoot":"Ένας κόσμος να εξερευνήσεις. Ένα όνομα να θυμούνται.","previewTitle":"ΡΥΘΜΙΣΕΙΣ SERVER · ΠΡΟΕΠΙΣΚΟΠΗΣΗ","previewBody":"Οι τιμές είναι προτεινόμενες, όχι επιβεβαιωμένα live δεδομένα. Rates, όρια και διαθέσιμα commands θα οριστικοποιηθούν πριν το άνοιγμα.","opening":"Νέα για το άνοιγμα","navWorld":"Ο κόσμος","navRates":"Rates","navEnchant":"Enchant","navCommands":"Commands","navEvents":"Events","worldTitle":"Ένας κόσμος για τη δική σου ιστορία.","worldBody":"Μια ματιά στις προτεινόμενες ρυθμίσεις. Βρες τη διαδρομή σου, την ομάδα σου και τον επόμενο στόχο σου.","worldFeature":"Εξερεύνησε. Εξοπλίσου. Ξεχώρισε.","worldFeatureBody":"Από το πρώτο σου farm μέχρι την επόμενη clan battle, κράτα κοντά σου τις βασικές πληροφορίες.","rankingsLink":"Γνώρισε τους πρωταθλητές","buffs":"Διάρκεια buffs","slots":"Θέσεις buffs","farms":"Farm zones","safeZones":"Safe zones","pvpZones":"PvP zone","bosses":"Raid / grand bosses","clockNote":"Δες τις σελίδες Events και Siege για το δημοσιευμένο πρόγραμμα. Ο οδηγός αυτός δεν ορίζει ώρες events.","ratesTitle":"Η εξέλιξή σου, με καθαρή εικόνα.","ratesBody":"Σύγκρινε τα προτεινόμενα Standard και Premium rates. Επίλεξε μια στήλη για έμφαση χωρίς να χάσεις τη σύγκριση.","ratesAsideTag":"Η ΠΟΡΕΙΑ ΣΟΥ","ratesAsideTitle":"Δες τι αλλάζει.","ratesAsideBody":"Τα EXP rates αλλάζουν ανά επίπεδο. SP, Adena και drops χρησιμοποιούν τον αντίστοιχο πολλαπλασιαστή του πίνακα.","premiumTitle":"Premium · προτεινόμενα extras","premiumBody":"Η πρόταση περιλαμβάνει +10% πιθανότητα enchant και +2h διάρκεια buffs. Οι τελικοί κανόνες και ο τρόπος υπολογισμού του bonus εκκρεμούν.","compare":"ΣΥΓΚΡΙΣΗ RATES","standard":"Standard","ratesCaption":"Προτεινόμενα rates προς επιβεβαίωση","progression":"Εξέλιξη","autoFarm":"Auto farm","perDay":"/ ημέρα","ratesFoot":"Η πρόταση δεν περιλαμβάνει ακόμη EXP rates πάνω από το level 80.","enchantTitle":"Κάθε αναβάθμιση έχει την πιθανότητά της.","enchantBody":"Δες την προτεινόμενη βασική πιθανότητα ανά επίπεδο enchant. Είναι οδηγός αναφοράς, όχι προσομοιωτής enchant.","safeEnchant":"SAFE ENCHANT","maxEnchant":"ΜΕΓΙΣΤΟ ENCHANT","enchantApplies":"Το προτεινόμενο όριο ισχύει για όπλα, πανοπλίες και κοσμήματα.","selectedLevel":"ΕΠΙΛΕΓΜΕΝΟ ENCHANT","baseChance":"ΠΡΟΤΕΙΝΟΜΕΝΗ ΠΙΘΑΝΟΤΗΤΑ","enchantFoot":"Επίλεξε ένα επίπεδο για να το δεις. Δεν περιλαμβάνονται Premium bonuses.","commandsTitle":"Λιγότερο ψάξιμο. Περισσότερο παιχνίδι.","commandsBody":"Βρες και αντέγραψε ένα command για το in-game chat. Η λίστα είναι προτεινόμενη· η διαθεσιμότητα χρειάζεται επιβεβαίωση στο τελικό server build.","searchLabel":"Βρες ένα command","cOnline":"Δες πόσοι παίκτες είναι online.","cStats":"Άνοιξε τα στατιστικά χαρακτήρα.","cClass":"Άνοιξε το panel αλλαγής class.","cFarm":"Διαχειρίσου τις ρυθμίσεις auto farm.","cDress":"Δες τις επιλογές εμφάνισης.","cAll":"Δες όλα τα διαθέσιμα commands.","copy":"Αντιγραφή","noCommands":"Δεν βρέθηκε command. Δοκίμασε άλλο όνομα ή λειτουργία.","eventsTitle":"Κάποιες ιστορίες γράφονται στη μάχη.","eventsBody":"Γνώρισε τα events της προεπισκόπησης του Event Center. Εκεί θα βρεις πρόγραμμα, κανόνες και ανακοινώσεις rewards.","eDom":"Επίθεση και άμυνα. Ένα κάστρο για διεκδίκηση.","eZom":"Επιβιώστε μαζί. Σταματήστε τη μόλυνση.","eTvt":"Δύο ομάδες. Κοινό σκορ. Πολέμησε για τη δική σου.","eRoy":"Εξοπλίσου, προσαρμόσου και μείνε ο τελευταίος.","eventDetails":"Δες το event","inGameTitle":"ΜΠΕΣ ONLINE. ΣΥΜΜΕΤΕΧΕ IN-GAME.","inGameBody":"Συνδέσου στον server και ακολούθησε την in-game ανακοίνωση. Δεν γίνεται εγγραφή σε event από το website.","finalTitle":"Το επόμενο βήμα είναι δικό σου.","finalBody":"Ξεκίνα με τον client και το full patch. Ο οδηγός για PC σε βοηθά σε κάθε βήμα.","download":"ΛΗΨΗ & ΕΓΚΑΤΑΣΤΑΣΗ","backTop":"Στην αρχή του οδηγού"},"pt":{"edition":"GUIA DO REINO","heroTag":"ALÉM DA TEMPESTADE","heroLine1":"Seu próximo capítulo.","heroLine2":"Sua própria lenda.","heroBody":"Conheça o mundo de COUNTER antes de entrar. Progressão, equipamentos, comandos úteis e batalhas que unem a comunidade.","explore":"EXPLORE O REINO","install":"Guia de instalação","heroFoot":"Um mundo para explorar. Um nome para lembrar.","previewTitle":"CONFIGURAÇÕES · PRÉVIA ANTES DA ABERTURA","previewBody":"Estes são valores propostos, não dados verificados do servidor ao vivo. Rates, limites e comandos serão confirmados antes da abertura.","opening":"Notícias da abertura","navWorld":"O reino","navRates":"Rates","navEnchant":"Enchant","navCommands":"Comandos","navEvents":"Eventos","worldTitle":"Um reino para a sua história.","worldBody":"Conheça as configurações propostas. Encontre seu caminho, seu grupo e seu próximo objetivo.","worldFeature":"Explore. Equipe-se. Deixe sua marca.","worldFeatureBody":"Da primeira rota de farm à próxima batalha de clãs, tenha sempre as informações essenciais por perto.","rankingsLink":"Conheça os campeões","buffs":"Duração dos buffs","slots":"Slots de buffs","farms":"Zonas de farm","safeZones":"Zonas seguras","pvpZones":"Zona PvP","bosses":"Raid / grand bosses","clockNote":"Confira os horários publicados nas páginas Events e Siege. Este guia não define os horários dos eventos.","ratesTitle":"Progressão sem dúvidas.","ratesBody":"Compare os rates propostos para Standard e Premium. Destaque uma coluna sem perder a comparação.","ratesAsideTag":"SEU CAMINHO","ratesAsideTitle":"Saiba o que muda.","ratesAsideBody":"Os rates de EXP variam por faixa de nível. SP, Adena e drops seguem o multiplicador indicado na tabela.","premiumTitle":"Premium · extras propostos","premiumBody":"A proposta inclui +10% de chance de enchant e +2h de duração dos buffs. As regras finais e o cálculo do bônus ainda precisam ser confirmados.","compare":"COMPARAR RATES","standard":"Standard","ratesCaption":"Rates propostos, aguardando confirmação","progression":"Progressão","autoFarm":"Auto farm","perDay":"/ dia","ratesFoot":"A proposta ainda não publica rates de EXP acima do nível 80.","enchantTitle":"Cada melhoria tem uma chance.","enchantBody":"Confira a chance base proposta para cada nível de enchant. É uma referência, não um simulador de enchant.","safeEnchant":"ENCHANT SEGURO","maxEnchant":"ENCHANT MÁXIMO","enchantApplies":"O limite proposto se aplica a armas, armaduras e joias.","selectedLevel":"ENCHANT SELECIONADO","baseChance":"CHANCE BASE PROPOSTA","enchantFoot":"Selecione um nível para conferir. Bônus Premium não estão incluídos.","commandsTitle":"Menos procura. Mais jogo.","commandsBody":"Encontre e copie um comando para o chat do jogo. A lista é proposta; a disponibilidade precisa ser confirmada na versão final do servidor.","searchLabel":"Encontre um comando","cOnline":"Veja quantos jogadores estão online.","cStats":"Abra as estatísticas do personagem.","cClass":"Abra o painel de troca de classe.","cFarm":"Gerencie as opções de auto farm.","cDress":"Explore as opções de aparência.","cAll":"Veja todos os comandos disponíveis.","copy":"Copiar","noCommands":"Nenhum comando encontrado. Tente outro nome ou função.","eventsTitle":"Algumas histórias precisam de uma batalha.","eventsBody":"Conheça os eventos da prévia do Event Center. Consulte essa página para horários, regras e anúncios de recompensas.","eDom":"Ataque e defesa. Um castelo para conquistar.","eZom":"Sobrevivam juntos. Contenham a infecção.","eTvt":"Duas equipes. Um placar. Lute pelo seu lado.","eRoy":"Encontre itens, adapte-se e seja o último a resistir.","eventDetails":"Explore o evento","inGameTitle":"ENTRE ONLINE. PARTICIPE NO JOGO.","inGameBody":"Entre no servidor e siga o anúncio dentro do jogo. Não há inscrição em eventos pelo site.","finalTitle":"O próximo passo é seu.","finalBody":"Comece com o client e o full patch. Nosso guia para PC acompanha cada etapa.","download":"BAIXAR & INSTALAR","backTop":"Voltar ao início do guia"},"ru":{"edition":"ПУТЕВОДИТЕЛЬ","heroTag":"ПО ТУ СТОРОНУ БУРИ","heroLine1":"Новая глава.","heroLine2":"Твоя легенда.","heroBody":"Познакомься с миром COUNTER до входа в игру. Развитие, экипировка, полезные команды и сражения, которые объединяют игроков.","explore":"ИССЛЕДОВАТЬ МИР","install":"Как установить игру","heroFoot":"Мир для открытий. Имя, которое запомнят.","previewTitle":"НАСТРОЙКИ · ПРЕДВАРИТЕЛЬНАЯ ВЕРСИЯ","previewBody":"Это предлагаемые настройки, а не подтверждённые данные работающего сервера. Рейты, лимиты и команды будут уточнены перед открытием.","opening":"Новости открытия","navWorld":"Мир","navRates":"Рейты","navEnchant":"Заточка","navCommands":"Команды","navEvents":"События","worldTitle":"Мир для твоей истории.","worldBody":"Обзор предлагаемых настроек. Найди свой путь, свою команду и следующую цель.","worldFeature":"Исследуй. Вооружайся. Заявляй о себе.","worldFeatureBody":"От первого маршрута фарма до следующей битвы кланов — держи основную информацию под рукой.","rankingsLink":"Чемпионы сервера","buffs":"Время баффов","slots":"Слоты баффов","farms":"Зоны фарма","safeZones":"Мирные зоны","pvpZones":"PvP-зона","bosses":"Рейд / эпик-боссы","clockNote":"Расписание публикуется на страницах Events и Siege. Этот путеводитель не устанавливает время событий.","ratesTitle":"Развитие без догадок.","ratesBody":"Сравни предлагаемые рейты Standard и Premium. Выдели нужный столбец, сохранив сравнение.","ratesAsideTag":"ТВОЙ ПУТЬ","ratesAsideTitle":"Узнай, что меняется.","ratesAsideBody":"Рейты EXP зависят от уровня. Множители SP, адены и дропа указаны в таблице.","premiumTitle":"Premium · предлагаемые бонусы","premiumBody":"В предложении указаны +10% к шансу заточки и +2h к длительности баффов. Итоговые правила и расчёт бонуса ещё не подтверждены.","compare":"СРАВНЕНИЕ РЕЙТОВ","standard":"Standard","ratesCaption":"Предлагаемые рейты, ожидают подтверждения","progression":"Развитие","autoFarm":"Автофарм","perDay":"/ день","ratesFoot":"Рейты EXP выше 80-го уровня в этой версии ещё не опубликованы.","enchantTitle":"У каждого улучшения есть шанс.","enchantBody":"Изучи предлагаемый базовый шанс каждого уровня заточки. Это справочник, а не симулятор заточки.","safeEnchant":"БЕЗОПАСНАЯ ЗАТОЧКА","maxEnchant":"МАКСИМУМ ЗАТОЧКИ","enchantApplies":"Предлагаемый предел действует для оружия, брони и украшений.","selectedLevel":"УРОВЕНЬ ЗАТОЧКИ","baseChance":"БАЗОВЫЙ ШАНС · ПРОЕКТ","enchantFoot":"Выбери уровень для просмотра. Бонусы Premium не учитываются.","commandsTitle":"Меньше поисков. Больше игры.","commandsBody":"Найди и скопируй команду для игрового чата. Список предварительный; доступность нужно подтвердить для финальной сборки сервера.","searchLabel":"Найти команду","cOnline":"Посмотреть количество игроков онлайн.","cStats":"Открыть статистику персонажа.","cClass":"Открыть панель смены класса.","cFarm":"Настроить автофарм.","cDress":"Посмотреть варианты внешности.","cAll":"Посмотреть все доступные команды.","copy":"Копировать","noCommands":"Команды не найдены. Попробуй другое имя или функцию.","eventsTitle":"Некоторые истории пишутся в бою.","eventsBody":"Познакомься с событиями из предварительной версии Event Center. Там публикуются расписание, правила и новости о наградах.","eDom":"Атака и защита. Один замок для захвата.","eZom":"Выживайте вместе. Сдержите заражение.","eTvt":"Две команды. Общий счёт. Сражайся за своих.","eRoy":"Ищи добычу, приспосабливайся и останься последним.","eventDetails":"Узнать о событии","inGameTitle":"ВХОДИ НА СЕРВЕР. УЧАСТВУЙ В ИГРЕ.","inGameBody":"Зайди на сервер и следуй внутриигровому объявлению. Регистрации на события через сайт нет.","finalTitle":"Следующий шаг — за тобой.","finalBody":"Начни с клиента и полного патча. Руководство для PC поможет на каждом этапе.","download":"СКАЧАТЬ И УСТАНОВИТЬ","backTop":"К началу путеводителя"}};
  const ui={"en":{"searchPlaceholder":"Name or function…","copied":"Copied {command}. Paste it into the in-game chat.","manual":"Clipboard unavailable. The command is selected; copy it manually.","enchant":"Enchant +{level}: proposed base chance {chance}%.","nav":"Guide chapters","tiers":"Highlight a rate column","selectEnchant":"Select enchant level","table":"Proposed rates comparison","title":"Explore COUNTER — Server Guide"},"el":{"searchPlaceholder":"Όνομα ή λειτουργία…","copied":"Αντιγράφηκε το {command}. Επικόλλησέ το στο in-game chat.","manual":"Δεν είναι διαθέσιμο το clipboard. Το command είναι επιλεγμένο για χειροκίνητη αντιγραφή.","enchant":"Enchant +{level}: προτεινόμενη βασική πιθανότητα {chance}%.","nav":"Ενότητες οδηγού","tiers":"Έμφαση σε στήλη rates","selectEnchant":"Επίλεξε επίπεδο enchant","table":"Σύγκριση προτεινόμενων rates","title":"Γνώρισε τον COUNTER — Οδηγός Server"},"pt":{"searchPlaceholder":"Nome ou função…","copied":"{command} copiado. Cole no chat do jogo.","manual":"Área de transferência indisponível. O comando está selecionado; copie manualmente.","enchant":"Enchant +{level}: chance base proposta de {chance}%.","nav":"Capítulos do guia","tiers":"Destacar coluna de rates","selectEnchant":"Selecionar nível de enchant","table":"Comparação de rates propostos","title":"Explore COUNTER — Guia do Servidor"},"ru":{"searchPlaceholder":"Имя или функция…","copied":"Команда {command} скопирована. Вставь её в игровой чат.","manual":"Буфер обмена недоступен. Команда выделена: скопируй её вручную.","enchant":"Заточка +{level}: предлагаемый базовый шанс {chance}%.","nav":"Разделы путеводителя","tiers":"Выделить столбец рейтов","selectEnchant":"Выбрать уровень заточки","table":"Сравнение предлагаемых рейтов","title":"Открой COUNTER — Путеводитель по серверу"}};
  const currentLanguage=()=>{
    const language=String(window.FafurionI18n?.language||document.documentElement.lang||'en').toLowerCase().slice(0,2);
    return Object.hasOwn(ui,language)?language:'en';
  };
  const local=()=>ui[currentLanguage()];
  const query=root.querySelector('#rg-command-search');
  const commands=[...root.querySelectorAll('.rg-command')];
  const englishCommands=new Map(commands.map(card=>[card,card.textContent]));
  const count=root.querySelector('#rg-command-count');
  const empty=root.querySelector('#rg-search-empty');
  const feedback=root.querySelector('#rg-copy-status');
  const normalize=value=>String(value).normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();
  function filterCommands(){
    const term=normalize(query.value.trim());
    let visible=0;
    commands.forEach(card=>{
      const match=normalize(card.textContent+' '+englishCommands.get(card)).includes(term);
      card.hidden=!match;
      if(match)visible++;
    });
    count.textContent=visible+' / '+commands.length;
    empty.hidden=visible!==0;
  }
  query.addEventListener('input',filterCommands);
  root.querySelectorAll('[data-tier-button]').forEach(button=>button.addEventListener('click',()=>{
    root.querySelector('.rg-rates-panel').dataset.tier=button.dataset.tierButton;
    root.querySelectorAll('[data-tier-button]').forEach(other=>other.setAttribute('aria-pressed',String(other===button)));
  }));
  const levels=[...root.querySelectorAll('[data-enchant]')];
  let selected=levels.find(button=>button.getAttribute('aria-pressed')==='true')||levels[0];
  const describe=button=>local().enchant.replace('{level}',button.dataset.enchant).replace('{chance}',button.dataset.chance);
  function setEnchant(button,announce){
    selected=button;
    levels.forEach(other=>other.setAttribute('aria-pressed',String(other===button)));
    root.querySelector('#rg-enchant-level').textContent='+'+button.dataset.enchant;
    const readout=root.querySelector('#rg-enchant-chance');
    const percent=document.createElement('span');percent.textContent='%';
    readout.replaceChildren(document.createTextNode(button.dataset.chance),percent);
    root.querySelector('#rg-chance-fill').style.width=button.dataset.chance+'%';
    if(announce)root.querySelector('#rg-enchant-status').textContent=describe(button);
  }
  levels.forEach(button=>button.addEventListener('click',()=>setEnchant(button,true)));
  root.querySelectorAll('[data-copy]').forEach(button=>button.addEventListener('click',async()=>{
    const command=button.dataset.copy;
    const code=button.closest('.rg-command').querySelector('code');
    if(command!==code.textContent)return;
    try{
      if(!navigator.clipboard?.writeText)throw new Error('Clipboard unavailable');
      await navigator.clipboard.writeText(command);
      feedback.textContent=local().copied.replace('{command}',command);
    }catch{
      const selection=window.getSelection();
      if(selection){const range=document.createRange();range.selectNodeContents(code);selection.removeAllRanges();selection.addRange(range);}
      feedback.textContent=local().manual;
    }
  }));
  const jump=root.querySelector('.rg-jump');
  const links=[...jump.querySelectorAll('a[href^="#"]')];
  const chapters=links.map(link=>document.getElementById(link.hash.slice(1)));
  let currentId='',headerOffset=0,jumpHeight=0,queued=false;
  function measure(){
    const header=document.querySelector('header.inner-index-header');
    const position=header?getComputedStyle(header).position:'';
    headerOffset=header&&['fixed','sticky'].includes(position)?Math.ceil(header.getBoundingClientRect().height)+Math.max(0,parseFloat(getComputedStyle(header).top)||0)+8:8;
    jumpHeight=Math.ceil(jump.getBoundingClientRect().height);
    root.style.setProperty('--rg-header',headerOffset+'px');
    root.style.setProperty('--rg-jump-height',jumpHeight+'px');
    updateChapter();
  }
  function activate(id){
    if(currentId===id)return;
    currentId=id;
    links.forEach(link=>{if(link.hash==='#'+id)link.setAttribute('aria-current','location');else link.removeAttribute('aria-current');});
  }
  function updateChapter(){
    let chapter=chapters[0];
    for(const section of chapters)if(section.getBoundingClientRect().top<=headerOffset+jumpHeight+70)chapter=section;
    if(chapter)activate(chapter.id);
    queued=false;
  }
  window.addEventListener('scroll',()=>{if(!queued){queued=true;requestAnimationFrame(updateChapter);}},{passive:true});
  window.addEventListener('resize',measure,{passive:true});
  const header=document.querySelector('header.inner-index-header');
  if(typeof ResizeObserver==='function'){
    const observer=new ResizeObserver(measure);
    if(header)observer.observe(header);
    observer.observe(jump);
  }
  links.forEach(link=>link.addEventListener('click',event=>{
    if(event.ctrlKey||event.metaKey||event.shiftKey||event.altKey)return;
    const target=document.getElementById(link.hash.slice(1));
    if(target){activate(target.id);requestAnimationFrame(()=>target.focus({preventScroll:true}));}
  }));
  function translate(){
    const language=currentLanguage(),dictionary=language==='en'?english:copy[language],words=ui[language];
    root.querySelectorAll('[data-rg]').forEach(element=>{const value=dictionary[element.dataset.rg]??english[element.dataset.rg];if(element.textContent!==value)element.textContent=value;});
    query.placeholder=words.searchPlaceholder;
    jump.setAttribute('aria-label',words.nav);
    root.querySelector('.rg-tier-toggle').setAttribute('aria-label',words.tiers);
    root.querySelector('.rg-enchant-steps').setAttribute('aria-label',words.selectEnchant);
    root.querySelector('.rg-table-wrap').setAttribute('aria-label',words.table);
    root.querySelectorAll('[data-copy]').forEach(button=>button.setAttribute('aria-label',dictionary.copy+' '+button.dataset.copy));
    levels.forEach(button=>button.setAttribute('aria-label',describe(button)));
    document.title=words.title;
    feedback.textContent='';
    root.querySelector('#rg-enchant-status').textContent='';
    filterCommands();
    measure();
  }
  translate();
  window.addEventListener('fafurion:language',translate);
  window.addEventListener('load',measure,{once:true});
  window.CounterRealmGuide=Object.freeze({refresh:translate});
})();
