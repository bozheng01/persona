
  (function () {
    document.documentElement.classList.add('js');
    var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;


    var videoObserver = 'IntersectionObserver' in window ? new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        var v = entry.target;
        v.dataset.visible = entry.isIntersecting ? 'true' : 'false';
        if (entry.isIntersecting && !document.hidden) {
          if (!v.getAttribute('src') && v.dataset.src) { v.src = v.dataset.src; v.load(); }
          if (!reduceMotion) v.play().catch(function() {});
        } else { v.pause(); }
      });
    }, {threshold: 0.01}) : null;
    function observeVideo(v) {
      v.muted = true; v.preload = 'none';
      if (videoObserver) videoObserver.observe(v);
      else { if (v.dataset.src) v.src = v.dataset.src; if (!reduceMotion) v.play().catch(function() {}); }
    }
    document.querySelectorAll('video:not(#gz-room)').forEach(observeVideo);
    document.addEventListener('visibilitychange', function() {
      document.querySelectorAll('video:not(#gz-room)').forEach(function(v) {
        if (document.hidden) v.pause();
        else if (v.dataset.visible === 'true' && !reduceMotion) v.play().catch(function() {});
      });
    });

    /* ---------- Language switcher (EN / 中文 / 日本語) ----------
       The dictionary is keyed on the English copy already in the markup, so the
       HTML needs no data-* attributes and the English text stays readable in the
       source. Product and project names are absent from the dictionary on
       purpose — anything unlisted is left exactly as written. */
    (function () {
      var DICT = {
        zh: {
          'Start building': '开始做',
          /* Gear Zero build panel */
          'Someone is building one right now': '现在就有人在做一个',
          'Live': '进行中',
          '“AI virtual try-on — full-body demo”': '「AI试衣 — 全身搭配演示」',
          '“Casual look”': '「休闲搭配」',
          '“Jacket look”': '「外套搭配」',
          '“A first-person shooter in a city buried in ash”': '「一个发生在被灰烬埋掉的城市里的第一人称射击」',
          '“A kart racer through a neon sunset town”': '「一个穿过霓虹黄昏小镇的卡丁车竞速」',
          '“A top-down extraction shooter in a shipping yard”': '「一个发生在货运场的俯视角撤离射击」',
          '“A survival shooter on a frozen sea”': '「一个在冰封海面上的生存射击」',
          'Analyzing the photo': '解析照片',
          'Generating the outfit': '生成搭配',
          'Fitting the clothes': '试穿服装',
          'Finishing the look': '完成造型',
          'building…': '正在生成…',
          'First version': '第一版',
          'Second version': '第二版',
          'Third version': '第三版',
          'Fourth version': '第四版',
          /* nav */
          'Directions': '方向', 'Product': '产品', 'Blog': '博客', 'About': '关于我们',
          'Research': '研究', 'Products': '产品', 'Solutions': '解决方案', 'About Us': '关于我们',
          'Get in touch': '联系我们', 'Explore directions': '查看方向',
          /* hero */
          'Coevolve human & AI in building worlds.': '让人与 AI 一起共创世界。',
          /* Gear Zero panel */
          'Describe the game you want to make': '描述你想做的游戏',
          'The room opens the moment it’s built': '做好后房间马上打开',
          'Make this game': '做这个游戏',
          'Or pick a plan that’s ready to go': '或者挑一个现成的计划',
          'Shuffle': '换一换',
          'Open a room': '开一个房间',
          'A rabbit hopping across the moon, collecting carrots…': '一只兔子在月球上蹦跳，收集胡萝卜……',
          'A lantern shop where every lamp you light changes the weather…': '一家灯笼铺，点亮哪盏灯，天气就跟着变……',
          'A courier cat delivering parcels across rooftops before sundown…': '一只快递猫要在日落前把包裹送过屋顶……',
          'A tiny submarine tidying up a coral reef, one piece at a time…': '一艘小潜艇在珊瑚礁里一件件收拾干净……',
          'Hive Stacker': '蜂巢叠叠',
          'Drop coloured hexagons onto the hive. Matching ones pull together, and a big enough cluster bursts.': '把彩色六边形放上蜂巢，同色的会自己汇到一处，堆够了就炸开。',
          'Bridge Brush': '画笔修桥队',
          'Rain washed the river bridge away. Paint a new one and walk the ducklings home in single file.': '河上的桥被大雨冲垮了，快用画笔画出新桥，送小鸭子们排队回家。',
          'Merge Duck Theatre': '合成鸭剧场',
          'Pair ducks up on a small plate to make bigger ones, then send your best on stage to earn money for more.': '在小盘子上把鸭子两两合大，再派最厉害的那只上台演出赚钱买鸭。',
          'Vine Snip': '剪藤播种',
          'Cut the vines holding the seeds and let gravity swing them into the plot below.': '剪断吊着种子的藤，让重力把它们荡进下面那块地里。',
          'Bun Run': '包子快跑',
          'A bun escapes the steamer and bolts down breakfast street. See how far you can escort it.': '一只逃出蒸笼的小包子在早餐街上狂奔，看你能护送它跑多远！',
          'Free Kick Wall': '任意球墙',
          'Drag to curl the ball around the wall — and the keeper reads your hand better every round.': '拖一下把球绕过人墙，而守门员一轮比一轮更会看你的手。',
          'Ice Lake Angler': '冰湖小钓手',
          'Chip a hole, set up your stool, and land enough fish before the stove burns out.': '凿开冰面支起小马扎，在炉火将熄前钓够今天的鱼。',
          'Origami Zoo': '折纸动物园',
          'Turn a hinged strip of paper open one panel at a time, until an animal appears.': '把一串带铰链的纸片一片片转开，直到拼出一只动物。',
          'Tangyuan Pot': '汤圆合合乐',
          'Drop rice balls into the pot one at a time. Two of the same size merge when they touch.': '把汤圆一颗颗投进砂锅，一样大的碰在一起就合成更大的。',
          /* directions */
          'What we build': '我们在做什么',
          'Create Games with AI': '用 AI 做游戏',
          'AI agents that design, code, and ship playable games side by side with creators.': 'AI 智能体与创作者并肩设计、编码，把可玩的游戏做出来。',
          'World Model': '世界模型',
          'Building playable worlds on demand, instantly.': '随时随地，即刻生成可玩的世界。',
          'World Compilation and Rendering': '世界编译与渲染',
          'Generative Rendering': '生成式渲染',
          'Compiling worlds into structured states, brought to life through generative rendering.': '将世界编译为结构化状态，再通过生成式渲染赋予其生命。',
          'Game Agent': '游戏智能体',
          'Agents that learn, adapt, and master games alongside human players.': '与人类玩家一起学习、适应，最终精通游戏的智能体。',
          'Digital Human': '数字人',
          'Lifelike AI-driven characters that see, talk, and interact in real time.': '由 AI 驱动的拟真角色，能实时看、说、互动。',
          /* solutions */
          'What we offer': '我们提供什么', 'Live now': '已上线',
          'Chat with your friends, and the game gets made along the way.': '和朋友聊着聊着，游戏就一起做出来了。',
          'Describe a game together. Gear plans it, builds it, and turns each conversation into a playable version in minutes.': '一起说出想做的游戏。Gear 会完成规划与构建，并在几分钟内把每轮对话变成可玩的版本。',
          'Keep talking while Gear works. It remembers the room, gathers every new idea, and builds the next playable version without losing the conversation.': 'Gear 工作时你们可以继续聊。它会记住房间里的内容，收集每个新想法，并在不丢失对话的情况下构建下一个可玩版本。',
          'Your wardrobe, styled by AI.': '让 AI 为你打理衣橱。',
          'Upload a photo and try on outfits in seconds. It reads your body and your style, then generates new looks you can actually wear.': '上传一张照片，数秒即可试穿。AI 读懂你的身形与风格，生成真正能穿的搭配。',
          'Swap the top, the bottoms, or the whole outfit — and see it on you, not on a model.': '上衣、下装或整套造型都能替换，看到的是你自己，而不是模特。',
          'AI try-on': 'AI试衣', 'Instant outfits': '即时搭配', 'Your own photo': '用自己的照片',
          'Try it now': '立即体验',
          'My Wardrobe': '我的衣柜',
          'A few friends, one room, and a game that takes shape while you talk about it. Say what you want in plain language — the AI plans it, writes the code, builds it and runs it, a few minutes start to finish. Whatever the room makes is playable right there, with nothing to install.': '几个朋友，一个房间，游戏在聊天里慢慢成形。想要什么就用大白话说出来——AI 负责规划、写代码、构建、运行，前后也就几分钟。房间里做出来的东西当场就能玩，不用安装。',
          'One game, everyone talking': '一个游戏，大家一起聊',
          'Everyone sits in the same room, talks to the same AI, and edits the same game — then plays it the moment it builds.': '一群人待在同一个房间，跟同一个 AI 聊天，改的是同一款游戏，改完当场就能玩。',
          'Fork any idea': '想法再怪也能试',
          'Copy the game as it stands into your own room. It restarts at version 1 and grows in its own direction, without overwriting anyone.': '把游戏现在的样子复制到自己房间。新游戏从第 1 版开始，之后独立长下去，不会覆盖别人。',
          'Nothing said gets lost': '说过的话都不会丢',
          'Keep talking while it works. Gear gathers everything new into a build brief, and the host approves what goes into the next round.': 'AI 干活的那几分钟，你们尽管接着聊。Gear 会把新说的话归拢成一份制作简报，交给房主确认下一轮做什么。',
          'What if you could rewrite any story — and watch the world react?': '如果你能改写任何故事，并亲眼看着整个世界作出反应，会发生什么？',
          'Save the Titanic. Stop Darth Vader from turning evil. Let Thanos lose.': '拯救泰坦尼克号。阻止达斯·维达走向邪恶。让灭霸输掉。',
          'Then watch what happens next.': '然后，看看接下来会发生什么。',
          'In Synthetic World, AI residents actually live in these alternate timelines. They post, argue, form relationships, remember what happened, and make their own decisions.': '在 Synthetic World 中，AI 居民真实地生活在这些平行时间线里。他们发布动态、争论、建立关系、记住所发生的一切，并作出自己的决定。',
          'You don’t just rewrite the story. You rewrite the world.': '你改写的不只是故事，而是整个世界。',
          'Enter Synthetic World': '进入 Synthetic World',
          'Custom Model Development': '定制模型开发',
          'Models built for your request.': '按你的需求打造模型。',
          'Data Engine': '数据引擎',
          'Production-grade datasets, all with fine-grained annotations.': '生产级数据集，全部带精细标注。',
          'Rendering data': '渲染数据', 'World model data': '世界模型数据',
          'Game data': '游戏数据', 'Digital human data': '数字人数据',
          'Game Creation Platform': '游戏创作平台',
          'An agent platform where teams direct AI to build, iterate, and ship games end to end.': '一个智能体平台，团队指挥 AI 从头到尾构建、迭代并发布游戏。',
          'AI-Native Games': 'AI 原生游戏',
          'Original titles designed around AI from day one, with worlds and characters that only AI makes possible.': '从第一天就围绕 AI 设计的原创作品，世界与角色只有 AI 才能实现。',
          /* blog */
          'What we think': '我们的思考',
          'AI-Native Game Engineering Infrastructure': 'AI 原生游戏工程基础设施',
          'Coming soon': '即将上线',
          /* about */
          'Gamers, creators, and AI experts': '玩家、创作者与 AI 研究者',
          'Founded in 2026, we are a group of game enthusiasts, AI researchers, and creators from different fields, united by one belief: AI will redefine the future of games.': '我们成立于 2026 年，是一群来自不同领域的游戏爱好者、AI 研究者和创作者，共同相信：AI 将重新定义游戏的未来。',
          'Selected past research projects we led': '我们主导过的部分研究项目',
          'Selected past research projects we participated in': '我们参与过的部分研究项目',
          /* contact + footer */
          'Partnerships, research collaborations, and open roles.': '合作洽谈、研究联合，以及开放职位。',
          'Bringing personal AI and physical AI into society.': '以个人AI与物理AI，推动AI技术的社会化落地。',
          '2026 Persona.ai. All rights reserved.': '2026 Persona.ai. 保留所有权利。',
          /* about: company profile */
          'Persona.ai Co., Ltd.': '株式会社Persona.ai',
          'Persona.ai is a company that aims to bring AI technology to society across fields such as apparel, games, robots, and real estate, building on R&D in personal AI and physical AI.': '株式会社Persona.ai 是一家以个人AI与物理AI的研究开发为基础，致力于在服装、游戏、机器人、房地产等各领域实现AI技术社会化的公司。',
          'Through planning, development, operation support and consulting of AI-powered products and services, we support companies in creating new businesses and driving business transformation.': '我们通过运用AI技术的产品与服务之企划、开发、运营支持及咨询，助力企业创造新业务并推动业务变革。',
          'Company Profile': '公司信息',
          'Company Name': '公司名称',
          'Established': '成立时间',
          'Representative Director': '代表董事',
          'Location': '所在地',
          'Capital': '资本金',
          'Business Activities': '业务内容',
          'R&D of technologies related to personal AI and physical AI.': '关于个人AI与物理AI技术的研究与开发',
          'Planning, development, operation support and consulting of AI-powered products and services in apparel, games, robots, real estate and other fields.': '在服装、游戏、机器人、房地产及其他各领域，运用AI的产品与服务之企划、开发、运营支持及咨询',
          'Contract development of AI technologies, software and computer systems.': 'AI技术、软件及计算机系统的受托开发',
          'Consulting on AI adoption, business improvement and digital transformation for enterprises.': '面向企业的AI导入支持、业务改善及数字化转型咨询',
          'AI research and development, proof-of-concept (PoC) and new business development support.': 'AI相关的研究开发、实证实验（PoC）及新事业开发支持',
          'Mission': '使命',
          "We use AI technology to bring out each person's individuality.": '运用AI技术，将每个人的个性具象化。',
          'Through intelligence born from interaction between people and their environment, we evolve machines into beings that are smarter and more attuned to humans.': '通过人与环境互动中产生的智能，让机器进化为更聪明、更贴近人类的伙伴。'
        },
        ja: {
          'Start building': '作りはじめる',
          /* Gear Zero build panel */
          'Someone is building one right now': 'いまも誰かが作っています',
          'Live': '進行中',
          '“AI virtual try-on — full-body demo”': '「AI試着 — 全身コーデのデモ」',
          '“Casual look”': '「カジュアルコーデ」',
          '“Jacket look”': '「ジャケットコーデ」',
          '“A first-person shooter in a city buried in ash”': '「灰に埋もれた街を舞台にしたFPS」',
          '“A kart racer through a neon sunset town”': '「ネオンの夕暮れの町を走るカートレース」',
          '“A top-down extraction shooter in a shipping yard”': '「貨物ヤードを舞台にした見下ろし型の脱出シューター」',
          '“A survival shooter on a frozen sea”': '「凍った海でのサバイバルシューター」',
          'Analyzing the photo': '写真を解析する',
          'Generating the outfit': 'コーデを生成する',
          'Fitting the clothes': '服を試着させる',
          'Finishing the look': '仕上げる',
          'building…': '作成中…',
          'First version': '最初のバージョン',
          'Second version': '2 番目のバージョン',
          'Third version': '3 番目のバージョン',
          'Fourth version': '4 番目のバージョン',
          'Directions': '方向', 'Product': 'プロダクト', 'Blog': 'ブログ', 'About': '私たちについて',
          'Research': 'リサーチ', 'Products': 'プロダクト', 'Solutions': 'ソリューション', 'About Us': '私たちについて',
          'Get in touch': 'お問い合わせ', 'Explore directions': '方向を見る',
          'Coevolve human & AI in building worlds.': '人と AI が共に世界をつくる。',
          'Describe the game you want to make': 'つくりたいゲームを書いてみて',
          'The room opens the moment it’s built': 'できたらすぐ部屋が開く',
          'Make this game': 'このゲームをつくる',
          'Or pick a plan that’s ready to go': 'できあいの企画から選ぶ',
          'Shuffle': 'シャッフル',
          'Open a room': '部屋をひらく',
          'A rabbit hopping across the moon, collecting carrots…': '月の上を跳ねるウサギがニンジンを集める……',
          'A lantern shop where every lamp you light changes the weather…': '灯籠屋。灯をともすたびに天気が変わる……',
          'A courier cat delivering parcels across rooftops before sundown…': '日暮れまでに屋根を渡って荷物を届けるネコ……',
          'A tiny submarine tidying up a coral reef, one piece at a time…': '小さな潜水艦がサンゴ礁を少しずつ片づける……',
          'Hive Stacker': 'ハニカム積み',
          'Drop coloured hexagons onto the hive. Matching ones pull together, and a big enough cluster bursts.': '色つき六角形を巣に落とす。同じ色は寄り集まり、たまるとはじける。',
          'Bridge Brush': 'お絵かき橋づくり',
          'Rain washed the river bridge away. Paint a new one and walk the ducklings home in single file.': '大雨で川の橋が流された。新しい橋を描いて、カモの子たちを一列で帰そう。',
          'Merge Duck Theatre': '合体アヒル劇場',
          'Pair ducks up on a small plate to make bigger ones, then send your best on stage to earn money for more.': '小皿の上でアヒルを二羽ずつ合体させ、一番強い子を舞台に送って稼ぐ。',
          'Vine Snip': 'つる切り種まき',
          'Cut the vines holding the seeds and let gravity swing them into the plot below.': '種を吊るつるを切り、重力で下の畑へ振り落とす。',
          'Bun Run': '肉まんダッシュ',
          'A bun escapes the steamer and bolts down breakfast street. See how far you can escort it.': 'せいろから逃げた肉まんが朝食通りを駆け抜ける。どこまで守れる？',
          'Free Kick Wall': 'フリーキックの壁',
          'Drag to curl the ball around the wall — and the keeper reads your hand better every round.': 'ドラッグで壁を回り込む球を蹴る。GK は回を追うごとに手を読んでくる。',
          'Ice Lake Angler': '氷上の釣り人',
          'Chip a hole, set up your stool, and land enough fish before the stove burns out.': '氷を割って腰かけを据え、炉の火が消える前に今日の分を釣る。',
          'Origami Zoo': '折り紙動物園',
          'Turn a hinged strip of paper open one panel at a time, until an animal appears.': '蝶番でつながった紙を一枚ずつ開き、動物の形になるまで。',
          'Tangyuan Pot': '白玉なべ',
          'Drop rice balls into the pot one at a time. Two of the same size merge when they touch.': '白玉を一つずつ鍋へ。同じ大きさが触れると合体して大きくなる。',
          'What we build': '私たちがつくるもの',
          'Create Games with AI': 'AI でゲームをつくる',
          'AI agents that design, code, and ship playable games side by side with creators.': 'AI エージェントが制作者と並んで設計・実装し、遊べるゲームを届けます。',
          'World Model': 'ワールドモデル',
          'Building playable worlds on demand, instantly.': '遊べる世界を、必要なときにすぐ生成。',
          'World Compilation and Rendering': 'ワールドコンパイルとレンダリング',
          'Generative Rendering': '生成レンダリング',
          'Compiling worlds into structured states, brought to life through generative rendering.': '世界を構造化された状態へコンパイルし、生成レンダリングで命を吹き込みます。',
          'Game Agent': 'ゲームエージェント',
          'Agents that learn, adapt, and master games alongside human players.': '人のプレイヤーと共に学び、適応し、ゲームを極めるエージェント。',
          'Digital Human': 'デジタルヒューマン',
          'Lifelike AI-driven characters that see, talk, and interact in real time.': '見て、話して、リアルタイムに応じる AI 駆動のリアルなキャラクター。',
          'What we offer': '提供するもの', 'Live now': '公開中',
          'Chat with your friends, and the game gets made along the way.': '友だちと話しているうちに、ゲームができていく。',
          'Describe a game together. Gear plans it, builds it, and turns each conversation into a playable version in minutes.': '一緒に作りたいゲームを話すだけ。Gear が設計・ビルドし、会話を数分で遊べるバージョンにします。',
          'Keep talking while Gear works. It remembers the room, gathers every new idea, and builds the next playable version without losing the conversation.': 'Gear が作業している間も会話を続けられます。部屋の内容と新しいアイデアを覚え、会話を失わず次の遊べるバージョンをつくります。',
          'Your wardrobe, styled by AI.': 'AIが、あなたのワードローブをコーディネート。',
          'Upload a photo and try on outfits in seconds. It reads your body and your style, then generates new looks you can actually wear.': '写真をアップロードするだけで、数秒で試着。体型と雰囲気を読み取り、実際に着られるコーデを生成します。',
          'Swap the top, the bottoms, or the whole outfit — and see it on you, not on a model.': 'トップス、ボトムス、全身まるごと。モデルではなく、あなた自身で確認できます。',
          'AI try-on': 'AI試着', 'Instant outfits': '即時コーデ', 'Your own photo': '自分の写真で',
          'Try it now': '試してみる',
          'My Wardrobe': 'マイワードローブ',
          'A few friends, one room, and a game that takes shape while you talk about it. Say what you want in plain language — the AI plans it, writes the code, builds it and runs it, a few minutes start to finish. Whatever the room makes is playable right there, with nothing to install.': '友だち数人と一つの部屋。話しているうちにゲームが形になります。ふつうの言葉で言えば、AI が計画し、コードを書き、ビルドして動かす。ぜんぶで数分。部屋でできたものはその場で遊べて、インストールは不要です。',
          'One game, everyone talking': 'ひとつのゲームを、みんなで話す',
          'Everyone sits in the same room, talks to the same AI, and edits the same game — then plays it the moment it builds.': 'みんなが同じ部屋で同じ AI と話し、同じゲームを直す。できあがったらその場で遊べます。',
          'Fork any idea': 'どんな思いつきも試せる',
          'Copy the game as it stands into your own room. It restarts at version 1 and grows in its own direction, without overwriting anyone.': '今のゲームを自分の部屋に複製。第 1 版から始まり、他を上書きせず独自に育ちます。',
          'Nothing said gets lost': '話したことは消えない',
          'Keep talking while it works. Gear gathers everything new into a build brief, and the host approves what goes into the next round.': 'AI が動いている数分も話し続けてOK。Gear が新しい話を制作メモにまとめ、部屋主が次に何をつくるか承認します。',
          'What if you could rewrite any story — and watch the world react?': 'もし、どんな物語でも書き換え、その世界の反応を見届けられたら？',
          'Save the Titanic. Stop Darth Vader from turning evil. Let Thanos lose.': 'タイタニックを救う。ダース・ベイダーの闇落ちを止める。サノスを敗北させる。',
          'Then watch what happens next.': 'そして、その先に何が起きるかを見届ける。',
          'In Synthetic World, AI residents actually live in these alternate timelines. They post, argue, form relationships, remember what happened, and make their own decisions.': 'Synthetic World では、AI の住民たちが別の時間軸を実際に生きています。投稿し、議論し、関係を築き、出来事を記憶し、自分で決断します。',
          'You don’t just rewrite the story. You rewrite the world.': '書き換えるのは物語だけではありません。世界そのものです。',
          'Enter Synthetic World': 'Synthetic World に入る',
          'Custom Model Development': 'モデルのカスタム開発',
          'Models built for your request.': 'ご要望に合わせてモデルをつくります。',
          'Data Engine': 'データエンジン',
          'Production-grade datasets, all with fine-grained annotations.': '細かなアノテーション付きの、実運用グレードのデータセット。',
          'Rendering data': 'レンダリングデータ', 'World model data': 'ワールドモデルデータ',
          'Game data': 'ゲームデータ', 'Digital human data': 'デジタルヒューマンデータ',
          'Game Creation Platform': 'ゲーム制作プラットフォーム',
          'An agent platform where teams direct AI to build, iterate, and ship games end to end.': 'チームが AI に指示し、ゲームを一貫して構築・改善・公開できるエージェント基盤。',
          'AI-Native Games': 'AI ネイティブゲーム',
          'Original titles designed around AI from day one, with worlds and characters that only AI makes possible.': '初日から AI を軸に設計したオリジナル作品。AI だからこそ成り立つ世界とキャラクター。',
          'What we think': '私たちの考え',
          'AI-Native Game Engineering Infrastructure': 'AI ネイティブなゲーム開発基盤',
          'Coming soon': '近日公開',
          'Gamers, creators, and AI experts': 'ゲーマー、クリエイター、AI の専門家',
          'Founded in 2026, we are a group of game enthusiasts, AI researchers, and creators from different fields, united by one belief: AI will redefine the future of games.': '2026 年発足。さまざまな分野のゲーム好き、AI 研究者、クリエイターが集まり、AI がゲームの未来を変えると信じています。',
          'Selected past research projects we led': '私たちが主導した研究プロジェクト（一部）',
          'Selected past research projects we participated in': '私たちが参加した研究プロジェクト（一部）',
          'Partnerships, research collaborations, and open roles.': '協業、共同研究、採用について。',
          'Bringing personal AI and physical AI into society.': 'パーソナルAIとフィジカルAIで、AI技術の社会実装を進める。',
          '2026 Persona.ai. All rights reserved.': '2026 Persona.ai. All rights reserved.'
        }
      };

      /* Strings that carry inline markup, so they're swapped as HTML */
      var RICH = {
        '.hero h1': {
          en: 'Persona.AI<br>I get what makes you.',
          zh: 'Persona.AI<br>我懂你的与众不同',
          ja: 'Persona.AI<br>あなたらしさを、わかってる。'
        },
        '.contact h2': {
          en: 'Build the future<br>with AI.',
          zh: '与AI一起<br>构建未来。',
          ja: 'AIと共に、<br>未来をつくる。'
        },
        '.about .more-note': {
          en: 'For more of our earlier research, visit the homepages of our core members\n        <a href="https://kpzhang93.github.io/" target="_blank" rel="noopener">Kaipeng Zhang</a> and\n        <a href="https://lightchaserx.github.io/" target="_blank" rel="noopener">Zhixiang Wang</a>.',
          zh: '更多早期研究，请访问核心成员 <a href="https://kpzhang93.github.io/" target="_blank" rel="noopener">Kaipeng Zhang</a> 与 <a href="https://lightchaserx.github.io/" target="_blank" rel="noopener">Zhixiang Wang</a> 的个人主页。',
          ja: '初期の研究については、コアメンバー <a href="https://kpzhang93.github.io/" target="_blank" rel="noopener">Kaipeng Zhang</a> と <a href="https://lightchaserx.github.io/" target="_blank" rel="noopener">Zhixiang Wang</a> のホームページをご覧ください。'
        }
      };

      var current = 'en';

      /* An element's own text nodes, ignoring any nested icon elements */
      function textNodesOf(el) {
        return [].filter.call(el.childNodes, function (n) {
          return n.nodeType === 3 && n.nodeValue.trim();
        });
      }

      var RICH_SEL = Object.keys(RICH);

      function translateTree(root, lang) {
        var table = DICT[lang] || null;
        var all = root.querySelectorAll('h1,h2,h3,h4,p,a,span,em,b,li,button,.footer-bottom');
        [].forEach.call(all, function (el) {
          if (el.closest('.lang') || el.classList.contains('brand-name')) return;
          /* Rich elements own their markup — collapsing their text nodes here
             would splice the <span>/<br>/<a> children out of the sentence. */
          for (var r = 0; r < RICH_SEL.length; r++) if (el.matches(RICH_SEL[r])) return;
          var tn = textNodesOf(el);
          if (!tn.length) return;
          if (!el.dataset.en) {
            var joined = tn.map(function (n) { return n.nodeValue; }).join('').replace(/\s+/g, ' ').trim();
            if (!joined) return;
            el.dataset.en = joined;
          }
          var src = el.dataset.en;
          var out = lang === 'en' ? src : (table && table[src]);
          if (!out) { if (lang === 'en') out = src; else return; }
          tn[0].nodeValue = out;
          for (var i = 1; i < tn.length; i++) tn[i].nodeValue = '';
        });
      }

      /* Keeps the hero headline on a single line in any language: shrink until it
         fits the width actually available to it. */
      function fitHeadline() {
        var h1 = document.querySelector('.hero h1');
        if (!h1) return;
        h1.style.fontSize = '';
        /* Headlines that are allowed to wrap size themselves from CSS, so the
           single-line shrink only runs while white-space is nowrap. */
        if (getComputedStyle(h1).whiteSpace !== 'nowrap') return;
        var avail = h1.clientWidth;
        if (!avail) return;
        var probe = document.createElement('span');
        var cs = getComputedStyle(h1);
        probe.style.cssText = 'position:absolute;visibility:hidden;white-space:nowrap;font-weight:' +
          cs.fontWeight + ';font-family:' + cs.fontFamily + ';letter-spacing:' + cs.letterSpacing + ';font-size:100px';
        probe.textContent = h1.textContent.replace(/\s+/g, ' ').trim();
        document.body.appendChild(probe);
        var ratio = probe.getBoundingClientRect().width / 100;
        probe.remove();
        if (!ratio) return;
        var base = parseFloat(cs.fontSize);
        var max = (avail - 2) / ratio;
        if (base > max) h1.style.fontSize = Math.floor(max) + 'px';
      }

      function setLang(lang, persist) {
        current = lang;
        document.documentElement.lang = lang;
        translateTree(document.body, lang);
        Object.keys(RICH).forEach(function (sel) {
          var el = document.querySelector(sel);
          if (el && RICH[sel][lang]) el.innerHTML = RICH[sel][lang];
        });
        [].forEach.call(document.querySelectorAll('.lang-btn'), function (b) {
          var on = b.dataset.lang === lang;
          b.classList.toggle('is-on', on);
          b.setAttribute('aria-pressed', on ? 'true' : 'false');
        });
        fitHeadline();
        if (persist) { try { localStorage.setItem('persona-lang', lang); } catch (e) {} }
      }

      /* Re-applied after the Gear Zero panel re-renders its cards */
      window.__applyLang = function () { translateTree(document.body, current); fitHeadline(); };

      [].forEach.call(document.querySelectorAll('.lang-btn'), function (b) {
        b.addEventListener('click', function () { setLang(b.dataset.lang, true); });
      });

      var saved = null;
      try { saved = localStorage.getItem('persona-lang'); } catch (e) {}
      if (!saved) {
        /* Default to Japanese; the switcher (persisted) is the only override. */
        saved = 'ja';
      }
      setLang(saved, false);
      window.addEventListener('resize', fitHeadline);
      if (document.fonts && document.fonts.ready) document.fonts.ready.then(fitHeadline);
    })();

    /* ---------- World Model card: PersonaWorld scrolling video wall ---------- */
    (function () {
      var wall = document.getElementById('wm-video-wall');
      if (!wall) return;
      var BASE = '/assets/';
      var cols = [
        ['vw-1.svg', 'vw-2.svg', 'vw-3.svg'],
        ['vw-4.svg', 'vw-5.svg', 'vw-6.svg']
      ];
      var durs = ['26s', '32s'];

      cols.forEach(function (clips, i) {
        var col = document.createElement('div');
        col.className = 'cvw-col';
        var track = document.createElement('div');
        track.className = 'cvw-track' + (i === 1 ? ' reverse' : '');
        track.style.setProperty('--dur', durs[i]);
        clips.concat(clips).forEach(function (p) {
          var v = document.createElement('video');
          v.poster = BASE + p;
          v.muted = true;
          v.loop = true;
          v.playsInline = true;
          v.setAttribute('playsinline', '');
          v.preload = 'none';
          observeVideo(v);
          track.appendChild(v);
        });
        col.appendChild(track);
        wall.appendChild(col);
      });

    })();

    /* ---------- Gear Zero build panel: cycle the rooms ----------
       Four briefs, four rooms, mirroring zero.personalab.ai. Each pass is 7s: the
       CSS below drives the checklist, bar, scrim and version stops, and this
       restarts all of them together by re-applying .is-building, so the copy and
       the footage never drift out of step with the animation. */
    (function () {
      var win = document.getElementById('gz-window');
      var said = document.getElementById('gz-said');
      var room = document.getElementById('gz-room');
      if (!win || !said || !room) return;

      var stills = [document.getElementById('gz-still-1'), document.getElementById('gz-still-2')];
      var rooms = [
        '“AI virtual try-on — full-body demo”',
        '“Casual look”',
        '“Jacket look”'
      ];
      var at = 0;
      var timer = null;

      function show(i) {
        var idx = i % rooms.length;
        /* Drop the cached English first, or the translator would put the
           previous brief back from the stale key. */
        delete said.dataset.en;
        said.textContent = rooms[idx];
        /* 0 = try-on media, 1 & 2 = the dress-up stills. #gz-room is a still
           placeholder while the demo video is remade; the VIDEO guard keeps the
           play/pause logic working if a real video is swapped back in. */
        var isPrimary = idx === 0;
        room.classList.toggle('is-on', isPrimary);
        stills[0].classList.toggle('is-on', idx === 1);
        stills[1].classList.toggle('is-on', idx === 2);
        if (room.tagName === 'VIDEO') {
          if (isPrimary) {
            room.currentTime = 0;
            if (!reduceMotion) room.play().catch(function () {});
          } else {
            room.pause();
          }
        }
        if (window.__applyLang) window.__applyLang();
      }

      function pass() {
        show(at);
        at = (at + 1) % rooms.length;
        /* Reflow between removing and adding so every animation restarts */
        win.classList.remove('is-building');
        void win.offsetWidth;
        win.classList.add('is-building');
      }

      /* Reduced motion: one room, no cycling, no animation — the panel still
         reads as a finished build because the resting state is the end state. */
      if (reduceMotion) { show(0); return; }

      function start() { if (!timer) { pass(); timer = setInterval(pass, 7000); } }
      function stop() { if (timer) { clearInterval(timer); timer = null; } if (room.tagName === 'VIDEO') room.pause(); }

      /* Start straight away rather than waiting to be observed: the panel sits in
         the hero, and an observer that never delivers a first entry would leave it
         frozen on a paused video. The observer only parks it once it scrolls off. */
      var panelVisible = true;
      document.addEventListener('visibilitychange', function () { if (document.hidden) stop(); else if (panelVisible) start(); });
      if ('IntersectionObserver' in window) {
        new IntersectionObserver(function (entries) {
          panelVisible = entries[0].isIntersecting;
          if (panelVisible && !document.hidden) { start(); } else { stop(); }
        }, { threshold: 0.05 }).observe(win);
      } else { start(); }
    })();

    /* ---------- 我的衣柜 demo panel: drag it around by the top bar ---------- */
    (function () {
      var win = document.getElementById('gz-window');
      if (!win) return;
      var handle = win.querySelector('.gz-bar');
      if (!handle) return;
      var hero = win.closest('.hero');
      var dx = 0, dy = 0, sx = 0, sy = 0, dragging = false;

      handle.style.cursor = 'grab';
      handle.style.touchAction = 'none';

      function clamp() {
        var maxX = (hero ? hero.clientWidth : window.innerWidth) * 0.3;
        var maxY = (hero ? hero.clientHeight : window.innerHeight) * 0.16;
        dx = Math.max(-maxX, Math.min(maxX, dx));
        dy = Math.max(-maxY, Math.min(maxY, dy));
      }
      function apply() { win.style.transform = 'translate(' + dx + 'px,' + dy + 'px)'; }

      function down(e) {
        dragging = true;
        sx = e.clientX - dx;
        sy = e.clientY - dy;
        handle.style.cursor = 'grabbing';
        if (handle.setPointerCapture) handle.setPointerCapture(e.pointerId);
        e.preventDefault();
      }
      function move(e) {
        if (!dragging) return;
        dx = e.clientX - sx;
        dy = e.clientY - sy;
        clamp();
        apply();
      }
      function up(e) {
        if (!dragging) return;
        dragging = false;
        handle.style.cursor = 'grab';
        if (handle.releasePointerCapture) handle.releasePointerCapture(e.pointerId);
      }

      handle.addEventListener('pointerdown', down);
      handle.addEventListener('pointermove', move);
      handle.addEventListener('pointerup', up);
      handle.addEventListener('pointercancel', up);
    })();

    /* ---------- Project name ticker ---------- */
    (function () {
      var names = [
        'My Closet', 'Interactive Intelligence', 'Robot Motions', 'Persona World', 'Persona Agent'
      ];
      var track = document.getElementById('marquee-track');
      /* Repeat the list so one half is wider than any viewport; the track holds
         two identical halves and the CSS animation translates -50%, so the loop
         stays seamless without gaps on wide screens. */
      var half = names.concat(names, names);
      half.concat(half).forEach(function (name) {
        var s = document.createElement('span');
        s.textContent = name;
        track.appendChild(s);
      });
    })();

    /* ---------- Scroll reveals ---------- */
    (function () {
      var els = document.querySelectorAll('.reveal');
      if (reduceMotion || !('IntersectionObserver' in window)) {
        els.forEach(function (el) { el.classList.add('in'); });
        return;
      }
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) {
            e.target.classList.add('in');
            io.unobserve(e.target);
          }
        });
      }, { threshold: 0.25 });
      els.forEach(function (el) { io.observe(el); });
    })();

    /* ---------- GitHub stars: fetch org total, roll the digits ---------- */
    (function () {
      var el = document.getElementById('gh-count');
      if (!el || !window.fetch) return;

      function renderOdometer(target) {
        // Drop whatever is in the pill (pre-rendered markup or an earlier render)
        // so repeat calls replace the count instead of appending a second one
        el.textContent = '';
        var text = target.toLocaleString('en-US');
        var frag = document.createDocumentFragment();
        var strips = [];
        for (var i = 0; i < text.length; i++) {
          var ch = text[i];
          if (ch >= '0' && ch <= '9') {
            var odo = document.createElement('span');
            odo.className = 'odo';
            var strip = document.createElement('span');
            strip.className = 'odo-strip';
            strip.style.setProperty('--odo-delay', (i * 0.07) + 's');
            for (var d = 0; d <= 9; d++) {
              var digit = document.createElement('span');
              digit.textContent = String(d);
              strip.appendChild(digit);
            }
            odo.appendChild(strip);
            frag.appendChild(odo);
            strips.push({ strip: strip, digit: +ch });
          } else {
            var sep = document.createElement('span');
            sep.textContent = ch;
            frag.appendChild(sep);
          }
        }
        el.appendChild(frag);
        // Two frames so the 0-position paints first, then each column rolls to its digit
        requestAnimationFrame(function () {
          requestAnimationFrame(function () {
            strips.forEach(function (s) {
              s.strip.style.transform = 'translateY(-' + (s.digit * 1.25) + 'em)';
            });
          });
        });
      }

      var CACHE_KEY = 'persona-gh-stars';
      var CACHE_TTL = 6 * 60 * 60 * 1000; // 6h

      var cached = null;
      try { cached = JSON.parse(localStorage.getItem(CACHE_KEY)); } catch (e) {}
      if (cached && typeof cached.total === 'number') {
        renderOdometer(cached.total);
      }
      var cacheFresh = cached && (Date.now() - cached.at) < CACHE_TTL;

      if (!cacheFresh) {
        fetch('https://api.github.com/orgs/PersonaLab/repos?per_page=100')
          .then(function (r) { if (!r.ok) throw new Error('rate limited'); return r.json(); })
          .then(function (repos) {
            var total = repos.reduce(function (sum, repo) {
              return sum + (repo.stargazers_count || 0);
            }, 0);
            try { localStorage.setItem(CACHE_KEY, JSON.stringify({ total: total, at: Date.now() })); } catch (e) {}
            if (!cached || cached.total !== total) {
              renderOdometer(total);
            }
          })
          .catch(function () { /* API unavailable: cached value or icon-only pill */ });
      }
    })();

  })();
  