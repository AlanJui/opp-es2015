import {TitleBar} from '../ui/title-bar.js';

export class ApplicationBase {

  constructor(title) {
    this.title = title;
    this.titleBar = new TitleBar(this.title);
    this.routeMap = {};
    this.defaultRoute = null;
  }

  show(element) {
    this.titleBar.appendToElement(element);

    this.titleBar.element.find('.mdl-navigation__link').click((event) => {
      let route = event.target.innerHTML;
      this.activeRoute(route.trim());
    });

    if (this.defaultRoute) {
      this.activeRoute(this.defaultRoute);
    }
  }

  activeRoute(route) {
    let content = this.titleBar.element.find('.page-content');
    content.empty();

    this.routeMap[route].appendToElement(content);
  }

  addRoute(id, pageObject, defaultRoute = false) {
    this.titleBar.addLink(id, '');

    this.routeMap[id] = pageObject;

    if (defaultRoute) {
      this.defaultRoute = id;
    }
  }
}