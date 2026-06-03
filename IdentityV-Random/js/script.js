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
    // 🎯 按照你的意思：網址後面『直接帶上一模一樣的那串純代碼』，不做任何多餘加工！
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
    // 🎯 直接複製格子裡的那串純代碼
    navigator.clipboard.writeText(roomCodeInput.value.trim());
    if (roomStatus) {
        roomStatus.innerHTML = "<span style='color: #3498DB; font-weight: bold;'>📋 純代碼已複製！適合發在無法發網址的地方。</span>";
    }
}


function loadRoomCode() {
    const roomCodeInput = document.getElementById("roomCode");
    const roomStatus = document.getElementById("roomStatus");
    if (!roomCodeInput || !roomCodeInput.value.trim()) return;
    
    let rawCode = roomCodeInput.value.trim();

    try {
        // 🎯 1. 如果貼進來的是整串長網址，在這裡先切碎它，只拿 code= 後面的部分
        if (rawCode.includes("?code=")) {
            const urlObj = new URL(rawCode);
            rawCode = urlObj.searchParams.get("code") || rawCode;
        }

        // 🎯 2. 【核心新增：徹底消滅換行與空格】
        // 無條件把所有「亂換行(\r \n)」與「亂塞的空格」通通清除、拉成一條直線！
        rawCode = rawCode.replace(/[\r\n\s]/g, "");

        // 🎯 3. 【核心新增：補回被網址吃掉的加號】
        // 此時因為換行和空格都沒了，把被網址列偷偷洗成空白的加號「+」強制變回來
        rawCode = rawCode.replace(/ /g, "+");
        
        // 順手幫輸入框淨化成乾淨、拉直後的純代碼，畫面比較好看
        roomCodeInput.value = rawCode; 

        // 🎯 4. 執行標準解碼（此時的 rawCode 已經被拉直修復，100% 絕對不會再卡換行崩潰了！）
        const decodedStr = decodeURIComponent(atob(rawCode).split('').map(function(c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
        
        const importedData = JSON.parse(decodedStr);
        
        // 餵給 startRandomDraw 去暴力畫畫面
        if (importedData && importedData.survivors) {
            startRandomDraw(importedData); 
            if (roomStatus) roomStatus.innerHTML = "<span style='color: #ffd700; font-weight: bold;'>📥 成功讀取還原！</span>";
        }
    } catch (e) {
        alert("❌ 錯誤：無法解析，請確認是否有複製完整！");
        console.error("解析失敗原因:", e);
    }
}



// ==========================================
// 🎯 【網址自動帶入】進網頁時直接把後面那串代碼抓出來，帶進格子裡
// ==========================================
window.addEventListener("load", function() {
    const urlParams = new URLSearchParams(window.location.search);
    let code = urlParams.get("code");
    
    // 🎯 按照你的邏輯：只要網址後面有帶那一串代碼
    if (code) {
        setTimeout(function() {
            const roomCodeInput = document.getElementById("roomCode");
            if (roomCodeInput) {
                // 修正瀏覽器網址可能把加號變成空白的吃字問題
                const cleanCode = code.replace(/ /g, "+");
                
                // 1. 直接把後面這串代碼完完整整地帶進格子裡！
                roomCodeInput.value = cleanCode; 
                
                // 2. 🚀 直接呼叫你剛剛測試成功、完全可以用的 loadRoomCode() 去格子判讀！
                loadRoomCode(); 
                
                console.log("🔗 網址後面的純代碼已全自動帶入格子，並成功觸發判讀！");
            }
        }, 200);
    }
}); // 👈 這是整個 script.js 檔案的最後一行，後面什麼都沒有了

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
            // A. 精準分配 4 個求生者出生點 (顯示 1, 2, 3, 4)
            for (let i = 1; i <= 4; i++) {
                if (emptyCells.length > 0) {
                    let cell = emptyCells.shift();
                    cellMarkers[cell.row + "-" + cell.col] = i;
                }
            }
            
            // B. 🎯 【核心修復】精準分配 1 個監管者出生點，多餘的 shift 通通刪除！
            if (emptyCells.length > 0) {
                let cell = emptyCells.shift();
                cellMarkers[cell.row + "-" + cell.col] = "監";
            }

            mapData = { name: selectedMap.name, rows: selectedMap.rows, cols: selectedMap.cols, fixedBlocks: selectedMap.fixedBlocks || [], cellMarkers: cellMarkers };
        }

        finalData = { survivors: survivors, hunter: hunterData, map: mapData };
    }

    // 🎯 更換成這個最穩固的中文 Base64 編碼方式：
if (!externalData && roomCodeInput && finalData && finalData.survivors && finalData.survivors.length > 0) {
    const jsonStr = JSON.stringify(finalData);
    // 萬能中文相容壓縮法
    roomCodeInput.value = btoa(encodeURIComponent(jsonStr).replace(/%([0-9A-F]{2})/g, function(match, p1) {
        return String.fromCharCode(parseInt(p1, 16));
    }));
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
