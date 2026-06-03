// =======================
// 求生者
// =======================
//新增角色
//{ name:"新角色", disabled:false }
const survivorRoles = [

    { name:"醫生", disabled:false },
    { name:"律師", disabled:false },
    { name:"慈善家", disabled:false },
    { name:"園丁", disabled:false },
    { name:"魔術師", disabled:false },
    { name:"冒險家", disabled:false },
    { name:"傭兵", disabled:false },
    { name:"空軍", disabled:false },
    { name:"祭司", disabled:false },
    { name:"機械師", disabled:false },
    { name:"前鋒", disabled:false },
    { name:"盲女", disabled:false },
    { name:"調香師", disabled:false },
    { name:"牛仔", disabled:false },
    { name:"舞女", disabled:false },
    { name:"先知", disabled:false },
    { name:"入殮師", disabled:false },
    { name:"勘探員", disabled:false },
    { name:"咒術師", disabled:false },
    { name:"野人", disabled:false },
    { name:"雜技演員", disabled:false },
    { name:"大副", disabled:false },
    { name:"調酒師", disabled:false },
    { name:"郵差", disabled:false },
    { name:"守墓人", disabled:false },
    { name:"囚徒", disabled:false },
    { name:"昆蟲學者", disabled:false },
    { name:"畫家", disabled:false },
    { name:"擊球手", disabled:false },
    { name:"玩具商", disabled:false },
    { name:"病患", disabled:false },
    { name:"心理學家", disabled:false },
    { name:"小說家", disabled:false },
    { name:"小女孩", disabled:false },
    { name:"哭泣小丑", disabled:false },
    { name:"教授", disabled:false },
    { name:"骨董商", disabled:false },
    { name:"作曲家", disabled:false },
    { name:"記者", disabled:false },
    { name:"飛行家", disabled:false },
    { name:"啦啦隊員", disabled:false },
    { name:"木偶師", disabled:false },
    { name:"火災調查員", disabled:false },
    { name:"法羅女士", disabled:false },
    { name:"騎士", disabled:false },
    { name:"氣象學家", disabled:false },
    { name:"弓箭手", disabled:false },
    { name:"逃脫大師", disabled:false },
    { name:"幻燈師", disabled:false },
    { name:"鬥牛士", disabled:false },
    { name:"默劇藝人", disabled:false },
    { name:"幸運兒", disabled:false }

];

// =======================
// 監管者
// =======================

const hunterRoles = [

    { name:"廠長", disabled:false },
    { name:"小丑", disabled:false },
    { name:"鹿頭", disabled:false },
    { name:"傑克", disabled:false },
    { name:"蜘蛛", disabled:false },
    { name:"紅蝶", disabled:false },
    { name:"宿傘之魂", disabled:false },
    { name:"攝影師", disabled:false },
    { name:"瘋眼", disabled:false },
    { name:"黃衣之主", disabled:false },
    { name:"夢之女巫", disabled:false },
    { name:"愛哭鬼", disabled:false },
    { name:"孽蜥", disabled:false },
    { name:"紅夫人", disabled:false },
    { name:"26號守衛", disabled:false },
    { name:"使徒", disabled:false },
    { name:"小提琴家", disabled:false },
    { name:"雕刻家", disabled:false },
    { name:"博士", disabled:false },
    { name:"破輪", disabled:false },
    { name:"漁女", disabled:false },
    { name:"蠟像師", disabled:false },
    { name:"噩夢", disabled:false },
    { name:"紀錄員", disabled:false },
    { name:"隱士", disabled:false },
    { name:"守夜人", disabled:false },
    { name:"歌劇演員", disabled:false },
    { name:"愚人金", disabled:false },
    { name:"時空之影", disabled:false },
    { name:"跛腳羊", disabled:false },
    { name:"喧囂", disabled:false },
    { name:"雜貨商", disabled:false },
    { name:"檯球手", disabled:false },
    { name:"女王蜂", disabled:false },
    { name:"牙醫", disabled:false },
];

