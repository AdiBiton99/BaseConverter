/*Adi Biton 209355064
  Tmira Ohana 206451585*/

// שמירת הבחירה של הבסיסים
let fromBase = null;
let toBase = null;

// קישור לכפתורים, שדה הקלט ותיבת התוצאה
const fromButtons = document.querySelectorAll('#from button');
const toButtons = document.querySelectorAll('#to button');
const convertButton = document.querySelector('#convert button');
const resultDiv = document.querySelector('#result div');
const userInput = document.getElementById('userInput');

// הוספת פעולה לבחירת בסיס המקור
fromButtons.forEach(button => {
    button.addEventListener('click', () => {
        fromButtons.forEach(btn => btn.style.transform = 'scale(1)');
        button.style.transform = 'scale(1.2)'; // הדגשת הבחירה
        fromBase = getBaseFromId(button.id);
    });
});

// הוספת פעולה לבחירת בסיס היעד
toButtons.forEach(button => {
    button.addEventListener('click', () => {
        toButtons.forEach(btn => btn.style.transform = 'scale(1)');
        button.style.transform = 'scale(1.2)'; // הדגשת הבחירה
        toBase = getBaseFromId(button.id);
    });
});

// החזרת ערך הבסיס לפי הכפתור שנבחר
function getBaseFromId(id) {
    switch (id) {
        case 'b': case 't': return 2;
        case 'o': case 'e': return 8;
        case 'd': case 'n': return 10;
        case 'h': case 'r': return 16;
        default: return null;
    }
}

// בדיקת תקינות הקלט לפי הבסיס
function isValidInput(input, base) {
    const regex = {
        2: /^[01]+$/,
        8: /^[0-7]+$/,
        10: /^[0-9]+$/,
        16: /^[0-9a-fA-F]+$/
    };
    return regex[base].test(input);
}

// ביצוע ההמרה בעת לחיצה על Convert
convertButton.addEventListener('click', () => {
    const input = userInput.value.trim(); // מנקה רווחים מיותרים

    if (fromBase === null || toBase === null) {
        alert('Please select both FROM and TO bases.'); // בדיקה אם בחרת בסיסים
        return;
    }

    if (!isValidInput(input, fromBase)) {
        alert('Invalid input for the selected base!'); // בדיקה שהקלט מתאים לבסיס
        return;
    }

    const decimalValue = parseInt(input, fromBase); 
    const convertedValue = decimalValue.toString(toBase).toUpperCase(); // המרה לבסיס היעד

    // הצגת התוצאה למשתמש
    resultDiv.innerHTML = `<b>Result:</b> ${input}<sub>${fromBase}</sub> = ${convertedValue}<sub>${toBase}</sub>`;

    userInput.value = ''; // ניקוי השדה לאחר ההמרה
});
