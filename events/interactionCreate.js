const { MessageEmbed } = require('discord.js')

module.exports = (client, int) => {
    if (!int.isButton()) return;

    const queue = player.getQueue(int.guildId);

    switch (int.customId) {
        case 'saveTrack': {
            if (!queue || !queue.playing) return int.reply({ content: `No music currently playing... try again ? ❌`, ephemeral: true, components: [] });

            int.member.send({
                embeds: [
                    new MessageEmbed()
                        .setColor('RED')
                        .setTitle(`:arrow_forward: ${queue.current.title}`)
                        .setURL(queue.current.url)
                        .addFields(
                            { name: ':hourglass: Duration:', value: `\`${queue.current.duration}\``, inline: true },
                            { name: 'Song by:', value: `\`${queue.current.author}\``, inline: true },
                            { name: 'Views :eyes:', value: `\`${queue.current.views}\``, inline: true },
                            { name: 'Song URL:', value: `\`${queue.current.url}\`` }
                        )
                        .setThumbnail(queue.current.thumbnail)
                        .setFooter(`from the server ${int.member.guild.name}`, int.member.guild.iconURL({ dynamic: false }))
                    ]
            }).then(() => {
                return int.reply({ content: `I have sent info of the music by private messages ✅`, ephemeral: true, components: [] });
            }).catch(error => {
                return int.reply({ content: `Unable to send you a private message... try again ? ❌`, ephemeral: true, components: [] });
            });
        }
    }
};