/// =======================
// 地圖資料
// =======================
/*
地圖格式說明

name：
地圖名稱

disabled：
是否禁用
false = 可抽取
true = 禁用

rows：
地圖列數（直的）

cols：
地圖欄數（橫的）

fixedBlocks：
固定障礙物位置

格式：
[row, col]

注意：
從 0 開始算

例子：

[1,3]

代表：
第 2 列、第 4 欄

範例地圖：

3 x 4

[0][0] [0][1] [0][2] [0][3]
[1][0] [1][1] [1][2] [1][3]
[2][0] [2][1] [2][2] [2][3]

如果：

fixedBlocks:[
    [1,3],
    [2,3]
]

代表：

空 空 空 空
空 空 空 X
空 空 空 X

新增地圖方法：

{
    name:"新地圖",
    disabled:false,

    rows:3,
    cols:4,

    fixedBlocks:[]
}

有障礙：

{
    name:"特殊地圖",
    disabled:false,

    rows:5,
    cols:5,

    fixedBlocks:[
        [0,0],
        [4,4]
    ]
}
*/

const maps = [

    // ===================
    // 3x3 地圖
    // ===================

    {
        name:"軍工廠",
        disabled:false,

        rows:3,
        cols:3,

        fixedBlocks:[]
    },

    {
        name:"聖心醫院",
        disabled:false,

        rows:3,
        cols:3,

        fixedBlocks:[]
    },

    {
        name:"紅教堂",
        disabled:false,

        rows:3,
        cols:3,

        fixedBlocks:[]
    },

    {
        name:"唐人街",
        disabled:false,

        rows:3,
        cols:3,

        fixedBlocks:[]
    },

    {
        name:"里奧的回憶",
        disabled:false,

        rows:3,
        cols:3,

        fixedBlocks:[]
    },
     {
        name:"不歸林",
        disabled:false,

        rows:3,
        cols:3,

        fixedBlocks:[]
    },

    // ===================
    // 3x4 地圖
    // ===================

    {
        name:"月亮河公園",
        disabled:false,

        rows:3,
        cols:4,

        fixedBlocks:[]
    },

    {
        name:"湖景村",
        disabled:false,

        rows:3,
        cols:4,

        fixedBlocks:[]
    },

   

    // ===================
    // 特殊地圖
    // ===================

    {
        name:"永眠鎮",
        disabled:false,

        rows:3,
        cols:4,

        // 固定 X 位置
        fixedBlocks:[

            [1,3], // 第2列第4欄
            [2,3]  // 第3列第4欄

        ]
    }

];

// =======================
// 輔助特質
// =======================

const assists = [
    "聆聽",
    "失常",
    "巡視者",
    "傳送",
    "興奮",
    "窺視者",
    "閃現",
    "移形"
];

// =======================
// 求生天賦
// =======================

const survivorTalents = [

    "7.機械專精",
    "6.化險為夷",
    "5.避難所",
    "5.醫者",

    "10.醞釀效應",
    "9.膝跳反射",
    "8.求生意志",
    "8.巨力",

    "4.結伴效應",
    "3.迴光返照",
    "2.假寐",
    "2.掩耳盜鈴",

    "1.共生效應",
    "12.飛輪效應",
    "11.癒合",
    "11.雲中漫步"

];

// =======================
// 監管天賦
// =======================

const hunterTalents = [

    "7.衝動",
    "6.挽留",
    "5.巨鉗",
    "5.拘禁狂",

    "10.幽閉恐懼",
    "9.張狂",
    "8.清道夫",
    "8.追獵",

    "4.成癮症",
    "3.底牌",
    "2.崩壞",
    "2.通緝",

    "1.戲弄",
    "12.幽閉空間",
    "11.狂暴",
    "11.憤怒"

];