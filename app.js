var name1 = window.prompt("Enter your name: ");
document.getElementById("mobile-apology").innerHTML = name1;
var words = ['this', 'thing', 'sometimes', 'break', 'went', 'can\'t', 'been', 'question', 'quite', 'quit', 'from', 'form', 'forever', 'angry', 'limit', 'lucky', 'hours', 'records', 'oil', 'feed', 'won\'t', 'its', 'it\'s', 'old', 'many', 'place', 'time', 'experience', 'time', 'quest', 'just', 'computer', 'move', 'white', 'green', 'black', 'orange', 'different', 'hour', 'big', 'even', 'mountain', 'been', 'animal', 'long', 'after', 'page', 'tree', 'see', 'seen', 'right', 'left', 'has', 'went', 'above', 'said', 'good', 'long', 'it', 'why', 'that', 'learn', 'girl', 'boy', 'will', 'three', 'before', 'may', 'to', 'fine', 'flower', 'city', 'street'];

 var output = document.querySelector('.output');
 var input = document.querySelector('.type-word');
 var error_list = document.querySelector('.incorrect');
 var refresh = document.querySelector('.refresh');
 var counter = document.querySelector('.count-down');
 var result = document.querySelector('.result');

 // styling
 var error = 'padding: 5px 10px; color: #fc5558;';
 var error_colour = 'color: #fc5558;';
 var curr_word = 'padding: 0 10px; border-bottom: 5px solid rgba(255, 255, 255, .9); background-color: rgba(85, 177, 252, .1); border-top-right-radius: 2px; border-top-left-radius: 2px;';
 var letter_error = 'color: #fc5558;';
 var correct = 'color: #7cfc55;';
 var padding = 'padding: 5px 10px;';
 var partial = 'color: #9555fc;';

 // num of words to output
 wrd_num = 9;

 // focus on the input
 input.focus();

 // populate word list
 function word_list(line_num, word_num) {
     // generate words
     var words_list = [];
     for (let i = 0; i < line_num; i++) {
         words_list.push([]);

         if (words_list.length === line_num) {
             for (let x = 0; x < words_list.length; x++) {
                 for (let j = 0; j < word_num; j++) {
                     var rand_num = Math.floor(Math.random() * words.length - 1) + 1;
                     words_list[x].push(words[rand_num]);
                 }
             }
         }
     }

     // detect repeats
     var repeats = [];
     var search = 0;
     var line_search = 0;
     for (let i = 0; i < words_list.length; i++) {
         repeats.push([]);

         for (let x = 0; x < words_list[i].length; x++) {
             if (x === 1) {
                 repeats[i].push(words_list[i].indexOf(words_list[i][search]));
             }

             if (x === words_list[i].length - 1 && search !== words_list[i].length - 1) {
                 search++;
                 x = 0;
             }
         }
         search = 0;
     }

     // reset repeated words
     for (let i = 0; i < repeats.length; i++) {
         for (let x = 0; x < repeats[i].length; x++) {
             var rand_num = Math.floor(Math.random() * words.length - 1) + 1;
             if (repeats[i][x] < x) {
                 words_list[i][x] = words[rand_num];
             }
         }
     }

     // output words
     for (let i = 0; i < words_list.length; i++) {
         var line = document.createElement('div');
         line.setAttribute('class', 'word-line');

         for (let x = 0; x < words_list[i].length; x++) {
             var span = document.createElement('span');
             span.setAttribute('class', 'word');
             span.style.cssText = padding;
             line.appendChild(span);

             for (let j = 0; j < words_list[i][x].length; j++) {
                 span.innerHTML += '<span class="word-letter">' + words_list[i][x][j] + '</span>';
             }
         }

         output.appendChild(line);
     }

 }
 word_list(3, wrd_num);

 output.querySelectorAll('.word-line')[0].querySelectorAll('.word')[0].style.cssText = curr_word;

 // reset the test
 var word_num = 0;

 function reset_test(e) {
     output.innerHTML = '';
     word_list(3, wrd_num);
     input.value = '';
     input.focus();
     error_list.innerHTML = '';
     counter.textContent = '60';
     var key_pressed = document.onkeydown = init_counter;
     word_num = 0;
 }
