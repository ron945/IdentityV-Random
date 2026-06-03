// ==========================
// 第五人格抽取器
// script.js
// ==========================


// ==========================
// 初始化
// ==========================
// 全域變數，供複製代碼功能抓取當下狀態
let lastGeneratedData = null;
window.onload = function () {

    renderRoleLists();
    renderMapList();

    const btn =
        document.getElementById(
            "genBtn"
        );

    if (btn) {

        btn.addEventListener(
            "click",
            generateOnce
        );
    }
};


// ==========================
// 顯示角色列表
// ==========================

function renderRoleLists() {

    const survivorDiv =
        document.getElementById(
            "survivorList"
        );

    const hunterDiv =
        document.getElementById(
            "hunterList"
        );

    survivorDiv.innerHTML = "";
    hunterDiv.innerHTML = "";


    // 求生者
    for (
        let i = 0;
        i < survivorRoles.length;
        i++
    ) {

        const role =
            survivorRoles[i];

        const label =
            document.createElement(
                "label"
            );

        const checkbox =
            document.createElement(
                "input"
            );

        checkbox.type =
            "checkbox";

        checkbox.checked =
            role.disabled;

        checkbox.onchange =
            function () {

                role.disabled =
                    this.checked;
            };

        label.appendChild(
            checkbox
        );

        label.append(
            " " + role.name
        );

        survivorDiv.appendChild(
            label
        );

        survivorDiv.appendChild(
            document.createElement(
                "br"
            )
        );
    }


    // 監管者
    for (
        let i = 0;
        i < hunterRoles.length;
        i++
    ) {

        const role =
            hunterRoles[i];

        const label =
            document.createElement(
                "label"
            );

        const checkbox =
            document.createElement(
                "input"
            );

        checkbox.type =
            "checkbox";

        checkbox.checked =
            role.disabled;

        checkbox.onchange =
            function () {

                role.disabled =
                    this.checked;
            };

        label.appendChild(
            checkbox
        );

        label.append(
            " " + role.name
        );

        hunterDiv.appendChild(
            label
        );

        hunterDiv.appendChild(
            document.createElement(
                "br"
            )
        );
    }
}


// ==========================
// 地圖列表
// ==========================

function renderMapList() {

    const mapDiv =
        document.getElementById(
            "mapList"
        );

    mapDiv.innerHTML = "";

    for (
        let i = 0;
        i < maps.length;
        i++
    ) {

        const map =
            maps[i];

        const label =
            document.createElement(
                "label"
            );

        const checkbox =
            document.createElement(
                "input"
            );

        checkbox.type =
            "checkbox";

        checkbox.checked =
            map.disabled;

        checkbox.onchange =
            function () {

                map.disabled =
                    this.checked;
            };

        label.appendChild(
            checkbox
        );

        label.append(
            " " + map.name
        );

        mapDiv.appendChild(
            label
        );

        mapDiv.appendChild(
            document.createElement(
                "br"
            )
        );
    }
}


// ==========================
// 禁用功能
// ==========================

function disableAllSurvivors() {

    for (
        let i = 0;
        i < survivorRoles.length;
        i++
    ) {

        survivorRoles[i]
            .disabled = true;
    }

    renderRoleLists();
}

function enableAllSurvivors() {

    for (
        let i = 0;
        i < survivorRoles.length;
        i++
    ) {

        survivorRoles[i]
            .disabled = false;
    }

    renderRoleLists();
}

function disableAllHunters() {

    for (
        let i = 0;
        i < hunterRoles.length;
        i++
    ) {

        hunterRoles[i]
            .disabled = true;
    }

    renderRoleLists();
}

function enableAllHunters() {

    for (
        let i = 0;
        i < hunterRoles.length;
        i++
    ) {

        hunterRoles[i]
            .disabled = false;
    }

    renderRoleLists();
}

function disableAllMaps() {

    for (
        let i = 0;
        i < maps.length;
        i++
    ) {

        maps[i]
            .disabled = true;
    }

    renderMapList();
}

function enableAllMaps() {

    for (
        let i = 0;
        i < maps.length;
        i++
    ) {

        maps[i]
            .disabled = false;
    }

    renderMapList();
}

// ==========================
// 隨機角色（不重複）
// ==========================

