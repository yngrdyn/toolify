export const insertTextAtCursor = (text) => {
  var el = document.activeElement;
  var val = el.value;
  var endIndex;
  var range;
  var doc = el.ownerDocument;
  if (
    typeof el.selectionStart === 'number' &&
    typeof el.selectionEnd === 'number'
  ) {
    endIndex = el.selectionEnd;
    el.value = val.slice(0, endIndex) + text + val.slice(endIndex);
    el.selectionStart = el.selectionEnd = endIndex + text.length;
  } else if (doc.selection && doc.selection.createRange) {
    el.focus();
    range = doc.selection.createRange();
    range.collapse(false);
    range.text = text;
    range.select();
  } else {
    console.log(
      'Sorry. I cannot paste in elements other than inputs/textAreas =('
    );
  }
};

export const showConfetti = () => {
  var el = document.activeElement.parentElement;

  for (let index = 0; index < 50; index++) {
    let confetti = document.createElement('I');
    el.appendChild(confetti);
  }

  el.classList += ' confetti';

  setTimeout(() => {
    el.className = el.className.replace(' confetti', '');
    const confettiList = el.querySelectorAll('i');
    for (let index = 0; index < confettiList.length; index++) {
      el.removeChild(confettiList[index]);
    }
  }, 2000);
};
