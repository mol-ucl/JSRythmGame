const VIDEO_SIZE = {
        width: 640,
        height: 320
    },
    CANVAS = {
        back: 0,
        layer:2
    },
    GAME_MODE ={
        standby: 1,
        play: 2,
        playData: 3,
        end: 4,
        cancel: 5,
        wait: 9,
        state: null,
    },
    JUDGE = {
        perfect: 0,
        excellent: 1,
        good: 2,
        normal: 3,
        miss: 4,
        size: 4,
        score: [],
        text: ["perfect","excellent","good","normal","miss"],
    },
    BAR_COLOR = [
        "#ff007f",
        "#007fff",
        "#7f00ff",
        "#ffff00",
        "#00ff7f",
        "#ffadd6",
        "#add7ff",
        "#adffad",
        "#ffffab",
        "#d7adff",
    ],
    KEY = [
        ["f","j"],
        ["d","f","j","k"],
        ["s","d","f","j","k","l"],
        ["a","s","d","f","j","k","l",";"],
        ["a","s","d","f","g","h","j","k","l",";"],
    ];

let player;
let isSP;
let isPortrait;
let ctx;
let cvSize;
let rectRange;
let inputRange;
let touchRange;
let notes;
let playData;
let keyList;

let tim = [];
let li = [];

let bar;
class Bar {
    #width = rectRange.width - rectRange.rightSpace;
    #height = rectRange.height;
    constructor(i,color){
        this.x = rectRange.width * i + rectRange.leftSpace;
        this.color = color;
    }
    draw(y){
        ctx.layer.fillStyle = this.color;
        ctx.layer.fillRect(this.x, y, this.#width, this.#height);
    }
}


const setStandby = () =>{
    player.stopVideo();

    setGameData();
    gameStandby();
};

const setStandbyExpert = () =>{
    player.stopVideo();
    clearCanvas(ctx.back);
    clearCanvas(ctx.layer);
    setGameDataExpert();
    gameStandby();
};
const setStandbyRandomExpert = () =>{
    player.stopVideo();
    clearCanvas(ctx.back);
    clearCanvas(ctx.layer);
    setGameDataRandomExpert();
    gameStandby();
};

const setGameData = () =>{
    notes = {
        // lineSize: 4,
        lineSize: FILE.lineSize,
        // timing: null,
        timing: FILE.timing,
        // line: null,
        line: FILE.line,
        index: 0,
        offset: 0,
        getSize(){
            return this.timing.length;
        },
        get isEnd(){
            return this.timing.length <= this.offset;
        },
    };
    // notes.line = [];
    // for (let i=0; i < timing.length; ++i){
    //     notes.line[i] = Math.floor(Math.random() * notes.lineSize);
    // }
};

const setGameDataNormal = () =>{
    notes = {
        // lineSize: 4,
        lineSize: FILENORMAL.lineSize,
        // timing: null,
        timing: FILENORMAL.timing,
        // line: null,
        line: FILENORMAL.line,
        index: 0,
        offset: 0,
        getSize(){
            return this.timing.length;
        },
        get isEnd(){
            return this.timing.length <= this.offset;
        },
    };
};

const setGameDataHard = () =>{
    notes = {
        // lineSize: 4,
        lineSize: FILEHARD.lineSize,
        // timing: null,
        timing: FILEHARD.timing,
        // line: null,
        line: FILEHARD.line,
        index: 0,
        offset: 0,
        getSize(){
            return this.timing.length;
        },
        get isEnd(){
            return this.timing.length <= this.offset;
        },
    };
};

const setGameDataRandom = () =>{
    notes = {
        // lineSize: 4,
        lineSize: FILEHARD.lineSize,
        // timing: null,
        timing: FILEHARD.timing,
        // line: null,
        line: FILEHARD.line,
        index: 0,
        offset: 0,
        getSize(){
            return this.timing.length;
        },
        get isEnd(){
            return this.timing.length <= this.offset;
        },
    };
    notes.line = [];
    for (let i=0; i < notes.timing.length; ++i){
        notes.line[i] = Math.floor(Math.random() * notes.lineSize);
    }
};

const setGameDataExpert = () =>{
    notes = {
        // lineSize: 4,
        lineSize: FILEEXPERT.lineSize,
        // timing: null,
        timing: FILEEXPERT.timing,
        // line: null,
        line: FILEEXPERT.line,
        index: 0,
        offset: 0,
        getSize(){
            return this.timing.length;
        },
        get isEnd(){
            return this.timing.length <= this.offset;
        },
    };
};

const setGameDataRandomExpert = () =>{
    notes = {
        // lineSize: 4,
        lineSize: FILEEXPERT.lineSize,
        // timing: null,
        timing: FILEEXPERT.timing,
        // line: null,
        line: FILEEXPERT.line,
        index: 0,
        offset: 0,
        getSize(){
            return this.timing.length;
        },
        get isEnd(){
            return this.timing.length <= this.offset;
        },
    };
    notes.line = [];
    for (let i=0; i < notes.timing.length; ++i){
        notes.line[i] = Math.floor(Math.random() * notes.lineSize);
    }
};

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve,ms));

