document.addEventListener ('DOMContentLoaded', function() {

    var output = document.querySelector('#output-numbers');
    var userNum = document.querySelector('.user-numbers');
    var cpuNum = document.querySelector('.cpu-numbers');
    var comment = document.querySelector('.comment');
    var score = document.querySelector('.score');
    var cpu = document.querySelector('#cpu-output');
    var difficulty = document.querySelectorAll('.difficulty');
    var distraction = document.querySelectorAll('.distraction')[0];
    var distraction2 = document.querySelectorAll('.distraction')[1];
    var time = document.querySelector('#time');
    var timer = document.querySelector('.timer')

    var max = 100;
    var min = 1;
    var nums = 5;
    var flag = false;
    var s = 0;
    var generated = 0; // This is needed to prevent multiple instances of the game running at once.

    var cpuNumbers = [];
    var userNumbers = [];

    function numGen() {
        while (cpuNumbers.length < nums) {
            var num = Math.floor(Math.random() * (max - min + 1)) + min;
            if (!cpuNumbers.includes(num)) {
                cpuNumbers.push(num);
            }
        }
        generated++;
    }

    function countdown() {
        distraction.style.display = 'block';
        distraction2.style.display = 'block';
        time.innerHTML = s + 's';
        var timing = setInterval (function() {
            s--;
            time.innerHTML = s + 's';
            decoy();
            if (s === 0) {
                clearInterval(timing);
                game();
            }
        }, 1000)
    }

    function decoy() {
            bait = setInterval(function() {
            var random = Math.floor(Math.random()*999);
            var random2 = Math.floor(Math.random()*999);
            distraction.innerHTML = random;
            distraction2.innerHTML = random2;
                        
        }, 1000)
    }

    function game() {

        timer.style.display = 'none';
        distraction.style.display = 'none';
        distraction2.style.display = 'none';
        userNum.style.display = 'block';
        cpuNum.style.display = 'block';

        for(n = 0; n < 5; n++) {

            do {
                var guess = parseInt(prompt('Insert the numbers you remember from before!'));
                if(isNaN(guess)) {
                    alert('Invalid value!');
                }
            }
            while(isNaN(guess))

            if (cpuNumbers.includes(guess)) {
                userNumbers.push(guess);
            }
        }

        output.innerHTML = userNumbers;
        cpu.innerHTML = cpuNumbers;
        score.innerHTML = 'Your score: ' + userNumbers.length + '/' + nums;
        
        var comment1 = Math.floor(nums/5);
        var comment2 = Math.floor(nums/3);
        var comment3 = Math.floor(nums/2);


        if (userNumbers.length < comment1) {
            comment.innerHTML = 'Your memory could use some work!';
        } else if (userNumbers.length >= comment1 && userNumbers.length < comment2) {
            comment.innerHTML = "Keep trying! That's a good start!";
        } else if (userNumbers.length >= comment2 && userNumbers.length < comment3) {
            comment.innerHTML = "Oof. That wasn't bad at all!";
        } else if (userNumbers.length >= comment2 && userNumbers.length < nums) {
            comment.innerHTML = "Now we're getting somewhere! Keep it up!";
        } else if (userNumbers.length === nums) {
            comment.innerHTML = 'You win!! Congratulations!';
        }
    }

    function simonSays() {

        if(s !== 0) {
            alert('Nice try, cheater. Give it another shot!')
            location.reload();
        }

        for(i = 0; i < difficulty.length; i++) {
            if (difficulty[i].checked) {
                s = difficulty[i].value;
                flag = true;
                break;
            }
        }

        if (!flag) {
            comment.innerHTML = 'You should pick a difficulty before playing!';
            return;
        }

        numGen();
        cpuNumbers.sort(function(a,b) {return a-b});
        if (generated === 1) {
            alert(cpuNumbers);
        }

        countdown();
    }

    document.getElementById('simon').addEventListener('click', simonSays);
})