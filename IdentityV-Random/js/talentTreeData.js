// ========================================
// 第五人格 人格樹資料
// talentTreeData.js
// ========================================

/*
說明：

nodeId 規則：

survivor_求生者
hunter_監管者

方向：
up = 上
right = 右
down = 下
left = 左

middle = 中
top = 上
bottom = 下

範例：

survivor_up_middle_middle

意思：

求生者
上人格
中路
中間節點

---------------------------------

maxLevel：

1 = 0/1
3 = 0/3

---------------------------------

costPerLevel：

每次升級消耗點數

目前固定：

5

---------------------------------

parent：

前置人格

必須點滿 parent
才能往下點

null = 起始人格

---------------------------------

children：

下一層人格

---------------------------------

isFinal：

是否為最終人格

只有：

上中終
右中終
下中終
左中終

才是 true

限制最多 2 個
*/


const talentTree = {

    // ====================================
    // 求生者人格
    // ====================================
    survivor: {

        // ==========================
        // 上人格
        // ==========================

        survivor_up: {
            name: "關係場",

            maxLevel: 1,
            currentLevel: 0,

            costPerLevel: 5,

            parent: null,

            children: [
                "survivor_up_left",
                "survivor_up_middle",
                "survivor_up_right"
            ],

            isFinal: false
        },

        // ===== 上左 =====

        survivor_up_left: {
            name: "倖存者本能",

            maxLevel: 1,
            currentLevel: 0,

            costPerLevel: 5,

            parent: "survivor_up",

            children: [
                "survivor_up_left_left",
                "survivor_up_left_right"
            ],

            isFinal: false
        },

        survivor_up_left_left: {
            name: "癒合",

            maxLevel: 3,
            currentLevel: 0,

            costPerLevel: 5,

            parent: "survivor_up_left",

            children: [],

            isFinal: false
        },

        survivor_up_left_right: {
            name: "防禦機制",

            maxLevel: 3,
            currentLevel: 0,

            costPerLevel: 5,

            parent: "survivor_up_left",

            children: [],

            isFinal: false
        },

        // ===== 上中 =====

        survivor_up_middle: {
            name: "禍福相依",

            maxLevel: 3,
            currentLevel: 0,

            costPerLevel: 5,

            parent: "survivor_up",

            children: [
                "survivor_up_middle_middle"
            ],

            isFinal: false
        },

        survivor_up_middle_middle: {
            name: "韋伯定律",

            maxLevel: 3,
            currentLevel: 0,

            costPerLevel: 5,

            parent: "survivor_up_middle",

            children: [
                "survivor_up_middle_final"
            ],

            isFinal: false
        },

        survivor_up_middle_final: {
            name: "飛輪效應",

            maxLevel: 1,
            currentLevel: 0,

            costPerLevel: 5,

            parent: "survivor_up_middle_middle",

            children: [],

            isFinal: true
        },

        // ===== 上右 =====

        survivor_up_right: {
            name: "相濡以沫",

            maxLevel: 1,
            currentLevel: 0,

            costPerLevel: 5,

            parent: "survivor_up",

            children: [
                "survivor_up_right_left",
                "survivor_up_right_right"
            ],

            isFinal: false
        },

        survivor_up_right_left: {
            name: "共生效應",

            maxLevel: 1,
            currentLevel: 0,

            costPerLevel: 5,

            parent: "survivor_up_right",

            children: [],

            isFinal: false
        },

        survivor_up_right_right: {
            name: "雲中漫步",

            maxLevel: 1,
            currentLevel: 0,

            costPerLevel: 5,

            parent: "survivor_up_right",

            children: [],

            isFinal: false
        },

        // ==========================
        // 右人格
        // ==========================

        survivor_right: {
            name: "好奇心",

            maxLevel: 1,
            currentLevel: 0,

            costPerLevel: 5,

            parent: null,

            children: [
                "survivor_right_top",
                "survivor_right_middle",
                "survivor_right_bottom"
            ],

            isFinal: false
            
        },
        // ===== 右上 =====

survivor_right_top: {
    name: "分心",

    maxLevel: 1,
    currentLevel: 0,

    costPerLevel: 5,

    parent: "survivor_right",

    children: [
        "survivor_right_top_top",
        "survivor_right_top_bottom"
    ],

    isFinal: false
},

survivor_right_top_top: {
    name: "假寐",

    maxLevel: 3,
    currentLevel: 0,

    costPerLevel: 5,

    parent: "survivor_right_top",

    children: [],

    isFinal: false
},

survivor_right_top_bottom: {
    name: "觸摸效應",

    maxLevel: 3,
    currentLevel: 0,

    costPerLevel: 5,

    parent: "survivor_right_top",

    children: [],

    isFinal: false
},

// ===== 右中 =====

survivor_right_middle: {
    name: "不屈不撓",

    maxLevel: 3,
    currentLevel: 0,

    costPerLevel: 5,

    parent: "survivor_right",

    children: [
        "survivor_right_middle_middle"
    ],

    isFinal: false
},

survivor_right_middle_middle: {
    name: "逃逸",

    maxLevel: 3,
    currentLevel: 0,

    costPerLevel: 5,

    parent: "survivor_right_middle",

    children: [
        "survivor_right_middle_final"
    ],

    isFinal: false
},

survivor_right_middle_final: {
    name: "迴光返照",

    maxLevel: 1,
    currentLevel: 0,

    costPerLevel: 5,

    parent: "survivor_right_middle_middle",

    children: [],

    isFinal: true
},

// ===== 右下 =====

survivor_right_bottom: {
    name: "心靈感應",

    maxLevel: 1,
    currentLevel: 0,

    costPerLevel: 5,

    parent: "survivor_right",

    children: [
        "survivor_right_bottom_top",
        "survivor_right_bottom_bottom"
    ],

    isFinal: false
},

survivor_right_bottom_top: {
    name: "結伴效應",

    maxLevel: 1,
    currentLevel: 0,

    costPerLevel: 5,

    parent: "survivor_right_bottom",

    children: [],

    isFinal: false
},

survivor_right_bottom_bottom: {
    name: "觀眾效應",

    maxLevel: 1,
    currentLevel: 0,

    costPerLevel: 5,

    parent: "survivor_right_bottom",

    children: [],

    isFinal: false
},

// ==========================
// 下人格
// ==========================

survivor_down: {
    name: "鳥籠效應",

    maxLevel: 1,
    currentLevel: 0,

    costPerLevel: 5,

    parent: null,

    children: [
        "survivor_down_left",
        "survivor_down_middle",
        "survivor_down_right"
    ],

    isFinal: false
},

// ===== 下左 =====

survivor_down_left: {
    name: "宣洩",

    maxLevel: 1,
    currentLevel: 0,

    costPerLevel: 5,

    parent: "survivor_down",

    children: [
        "survivor_down_left_left",
        "survivor_down_left_right"
    ],

    isFinal: false
},

survivor_down_left_left: {
    name: "共情",

    maxLevel: 1,
    currentLevel: 0,

    costPerLevel: 5,

    parent: "survivor_down_left",

    children: [],

    isFinal: false
},

survivor_down_left_right: {
    name: "寒意",

    maxLevel: 1,
    currentLevel: 0,

    costPerLevel: 5,

    parent: "survivor_down_left",

    children: [],

    isFinal: false
},

// ===== 下中 =====

survivor_down_middle: {
    name: "救世主情節",

    maxLevel: 3,
    currentLevel: 0,

    costPerLevel: 5,

    parent: "survivor_down",

    children: [
        "survivor_down_middle_middle"
    ],

    isFinal: false
},

survivor_down_middle_middle: {
    name: "從眾心理",

    maxLevel: 3,
    currentLevel: 0,

    costPerLevel: 5,

    parent: "survivor_down_middle",

    children: [
        "survivor_down_middle_final"
    ],

    isFinal: false
},

survivor_down_middle_final: {
    name: "化險為夷",

    maxLevel: 1,
    currentLevel: 0,

    costPerLevel: 5,

    parent: "survivor_down_middle_middle",

    children: [],

    isFinal: true
},

// ===== 下右 =====

survivor_down_right: {
    name: "悄無聲息",

    maxLevel: 1,
    currentLevel: 0,

    costPerLevel: 5,

    parent: "survivor_down",

    children: [
        "survivor_down_right_left",
        "survivor_down_right_right"
    ],

    isFinal: false
},

survivor_down_right_left: {
    name: "避難所",

    maxLevel: 3,
    currentLevel: 0,

    costPerLevel: 5,

    parent: "survivor_down_right",

    children: [],

    isFinal: false
},

survivor_down_right_right: {
    name: "醫者",

    maxLevel: 3,
    currentLevel: 0,

    costPerLevel: 5,

    parent: "survivor_down_right",

    children: [],

    isFinal: false
},
// ==========================
// 左人格
// ==========================

survivor_left: {
    name: "火中取栗",

    maxLevel: 1,
    currentLevel: 0,

    costPerLevel: 5,

    parent: null,

    children: [
        "survivor_left_top",
        "survivor_left_middle",
        "survivor_left_bottom"
    ],

    isFinal: false
},

// ===== 左上 =====

survivor_left_top: {
    name: "絕處逢生",

    maxLevel: 1,
    currentLevel: 0,

    costPerLevel: 5,

    parent: "survivor_left",

    children: [
        "survivor_left_top_top",
        "survivor_left_top_bottom"
    ],

    isFinal: false
},

survivor_left_top_top: {
    name: "感覺適應",

    maxLevel: 1,
    currentLevel: 0,

    costPerLevel: 5,

    parent: "survivor_left_top",

    children: [],

    isFinal: false
},

survivor_left_top_bottom: {
    name: "醞釀效應",

    maxLevel: 1,
    currentLevel: 0,

    costPerLevel: 5,

    parent: "survivor_left_top",

    children: [],

    isFinal: false
},

// ===== 左中 =====

survivor_left_middle: {
    name: "馬蠅效應",

    maxLevel: 3,
    currentLevel: 0,

    costPerLevel: 5,

    parent: "survivor_left",

    children: [
        "survivor_left_middle_middle"
    ],

    isFinal: false
},

survivor_left_middle_middle: {
    name: "肌肉記憶",

    maxLevel: 3,
    currentLevel: 0,

    costPerLevel: 5,

    parent: "survivor_left_middle",

    children: [
        "survivor_left_middle_final"
    ],

    isFinal: false
},

survivor_left_middle_final: {
    name: "膝跳反射",

    maxLevel: 1,
    currentLevel: 0,

    costPerLevel: 5,

    parent: "survivor_left_middle_middle",

    children: [],

    isFinal: true
},

// ===== 左下 =====

survivor_left_bottom: {
    name: "囚徒困境",

    maxLevel: 1,
    currentLevel: 0,

    costPerLevel: 5,

    parent: "survivor_left",

    children: [
        "survivor_left_bottom_top",
        "survivor_left_bottom_bottom"
    ],

    isFinal: false
},

survivor_left_bottom_top: {
    name: "求生意志",

    maxLevel: 3,
    currentLevel: 0,

    costPerLevel: 5,

    parent: "survivor_left_bottom",

    children: [],

    isFinal: false
},

survivor_left_bottom_bottom: {
    name: "巨力",

    maxLevel: 3,
    currentLevel: 0,

    costPerLevel: 5,

    parent: "survivor_left_bottom",

    children: [],

    isFinal: false
}},

    // ====================================
    // 監管者人格
    // ====================================
    hunter: {// ==========================
// 上人格
// ==========================

hunter_up: {
    name: "惡化",

    maxLevel: 1,
    currentLevel: 0,

    costPerLevel: 5,

    parent: null,

    children: [
        "hunter_up_left",
        "hunter_up_middle",
        "hunter_up_right"
    ],

    isFinal: false
},

// ===== 上左 =====

hunter_up_left: {
    name: "恐慌",

    maxLevel: 1,
    currentLevel: 0,

    costPerLevel: 5,

    parent: "hunter_up",

    children: [
        "hunter_up_left_left",
        "hunter_up_left_right"
    ],

    isFinal: false
},

hunter_up_left_left: {
    name: "憤怒",

    maxLevel: 3,
    currentLevel: 0,

    costPerLevel: 5,

    parent: "hunter_up_left",

    children: [],

    isFinal: false
},

hunter_up_left_right: {
    name: "狂暴",

    maxLevel: 3,
    currentLevel: 0,

    costPerLevel: 5,

    parent: "hunter_up_left",

    children: [],

    isFinal: false
},

// ===== 上中 =====

hunter_up_middle: {
    name: "枯萎",

    maxLevel: 3,
    currentLevel: 0,

    costPerLevel: 5,

    parent: "hunter_up",

    children: [
        "hunter_up_middle_middle"
    ],

    isFinal: false
},

hunter_up_middle_middle: {
    name: "破壞欲",

    maxLevel: 3,
    currentLevel: 0,

    costPerLevel: 5,

    parent: "hunter_up_middle",

    children: [
        "hunter_up_middle_final"
    ],

    isFinal: false
},

hunter_up_middle_final: {
    name: "禁閉空間",

    maxLevel: 1,
    currentLevel: 0,

    costPerLevel: 5,

    parent: "hunter_up_middle_middle",

    children: [],

    isFinal: true
},

// ===== 上右 =====

hunter_up_right: {
    name: "執念",

    maxLevel: 1,
    currentLevel: 0,

    costPerLevel: 5,

    parent: "hunter_up",

    children: [
        "hunter_up_right_left",
        "hunter_up_right_right"
    ],

    isFinal: false
},

hunter_up_right_left: {
    name: "戲弄",

    maxLevel: 1,
    currentLevel: 0,

    costPerLevel: 5,

    parent: "hunter_up_right",

    children: [],

    isFinal: false
},

hunter_up_right_right: {
    name: "飢荒",

    maxLevel: 1,
    currentLevel: 0,

    costPerLevel: 5,

    parent: "hunter_up_right",

    children: [],

    isFinal: false
},

// ==========================
// 右人格
// ==========================

hunter_right: {
    name: "封禁",

    maxLevel: 1,
    currentLevel: 0,

    costPerLevel: 5,

    parent: null,

    children: [
        "hunter_right_top",
        "hunter_right_middle",
        "hunter_right_bottom"
    ],

    isFinal: false
},

// ===== 右上 =====

hunter_right_top: {
    name: "報幕",

    maxLevel: 1,
    currentLevel: 0,

    costPerLevel: 5,

    parent: "hunter_right",

    children: [
        "hunter_right_top_top",
        "hunter_right_top_bottom"
    ],

    isFinal: false
},

hunter_right_top_top: {
    name: "通緝",

    maxLevel: 3,
    currentLevel: 0,

    costPerLevel: 5,

    parent: "hunter_right_top",

    children: [],

    isFinal: false
},

hunter_right_top_bottom: {
    name: "崩壞",

    maxLevel: 3,
    currentLevel: 0,

    costPerLevel: 5,

    parent: "hunter_right_top",

    children: [],

    isFinal: false
},

// ===== 右中 =====

hunter_right_middle: {
    name: "狩獵本能",

    maxLevel: 3,
    currentLevel: 0,

    costPerLevel: 5,

    parent: "hunter_right",

    children: [
        "hunter_right_middle_middle"
    ],

    isFinal: false
},

hunter_right_middle_middle: {
    name: "好客之道",

    maxLevel: 3,
    currentLevel: 0,

    costPerLevel: 5,

    parent: "hunter_right_middle",

    children: [
        "hunter_right_middle_final"
    ],

    isFinal: false
},

hunter_right_middle_final: {
    name: "底牌",

    maxLevel: 1,
    currentLevel: 0,

    costPerLevel: 5,

    parent: "hunter_right_middle_middle",

    children: [],

    isFinal: true
},

// ===== 右下 =====

hunter_right_bottom: {
    name: "困獸之鬥",

    maxLevel: 1,
    currentLevel: 0,

    costPerLevel: 5,

    parent: "hunter_right",

    children: [
        "hunter_right_bottom_top",
        "hunter_right_bottom_bottom"
    ],

    isFinal: false
},

hunter_right_bottom_top: {
    name: "成癮症",

    maxLevel: 1,
    currentLevel: 0,

    costPerLevel: 5,

    parent: "hunter_right_bottom",

    children: [],

    isFinal: false
},

hunter_right_bottom_bottom: {
    name: "念舊癖",

    maxLevel: 1,
    currentLevel: 0,

    costPerLevel: 5,

    parent: "hunter_right_bottom",

    children: [],

    isFinal: false
},
// ==========================
// 下人格
// ==========================

hunter_down: {
    name: "慣性",

    maxLevel: 1,
    currentLevel: 0,

    costPerLevel: 5,

    parent: null,

    children: [
        "hunter_down_left",
        "hunter_down_middle",
        "hunter_down_right"
    ],

    isFinal: false
},

// ===== 下左 =====

hunter_down_left: {
    name: "摧枯拉朽",

    maxLevel: 1,
    currentLevel: 0,

    costPerLevel: 5,

    parent: "hunter_down",

    children: [
        "hunter_down_left_left",
        "hunter_down_left_right"
    ],

    isFinal: false
},

hunter_down_left_left: {
    name: "無人生還",

    maxLevel: 1,
    currentLevel: 0,

    costPerLevel: 5,

    parent: "hunter_down_left",

    children: [],

    isFinal: false
},

hunter_down_left_right: {
    name: "衝動",

    maxLevel: 1,
    currentLevel: 0,

    costPerLevel: 5,

    parent: "hunter_down_left",

    children: [],

    isFinal: false
},

// ===== 下中 =====

hunter_down_middle: {
    name: "嘲弄",

    maxLevel: 3,
    currentLevel: 0,

    costPerLevel: 5,

    parent: "hunter_down",

    children: [
        "hunter_down_middle_middle"
    ],

    isFinal: false
},

hunter_down_middle_middle: {
    name: "狂歡",

    maxLevel: 3,
    currentLevel: 0,

    costPerLevel: 5,

    parent: "hunter_down_middle",

    children: [
        "hunter_down_middle_final"
    ],

    isFinal: false
},

hunter_down_middle_final: {
    name: "挽留",

    maxLevel: 1,
    currentLevel: 0,

    costPerLevel: 5,

    parent: "hunter_down_middle_middle",

    children: [],

    isFinal: true
},

// ===== 下右 =====

hunter_down_right: {
    name: "焠火",

    maxLevel: 1,
    currentLevel: 0,

    costPerLevel: 5,

    parent: "hunter_down",

    children: [
        "hunter_down_right_left",
        "hunter_down_right_right"
    ],

    isFinal: false
},

hunter_down_right_left: {
    name: "巨鉗",

    maxLevel: 3,
    currentLevel: 0,

    costPerLevel: 5,

    parent: "hunter_down_right",

    children: [],

    isFinal: false
},

hunter_down_right_right: {
    name: "拘禁狂",

    maxLevel: 3,
    currentLevel: 0,

    costPerLevel: 5,

    parent: "hunter_down_right",

    children: [],

    isFinal: false
},

// ==========================
// 左人格
// ==========================

hunter_left: {
    name: "狩鹿",

    maxLevel: 1,
    currentLevel: 0,

    costPerLevel: 5,

    parent: null,

    children: [
        "hunter_left_top",
        "hunter_left_middle",
        "hunter_left_bottom"
    ],

    isFinal: false
},

// ===== 左上 =====

hunter_left_top: {
    name: "掌控欲",

    maxLevel: 1,
    currentLevel: 0,

    costPerLevel: 5,

    parent: "hunter_left",

    children: [
        "hunter_left_top_top",
        "hunter_left_top_bottom"
    ],

    isFinal: false
},

hunter_left_top_top: {
    name: "警覺",

    maxLevel: 1,
    currentLevel: 0,

    costPerLevel: 5,

    parent: "hunter_left_top",

    children: [],

    isFinal: false
},

hunter_left_top_bottom: {
    name: "幽閉恐懼",

    maxLevel: 1,
    currentLevel: 0,

    costPerLevel: 5,

    parent: "hunter_left_top",

    children: [],

    isFinal: false
},

// ===== 左中 =====

hunter_left_middle: {
    name: "耐受力",

    maxLevel: 3,
    currentLevel: 0,

    costPerLevel: 5,

    parent: "hunter_left",

    children: [
        "hunter_left_middle_middle"
    ],

    isFinal: false
},

hunter_left_middle_middle: {
    name: "後遺症",

    maxLevel: 3,
    currentLevel: 0,

    costPerLevel: 5,

    parent: "hunter_left_middle",

    children: [
        "hunter_left_middle_final"
    ],

    isFinal: false
},

hunter_left_middle_final: {
    name: "張狂",

    maxLevel: 1,
    currentLevel: 0,

    costPerLevel: 5,

    parent: "hunter_left_middle_middle",

    children: [],

    isFinal: true
},

// ===== 左下 =====

hunter_left_bottom: {
    name: "表現欲",

    maxLevel: 1,
    currentLevel: 0,

    costPerLevel: 5,

    parent: "hunter_left",

    children: [
        "hunter_left_bottom_top",
        "hunter_left_bottom_bottom"
    ],

    isFinal: false
},

hunter_left_bottom_top: {
    name: "清道夫",

    maxLevel: 3,
    currentLevel: 0,

    costPerLevel: 5,

    parent: "hunter_left_bottom",

    children: [],

    isFinal: false
},

hunter_left_bottom_bottom: {
    name: "追獵",

    maxLevel: 3,
    currentLevel: 0,

    costPerLevel: 5,

    parent: "hunter_left_bottom",

    children: [],

    isFinal: false
}
}
};
// ====================================================
// 【新增】130點高階隨機天賦配點演算法（貼在 talentTreeData.js 最底部）
// ====================================================
function generateAdvancedTalents(treeData) {
    const tree = JSON.parse(JSON.stringify(treeData));
    let remainingPoints = 130; 
    const cost = 5;            

    let targetFinalCount = 0;
    const rand = Math.random();
    if (rand < 0.10) {          
        targetFinalCount = 0;
    } else if (rand < 0.40) {   
        targetFinalCount = 1;
    } else {                    
        targetFinalCount = 2;
    }

    const finalNodeKeys = Object.keys(tree).filter(key => tree[key].isFinal);
    let chosenFinalKeys = [];
    if (targetFinalCount > 0) {
        let shuffledFinals = [...finalNodeKeys].sort(() => 0.5 - Math.random());
        chosenFinalKeys = shuffledFinals.slice(0, targetFinalCount);
    }

    let primaryPathKeys = new Set();
    function traceParent(nodeKey) {
        if (!nodeKey || primaryPathKeys.has(nodeKey)) return;
        primaryPathKeys.add(nodeKey);
        const parentKey = tree[nodeKey].parent;
        if (parentKey) traceParent(parentKey);
    }
    chosenFinalKeys.forEach(key => traceParent(key));

    let changed = true;
    while (remainingPoints >= cost && primaryPathKeys.size > 0 && changed) {
        changed = false;
        for (let key of primaryPathKeys) {
            const node = tree[key];
            let parentReady = false;
            if (node.parent === null) {
                parentReady = true;
            } else {
                const parentNode = tree[node.parent];
                if (parentNode && parentNode.currentLevel === parentNode.maxLevel) {
                    parentReady = true;
                }
            }
            if (parentReady && node.currentLevel < node.maxLevel) {
                while (node.currentLevel < node.maxLevel && remainingPoints >= cost) {
                    node.currentLevel++;
                    remainingPoints -= cost;
                }
                changed = true;
                break; 
            }
        }
    }

    function getNodeWeight(key, node) {
        if (node.isFinal && !chosenFinalKeys.includes(key)) return 0; 
        if (node.parent !== null) {
            const parentNode = tree[node.parent];
            if (!parentNode || parentNode.currentLevel < parentNode.maxLevel) return 0;
        }
        if (node.currentLevel >= node.maxLevel) return 0;

        let weight = 10; 
        if (node.currentLevel > 0) weight += 500; 
        if (node.children && node.children.length > 0) weight += 30;
        return weight;
    }

    while (remainingPoints >= cost) {
        let pool = [];
        let totalWeight = 0;
        Object.keys(tree).forEach(key => {
            const node = tree[key];
            const w = getNodeWeight(key, node);
            if (w > 0) {
                pool.push({ key, weight: w });
                totalWeight += w;
            }
        });
        if (pool.length === 0) break;
        let randWeight = Math.random() * totalWeight;
        let selectedKey = pool.key;
        for (let item of pool) {
            randWeight -= item.weight;
            if (randWeight <= 0) {
                selectedKey = item.key;
                break;
            }
        }
        tree[selectedKey].currentLevel++;
        remainingPoints -= cost;
    }

    let finalTalents = [];
    let ultimateTalents = [];
    Object.keys(tree).forEach(key => {
        const node = tree[key];
        if (node.currentLevel > 0) {
            finalTalents.push({ id: key, name: node.name, level: node.currentLevel, max: node.maxLevel });
            if (node.isFinal) ultimateTalents.push(node.name);
        }
    });

    return {
        targetFinalsCount: targetFinalCount,
        ultimates: ultimateTalents,
        allTalents: finalTalents,
        usedPoints: 130 - remainingPoints
    };
}



