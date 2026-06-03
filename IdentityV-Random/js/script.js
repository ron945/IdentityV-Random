// ==========================
// 第五人格抽取器
// script.js
// ==========================


// ==========================
// 初始化
// ==========================

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

// ==========================
// 開始抽取
// ==========================

// ==========================
// 開始抽取（融合 130 點天賦 + 精簡隱藏前置版本）
// ==========================
function generateOnce() {

    const resultArea =
        document.getElementById(
            "resultArea"
        );

    const mapName =
        document.getElementById(
            "mapName"
        );

    let html = "";

    // ==========================
    // 求生者（不重複）
    // ==========================
    html += "<h3>求生者</h3>";

    const usedSurvivors = [];

    for (let i = 0; i < 4; i++) {
        const role = getRandomRole(survivorRoles, usedSurvivors);

        if (role) {
            // 幫當前這位求生者隨機生成 130 點高階天賦
            const talentResult = generateAdvancedTalents(talentTree.survivor);
            
            // 組合大天賦文字
            const ultText = talentResult.ultimates.length > 0 
                ? `【${talentResult.ultimates.join(" + ")}】` 
                : "【無大天賦偏策】";

            // 【核心優化】過濾掉已經點了後續分支的前置天賦
            const filteredTalents = talentResult.allTalents.filter(t => {
                // 找出這個天賦在原本資料庫(talentTree.survivor)中的完整節點資料
                const originalNode = talentTree.survivor[t.id];
                if (originalNode && originalNode.children && originalNode.children.length > 0) {
                    // 檢查有沒有任何一個子節點在這次結果中被點過(level > 0)
                    const isAnyChildActive = originalNode.children.some(childId => {
                        return talentResult.allTalents.some(active => active.id === childId && active.level > 0);
                    });
                    // 如果有子節點被點了，這個前置節點就「不要」顯示 (回傳 false 隱藏)
                    if (isAnyChildActive) return false;
                }
                return true;
            });

            // 組合精簡後的詳細配點文字
            const detailsText = filteredTalents.map(t => `${t.name}(${t.level})`).join(", ");

            // 將角色名稱、大天賦與詳細配點一起渲染進 HTML
            html += `
                <div style="margin-bottom: 12px; border-left: 3px solid #ffcc00; padding-left: 8px;">
                    <strong style="color: #ffcc00;">${i + 1}號求生者：${role.name}</strong> 
                    <span style="color: #e67e22; font-weight: bold; margin-left: 5px;">${ultText}</span>
                    <div style="font-size: 0.85rem; color: #bbbbbb; margin-top: 2px; line-height: 1.4;">
                        配點：${detailsText}
                    </div>
                </div>
            `;
        }
    }

    // ==========================
    // 監管者
    // ==========================
    const hunter = getRandomRole(hunterRoles, []);
    html += "<h3>監管者</h3>";

    if (hunter) {
        // 幫當前這位監管者隨機生成 130 點高階天賦
        const talentResult = generateAdvancedTalents(talentTree.hunter);
        
        // 組合大天賦文字
        const ultText = talentResult.ultimates.length > 0 
            ? `【${talentResult.ultimates.join(" + ")}】` 
            : "回無大天賦偏策】";

        // 【核心優化】過濾掉已經點了後續分支的前置天賦
        const filteredTalents = talentResult.allTalents.filter(t => {
            const originalNode = talentTree.hunter[t.id];
            if (originalNode && originalNode.children && originalNode.children.length > 0) {
                const isAnyChildActive = originalNode.children.some(childId => {
                    return talentResult.allTalents.some(active => active.id === childId && active.level > 0);
                });
                if (isAnyChildActive) return false;
            }
            return true;
        });

        // 組合精簡後的詳細配點文字
        const detailsText = filteredTalents.map(t => `${t.name}(${t.level})`).join(", ");

        // 將監管者名稱、大天賦與詳細配點渲染進 HTML
        html += `
            <div style="margin-bottom: 12px; border-left: 3px solid #e74c3c; padding-left: 8px;">
                <strong style="color: #ff4d4d;">監管者：${hunter.name}</strong> 
                <span style="color: #e67e22; font-weight: bold; margin-left: 5px;">${ultText}</span>
                <div style="font-size: 0.85rem; color: #bbbbbb; margin-top: 2px; line-height: 1.4;">
                    配點：${detailsText}
                </div>
            </div>
        `;
    }

    // 渲染最終結果到中央面版
    resultArea.innerHTML = html;

        // ==========================
    // 地圖與隨機選點渲染（完整替換區塊）
    // ==========================
    const enabledMaps = maps.filter(function (map) {
        return !map.disabled;
    });

    if (enabledMaps.length > 0) {
        const mapIndex = Math.floor(Math.random() * enabledMaps.length);
        const selectedMap = enabledMaps[mapIndex];

        // 1. 顯示地圖名稱
        mapName.innerText = selectedMap.name;

        // 2. 獲取專門放表格的 boardArea
        const boardArea = document.getElementById("boardArea");
        
        // 3. 計算這張地圖哪些位置是障礙物 (轉換成 "row-col" 字串方便比對)
        const fixedSet = new Set();
        if (selectedMap.fixedBlocks && selectedMap.fixedBlocks.length > 0) {
            selectedMap.fixedBlocks.forEach(function (block) {
                fixedSet.add(block[0] + "-" + block[1]);
            });
        }

        // 4. 計算所有「空閒、可站人」的格子座標
        let emptyCells = [];
        for (let r = 0; r < selectedMap.rows; r++) {
            for (let c = 0; c < selectedMap.cols; c++) {
                if (!fixedSet.has(r + "-" + c)) {
                    emptyCells.push({ row: r, col: c });
                }
            }
        }

        // 5. 隨機打亂空網格順序，用來分配求生者(1~4)與監管者(監)
        emptyCells.sort(function () {
            return 0.5 - Math.random();
        });

        // 建立一個地圖標記字典：格式 {"row-col": "顯示的文字"}
        let cellMarkers = {};
        
        // 分配 4 個求生者出生點
        for (let i = 1; i <= 4; i++) {
            if (emptyCells.length > 0) {
                let cell = emptyCells.shift();
                cellMarkers[cell.row + "-" + cell.col] = i; // 顯示 1, 2, 3, 4
            }
        }
        // 分配 1 個監管者出生點
        if (emptyCells.length > 0) {
            let cell = emptyCells.shift();
            cellMarkers[cell.row + "-" + cell.col] = "監"; // 顯示 監
        }

        // 6. 開始動態繪製 HTML Table 表格
        let tableHtml = '<table class="grid-board">';
        for (let r = 0; r < selectedMap.rows; r++) {
            tableHtml += '<tr>';
            for (let c = 0; c < selectedMap.cols; c++) {
                const key = r + "-" + c;
                
                if (fixedSet.has(key)) {
                    // 如果是固定障礙物，顯示 X，並加上稍微暗色的背景
                    tableHtml += '<td style="background: #151515; color: #555; text-shadow: none;">X</td>';
                } else if (cellMarkers[key] !== undefined) {
                    // 如果是角色出生點
                    const marker = cellMarkers[key];
                    if (marker === "監") {
                        // 監管者顯示鮮豔紅色
                        tableHtml += '<td style="color: #ff4d4d; background: #3a1a1a; border-color: #8b0000;">' + marker + '</td>';
                    } else {
                        // 求生者顯示閃亮金色
                        tableHtml += '<td style="color: #ffd700; background: #2f2715;">' + marker + '</td>';
                    }
                } else {
                    // 完全空白的正常草叢或空地
                    tableHtml += '<td></td>';
                }
            }
            tableHtml += '</tr>';
        }
        tableHtml += '</table>';

        // 7. 將繪製好的地圖塞進畫面
        boardArea.innerHTML = tableHtml;
    }
}


