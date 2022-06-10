export class Component {

	async getTemplate(url, selector) {
		let response = await fetch(url);
		const componentString = await response.text();
		const componentDom = new DOMParser().parseFromString(componentString, "text/html");
		const component = componentDom.querySelector(selector);

		return await component;
	}
}