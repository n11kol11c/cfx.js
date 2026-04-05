Cfxjs.ConsoleCommand('getversion', 'Get current cfxre.js library version', [], false, 
    /**
     * @param {number} source - Player ID (gathered by server)
     * @param {string[]} args - Arguments list
     * @param {string} raw - Raw input
     */
    (source, args, raw) => {
        const version = Cfxjs.version;
        
        if (source === 0) {
            console.log(`^2[cfxjs]^7 Current version: ^5${version}^7`);
        } else {
            emitNet('chat:addMessage', source, {
                args: ['^2[cfxjs]', `Current version: ^5${version}`]
            });
        }
    }
);

Cfxjs.ConsoleCommand('getauthor', 'Get cfxre.js library author', [], false,
    /**
     * @param {number} source - Player ID (gathered by server)
     * @param {string[]} args - Arguments list
     * @param {string} raw - Raw input
     */
    (source, args, raw) => {
        const author = Cfxjs.author;

        if (source === 0) {
            console.log(`^2[cfxjs]^7 Current version: ^5${author}^7`)
        } else {
            emitNet('chat:addMessage', source, {
                args: ['^2[cfxjs]', `Current version: ^5${author}`]
            })
        }
    }
);

Cfxjs.ConsoleCommand('gta:settime', 'Set current in-game time', ['hours', 'minutes'], true,
    /**
     * @param {number} source - Player ID (gathered by server)
     * @param {string[]} args - Arguments list
     * @param {string} raw - Raw input
     */
    (source, args, raw) => {
        const hours = parseInt(args[0]);
        const minutes = parseInt(args[1]) || 0;

        if (isNaN(hours) || hours < 0 || hours > 23 || minutes < 0 || minutes > 59) {
            const errMessage = '^Error: Usage /settime [0-23] [0-59]';
            return source === 0 ? console.log(errMessage) : emitNet('chat:addMessage', source, { args: ['^2[Cfxre.js]', errMessage] });
        }

        ExecuteCommand(`time ${hours} ${minutes}`);

        const successMessage = `^2Time set to ^5${hours}:${minutes < 10 ? '0' + minutes : minutes}`;
        if (source === 0) console.log(successMessage);
        else emitNet('chat:addMessage', source, { args: ['^2[Cfxre.js]', successMessage] });
    }
)