// refresh.addEventListener('click', reset_test);

 // typing
 var correct_wrds = 0;
 var letter = 0;
 var correct_letter = 0;
 var incorrect_letter = 0;
 var stroke = 0;
 var letter_stroke = 0;
 var mostly_correct = 0;
 var fully_correct = 0;
 var letter_flow = 0;
 var incorrect_wrd = 0;

 function word_check(e) {
     // word selection and text input
     var target = e.target;
     // input
     var letters = target.value;
     // line is the element that contains all words
     var line = output.querySelectorAll('.word-line')[0];
     // the full word
     var word_elem = line.querySelectorAll('.word');
     // word letters = all word letters minus the ones typed
     var word_letters = line.querySelectorAll('.word')[word_num].textContent.split('');
     // word inner = individual letters
     var word_inner = line.querySelectorAll('.word')[word_num].querySelectorAll('.word-letter');
     // word = full word
     var word = line.querySelectorAll('.word')[word_num].textContent;
     // letter length = input letter count
     var letter_length = letters.replace(/\s/g, '').length;
     // first word = first few letters of the word displayed in the output
     var first_word = word_letters.splice(0, letter_length).toString().replace(/,/g, '');
     // input val = the letters in the input
     var input_val = letters.split('').toString().replace(/,/g, '').replace(/\s/g, '');

     // if space isn't pushed
     if (e.type === 'keydown') {
         // if backspace is pressed
         if (e.keyCode !== 32 && e.keyCode === 8) {
             // minimise letter count
             letter--;

             // if letter count is less than 0 just keep it at 0
             if (letter < 0) {
                 letter = 0;
             }
         }
         // if backspace is pressed don't count it as a letter press
         else if (e.keyCode !== 32 && e.keyCode !== 8) {
             letter++;
         }
     }

     // if no characters are in the input make letter count 0
     if (e.keyCode !== 32 && input.value.length <= 0) {
         letter = 0;
     }
     // if input count is greater than the word cap the letter count at the word length
     else if (e.keyCode !== 32 && letter > word_inner.length) {
         letter = word_inner.length;
     }
     // if input contains characters make letter equal length of input value (exludes spaces)
     else if (!input.value.match(/\s/) && input.value.length > 0 && e.keyCode !== 32) {
         letter = input.value.length;
     }

     // select letter exclude spacebar
     if (e.keyCode !== 32 && e.keyCode === 8) {
         // make sure letters are detected and remove style on backspace
         if (word_inner[letter] && word_inner !== undefined) {
             word_inner[letter].removeAttribute('style');
             //word_inner[letter].classList.remove('word-letter-anim');
         }
     }

     // word matching (make sure a word is detected)
     if (e.keyCode !== 32 && e.keyCode !== 8 && word_inner[letter - 1] && word_inner !== undefined) {
         // if displayed word is the same as the typed (or portion of word is right)
         if (first_word === input_val || first_word[letters.length - 1] === letters[letters.length - 1]) {
             // set style for correct
             if (e.type === 'input' && e.keyCode !== 8 || e.type === 'input' && e.keyCode !== 32) {
                 word_inner[letter - 1].style.cssText = correct;
                 //word_inner[letter -1].classList.add('word-letter-anim');
                 correct_letter++;
                 stroke++;
                 letter_stroke++;

                 input.removeAttribute('style');

                 if (stroke === 5) {
                     correct_wrds++;
                     letter_flow++;
                 }
             }
         }
         // if displayed word does not match the typed word
         else if (first_word !== input_val) {
             // set style for incorrect
             word_inner[letter - 1].style.cssText = letter_error;

             if (e.type === 'input' && e.keyCode !== 8 || e.type === 'input' && e.keyCode !== 32) {
                 incorrect_letter++;
                 //correct_letter --;

                 if (correct_letter <= 0) {
                     correct_letter = 0;
                 }
                 stroke = 0;

                 input.style.cssText = error_colour;
             }
         }
     }

     // if there are no letters in the input remove all styling
     if (e.keyCode !== 32 && letter === 0) {
         for (let i = 0; i < word_inner.length; i++) {
             word_inner[i].removeAttribute('style');
         }
     }

     line.querySelectorAll('.word')[word_num].style.cssText = curr_word;

     // word submit and match
     if (e.type === 'keyup' || e.type === 'keydown') {
         // submit word
         word_submit(target, e, letters, line, word_letters, word_inner, word, letter_length, first_word, input_val, word_elem);

     }
 }
 input.addEventListener('input', word_check);
 input.addEventListener('keyup', word_check);
 input.addEventListener('keydown', word_check);

 // submit word and update score
 function word_submit(target, e, letters, line, word_letters, word_inner, word, letter_length, first_word, input_val, word_elem) {
     if (e.keyCode === 32 && target.value.match(/\S/) && target.value[0] !== ' ') {
         // collate incorrect words
         var correct_size = word_elem[word_num].textContent.length - correct_letter;

         if (word !== input_val) {
             line.querySelectorAll('.word')[word_num].style.cssText = error;
             // incorrect count
             if (correct_size <= correct_letter) {
                 correct_wrds++;
                 mostly_correct++;

                 //word_elem[word_num].style.cssText = partial+padding;
                 for (let i = 0; i < word_elem[word_num].querySelectorAll('span').length; i++) {
                     if (word_elem[word_num].querySelectorAll('span')[i].style.color !== 'rgb(252, 85, 88)') {
                         word_elem[word_num].querySelectorAll('span')[i].style.cssText = partial;
                         continue;
                     }
                 }
             } else if (incorrect_letter > correct_letter) {
                 incorrect_wrd++;
             }

             incorrect_letter = 0;
             correct_letter = 0;
         } else if (first_word === input_val) {
             correct_wrds++;
             fully_correct++;

             // remove background from previous word
             line.querySelectorAll('.word')[word_num].style.cssText = 'padding: 5px 10px; background-color: transparent;';
         }

         // shift to next word
         word_num++;
         incorrect_letter = 0;
         correct_letter = 0;

         // clean out input and remove first word
         target.value = '';
         letter = 0;

         // add new line to the end of list
         if (word_num === line.querySelectorAll('.word').length) {
             line.remove();

             word_num = 0;

             word_list(1, wrd_num);
         }
     }
     // prevent white space at the begining of input
     else if (e.keyCode === 32 && target.value.match(/\s/) && !target.value.match(/\s\S/)) {
         target.value = '';
         //line.querySelectorAll('.word')[word_num].style.cssText = curr_word;

         target.removeAttribute('style');
     } else if (e.keyCode === 32 && target.value.match(/\s\S/)) {
         target.value = target.value.replace(/\s/, '');
     }
 }

 // start counter
 var timer_size = 100;
 var key_pressed = document.onkeydown = init_counter;
 var timer_bar = document.querySelector('.timer');

 function init_counter(e) {
     if (e.keyCode !== 32 || e.keyCode !== 9 || e.keyCode !== 17 || e.keyCode !== 18) {
         document.onkeydown = null;

         var i = 60;

         var counter_start = setInterval(() => {
             i--;

             timer_size--;

             timer_size = timer_size - .67;

             if (timer_size <= 0) {
                 timer_bar.style.cssText = 'width: 0;';
             } else {
                 timer_bar.style.cssText = 'width: ' + timer_size + '%;';
             }

             if (i <= 0) {
                 clearInterval(counter_start);

                 result.innerHTML =
                     '<div style="display:flex;align-items:center;justify-content:center;backdrop-filter: blur(4px);width: 200 px;height: 40 vh; font-size:30px;color:#ffffff;font-weight:bolder;"><p>' +
                     'Name: ' + name1 +'<br>'+
                     'WPM:' + correct_wrds + '<br>' +
                     'Mostly correct: ' + mostly_correct + '<br>' +
                     'Fully correct: ' + fully_correct + '<br>' +
                     'Correct letter flow: ' + letter_flow + '<br>' +
                     'Incorrect: ' + incorrect_wrd + '<br>' +
                     'Keystrokes: ' + letter_stroke +
                     '</p></div>';
             }

             counter.textContent = i;
         }, 1000);
     }

   
     // start timer over on restart
    /* function reset_timer() {
         output.querySelectorAll('.word-line')[0].querySelectorAll('.word')[0].style.cssText = curr_word;
         timer_size = 100;
         timer_bar.style.cssText = 'width: 100%;';
         clearInterval(counter_start);

         correct_wrds = 0;
         letter = 0;
         incorrect_letter = 0;
         correct_letter = 0;
         letter_stroke = 0;
         mostly_correct = 0;
         fully_correct = 0;
         letter_flow = 0;
         input.removeAttribute('style');
     }*/
     // refresh.addEventListener('click', reset_timer);
 }
 
 //disable right click and shortcuts to open devtools/ inspect element
 /*document.onkeydown = function (ev) {
     if (event.keyCode == 123) {
         return false;
     }
     if (ev.ctrlKey && ev.shiftKey && ev.KeyboardEvent.keyCode == 'I'.charCodeAt(0)) {
         return false;
     }
     if (ev.ctrlKey && ev.shiftKey && ev.KeyboardEvent.keyCode == 'C'.charCodeAt(0)) {
         return false;
     }
     if (ev.ctrlKey && ev.shiftKey && ev.KeyboardEvent.keyCode == 'J'.charCodeAt(0)) {
         return false;
     }
     if (ev.ctrlKey && ev.KeyboardEvent.keyCode == 'U'.charCodeAt(0)) {
         return false;
     }
 }*/

    //devtools detector
    ! function () {
        function detectDevTool(allow) {
            if (isNaN(+allow)) allow = 1;
            var start = +new Date();
            debugger;
            var end = +new Date();
            if (isNaN(start) || isNaN(end) || end - start > allow) {
                alert('DEVTOOLS detected. You are disqualified for cheating.');
                document.write('You are disqualified.');
            }
        }
        if (window.attachEvent) {
            if (document.readyState === "complete" || document.readyState === "interactive") {
                detectDevTool();
                window.attachEvent('onresize', detectDevTool);
                window.attachEvent('onmousemove', detectDevTool);
                window.attachEvent('onfocus', detectDevTool);
                window.attachEvent('onblur', detectDevTool);
            } else {
                setTimeout(argument.callee, 0);
            }
        } else {
            window.addEventListener('load', detectDevTool);
            window.addEventListener('resize', detectDevTool);
            window.addEventListener('mousemove', detectDevTool);
            window.addEventListener('focus', detectDevTool);
            window.addEventListener('blur', detectDevTool);
        }
    }();

