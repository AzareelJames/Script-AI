var username = sessionStorage.getItem(`username`);

if(username === null){
    while (!username || username === null || String(username).length < 4 || username.includes(` `)){
        username = 
        prompt(`Please enter your username (at least 4 characters)`);
    }
    if (!(!username || username === null || String(username).length < 4 || username.includes(` `))){
        window.location.reload();
    }

    username = sessionStorage.setItem(`username`, username);
}

const input = document.getElementById(`input`);
input.classList = `input`;
input.focus();

const ai = document.createElement(`div`);
ai.innerText = `Hello ${username}, i'm Script AI!\n made in JavaScript`;

ai.style = `
    text-align: center;
    font-size: 300%;
    color: white;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
`;
document.body.appendChild(ai);


function askAI(){
    try{
        const inputVal = 
        String(input.value).toLowerCase();
        if (inputVal === `delete username`){
        if(confirm(`Are you sure to delete your username?`)){
            sessionStorage.removeItem(`username`);
            window.location.reload();
            return;
        }
        } else if([`what's the time`, `what is the time`, `time`].includes(inputVal)){
            ai.innerText = `The time is ${new Date().toLocaleTimeString()}`;
            return;
        } else if(
            [`name`, `what's my name`, `what is my name`, `username`].includes(inputVal)){
            ai.innerText = `Your username was ${username}`;
            return;
        } else if([`random`, `random number`, `give me a random number`]
            .includes(inputVal)
        ){
            const min = Number(prompt(`Enter minimum number`));
            const max = Number(prompt(`Enter maximum number`));

            if (max < min){ai.innerText = `Invalid choice`; return;}

            ai.innerText = Math.floor(Math.random() * max + min);
            return;
        } else if(inputVal === `set memory`){
            const setMemory = prompt(`Set a Memory`);
            if(setMemory === `username`){
                ai.innerText = `cannot set this memory`;
                return;
            }

            sessionStorage.setItem(setMemory, prompt(`Enter its Value`));
            ai.innerText(`memory is set`);
            return;
        } else if(inputVal === `get memory`){
            ai.innerText = sessionStorage.getItem(prompt(`Enter Memory`));
            return;
        } else if(inputVal === `remove memory`){
            const removeMemory = prompt(`Enter Memory`);

            if(removeMemory === `username`){
                ai.innerText = `Cannot remove this memory`;
                return;
            }

            sessionStorage.removeItem(removeMemory);
            ai.innerText = `memory is removed`;
            return;
        } else if([`memories`, `memory`].includes(inputVal)){
            const memories = {};
            // this for loop was credited to Microsoft Copilot
            for (let i = 0; i < sessionStorage.length; i++) {
                const key = sessionStorage.key(i);
                const value = sessionStorage.getItem(key);
                memories[key] = value;
            }

            ai.innerText = JSON.stringify(memories);
            return;
        } else if(inputVal === `delete everything`){
            if(
            confirm(`Are you sure to delete everything?\nyour memories and username will be lost`)){
                sessionStorage.clear();
                window.location.reload();
                return;
            }
        }
        
        ai.innerText = `I don't understand ${username} :(`;
    }
    catch{
        return;
    }

}

addEventListener(`keydown`, (event) => {
    if (event.code === `Enter`){
        askAI();
    }
});