// const { WebClient } = require('@slack/client');

// // An access token (from your Slack app or custom integration - xoxp, xoxb, or xoxa)
// // const token = process.env.SLACK_TOKEN;
// const token = 'lD7mYV8GNN4K7QAUwH8zjQow';
// const web = new WebClient(token);

// // The first argument can be a channel ID, a DM ID, a MPDM ID, or a group ID
// const channelId = 'C76M3QKDJ';

// // See: https://api.slack.com/methods/chat.postMessage
// web.chat.postMessage(channelId, 'Hello there')
//   .then((res) => {
//     // `res` contains information about the posted message
//     console.log('Message sent: ', res.ts);
//   })
//   .catch(console.error);

const { RtmClient, CLIENT_EVENTS, WebClient } = require('@slack/client');

const token = 'lD7mYV8GNN4K7QAUwH8zjQow';

const rtm = new RtmClient(token, {
  dataStore: false,
  useRtmConnect: true,
});
// Need a web client to find a channel where the app can post a message
const web = new WebClient(token);

// Load the current channels list asynchrously
let channelListPromise = web.channels.list();

rtm.on(CLIENT_EVENTS.RTM.RTM_CONNECTION_OPENED, () => {
  console.log(`Ready`);
  // Wait for the channels list response
  channelsListPromise.then((res) => {

    // Take any channel for which the bot is a member
    const channel = res.channels.find(c => c.is_member);

    if (channel) {
      // We now have a channel ID to post a message in!
      // use the `sendMessage()` method to send a simple string to a channel using the channel ID
      rtm.sendMessage('Hello, world!', channel.id)
        // Returns a promise that resolves when the message is sent
        .then(() => console.log(`Message sent to channel ${channel.name}`))
        .catch(console.error);
    } else {
      console.log('This bot does not belong to any channels, invite it to at least one and try again');
    }
  });
});

// Start the connecting process
rtm.start();