// snowfall animation
 document.addEventListener('DOMContentLoaded', function () {
     var script = document.createElement('script');
     script.src = 'https://cdn.jsdelivr.net/particles.js/2.0.0/particles.min.js';
     script.onload = function () {
         particlesJS("snow", {
             "particles": {
                 "number": {
                     "value": 200,
                     "density": {
                         "enable": true,
                         "value_area": 800
                     }
                 },
                 "color": {
                     "value": "#ffffff"
                 },
                 "opacity": {
                     "value": 0.7,
                     "random": false,
                     "anim": {
                         "enable": false
                     }
                 },
                 "size": {
                     "value": 5,
                     "random": true,
                     "anim": {
                         "enable": false
                     }
                 },
                 "line_linked": {
                     "enable": false
                 },
                 "move": {
                     "enable": true,
                     "speed": 5,
                     "direction": "bottom",
                     "random": true,
                     "straight": false,
                     "out_mode": "out",
                     "bounce": false,
                     "attract": {
                         "enable": true,
                         "rotateX": 300,
                         "rotateY": 1200
                     }
                 }
             },
             "interactivity": {
                 "events": {
                     "onhover": {
                         "enable": false
                     },
                     "onclick": {
                         "enable": false
                     },
                     "resize": false
                 }
             },
             "retina_detect": true
         });
     }
     document.head.append(script);
 });