const clearCanvas = (ctx) => ctx.clearRect(0,0,cvSize.width,cvSize.height);

const padZero = (value, digit) => value.toString().padStart(digit, "0");

const gameStandby = async () => {
    GAME_MODE.state = GAME_MODE.standby;

    const drawLine = () => {
        ctx.back.lineWidth = 1;
        ctx.back.strokeStyle = "#ffffff77";
        ctx.back.beginPath();
        for (let i = 0, size = notes.lineSize + 1; i< size; ++i){
            let x = rectRange.width * i - 0.5;
            if (i === 0) ++x;
            ctx.back.moveTo(x,0);
            ctx.back.lineTo(x,cvSize.height);
        }
        ctx.back.stroke();
    };

    const drawBoxes = () => {
        const drawBox = (i) => {
            let x = rectRange.width * i + rectRange.leftSpace + 1,
            width = rectRange.width - rectRange.rightSpace;
            ctx.back.strokeStyle = BAR_COLOR[i];
            ctx.back.strokeRect(x, rectRange.y + 0.5, width, rectRange.height);
            ctx.back.fillStyle = BAR_COLOR[i] + "55";
            ctx.back.fillRect(x, rectRange.y, width, rectRange.height);
        };
        ctx.back.lineWidth = 2;
        for (let i = 0; i < notes.lineSize; ++i) drawBox(i);
    };

    const text_e = "PRESS 'E': EASY MODE";
    const drawText_E = () => {
        ctx.layer.font = "28pt sans-serif";
        ctx.layer.fillStyle = "white";
        ctx.layer.fillText(text_e, (cvSize.width - ctx.layer.measureText(text_e).width) / 2, cvSize.height / 1.86);
    };
    const text_n = "PRESS 'N': NORMAL MODE";
    const drawText_N = () => {
        ctx.layer.font = "28pt sans-serif";
        ctx.layer.fillStyle = "white";
        ctx.layer.fillText(text_n, (cvSize.width - ctx.layer.measureText(text_n).width) / 2, cvSize.height / 1.72);
    };
    const text_h = "PRESS 'H': HARD MODE";
    const drawText_H = () => {
        ctx.layer.font = "28pt sans-serif";
        ctx.layer.fillStyle = "white";
        ctx.layer.fillText(text_h, (cvSize.width - ctx.layer.measureText(text_h).width) / 2, cvSize.height / 1.6);
    };
    const text_r = "PRESS 'R': RONDOM MODE";
    const drawText_R = () => {
        ctx.layer.font = "28pt sans-serif";
        ctx.layer.fillStyle = "white";
        ctx.layer.fillText(text_r, (cvSize.width - ctx.layer.measureText(text_r).width) / 2, cvSize.height / 1.5);
    };

    const text2 = "D key     F key     J key     K key";
    const drawexp = () => {
        ctx.layer.font = "28pt sans-serif";
        ctx.layer.fillStyle = "white";
        ctx.layer.fillText(text2, (cvSize.width - ctx.layer.measureText(text2).width) / 2, cvSize.height / 1.3);
    };

    const text3 = "S    D   F   J   K   L";
    const drawexp2 = () => {
        ctx.layer.font = "28pt sans-serif";
        ctx.layer.fillStyle = "white";
        ctx.layer.fillText(text3, (cvSize.width - ctx.layer.measureText(text3).width) / 2, cvSize.height / 1.3);
    };

    drawLine();
    drawBoxes();

    let b = false;
    while (GAME_MODE.state === GAME_MODE.standby){
        // clearCanvas(ctx.layer);
        if((b = !b)) {
            drawText_E();
            drawText_N();
            drawText_H();
            drawText_R();
            drawexp();
        }
        await sleep(500);
    }
};

