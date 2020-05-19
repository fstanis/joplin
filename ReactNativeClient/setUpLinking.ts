const { Platform, Linking } = require('react-native');

type TEvent = {
	url: string
}

async function navigate(url: string, dispatch: Function) {
	if (!url) return;

	const p = url.split('/');
	const noteId = p[p.length - 1];

	await dispatch({ type: 'NAV_BACK' });

	await dispatch({ type: 'SIDE_MENU_CLOSE' });

	await dispatch({
		type: 'NAV_GO',
		noteId: noteId,
		routeName: 'Note',
	});
}

let listener: any = null;

function setUpLinking(dispatch: Function) {
	if (Platform.OS === 'android') {
		Linking.getInitialURL().then((url: string) => navigate(url, dispatch));
	} else {
		listener = (event: TEvent) => navigate(event.url, dispatch);
		Linking.addEventListener('url', listener);
	}
}

function clearLinking() {
	if (listener) {
		Linking.removeEventListener(listener);
	}
}

module.exports = { setUpLinking, clearLinking };
