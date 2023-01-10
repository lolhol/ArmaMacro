/** @format */

export function getKeyBindFromKey(key, description) {
	var mcKeyBind = Client.getKeyBindFromKey(key);

	if (mcKeyBind == null || mcKeyBind == undefined) {
		mcKeyBind = new KeyBind(description, key);
	}

	return mcKeyBind;
}