const initGame = () =>{
    playData = {
        score: 0,
        combo: 0,
        maxCombo: 0,
        judge: null,
        judgeCount: JUDGE.text.map(() => 0),
        isInput: false,
        inputLine: null,
        over: false,
        index: 0,
        speed: 2,
        highspeed: 0.5,
        setInput(line, over){
            this.isInput = true;
            this.inputLine = line;
            this.over = over;
            this.index = notes.index;
        }
    };
    const barColor = BAR_COLOR.map((value) => value + "cc");
    bar = [];
    for (let i = 0; i<notes.lineSize; ++i) bar[i] = new Bar(i, barColor[i]);

    keyList = KEY[notes.lineSize / 2 - 1];
};

const initGame2 = () =>{
    playData = {
        score: 0,
        combo: 0,
        maxCombo: 0,
        judge: null,
        judgeCount: JUDGE.text.map(() => 0),
        isInput: false,
        inputLine: null,
        over: false,
        index: 0,
        speed: 2,
        highspeed: 1,
        setInput(line, over){
            this.isInput = true;
            this.inputLine = line;
            this.over = over;
            this.index = notes.index;
        }
    };
    const barColor = BAR_COLOR.map((value) => value + "cc");
    bar = [];
    for (let i = 0; i<notes.lineSize; ++i) bar[i] = new Bar(i, barColor[i]);

    keyList = KEY[notes.lineSize / 2 - 1];
};

let flag = 0;
const gamePlay = async () =>{
    GAME_MODE.state = GAME_MODE.play;
    if(flag == 0){
        initGame();
    }else{
        initGame2();
    }
    // initGame();

    const effectColor = BAR_COLOR.map((value) => value + "77");
    let drawCount = 0;

    const setInputMiss = () => {
        playData.combo = 0;
        ++playData.judgeCount[(playData.judge = JUDGE.miss)];
    };

    const drawTimingBar = () =>{
        const current = (player.getCurrentTime() * 1000) | 0,
        size = notes.getSize();
        // console.log(current);
        for(let i = notes.offset; i < size; ++i){
            const y = (current - notes.timing[i]) *playData.highspeed + rectRange.y - rectRange.height;
            if (y < 0) break;
            bar[notes.line[i]].draw(y);
            if (i === notes.index && inputRange.bottom[JUDGE.normal] < y){
                setInputMiss();
                drawCount = 30;
                notes.index = i + 1;
            }
            if (cvSize.height < y) notes.offset = i + 1;
        }
    };

    const drawJudge = () =>{
        if(drawCount <= 0) return;
        ctx.layer.font = "24pt sans-serif";
        ctx.layer.fillStyle = "white";
        ctx.layer.fillText(
            JUDGE.text[playData.judge],
            (cvSize.width-ctx.layer.measureText(JUDGE.text[playData.judge]).width)/2,
            cvSize.height / 2 + drawCount
        );
        if (1 < playData.combo){
            const text = playData.combo + " Combo";
            ctx.layer.fillText(
                text,
                (cvSize.width - ctx.layer.measureText(text).width)/2,
                cvSize.height / 1.7 + drawCount
            );
        }
        --drawCount;
    };

    const drawInputEffect = () =>{
        ctx.layer.fillStyle = effectColor[playData.inputLine];
        ctx.layer.fillRect(rectRange.width * playData.inputLine + rectRange.leftSpace,
            0,
            rectRange.width - rectRange.rightSpace, cvSize.height);
    };

    const judge = () =>{
        if(playData.isInput){
            if(playData.judge === JUDGE.miss){
                setInputMiss();
            }else{
                notes.offset = ++notes.index;
                ++playData.judgeCount[playData.judge];
                if(playData.maxCombo < ++playData.combo) playData.maxCombo = playData.combo;
            }

            if(playData.over && notes.index === playData.index) notes.offset = ++notes.index;

            drawInputEffect();

            playData.isInput = false;
            drawCount = 30;
        }
    };




    const drawPlayData = () =>{
        clearCanvas(ctx.back);
        clearCanvas(ctx.layer);
        let digit = 10;
        while (true){
            if(notes.getSize() < digit){
                digit = String(digit - 1).length;
                break;
            }
            digit *= 10;
        }
        ctx.layer.font = "30pt sans-serif";
        ctx.layer.fillStyle = "white";
        const measure = ctx.layer.measureText(
            JUDGE.text[JUDGE.excellent]+" : "+padZero(playData.judgeCount[JUDGE.excellent], digit)
            ),
            right = (cvSize.width - measure.width) / 2,
            textHeight = measure.actualBoundingBoxAscent + measure.actualBoundingBoxDescent + 8,
            list = [...JUDGE.text, "combo"],
            data = [...playData.judgeCount, playData.maxCombo];
        for (let [i, text] of list.entries()){
            text += " : " + padZero(data[i], digit);
            const x = i === JUDGE.excellent ? right : cvSize.width - right - ctx.layer.measureText(text).width;
            ctx.layer.fillText(text, x, cvSize.height / 2 + textHeight * i);
        }
    };

    const gameEnd = () =>{
        GAME_MODE.state = GAME_MODE.playData;
        // const blob = new Blob(tim,{type:"text/plain"});
        // const link = document.createElement('a');
        // link.href = URL.createObjectURL(blob);
        // link.download = 'tim.txt';
        // link.click();
        // const blob2 = new Blob(li,{type:"text/plain"});
        // const link2 = document.createElement('a');
        // link.href = URL.createObjectURL(blob2);
        // link.download = 'li.txt';
        // link.click();
        drawPlayData();
        setTimeout(() => {
            notes = playData = bar = null;
            GAME_MODE.state = GAME_MODE.end;
        }, 1000);
    };

    player.playVideo();

    while(GAME_MODE.state === GAME_MODE.play){
        clearCanvas(ctx.layer);
        judge();
        drawJudge();
        drawTimingBar();

        if (notes.isEnd) gameEnd();
        await sleep(16);
    }
};

