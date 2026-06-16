import { mkdir, writeFile } from 'node:fs/promises';
import { join } from 'node:path';

const dir = join(process.cwd(), 'data', 'discord');
await mkdir(dir, { recursive: true });

const ref = 'https://discord.com/developers/docs/topics/opcodes-and-status-codes#json-error-codes';

const write = (file, content) => writeFile(join(dir, file), content);

await write('_index.md', `---
title: "Discord API Error Codes"
description: "JSON error codes returned in the code field of error responses from the Discord API. Bot and application developers see these alongside the HTTP status code when a request fails."
references:
  - ${ref}
  - https://discord.com/developers/docs/reference#error-messages
---
`);

// [code, name, description]
const codes = [
  ['10003', 'Unknown Channel', 'The channel ID in the request does not exist, or the bot does not have access to it.'],
  ['10004', 'Unknown Guild', 'The guild (server) ID in the request does not exist, or the bot is not a member of it.'],
  ['10008', 'Unknown Message', 'The message ID in the request does not exist. It may have already been deleted, or it belongs to a different channel than the one specified.'],
  ['10011', 'Unknown Role', 'The role ID in the request does not exist in the target guild.'],
  ['10013', 'Unknown User', 'The user ID in the request does not correspond to an existing Discord account.'],
  ['10014', 'Unknown Emoji', 'The emoji ID or name in the request does not exist, or is not a custom emoji available to the bot.'],
  ['10015', 'Unknown Webhook', 'The webhook ID or token in the request is invalid or the webhook has been deleted.'],
  ['10026', 'Unknown Ban', 'The user specified is not currently banned from the guild, so the ban cannot be fetched or removed.'],
  ['10062', 'Unknown Interaction', 'The interaction token has expired or was already responded to. Interaction tokens are valid for 15 minutes and can only be used to send one initial response.'],
  ['10063', 'Unknown Application Command', 'The application (slash) command ID does not exist for this application, or was deleted before the request was made.'],
  ['20001', 'Bots Cannot Use This Endpoint', 'The request was made with a bot token against an endpoint that is restricted to user accounts.'],
  ['20009', 'Explicit Content Cannot Be Sent To The Desired Recipient(s)', 'The message contains content flagged as explicit, and the target channel or user has explicit content filtering enabled.'],
  ['20016', 'Action Blocked By Slowmode Rate Limit', 'The channel has slowmode enabled and the user (or bot) must wait before sending another message.'],
  ['30001', 'Maximum Number Of Guilds Reached (100)', 'A user account has joined the maximum of 100 guilds and cannot join or create another until it leaves one.'],
  ['30005', 'Maximum Number Of Guild Roles Reached (250)', 'The guild already has 250 roles, which is the maximum allowed, so a new role cannot be created.'],
  ['30007', 'Maximum Number Of Webhooks Reached (15)', 'The channel already has 15 webhooks, which is the maximum allowed, so a new one cannot be created.'],
  ['30010', 'Maximum Number Of Reactions Reached (20)', 'The message already has 20 distinct emoji reactions, which is the maximum allowed, so no new reaction emoji can be added.'],
  ['30013', 'Maximum Number Of Guild Channels Reached (500)', 'The guild already has 500 channels, which is the maximum allowed, so a new channel cannot be created.'],
  ['30016', 'Maximum Number Of Invites Reached (1000)', 'The guild already has 1000 active invites, which is the maximum allowed, so a new invite cannot be created.'],
  ['40001', 'Unauthorized', 'The request is missing a valid authorization header, or the provided token is invalid.'],
  ['40005', 'Request Entity Too Large', 'The request payload, such as a file upload, exceeds the size limit for this endpoint.'],
  ['40060', 'Interaction Has Already Been Acknowledged', 'A response (or deferred response) has already been sent for this interaction token, so it cannot be responded to again.'],
  ['50001', 'Missing Access', 'The bot lacks permission to view the requested channel or guild, or the resource has not been shared with the application.'],
  ['50004', 'Guild Widget Disabled', 'The guild widget feature is disabled, so widget-related endpoints cannot be used for this guild.'],
  ['50005', 'Cannot Edit A Message Authored By Another User', 'Bots and users can only edit messages they sent themselves; this message was authored by someone else.'],
  ['50007', 'Cannot Send Messages To This User', 'The target user has direct messages from server members disabled, has blocked the bot, or does not share a server with the bot.'],
  ['50013', 'Missing Permissions', 'The bot or user lacks the required permission (e.g. Manage Roles, Send Messages) to perform this action in the given channel or guild.'],
  ['50014', 'Invalid Authentication Token Provided', 'The bot or bearer token in the Authorization header is malformed, revoked, or has been regenerated.'],
  ['50016', 'Provided Too Few Or Too Many Messages To Delete', 'Bulk delete requires between 2 and 100 message IDs; the request supplied a number outside that range.'],
  ['50025', 'Invalid OAuth2 Access Token Provided', 'The OAuth2 bearer token has expired or was revoked and can no longer be used to authenticate the request.'],
  ['50035', 'Invalid Form Body', 'One or more fields in the request body failed validation; the response includes an `errors` object describing which fields are invalid and why.'],
  ['60003', 'Two Factor Is Required For This Operation', 'The action requires the user account performing it to have two-factor authentication enabled.'],
  ['130000', 'API Resource Is Currently Overloaded', 'The Discord API endpoint is temporarily overloaded. The request should be retried later, separately from normal rate limiting.'],
];

for (const [code, name, description] of codes) {
  const safeDesc = description.replace(/"/g, '\\"');
  const safeName = name.replace(/"/g, '\\"');
  await writeFile(join(dir, `${code}.md`), `---
name: "${safeName}"
description: "${safeDesc}"
references:
  - ${ref}
---
`);
}

console.log(`Wrote ${codes.length} codes.`);