function getRandomRole(
    roleList,
    usedNames
) {

    const enabled =
        roleList.filter(
            function (role) {

                return (
                    !role.disabled
                    &&
                    !usedNames.includes(
                        role.name
                    )
                );
            }
        );

    // 沒角色可抽
    if (
        enabled.length === 0
    ) {

        return null;
    }

    const index =
        Math.floor(
            Math.random()
            * enabled.length
        );

    const selected =
        enabled[index];

    // 加進已使用
    usedNames.push(
        selected.name
    );

    return selected;
}
// ==========================================
// 🎯 右側按鈕功能：複製完整網址連結（第一顆按鈕）
// ==========================================
function copyRoomLink() {
    const roomCodeInput = document.getElementById("roomCode");
    const roomStatus = document.getElementById("roomStatus");
    if (!roomCodeInput || !roomCodeInput.value) {
        alert("請先點擊中間的【開始抽取】生成結果，才能複製網址喔！");
        return;
    }
    // 組合出帶有參數的完整網址
    const shareLink = window.location.origin + window.location.pathname + "?code=" + roomCodeInput.value.trim();
    navigator.clipboard.writeText(shareLink);
    if (roomStatus) {
        roomStatus.innerHTML = "<span style='color: #2ECC71; font-weight: bold;'>🔗 網址連結已複製！隊友點開連結就能直接看到結果！</span>";
    }
}

// ==========================================
// 🎯 右側按鈕功能：僅複製純代碼（第二顆按鈕）
// ==========================================
function copyPureCode() {
    const roomCodeInput = document.getElementById("roomCode");
    const roomStatus = document.getElementById("roomStatus");
    if (!roomCodeInput || !roomCodeInput.value) {
        alert("請先點擊中間的【開始抽取】生成結果，才能複製代碼喔！");
        return;
    }
    // 只複製輸入框裡的那一長串加密文字
    navigator.clipboard.writeText(roomCodeInput.value.trim());
    if (roomStatus) {
        roomStatus.innerHTML = "<span style='color: #3498DB; font-weight: bold;'>📋 純代碼已複製！適合發在無法發網址的地方。</span>";
    }
}

