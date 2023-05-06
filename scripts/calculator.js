

const buttons = document.querySelectorAll('.calculator button');
const disp1 =  document.getElementById('display-1');
const disp2 =  document.getElementById('display-2');

let activeButton = null;
let evaluated = false;

buttons.forEach(button => {
    button.addEventListener('click', (event)=> {
        const character = event.target.innerHTML;
        
        
        if (activeButton != null)   //remove active button class after any click
        {
            activeButton.classList.remove('active-button');
        }


        if (character == 'AC')  //clear
        {
            calcClear();
        }
        else if (character >= '0' && character <= '9')  //insert digit
        {
            if (evaluated && activeButton == null && disp2.innerHTML.slice(-1) != '.')
            {
                calcClear();
            }
            else if (evaluated && activeButton != null)
            {
                disp1.innerHTML = disp2.innerHTML + ' ' + activeButton.innerHTML + ' ';
                disp2.innerHTML = '';
                activeButton = null;
                evaluated = false;
            }
            else if(activeButton != null)
            {
                disp1.innerHTML += disp2.innerHTML + ' ' + activeButton.innerHTML + ' ';
                disp2.innerHTML = '';
                activeButton = null;
                evaluated = false;
            }

            if (disp2.innerHTML[disp2.innerHTML.length - 1] != '%')
            {
                if (disp2.innerHTML == '0')
                {
                    disp2.innerHTML = character;
                }
                else
                {
                    disp2.innerHTML += character;
                }
            }
        }
        else if (character == "%" && disp2.innerHTML > 0 && disp2.innerHTML.slice(-1) != '%')
        {
            if (disp2.innerHTML[disp2.innerHTML.length - 1] == '.')
            {
                disp2.innerHTML = disp2.innerHTML.replace('.', character);
            }
            else
            {
                disp2.innerHTML += character;
            }
            
        }
        else if (['÷', '×', '-', '+'].includes(character) && disp2.innerHTML != '') //insert binary operator
        {
            for (let i=0; i < buttons.length; i++)  //set binary oparator button active
            {
                if (buttons[i].innerHTML == character)
                {
                    activeButton = buttons[i];
                    activeButton.classList.add('active-button');
                }
            }
        }
        else if (character == '+/-')    //change number sign
        {
            if (isNaN(disp2.innerHTML))
            {
                if (disp2.innerHTML[0] == '-')
                {
                    disp2.innerHTML = disp2.innerHTML.slice(1);
                }
                else
                {
                    disp2.innerHTML = '-' + disp2.innerHTML;
                }

            }
            else
            {
                disp2.innerHTML = -disp2.innerHTML
            }
            
        }
        else if (character == ',')
        {
            if (disp2.innerHTML == '')
            {
                disp2.innerHTML = '0.';
            }
            else if (!disp2.innerHTML.includes('.'))
            {
                if (disp2.innerHTML[disp2.innerHTML.length - 1] == '%')
                {
                    disp2.innerHTML = disp2.innerHTML.replace('%', '.');
                }
                else
                {
                    disp2.innerHTML += '.';
                }
            }
        }
        else if (character == '=' && evaluated == false) //evaluate
        {
            if (disp1.innerHTML != '' || disp2.innerHTML != '')
            {
                disp1.innerHTML += disp2.innerHTML;
                let outcome = eval(disp1.innerHTML.replace('×','*').replace('÷','/').replace('%','/100'));
                //rounding
                const maxDecimals = 6;
                outcome = parseFloat(outcome.toFixed(maxDecimals));
                disp2.innerHTML = outcome;
                evaluated = true;
            }
        }
      
    });
});


function calcClear()
{
    disp1.innerHTML = '';
    disp2.innerHTML = '';
    activeButton = null;
    evaluated = false;
}
