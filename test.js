import pinyin from "pinyin";
import fetch from 'node-fetch'

// 声母
const INITIALS = ["zh", "z", "y", "x", "w", "t", "sh", "s", "r", "q", "p", "n", "m", "l", "k", "j", "h", "g", "f", "d", "ch",
    "c", "b"];
// 韵母
const FINALS = [
    "ün", "üe", "üan", "ü", "uo", "un", "ui", "ue", "uang", "uan", "uai", "ua", "ou", "iu", "iong", "ong", "io", "ing",
    "in", "ie", "iao", "iang", "ian", "ia", "er", "eng", "en", "ei", "ao", "ang", "an", "ai", "u", "o", "i", "e", "a"
];


function get_pinyin(idiom) {
    let pys = pinyin(idiom, {
        style: pinyin.STYLE_TONE2,
        heteronym: false
    });
    console.log(pys);
    let results = [];
    for (let p of pys) {
        let py = p[0];
        let tone = "";
        if (/\d/.test(py[py.length - 1])) {
            tone = py[py.length - 1];
            py = py.slice(0, -1);
        }
        let initial = "";
        for (let i of INITIALS) {
            if (py.startsWith(i)) {
                initial = i;
                break;
            }
        }
        let final = "";
        for (let f of FINALS) {
            if (py.endsWith(f)) {
                final = f;
                break;
            }
        }
        results.push([initial, final, tone]);  // 声母，韵母，声调
    }
    return results;
}

console.log(32/98 * 100);