const setInput = (line) =>{
    const y = (((player.getCurrentTime() * 1000) | 0) - notes.timing[notes.index]) / playData.speed + rectRange.y;
    const t = player.getCurrentTime() * 1000;
    if (inputRange.top[3] < y){
    playData.setInput(line, inputRange.over < y);}
    playData.judge = JUDGE.miss;
    if(notes.index > 0){
        if (line === notes.line[notes.index] || (notes.timing[notes.index+1] - t < 50 &&line === notes.line[notes.index+1]) || (t - notes.timing[notes.index-1] < 50 &&  line === notes.line[notes.index-1])){
            for(let i = 0; i < JUDGE.size; ++i){
                if(inputRange.top[i] < y && y < inputRange.bottom[i]){
                    playData.judge = i;
                    break;
                }
                if(i === 3){
                    playData.judge = 4;
                    break;
                }
            }
        }
    }
    else if (line === notes.line[notes.index] || (notes.timing[notes.index+1] - t < 50 && line === notes.line[notes.index+1])){
        for(let i = 0; i < JUDGE.size; ++i){
            if(inputRange.top[i] < y && y < inputRange.bottom[i]){
                playData.judge = i;
                break;
            }
            if(i === 3){
                playData.judge = 4;
                break;
            }
        }
    }
};

const touch = (e) =>{
    if(touchRange.top < e.pageY && e.pageY < cvSize.height){
        for (let i = 0; i < notes.lineSize; ++i){
            if (touchRange.getLeft(i) < e.pageX && e.pageX < touchRange.getRight(i)){
                setInput(i);
                break;
            }
        }
    }
};

const push = (kb) =>{
    for(let [i, key] of keyList.entries()){
        if (key === kb){
            setInput(i);
            let time = player.getCurrentTime() * 1000;
            // tim.push(String(parseInt(time))+",");
            // li.push(String(i)+",");
            // console.log(i);
            // console.log(time);
            break;
        }
    }
};

const input = (isTouch, e) =>{
    switch (GAME_MODE.state){
        case GAME_MODE.standby:
            gamePlay();
            break;
        case GAME_MODE.play:
            isTouch ? touch(e.changedTouches[0]) : push(e.key);
            break;
        case GAME_MODE.end:
            break;
    }
};
// let flag = 0;
window.onload = () => {
    document.documentElement.addEventListener("touchstart", (e) => input(true, e));
    document.onkeydown = (e) =>{
        // console.log(e);
        if(e.key ==="e"){
            setGameData();
            // playData.speed = 0.5;
        }else if(e.key ==="n"){
            setGameDataNormal();
            // playData.speed = 0.5;
        }else if(e.key === "h"){
            flag = 1;
            setGameDataHard();
        }else if(e.key === "x"){
            flag = 1;
            setStandbyExpert();
        }else if(e.key === "r"){
            flag = 1;
            setGameDataRandom();
        }else if(e.key === "z"){
            flag = 1;
            setStandbyRandomExpert();
        }
        if (e.repeat) return;
        input(false, e);
    };
};