// ==========================================
// 🎯 右側按鈕功能：讀取代碼/網址同步畫面（第三顆按鈕＋防呆過濾）
// ==========================================
function loadRoomCode() {
    const roomCodeInput = document.getElementById("roomCode");
    const roomStatus = document.getElementById("roomStatus");
    if (!roomCodeInput || !roomCodeInput.value.trim()) {
        alert("請先將別人的代碼或網址貼進輸入框中！");
        return;
    }
    
    let rawCode = roomCodeInput.value.trim();

    try {
        // 聰明防呆：如果使用者不小心把整串「長網址」貼進格子裡，自動幫他把裡面的 ?code= 抓出來
        if (rawCode.includes("?code=")) {
            const urlObj = new URL(rawCode);
            rawCode = urlObj.searchParams.get("code") || rawCode;
            roomCodeInput.value = rawCode; // 貼心地幫他把輸入框淨化成純代碼
        }

        // 進行萬能 Base64 解碼
        const decodedStr = decodeURIComponent(atob(rawCode).split('').map(function(c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
        
        const importedData = JSON.parse(decodedStr);
        
        // 🚀 【核心修正】呼叫我們改名後的新抽取邏輯，不再呼叫報錯的舊函式
        startRandomDraw(importedData); 
        
        if (roomStatus) {
            roomStatus.innerHTML = "<span style='color: #ffd700; font-weight: bold;'>📥 成功讀取！畫面已完全同步還原。</span>";
        }
    } catch (e) {
        alert("❌ 錯誤：無法解析，請確認是否有複製完整！");
        if (roomStatus) {
            roomStatus.innerHTML = "<span style='color: #E74C3C; font-weight: bold;'>❌ 讀取失敗，代碼或網址無效。</span>";
        }
        console.error(e);
    }
}


// ==========================================
// 🎯 【網址自動帶入＋全自動按鈕觸發版】
// ==========================================
window.addEventListener("load", function() {
    // 1. 取得網址後方的參數
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("code");
    
    // 2. 如果網址有帶 code 參數
    if (code) {
        // 給網頁 200 毫秒極短的就緒時間
        setTimeout(function() {
            const roomCodeInput = document.getElementById("roomCode");
            
            if (roomCodeInput) {
                // 自動把代碼填入格子裡
                roomCodeInput.value = code;
                
                // 🎯 核心特技：全自動幫使用者「隔空點擊」一次【讀取他人代碼】按鈕！
                loadRoomCode(); 
                
                console.log("🔗 網址代碼已成功帶入格子，並自動觸發讀取功能！");
            }
        }, 200);
    }
});

// ==========================================
// 【全網新版：最高防禦】改名為 startRandomDraw 徹底避開 691 行衝突
// ==========================================
function startRandomDraw(externalData = null) {
    const resultArea = document.getElementById("resultArea");
    const mapName = document.getElementById("mapName");
    const boardArea = document.getElementById("boardArea");
    const roomCodeInput = document.getElementById("roomCode");

    if (!resultArea || !mapName || !boardArea) return;

    let finalData = { survivors: [], hunter: null, map: null };

    if (externalData) {
        finalData = JSON.parse(JSON.stringify(externalData));
        if (!finalData.survivors) finalData.survivors = [];
    } else {
        if (typeof survivorRoles === 'undefined' || typeof hunterRoles === 'undefined' || typeof talentTree === 'undefined' || typeof maps === 'undefined') {
            console.warn("資料庫尚未就緒。");
            return;
        }

        // ---- 1. 求生者抽取 ----
        let survivors = [];
        const usedSurvivors = [];
        for (let i = 0; i < 4; i++) {
            const role = getRandomRole(survivorRoles, usedSurvivors);
            if (role) {
                const talentResult = typeof generateAdvancedTalents !== 'undefined' ? generateAdvancedTalents(talentTree.survivor) : null;
                let detailsText = "";
                let ultimates = [];
                if (talentResult && talentResult.allTalents) {
                    ultimates = talentResult.ultimates || [];
                    const filtered = talentResult.allTalents.filter(t => {
                        const originalNode = talentTree.survivor[t.id];
                        if (originalNode && originalNode.children && originalNode.children.length > 0) {
                            return !originalNode.children.some(childId => talentResult.allTalents.some(active => active.id === childId && active.level > 0));
                        }
                        return true;
                    });
                    detailsText = filtered.map(t => `${t.name}(${t.level})`).join(", ");
                }
                survivors.push({ name: role.name, ultimates: ultimates, detailsText: detailsText });
            }
        }

        // ---- 2. 監管者抽取 ----
        let hunterData = null;
        const hunter = getRandomRole(hunterRoles, []);
        if (hunter) {
            const talentResult = typeof generateAdvancedTalents !== 'undefined' ? generateAdvancedTalents(talentTree.hunter) : null;
            let detailsText = "";
            let ultimates = [];
            if (talentResult && talentResult.allTalents) {
                ultimates = talentResult.ultimates || [];
                const filtered = talentResult.allTalents.filter(t => {
                    const originalNode = talentTree.hunter[t.id];
                    if (originalNode && originalNode.children && originalNode.children.length > 0) {
                        return !originalNode.children.some(childId => talentResult.allTalents.some(active => active.id === childId && active.level > 0));
                    }
                    return true;
                });
                detailsText = filtered.map(t => `${t.name}(${t.level})`).join(", ");
            }
            hunterData = { name: hunter.name, ultimates: ultimates, detailsText: detailsText };
        }

        // ---- 3. 地圖與選點 ----
        let mapData = null;
        const enabledMaps = maps.filter(map => !map.disabled);
        if (enabledMaps.length > 0) {
            const mapIndex = Math.floor(Math.random() * enabledMaps.length);
            const selectedMap = enabledMaps[mapIndex];
            const fixedSet = new Set();
            if (selectedMap.fixedBlocks) selectedMap.fixedBlocks.forEach(block => fixedSet.add(block + "-" + block));

            let emptyCells = [];
            for (let r = 0; r < selectedMap.rows; r++) {
                for (let c = 0; c < selectedMap.cols; c++) {
                    if (!fixedSet.has(r + "-" + c)) emptyCells.push({ row: r, col: c });
                }
            }
            emptyCells.sort(() => 0.5 - Math.random());

            let cellMarkers = {};
            for (let i = 1; i <= 4; i++) {
                if (emptyCells.length > 0) {
                    let cell = emptyCells.shift();
                    cellMarkers[cell.row + "-" + cell.col] = i;
                }
            }
            if (emptyCells.length > 0) {
                let cell = emptyCells.shift();
                cellMarkers[emptyCells.shift().row + "-" + emptyCells.shift().col] = "監"; // 保險防空
                let lastCell = emptyCells.shift();
                if(lastCell) cellMarkers[lastCell.row + "-" + lastCell.col] = "監";
            }
            if (emptyCells.length > 0) {
                let cell = emptyCells.shift();
                cellMarkers[cell.row + "-" + cell.col] = "監";
            }

            mapData = { name: selectedMap.name, rows: selectedMap.rows, cols: selectedMap.cols, fixedBlocks: selectedMap.fixedBlocks || [], cellMarkers: cellMarkers };
        }

        finalData = { survivors: survivors, hunter: hunterData, map: mapData };
    }

    if (!externalData && roomCodeInput && finalData && finalData.survivors && finalData.survivors.length > 0) {
        const jsonStr = JSON.stringify(finalData);
        roomCodeInput.value = btoa(unescape(encodeURIComponent(jsonStr)));
    }

    if (!finalData || !finalData.survivors || finalData.survivors.length === 0) return;

    // ---- 4. 渲染畫面 ----
    let html = "<h3>求生者</h3>";
    finalData.survivors.forEach((surv, i) => {
        const ultText = surv.ultimates && surv.ultimates.length > 0 ? `【${surv.ultimates.join(" + ")}】` : "【無大天賦偏策】";
        html += `<div style="margin-bottom: 12px; border-left: 3px solid #ffcc00; padding-left: 8px;">
            <strong style="color: #ffcc00;">${i + 1}號求生者：${surv.name}</strong> 
            <span style="color: #e67e22; font-weight: bold; margin-left: 5px;">${ultText}</span>
            <div style="font-size: 0.85rem; color: #bbbbbb; margin-top: 2px;">配點：${surv.detailsText}</div>
        </div>`;
    });

    html += "<h3>監管者</h3>";
    if (finalData.hunter) {
        const ultText = finalData.hunter.ultimates && finalData.hunter.ultimates.length > 0 ? `【${finalData.hunter.grid || finalData.hunter.ultimates.join(" + ")}】` : "【無大天賦偏策】";
        html += `<div style="margin-bottom: 12px; border-left: 3px solid #e74c3c; padding-left: 8px;">
            <strong style="color: #ff4d4d;">監管者：${finalData.hunter.name}</strong> 
            <span style="color: #e67e22; font-weight: bold; margin-left: 5px;">${ultText}</span>
            <div style="font-size: 0.85rem; color: #bbbbbb; margin-top: 2px;">配點：${finalData.hunter.detailsText}</div>
        </div>`;
    }
    resultArea.innerHTML = html;

    if (finalData.map) {
        mapName.innerText = finalData.map.name;
        const fixedSet = new Set();
        if (finalData.map.fixedBlocks) finalData.map.fixedBlocks.forEach(block => fixedSet.add(block + "-" + block));

        let tableHtml = '<table class="grid-board">';
        for (let r = 0; r < finalData.map.rows; r++) {
            tableHtml += '<tr>';
            for (let c = 0; c < finalData.map.cols; c++) {
                const key = r + "-" + c;
                if (fixedSet.has(key)) {
                    tableHtml += '<td style="background: #151515; color: #555;">X</td>';
                } else if (finalData.map.cellMarkers && finalData.map.cellMarkers[key] !== undefined) {
                    const marker = finalData.map.cellMarkers[key];
                    tableHtml += `<td style="color: ${marker === '監' ? '#ff4d4d' : '#ffd700'}; background: ${marker === '監' ? '#3a1a1a' : '#2f2715'};">${marker}</td>`;
                } else {
                    tableHtml += '<td></td>';
                }
            }
            tableHtml += '</tr>';
        }
        tableHtml += '</table>';
        boardArea.innerHTML = tableHtml;
    }
}
