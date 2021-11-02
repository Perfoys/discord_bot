const ytdl = require('ytdl-core');

const execute = async (message, serverQueue) => {
    const args = message.content.split(' ');
    const voiceChannel = message.member.voice.channel;
    const permissions = voiceChannel.permissionsFor(message.client.user);
    if (!voiceChannel) {
        return message.channel.send(
            `You need to be in voice channel to play music!`
        )
    }
    if (!permissions.has('CONNECT') || !permissions.has('SPEAK')) {
        return message.channel.send(
            `I need the permissions to join and speak in your voice channel!`
        )
    }

    const songInfo = await ytdl.getInfo(args[1]);
    const song = {
        title: songInfo.videoDetails.title,
        url: songInfo.videoDetails.video_url,
    }

    if(!serverQueue) {

        const queueContruct = {
            textChannel: message.channel,
            voiceChannel: voiceChannel,
            connection: null,
            songs: [],
            volume: 5,
            playing: true,
        };

        queue.set(message.guild.id, queueContruct);
        queueContruct.songs.push(song);

        try {
            let connection = await voiceChannel.join();
            queueContruct.connection = connection;
            play(message.guild, queueContruct.songs[0]);
        } catch (error) {
            console.log(error);
            queue.delete(message.guild.id);
            return message.channel.send(error)
        }
    } else {
        serverQueue.songs.push(song);
        console.log(serverQueue.songs);
        return message.channel.send(`${song.title} has been added to the queue!`);
    }
}

const play = (guild, song) => {
    const serverQueue = queue.get(guild.id);
    if (!song) {
        serverQueue.voiceChannel.leave();
        queue.delete(quild.id);
        return;
    }

    const dispatcher = serverQueue.connection
        .play(ytdl(song.url))
        .on('finish', () => {
            serverQueue.songs.shift();
            play(guild, serverQueue.songs[0]);
        })
        .on('error', error => console.log(error))
    
    dispatcher.setVolumeLogarithmic(serverQueue.volume / 5);
    serverQueue.textChannel.send(`Start playing: **${song.title}**`);

}

const skip = (message, serverQueue) => {
    if (!message.member.voice.channel) {
        return message.channel.send(
            `You have to be in a voice channel to stop the music!`
        )
    }
    if (!serverQueue)
        return message.channel.send('There is no song that I could skip')
    serverQueue.connection.dispatcher.end()
}

const stop = (message, serverQueue) => {
    if (!message.member.voice.channel) {
        return message.channel.send(
            `You have to be in a voice channel to stop the music!`
        )
    }
    if (!serverQueue) {
        return message.channel.send(`There is no song that I could stop!`)
    }

    serverQueue.songs = [];
    serverQueue.connection.dispatcher.end();
}


module.exports = execute;
module.exports = stop;
module.exports = skip;
