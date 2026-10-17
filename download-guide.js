/* COUNTER Download Guide. Only this page: no account, API or game-server changes.
 * English is readable in the HTML without JavaScript; the existing site picker
 * selects Greek, Brazilian Portuguese or Russian. Translation uses textContent.
 * SERVER_CONFIG remains the only source of download URLs and release metadata.
 */
(() => {
  'use strict';
  const root = document.querySelector('main.download-guide');
  if (!root || root.dataset.guideReady) return;
  root.dataset.guideReady = 'true';
  const english = Object.fromEntries([...root.querySelectorAll('[data-dg]')].map(el => [el.dataset.dg, el.textContent]));
  const copy = {
    en: english,
    el: {
      title:'Εγκατάσταση του COUNTER στο PC σου',
      intro:'Πρώτη φορά εδώ; Χρειάζεσαι το Game Client και το Full Server Patch. Εγκαθιστάς το παιχνίδι στον Windows υπολογιστή σου, όχι λογισμικό server.',
      newTitle:'Παίζεις πρώτη φορά;',newBody:'Ξεκίνα με καθαρό Fafurion client. Κατέβασε τα αρχεία 01 + 02 παρακάτω και ακολούθησε τα πέντε βήματα εγκατάστασης.',newLink:'Νέα εγκατάσταση',
      returnTitle:'Παίζεις ήδη στον COUNTER;',returnBody:'Το Update Only είναι μόνο για υπάρχουσα, συμβατή εγκατάσταση COUNTER. Δεν περιλαμβάνει ολόκληρο το παιχνίδι.',returnLink:'Οδηγίες ενημέρωσης',
      filesTitle:'Ποια αρχεία χρειάζεσαι',filesNote:'Σε νέα εγκατάσταση, περνάς το Full Server Patch ΜΕΤΑ την αποσυμπίεση του Game Client.',
      clientTag:'01 · ΤΟ ΒΑΣΙΚΟ ΠΑΙΧΝΙΔΙ',clientName:'Game Client',clientBody:'Κατέβασέ το και αποσυμπίεσέ το πρώτο. Χρησιμοποίησε αυτόν τον Fafurion client, όχι client άλλου server ή chronicle.',
      patchTag:'02 · ΑΠΑΡΑΙΤΗΤΟ ΓΙΑ COUNTER',patchName:'Full Server Patch',patchBody:'Περνιέται πάνω στον αποσυμπιεσμένο Game Client. Το patch μόνο του δεν είναι ολόκληρο το παιχνίδι.',
      updateTag:'03 · ΜΟΝΟ ΓΙΑ ΥΠΑΡΧΟΝΤΕΣ ΠΑΙΚΤΕΣ',updateName:'Update Only',updateBody:'Χρησιμοποίησέ το μόνο αν η εγκατεστημένη έκδοση COUNTER καλύπτει τις απαιτήσεις του update. Διαφορετικά, πέρασε το Full Server Patch.',
      availabilityNote:'Τα links δεν έχουν δημοσιευτεί ακόμη. Τα κουμπιά λήψης θα ενεργοποιηθούν εδώ όταν κυκλοφορήσουν τα αρχεία. Τα δοκιμαστικά μεγέθη και οι ημερομηνίες δεν αποτελούν απαιτήσεις εγκατάστασης.',
      versionLabel:'Έκδοση patch',dateLabel:'Ενημερώθηκε',checksumLabel:'Full Patch · SHA-256',
      prepTitle:'Πριν ξεκινήσεις',prepBody:'Κλείσε το Lineage II. Χρησιμοποίησε ξεχωριστό φάκελο και άφησε αρκετό ελεύθερο χώρο για τα αρχεία λήψης και τα αποσυμπιεσμένα αρχεία. Μην αναμειγνύεις client άλλου server.',
      stepsLabel:'ΠΡΩΤΗ ΕΓΚΑΤΑΣΤΑΣΗ',stepsTitle:'Από το download στην επιλογή χαρακτήρα',
      s1Title:'Κατέβασε και αποσυμπίεσε το Game Client',s1Body:'Περίμενε να ολοκληρωθεί η λήψη. Αποσυμπίεσε ολόκληρο το αρχείο σε νέο φάκελο, για παράδειγμα:',
      s2Title:'Βρες τον κεντρικό φάκελο του παιχνιδιού',s2Body:'Άνοιξε τους φακέλους που αποσυμπιέστηκαν μέχρι να δεις τον System δίπλα στους υπόλοιπους φακέλους του παιχνιδιού. Αυτός είναι ο κεντρικός φάκελος του client: εκεί περνάει το patch.',
      s3Title:'Πέρασε το Full Server Patch',s3Body:'Αποσυμπίεσε το patch χωριστά. Άνοιξέ το μέχρι να δεις τον φάκελο System. Αντέγραψε τα ΠΕΡΙΕΧΟΜΕΝΑ στον κεντρικό φάκελο του client, συγχώνευσε τους αντίστοιχους φακέλους και δέξου αντικατάσταση των ίδιων αρχείων όταν το ζητήσουν τα Windows. Μην αντιγράψεις απλώς το ZIP/RAR.',
      s4Title:'Άνοιξε το παιχνίδι με το patch του COUNTER',s4Body:'Μπες στον System και εκτέλεσε το L2.exe αυτής της εγκατάστασης. Μπορείς να δημιουργήσεις συντόμευση σε αυτό το αρχείο. Μην ανοίγεις παλιά συντόμευση ή launcher άλλου server.',
      s5Title:'Συνδέσου και επίλεξε COUNTER',s5Body:'Χρησιμοποίησε το game account σου και επίλεξε COUNTER όταν ανοίξει ο server. Οι οδηγίες δημιουργίας game account θα δημοσιευτούν πριν το άνοιγμα. Οι δοκιμαστικές σελίδες Account/Admin του site δεν δημιουργούν game account.',
      folderTitle:'Εδώ μπαίνει το patch',folderNote:'Παράδειγμα μετά την αποσυμπίεση. Το όνομα του φακέλου ή ο δίσκος σου μπορεί να διαφέρει.',
      rightTitle:'Σωστό',rightBody:'Ο System του patch συγχωνεύεται με τον System του client.',wrongTitle:'Όχι δεύτερος φάκελος System',wrongBody:'Μην βάλεις ολόκληρο τον φάκελο του patch μέσα στον System. Έτσι δημιουργείται επιπλέον φάκελος αντί να ενημερωθούν τα αρχεία του παιχνιδιού.',launchLabel:'Από εδώ ξεκινάς το παιχνίδι',
      updatesLabel:'ΕΧΕΙΣ ΗΔΗ ΕΓΚΑΤΑΣΤΑΣΗ',updatesTitle:'Ενημέρωση υπάρχοντος COUNTER client',
      u1Title:'Κλείσε το παιχνίδι',u1Body:'Βγες από το Lineage II πριν αντικαταστήσεις αρχεία. Κράτησε αντίγραφο της λειτουργικής εγκατάστασης ή των αρχείων που θα αντικαταστήσεις.',
      u2Title:'Έλεγξε σε ποια έκδοση περνάει το update',u2Body:'Χρησιμοποίησε Update Only μόνο στην έκδοση COUNTER που αναφέρουν οι οδηγίες της έκδοσης. Αν δεν ξέρεις ποια έχεις ή είναι πολύ παλιά, πέρασε το τελευταίο Full Server Patch σε συμβατό client.',
      u3Title:'Αποσυμπίεση, αντικατάσταση, εκκίνηση',u3Body:'Αποσυμπίεσε το update, αντέγραψε τα περιεχόμενα στον ίδιο κεντρικό φάκελο του client και αντικατάστησε τα αντίστοιχα αρχεία. Άνοιξε ξανά το System\\L2.exe. Το update δεν αντικαθιστά τον Game Client.',
      faqTitle:'Κάτι δεν λειτουργεί;',
      q1:'Χρειάζομαι και τα τρία downloads;',a1:'Σε νέα εγκατάσταση χρειάζεσαι Game Client + Full Server Patch. Το Update Only προορίζεται για υπάρχουσα υποστηριζόμενη έκδοση. Πέρνα επιπλέον update μετά το full patch μόνο αν το ζητούν ρητά οι οδηγίες της έκδοσης.',
      q2:'Δεν αποσυμπιέζεται το αρχείο ή εμφανίζεται CRC error.',a2:'Έλεγξε ότι ολοκληρώθηκε η λήψη. Κατέβασε ξανά ένα αλλοιωμένο αρχείο και χρησιμοποίησε πρόγραμμα αποσυμπίεσης που υποστηρίζει τη μορφή του. Αν το πακέτο έχει πολλά μέρη, κατέβασέ τα όλα στον ίδιο φάκελο πρώτα.',
      q3:'Λείπει το L2.exe ή εμφανίζεται σφάλμα DLL.',a3:'Βεβαιώσου ότι ολοκληρώθηκε η αποσυμπίεση και ότι πέρασες το patch στον σωστό κεντρικό φάκελο. Μην αναμειγνύεις αρχεία System άλλων clients και μην κατεβάζεις τυχαία DLL. Σε αναμεμειγμένη εγκατάσταση, ξεκίνα με καθαρό client σε ξεχωριστό φάκελο.',
      q4:'Ανοίγει άλλος server ή δεν μπορώ να συνδεθώ.',a4:'Έλεγξε τη διαδρομή της συντόμευσης και πέρασε το COUNTER patch στον φάκελο από τον οποίο πραγματικά ανοίγεις το παιχνίδι. Έλεγξε ότι ο server είναι ανοιχτός και χρησιμοποιείς game account. Μην αλλάζεις τα αρχεία σύνδεσης με ρυθμίσεις άλλου server.',
      q5:'Τα Windows ή το antivirus μπλοκάρουν ένα αρχείο.',a5:'Μην απενεργοποιήσεις το antivirus και μην αγνοήσεις την προειδοποίηση. Σταμάτησε και ζήτησε από την ομάδα COUNTER να ελέγξει το συγκεκριμένο αρχείο και το checksum του. Χρησιμοποίησε μόνο αρχεία που συνδέονται από αυτή τη σελίδα Download.',
      helpTitle:'Χρειάζεσαι βοήθεια;',helpBody:'Στείλε στην ομάδα screenshot του σφάλματος, την έκδοση των Windows και το βήμα στο οποίο κόλλησες. Ποτέ κωδικό ή ιδιωτικά στοιχεία λογαριασμού.',helpLink:'Βοήθεια στο COUNTER Discord'
    },
    pt: {
      title:'Instale o COUNTER no seu PC',intro:'É sua primeira vez? Você precisa do Game Client e do Full Server Patch. Você vai instalar o jogo no seu PC Windows, não um software de servidor.',
      newTitle:'Primeira vez jogando?',newBody:'Comece com um client Fafurion limpo. Baixe os arquivos 01 + 02 abaixo e siga os cinco passos de instalação.',newLink:'Nova instalação',
      returnTitle:'Já joga no COUNTER?',returnBody:'Update Only é para uma instalação COUNTER existente e compatível. Não contém o jogo completo.',returnLink:'Como atualizar',
      filesTitle:'Escolha os arquivos certos',filesNote:'Em uma nova instalação, aplique o Full Server Patch DEPOIS de extrair o Game Client.',
      clientTag:'01 · JOGO BASE',clientName:'Game Client',clientBody:'Baixe e extraia este arquivo primeiro. Use este client Fafurion, não um client de outro servidor ou crônica.',
      patchTag:'02 · NECESSÁRIO PARA COUNTER',patchName:'Full Server Patch',patchBody:'Aplique sobre o Game Client extraído. O patch sozinho não é o jogo completo.',
      updateTag:'03 · APENAS PARA QUEM JÁ JOGA',updateName:'Update Only',updateBody:'Use somente se a versão COUNTER instalada atender aos requisitos da atualização. Caso contrário, use o Full Server Patch.',
      availabilityNote:'Os links ainda não foram publicados. Os botões serão ativados aqui quando os arquivos forem lançados. Tamanhos e datas de demonstração não são requisitos de instalação.',
      versionLabel:'Versão do patch',dateLabel:'Atualizado',checksumLabel:'Full Patch · SHA-256',
      prepTitle:'Antes de começar',prepBody:'Feche o Lineage II. Use uma pasta separada e deixe espaço livre para os arquivos baixados e extraídos. Mantenha separado o client de outro servidor.',
      stepsLabel:'PRIMEIRA INSTALAÇÃO',stepsTitle:'Do download à seleção de personagem',
      s1Title:'Baixe e extraia o Game Client',s1Body:'Aguarde o fim do download. Extraia o arquivo completo para uma pasta nova, por exemplo:',
      s2Title:'Encontre a pasta do jogo',s2Body:'Abra as pastas extraídas até encontrar System ao lado das outras pastas do jogo. Essa é a raiz do client: o local onde o patch deve ser aplicado.',
      s3Title:'Aplique o Full Server Patch',s3Body:'Extraia o patch separadamente. Abra-o até encontrar a pasta System. Copie o CONTEÚDO para a raiz do client, mescle as pastas e substitua os arquivos correspondentes quando o Windows perguntar. Não copie apenas o ZIP/RAR.',
      s4Title:'Inicie o jogo com o patch',s4Body:'Abra System e execute L2.exe desta instalação COUNTER. Você pode criar um atalho para esse arquivo. Não use um atalho antigo nem o launcher de outro servidor.',
      s5Title:'Entre e selecione COUNTER',s5Body:'Use sua conta do jogo e selecione COUNTER quando o servidor estiver aberto. As instruções para criar uma conta serão publicadas antes da abertura. As páginas de demonstração Account/Admin do site não registram contas do jogo.',
      folderTitle:'É aqui que o patch deve entrar',folderNote:'Exemplo após a extração. O nome da sua pasta ou unidade pode ser diferente.',rightTitle:'Correto',rightBody:'A pasta System do patch é mesclada com a pasta System do client.',wrongTitle:'Não crie outra pasta System',wrongBody:'Não coloque toda a pasta do patch dentro de System. Isso cria uma pasta extra em vez de atualizar os arquivos do jogo.',launchLabel:'Inicie o jogo por este arquivo',
      updatesLabel:'JÁ INSTALADO',updatesTitle:'Atualizando um client COUNTER existente',
      u1Title:'Feche o jogo',u1Body:'Saia do Lineage II antes de substituir arquivos. Faça uma cópia da instalação que funciona ou dos arquivos que serão substituídos.',
      u2Title:'Confira os requisitos da atualização',u2Body:'Use Update Only apenas na versão COUNTER indicada nas instruções da atualização. Se não souber sua versão ou ela for muito antiga, use o Full Server Patch mais recente em um client compatível.',
      u3Title:'Extraia, substitua e reinicie',u3Body:'Extraia a atualização, copie o conteúdo para a mesma raiz do client e substitua os arquivos correspondentes. Abra System\\L2.exe novamente. A atualização não substitui o Game Client.',
      faqTitle:'Algo não está funcionando?',
      q1:'Preciso dos três downloads?',a1:'Para uma instalação nova, use Game Client + Full Server Patch. Update Only é para uma versão existente e compatível. Instale uma atualização adicional depois do full patch somente se as instruções da versão exigirem isso.',
      q2:'O arquivo não extrai ou apresenta erro CRC.',a2:'Confira se o download terminou. Baixe novamente um arquivo corrompido e use um programa de extração compatível com seu formato. Se houver várias partes, baixe todas para a mesma pasta primeiro.',
      q3:'L2.exe está ausente ou aparece um erro de DLL.',a3:'Confira se a extração terminou e se o patch foi copiado para a raiz correta. Não misture arquivos System de outros clients nem baixe DLLs aleatórias. Para uma instalação misturada, comece com um client limpo em outra pasta.',
      q4:'Abre outro servidor ou não consigo entrar.',a4:'Verifique o caminho do atalho e aplique o patch COUNTER na pasta usada para iniciar o jogo. Confirme que o servidor está aberto e que você usa uma conta do jogo. Não altere arquivos de conexão com configurações de outro servidor.',
      q5:'O Windows ou meu antivírus bloqueia um arquivo.',a5:'Não desative o antivírus nem ignore o aviso. Pare e peça à equipe COUNTER para verificar o arquivo e seu checksum. Use somente arquivos vinculados nesta página Download.',
      helpTitle:'Ainda precisa de ajuda?',helpBody:'Envie à equipe uma captura do erro, a versão do Windows e o passo em que ocorreu o problema. Nunca envie sua senha ou dados privados da conta.',helpLink:'Ajuda no Discord do COUNTER'
    },
    ru: {
      title:'Установите COUNTER на свой ПК',intro:'Впервые здесь? Вам нужны Game Client и Full Server Patch. Вы устанавливаете игру на ПК с Windows, а не серверное ПО.',
      newTitle:'Играете впервые?',newBody:'Начните с чистого клиента Fafurion. Скачайте файлы 01 + 02 ниже и выполните пять шагов установки.',newLink:'Новая установка',
      returnTitle:'Уже играете на COUNTER?',returnBody:'Update Only предназначен для уже установленного совместимого клиента COUNTER. Это не полная игра.',returnLink:'Инструкция по обновлению',
      filesTitle:'Выберите нужные файлы',filesNote:'При новой установке Full Server Patch применяется ПОСЛЕ распаковки Game Client.',
      clientTag:'01 · ОСНОВНАЯ ИГРА',clientName:'Game Client',clientBody:'Сначала скачайте и распакуйте этот файл. Используйте этот клиент Fafurion, а не клиент другого сервера или хроник.',
      patchTag:'02 · НЕОБХОДИМО ДЛЯ COUNTER',patchName:'Full Server Patch',patchBody:'Применяется к распакованному Game Client. Сам по себе патч не является полной игрой.',
      updateTag:'03 · ТОЛЬКО ДЛЯ ТЕКУЩИХ ИГРОКОВ',updateName:'Update Only',updateBody:'Используйте, только если установленная версия COUNTER соответствует требованиям обновления. Иначе установите Full Server Patch.',
      availabilityNote:'Ссылки ещё не опубликованы. Кнопки загрузки станут доступны здесь после выпуска файлов. Демонстрационные размеры и даты не являются требованиями установки.',
      versionLabel:'Версия патча',dateLabel:'Обновлено',checksumLabel:'Full Patch · SHA-256',
      prepTitle:'Перед началом',prepBody:'Закройте Lineage II. Используйте отдельную папку и оставьте место для скачанных архивов и распакованных файлов. Не смешивайте клиент с файлами другого сервера.',
      stepsLabel:'ПЕРВАЯ УСТАНОВКА',stepsTitle:'От загрузки до выбора персонажа',
      s1Title:'Скачайте и распакуйте Game Client',s1Body:'Дождитесь окончания загрузки. Распакуйте весь архив в новую папку, например:',
      s2Title:'Найдите папку игры',s2Body:'Открывайте распакованные папки, пока не увидите System рядом с другими папками игры. Это корень клиента — сюда нужно копировать патч.',
      s3Title:'Установите Full Server Patch',s3Body:'Распакуйте патч отдельно. Откройте его до папки, содержащей System. Скопируйте СОДЕРЖИМОЕ в корень клиента, объедините папки и подтвердите замену совпадающих файлов в Windows. Не копируйте сам архив ZIP/RAR.',
      s4Title:'Запустите игру с патчем COUNTER',s4Body:'Откройте System и запустите L2.exe именно из этой установки COUNTER. Можно создать ярлык для этого файла. Не используйте старый ярлык или лаунчер другого сервера.',
      s5Title:'Войдите и выберите COUNTER',s5Body:'Используйте игровой аккаунт и выберите COUNTER, когда сервер откроется. Инструкция по созданию аккаунта будет опубликована до открытия. Демонстрационные страницы Account/Admin на сайте не создают игровые аккаунты.',
      folderTitle:'Сюда копируется патч',folderNote:'Пример после распаковки. Имя вашей папки или диска может отличаться.',rightTitle:'Правильно',rightBody:'Папка System из патча объединяется с папкой System клиента.',wrongTitle:'Не создавайте вторую папку System',wrongBody:'Не вставляйте всю папку патча внутрь System. Это создаст лишнюю папку вместо обновления файлов игры.',launchLabel:'Запускайте игру отсюда',
      updatesLabel:'ИГРА УЖЕ УСТАНОВЛЕНА',updatesTitle:'Обновление установленного клиента COUNTER',
      u1Title:'Закройте игру',u1Body:'Выйдите из Lineage II перед заменой файлов. Сохраните копию рабочей установки или файлов, которые будете заменять.',
      u2Title:'Проверьте требования обновления',u2Body:'Используйте Update Only только для версии COUNTER, указанной в инструкции к обновлению. Если версия неизвестна или слишком старая, установите последний Full Server Patch на совместимый клиент.',
      u3Title:'Распакуйте, замените и запустите',u3Body:'Распакуйте обновление, скопируйте содержимое в тот же корень клиента и замените совпадающие файлы. Снова запустите System\\L2.exe. Обновление не заменяет Game Client.',
      faqTitle:'Что-то не работает?',
      q1:'Нужно скачивать все три файла?',a1:'Для новой установки нужны Game Client + Full Server Patch. Update Only предназначен для уже установленной поддерживаемой версии. Дополнительное обновление после полного патча нужно только по прямому указанию инструкции к выпуску.',
      q2:'Архив не распаковывается или возникает ошибка CRC.',a2:'Проверьте, завершилась ли загрузка. Скачайте повреждённый архив заново и используйте программу, поддерживающую его формат. Если архив состоит из частей, сначала скачайте все части в одну папку.',
      q3:'Нет L2.exe или возникает ошибка DLL.',a3:'Убедитесь, что распаковка завершена и патч скопирован в правильный корень клиента. Не смешивайте System разных клиентов и не скачивайте случайные DLL. При смешанных файлах начните с чистого клиента в отдельной папке.',
      q4:'Открывается другой сервер или не получается войти.',a4:'Проверьте путь ярлыка и установите патч COUNTER в папку, из которой действительно запускаете игру. Убедитесь, что сервер открыт и используется игровой аккаунт. Не меняйте файлы подключения на настройки другого сервера.',
      q5:'Windows или антивирус блокирует файл.',a5:'Не отключайте антивирус и не игнорируйте предупреждение. Остановитесь и попросите команду COUNTER проверить конкретный файл и его контрольную сумму. Используйте только файлы по ссылкам на этой странице Download.',
      helpTitle:'Нужна помощь?',helpBody:'Отправьте команде снимок ошибки, версию Windows и номер шага, на котором возникла проблема. Никогда не отправляйте пароль или личные данные аккаунта.',helpLink:'Помощь в Discord COUNTER'
    }
  };
  const ui = {
    en:{pending:'Not published yet',download:'Download',size:'Size not published',partial:'Only the downloads marked available are published. For a new installation you need both Game Client and Full Server Patch.',ready:'Use the links below. Read the installation and update requirements before replacing files.',copy:'Copy checksum',copied:'Checksum copied.',select:'Select and copy the checksum manually.',hashPending:'Checksum not published yet.'},
    el:{pending:'Δεν έχει δημοσιευτεί',download:'Λήψη',size:'Μέγεθος μη δημοσιευμένο',partial:'Διαθέσιμα είναι μόνο τα αρχεία που έχουν ενεργό κουμπί λήψης. Για νέα εγκατάσταση χρειάζεσαι και Game Client και Full Server Patch.',ready:'Χρησιμοποίησε τα παρακάτω links. Διάβασε τις οδηγίες εγκατάστασης και ενημέρωσης πριν αντικαταστήσεις αρχεία.',copy:'Αντιγραφή checksum',copied:'Το checksum αντιγράφηκε.',select:'Επίλεξε και αντέγραψε το checksum χειροκίνητα.',hashPending:'Το checksum δεν έχει δημοσιευτεί.'},
    pt:{pending:'Ainda não publicado',download:'Baixar',size:'Tamanho não publicado',partial:'Somente os downloads com botão ativo estão publicados. Para uma nova instalação, você precisa do Game Client e do Full Server Patch.',ready:'Use os links abaixo. Leia os requisitos de instalação e atualização antes de substituir arquivos.',copy:'Copiar checksum',copied:'Checksum copiado.',select:'Selecione e copie o checksum manualmente.',hashPending:'Checksum ainda não publicado.'},
    ru:{pending:'Ещё не опубликовано',download:'Скачать',size:'Размер не опубликован',partial:'Опубликованы только файлы с активной кнопкой загрузки. Для новой установки нужны и Game Client, и Full Server Patch.',ready:'Используйте ссылки ниже. Перед заменой файлов прочитайте требования установки и обновления.',copy:'Копировать SHA-256',copied:'Контрольная сумма скопирована.',select:'Выделите и скопируйте контрольную сумму вручную.',hashPending:'Контрольная сумма ещё не опубликована.'}
  };
  const config = window.SERVER_CONFIG || {};
  const patch = config.patch || {};
  const getLanguage = () => {
    const value = String(window.FafurionI18n?.language || document.documentElement.lang || 'en').slice(0,2).toLowerCase();
    return Object.hasOwn(copy,value) ? value : 'en';
  };
  function downloadUrl(value) {
    if (typeof value !== 'string' || !value.trim()) return null;
    try {
      const url = new URL(value.trim());
      return url.protocol === 'https:' && !url.username && !url.password ? url.href : null;
    } catch { return null; }
  }
  const resources = [
    {key:'client',size:'patchClientSize',value:patch.clientSize},
    {key:'patch',size:'patchFullSize',value:patch.fullPatchSize},
    {key:'update',size:'patchUpdateSize',value:patch.updateSize}
  ];
  const urls = Object.fromEntries(resources.map(r => [r.key,downloadUrl(config[r.key+'Url'])]));
  const rawHash = String(patch.checksum || '').trim();
  const hash = urls.patch ? (rawHash.match(/^(?:SHA-256\s*[:·-]?\s*)?([a-f0-9]{64})$/i)?.[1] || '') : '';
  const set = (id,text) => { const el=document.getElementById(id); if(el)el.textContent=String(text); };
  function render() {
    const language=getLanguage(), words=copy[language], states=ui[language];
    root.querySelectorAll('[data-dg]').forEach(el => { el.textContent=words[el.dataset.dg] ?? english[el.dataset.dg]; });
    let available=0;
    for(const resource of resources) {
      const button=root.querySelector('.patch-download-option[data-resource="'+resource.key+'"]');
      if(!button)continue;
      const ready=Boolean(urls[resource.key]);
      if(ready)available++;
      button.disabled=!ready;
      button.setAttribute('aria-disabled',String(!ready));
      button.querySelector('[data-download-state]').textContent=ready?states.download+' ↓':states.pending;
      set(resource.size,ready?(resource.value||states.size):'—');
    }
    const note=document.getElementById('dgPublicationNote');
    note.textContent=available===0?words.availabilityNote:(available<3?states.partial:states.ready);
    set('patchCurrentVersion',urls.patch&&patch.version?'v'+String(patch.version).replace(/^v/i,''):'—');
    set('patchUpdated',urls.patch&&patch.updated?patch.updated:'—');
    set('patchChecksum',hash||states.hashPending);
    const copyButton=document.getElementById('copyChecksumButton');
    copyButton.disabled=!hash;
    copyButton.textContent=states.copy;
    set('dgFeedback','');
  }
  for(const resource of resources) {
    const button=root.querySelector('.patch-download-option[data-resource="'+resource.key+'"]');
    button?.addEventListener('click',() => { if(urls[resource.key])window.location.assign(urls[resource.key]); });
  }
  document.getElementById('copyChecksumButton')?.addEventListener('click',async() => {
    if(!hash)return;
    try {
      await navigator.clipboard.writeText(hash);
      set('dgFeedback',ui[getLanguage()].copied);
    } catch {
      const code=document.getElementById('patchChecksum');
      const selection=window.getSelection();
      if(code&&selection){const range=document.createRange();range.selectNodeContents(code);selection.removeAllRanges();selection.addRange(range);}
      set('dgFeedback',ui[getLanguage()].select);
    }
  });
  render();
  window.addEventListener('fafurion:language',render);
})();
