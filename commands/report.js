module.exports = {
    name: 'report',
    description: 'Possibilita o usuário iniciar um report manualmente',
    execute: (client, msg, ...args) => {
        const welcomeMsg = "Tá na hora de fazer o report diário, essas são as informações que preciso:";
        const questions = [
            "Quais tarefas você fez hoje?",
            "Quais os planos pra amanhã?",
            "Algum bloqueio?",
        ];
        const endMsg = "Obrigado pela disposição!";
        const answers = [];
        let question = 1;

        msg.reply(welcomeMsg);
        msg.reply(questions[0]);

        const filter = m => !m.author.bot;
        const collector = msg.channel.createMessageCollector(filter, { max: 3 });

        collector.on('collect', m => {
            answers.push(` • ${m.content.replace(/(\r\n|\n|\r)/gm, '\n • ')}`);
            if (question != (questions.length)) {
                msg.reply(questions[question]);
            } else {
                collector.stop()
            }

            question++;
        });

        collector.on('end', () => {
            let report = ""
            msg.reply(endMsg);
            const destination = client.channels.cache.get("767884860944547841")
            answers.forEach((value, index) => {
                report += `***[${questions[index]}]***\n${value}\n\n`
            })
            destination.send(`Aqui está o report diário de ${msg.author}:\n\n${report}\n`);
        });
    }
}