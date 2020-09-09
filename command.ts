const command = new discord.command.CommandGroup({
  defaultPrefix: '!',
  
});

const trustCommandFilter = discord.command.filters.hasRole(
  'YOUR STAFF ROLE'
);

var guildId = 'YOUR GUILD ID';

command.on(
  { name: 'privatechannel', filters: trustCommandFilter },
  (args) => ({
    privateMember: args.guildMember()
  }),
  async (message, { privateMember }) => {
    const guild = await discord.getGuild(guildId);

    const permissions = [
      {
        type: discord.Channel.PermissionOverwriteType.MEMBER,
        id: privateMember.user.id,
        allow: 0x00000400
      },
      {
        type: discord.Channel.PermissionOverwriteType.MEMBER,
        id: message.author.id,
        allow: 0x00000400
      },

      {
        type: discord.Channel.PermissionOverwriteType.ROLE,
        id: guild.id,
        deny: 0x00000400
      }
    ];

    const privateConfirm1 = new discord.Embed();
    await privateConfirm1.setColor(0x3f888f);
    await privateConfirm1.setTitle('Channel created!');
    await privateConfirm1.setDescription(
      `${message.author.username} created a private channel with ` +
        privateMember.user.username.toString() +
        `!`
    );
    const privateConfirm = await message.reply(privateConfirm1);

    await guild.createChannel({
      name: '🎟private room ' + privateMember.user.id,
      type: discord.Channel.Type.GUILD_TEXT,
      permissionOverwrites: permissions,
      
    });
  }
);

command.on(
  { name: 'closeprivatechannel', filters: trustCommandFilter },
  (args) => ({
    privateMember: args.guildMember()
  }),
  async (message, { privateMember }) => {
    const Member = privateMember?.user.id
    const privatechannel = await message
      .getGuild()
      .then((guild) => guild.getChannels())
      .then((channels) =>
        channels.find((channel) => channel.name.includes(Member))
      );
    if (!privatechannel)
      return message.reply(`**ERROR**
Channel not found!`);
    await privatechannel.delete();

    const privateConfirm4 = new discord.Embed();
    await privateConfirm4.setColor(0x3f888f);
    await privateConfirm4.setTitle('Channel closed!');
    await privateConfirm4.setDescription(
      `${message.author.username} closed the private channel with ` +
        privateMember.user.username.toString() +
        `!`
    );
    const privateConfirm3 = await message.reply(privateConfirm4);
  }
);
