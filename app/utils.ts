export function openTwitterConversation(message = 'Hey there!') {
	const conversationUrl = 'https://x.com/messages/1392827202081755139-1811758645371076608';
	const encodedMessage = encodeURIComponent(message);
	const urlWithMessage = `${conversationUrl}?text=${encodedMessage}`;
	window.open(urlWithMessage, '_blank', 'width=550,height=420');
}

export const handleTweet = (text: string) => {
	// Encode the text and URL for use in the Twitter share URL
	const encodedText = encodeURIComponent(text);

	// Construct the Twitter share URL
	const twitterUrl = `https://twitter.com/intent/tweet?text=${encodedText}`;

	// Open Twitter in a new window
	window.open(twitterUrl, '_blank', 'width=550,height=420');
};