// 全域變數，供複製代碼功能抓取當下狀態
let lastGeneratedData = null;

// ==========================================
// 【更新】開始抽取（支援 130點、精簡前置、地圖選點與代碼分享連動）
// ==========================================
function generateOnce(externalData = null) {
    const resultArea = document.getElementById("resultArea");
    const mapName = document.getElementById("mapName");
    const boardArea = document.getElementById("boardArea");
    const roomCodeInput = document.getElementById("roomCode");

    let finalData = {};

    // 判斷是讀取別人的代碼，還是自己全新抽取
    if (externalData) {
        finalData = externalData;
    } else {
        // ---- 1. 求生者抽取 ----
        let survivors = [];
        const usedSurvivors = [];
        for (let i = 0; i < 4; i++) {
            const role = getRandomRole(survivorRoles, usedSurvivors);
            if (role) {
                const talentResult = generateAdvancedTalents(talentTree.survivor);
                const filtered = talentResult.allTalents.filter(t => {
                    const originalNode = talentTree.survivor[t.id];
                    if (originalNode && originalNode.children && originalNode.children.length > 0) {
                        return !originalNode.children.some(childId => talentResult.allTalents.some(active => active.id === childId && active.level > 0));
                    }
                    return true;
                });
                survivors.push({
                    name: role.name,
                    ultimates: talentResult.ultimates,
                    detailsText: filtered.map(t => `${t.name}(${t.level})`).join(", ")
                });
            }
        }

        // ---- 2. 監管者抽取 ----
        let hunterData = null;
        const hunter = getRandomRole(hunterRoles, []);
        if (hunter) {
            const talentResult = generateAdvancedTalents(talentTree.hunter);
            const filtered = talentResult.allTalents.filter(t => {
                const originalNode = talentTree.hunter[t.id];
                if (originalNode && originalNode.children && originalNode.children.length > 0) {
                    return !originalNode.children.some(childId => talentResult.allTalents.some(active => active.id === childId && active.level > 0));
                }
                return true;
            });
            hunterData = {
                name: hunter.name,
                ultimates: talentResult.ultimates,
                detailsText: filtered.map(t => `${t.name}(${t.level})`).join(", ")
            };
        }

        // ---- 3. 地圖與選點 ----
        let mapData = null;
        const enabledMaps = maps.filter(map => !map.disabled);
        if (enabledMaps.length > 0) {
            const mapIndex = Math.floor(Math.random() * enabledMaps.length);
            const selectedMap = enabledMaps[mapIndex];

            const fixedSet = new Set();
            if (selectedMap.fixedBlocks) {
                selectedMap.fixedBlocks.forEach(block => fixedSet.add(block + "-" + block));
            }

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
                cellMarkers[cell.row + "-" + cell.col] = "監";
            }

            mapData = {
                name: selectedMap.name,
                rows: selectedMap.rows,
                cols: selectedMap.cols,
                fixedBlocks: selectedMap.fixedBlocks || [],
                cellMarkers: cellMarkers
            };
        }

        finalData = {
            survivors: survivors,
            hunter: hunterData,
            map: mapData
        };
    }

    lastGeneratedData = finalData;

    // 自己抽籤時，自動將結果打包成 Base64 字串並填入右邊輸入框
    if (!externalData && roomCodeInput) {
        const jsonStr = JSON.stringify(finalData);
        roomCodeInput.value = btoa(unescape(encodeURIComponent(jsonStr)));
    }

    // ---- 4. 開始渲染畫面 ----
    let html = "";
    html += "<h3>求生者</h3>";
    finalData.survivors.forEach((surv, i) => {
        const ultText = surv.ultimates.length > 0 ? `【${surv.ultimates.join(" + ")}】` : "【無大天賦偏策】";
        html += `
            <div style="margin-bottom: 12px; border-left: 3px solid #ffcc00; padding-left: 8px;">
                <strong style="color: #ffcc00;">${i + 1}號求生者：${surv.name}</strong> 
                <span style="color: #e67e22; font-weight: bold; margin-left: 5px;">${ultText}</span>
                <div style="font-size: 0.85rem; color: #bbbbbb; margin-top: 2px;">配點：${surv.detailsText}</div>
            </div>
        `;
    });

    html += "<h3>監管者</h3>";
    if (finalData.hunter) {
        const ultText = finalData.hunter.ultimates.length > 0 ? `【${finalData.hunter.ultimates.join(" + ")}】` : "【無大天賦偏策】";
        html += `
            <div style="margin-bottom: 12px; border-left: 3px solid #e74c3c; padding-left: 8px;">
                <strong style="color: #ff4d4d;">監管者：${finalData.hunter.name}</strong> 
                <span style="color: #e67e22; font-weight: bold; margin-left: 5px;">${ultText}</span>
                <div style="font-size: 0.85rem; color: #bbbbbb; margin-top: 2px;">配點：${finalData.hunter.detailsText}</div>
            </div>
        `;
    }
    resultArea.innerHTML = html;

    // 渲染地圖
    if (finalData.map) {
        mapName.innerText = finalData.map.name;
        const fixedSet = new Set();
        finalData.map.fixedBlocks.forEach(block => fixedSet.add(block + "-" + block));

        let tableHtml = '<table class="grid-board">';
        for (let r = 0; r < finalData.map.rows; r++) {
            tableHtml += '<tr>';
            for (let c = 0; c < finalData.map.cols; c++) {
                const key = r + "-" + c;
                if (fixedSet.has(key)) {
                    tableHtml += '<td style="background: #151515; color: #555;">X</td>';
                } else if (finalData.map.cellMarkers[key] !== undefined) {
                    const marker = finalData.map.cellMarkers[key];
                    if (marker === "監") {
                        tableHtml += `<td style="color: #ff4d4d; background: #3a1a1a; border-color: #8b0000;">${marker}</td>`;
                    } else {
                        tableHtml += `<td style="color: #ffd700; background: #2f2715;">${marker}</td>`;
                    }
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

// ==========================================
// 【正式實裝】點擊按鈕複製結果代碼
// ==========================================
// 升級版：複製時直接幫你加上網址，點開連結就能看
function copyRoomCode() {
    const roomCodeInput = document.getElementById("roomCode");
    const roomStatus = document.getElementById("roomStatus");
    if (!roomCodeInput || !roomCodeInput.value) {
        alert("請先點擊中間的【開始抽取】生成結果，才能複製代碼喔！");
        return;
    }
    
    // 🎯 自動幫你把當前網頁的網址 + 代碼組合成一個「超連結」
    const shareLink = window.location.origin + window.location.pathname + "?code=" + roomCodeInput.value;
    
    // 複製這個特製的超連結
    navigator.clipboard.writeText(shareLink);
    if (roomStatus) {
        roomStatus.innerHTML = "<span style='color: #2ECC71; font-weight: bold;'>📋 網址連結已複製！隊友點開連結就能直接看到結果喔！</span>";
    }
}


// ==========================================
// 【正式實裝】貼上代碼還原同步畫面（已修正大括號）
// ==========================================
function loadRoomCode() {
    const roomCodeInput = document.getElementById("roomCode");
    const roomStatus = document.getElementById("roomStatus");
    if (!roomCodeInput || !roomCodeInput.value.trim()) {
        alert("請先將別人的代碼貼進輸入框中！");
        return;
    }
    try {
        // 🎯 使用最萬能、不挑中文的解碼方式
        const decodedStr = decodeURIComponent(atob(roomCodeInput.value.trim()).split('').map(function(c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
        
        const importedData = JSON.parse(decodedStr);
        generateOnce(importedData); // 還原畫面
        
        if (roomStatus) {
            roomStatus.innerHTML = "<span style='color: #ffd700; font-weight: bold;'>📥 成功讀取他人代碼！畫面已完全同步。</span>";
        }
    } catch (e) {
        alert("❌ 錯誤：代碼格式不正確，請確認是否有複製完整！");
        if (roomStatus) {
            roomStatus.innerHTML = "<span style='color: #E74C3C; font-weight: bold;'>❌ 讀取失敗，代碼無效。</span>";
        }
        console.error(e);
    }
} // 👈 【關鍵修正】這裡是你原本漏掉的、專屬於 loadRoomCode 的結尾大括號！


// ==========================================
// 🎯 【暴力不卡死版】直接檢查網址參數並還原（已與上方函式完全獨立）
// ==========================================
(function() {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("code");
    
    if (code) {
        // 設定定時器，每 150 毫秒檢查一次 HTML 容器好了沒，好了就立刻暴力畫出來
        let checkTimer = setInterval(function() {
            const resultArea = document.getElementById("resultArea");
            const mapName = document.getElementById("mapName");
            const boardArea = document.getElementById("boardArea");

            // 確保 HTML 容器都已經在網頁上就緒了
            if (resultArea && mapName && boardArea) {

                try {
                    // 🎯 使用最萬能、不挑字元的瀏覽器原生解碼寫法
                    const decodedStr = decodeURIComponent(atob(code.trim()).split('').map(function(c) {
                        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
                    }).join(''));
                    
                    const importedData = JSON.parse(decodedStr);

                    // 安全防禦：如果資料還沒完全解開，繼續等待下一次
                    if (!importedData || !importedData.survivors || !importedData.map) {
                        return; 
                    }

                    // 順利過關！關閉計時器開始渲染
                    clearInterval(checkTimer);

                    // 幫忙把代碼填入右側輸入框
                    const roomCodeInput = document.getElementById("roomCode");
                    if (roomCodeInput) roomCodeInput.value = code;

                    // 1. 渲染求生者畫面
                    let html = "<h3>求生者</h3>";
                    importedData.survivors.forEach((surv, i) => {
                        const ultText = surv.ultimates && surv.ultimates.length > 0 
                            ? `【${surv.ultimates.join(" + ")}】` 
                            : "【無大天賦偏策】";
                        html += `
                            <div style="margin-bottom: 12px; border-left: 3px solid #ffcc00; padding-left: 8px;">
                                <strong style="color: #ffcc00;">${i + 1}號求生者：${surv.name}</strong> 
                                <span style="color: #e67e22; font-weight: bold; margin-left: 5px;">${ultText}</span>
                                <div style="font-size: 0.85rem; color: #bbbbbb; margin-top: 2px;">配點：${surv.detailsText}</div>
                            </div>
                        `;
                    });

                    // 2. 渲染監管者畫面
                    html += "<h3>監管者</h3>";
                    if (importedData.hunter) {
                        const ultText = importedData.hunter.ultimates && importedData.hunter.ultimates.length > 0 
                            ? `【${importedData.hunter.ultimates.join(" + ")}】` 
                            : "【無大天賦偏策】";
                        html += `
                            <div style="margin-bottom: 12px; border-left: 3px solid #e74c3c; padding-left: 8px;">
                                <strong style="color: #ff4d4d;">監管者：${importedData.hunter.name}</strong> 
                                <span style="color: #e67e22; font-weight: bold; margin-left: 5px;">${ultText}</span>
                                <div style="font-size: 0.85rem; color: #bbbbbb; margin-top: 2px;">配點：${importedData.hunter.detailsText}</div>
                            </div>
                        `;
                    }
                    resultArea.innerHTML = html;

                    // 3. 渲染地圖與格子
                    mapName.innerText = importedData.map.name;
                    
                    const fixedSet = new Set();
                    if (importedData.map.fixedBlocks) {
                        importedData.map.fixedBlocks.forEach(block => fixedSet.add(block + "-" + block));
                    }

                    let tableHtml = '<table class="grid-board">';
                    for (let r = 0; r < importedData.map.rows; r++) {
                        tableHtml += '<tr>';
                        for (let c = 0; c < importedData.map.cols; c++) {
                            const key = r + "-" + c;
                            if (fixedSet.has(key)) {
                                tableHtml += '<td style="background: #151515; color: #555;">X</td>';
                            } else if (importedData.map.cellMarkers && importedData.map.cellMarkers[key] !== undefined) {
                                const marker = importedData.map.cellMarkers[key];
                                if (marker === "監") {
                                    tableHtml += `<td style="color: #ff4d4d; background: #3a1a1a; border-color: #8b0000;">${marker}</td>`;
                                } else {
                                    tableHtml += `<td style="color: #ffd700; background: #2f2715;">${marker}</td>`;
                                }
                            } else {
                                tableHtml += '<td></td>';
                            }
                        }
                        tableHtml += '</tr>';
                    }
                    tableHtml += '</table>';
                    boardArea.innerHTML = tableHtml;

                    // 4. 更新狀態提示
                    const roomStatus = document.getElementById("roomStatus");
                    if (roomStatus) roomStatus.innerHTML = "<span style='color: #ffd700; font-weight: bold;'>🔗 已自動透過網址連結同步抽籤結果！</span>";
                    
                    lastGeneratedData = importedData;

                } catch (e) {
                    console.error("網址暴力解析失敗，等待下一波加載:", e);
                }
            }
        }, 150);
    }
})();

