@client.command(pass_context=True)
async def fakeprint(ctx, *, arguments):
    arguments = await commands.clean_content().convert(ctx, arguments)
    await client.delete_message(ctx.message)
    return await ctx.send(arguments)